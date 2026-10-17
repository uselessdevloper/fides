import numpy as np
from typing import Dict, Any, List, Tuple
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

class RiskScorer:
    """
    Scikit-learn powered behavioral risk scoring engine for agent commerce transactions.
    Evaluates agent history, basket value ratio, transaction frequency, and category risk.
    """
    def __init__(self):
        self.model: Pipeline = self._train_baseline_model()
        
        # Agent transaction timestamp tracker for sliding window (agent_id -> list of epoch timestamps)
        self._agent_timestamps: Dict[str, List[float]] = {}
        # Historical average basket size per agent
        self._agent_avg_baskets: Dict[str, float] = {
            "AGENT_SHOPPER_ALPHA": 350.0,
            "AGENT_GROCERY_BOT": 220.0,
            "AGENT_OFFICE_PROCURE": 400.0,
        }

    def _train_baseline_model(self) -> Pipeline:
        """
        Initializes and fits a calibrated scikit-learn Logistic Regression pipeline
        on benchmark transaction vectors.
        Feature vector:
        [
          amount_ratio (amount / mandate_cap),
          item_count,
          velocity_last_minute,
          is_luxury_or_tech (binary),
          basket_deviation (amount / historical_avg)
        ]
        """
        # Synthetic calibrated training corpus
        X_train = np.array([
            # Low risk transactions (Normal grocery / office orders within limits)
            [0.25, 2, 1, 0, 0.9],
            [0.40, 3, 1, 0, 1.1],
            [0.15, 1, 1, 0, 0.8],
            [0.55, 4, 1, 0, 1.2],
            [0.30, 2, 1, 0, 0.95],
            [0.45, 2, 1, 0, 1.05],

            # Moderate risk transactions (Step-up candidates: anomalous spikes, tech accessories)
            [0.85, 4, 2, 0, 1.8],
            [0.72, 3, 2, 1, 1.7],
            [0.80, 3, 1, 1, 2.0],
            [0.65, 3, 3, 0, 1.6],

            # High risk transactions (Severe limit strain, extreme deviation, rapid firing)
            [1.20, 8, 8, 1, 3.5],
            [1.50, 10, 10, 1, 4.0],
            [0.98, 7, 6, 1, 3.0],
            [1.35, 9, 7, 0, 3.8]
        ])

        # Target: 0 (Approved), 1 (Elevated risk / Step-up or Deny)
        y_train = np.array([
            0, 0, 0, 0, 0, 0,
            1, 1, 1, 1,
            1, 1, 1, 1
        ])

        pipeline = Pipeline([
            ("scaler", StandardScaler()),
            ("classifier", LogisticRegression(C=1.0, random_state=42))
        ])
        pipeline.fit(X_train, y_train)
        return pipeline

    def evaluate_risk(
        self,
        agent_id: str,
        total_amount: float,
        mandate_cap: float,
        item_count: int,
        categories: List[str]
    ) -> Tuple[float, List[str]]:
        """
        Calculates calibrated risk score [0.0 - 1.0] and returns risk factor indicators.
        """
        import time
        factors = []
        now = time.time()
        
        # 1. Calculate features
        amount_ratio = total_amount / max(mandate_cap, 1.0)
        
        # Sliding 60-second window for velocity
        timestamps = [t for t in self._agent_timestamps.get(agent_id, []) if (now - t) < 60.0]
        timestamps.append(now)
        self._agent_timestamps[agent_id] = timestamps
        current_velocity = len(timestamps)
        
        is_luxury_or_tech = 1.0 if any(c in ("Electronics", "Luxury") for c in categories) else 0.0
        
        hist_avg = self._agent_avg_baskets.get(agent_id, 300.0)
        basket_deviation = total_amount / max(hist_avg, 1.0)

        # 2. Extract feature explanations
        if amount_ratio > 0.85:
            factors.append(f"High basket-to-mandate ratio ({round(amount_ratio * 100)}% of limit)")
        if current_velocity > 4:
            factors.append(f"Elevated transaction velocity ({current_velocity} calls in 60s window)")
        if is_luxury_or_tech:
            factors.append("Includes high-risk category (Electronics or Luxury)")
        if basket_deviation > 1.8:
            factors.append(f"Significant basket size deviation ({round(basket_deviation, 1)}x historical mean)")

        # 3. Model inference
        features = np.array([[
            amount_ratio,
            float(item_count),
            float(current_velocity),
            is_luxury_or_tech,
            basket_deviation
        ]])

        probs = self.model.predict_proba(features)[0]
        # Probability of elevated risk class
        base_risk = float(probs[1])

        # Ensure logical lower/upper bounds
        if amount_ratio > 1.0:
            base_risk = max(base_risk, 0.88)
        elif is_luxury_or_tech or amount_ratio > 0.80 or basket_deviation > 1.8:
            # Calibrated step-up range for supervised review (0.30 <= risk < 0.70)
            base_risk = float(np.clip(base_risk, 0.42, 0.62))
        elif not factors:
            # Low risk baseline (< 0.30)
            base_risk = min(base_risk, 0.18)
            factors.append("Nominal transaction parameters within established behavioral baseline")

        calibrated_score = round(float(np.clip(base_risk, 0.05, 0.99)), 3)
        return calibrated_score, factors

    def reset_velocity(self):
        self._agent_velocity.clear()

risk_scorer = RiskScorer()

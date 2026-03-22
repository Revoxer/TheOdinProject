import "./Scoreboard.css";

export default function Scoreboard({ score, bestScore, total }) {
  return (
    <div className="scoreboard">
      <div className="score-box">
        <span className="score-label">SCORE</span>
        <span className="score-value">{String(score).padStart(2, "0")}</span>
        <span className="score-total">/ {total}</span>
      </div>
      <div className="score-divider" />
      <div className="score-box best">
        <span className="score-label">BEST</span>
        <span className="score-value">{String(bestScore).padStart(2, "0")}</span>
        <span className="score-total">/ {total}</span>
      </div>
    </div>
  );
}

import "./GameOver.css";

export default function GameOver({ won, score, bestScore, onReset }) {
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-pixel-border">
          <div className={`modal-icon ${won ? "won" : "lost"}`}>
            {won ? "★" : "✕"}
          </div>
          <h2 className="modal-title">{won ? "YOU WIN!" : "GAME OVER!"}</h2>
          <p className="modal-subtitle">
            {won
              ? "You caught all Pokémons!"
              : "You clicked the same one twice!"}
          </p>
          <div className="modal-scores">
            <div className="modal-score-item">
              <span>SCORE</span>
              <strong>{score}</strong>
            </div>
            <div className="modal-score-item highlight">
              <span>BEST</span>
              <strong>{bestScore}</strong>
            </div>
          </div>
          <button className="btn-reset" onClick={onReset}>
            ▶ PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
}

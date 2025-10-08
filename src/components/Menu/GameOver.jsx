import './Menu.css';

function GameOver({ score, distance, paperclips, onRestart }) {
  return (
    <div className="menu-overlay">
      <div className="menu-modal game-over">
        <h1 className="game-over-title">Game Over!</h1>

        <div className="game-over-stats">
          <div className="stat-item">
            <div className="stat-label">Final Score</div>
            <div className="stat-value">{score.toString().padStart(8, '0')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Distance Traveled</div>
            <div className="stat-value">{Math.floor(distance)}m</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Paperclips Collected</div>
            <div className="stat-value">📎 {paperclips}</div>
          </div>
        </div>

        <div className="game-over-message">
          <p>You couldn't escape the corporate grind... yet!</p>
          <p>Try again and upgrade your abilities to run further!</p>
        </div>

        <button className="restart-button" onClick={onRestart}>
          Try Again
        </button>
      </div>
    </div>
  );
}

export default GameOver;

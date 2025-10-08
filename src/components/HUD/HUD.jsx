import './HUD.css';

function HUD({ score, lives, distance, paperclips, onOpenShop }) {
  return (
    <div className="hud">
      <div className="hud-top">
        <div className="hud-item">
          <span className="hud-label">Score:</span>
          <span className="hud-value">{score.toString().padStart(8, '0')}</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">Distance:</span>
          <span className="hud-value">{Math.floor(distance)}m</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">📎 Paperclips:</span>
          <span className="hud-value">{paperclips}</span>
        </div>
      </div>
      <div className="hud-bottom">
        <div className="hud-lives">
          <span className="hud-label">Lives:</span>
          {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
            <span key={i} className="heart">
              ❤️
            </span>
          ))}
        </div>
        <button className="shop-button" onClick={onOpenShop}>
          🛒 Shop
        </button>
      </div>
      <div className="hud-controls">
        <div className="control-hint">
          <kbd>↑</kbd> or <kbd>W</kbd> Jump
        </div>
        <div className="control-hint">
          <kbd>↓</kbd> or <kbd>S</kbd> Slide
        </div>
        <div className="control-hint">
          <kbd>→</kbd> or <kbd>D</kbd> Dash
        </div>
        <div className="control-hint">
          <kbd>ESC</kbd> Pause
        </div>
      </div>
    </div>
  );
}

export default HUD;

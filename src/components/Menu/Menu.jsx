import './Menu.css';

function Menu({ onStartGame }) {
  return (
    <div className="menu-overlay">
      <div className="menu-modal">
        <h1 className="game-title">IA Runner</h1>
        <p className="game-subtitle">Escape the Corporate Routine!</p>

        <div className="menu-content">
          <div className="game-description">
            <p>
              Control an overworked office employee running through an endless office corridor.
            </p>
            <p>Dodge obstacles and collect paperclips to unlock powerful upgrades!</p>
          </div>

          <div className="controls-section">
            <h3>Controls</h3>
            <div className="controls-grid">
              <div className="control-item">
                <kbd>↑</kbd> or <kbd>W</kbd> or <kbd>Space</kbd>
                <span>Jump</span>
              </div>
              <div className="control-item">
                <kbd>↓</kbd> or <kbd>S</kbd>
                <span>Slide</span>
              </div>
              <div className="control-item">
                <kbd>→</kbd> or <kbd>D</kbd>
                <span>Dash</span>
              </div>
              <div className="control-item">
                <kbd>ESC</kbd>
                <span>Pause</span>
              </div>
            </div>
            <p className="mobile-hint">📱 On mobile: Swipe up/down/right or tap to control</p>
          </div>

          <button className="start-button" onClick={onStartGame}>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;

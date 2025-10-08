import './Menu.css';

function PauseMenu({ onResume, onRestart }) {
  return (
    <div className="menu-overlay">
      <div className="menu-modal pause-menu">
        <h1 className="pause-title">⏸️ Paused</h1>

        <div className="pause-buttons">
          <button className="resume-button" onClick={onResume}>
            Resume Game
          </button>
          <button className="restart-button" onClick={onRestart}>
            Restart Game
          </button>
        </div>

        <div className="pause-hint">
          <p>Press <kbd>ESC</kbd> to resume</p>
        </div>
      </div>
    </div>
  );
}

export default PauseMenu;

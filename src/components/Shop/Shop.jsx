import { useState } from 'react';
import './Shop.css';

function Shop({ upgrades, paperclips, onPurchase, onClose }) {
  const [message, setMessage] = useState('');

  const handlePurchase = (upgradeKey) => {
    const result = onPurchase(upgradeKey);
    setMessage(result.message);
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="shop-overlay">
      <div className="shop-modal">
        <div className="shop-header">
          <h2>🛒 Upgrade Shop</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="shop-balance">
          <span>📎 Paperclips: </span>
          <strong>{paperclips}</strong>
        </div>

        {message && <div className="shop-message">{message}</div>}

        <div className="shop-upgrades">
          {Object.entries(upgrades).map(([key, upgrade]) => (
            <div key={key} className="upgrade-card">
              <div className="upgrade-header">
                <h3>{upgrade.name}</h3>
                <div className="upgrade-level">
                  Level {upgrade.currentLevel}/{upgrade.maxLevel}
                </div>
              </div>
              <p className="upgrade-description">{upgrade.description}</p>

              <div className="upgrade-footer">
                <div className="upgrade-cost">
                  {upgrade.maxed ? (
                    <span className="maxed">MAX LEVEL</span>
                  ) : (
                    <>
                      <span className="cost-label">Cost:</span>
                      <span className="cost-value">
                        📎 {upgrade.cost}
                      </span>
                    </>
                  )}
                </div>
                <button
                  className={`upgrade-button ${
                    upgrade.maxed || !upgrade.canAfford ? 'disabled' : ''
                  }`}
                  onClick={() => handlePurchase(key)}
                  disabled={upgrade.maxed || !upgrade.canAfford}
                >
                  {upgrade.maxed ? 'Maxed' : upgrade.canAfford ? 'Buy' : 'Too Expensive'}
                </button>
              </div>

              <div className="upgrade-progress">
                <div
                  className="upgrade-progress-bar"
                  style={{
                    width: `${(upgrade.currentLevel / upgrade.maxLevel) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="shop-footer">
          <button className="continue-button" onClick={onClose}>
            Continue Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shop;

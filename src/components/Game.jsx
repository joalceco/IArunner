import { useRef, useEffect, useState } from 'react';
import { GameEngine } from '../game/GameEngine.js';
import { GAME_CONFIG, GAME_STATES, KEYS } from '../game/config.js';
import HUD from './HUD/HUD.jsx';
import Shop from './Shop/Shop.jsx';
import Menu from './Menu/Menu.jsx';
import GameOver from './Menu/GameOver.jsx';
import PauseMenu from './Menu/PauseMenu.jsx';
import './Game.css';

function Game() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const animationIdRef = useRef(null);
  const lastTimeRef = useRef(0);
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [gameStats, setGameStats] = useState({
    score: 0,
    lives: 3,
    distance: 0,
    paperclips: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const game = new GameEngine();
    gameRef.current = game;

    const gameLoop = (timestamp) => {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Update game
      game.update(deltaTime);

      // Draw game
      game.draw(ctx);

      // Update UI state
      setGameState(game.state);
      setGameStats({
        score: game.score,
        lives: game.player.lives,
        distance: game.distance,
        paperclips: game.totalPaperclips,
      });

      animationIdRef.current = requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e) => {
      if (e.key === KEYS.ESCAPE) {
        e.preventDefault();
        if (game.state === GAME_STATES.PLAYING) {
          game.pause();
        } else if (game.state === GAME_STATES.PAUSED) {
          game.pause();
        } else if (game.state === GAME_STATES.SHOP) {
          game.closeShop();
        }
      }

      if (game.state === GAME_STATES.PLAYING) {
        game.player.handleKeyDown(e.key);
      }
    };

    const handleKeyUp = (e) => {
      if (game.state === GAME_STATES.PLAYING) {
        game.player.handleKeyUp(e.key);
      }
    };

    // Touch controls for mobile
    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (game.state !== GAME_STATES.PLAYING) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const diffY = touchStartY - touchEndY;
      const diffX = touchEndX - touchStartX;

      // Swipe up - jump
      if (diffY > 50 && Math.abs(diffX) < 50) {
        game.player.jump();
      }
      // Swipe down - slide
      else if (diffY < -50 && Math.abs(diffX) < 50) {
        game.player.slide();
      }
      // Swipe right - dash
      else if (diffX > 50 && Math.abs(diffY) < 50) {
        game.player.dash();
      }
      // Tap - jump
      else if (Math.abs(diffX) < 30 && Math.abs(diffY) < 30) {
        game.player.jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);

    // Start game loop
    lastTimeRef.current = performance.now();
    animationIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  const handleStartGame = () => {
    gameRef.current.start();
  };

  const handleResumeGame = () => {
    gameRef.current.pause();
  };

  const handleRestartGame = () => {
    gameRef.current.start();
  };

  const handlePurchaseUpgrade = (upgradeKey) => {
    return gameRef.current.purchaseUpgrade(upgradeKey);
  };

  const handleCloseShop = () => {
    gameRef.current.closeShop();
  };

  const handleOpenShop = () => {
    if (gameState === GAME_STATES.PLAYING) {
      gameRef.current.openShop();
    }
  };

  const getAllUpgrades = () => {
    const upgrades = {};
    Object.keys(GAME_CONFIG.UPGRADES).forEach((key) => {
      upgrades[key] = gameRef.current.getUpgradeInfo(key);
    });
    return upgrades;
  };

  return (
    <div className="game-container">
      <canvas
        ref={canvasRef}
        width={GAME_CONFIG.CANVAS_WIDTH}
        height={GAME_CONFIG.CANVAS_HEIGHT}
        className="game-canvas"
      />

      {gameState === GAME_STATES.MENU && <Menu onStartGame={handleStartGame} />}

      {gameState === GAME_STATES.PLAYING && (
        <HUD
          score={gameStats.score}
          lives={gameStats.lives}
          distance={gameStats.distance}
          paperclips={gameStats.paperclips}
          onOpenShop={handleOpenShop}
        />
      )}

      {gameState === GAME_STATES.PAUSED && (
        <PauseMenu onResume={handleResumeGame} onRestart={handleRestartGame} />
      )}

      {gameState === GAME_STATES.SHOP && (
        <Shop
          upgrades={getAllUpgrades()}
          paperclips={gameStats.paperclips}
          onPurchase={handlePurchaseUpgrade}
          onClose={handleCloseShop}
        />
      )}

      {gameState === GAME_STATES.GAME_OVER && (
        <GameOver
          score={gameStats.score}
          distance={gameStats.distance}
          paperclips={gameStats.paperclips}
          onRestart={handleRestartGame}
        />
      )}
    </div>
  );
}

export default Game;

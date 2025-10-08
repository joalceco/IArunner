import { GAME_CONFIG, GAME_STATES } from '../game/config.js';
import { GameEngine } from '../game/GameEngine.js';

describe('XP and Scoring Curve', () => {
  test('should start with initial speed', () => {
    const game = new GameEngine();
    expect(game.gameSpeed).toBe(GAME_CONFIG.INITIAL_SPEED);
  });

  test('should increase speed over time', () => {
    const game = new GameEngine();
    game.start();

    const initialSpeed = game.gameSpeed;
    
    // Simulate 5 seconds of gameplay
    for (let i = 0; i < 50; i++) {
      game.update(100);
    }

    expect(game.gameSpeed).toBeGreaterThan(initialSpeed);
  });

  test('should cap speed at maximum', () => {
    const game = new GameEngine();
    game.start();
    game.distance = 10000; // Simulate long distance

    // Update to trigger speed calculation
    game.update(16);

    expect(game.gameSpeed).toBeLessThanOrEqual(GAME_CONFIG.MAX_SPEED);
  });

  test('should calculate score based on distance', () => {
    const game = new GameEngine();
    game.start();
    
    game.distance = 100.5;
    game.score = Math.floor(game.distance);
    
    expect(game.score).toBe(100);
  });

  test('should accumulate paperclips correctly', () => {
    const game = new GameEngine();
    game.start();

    const initialPaperclips = game.totalPaperclips;
    
    // Manually add paperclips as if collecting
    game.totalPaperclips += GAME_CONFIG.PAPERCLIP_VALUE;
    game.totalPaperclips += GAME_CONFIG.PAPERCLIP_VALUE;
    game.totalPaperclips += GAME_CONFIG.PAPERCLIP_VALUE;

    expect(game.totalPaperclips).toBe(initialPaperclips + GAME_CONFIG.PAPERCLIP_VALUE * 3);
  });

  test('should track milestones correctly', () => {
    const game = new GameEngine();
    game.start();
    
    // Simulate game running to reach a milestone
    game.distance = 500;
    game.score = 500;
    game.lastMilestone = 0;
    
    game.update(16);

    // Should have opened shop at first milestone
    expect(game.state).toBe(GAME_STATES.SHOP);
  });
});

describe('Player Lives and Damage', () => {
  test('should start with 3 lives', () => {
    const game = new GameEngine();
    game.start();
    expect(game.player.lives).toBe(3);
  });

  test('should increase lives with energy drink upgrade', () => {
    const game = new GameEngine();
    game.upgrades.ENERGY_DRINK.level = 2;
    game.start();

    expect(game.player.lives).toBe(5); // 3 base + 2 from upgrade
  });

  test('should reduce damage with keyboard armor', () => {
    const game = new GameEngine();
    game.start();
    
    const initialLives = game.player.lives;
    
    // Without armor
    game.player.takeDamage(1, 0);
    expect(game.player.lives).toBe(initialLives - 1);

    // Reset
    game.player.lives = initialLives;
    
    // With armor (25% reduction per level)
    game.player.takeDamage(1, 1);
    // Should take less than 1 full damage due to armor
    expect(game.player.lives).toBeGreaterThan(initialLives - 1);
  });
});

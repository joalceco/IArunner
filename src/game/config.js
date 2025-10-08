export const GAME_CONFIG = {
  // Canvas dimensions
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 400,
  
  // Player configuration
  PLAYER_WIDTH: 40,
  PLAYER_HEIGHT: 60,
  PLAYER_START_X: 100,
  PLAYER_GROUND_Y: 320,
  
  // Physics
  GRAVITY: 0.6,
  JUMP_FORCE: -12,
  SLIDE_DURATION: 500,
  DASH_FORCE: 15,
  DASH_DURATION: 300,
  
  // Game speed
  INITIAL_SPEED: 3,
  SPEED_INCREMENT: 0.002,
  MAX_SPEED: 12,
  
  // Obstacles
  OBSTACLE_MIN_GAP: 400,
  OBSTACLE_MAX_GAP: 800,
  OBSTACLE_SPAWN_CHANCE: 0.02,
  
  // Collectibles
  COLLECTIBLE_SPAWN_CHANCE: 0.015,
  COLLECTIBLE_SIZE: 20,
  PAPERCLIP_VALUE: 10,
  
  // Upgrades
  UPGRADES: {
    MAGNET: {
      name: 'Magnet',
      description: 'Auto-collect nearby clips',
      baseCost: 100,
      costMultiplier: 2.5,
      maxLevel: 5,
      effectPerLevel: 50, // radius in pixels
    },
    ENERGY_DRINK: {
      name: 'Energy Drink',
      description: 'Extra life/health',
      baseCost: 200,
      costMultiplier: 3,
      maxLevel: 3,
      effectPerLevel: 1, // lives
    },
    COFFEE_BOOST: {
      name: 'Coffee Boost',
      description: 'Temporary speed boost',
      baseCost: 150,
      costMultiplier: 2,
      maxLevel: 5,
      effectPerLevel: 0.5, // speed multiplier
      duration: 5000, // milliseconds
    },
    KEYBOARD_ARMOR: {
      name: 'Keyboard Armor',
      description: 'Reduce obstacle damage',
      baseCost: 250,
      costMultiplier: 2.8,
      maxLevel: 4,
      effectPerLevel: 25, // damage reduction %
    },
    ROLLER_CHAIR: {
      name: 'Roller-chair Wheels',
      description: 'Short gliding ability',
      baseCost: 300,
      costMultiplier: 2.5,
      maxLevel: 3,
      effectPerLevel: 500, // glide duration in ms
    },
    HEADPHONES: {
      name: 'Headphones',
      description: 'Temporary invincibility',
      baseCost: 500,
      costMultiplier: 3.5,
      maxLevel: 3,
      effectPerLevel: 1000, // invincibility duration in ms
    },
  },
  
  // Milestones for shop triggers
  MILESTONES: [500, 1000, 2500, 5000, 10000],
};

export const KEYS = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  SPACE: ' ',
  W: 'w',
  S: 's',
  A: 'a',
  D: 'd',
  ESCAPE: 'Escape',
};

export const GAME_STATES = {
  MENU: 'MENU',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  GAME_OVER: 'GAME_OVER',
  SHOP: 'SHOP',
};

export const OBSTACLE_TYPES = {
  DESK: { width: 60, height: 60, damage: 1, color: '#8B4513' },
  PRINTER: { width: 50, height: 70, damage: 1, color: '#696969' },
  PAPERS: { width: 40, height: 50, damage: 1, color: '#FFFFFF' },
  FLYING_MEMO: { width: 30, height: 30, damage: 1, color: '#FFD700', flying: true },
};

import { GAME_CONFIG, GAME_STATES, OBSTACLE_TYPES } from './config.js';
import { Player } from './entities/Player.js';
import { Obstacle } from './entities/Obstacle.js';
import { Collectible } from './entities/Collectible.js';
import { Background } from './systems/Background.js';
import { checkCollision, getDistance, randomRange, calculateUpgradeCost } from './utils/helpers.js';

export class GameEngine {
  constructor() {
    this.state = GAME_STATES.MENU;
    this.player = new Player();
    this.background = new Background();
    this.obstacles = [];
    this.collectibles = [];
    this.score = 0;
    this.distance = 0;
    this.gameSpeed = GAME_CONFIG.INITIAL_SPEED;
    this.lastObstacleX = GAME_CONFIG.CANVAS_WIDTH;
    this.upgrades = this.initializeUpgrades();
    this.totalPaperclips = 0;
    this.activeBoosts = {
      coffeeBoost: null,
      rollerChair: null,
      headphones: null,
    };
    this.lastMilestone = 0;
    this.soundEnabled = true;
  }

  initializeUpgrades() {
    const upgrades = {};
    Object.keys(GAME_CONFIG.UPGRADES).forEach((key) => {
      upgrades[key] = { level: 0 };
    });
    return upgrades;
  }

  start() {
    this.state = GAME_STATES.PLAYING;
    this.reset();
  }

  reset() {
    this.player.reset();
    this.background.reset();
    this.obstacles = [];
    this.collectibles = [];
    this.score = 0;
    this.distance = 0;
    this.gameSpeed = GAME_CONFIG.INITIAL_SPEED;
    this.lastObstacleX = GAME_CONFIG.CANVAS_WIDTH;
    this.activeBoosts = {
      coffeeBoost: null,
      rollerChair: null,
      headphones: null,
    };
    this.lastMilestone = 0;
    // Restore lives based on energy drink upgrade
    const energyDrinkLevel = this.upgrades.ENERGY_DRINK.level;
    this.player.lives = 3 + energyDrinkLevel;
  }

  pause() {
    if (this.state === GAME_STATES.PLAYING) {
      this.state = GAME_STATES.PAUSED;
    } else if (this.state === GAME_STATES.PAUSED) {
      this.state = GAME_STATES.PLAYING;
    }
  }

  openShop() {
    this.state = GAME_STATES.SHOP;
  }

  closeShop() {
    this.state = GAME_STATES.PLAYING;
  }

  gameOver() {
    this.state = GAME_STATES.GAME_OVER;
  }

  update(deltaTime) {
    if (this.state !== GAME_STATES.PLAYING) return;

    // Update distance and score
    this.distance += this.gameSpeed * deltaTime * 0.1;
    this.score = Math.floor(this.distance);

    // Check for milestones
    const currentMilestone = GAME_CONFIG.MILESTONES.find(
      (m) => m > this.lastMilestone && this.score >= m
    );
    if (currentMilestone) {
      this.lastMilestone = currentMilestone;
      this.openShop();
      return;
    }

    // Increase speed over time
    this.gameSpeed = Math.min(
      GAME_CONFIG.MAX_SPEED,
      GAME_CONFIG.INITIAL_SPEED + this.distance * GAME_CONFIG.SPEED_INCREMENT
    );

    // Apply coffee boost
    let effectiveSpeed = this.gameSpeed;
    if (this.activeBoosts.coffeeBoost && this.activeBoosts.coffeeBoost > 0) {
      const boostLevel = this.upgrades.COFFEE_BOOST.level;
      const boostMultiplier = 1 + boostLevel * 0.5;
      effectiveSpeed *= boostMultiplier;
      this.activeBoosts.coffeeBoost -= deltaTime;
      if (this.activeBoosts.coffeeBoost <= 0) {
        this.activeBoosts.coffeeBoost = null;
      }
    }

    // Apply headphones invincibility
    if (this.activeBoosts.headphones && this.activeBoosts.headphones > 0) {
      this.player.isInvincible = true;
      this.activeBoosts.headphones -= deltaTime;
      if (this.activeBoosts.headphones <= 0) {
        this.activeBoosts.headphones = null;
        this.player.isInvincible = false;
      }
    }

    // Update background
    this.background.update(effectiveSpeed);

    // Update player
    this.player.update(deltaTime, this.upgrades);

    // Spawn obstacles
    this.spawnObstacles();

    // Spawn collectibles
    this.spawnCollectibles();

    // Update obstacles
    this.obstacles = this.obstacles.filter((obstacle) => {
      obstacle.update(deltaTime, effectiveSpeed);
      return obstacle.active;
    });

    // Update collectibles
    this.collectibles = this.collectibles.filter((collectible) => {
      collectible.update(deltaTime, effectiveSpeed);
      return collectible.active;
    });

    // Check collisions with obstacles
    this.checkObstacleCollisions();

    // Check collisions with collectibles
    this.checkCollectibleCollisions();

    // Check game over
    if (this.player.lives <= 0) {
      this.gameOver();
    }
  }

  spawnObstacles() {
    if (this.lastObstacleX < GAME_CONFIG.CANVAS_WIDTH - 100) {
      if (Math.random() < GAME_CONFIG.OBSTACLE_SPAWN_CHANCE) {
        const types = Object.keys(OBSTACLE_TYPES);
        const randomType = types[Math.floor(Math.random() * types.length)];
        const gap = randomRange(GAME_CONFIG.OBSTACLE_MIN_GAP, GAME_CONFIG.OBSTACLE_MAX_GAP);
        this.lastObstacleX = GAME_CONFIG.CANVAS_WIDTH + gap;
        this.obstacles.push(new Obstacle(this.lastObstacleX, randomType));
      }
    }

    // Update lastObstacleX based on rightmost obstacle
    const rightmostObstacle = this.obstacles.reduce((max, obs) => {
      return obs.x > max ? obs.x : max;
    }, 0);
    if (rightmostObstacle > this.lastObstacleX) {
      this.lastObstacleX = rightmostObstacle;
    }
  }

  spawnCollectibles() {
    if (Math.random() < GAME_CONFIG.COLLECTIBLE_SPAWN_CHANCE) {
      this.collectibles.push(
        new Collectible(GAME_CONFIG.CANVAS_WIDTH + 50)
      );
    }
  }

  checkObstacleCollisions() {
    const playerBounds = this.player.getBounds();

    this.obstacles.forEach((obstacle) => {
      if (obstacle.active && checkCollision(playerBounds, obstacle.getBounds())) {
        const armorLevel = this.upgrades.KEYBOARD_ARMOR.level;
        const damaged = this.player.takeDamage(obstacle.damage, armorLevel);
        if (damaged) {
          obstacle.active = false;
        }
      }
    });
  }

  checkCollectibleCollisions() {
    const playerBounds = this.player.getBounds();
    const magnetLevel = this.upgrades.MAGNET.level;
    const magnetRadius = magnetLevel * 50;

    this.collectibles.forEach((collectible) => {
      if (!collectible.active || collectible.collected) return;

      // Check magnet effect
      if (magnetLevel > 0) {
        const distance = getDistance(
          playerBounds.x + playerBounds.width / 2,
          playerBounds.y + playerBounds.height / 2,
          collectible.x + collectible.width / 2,
          collectible.y + collectible.height / 2
        );

        if (distance <= magnetRadius) {
          const value = collectible.collect();
          this.totalPaperclips += value;
          return;
        }
      }

      // Check direct collision
      if (checkCollision(playerBounds, collectible.getBounds())) {
        const value = collectible.collect();
        this.totalPaperclips += value;
      }
    });
  }

  purchaseUpgrade(upgradeKey) {
    const upgrade = GAME_CONFIG.UPGRADES[upgradeKey];
    const currentLevel = this.upgrades[upgradeKey].level;

    if (currentLevel >= upgrade.maxLevel) {
      return { success: false, message: 'Max level reached' };
    }

    const cost = calculateUpgradeCost(upgrade.baseCost, currentLevel, upgrade.costMultiplier);

    if (this.totalPaperclips < cost) {
      return { success: false, message: 'Not enough paperclips' };
    }

    this.totalPaperclips -= cost;
    this.upgrades[upgradeKey].level += 1;

    return { success: true, message: 'Upgrade purchased!' };
  }

  activateBoost(boostType) {
    if (boostType === 'COFFEE_BOOST') {
      const duration = GAME_CONFIG.UPGRADES.COFFEE_BOOST.duration;
      this.activeBoosts.coffeeBoost = duration;
    } else if (boostType === 'HEADPHONES') {
      const level = this.upgrades.HEADPHONES.level;
      const duration = level * GAME_CONFIG.UPGRADES.HEADPHONES.effectPerLevel;
      this.activeBoosts.headphones = duration;
      this.player.activateInvincibility(duration);
    }
  }

  getUpgradeInfo(upgradeKey) {
    const upgrade = GAME_CONFIG.UPGRADES[upgradeKey];
    const currentLevel = this.upgrades[upgradeKey].level;
    const cost = calculateUpgradeCost(upgrade.baseCost, currentLevel, upgrade.costMultiplier);
    const nextCost =
      currentLevel < upgrade.maxLevel
        ? calculateUpgradeCost(upgrade.baseCost, currentLevel + 1, upgrade.costMultiplier)
        : null;

    return {
      name: upgrade.name,
      description: upgrade.description,
      currentLevel,
      maxLevel: upgrade.maxLevel,
      cost,
      nextCost,
      canAfford: this.totalPaperclips >= cost,
      maxed: currentLevel >= upgrade.maxLevel,
    };
  }

  draw(ctx) {
    // Clear canvas
    ctx.clearRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);

    // Draw background
    this.background.draw(ctx);

    // Draw collectibles
    this.collectibles.forEach((collectible) => collectible.draw(ctx));

    // Draw obstacles
    this.obstacles.forEach((obstacle) => obstacle.draw(ctx));

    // Draw player
    this.player.draw(ctx);

    // Draw magnet radius (if active)
    if (this.upgrades.MAGNET.level > 0) {
      const magnetRadius = this.upgrades.MAGNET.level * 50;
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        this.player.x + this.player.width / 2,
        this.player.y + this.player.height / 2,
        magnetRadius,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  }
}

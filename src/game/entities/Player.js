import { GAME_CONFIG, KEYS } from '../config.js';
import { clamp } from '../utils/helpers.js';

export class Player {
  constructor() {
    this.width = GAME_CONFIG.PLAYER_WIDTH;
    this.height = GAME_CONFIG.PLAYER_HEIGHT;
    this.x = GAME_CONFIG.PLAYER_START_X;
    this.y = GAME_CONFIG.PLAYER_GROUND_Y;
    this.velocityY = 0;
    this.isJumping = false;
    this.isSliding = false;
    this.isDashing = false;
    this.isInvincible = false;
    this.lives = 3;
    this.slideTimer = 0;
    this.dashTimer = 0;
    this.invincibilityTimer = 0;
    this.keys = {};
  }

  update(deltaTime, _upgrades = {}, platforms = []) {
    // Handle sliding
    if (this.isSliding) {
      this.slideTimer -= deltaTime;
      if (this.slideTimer <= 0) {
        this.isSliding = false;
        this.height = GAME_CONFIG.PLAYER_HEIGHT;
      }
    }

    // Handle dashing
    if (this.isDashing) {
      this.dashTimer -= deltaTime;
      if (this.dashTimer <= 0) {
        this.isDashing = false;
      }
    }

    // Handle invincibility
    if (this.isInvincible) {
      this.invincibilityTimer -= deltaTime;
      if (this.invincibilityTimer <= 0) {
        this.isInvincible = false;
      }
    }

    // Apply gravity
    this.velocityY += GAME_CONFIG.GRAVITY;
    this.y += this.velocityY;

    // Ground collision
    const groundY = this.isSliding
      ? GAME_CONFIG.PLAYER_GROUND_Y + 20
      : GAME_CONFIG.PLAYER_GROUND_Y;

    let onPlatform = false;

    // Check platform collision (land on platforms)
    if (this.velocityY > 0) { // Only when falling
      for (const platform of platforms) {
        if (platform.active) {
          const playerBottom = this.y + this.height;
          const playerLeft = this.x;
          const playerRight = this.x + this.width;
          const platformTop = platform.y;
          const platformLeft = platform.x;
          const platformRight = platform.x + platform.width;

          // Check if player is above platform and landing on it
          if (
            playerBottom >= platformTop &&
            playerBottom <= platformTop + 10 &&
            playerRight > platformLeft &&
            playerLeft < platformRight
          ) {
            this.y = platformTop - this.height;
            this.velocityY = 0;
            this.isJumping = false;
            onPlatform = true;
            break;
          }
        }
      }
    }

    // Ground collision (only if not on platform)
    if (!onPlatform && this.y >= groundY) {
      this.y = groundY;
      this.velocityY = 0;
      this.isJumping = false;
    }

    // Clamp position
    this.y = clamp(this.y, 0, GAME_CONFIG.CANVAS_HEIGHT - this.height);
  }

  jump() {
    if (!this.isJumping && !this.isSliding) {
      this.velocityY = GAME_CONFIG.JUMP_FORCE;
      this.isJumping = true;
    }
  }

  slide() {
    if (!this.isSliding && !this.isJumping) {
      this.isSliding = true;
      this.slideTimer = GAME_CONFIG.SLIDE_DURATION;
      this.height = GAME_CONFIG.PLAYER_HEIGHT / 2;
    }
  }

  dash() {
    if (!this.isDashing) {
      this.isDashing = true;
      this.dashTimer = GAME_CONFIG.DASH_DURATION;
    }
  }

  activateInvincibility(duration) {
    this.isInvincible = true;
    this.invincibilityTimer = duration;
  }

  takeDamage(amount, armorLevel = 0) {
    if (this.isInvincible) return false;

    const damageReduction = armorLevel * 25; // 25% per level
    const actualDamage = Math.max(0, amount - amount * (damageReduction / 100));

    if (actualDamage > 0) {
      this.lives = Math.max(0, this.lives - actualDamage);
      // Brief invincibility after taking damage
      this.activateInvincibility(1000);
      return true;
    }
    return false;
  }

  handleKeyDown(key) {
    this.keys[key] = true;

    if (key === KEYS.ARROW_UP || key === KEYS.W || key === KEYS.SPACE) {
      this.jump();
    } else if (key === KEYS.ARROW_DOWN || key === KEYS.S) {
      this.slide();
    } else if (key === KEYS.ARROW_RIGHT || key === KEYS.D) {
      this.dash();
    }
  }

  handleKeyUp(key) {
    this.keys[key] = false;
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  reset() {
    this.x = GAME_CONFIG.PLAYER_START_X;
    this.y = GAME_CONFIG.PLAYER_GROUND_Y;
    this.velocityY = 0;
    this.isJumping = false;
    this.isSliding = false;
    this.isDashing = false;
    this.isInvincible = false;
    this.lives = 3;
    this.slideTimer = 0;
    this.dashTimer = 0;
    this.invincibilityTimer = 0;
    this.keys = {};
  }

  draw(ctx) {
    ctx.save();

    // Flash effect when invincible
    if (this.isInvincible && Math.floor(Date.now() / 100) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }

    // Draw player body
    ctx.fillStyle = this.isDashing ? '#FF6B6B' : '#4A90E2';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw player head
    ctx.fillStyle = '#FFD93D';
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + 10, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw limbs (simple representation)
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 3;
    
    // Arms
    if (!this.isSliding) {
      ctx.beginPath();
      ctx.moveTo(this.x + 5, this.y + 20);
      ctx.lineTo(this.x, this.y + 35);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(this.x + this.width - 5, this.y + 20);
      ctx.lineTo(this.x + this.width, this.y + 35);
      ctx.stroke();
    }

    // Legs
    ctx.beginPath();
    ctx.moveTo(this.x + 10, this.y + this.height);
    ctx.lineTo(this.x + 10, this.y + this.height + 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.x + this.width - 10, this.y + this.height);
    ctx.lineTo(this.x + this.width - 10, this.y + this.height + 10);
    ctx.stroke();

    ctx.restore();
  }
}

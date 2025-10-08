import { GAME_CONFIG, OBSTACLE_TYPES } from '../config.js';

export class Obstacle {
  constructor(x, type) {
    this.type = type;
    const config = OBSTACLE_TYPES[type];
    this.width = config.width;
    this.height = config.height;
    this.damage = config.damage;
    this.color = config.color;
    this.flying = config.flying || false;
    this.x = x;
    this.y = this.flying
      ? Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - 150) + 50
      : GAME_CONFIG.PLAYER_GROUND_Y + GAME_CONFIG.PLAYER_HEIGHT - this.height;
    this.active = true;
  }

  update(deltaTime, gameSpeed) {
    this.x -= gameSpeed;

    // Deactivate if off screen
    if (this.x + this.width < 0) {
      this.active = false;
    }
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  draw(ctx) {
    if (!this.active) return;

    ctx.fillStyle = this.color;
    
    if (this.type === 'DESK') {
      // Draw desk
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = '#654321';
      ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
      // Desk legs
      ctx.fillStyle = '#4A3829';
      ctx.fillRect(this.x + 5, this.y + this.height - 15, 8, 15);
      ctx.fillRect(this.x + this.width - 13, this.y + this.height - 15, 8, 15);
    } else if (this.type === 'PRINTER') {
      // Draw printer
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = '#505050';
      ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, 20);
      // Paper tray
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(this.x + 10, this.y + 30, this.width - 20, 5);
    } else if (this.type === 'PAPERS') {
      // Draw stack of papers
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      // Draw lines on papers
      ctx.strokeStyle = '#CCCCCC';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const lineY = this.y + 10 + i * 8;
        ctx.beginPath();
        ctx.moveTo(this.x + 5, lineY);
        ctx.lineTo(this.x + this.width - 5, lineY);
        ctx.stroke();
      }
    } else if (this.type === 'FLYING_MEMO') {
      // Draw flying memo
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      // Draw text lines
      ctx.strokeStyle = '#B8860B';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        const lineY = this.y + 8 + i * 8;
        ctx.beginPath();
        ctx.moveTo(this.x + 3, lineY);
        ctx.lineTo(this.x + this.width - 3, lineY);
        ctx.stroke();
      }
    }
  }
}

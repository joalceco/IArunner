import { GAME_CONFIG } from '../config.js';

export class Platform {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 20;
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

    // Draw platform with office floor appearance
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Add border
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    
    // Add wood grain effect
    ctx.strokeStyle = '#6B5345';
    ctx.lineWidth = 1;
    for (let i = 0; i < this.width; i += 30) {
      ctx.beginPath();
      ctx.moveTo(this.x + i, this.y);
      ctx.lineTo(this.x + i, this.y + this.height);
      ctx.stroke();
    }
  }
}

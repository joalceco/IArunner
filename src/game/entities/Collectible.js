import { GAME_CONFIG } from '../config.js';

export class Collectible {
  constructor(x, y) {
    this.width = GAME_CONFIG.COLLECTIBLE_SIZE;
    this.height = GAME_CONFIG.COLLECTIBLE_SIZE;
    this.x = x;
    this.y = y || Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - 100) + 50;
    this.value = GAME_CONFIG.PAPERCLIP_VALUE;
    this.active = true;
    this.collected = false;
    this.animationFrame = 0;
  }

  update(deltaTime, gameSpeed) {
    if (!this.collected) {
      this.x -= gameSpeed;
      this.animationFrame += deltaTime * 0.01;
    }

    // Deactivate if off screen
    if (this.x + this.width < 0) {
      this.active = false;
    }
  }

  collect() {
    if (!this.collected) {
      this.collected = true;
      this.active = false;
      return this.value;
    }
    return 0;
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
    if (!this.active || this.collected) return;

    ctx.save();

    // Floating animation
    const floatOffset = Math.sin(this.animationFrame) * 5;

    // Draw paperclip
    ctx.strokeStyle = '#C0C0C0';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2 + floatOffset;

    // Outer loop
    ctx.beginPath();
    ctx.arc(centerX - 3, centerY, 6, Math.PI * 0.5, Math.PI * 1.5);
    ctx.stroke();

    // Inner loop
    ctx.beginPath();
    ctx.arc(centerX + 3, centerY, 6, Math.PI * 1.5, Math.PI * 0.5);
    ctx.stroke();

    // Connecting lines
    ctx.beginPath();
    ctx.moveTo(centerX - 3, centerY - 6);
    ctx.lineTo(centerX + 3, centerY - 6);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - 3, centerY + 6);
    ctx.lineTo(centerX + 3, centerY + 6);
    ctx.stroke();

    // Glow effect
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }
}

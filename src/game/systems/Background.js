import { GAME_CONFIG } from '../config.js';

export class Background {
  constructor() {
    this.layers = [
      { x: 0, speed: 0.2, color: '#E8E8E8', height: 0.3 }, // Far background
      { x: 0, speed: 0.5, color: '#D0D0D0', height: 0.5 }, // Mid background
      { x: 0, speed: 1, color: '#B8B8B8', height: 0.7 },   // Near background
    ];
    this.floorX = 0;
  }

  update(gameSpeed) {
    // Update each layer
    this.layers.forEach((layer) => {
      layer.x -= gameSpeed * layer.speed;
      // Wrap around
      if (layer.x <= -GAME_CONFIG.CANVAS_WIDTH) {
        layer.x = 0;
      }
    });

    // Update floor
    this.floorX -= gameSpeed;
    if (this.floorX <= -50) {
      this.floorX = 0;
    }
  }

  draw(ctx) {
    const canvasWidth = GAME_CONFIG.CANVAS_WIDTH;
    const canvasHeight = GAME_CONFIG.CANVAS_HEIGHT;

    // Draw sky/ceiling
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw parallax layers (office walls with windows/doors)
    this.layers.forEach((layer, index) => {
      ctx.fillStyle = layer.color;
      
      // Draw repeating pattern
      for (let i = -1; i <= 1; i++) {
        const x = layer.x + i * canvasWidth;
        const layerHeight = canvasHeight * layer.height;
        
        ctx.fillRect(x, 0, canvasWidth, layerHeight);

        // Draw windows/doors on far layers
        if (index === 0) {
          // Windows
          ctx.fillStyle = '#87CEEB';
          for (let j = 0; j < 4; j++) {
            const windowX = x + 100 + j * 180;
            const windowY = 50;
            ctx.fillRect(windowX, windowY, 80, 100);
            // Window panes
            ctx.strokeStyle = '#4A4A4A';
            ctx.lineWidth = 3;
            ctx.strokeRect(windowX, windowY, 80, 100);
            ctx.beginPath();
            ctx.moveTo(windowX + 40, windowY);
            ctx.lineTo(windowX + 40, windowY + 100);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(windowX, windowY + 50);
            ctx.lineTo(windowX + 80, windowY + 50);
            ctx.stroke();
          }
          ctx.fillStyle = layer.color;
        } else if (index === 1) {
          // Doors
          ctx.fillStyle = '#8B4513';
          for (let j = 0; j < 3; j++) {
            const doorX = x + 150 + j * 250;
            const doorY = layerHeight - 120;
            ctx.fillRect(doorX, doorY, 60, 120);
            // Door knob
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(doorX + 50, doorY + 60, 5, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = layer.color;
        }
      }
    });

    // Draw floor
    const floorY = GAME_CONFIG.PLAYER_GROUND_Y + GAME_CONFIG.PLAYER_HEIGHT;
    ctx.fillStyle = '#A0A0A0';
    ctx.fillRect(0, floorY, canvasWidth, canvasHeight - floorY);

    // Draw floor tiles
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 2;
    for (let i = 0; i < canvasWidth / 50 + 1; i++) {
      const x = this.floorX + i * 50;
      ctx.beginPath();
      ctx.moveTo(x, floorY);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
    }

    // Draw ceiling
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasWidth, 30);
    
    // Ceiling lights
    ctx.fillStyle = '#FFFFE0';
    for (let i = 0; i < 5; i++) {
      const lightX = 100 + i * 150;
      ctx.fillRect(lightX, 5, 80, 20);
      ctx.strokeStyle = '#CCCCCC';
      ctx.lineWidth = 2;
      ctx.strokeRect(lightX, 5, 80, 20);
    }
  }

  reset() {
    this.layers.forEach((layer) => {
      layer.x = 0;
    });
    this.floorX = 0;
  }
}

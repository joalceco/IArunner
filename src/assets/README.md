# Asset Placeholders

This directory contains placeholders for game assets.

## Images (`/images`)

The game currently uses programmatic drawing (canvas 2D API) for all visual elements.
To add custom sprites:

1. Add image files here (PNG or SVG format)
2. Import them in the respective entity files
3. Use `ctx.drawImage()` instead of the current drawing code

Example sprites needed:
- `player.png` - Office worker character sprite sheet
- `desk.png` - Desk obstacle
- `printer.png` - Printer obstacle
- `papers.png` - Stack of papers
- `memo.png` - Flying memo
- `paperclip.png` - Collectible paperclip
- `background-layers/` - Parallax background layers

## Sounds (`/sounds`)

The game uses the Web Audio API to generate simple sound effects.
To add custom audio:

1. Add audio files here (MP3, OGG, or WAV format)
2. Update `SoundSystem.js` to load and play the audio files

Example sounds needed:
- `jump.mp3` - Jump sound effect
- `collect.mp3` - Paperclip collection sound
- `hit.mp3` - Collision with obstacle
- `upgrade.mp3` - Upgrade purchase confirmation
- `gameover.mp3` - Game over sound
- `background.mp3` - Background music (optional)

## How to Replace Placeholders

### For Images:
```javascript
// In entity files (e.g., Player.js)
import playerSprite from '../../assets/images/player.png';

// In draw method
const img = new Image();
img.src = playerSprite;
ctx.drawImage(img, this.x, this.y, this.width, this.height);
```

### For Sounds:
```javascript
// In SoundSystem.js
const audio = new Audio('/assets/sounds/jump.mp3');
audio.play();
```

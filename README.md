# IA Runner

An endless runner platformer game built with React where you control an overworked office employee escaping the corporate routine!

![IA Runner](https://img.shields.io/badge/React-19.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.1-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## 🎮 Game Features

- **Endless Runner Gameplay**: Run through an infinite office corridor filled with obstacles
- **Dynamic Difficulty**: Speed and challenge increase over time
- **Collectibles**: Gather paperclips to purchase upgrades
- **Upgrade Shop**: Six unique upgrades to enhance your abilities
- **Responsive Design**: Works on desktop and mobile devices
- **Touch Controls**: Swipe gestures for mobile gameplay
- **Parallax Scrolling**: Multi-layered office background
- **Sound Effects**: Audio feedback for game actions

## 🎯 How to Play

### Desktop Controls
- **↑ / W / Space**: Jump over obstacles
- **↓ / S**: Slide under obstacles  
- **→ / D**: Dash forward
- **ESC**: Pause game

### Mobile Controls
- **Swipe Up**: Jump
- **Swipe Down**: Slide
- **Swipe Right**: Dash
- **Tap**: Jump

## 🛒 Upgrades

| Upgrade | Description | Effect |
|---------|-------------|--------|
| **Magnet** | Auto-collect nearby paperclips | Increases collection radius by 50px per level |
| **Energy Drink** | Extra life/health | +1 life per level |
| **Coffee Boost** | Temporary speed boost | +50% speed per level for 5 seconds |
| **Keyboard Armor** | Reduce obstacle damage | -25% damage per level |
| **Roller-chair Wheels** | Short gliding ability | +500ms glide duration per level |
| **Headphones** | Temporary invincibility | +1000ms invincibility per level |

Upgrades cost increases exponentially to balance progression.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm (v10 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/joalceco/IArunner.git
cd IArunner
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 🏗️ Building for Production

Build the game for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

The built files will be in the `dist` directory and can be deployed to any static hosting service.

## 📦 Embedding in a Web Page

After building, you can embed the game in any web page:

```html
<iframe 
  src="https://your-domain.com/iarunner" 
  width="800" 
  height="400" 
  frameborder="0"
  allowfullscreen>
</iframe>
```

Or include it directly:
```html
<div id="ia-runner-game"></div>
<script src="https://your-domain.com/iarunner/assets/index.js"></script>
```

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## 🎨 Code Quality

Lint code:
```bash
npm run lint
```

Format code:
```bash
npm run format
```

## 📁 Project Structure

```
IArunner/
├── src/
│   ├── game/              # Core game logic
│   │   ├── entities/      # Game entities (Player, Obstacle, Collectible)
│   │   ├── systems/       # Game systems (Background, Sound)
│   │   ├── utils/         # Helper functions
│   │   ├── config.js      # Game configuration
│   │   └── GameEngine.js  # Main game engine
│   ├── components/        # React components
│   │   ├── HUD/          # Heads-up display
│   │   ├── Shop/         # Upgrade shop
│   │   ├── Menu/         # Menu screens
│   │   └── Game.jsx      # Main game component
│   ├── assets/           # Asset placeholders
│   │   ├── images/       # Image assets
│   │   └── sounds/       # Sound effects
│   └── tests/            # Unit tests
├── public/               # Static files
├── index.html           # Entry point (embeddable)
└── package.json         # Project dependencies
```

## 🎮 Game Architecture

### Core Systems

- **GameEngine**: Main game loop, state management, collision detection
- **Player**: Character controls, physics, abilities
- **Obstacle**: Various office-themed obstacles with different behaviors
- **Collectible**: Paperclip collection system
- **Background**: Parallax scrolling office environment
- **SoundSystem**: Audio feedback using Web Audio API

### React Components

- **Game**: Main component managing canvas and game state
- **HUD**: Score, lives, paperclips display
- **Shop**: Upgrade purchase interface
- **Menu**: Start screen, pause menu, game over screen

## 🔧 Technologies Used

- **React 19.1**: UI framework
- **Vite 7.1**: Build tool
- **Canvas API**: Game rendering
- **Jest**: Testing framework
- **React Testing Library**: Component testing
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 📝 Development Guidelines

- Game logic is separated from React components for testability
- Canvas rendering uses requestAnimationFrame for smooth gameplay
- Physics updates use delta time for consistent behavior
- Collision detection uses AABB (axis-aligned bounding box)
- Upgrades use exponential cost scaling to balance progression

## 🐛 Known Issues

- Sound effects use Web Audio API beeps (placeholder for actual audio files)
- Visual assets are programmatically drawn (can be replaced with sprites)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by classic endless runner games
- Built as a demonstration of React game development
- Office theme inspired by the daily grind of corporate life

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

**Have fun escaping the corporate routine! 🏃‍♂️💼📎**

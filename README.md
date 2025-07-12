# Spot the Difference Game

A modern, configurable "Spot the Difference" game built with React, Vite, and Tailwind CSS. Features a beautiful dashboard for game configuration and multiple difficulty levels with different image sets.

## 🎮 Features

### **Dashboard & Configuration**
- **Interactive Dashboard**: Beautiful configuration screen with React logo and modern UI
- **Difficulty Levels**: 4 different levels (Easy, Medium, Hard, Expert) with varying numbers of differences
- **Sound Controls**: Toggle background music, sound effects, and volume control
- **Game Settings**: Timer toggle, hints system, and other customizable options
- **Responsive Design**: Works perfectly on desktop and mobile devices

### **Gameplay Features**
- **Multiple Image Sets**: Each difficulty level has its own unique image pair
- **Smart Click Detection**: Pixel-perfect coordinate system for accurate difference detection
- **Visual Feedback**: Found differences are highlighted with animated circles
- **Hint System**: Optional subtle hints to help players find differences
- **Score Tracking**: Real-time progress tracking
- **Timer**: Optional countdown timer with completion time tracking
- **Success Modal**: Beautiful victory screen with stats and restart options

### **Audio System**
- **Background Music**: Ambient music during gameplay
- **Sound Effects**: Click sounds and victory audio
- **Volume Control**: Master volume slider with percentage display
- **Audio Toggles**: Individual controls for music and sound effects

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- npm v8 or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd spot-the-difference

# Install dependencies
npm install
```

### Running the Game

```bash
# Start the development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`. You'll see the beautiful dashboard where you can configure your game settings.

### Building for Production

```bash
# Build the production version
npm run build

# Preview the production build locally
npm run preview
```

## 🎯 How to Play

1. **Configure Settings**: Use the dashboard to select difficulty level and adjust audio settings
2. **Start Game**: Click "Start Game" to begin
3. **Find Differences**: Click on differences between the two images
4. **Complete Level**: Find all differences to win and see your completion time
5. **Restart or Return**: Choose to play again or return to dashboard

## 📊 Difficulty Levels

| Level | Differences | Click Area | Description |
|-------|-------------|------------|-------------|
| **Easy** | 3 | Large | Perfect for beginners with obvious differences |
| **Medium** | 5 | Medium | Balanced challenge with moderate difficulty |
| **Hard** | 7 | Small | Challenging with smaller, more subtle differences |
| **Expert** | 10 | Precise | Ultimate challenge with very precise clicking required |

## 🎨 Game Configuration System

The game uses a sophisticated configuration system with separate JSON files for each difficulty level:

### Configuration File Structure
```
public/
├── game-configs/
│   ├── easy.json      # Easy level (3 differences)
│   ├── medium.json    # Medium level (5 differences)
│   ├── hard.json      # Hard level (7 differences)
│   └── expert.json    # Expert level (10 differences)
└── images/
    ├── easy/          # Easy level images
    ├── medium/        # Medium level images
    ├── hard/          # Hard level images
    └── expert/        # Expert level images
```

### JSON Configuration Format
```json
{
  "gameTitle": "Spot the Difference - Easy",
  "images": {
    "image1": "/images/easy/img1.png",
    "image2": "/images/easy/img2.png"
  },
  "differences": [
    { "x": 130, "y": 80, "width": 60, "height": 40 },
    { "x": 120, "y": 220, "width": 25, "height": 25 },
    { "x": 192, "y": 342, "width": 16, "height": 16 }
  ]
}
```

## 🛠️ Customization

### Adding New Images
1. Generate new image pairs using the included `generate-images.js` script
2. Place images in the appropriate difficulty folder
3. Update the corresponding JSON configuration file with new coordinates

### Modifying Differences
- Edit the `differences` array in the JSON files
- Each difference object contains: `x`, `y`, `width`, `height`
- Coordinates are pixel-perfect for accurate click detection

### Generating New Images
```bash
# Run the image generation script
node generate-images.js
```

This will create new spot-the-difference images for all difficulty levels with proper coordinates.

## 📁 Project Structure

```
spot-the-difference/
├── public/
│   ├── game-configs/          # JSON configuration files
│   ├── images/                # Game images by difficulty
│   ├── sfx/                   # Sound effects and music
│   └── generate-images.html   # Browser-based image generator
├── src/
│   ├── components/            # React components
│   │   ├── Dashboard.jsx      # Main configuration screen
│   │   ├── Game.jsx           # Main game component
│   │   ├── GameImage.jsx      # Image display with click detection
│   │   ├── ScoreBoard.jsx     # Progress tracking
│   │   ├── SuccessModal.jsx   # Victory screen
│   │   ├── Timer.jsx          # Game timer
│   │   └── VolumeControl.jsx  # Audio controls
│   ├── assets/                # Static assets
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── generate-images.js         # Node.js image generator
├── package.json               # Dependencies and scripts
└── tailwind.config.js         # Tailwind CSS configuration
```

## 🎵 Audio Features

- **Background Music**: Looping ambient music during gameplay
- **Sound Effects**: 
  - Click sounds when finding differences
  - Victory sound when completing a level
- **Volume Control**: Master volume slider (0-100%)
- **Individual Toggles**: Separate controls for music and sound effects

## 🎨 UI/UX Features

- **Modern Design**: Clean, responsive interface with Tailwind CSS
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Accessibility**: Proper focus states and keyboard navigation
- **Mobile Responsive**: Optimized for all screen sizes
- **Visual Feedback**: Clear indicators for found differences and hints

## 🛠️ Technologies Used

- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Canvas API** - Image generation and manipulation
- **HTML5 Audio** - Sound effects and background music

## 🚀 Performance Features

- **Lazy Loading**: Images load efficiently
- **Optimized Assets**: Compressed images and audio files
- **Fast Rendering**: Smooth 60fps animations
- **Memory Efficient**: Proper cleanup and resource management

## 📝 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding New Features
1. Create new React components in `src/components/`
2. Update the dashboard for new configuration options
3. Modify game logic in `Game.jsx` as needed
4. Add new audio files to `public/sfx/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🎯 Future Enhancements

- [ ] Multiple image themes (nature, city, fantasy, etc.)
- [ ] Multiplayer mode
- [ ] Leaderboards and achievements
- [ ] Custom image upload feature
- [ ] More difficulty levels
- [ ] Accessibility improvements
- [ ] PWA support for mobile apps

---

**Enjoy playing Spot the Difference!** 🎮✨ 
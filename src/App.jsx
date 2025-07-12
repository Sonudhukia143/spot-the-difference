import { useState } from 'react';
import './App.css';
import Game from './components/Game';
import Dashboard from './components/Dashboard';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    level: 'medium',
    backgroundMusic: true,
    soundEffects: true,
    volume: 70,
    showTimer: true,
    showHints: false
  });

  const handleStartGame = (settings) => {
    setGameSettings(settings);
    setGameStarted(true);
  };

  const handleBackToDashboard = () => {
    setGameStarted(false);
  };

  const handleSettingsChange = (newSettings) => {
    setGameSettings(newSettings);
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <Dashboard 
          onStartGame={handleStartGame}
          onSettingsChange={handleSettingsChange}
          settings={gameSettings}
        />
      ) : (
        <div className="flex flex-col justify-center min-h-screen p-5" 
          style={{
            backgroundImage: 'url(/background.gif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <Game 
            settings={gameSettings}
            onBackToDashboard={handleBackToDashboard}
          />
        </div>
      )}
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import GameImage from './GameImage';
import Timer from './Timer';
import ScoreBoard from './ScoreBoard';
import SuccessModal from './SuccessModal';
import VolumeControl from './VolumeControl';

const Game = ({ settings, onBackToDashboard }) => {
  const [gameConfig, setGameConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [foundDifferences, setFoundDifferences] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);
  const [error, setError] = useState(null);
  const [bgMusic] = useState(new Audio('/sfx/bg_music.mp3'));

  
  useEffect(() => {
    if (settings.backgroundMusic) {
      bgMusic.loop = true;
      bgMusic.volume = settings.volume / 100; 
      
      const playMusic = () => {
        bgMusic.play().catch(err => {
          console.error("Error playing background music:", err);
        });
      };
      
      const handleUserInteraction = () => {
        playMusic();
        
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
      
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
      
      return () => {
        bgMusic.pause();
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
    }
  }, [bgMusic, settings.backgroundMusic, settings.volume]);

  useEffect(() => {
    // Load configuration based on selected level
    const configPath = `/game-configs/${settings.level}.json`;
    
    fetch(configPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load config for level: ${settings.level}`);
        }
        return response.json();
      })
      .then(data => {
        setGameConfig(data);
        setLoading(false);
        setTimerRunning(true);
      })
      .catch(err => {
        setError(`Failed to load game configuration for ${settings.level} level`);
        setLoading(false);
        console.error(err);
      });
  }, [settings.level]);

  useEffect(() => {
    if (gameConfig && foundDifferences.length === gameConfig.differences.length && foundDifferences.length > 0) {
      setTimerRunning(false);
      setGameCompleted(true);
      if (settings.soundEffects) {
        try {
          const audio = new Audio('/sfx/win.wav');
          audio.volume = settings.volume / 100;
          audio.play();
        } catch (err) {
          console.error("Error playing win sound:", err);
        }
      }
    }
  }, [foundDifferences, gameConfig, settings.soundEffects, settings.volume]);

  const handleDifferenceFound = (index) => {
    if (!foundDifferences.includes(index)) {
      setFoundDifferences([...foundDifferences, index]);
      if (settings.soundEffects) {
        try {
          const audio = new Audio('/sfx/rightClick.wav');
          audio.volume = settings.volume / 100;
          audio.play();
        } catch (err) {
          console.error("Error playing sound:", err);
        }
      }
    }
  };

  const restartGame = () => {
    setFoundDifferences([]);
    setTimerRunning(true);
    setGameCompleted(false);
    setTimeElapsed(0);
    setResetTimer(prev => prev + 1);
  };

  if (loading) {
    return <div className="text-center p-10 text-xl text-gray-700">Loading game...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-10">
        <div className="text-xl text-red-600 mb-4">{error}</div>
        <button
          onClick={onBackToDashboard}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5 bg-background rounded shadow">
      {/* Back to Dashboard Button */}
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={onBackToDashboard}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        
        {settings.backgroundMusic && (
          <div className="absolute top-4 right-4">
            <VolumeControl audio={bgMusic} />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center mb-5">
        <h1 className="text-4xl font-bold text-primary mb-4">{gameConfig.gameTitle}</h1>
        <div className="flex justify-between items-center w-full max-w-xl mx-auto p-3 bg-white rounded shadow md:flex-row flex-col gap-4">
          <ScoreBoard 
            found={foundDifferences.length} 
            total={gameConfig.differences.length} 
          />
          {settings.showTimer && (
            <Timer 
              isRunning={timerRunning} 
              onTimeUpdate={setTimeElapsed} 
              resetTime={resetTimer}
            />
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
        <GameImage 
          imageUrl={gameConfig.images.image1}
          differences={gameConfig.differences}
          foundDifferences={foundDifferences}
          onDifferenceFound={handleDifferenceFound}
          imagePosition="left"
          showHints={settings.showHints}
          level={settings.level}
        />
        <GameImage 
          imageUrl={gameConfig.images.image2}
          differences={gameConfig.differences}
          foundDifferences={foundDifferences}
          onDifferenceFound={handleDifferenceFound}
          imagePosition="right"
          showHints={settings.showHints}
          level={settings.level}
        />
      </div>
      
      {gameCompleted && (
        <SuccessModal 
          score={foundDifferences.length} 
          total={gameConfig.differences.length} 
          time={timeElapsed}
          onRestart={restartGame}
          onBackToDashboard={onBackToDashboard}
        />
      )}
    </div>
  );
};

export default Game;

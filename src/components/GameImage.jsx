import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const GameImage = ({ imageUrl, differences, foundDifferences, onDifferenceFound, imagePosition, showHints, level }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      const updateImageSize = () => {
        setImageSize({
          width: imageRef.current.offsetWidth,
          height: imageRef.current.offsetHeight
        });
      };

      imageRef.current.onload = updateImageSize;
      
      window.addEventListener('resize', updateImageSize);
      
      if (imageRef.current.complete) {
        updateImageSize();
      }

      return () => {
        window.removeEventListener('resize', updateImageSize);
      };
    }
  }, [imageRef]);

  const getClickAreaMultiplier = () => {
    const multipliers = {
      easy: 1.5,
      medium: 1.2,
      hard: 1.0,
      expert: 0.8
    };
    return multipliers[level] || 1.0;
  };

  const handleClick = (e) => {
    if (!imageRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = imageSize.width / imageRef.current.naturalWidth;
    const scaleY = imageSize.height / imageRef.current.naturalHeight;
    const clickMultiplier = getClickAreaMultiplier();

    differences.forEach((diff, index) => {
      const diffX = diff.x * scaleX;
      const diffY = diff.y * scaleY;
      const diffWidth = diff.width * scaleX * clickMultiplier;
      const diffHeight = diff.height * scaleY * clickMultiplier;

      if (
        x >= diffX && 
        x <= diffX + diffWidth && 
        y >= diffY && 
        y <= diffY + diffHeight
      ) {
        onDifferenceFound(index);
      }
    });
  };

  return (
    <div 
      className="relative flex-1 border-3 border-secondary rounded overflow-hidden max-w-lg mx-auto" 
      ref={containerRef} 
      onClick={handleClick}
    >
      <img 
        ref={imageRef}
        src={imageUrl} 
        alt={`Spot the difference ${imagePosition} image`} 
        className="block w-full h-auto cursor-pointer"
      />
      
      {differences.map((diff, index) => {
        const isFound = foundDifferences.includes(index);
        const scaleX = imageSize.width / (imageRef.current?.naturalWidth || 1);
        const scaleY = imageSize.height / (imageRef.current?.naturalHeight || 1);

        return (
          <div key={index}>
            {/* Found difference indicator */}
            {isFound && (
              <div 
                className="absolute border-3 border-accent rounded-full pointer-events-none z-10 animate-pulse-slow"
                style={{
                  left: `${diff.x * scaleX}px`,
                  top: `${diff.y * scaleY}px`,
                  width: `${diff.width * scaleX}px`,
                  height: `${diff.height * scaleY}px`
                }}
              />
            )}
            
            {/* Hint indicator (subtle glow for unfound differences) */}
            {showHints && !isFound && (
              <div 
                className="absolute border border-yellow-400 rounded-full pointer-events-none z-5 opacity-30 animate-pulse"
                style={{
                  left: `${diff.x * scaleX}px`,
                  top: `${diff.y * scaleY}px`,
                  width: `${diff.width * scaleX}px`,
                  height: `${diff.height * scaleY}px`,
                  boxShadow: '0 0 10px rgba(255, 255, 0, 0.3)'
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

GameImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  differences: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  ).isRequired,
  foundDifferences: PropTypes.arrayOf(PropTypes.number).isRequired,
  onDifferenceFound: PropTypes.func.isRequired,
  imagePosition: PropTypes.oneOf(['left', 'right']).isRequired,
  showHints: PropTypes.bool,
  level: PropTypes.string
};

GameImage.defaultProps = {
  showHints: false,
  level: 'medium'
};

export default GameImage;

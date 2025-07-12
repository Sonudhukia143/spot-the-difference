import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const GameImage = ({
  imageUrl,
  differences,
  foundDifferences,
  onDifferenceFound,
  imagePosition,
  showHints,
  level,
  onLoad, // NEW: callback to notify Game component
}) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true); // NEW
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const updateImageSize = () => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.offsetWidth,
        height: imageRef.current.offsetHeight
      });
    }
  };

  useEffect(() => {
    if (imageRef.current) {
      window.addEventListener('resize', updateImageSize);
      if (imageRef.current.complete) {
        updateImageSize();
        setLoading(false);
        onLoad?.(); // notify parent if already loaded
      }
    }

    return () => {
      window.removeEventListener('resize', updateImageSize);
    };
  }, []);

  const handleImageLoad = () => {
    updateImageSize();
    setLoading(false);
    onLoad?.(); // notify parent
  };

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
      className="relative flex-1 border-3 border-secondary rounded overflow-hidden max-w-lg mx-auto min-h-[300px]"
      ref={containerRef}
      onClick={handleClick}
    >
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.5)]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-sm text-gray-700 font-medium">Loading image...</p>
        </div>
      )}

      <img
        ref={imageRef}
        src={imageUrl}
        alt={`Spot the difference ${imagePosition} image`}
        onLoad={handleImageLoad}
        className="block w-full h-auto cursor-pointer"
      />

      {!loading && differences.map((diff, index) => {
        const isFound = foundDifferences.includes(index);
        const scaleX = imageSize.width / (imageRef.current?.naturalWidth || 1);
        const scaleY = imageSize.height / (imageRef.current?.naturalHeight || 1);

        return (
          <div key={index}>
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
  level: PropTypes.string,
  onLoad: PropTypes.func, // NEW
};

GameImage.defaultProps = {
  showHints: false,
  level: 'medium',
  onLoad: null, // NEW
};

export default GameImage;

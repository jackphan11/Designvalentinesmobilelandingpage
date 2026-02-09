import { motion } from 'motion/react';
import { useState } from 'react';

interface SolvedPuzzleProps {
  imageUrl: string;
  onYes: () => void;
  onNo: () => void;
}

export function SolvedPuzzle({ imageUrl, onYes, onNo }: SolvedPuzzleProps) {
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  const moveNoButton = () => {
    setHasMovedNo(true);
    setMoveCount(prev => prev + 1);
    
    // Adjusted safe positions accounting for browser UI and safe areas
    // Using more conservative positions well within visible viewport
    const safePositions = [
      { x: 20, y: 80 }, // top-left (below browser chrome)
      { x: 260, y: 80 }, // top-right
      { x: 20, y: 700 }, // bottom-left (above browser UI)
      { x: 260, y: 700 }, // bottom-right
    ];
    
    // Pick a random position from the safe positions
    const randomIndex = Math.floor(Math.random() * safePositions.length);
    const newPos = safePositions[randomIndex];
    
    setNoButtonPos(newPos);
  };

  return (
    <motion.div
      className="flex flex-col items-center"
      style={{
        width: '330px',
        backgroundColor: '#FBF6EE',
        borderRadius: '20px',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.1)',
        padding: '32px 24px',
      }}
      layout
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <h2
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '19px',
          color: '#2A2A2A',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        You solved it — now one more question 💕
      </h2>

      {/* Completed Puzzle Image */}
      <div
        style={{
          width: '250px',
          height: '250px',
          borderRadius: '8px',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '28px',
        }}
      />

      {/* Valentine Question */}
      <h3
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '21px',
          color: '#2A2A2A',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Will you be my Valentine?
      </h3>

      {/* Buttons */}
      <div className="flex flex-row gap-3 w-full">
        {/* Yes Button */}
        <button
          onClick={onYes}
          style={{
            flex: 1,
            height: '50px',
            borderRadius: '15px',
            backgroundColor: '#D84A5A',
            color: 'white',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.16)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Yes 💘
        </button>

        {/* No Button - stays in layout */}
        {!hasMovedNo && (
          <button
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            style={{
              flex: 1,
              height: '50px',
              borderRadius: '15px',
              backgroundColor: 'transparent',
              color: 'rgba(0, 0, 0, 0.6)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              border: '1px solid rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            No
          </button>
        )}
      </div>

      {/* No Button - floating when moved */}
      {hasMovedNo && noButtonPos && (
        <motion.button
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          animate={{ 
            x: noButtonPos.x,
            y: noButtonPos.y
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '140px',
            height: '50px',
            borderRadius: '15px',
            backgroundColor: '#FBF6EE',
            color: 'rgba(0, 0, 0, 0.6)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          No
        </motion.button>
      )}
    </motion.div>
  );
}
import { useState, useCallback, useEffect } from 'react';
import { DndProvider, useDrag, useDrop, useDragLayer } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { motion } from 'motion/react';

// Detect if the device supports touch
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Configure backend options
const touchBackendOptions = {
  enableMouseEvents: true,
  delayTouchStart: 100, // Small delay helps distinguish drag from scroll
  touchSlop: 5, // Minimum distance before drag starts
};

const backendForDND = isTouchDevice ? TouchBackend : HTML5Backend;
const backendOptions = isTouchDevice ? touchBackendOptions : undefined;

interface PuzzleProps {
  imageUrl: string;
  onSolved?: () => void;
}

interface TileProps {
  id: number;
  currentPosition: number;
  correctPosition: number;
  imageUrl: string;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  showHint?: boolean;
}

const ITEM_TYPE = 'PUZZLE_TILE';

// Custom drag layer to show the dragged tile following cursor/finger
function CustomDragLayer({ imageUrl }: { imageUrl: string }) {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset || !item) {
    return null;
  }

  const row = Math.floor(item.id / 3);
  const col = item.id % 3;

  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 1000,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: currentOffset.x,
          top: currentOffset.y,
          transform: 'translate(-50%, -50%) scale(1.1) rotate(3deg)',
          borderRadius: '8px',
          boxShadow: '0 16px 40px rgba(216, 74, 90, 0.5), 0 8px 16px rgba(0, 0, 0, 0.2)',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: '250px 250px',
          backgroundPosition: `${-col * 83.33}px ${-row * 83.33}px`,
          width: '83.33px',
          height: '83.33px',
          filter: 'brightness(1.05)',
          opacity: 0.95,
        }}
      />
    </div>
  );
}

function PuzzleTile({ id, currentPosition, correctPosition, imageUrl, onMove, showHint }: TileProps) {
  const [isPickedUp, setIsPickedUp] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id, currentPosition },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      setIsPickedUp(false);
    },
  });

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { id: number; currentPosition: number }) => {
      if (item.currentPosition !== currentPosition) {
        onMove(item.currentPosition, currentPosition);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Trigger pick up animation when dragging starts
  useEffect(() => {
    if (isDragging && !isPickedUp) {
      setIsPickedUp(true);
    }
  }, [isDragging, isPickedUp]);

  const row = Math.floor(correctPosition / 3);
  const col = correctPosition % 3;

  return (
    <motion.div
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      className="cursor-move"
      animate={{
        scale: isDragging ? 1.1 : 1,
        rotate: isDragging ? 3 : 0,
        y: isDragging ? -8 : showHint ? -3 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      style={{
        opacity: isDragging ? 0.3 : 1,
        borderRadius: '8px',
        boxShadow: isOver 
          ? '0 8px 20px rgba(216, 74, 90, 0.3)' 
          : '0 6px 16px rgba(0, 0, 0, 0.12)',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: '250px 250px',
        backgroundPosition: `${-col * 83.33}px ${-row * 83.33}px`,
        aspectRatio: '1',
        touchAction: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
    />
  );
}

interface PuzzleTileCompletedProps {
  correctPosition: number;
  imageUrl: string;
}

function PuzzleTileCompleted({ correctPosition, imageUrl }: PuzzleTileCompletedProps) {
  const row = Math.floor(correctPosition / 3);
  const col = correctPosition % 3;

  return (
    <div
      style={{
        borderRadius: '8px',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: '250px 250px',
        backgroundPosition: `${-col * 83.33}px ${-row * 83.33}px`,
        aspectRatio: '1',
      }}
    />
  );
}

export function Puzzle({ imageUrl, onSolved }: PuzzleProps) {
  // Create a shuffled array of positions
  const getShuffledPositions = () => {
    const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // Fisher-Yates shuffle
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    // Make sure it's actually scrambled (not solved)
    const isSolved = positions.every((pos, idx) => pos === idx);
    if (isSolved) {
      // Swap first two elements to ensure it's not solved
      [positions[0], positions[1]] = [positions[1], positions[0]];
    }
    return positions;
  };

  const [tiles, setTiles] = useState(getShuffledPositions);
  const [isSolved, setIsSolved] = useState(false);

  const moveTile = useCallback((dragIndex: number, hoverIndex: number) => {
    setTiles((prevTiles) => {
      const newTiles = [...prevTiles];
      [newTiles[dragIndex], newTiles[hoverIndex]] = [newTiles[hoverIndex], newTiles[dragIndex]];
      return newTiles;
    });
  }, []);

  useEffect(() => {
    const puzzleIsSolved = tiles.every((pos, idx) => pos === idx);
    if (puzzleIsSolved && !isSolved) {
      setIsSolved(true);
      // Wait for the gap animation to complete before calling onSolved
      setTimeout(() => {
        if (onSolved) {
          onSolved();
        }
      }, 800);
    }
  }, [tiles, onSolved, isSolved]);

  return (
    <DndProvider backend={backendForDND} options={backendOptions}>
      <div className="flex flex-col items-center gap-4">
        {/* 3x3 Grid */}
        <motion.div 
          className="grid grid-cols-3"
          style={{
            width: '250px',
            gap: isSolved ? '0px' : '7px',
          }}
          animate={{
            gap: isSolved ? '0px' : '7px',
          }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {isSolved ? (
            // Show completed tiles without shadows
            tiles.map((correctPosition, currentPosition) => (
              <motion.div
                key={correctPosition}
                initial={{ boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)' }}
                animate={{ boxShadow: '0 0px 0px rgba(0, 0, 0, 0)' }}
                transition={{ duration: 0.6 }}
              >
                <PuzzleTileCompleted
                  correctPosition={correctPosition}
                  imageUrl={imageUrl}
                />
              </motion.div>
            ))
          ) : (
            // Show draggable tiles
            tiles.map((correctPosition, currentPosition) => (
              <PuzzleTile
                key={correctPosition}
                id={correctPosition}
                currentPosition={currentPosition}
                correctPosition={correctPosition}
                imageUrl={imageUrl}
                onMove={moveTile}
                showHint={currentPosition === 0}
              />
            ))
          )}
        </motion.div>

        {/* Footer Hint */}
        {!isSolved && (
          <motion.p
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              color: 'rgba(0, 0, 0, 0.4)',
              textAlign: 'center',
            }}
          >
            Tip: tiles snap into place
          </motion.p>
        )}
      </div>
      <CustomDragLayer imageUrl={imageUrl} />
    </DndProvider>
  );
}
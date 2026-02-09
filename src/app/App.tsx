import { Envelope } from './components/Envelope';
import { LetterCard } from './components/LetterCard';
import { SolvedPuzzle } from './components/SolvedPuzzle';
import { CelebrationScreen } from './components/CelebrationScreen';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import puzzleImage from 'figma:asset/c485100d2805743d06c11ffa511ef037ee073731.png';

export default function App() {
  const [showLetter, setShowLetter] = useState(false);
  const [showSolved, setShowSolved] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleYes = () => {
    setShowAnswer(true);
    // Handle yes response
  };

  const handleNo = () => {
    // Handle no response
    alert('Are you sure? 🥺');
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #FFF0F3, #FFE8ED)',
        fontFamily: 'Inter, sans-serif',
        height: '100dvh', // Use dynamic viewport height for mobile browsers
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        touchAction: 'none',
        overscrollBehavior: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
    >
      {/* Subtle grain texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Envelope positioned at 52% down */}
      <AnimatePresence>
        {!showLetter && (
          <motion.div
            key="envelope"
            className="absolute"
            style={{
              top: '52%',
              transform: 'translateY(-50%)',
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <Envelope onOpen={() => setShowLetter(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter Card - stays mounted, content transitions inside */}
      <AnimatePresence mode="wait">
        {showLetter && !showAnswer && (
          <motion.div
            key={showSolved ? "solved" : "puzzle"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center"
          >
            {!showSolved ? (
              <LetterCard imageUrl={puzzleImage} onSolved={() => setShowSolved(true)} />
            ) : (
              <SolvedPuzzle imageUrl={puzzleImage} onYes={handleYes} onNo={handleNo} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration Screen */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <CelebrationScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer text */}
      <div 
        className="absolute bottom-20 left-0 right-0 text-center"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          color: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        Made by Jack, with love
      </div>
    </div>
  );
}
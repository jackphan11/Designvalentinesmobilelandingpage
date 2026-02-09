import { useState } from 'react';
import { motion } from 'motion/react';

interface EnvelopeProps {
  onOpen?: () => void;
}

export function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    if (onOpen) {
      // Call onOpen after animation completes
      setTimeout(() => {
        onOpen();
      }, 600);
    }
  };

  return (
    <div className="relative">
      {/* "Tap to open" text */}
      <div 
        className="absolute -top-10 left-1/2 -translate-x-1/2 text-center"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          color: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        Tap to open
      </div>

      {/* Envelope container */}
      <motion.button
        onClick={handleClick}
        className="relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          width: '280px',
          height: '180px',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          border: 'none',
          background: 'transparent',
          padding: 0,
        }}
      >
        {/* Envelope Body */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            backgroundColor: '#F3EBDD',
            borderRadius: '8px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
          }}
        />

        {/* Left Flap */}
        <div
          className="absolute top-0 left-0"
          style={{
            width: '140px',
            height: '90px',
            backgroundColor: '#EDE2D1',
            clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
            borderRadius: '8px 0 0 0',
          }}
        />

        {/* Right Flap */}
        <div
          className="absolute top-0 right-0"
          style={{
            width: '140px',
            height: '90px',
            backgroundColor: '#EDE2D1',
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            borderRadius: '0 8px 0 0',
          }}
        />

        {/* Top Flap */}
        <motion.div
          className="absolute left-0 right-0"
          style={{
            top: 0,
            height: '90px',
            backgroundColor: '#E6D8C2',
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            transformOrigin: 'top center',
            zIndex: 10,
          }}
          animate={{
            rotateX: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Heart Seal */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: '45px',
            zIndex: 20,
          }}
          animate={{
            y: isOpen ? -20 : 0,
            opacity: isOpen ? 0 : 1,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill="#D84A5A"
            />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  );
}
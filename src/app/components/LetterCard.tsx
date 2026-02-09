import { Puzzle } from './Puzzle';
import { motion } from 'motion/react';

interface LetterCardProps {
  recipientName?: string;
  imageUrl: string;
  onSolved?: () => void;
}

export function LetterCard({ recipientName = 'Maddy', imageUrl, onSolved }: LetterCardProps) {
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
      <h1
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          color: '#2A2A2A',
          marginBottom: '8px',
        }}
      >
        Dear {recipientName}
      </h1>

      {/* Subtext / Instruction */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '15px',
          color: 'rgba(0, 0, 0, 0.6)',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        Hold and drag the tiles to put us back together 💕
      </p>

      {/* Puzzle */}
      <Puzzle imageUrl={imageUrl} onSolved={onSolved} />
    </motion.div>
  );
}
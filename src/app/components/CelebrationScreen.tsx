import { motion } from 'motion/react';
import { useState } from 'react';
import Confetti from 'react-confetti';
import { Heart, Calendar, MapPin, Clock } from 'lucide-react';

export function CelebrationScreen() {
  const [windowSize] = useState({
    width: 430,
    height: 932,
  });

  const handleAddToCalendar = () => {
    // Create iCal event
    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'DTSTART:20260215T140000',
      'DTEND:20260215T160000',
      'SUMMARY:Valentine\'s Day at Nobu Toronto',
      'DESCRIPTION:Valentine\'s Day celebration dinner',
      'LOCATION:Nobu Toronto, 80 Yorkville Ave, Toronto, ON',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'nobu-reservation.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Confetti */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={100}
        recycle={true}
        gravity={0.15}
        wind={0}
        colors={['#FFC5D3', '#D84A5A', '#FBF6EE', '#FFD700', '#FFB6C1']}
        drawShape={(ctx) => {
          // Draw hearts and rounded rectangles
          const shapeType = Math.random() > 0.5 ? 'heart' : 'rect';
          
          if (shapeType === 'heart') {
            // Draw a small heart
            ctx.beginPath();
            const size = 8;
            ctx.moveTo(0, size / 4);
            ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, size / 4);
            ctx.bezierCurveTo(-size / 2, size / 2, 0, size * 0.75, 0, size);
            ctx.bezierCurveTo(0, size * 0.75, size / 2, size / 2, size / 2, size / 4);
            ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, size / 4);
            ctx.closePath();
            ctx.fill();
          } else {
            // Draw a rounded rectangle
            const width = 12;
            const height = 8;
            const radius = 2;
            ctx.beginPath();
            ctx.moveTo(-width / 2 + radius, -height / 2);
            ctx.lineTo(width / 2 - radius, -height / 2);
            ctx.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
            ctx.lineTo(width / 2, height / 2 - radius);
            ctx.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
            ctx.lineTo(-width / 2 + radius, height / 2);
            ctx.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
            ctx.lineTo(-width / 2, -height / 2 + radius);
            ctx.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);
            ctx.closePath();
            ctx.fill();
          }
        }}
      />

      {/* Celebration Card */}
      <div
        className="flex items-center justify-center"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          className="flex flex-col items-center"
          style={{
            width: '330px',
            backgroundColor: '#FBF6EE',
            borderRadius: '20px',
            boxShadow: '0 18px 45px rgba(0, 0, 0, 0.1)',
            padding: '48px 32px',
            position: 'relative',
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: [0.9, 1.03, 1],
            y: 0
          }}
          transition={{ 
            duration: 0.5,
            times: [0, 0.6, 1],
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {/* Primary Message */}
          <motion.h1
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '140%',
              color: '#2A2A2A',
              textAlign: 'center',
              marginBottom: '20px',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            I can't wait to celebrate with you.
          </motion.h1>

          {/* Decorative Heart */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: [0, 1.2, 1],
            }}
            transition={{ 
              delay: 0.4, 
              duration: 0.4,
              times: [0, 0.6, 1]
            }}
            style={{
              marginBottom: '20px',
            }}
          >
            <Heart
              size={32}
              fill="#D84A5A"
              color="#D84A5A"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(216, 74, 90, 0.2))',
              }}
            />
          </motion.div>

          {/* Secondary Text */}
          <motion.p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '15px',
              color: 'rgba(0, 0, 0, 0.6)',
              textAlign: 'center',
              marginBottom: '32px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            Happy Valentine's Day
          </motion.p>

          {/* Reservation Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Restaurant Name */}
            <h3
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '18px',
                color: '#2A2A2A',
                textAlign: 'center',
                marginBottom: '16px',
              }}
            >
              Nobu Toronto
            </h3>

            {/* Details */}
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <Calendar
                  size={18}
                  color="#D84A5A"
                  style={{ marginRight: '10px', flexShrink: 0 }}
                />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#2A2A2A',
                  }}
                >
                  Sunday, February 15, 2026
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <Clock
                  size={18}
                  color="#D84A5A"
                  style={{ marginRight: '10px', flexShrink: 0 }}
                />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#2A2A2A',
                  }}
                >
                  2:00 PM
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <MapPin
                  size={18}
                  color="#D84A5A"
                  style={{ marginRight: '10px', flexShrink: 0, marginTop: '2px' }}
                />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#2A2A2A',
                    lineHeight: '1.5',
                  }}
                >
                  80 Yorkville Ave, Toronto, ON
                </span>
              </div>
            </div>

            {/* Add to Calendar Button */}
            <button
              onClick={handleAddToCalendar}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#D84A5A',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '15px',
                boxShadow: '0 4px 12px rgba(216, 74, 90, 0.3)',
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
              <Calendar size={18} style={{ marginRight: '8px' }} />
              Add to Calendar
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
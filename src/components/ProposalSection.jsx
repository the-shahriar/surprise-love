import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';
import { config } from '../config';

export default function ProposalSection({ onYes }) {
  const { question, yesButtonText, dodgeButtonText, dodgeToasts } = config.proposal;
  const [dodgePos, setDodgePos] = useState({ x: 0, y: 0 });
  const [toastMessage, setToastMessage] = useState('');
  const [toastCount, setToastCount] = useState(0);

  // Trigger runaway dodge animation for "Ask me later" button
  const handleDodge = () => {
    // Generate random offset between -140px and +140px
    const randomX = (Math.random() - 0.5) * 280;
    const randomY = (Math.random() - 0.5) * 280;

    setDodgePos({ x: randomX, y: randomY });

    // Pick hilarious toast
    const msg = dodgeToasts[toastCount % dodgeToasts.length];
    setToastMessage(msg);
    setToastCount((prev) => prev + 1);

    setTimeout(() => {
      setToastMessage('');
    }, 2000);
  };

  // Trigger confetti burst on YES tap
  const handleYes = () => {
    // Canvas confetti hearts explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 3000,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#f43f5e', '#fb7185', '#fbbf24'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#ffffff', '#f43f5e'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#fb7185', '#be123c'],
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    setTimeout(() => {
      onYes();
    }, 1200);
  };

  return (
    <section
      id="proposal-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card pulse-glow"
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '3.5rem 2rem',
          borderRadius: '32px',
          border: '1px solid rgba(244,63,94,0.4)',
          background: 'linear-gradient(135deg, rgba(36,11,54,0.9) 0%, rgba(13,6,20,0.95) 100%)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(244,63,94,0.6)',
            }}
          >
            <Heart size={36} fill="#ffffff" color="#ffffff" />
          </div>
        </div>

        <h2
          className="font-serif gradient-text"
          style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.25,
            marginBottom: '2.5rem',
          }}
        >
          {question}
        </h2>

        {/* Playful Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(251,191,36,0.2)',
                border: '1px solid rgba(251,191,36,0.5)',
                color: '#fbbf24',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                zIndex: 20,
              }}
            >
              <AlertCircle size={16} /> {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Proposal Buttons Area */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            position: 'relative',
            minHeight: '80px',
          }}
        >
          {/* YES BUTTON */}
          <button
            onClick={handleYes}
            className="btn-primary"
            style={{
              padding: '1.1rem 2.75rem',
              fontSize: '1.2rem',
              boxShadow: '0 10px 35px rgba(244,63,94,0.6)',
            }}
          >
            <Sparkles size={20} /> {yesButtonText}
          </button>

          {/* RUNAWAY / DODGE BUTTON */}
          <motion.button
            animate={{ x: dodgePos.x, y: dodgePos.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseEnter={handleDodge}
            onTouchStart={handleDodge}
            onClick={handleDodge}
            className="btn-secondary"
            style={{
              padding: '1.1rem 2.25rem',
              fontSize: '1.05rem',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            {dodgeButtonText}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

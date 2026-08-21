import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, KeyRound, Sparkles, Heart, HelpCircle } from 'lucide-react';
import { config } from '../config';

export default function UnlockScreen({ onUnlock }) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalizedInput = answer.trim().toLowerCase();
    const isValid = config.unlock.answers.some(
      (validAns) => validAns.toLowerCase().trim() === normalizedInput
    );

    if (isValid) {
      setError(false);
      setIsUnlocked(true);
      setTimeout(() => {
        onUnlock();
      }, 1000);
    } else {
      setError(true);
      setTimeout(() => setError(false), config.unlock.shakeDuration);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'radial-gradient(circle at center, #240b36 0%, #0d0614 100%)',
      }}
    >
      {/* Background Ambient Stars/Glow */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(244,63,94,0.2) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        animate={isUnlocked ? { scale: [1, 1.1, 0], opacity: [1, 1, 0] } : {}}
        transition={{ duration: 0.9 }}
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          position: 'relative',
          border: error ? '1px solid rgba(244,63,94,0.8)' : '1px solid rgba(255,255,255,0.15)',
        }}
        className={`glass-card ${error ? 'animate-shake' : ''}`}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(244,63,94,0.25) 0%, rgba(225,29,72,0.1) 100%)',
              border: '1px solid rgba(244,63,94,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(244,63,94,0.3)',
            }}
          >
            {isUnlocked ? (
              <Sparkles size={32} color="#fb7185" />
            ) : (
              <Lock size={28} color="#f43f5e" />
            )}
          </div>
        </div>

        <h1
          className="font-serif gradient-text"
          style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 700 }}
        >
          A Secret Gate
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
          {config.unlock.question}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                paddingLeft: '2.75rem',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.06)',
                border: error ? '1px solid #f43f5e' : '1px solid rgba(255,255,255,0.15)',
                color: '#ffffff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
            />
            <KeyRound
              size={18}
              color="#94a3b8"
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: '#fb7185', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
            >
              <Heart size={14} fill="#fb7185" /> Try again ❤️
            </motion.p>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Unlock My Surprise ✨
          </button>
        </form>

        <div style={{ marginTop: '1.5rem' }}>
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <HelpCircle size={14} /> {showHint ? 'Hide Hint' : 'Need a hint?'}
          </button>

          {showHint && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{
                color: '#fbbf24',
                fontSize: '0.85rem',
                marginTop: '0.5rem',
                fontStyle: 'italic',
                background: 'rgba(251,191,36,0.1)',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid rgba(251,191,36,0.2)',
              }}
            >
              💡 {config.unlock.hint}
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

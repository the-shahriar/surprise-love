import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake, Shuffle, Heart, Sparkles, ListFilter, X } from 'lucide-react';
import { config } from '../config';

export default function LoveRandomizer() {
  const list = config.loveList;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showAllModal, setShowAllModal] = useState(false);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % list.length);
  };

  const handleRandom = () => {
    setDirection(1);
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * list.length);
    } while (nextIndex === currentIndex && list.length > 1);
    setCurrentIndex(nextIndex);
  };

  return (
    <section
      id="love-section"
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '5rem 1.5rem',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              color: '#fb7185',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              display: 'block',
            }}
          >
            Little Things
          </span>
          <h2
            className="font-serif gradient-text"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, marginBottom: '0.75rem' }}
          >
            Things I Love About You
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            Tap the button to reveal another reason why you're so special
          </p>
        </motion.div>
      </div>

      {/* Main Shuffler Card */}
      <div style={{ position: 'relative', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20, rotate: 2 }}
            transition={{ duration: 0.4 }}
            className="glass-card pulse-glow"
            style={{
              width: '100%',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              borderRadius: '24px',
              border: '1px solid rgba(244,63,94,0.3)',
              background: 'linear-gradient(135deg, rgba(26,11,38,0.85) 0%, rgba(13,6,20,0.95) 100%)',
              position: 'relative',
            }}
          >
            {/* Counter Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                background: 'rgba(244,63,94,0.15)',
                border: '1px solid rgba(244,63,94,0.3)',
                color: '#fb7185',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
              }}
            >
              <Heart size={14} fill="#fb7185" /> Reason #{currentIndex + 1} of {list.length}
            </div>

            {/* Love Note Text */}
            <p
              className="font-serif"
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)',
                lineHeight: 1.5,
                fontWeight: 600,
                minHeight: '90px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              "{list[currentIndex]}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        <button onClick={handleRandom} className="btn-primary">
          <Shuffle size={18} /> Tap for Another Reason ✨
        </button>

        <button onClick={() => setShowAllModal(true)} className="btn-secondary">
          <ListFilter size={18} /> View All Reasons
        </button>
      </div>

      {/* View All Modal */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAllModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              background: 'rgba(13, 6, 20, 0.9)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card"
              style={{
                maxWidth: '650px',
                width: '100%',
                maxHeight: '80vh',
                padding: '2rem',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 className="font-serif gradient-text" style={{ fontSize: '1.6rem', fontWeight: 700 }}>
                  20 Reasons I Love You ❤️
                </h3>
                <button
                  onClick={() => setShowAllModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {list.map((reason, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.875rem 1.1rem',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(244,63,94,0.2)',
                        color: '#fb7185',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      {idx + 1}
                    </span>
                    <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{reason}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

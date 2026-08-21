import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { config } from '../config';

export default function SealedLoveLetter() {
  const { envelopeTitle, envelopeSub, receiver, paragraphs, closing, senderName } = config.loveLetter;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="letter-section"
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '5rem 1.5rem',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Mail size={14} /> Personal Sealed Envelope
          </span>
          <h2
            className="font-serif gradient-text"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, marginBottom: '0.5rem' }}
          >
            {envelopeTitle}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>{envelopeSub}</p>
        </motion.div>
      </div>

      {/* Envelope Container */}
      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <motion.div
          whileHover={{ scale: isOpen ? 1 : 1.02 }}
          transition={{ duration: 0.3 }}
          onClick={() => !isOpen && setIsOpen(true)}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '560px',
            cursor: isOpen ? 'default' : 'pointer',
          }}
        >
          {/* Closed Envelope Visual */}
          {!isOpen && (
            <div
              className="glass-card"
              style={{
                borderRadius: '24px',
                padding: '3.5rem 2rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(30, 10, 35, 0.9) 0%, rgba(15, 6, 22, 0.95) 100%)',
                border: '1.5px solid rgba(244, 63, 94, 0.35)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(244, 63, 94, 0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Envelope Flap Lines */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '140px',
                  background: 'linear-gradient(to bottom, rgba(244,63,94,0.1), transparent)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  borderBottom: '1px solid rgba(244,63,94,0.3)',
                }}
              />

              {/* Red Wax Seal Button */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '1.5rem',
                }}
              >
                <div
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #f43f5e, #9f1239)',
                    boxShadow: '0 0 25px rgba(244, 63, 94, 0.8), inset 0 -4px 8px rgba(0,0,0,0.5)',
                    border: '3px solid #fecdd3',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    marginBottom: '1.25rem',
                    cursor: 'pointer',
                    animation: 'pulse 2s infinite',
                  }}
                >
                  <Heart size={32} fill="#ffffff" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    OPEN
                  </span>
                </div>

                <h3 className="font-serif" style={{ color: '#ffe4e6', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Tap the Wax Seal to Open
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>A private message written just for you</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Unfolded Love Letter Modal / Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, type: 'spring', damping: 25 }}
            style={{
              position: 'relative',
              maxWidth: '680px',
              margin: '0 auto',
              zIndex: 10,
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #fffcf5 0%, #faf3e0 100%)',
                color: '#292524',
                padding: '3rem 2.5rem',
                borderRadius: '24px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(244, 63, 94, 0.3)',
                border: '1px solid #fde68a',
                position: 'relative',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(120, 53, 15, 0.1)',
                  border: 'none',
                  color: '#78350f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>

              {/* Letter Header Stamp */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Heart size={16} fill="#fff" />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9f1239', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Sealed With Love
                </span>
              </div>

              {/* Receiver Salutation */}
              <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#881337', fontWeight: 700, marginBottom: '1.25rem' }}>
                {receiver}
              </h3>

              {/* Letter Paragraphs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.05rem', lineHeight: 1.7, color: '#44403c' }}>
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Letter Closing & Signature */}
              <div style={{ marginTop: '2.5rem', textAlign: 'right', borderTop: '1px dashed #fde68a', paddingTop: '1.5rem' }}>
                <p style={{ fontSize: '1rem', color: '#78350f', fontStyle: 'italic', marginBottom: '0.25rem' }}>
                  {closing}
                </p>
                <p className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#be123c' }}>
                  {senderName}
                </p>
              </div>

              {/* Fold back button */}
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '9999px',
                    background: 'rgba(190, 18, 60, 0.1)',
                    border: '1px solid rgba(190, 18, 60, 0.3)',
                    color: '#be123c',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Fold Letter Back Into Envelope ✉️
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

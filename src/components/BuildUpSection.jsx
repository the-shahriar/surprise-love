import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '../config';

export default function BuildUpSection() {
  const { line1, line2, line3 } = config.buildUp;
  const [hearts, setHearts] = useState([]);

  // Generate floating upward hearts
  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      size: Math.random() * 20 + 14,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 4,
    }));
    setHearts(generated);
  }, []);

  return (
    <section
      id="buildup-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Floating upward hearts layer */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {hearts.map((h) => (
          <div
            key={h.id}
            className="floating-heart"
            style={{
              left: `${h.left}%`,
              bottom: '-50px',
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}
          >
            <Heart size={h.size} color="#fb7185" fill="#f43f5e" style={{ opacity: 0.6 }} />
          </div>
        ))}
      </div>

      {/* Main Slow Paced Story Lines */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '750px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4rem',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="font-serif"
          style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
            color: '#cbd5e1',
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}
        >
          {line1}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{
            padding: '1rem 2rem',
            borderRadius: '9999px',
            background: 'rgba(244,63,94,0.1)',
            border: '1px solid rgba(244,63,94,0.25)',
          }}
        >
          <span
            className="font-serif gradient-text"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.5rem)',
              fontWeight: 700,
              fontStyle: 'italic',
            }}
          >
            {line2}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif"
          style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
            color: '#ffe4e6',
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {line3}
        </motion.p>
      </div>

      {/* Deliberate pause / subtle glowing separator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 1, 0.4] }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 1 }}
        style={{
          marginTop: '6rem',
          width: '120px',
          height: '2px',
          background: 'linear-gradient(to right, transparent, #fb7185, transparent)',
        }}
      />
    </section>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Heart, Sparkles } from 'lucide-react';
import { config } from '../config';

export default function OpeningHero() {
  const canvasRef = useRef(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Canvas floating stars & glowing particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.1,
      pulse: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += Math.sin(Date.now() * p.pulse) * 0.01;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 113, 133, ${Math.max(0.1, Math.min(1, p.alpha))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#f43f5e';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    const lines = config.opening.typewriterLines;
    const currentFullText = lines[currentLineIndex];
    let index = 0;

    setDisplayedText('');

    const timer = setInterval(() => {
      if (index < currentFullText.length) {
        setDisplayedText(currentFullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        if (currentLineIndex < lines.length - 1) {
          setTimeout(() => {
            setCurrentLineIndex((prev) => prev + 1);
          }, 1800);
        } else {
          setIsTypingComplete(true);
        }
      }
    }, 60);

    return () => clearInterval(timer);
  }, [currentLineIndex]);

  const scrollToTimeline = () => {
    const el = document.getElementById('timeline-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '750px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              background: 'rgba(244, 63, 94, 0.12)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              color: '#fb7185',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            <Sparkles size={16} /> A Surprise Story For You <Heart size={14} fill="#fb7185" />
          </div>
        </motion.div>

        {/* Typewriter Display Header */}
        <h1
          className="font-serif gradient-text"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.25,
            minHeight: '130px',
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
          }}
        >
          {displayedText}
          <span className="cursor-blink" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isTypingComplete ? 1 : 0.6, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            color: '#cbd5e1',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            fontWeight: 400,
            marginBottom: '3.5rem',
            maxWidth: '560px',
          }}
        >
          {config.opening.scrollPromptText}
        </motion.p>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={scrollToTimeline}
          style={{ cursor: 'pointer' }}
        >
          <div
            className="glass-pill"
            style={{
              padding: '0.75rem 1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#fb7185',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            Scroll to begin <ChevronDown size={18} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

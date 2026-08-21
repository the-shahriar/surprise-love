import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Send, Sparkles, Copy, Check, MessageSquare } from 'lucide-react';
import { config } from '../config';

export default function ClosingSection() {
  const { headline, message, replyPrompt, signature } = config.closing;
  const [replyText, setReplyText] = useState('');
  const [savedReply, setSavedReply] = useState('');
  const [copied, setCopied] = useState(false);

  // Load existing saved reply if present
  useEffect(() => {
    const existing = localStorage.getItem('girlfriend_surprise_reply');
    if (existing) {
      setSavedReply(existing);
    }
  }, []);

  // Continuous fireworks celebration
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 3000 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const trimmed = replyText.trim();
    setSavedReply(trimmed);
    localStorage.setItem('girlfriend_surprise_reply', trimmed);

    // Extra confetti celebratory burst on reply!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const copyToClipboard = () => {
    if (!savedReply) return;
    navigator.clipboard.writeText(`"My answer/reply: ${savedReply}" ❤️`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="closing-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-rose pulse-glow"
        style={{
          maxWidth: '720px',
          width: '100%',
          padding: '3.5rem 2rem',
          borderRadius: '32px',
          border: '1px solid rgba(244,63,94,0.4)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 35px rgba(244,63,94,0.7)',
            }}
          >
            <Sparkles size={40} color="#ffffff" />
          </div>
        </div>

        <h2
          className="font-serif gradient-text"
          style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 3.5rem)',
            fontWeight: 700,
            marginBottom: '1.25rem',
            lineHeight: 1.25,
          }}
        >
          {headline}
        </h2>

        <p
          style={{
            color: '#ffe4e6',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
          }}
        >
          {message}
        </p>

        {/* Reply Section */}
        <div
          style={{
            background: 'rgba(13, 6, 20, 0.7)',
            borderRadius: '20px',
            padding: '1.75rem 1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '2.5rem',
          }}
        >
          {!savedReply ? (
            <form onSubmit={handleSendReply} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label
                style={{
                  color: '#fb7185',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                }}
              >
                <MessageSquare size={16} /> {replyPrompt}
              </label>

              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your note or reaction here..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'inherit',
                }}
              />

              <button type="submit" className="btn-primary" style={{ alignSelf: 'center', width: '100%', maxWidth: '280px' }}>
                <Send size={18} /> Send My Heart Back ❤️
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              <span style={{ color: '#fb7185', fontSize: '0.9rem', fontWeight: 600 }}>
                💌 Your Reply to Him:
              </span>

              <div
                style={{
                  background: 'rgba(244,63,94,0.15)',
                  border: '1px solid rgba(244,63,94,0.3)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  maxWidth: '520px',
                  width: '100%',
                }}
              >
                "{savedReply}"
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button onClick={copyToClipboard} className="btn-secondary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
                  {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Reply'}
                </button>

                <button
                  onClick={() => setSavedReply('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Edit Reply
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Signature */}
        <div style={{ marginTop: '1.5rem' }}>
          <p
            className="font-handwriting"
            style={{
              fontSize: '2.5rem',
              color: '#fb7185',
              whiteSpace: 'pre-line',
              lineHeight: 1.2,
            }}
          >
            {signature}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

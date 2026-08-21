import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Sparkles, Flame } from 'lucide-react';
import { config } from '../config';

export default function LoveTimerSection() {
  const { startDate, heading, subheading, badge } = config.timer;
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

      // Estimate years, months, days
      const startDateObj = new Date(startDate);
      const nowDateObj = new Date();

      let years = nowDateObj.getFullYear() - startDateObj.getFullYear();
      let months = nowDateObj.getMonth() - startDateObj.getMonth();
      let days = nowDateObj.getDate() - startDateObj.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(nowDateObj.getFullYear(), nowDateObj.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setTimeElapsed({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours,
        minutes,
        seconds,
        totalDays,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  const statCards = [
    { label: 'Years', value: timeElapsed.years, sub: 'and counting' },
    { label: 'Months', value: timeElapsed.months, sub: 'of happiness' },
    { label: 'Days', value: timeElapsed.days, sub: 'this month' },
    { label: 'Hours', value: timeElapsed.hours, sub: 'today' },
    { label: 'Minutes', value: timeElapsed.minutes, sub: 'this hour' },
    { label: 'Seconds', value: timeElapsed.seconds, sub: 'right now' },
  ];

  return (
    <section
      id="timer-section"
      style={{
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
      }}
    >
      <div className="glass-rose" style={{ padding: '3.5rem 2rem', borderRadius: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background glow circle */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(244,63,94,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#fb7185',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              background: 'rgba(244,63,94,0.12)',
              border: '1px solid rgba(244,63,94,0.3)',
            }}
          >
            <Clock size={14} /> {badge}
          </span>

          <h2
            className="font-serif gradient-text"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 700, marginBottom: '0.5rem' }}
          >
            {heading}
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            {subheading} — <strong style={{ color: '#fb7185' }}>{timeElapsed.totalDays} Total Days</strong> of love!
          </p>
        </motion.div>

        {/* Live Timer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1.25rem',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {statCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <div
                style={{
                  background: 'rgba(13, 6, 20, 0.75)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(244, 63, 94, 0.25)',
                  borderRadius: '20px',
                  padding: '1.25rem 0.75rem',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'transform 0.3s ease, borderColor 0.3s ease',
                }}
              >
                <div
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1,
                    textShadow: '0 0 15px rgba(244,63,94,0.6)',
                  }}
                >
                  {String(card.value).padStart(2, '0')}
                </div>
                <span
                  style={{
                    color: '#fb7185',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginTop: '0.4rem',
                  }}
                >
                  {card.label}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                  {card.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

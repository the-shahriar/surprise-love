import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, MessageCircleHeart, Sparkles } from 'lucide-react';
import { config } from '../config';

export default function TimelineSection() {
  const { heading, subheading, events, apologyLine } = config.timeline;

  return (
    <section
      id="timeline-section"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '5rem 1.5rem',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            Memories We Built
          </span>
          <h2
            className="font-serif gradient-text"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, marginBottom: '0.75rem' }}
          >
            {heading}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>{subheading}</p>
        </motion.div>
      </div>

      {/* Timeline Wrapper */}
      <div style={{ position: 'relative' }}>
        {/* Glowing Central Line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, rgba(244,63,94,0.1), rgba(244,63,94,0.8), rgba(244,63,94,0.1))',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        />

        {/* Timeline Events List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {events.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  gap: '2rem',
                  position: 'relative',
                  zIndex: 2,
                }}
                className="timeline-item"
              >
                {/* Content Side */}
                <div style={{ flex: 1, textAlign: isEven ? 'right' : 'left' }}>
                  <div className="glass-card" style={{ padding: '1.75rem', position: 'relative' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '9999px',
                        background: 'rgba(244,63,94,0.15)',
                        border: '1px solid rgba(244,63,94,0.3)',
                        color: '#fb7185',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        marginBottom: '0.75rem',
                      }}
                    >
                      <Calendar size={12} /> {item.date}
                    </div>

                    <h3
                      className="font-serif"
                      style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}
                    >
                      {item.title}
                    </h3>

                    <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                      {item.description}
                    </p>

                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        color: '#fbbf24',
                        background: 'rgba(251,191,36,0.1)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        border: '1px solid rgba(251,191,36,0.2)',
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Center Node Marker */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                    border: '4px solid #0d0614',
                    boxShadow: '0 0 15px rgba(244,63,94,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0,
                  }}
                >
                  <Heart size={18} fill="#ffffff" />
                </div>

                {/* Media Side (Photo or Video) */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.15)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      aspectRatio: '4/3',
                      position: 'relative',
                      background: '#07020d',
                    }}
                  >
                    {item.type === 'video' ? (
                      <video
                        src={item.image}
                        controls
                        muted
                        playsInline
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Apology & Reflection Line - Final Node */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            marginTop: '5rem',
            position: 'relative',
            zIndex: 5,
          }}
        >
          <div
            className="glass-rose"
            style={{
              padding: '2.5rem 2rem',
              borderRadius: '24px',
              textAlign: 'center',
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(244,63,94,0.2)',
                border: '1px solid rgba(244,63,94,0.4)',
                color: '#fb7185',
                marginBottom: '1.25rem',
              }}
            >
              <MessageCircleHeart size={28} />
            </div>

            <h3
              className="font-serif gradient-text"
              style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}
            >
              {apologyLine.title}
            </h3>

            <p
              style={{
                color: '#ffe4e6',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                fontStyle: 'italic',
                maxWidth: '620px',
                margin: '0 auto',
              }}
            >
              "{apologyLine.text}"
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-item {
            flex-direction: column !important;
            text-align: left !important;
          }
          .timeline-item > div {
            width: 100%;
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}

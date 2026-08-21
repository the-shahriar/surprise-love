import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Heart, ShieldAlert } from 'lucide-react';
import { config } from '../config';

export default function WarningLabelSection({ onConfirm }) {
  const { title, subTitle, items, question, confirmButtonText } = config.warningLabel;

  return (
    <section
      id="warning-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: '620px',
          width: '100%',
          background: '#fffdf5',
          color: '#1e293b',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          border: '4px solid #f59e0b',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          position: 'relative',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Warning Badge Top Header */}
        <div
          style={{
            background: '#f59e0b',
            color: '#78350f',
            padding: '0.6rem 1rem',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: 800,
            fontSize: '1rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
          }}
        >
          <AlertTriangle size={20} /> {title}
        </div>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
          {subTitle}
        </p>

        {/* Warning items list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: '#fef3c7',
                border: '1px solid #fde68a',
              }}
            >
              <ShieldAlert size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#92400e' }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Question Box */}
        <div
          style={{
            textAlign: 'center',
            borderTop: '2px stroke #cbd5e1',
            paddingTop: '1.5rem',
            marginTop: '1rem',
          }}
        >
          <h3
            className="font-serif"
            style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 700, marginBottom: '1.25rem' }}
          >
            {question}
          </h3>

          <button
            onClick={onConfirm}
            style={{
              width: '100%',
              padding: '1rem 2rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 25px rgba(225,29,72,0.4)',
              transition: 'transform 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <CheckCircle2 size={20} /> {confirmButtonText}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

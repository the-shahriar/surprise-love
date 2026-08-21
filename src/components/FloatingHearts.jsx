import React, { useMemo } from 'react';

export default function FloatingHearts() {
  // Generate random floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 14) + 10,
      duration: Math.floor(Math.random() * 12) + 10,
      delay: Math.random() * 8,
      opacity: (Math.random() * 0.4 + 0.15).toFixed(2),
      char: i % 3 === 0 ? '❤️' : i % 3 === 1 ? '✨' : '💖',
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            filter: 'drop-shadow(0 0 6px rgba(244,63,94,0.6))',
          }}
        >
          {p.char}
        </span>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-105vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Heart, Sparkles, CheckCircle2, Gift, Utensils, Tv, Coffee, Compass, Smile } from 'lucide-react';

const initialCoupons = [
  {
    id: 'coupon-1',
    title: '1x Unlimited Warm Hugs & Cuddles',
    desc: 'Redeemable anytime you need comfort, warmth, or just want to be held tight for as long as you like.',
    icon: Heart,
    color: '#f43f5e',
    tag: 'Never Expires ♾️',
  },
  {
    id: 'coupon-2',
    title: '1x Late-Night Food Run of Your Choice',
    desc: 'Craving snacks at 1 AM? I will drive or order whatever food you want, no questions asked!',
    icon: Utensils,
    color: '#fbbf24',
    tag: 'Foodie Privilege 🍕',
  },
  {
    id: 'coupon-3',
    title: '1x Movie Night — You Pick Everything',
    desc: 'You get full control over the movie, snacks, and seating. Even if it is a cheesy rom-com I will watch attentively!',
    icon: Tv,
    color: '#a855f7',
    tag: 'Cinema Pass 🎬',
  },
  {
    id: 'coupon-4',
    title: '1x Stress-Free Massage & Back Rub',
    desc: '30 full minutes of shoulder, back, or foot massage to melt away all your stress and fatigue.',
    icon: Sparkles,
    color: '#38bdf8',
    tag: 'Relaxation Guaranteed 💆‍♀️',
  },
  {
    id: 'coupon-5',
    title: '1x Win Any Argument Instantly',
    desc: 'Play this card during any minor disagreement to automatically win and get a genuine apology + hug.',
    icon: CheckCircle2,
    color: '#34d399',
    tag: 'Golden Immunity Card 👑',
  },
  {
    id: 'coupon-6',
    title: '1x Spontaneous Road Trip / Weekend Getaway',
    desc: 'Pack a small bag! We will pick a random destination for a fun weekend trip together.',
    icon: Compass,
    color: '#fb7185',
    tag: 'Adventure Pass 🚗',
  },
];

export default function LoveCouponsSection() {
  const [redeemedMap, setRedeemedMap] = useState({});
  const [burstId, setBurstId] = useState(null);

  const handleRedeem = (id) => {
    setRedeemedMap((prev) => ({ ...prev, [id]: true }));
    setBurstId(id);
    setTimeout(() => setBurstId(null), 1500);
  };

  return (
    <section
      id="coupons-section"
      style={{
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '4.5rem 1.5rem',
      }}
    >
      {/* Header */}
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Gift size={14} /> Personal Promise Cards
          </span>
          <h2
            className="font-serif gradient-text"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 700, marginBottom: '0.5rem' }}
          >
            Redeemable Love Coupons
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            Tap any coupon below to redeem it! Valid forever with no expiration date ❤️
          </p>
        </motion.div>
      </div>

      {/* Coupons Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {initialCoupons.map((coupon, idx) => {
          const isRedeemed = redeemedMap[coupon.id];
          const Icon = coupon.icon;

          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <div
                className="glass-card"
                style={{
                  borderRadius: '24px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  border: isRedeemed
                    ? '1.5px solid rgba(52, 211, 153, 0.6)'
                    : '1.5px solid rgba(244, 63, 94, 0.3)',
                  boxShadow: isRedeemed
                    ? '0 0 25px rgba(52, 211, 153, 0.3)'
                    : '0 10px 30px rgba(0, 0, 0, 0.4)',
                  transition: 'all 0.4s ease',
                }}
              >
                {/* Stamp Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: isRedeemed ? 'rgba(52, 211, 153, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                      border: isRedeemed ? '1px solid #34d399' : '1px solid #f43f5e',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isRedeemed ? '#34d399' : '#f43f5e',
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: isRedeemed ? '#34d399' : '#fbbf24',
                      background: isRedeemed ? 'rgba(52, 211, 153, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      border: isRedeemed ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid rgba(251, 191, 36, 0.3)',
                    }}
                  >
                    {isRedeemed ? 'REDEEMED 💕' : coupon.tag}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="font-serif"
                    style={{
                      color: isRedeemed ? '#a7f3d0' : '#ffffff',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      textDecoration: isRedeemed ? 'line-through' : 'none',
                    }}
                  >
                    {coupon.title}
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                    {coupon.desc}
                  </p>
                </div>

                {/* Redeem Action Button */}
                <button
                  onClick={() => !isRedeemed && handleRedeem(coupon.id)}
                  disabled={isRedeemed}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '14px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: isRedeemed ? 'default' : 'pointer',
                    background: isRedeemed
                      ? 'rgba(52, 211, 153, 0.2)'
                      : 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                    color: isRedeemed ? '#34d399' : '#ffffff',
                    border: isRedeemed ? '1px solid #34d399' : '1px solid #f43f5e',
                    boxShadow: isRedeemed ? 'none' : '0 0 15px rgba(244,63,94,0.4)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  {isRedeemed ? (
                    <>
                      <CheckCircle2 size={16} color="#34d399" /> Claimed & Promised ❤️
                    </>
                  ) : (
                    <>
                      <Ticket size={16} /> Redeem This Coupon 🎟️
                    </>
                  )}
                </button>

                {/* Burst Heart Animation on Redeem */}
                {burstId === coupon.id && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 1 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                      fontSize: '3rem',
                    }}
                  >
                    💖✨
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

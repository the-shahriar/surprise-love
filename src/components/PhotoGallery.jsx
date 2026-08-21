import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Heart, ChevronLeft, ChevronRight, X, Calendar, Film, Image as ImageIcon, Sparkles } from 'lucide-react';
import { config } from '../config';

export default function PhotoGallery() {
  const { heading, subheading, items } = config.gallery;
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'photos' | 'videos' | 'favorites'
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [likedMap, setLikedMap] = useState({});

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const photoCount = useMemo(() => items.filter((i) => i.type === 'image').length, [items]);
  const videoCount = useMemo(() => items.filter((i) => i.type === 'video').length, [items]);
  const favoriteCount = useMemo(() => Object.values(likedMap).filter(Boolean).length, [likedMap]);
  const count2024 = useMemo(() => items.filter((i) => i.dateStr && i.dateStr.startsWith('2024')).length, [items]);
  const count2025 = useMemo(() => items.filter((i) => i.dateStr && i.dateStr.startsWith('2025')).length, [items]);

  // Filter items based on active tab
  const filteredItems = useMemo(() => {
    if (activeTab === 'photos') return items.filter((i) => i.type === 'image');
    if (activeTab === 'videos') return items.filter((i) => i.type === 'video');
    if (activeTab === 'favorites') return items.filter((i) => likedMap[i.id]);
    if (activeTab === '2024') return items.filter((i) => i.dateStr && i.dateStr.startsWith('2024'));
    if (activeTab === '2025') return items.filter((i) => i.dateStr && i.dateStr.startsWith('2025'));
    return items;
  }, [items, activeTab, likedMap]);

  const openLightbox = (item) => {
    setSelectedMedia(item);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const navigateLightbox = (direction) => {
    if (!selectedMedia) return;
    const currentIndex = filteredItems.findIndex((p) => p.id === selectedMedia.id);
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = filteredItems.length - 1;
    if (nextIndex >= filteredItems.length) nextIndex = 0;
    setSelectedMedia(filteredItems[nextIndex]);
  };

  return (
    <section
      id="gallery-section"
      style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '5rem 1.5rem',
      }}
    >
      {/* Gallery Header */}
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
            <Sparkles size={14} /> Personal Memory Showcase
          </span>
          <h2
            className="font-serif gradient-text"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '0.75rem' }}
          >
            {heading}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            {subheading}
          </p>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '3rem',
        }}
      >
        {[
          { id: 'all', label: `All (${items.length})`, icon: Sparkles },
          { id: '2024', label: `2024 (${count2024})`, icon: Calendar },
          { id: '2025', label: `2025 (${count2025})`, icon: Calendar },
          { id: 'photos', label: `Photos (${photoCount})`, icon: ImageIcon },
          { id: 'videos', label: `Videos (${videoCount})`, icon: Film },
          { id: 'favorites', label: `Favorites (${favoriteCount})`, icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: isActive
                  ? 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)'
                  : 'rgba(255, 255, 255, 0.06)',
                color: isActive ? '#ffffff' : '#cbd5e1',
                border: isActive ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: isActive ? '0 0 20px rgba(244, 63, 94, 0.4)' : 'none',
              }}
            >
              <Icon size={16} color={isActive ? '#ffffff' : tab.id === 'favorites' ? '#f43f5e' : '#94a3b8'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const isLiked = likedMap[item.id];
            const isVideo = item.type === 'video';

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: (index % 12) * 0.03 }}
                onClick={() => openLightbox(item)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="glass-card"
                  style={{
                    overflow: 'hidden',
                    position: 'relative',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                  }}
                >
                  {/* Media Aspect Container */}
                  <div style={{ position: 'relative', overflow: 'hidden', width: '100%', paddingTop: '110%', background: '#0b0512' }}>
                    {isVideo ? (
                      <video
                        src={item.url}
                        muted
                        playsInline
                        preload="metadata"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <img
                        src={item.url || item.localUrl}
                        onError={(e) => {
                          if (e.target.src !== item.fallbackUrl) e.target.src = item.fallbackUrl;
                        }}
                        alt={item.caption}
                        loading="lazy"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                        className="gallery-img"
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                    )}

                    {/* Gradient overlay for text contrast */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(13, 6, 20, 0.85) 0%, transparent 60%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Top Badges */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                        right: '0.75rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 2,
                      }}
                    >
                      {/* Event Date Badge */}
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '9999px',
                          background: 'rgba(13, 6, 20, 0.75)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#fb7185',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                        }}
                      >
                        <Calendar size={11} /> {item.dateFormatted}
                      </span>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleLike(item.id, e)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(13, 6, 20, 0.75)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Heart
                          size={15}
                          color={isLiked ? '#f43f5e' : '#ffffff'}
                          fill={isLiked ? '#f43f5e' : 'none'}
                        />
                      </button>
                    </div>

                    {/* Video Center Play Overlay */}
                    {isVideo && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2,
                        }}
                      >
                        <div
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '50%',
                            background: 'rgba(244, 63, 94, 0.85)',
                            boxShadow: '0 0 25px rgba(244, 63, 94, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            paddingLeft: '4px',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          <Play size={22} fill="#ffffff" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Caption & Tag Card Footer */}
                  <div style={{ padding: '1rem', background: 'rgba(15, 7, 22, 0.85)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: '#ffe4e6',
                        lineHeight: 1.4,
                        marginBottom: '0.5rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.caption}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: '#fbbf24',
                          background: 'rgba(251, 191, 36, 0.1)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(251, 191, 36, 0.2)',
                          fontWeight: 500,
                        }}
                      >
                        {item.tag}
                      </span>
                      {isVideo && (
                        <span style={{ fontSize: '0.7rem', color: '#fb7185', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Film size={11} /> Video
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
          <Heart size={48} color="#f43f5e" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
          <p style={{ fontSize: '1.1rem' }}>No memories found in this section yet.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              background: 'rgba(10, 4, 16, 0.94)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={24} />
            </button>

            {/* Left Prev Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(-1);
              }}
              style={{
                position: 'absolute',
                left: '1.5rem',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Right Next Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(1);
              }}
              style={{
                position: 'absolute',
                right: '1.5rem',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <ChevronRight size={28} />
            </button>

            {/* Main Lightbox Content Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '900px',
                width: '100%',
                maxHeight: '88vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
                  maxHeight: '70vh',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: '#07020d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    playsInline
                    style={{
                      maxHeight: '70vh',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                ) : (
                  <img
                    src={selectedMedia.url || selectedMedia.localUrl}
                    onError={(e) => {
                      if (e.target.src !== selectedMedia.fallbackUrl) e.target.src = selectedMedia.fallbackUrl;
                    }}
                    alt={selectedMedia.caption}
                    style={{
                      maxHeight: '70vh',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                )}
              </div>

              {/* Lightbox Footer Details */}
              <div style={{ marginTop: '1.25rem', textAlign: 'center', padding: '0 1rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#fb7185', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  <Calendar size={14} /> Event Date: {selectedMedia.dateFormatted}
                </div>
                <p className="font-serif" style={{ fontSize: '1.35rem', color: '#ffe4e6', fontWeight: 600, lineHeight: 1.4 }}>
                  "{selectedMedia.caption}"
                </p>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem', display: 'block' }}>
                  Memory {filteredItems.findIndex(i => i.id === selectedMedia.id) + 1} of {filteredItems.length} ({selectedMedia.type.toUpperCase()})
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

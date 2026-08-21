import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Volume1, Music, Disc, ListMusic, Check, SlidersHorizontal, ExternalLink, Play, Pause, FastForward, Rewind } from 'lucide-react';
import { config } from '../config';

// Format seconds into MM:SS
function formatTime(secs) {
  if (isNaN(secs) || secs < 0) return '0:00';
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default function AudioPlayer() {
  const playlist = config.music.playlist || [];
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0); // 100% full volume
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const audioRef = useRef(null);
  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle track change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = currentTrack.audioUrl || currentTrack.localUrl || '';
    audioRef.current.volume = volume;
    setCurrentTime(0);

    if (isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error:', err);
          setIsPlaying(false);
        });
    }
  }, [currentTrackIndex]);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Play error:', err));
    }
  };

  const selectTrack = (index) => {
    setCurrentTrackIndex(index);
    setShowPlaylistMenu(false);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  // Time update listener
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Loaded metadata listener
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Seek / Scrub handler (Highlighter scrubber: jump from here to there!)
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      style={{
        position: 'fixed',
        top: '1.25rem',
        right: '1.25rem',
        zIndex: 950,
      }}
    >
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl || currentTrack.localUrl || ''}
        loop
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Floating Audio Control Widget */}
      <div
        className="glass-pill"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          padding: '0.65rem 1rem',
          color: '#ffffff',
          boxShadow: isPlaying ? '0 0 30px rgba(244,63,94,0.55)' : '0 4px 20px rgba(0,0,0,0.6)',
          transition: 'all 0.3s ease',
          position: 'relative',
          borderRadius: '20px',
          background: 'rgba(15, 7, 22, 0.94)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(244, 63, 94, 0.45)',
          minWidth: '250px',
        }}
      >
        {/* Top Control Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: 0,
              outline: 'none',
            }}
          >
            {isPlaying ? (
              <Disc
                size={22}
                color="#fb7185"
                style={{ animation: 'spin 4s linear infinite' }}
              />
            ) : (
              <Music size={22} color="#cbd5e1" />
            )}

            {volume === 0 ? (
              <VolumeX size={18} color="#94a3b8" />
            ) : volume < 0.5 ? (
              <Volume1 size={18} color="#fb7185" />
            ) : (
              <Volume2 size={18} color="#fb7185" />
            )}
          </button>

          {/* Track Info */}
          <div
            onClick={togglePlay}
            style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', cursor: 'pointer', flex: 1, marginLeft: '0.5rem' }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isPlaying ? '#fb7185' : '#cbd5e1' }}>
              {isPlaying ? `🎵 ${currentTrack.title}` : 'Tap to Play'}
            </span>
            <span style={{ fontSize: '0.65rem', color: '#94a3b8', maxWidth: '120px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentTrack.movie ? `${currentTrack.movie} • ${currentTrack.artist}` : currentTrack.artist}
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {/* Volume Control Toggle Button */}
            <button
              onClick={() => {
                setShowVolumeControl(!showVolumeControl);
                setShowPlaylistMenu(false);
              }}
              title="Adjust Sound Volume"
              style={{
                background: showVolumeControl ? 'rgba(244,63,94,0.3)' : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fb7185',
              }}
            >
              <SlidersHorizontal size={14} />
            </button>

            {/* Playlist Menu Toggle Button */}
            <button
              onClick={() => {
                setShowPlaylistMenu(!showPlaylistMenu);
                setShowVolumeControl(false);
              }}
              title="Bollywood Song Playlist"
              style={{
                background: showPlaylistMenu ? 'rgba(244,63,94,0.3)' : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fb7185',
              }}
            >
              <ListMusic size={15} />
            </button>
          </div>
        </div>

        {/* Interactive Progress Bar & Highlighter Scrubber ("Seek from here to there") */}
        <div style={{ width: '100%', marginTop: '0.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#94a3b8', marginBottom: '0.2rem', fontWeight: 600 }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              style={{
                width: '100%',
                height: '5px',
                borderRadius: '9999px',
                background: `linear-gradient(to right, #f43f5e 0%, #fb7185 ${progressPercent}%, rgba(255,255,255,0.15) ${progressPercent}%, rgba(255,255,255,0.15) 100%)`,
                appearance: 'none',
                outline: 'none',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      </div>

      {/* Volume Slider Popup */}
      {showVolumeControl && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            right: 0,
            width: '210px',
            background: 'rgba(15, 7, 22, 0.96)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            borderRadius: '16px',
            padding: '0.85rem 1rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.85)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', fontWeight: 700, color: '#fb7185' }}>
            <span>Sound Volume</span>
            <span>{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              width: '100%',
              accentColor: '#f43f5e',
              cursor: 'pointer',
            }}
          />
        </div>
      )}

      {/* Playlist Selector Menu Dropdown */}
      {showPlaylistMenu && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            right: 0,
            width: '280px',
            background: 'rgba(15, 7, 22, 0.96)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            borderRadius: '16px',
            padding: '0.75rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.85)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fb7185', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.2rem 0.4rem' }}>
            Local Bollywood MP3 Songs 💖
          </div>

          {playlist.map((track, idx) => {
            const isSelected = idx === currentTrackIndex;
            return (
              <div
                key={track.id}
                onClick={() => selectTrack(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '12px',
                  background: isSelected ? 'rgba(244, 63, 94, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected ? '1px solid rgba(244, 63, 94, 0.45)' : '1px solid transparent',
                  color: isSelected ? '#ffffff' : '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? '#ffffff' : '#f1f5f9' }}>
                    {track.title}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    {track.movie ? `${track.movie} • ${track.artist}` : track.artist}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: '#fb7185', marginTop: '0.15rem' }}>
                    {track.vibe}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {track.officialUrl && (
                    <a
                      href={track.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Watch Official YouTube Video"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        color: '#fb7185',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px',
                        borderRadius: '4px',
                        background: 'rgba(244,63,94,0.15)',
                      }}
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {isSelected && <Check size={16} color="#fb7185" />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 10px rgba(244, 63, 94, 0.8);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

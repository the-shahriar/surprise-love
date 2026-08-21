import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import UnlockScreen from './components/UnlockScreen';
import AudioPlayer from './components/AudioPlayer';
import FloatingHearts from './components/FloatingHearts';
import OpeningHero from './components/OpeningHero';
import LoveTimerSection from './components/LoveTimerSection';
import TimelineSection from './components/TimelineSection';
import PhotoGallery from './components/PhotoGallery';
import LoveRandomizer from './components/LoveRandomizer';
import SealedLoveLetter from './components/SealedLoveLetter';
import LoveCouponsSection from './components/LoveCouponsSection';
import BuildUpSection from './components/BuildUpSection';
import ProposalSection from './components/ProposalSection';
import WarningLabelSection from './components/WarningLabelSection';
import ClosingSection from './components/ClosingSection';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [proposalAccepted, setProposalAccepted] = useState(false);
  const [warningConfirmed, setWarningConfirmed] = useState(false);

  // Check if previously unlocked in current session
  useEffect(() => {
    const saved = sessionStorage.getItem('girlfriend_surprise_unlocked');
    if (saved === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem('girlfriend_surprise_unlocked', 'true');
  };

  const handleProposalYes = () => {
    setProposalAccepted(true);
    // Smooth scroll to warning section after short delay
    setTimeout(() => {
      const warningEl = document.getElementById('warning-section');
      if (warningEl) {
        warningEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const handleWarningConfirm = () => {
    setWarningConfirmed(true);
    // Smooth scroll to closing section
    setTimeout(() => {
      const closingEl = document.getElementById('closing-section');
      if (closingEl) {
        closingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Ambient Floating Hearts Particles */}
      <FloatingHearts />

      {/* Entry Unlock Screen Gate */}
      <AnimatePresence>
        {!isUnlocked && <UnlockScreen onUnlock={handleUnlock} />}
      </AnimatePresence>

      {/* Main Website Story (Visible after unlock) */}
      {isUnlocked && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ width: '100%', position: 'relative', zIndex: 2 }}
        >
          {/* Floating Music Control with Playlist Switcher */}
          <AudioPlayer />

          {/* 1. Opening Screen */}
          <OpeningHero />

          {/* 2. Relationship Count-Up Live Clock */}
          <LoveTimerSection />

          {/* 3. Relationship Timeline (including apology line) */}
          <TimelineSection />

          {/* 4. Photo & Video Gallery (81 memories with event dates & year filters) */}
          <PhotoGallery />

          {/* 5. "Things I Love About You" Randomizer */}
          <LoveRandomizer />

          {/* 6. Interactive Wax-Sealed Love Letter */}
          <SealedLoveLetter />

          {/* 7. Redeemable Love Coupons / Promise Cards */}
          <LoveCouponsSection />

          {/* 8. Build-Up Section */}
          <BuildUpSection />

          {/* 6. The Proposal */}
          <ProposalSection onYes={handleProposalYes} />

          {/* 7. Warning Label Screen (Reveals when Proposal Yes is clicked or scrolled) */}
          {proposalAccepted && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <WarningLabelSection onConfirm={handleWarningConfirm} />
            </motion.div>
          )}

          {/* 8. Closing Screen (Reveals after final Warning confirmation) */}
          {warningConfirmed && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ClosingSection />
            </motion.div>
          )}

          {/* Simple Footer Sign-off */}
          <footer
            style={{
              padding: '3rem 1.5rem',
              textAlign: 'center',
              color: '#64748b',
              fontSize: '0.85rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              marginTop: '4rem',
            }}
          >
            Made with all my heart ❤️
          </footer>
        </motion.main>
      )}
    </div>
  );
}

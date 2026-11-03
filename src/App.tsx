import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Capabilities } from './components/Capabilities';
import { Approach } from './components/Approach';
import { AppliedAi } from './components/AppliedAi';
import { Projects } from './components/Projects';
import { ContactFinish } from './components/ContactFinish';
import { RoadJourney } from './components/RoadJourney';
import { profileData } from './data/profile';
import { ArrowUp } from 'lucide-react';

// Lazy-load the game so the portfolio page loads instantly and independently
const SurviveTheCommute = lazy(() =>
  import('./components/game/SurviveTheCommute').then((module) => ({
    default: module.SurviveTheCommute,
  }))
);

const SECTION_IDS = [
  'intro',
  'experience',
  'capabilities',
  'approach',
  'applied-ai',
  'projects',
  'contact',
];

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [gameUnlocked, setGameUnlocked] = useState<boolean>(false);

  // Monitor scroll progress accurately and without hijacking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate progress through the main journey (from top to finish-line)
      const finishEl = document.getElementById('finish-line');
      let progress = 0;
      if (finishEl) {
        const finishTop = finishEl.getBoundingClientRect().top + window.pageYOffset;
        progress = Math.min(Math.max(scrollY / (finishTop - 300), 0), 1);
      } else if (docHeight > 0) {
        progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
      }
      setScrollProgress(progress);

      // Auto-unlock when scrolled directly to finish line
      if (progress >= 0.98) {
        setGameUnlocked(true);
      }

      // Determine active section based on vertical viewport positioning
      const viewportMid = window.innerHeight * 0.38;
      let currentSection = 'intro';
      let currentIndex = 0;

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportMid) {
            currentSection = SECTION_IDS[i];
            currentIndex = i;
            break;
          }
        }
      }

      setActiveSection(currentSection);
      setActiveSectionIndex(currentIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUnlockGame = useCallback(() => {
    setGameUnlocked(true);
    setTimeout(() => {
      const gameEl = document.getElementById('game-section');
      if (gameEl) {
        gameEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header / Navigation */}
      <Navigation activeSection={activeSection} />

      {/* Main Two-Column Editorial Layout */}
      <main style={{ flex: 1 }}>
        <div className="main-layout">
          {/* Main Reading Area (Priority 1 & 2: Content & Typography) */}
          <div className="content-column">
            <Hero />
            <Experience />
            <Capabilities />
            <Approach />
            <AppliedAi />
            <Projects />
            <ContactFinish
              onUnlockGame={handleUnlockGame}
              gameUnlocked={gameUnlocked}
            />
          </div>

          {/* Sticky 3D Road Journey Rail (Priority 3: Subtle car and checkpoints) */}
          <div className="rail-column">
            <RoadJourney
              scrollProgress={scrollProgress}
              activeSectionIndex={activeSectionIndex}
            />
          </div>
        </div>

        {/* Priority 4: The Final Hidden Driving Game (Lazy-loaded, revealed only at finish line) */}
        {gameUnlocked && (
          <Suspense
            fallback={
              <div
                style={{
                  padding: '48px 24px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                }}
              >
                INITIALIZING INDIAN COMMUTE SIMULATION...
              </div>
            }
          >
            <SurviveTheCommute isUnlocked={gameUnlocked} />
          </Suspense>
        )}
      </main>

      {/* Understated Editorial Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          backgroundColor: '#0a0a0a',
          padding: '48px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--page-max-width)',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--text-primary)',
                fontWeight: 600,
                marginBottom: '4px',
              }}
            >
              {profileData.name} — {profileData.role}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              Designed as an engineering publication & continuous road journey.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              {profileData.location} · {profileData.email}
            </span>

            <button
              onClick={scrollToTop}
              className="btn-secondary"
              style={{
                padding: '6px 12px',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                gap: '6px',
              }}
              title="Return to top"
            >
              <ArrowUp size={12} />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

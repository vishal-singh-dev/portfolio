import React from 'react';
import { RoadCanvas } from './RoadCanvas';
import { Compass, Check, ArrowRight } from 'lucide-react';

interface Checkpoint {
  id: string;
  index: number;
  label: string;
  subtitle: string;
}

const CHECKPOINTS: Checkpoint[] = [
  { id: 'intro', index: 0, label: '01 / Overview', subtitle: 'Identity & Summary' },
  { id: 'experience', index: 1, label: '02 / Experience', subtitle: '4.5 Years Production' },
  { id: 'capabilities', index: 2, label: '03 / Capabilities', subtitle: 'Architecture & Stack' },
  { id: 'approach', index: 3, label: '04 / Approach', subtitle: 'Investigate & Validate' },
  { id: 'applied-ai', index: 4, label: '05 / Applied AI', subtitle: 'RAG & Agent Graphs' },
  { id: 'projects', index: 5, label: '06 / Projects', subtitle: 'Case Studies & Lab' },
  { id: 'contact', index: 6, label: '07 / Finish Line', subtitle: 'Contact & Reward' },
];

interface RoadJourneyProps {
  scrollProgress: number;
  activeSectionIndex: number;
}

export const RoadJourney: React.FC<RoadJourneyProps> = ({ scrollProgress, activeSectionIndex }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const activeCheckpoint = CHECKPOINTS[activeSectionIndex] || CHECKPOINTS[0];
  const roadKm = (scrollProgress * 4.5).toFixed(2);

  return (
    <aside
      style={{
        position: 'sticky',
        top: '84px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxHeight: 'calc(100vh - 100px)',
      }}
    >
      {/* 3D Visualizer Window */}
      <div
        style={{
          height: '270px',
          width: '100%',
          position: 'relative',
          backgroundColor: '#141414',
          borderRadius: '1px',
        }}
      >
        <RoadCanvas scrollProgress={scrollProgress} activeSectionIndex={activeSectionIndex} />

        {/* Overlay Telemetry HUD */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '10px',
            right: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.66rem',
              color: 'var(--text-primary)',
              backgroundColor: 'rgba(17, 17, 17, 0.85)',
              padding: '2px 6px',
              border: '1px solid var(--border)',
            }}
          >
            ODOMETER: {roadKm} / 4.50 KM
          </span>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.66rem',
              color: 'var(--text-muted)',
              backgroundColor: 'rgba(17, 17, 17, 0.85)',
              padding: '2px 6px',
              border: '1px solid var(--border)',
            }}
          >
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>

      {/* Checkpoint Status Panel */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '14px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '8px',
            marginBottom: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Compass size={13} color="var(--text-muted)" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              JOURNEY TRACKER
            </span>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--text-primary)',
            }}
            title={activeCheckpoint.label}
          >
            {activeCheckpoint.label}
          </span>
        </div>

        {/* Checkpoint Navigation Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {CHECKPOINTS.map((cp) => {
            const isPassed = cp.index < activeSectionIndex;
            const isCurrent = cp.index === activeSectionIndex;

            return (
              <button
                key={cp.id}
                onClick={() => scrollTo(cp.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: isCurrent ? 'var(--surface-secondary)' : 'transparent',
                  border: 'none',
                  borderLeft: isCurrent ? '2px solid var(--text-primary)' : '2px solid transparent',
                  padding: '5px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.73rem',
                      fontWeight: isCurrent ? 600 : 400,
                      color: isCurrent ? 'var(--text-primary)' : isPassed ? 'var(--text-secondary)' : 'var(--text-muted)',
                    }}
                  >
                    {cp.label}
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {cp.subtitle}
                  </span>
                </div>

                {isCurrent ? (
                  <ArrowRight size={12} color="var(--text-primary)" />
                ) : isPassed ? (
                  <Check size={12} color="var(--text-muted)" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

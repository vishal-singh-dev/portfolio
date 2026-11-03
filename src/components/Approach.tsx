import React from 'react';
import { approachData } from '../data/approach';

export const Approach: React.FC = () => {
  return (
    <section
      id="approach"
      style={{
        paddingTop: 'var(--spacing-12)',
        paddingBottom: 'var(--spacing-12)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label">
        04 / Engineering Approach & Production Troubleshooting
      </div>

      <h2
        style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.3rem)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--spacing-3)',
        }}
      >
        How I Think: Beyond the Happy Path
      </h2>

      <p
        style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '740px',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        Production failures rarely occur in clean, isolated units. They emerge at integration seams,
        during race conditions, under unexpected database locks, or through edge-case data mutations.
        Here is the systematic methodology I apply to diagnose and resolve non-trivial incidents.
      </p>

      {/* 4 sequential approach blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        {approachData.map((item, idx) => (
          <div
            key={item.step}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: 'var(--spacing-4)',
              borderTop: idx === 0 ? '1px solid var(--border)' : '1px solid var(--border-subtle)',
              paddingTop: 'var(--spacing-5)',
            }}
            className="approach-row"
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  display: 'block',
                }}
              >
                {item.step}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                PHASE
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </h3>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  // {item.subtitle}
                </span>
              </div>

              <p
                style={{
                  fontSize: '0.98rem',
                  lineHeight: 1.68,
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--spacing-3)',
                  maxWidth: '720px',
                }}
              >
                {item.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border-subtle)',
                  padding: '12px 16px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '2px',
                  }}
                >
                  Applied Rigor:
                </span>
                {item.practices.map((practice, pIdx) => (
                  <div
                    key={pIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.86rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>›</span>
                    <span>{practice}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

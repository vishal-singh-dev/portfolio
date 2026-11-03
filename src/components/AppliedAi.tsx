import React from 'react';
import { appliedAiData } from '../data/appliedAi';

export const AppliedAi: React.FC = () => {
  return (
    <section
      id="applied-ai"
      style={{
        paddingTop: 'var(--spacing-12)',
        paddingBottom: 'var(--spacing-12)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label">
        05 / Applied AI & Technical Exploration
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
        Enterprise AI & Grounded LLM Systems
      </h2>

      <p
        style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '740px',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        Bridging statistical language models with deterministic enterprise backends. Focused on factual grounding,
        stateful multi-step agent execution, and defensive validation to eliminate hallucinations in production workflows.
      </p>

      {/* Grid of AI components */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--spacing-4)',
        }}
      >
        {appliedAiData.map((item, idx) => (
          <div
            key={item.title}
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: 'var(--spacing-4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  PATTERN 0{idx + 1}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    padding: '2px 6px',
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {item.category}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.62,
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--spacing-3)',
                }}
              >
                {item.summary}
              </p>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              {item.technicalDetails.map((detail, dIdx) => (
                <div
                  key={dIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                    color: 'var(--text-muted)',
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>•</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

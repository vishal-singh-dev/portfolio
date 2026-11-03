import React from 'react';
import { skillsData } from '../data/skills';

export const Capabilities: React.FC = () => {
  return (
    <section
      id="capabilities"
      style={{
        paddingTop: 'var(--spacing-12)',
        paddingBottom: 'var(--spacing-12)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label">
        03 / Engineering Capabilities
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
        Core Technical Competencies
      </h2>

      <p
        style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '740px',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        Structured around four production engineering domains. Technologies are selected and deployed
        according to what they solve: fault tolerance, latency budgets, data integrity, and operational simplicity.
      </p>

      {/* 2x2 Grid of Capabilities */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--spacing-5)',
        }}
      >
        {skillsData.map((category, idx) => (
          <div
            key={category.id}
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
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  marginBottom: '6px',
                }}
              >
                AREA 0{idx + 1}
              </div>

              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {category.category}
              </h3>

              <p
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--spacing-4)',
                }}
              >
                {category.description}
              </p>

              {/* Sub-competencies */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
                {category.competencies.map((comp) => (
                  <div key={comp.name}>
                    <div
                      style={{
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '4px',
                      }}
                    >
                      {comp.name}
                    </div>
                    <div
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                        marginBottom: '8px',
                      }}
                    >
                      {comp.description}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {comp.technologies.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            padding: '2px 8px',
                            backgroundColor: 'var(--surface-secondary)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
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

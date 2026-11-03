import React from 'react';
import { experienceData } from '../data/experience';
import { Calendar, MapPin } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      style={{
        paddingTop: 'var(--spacing-12)',
        paddingBottom: 'var(--spacing-12)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label">
        02 / Professional Experience
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
        Engineering Record & Production Systems
      </h2>

      <p
        style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '740px',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        4.5 years of engineering history spanning enterprise financial systems, automated lending engines,
        resilient backend services, and cloud integrations. Focused on end-to-end reliability, data integrity, and pragmatic trade-offs.
      </p>

      {/* Timeline items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        {experienceData.map((item, idx) => (
          <article
            key={item.id}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(220px, 260px) 1fr',
              gap: 'var(--spacing-4)',
              borderTop: idx === 0 ? 'none' : '1px solid var(--border)',
              paddingTop: idx === 0 ? '0' : 'var(--spacing-8)',
            }}
            className="experience-grid-row"
          >
            {/* Left column: Role & Metadata */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '8px',
                }}
              >
                <Calendar size={13} />
                {item.period}
              </span>

              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.role}
              </h3>

              <div
                style={{
                  fontSize: '0.98rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  marginBottom: '12px',
                }}
              >
                {item.company}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginBottom: '16px',
                }}
              >
                <MapPin size={12} />
                {item.location}
              </div>

              {/* Technologies used in role */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {item.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="subtle-tag"
                    style={{ fontSize: '0.7rem', padding: '2px 8px' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right column: Summary & Selected Contributions */}
            <div>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.68,
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-3)',
                }}
              >
                {item.summary}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {item.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      fontSize: '0.95rem',
                      lineHeight: 1.62,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-muted)',
                        fontSize: '0.75rem',
                        marginTop: '4px',
                        userSelect: 'none',
                        flexShrink: 0,
                      }}
                    >
                      —
                    </span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

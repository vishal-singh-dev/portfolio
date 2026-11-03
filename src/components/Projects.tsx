import React, { useState } from 'react';
import { projectsData, engineeringLabNote } from '../data/projects';
import { ChevronDown, ChevronUp, Layers, CheckSquare, AlertTriangle, Cpu } from 'lucide-react';

export const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(projectsData[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="projects"
      style={{
        paddingTop: 'var(--spacing-12)',
        paddingBottom: 'var(--spacing-12)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label">
        06 / Projects & Engineering Lab
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
        Architectural Deep-Dives & Production Systems
      </h2>

      <p
        style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '740px',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        In-depth technical dissections of enterprise systems built and maintained in production.
        Each case study details problem constraints, architectural composition, key engineering choices, and pragmatic trade-offs.
      </p>

      {/* Project list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
        {projectsData.map((project, idx) => {
          const isExpanded = expandedId === project.id;
          return (
            <div
              key={project.id}
              style={{
                backgroundColor: 'var(--surface)',
                border: isExpanded ? '1px solid var(--border-light)' : '1px solid var(--border)',
                transition: 'border-color 0.2s ease',
              }}
            >
              {/* Header card */}
              <div
                onClick={() => toggleExpand(project.id)}
                style={{
                  padding: 'var(--spacing-4)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      CASE 0{idx + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        padding: '2px 8px',
                        backgroundColor: 'var(--surface-secondary)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {project.timeline}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <div>
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '4px',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {project.title}
                    </h3>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {project.category}
                    </div>
                  </div>

                  <button
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0,
                    }}
                    aria-label={isExpanded ? 'Collapse case study' : 'Expand case study'}
                  >
                    <span>{isExpanded ? 'LESS' : 'DETAILS'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>

                <p
                  style={{
                    fontSize: '0.96rem',
                    lineHeight: 1.62,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {project.summary}
                </p>

                {/* Tech badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.technologies.map(tech => (
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

              {/* Collapsible Deep-Dive Details */}
              {isExpanded && (
                <div
                  style={{
                    borderTop: '1px solid var(--border)',
                    padding: 'var(--spacing-4)',
                    backgroundColor: 'var(--surface-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-4)',
                  }}
                >
                  {/* Problem statement */}
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      Operational Constraint & Problem Statement
                    </span>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                      {project.problemStatement}
                    </p>
                  </div>

                  {/* Architecture */}
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '8px',
                      }}
                    >
                      <Layers size={13} />
                      Architectural Topology
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {project.architecture.map((arch, aIdx) => (
                        <div
                          key={aIdx}
                          style={{
                            fontSize: '0.88rem',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                          }}
                        >
                          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>›</span>
                          <span>{arch}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Decisions */}
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '8px',
                      }}
                    >
                      <CheckSquare size={13} />
                      Engineering Decisions & Reliability Measures
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {project.keyDecisions.map((decision, dIdx) => (
                        <div
                          key={dIdx}
                          style={{
                            fontSize: '0.88rem',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                          }}
                        >
                          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>›</span>
                          <span>{decision}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tradeoffs & Challenges */}
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '8px',
                      }}
                    >
                      <AlertTriangle size={13} />
                      Trade-offs & Operational Realities
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {project.tradeoffsAndChallenges.map((item, tIdx) => (
                        <div
                          key={tIdx}
                          style={{
                            fontSize: '0.88rem',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                          }}
                        >
                          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>›</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Engineering Lab Note */}
      <div
        style={{
          marginTop: 'var(--spacing-6)',
          padding: 'var(--spacing-4)',
          border: '1px dashed var(--border)',
          backgroundColor: 'transparent',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
        }}
      >
        <Cpu size={22} color="var(--text-muted)" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <h4
            style={{
              fontSize: '0.96rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '6px',
            }}
          >
            {engineeringLabNote.title}
          </h4>
          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}
          >
            {engineeringLabNote.description}
          </p>
        </div>
      </div>
    </section>
  );
};

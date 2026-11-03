import React from 'react';
import { profileData } from '../data/profile';
import { FileText, ArrowDown, Mail, Linkedin, MapPin, GraduationCap } from 'lucide-react';

export const Hero: React.FC = () => {
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

  return (
    <section
      id="intro"
      style={{
        paddingTop: 'calc(var(--spacing-16) + 20px)',
        paddingBottom: 'var(--spacing-12)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label">
        01 / {profileData.heroHeadline}
      </div>

      <h1
        style={{
          fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
          fontWeight: 600,
          lineHeight: 1.16,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          maxWidth: '820px',
          marginTop: 'var(--spacing-2)',
          marginBottom: 'var(--spacing-4)',
        }}
      >
        {profileData.heroTitle}
      </h1>

      <p
        style={{
          fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          maxWidth: '740px',
          marginBottom: 'var(--spacing-6)',
        }}
      >
        {profileData.heroDescription}
      </p>

      {/* Meta Specifications Table / Badges */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '18px 0',
          marginBottom: 'var(--spacing-6)',
        }}
      >
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>
            Current Focus
          </span>
          <span style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 500 }}>
            Enterprise Fintech & Systems
          </span>
        </div>

        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>
            Location
          </span>
          <span style={{ color: 'var(--text-primary)', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} color="var(--text-muted)" />
            {profileData.location}
          </span>
        </div>

        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>
            Education
          </span>
          <span style={{ color: 'var(--text-primary)', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <GraduationCap size={14} color="var(--text-muted)" />
            {profileData.education.degree}, {profileData.education.year}
          </span>
        </div>
      </div>

      {/* Primary & Secondary Actions */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <button
          onClick={() => scrollTo('experience')}
          className="btn-primary"
        >
          <span>Explore my experience</span>
          <ArrowDown size={15} />
        </button>

        <a
          href={profileData.resumeUrl}
          download="Vishal_Singh_Resume.pdf"
          className="btn-secondary"
        >
          <FileText size={15} />
          <span>Download resume</span>
        </a>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginLeft: 'auto',
          }}
          className="hero-social-links"
        >
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="subtle-tag"
            style={{ padding: '8px 12px', gap: '6px' }}
          >
            <Linkedin size={13} />
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${profileData.email}`}
            className="subtle-tag"
            style={{ padding: '8px 12px', gap: '6px' }}
          >
            <Mail size={13} />
            <span>Email</span>
          </a>
        </div>
      </div>
    </section>
  );
};

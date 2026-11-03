import React from 'react';
import { profileData } from '../data/profile';
import { Mail, Linkedin, FileText, Flag, Sparkles } from 'lucide-react';

interface ContactFinishProps {
  onUnlockGame: () => void;
  gameUnlocked: boolean;
}

export const ContactFinish: React.FC<ContactFinishProps> = ({ onUnlockGame, gameUnlocked }) => {
  return (
    <section
      id="contact"
      style={{
        paddingTop: 'var(--spacing-12)',
        paddingBottom: 'var(--spacing-12)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label">
        07 / Contact & Finish Line
      </div>

      <h2
        style={{
          fontSize: 'clamp(2rem, 3.8vw, 3rem)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          lineHeight: 1.2,
          maxWidth: '740px',
          marginBottom: 'var(--spacing-4)',
        }}
      >
        Good software is built one decision at a time.
      </h2>

      <p
        style={{
          fontSize: '1.15rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          maxWidth: '680px',
          marginBottom: 'var(--spacing-6)',
        }}
      >
        I'm interested in engineering challenges that require thoughtful systems design, reliable implementation,
        robust data integrity, and pragmatic problem-solving. Whether you are scaling an enterprise architecture
        or solving a tough production bottleneck, let's connect.
      </p>

      {/* Action buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '14px',
          marginBottom: 'var(--spacing-10)',
        }}
      >
        <a
          href={`mailto:${profileData.email}`}
          className="btn-primary"
        >
          <Mail size={16} />
          <span>Email Vishal</span>
        </a>

        <a
          href={profileData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <Linkedin size={16} />
          <span>Connect on LinkedIn</span>
        </a>

        <a
          href={profileData.resumeUrl}
          download="Vishal_Singh_Resume.pdf"
          className="btn-secondary"
        >
          <FileText size={16} />
          <span>Download Resume</span>
        </a>
      </div>

      {/* Direct Contact Metadata Table */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: 'var(--spacing-10)',
        }}
      >
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
            Email
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
            {profileData.email}
          </span>
        </div>

        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
            Direct Contact
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
            {profileData.phone}
          </span>
        </div>

        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
            Location
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
            {profileData.location}
          </span>
        </div>
      </div>

      {/* The Finish Line Boundary */}
      <div
        id="finish-line"
        style={{
          position: 'relative',
          padding: '32px 24px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '14px',
        }}
      >
        {/* Subtle Checkered road finish tape */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'repeating-linear-gradient(90deg, #d5d5d5, #d5d5d5 10px, #242424 10px, #242424 20px)',
          }}
        />

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          <Flag size={14} color="var(--text-primary)" />
          <span>JOURNEY CHECKPOINT 07 · FINISH LINE REACHED</span>
        </div>

        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          You have reached the destination of the engineering road.
        </h3>

        <p
          style={{
            fontSize: '0.94rem',
            color: 'var(--text-secondary)',
            maxWidth: '540px',
          }}
        >
          The car has completed the entire professional track from early systems to enterprise scale.
          A hidden test of navigation awaits below.
        </p>

        {!gameUnlocked ? (
          <button
            onClick={onUnlockGame}
            className="btn-primary"
            style={{
              marginTop: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              letterSpacing: '0.04em',
            }}
          >
            <span>REVEAL SURVIVE THE COMMUTE</span>
            <Sparkles size={14} />
          </button>
        ) : (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>↓ FINAL CHALLENGE UNLOCKED BELOW</span>
          </div>
        )}
      </div>
    </section>
  );
};

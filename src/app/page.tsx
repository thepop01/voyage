"use client"
import Link from "next/link"
import { Dock } from "@/components/layout/Dock"

export default function LandingPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ─── Page Reset ─────────────────────────────────── */
        .page-index-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          font-family: 'Space Mono', monospace;
          background-image: url('/robo.png');
          background-size: cover;
          background-position: center top;
        }

        /* Lighter, warmer overlay so robo character shows clearly */
        .page-index-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(5, 4, 12, 0.82) 0%,
            rgba(10, 8, 20, 0.60) 50%,
            rgba(5, 4, 12, 0.40) 100%
          );
          pointer-events: none;
        }

        /* ─── Top-left header ────────────────────────────── */
        .landing-header {
          position: fixed;
          top: 52px;
          left: 60px;
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 520px;
        }

        /* Brand row: logo text + social icons */
        .brand-row {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .voyage-title {
          font-family: var(--font-display, 'Space Grotesk'), sans-serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          line-height: 1;
          margin: 0;
          color: #ffffff;
          text-shadow:
            0 0 40px rgba(217, 119, 87, 0.5),
            0 0 80px rgba(217, 119, 87, 0.2);
        }

        /* Thin horizontal rule under title */
        .title-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, var(--accent) 0%, transparent 70%);
          margin: 4px 0;
        }

        .tagline-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.65);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          line-height: 1.7;
          margin: 0;
        }

        /* ─── Social Icons ───────────────────────────────── */
        .social-icons {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-top: 2px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: all 0.25s ease;
          background: rgba(255, 255, 255, 0.04);
        }

        .social-link:hover {
          color: #fff;
          border-color: var(--accent);
          background: rgba(217, 119, 87, 0.12);
          transform: translateY(-2px);
        }

        /* ─── Action Buttons (top-right) ─────────────────── */
        .action-group {
          position: fixed;
          top: 52px;
          right: 60px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-end;
          z-index: 100;
        }

        .btn-launch {
          font-family: var(--font-display, 'Space Grotesk'), sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 36px;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 24px rgba(217, 119, 87, 0.35);
          min-width: 180px;
          text-align: center;
          display: inline-block;
        }

        .btn-launch:hover {
          background: #e8886a;
          box-shadow: 0 0 40px rgba(217, 119, 87, 0.55);
          transform: translateY(-2px);
          color: #fff;
          text-decoration: none;
        }

        .btn-contact {
          font-family: var(--font-display, 'Space Grotesk'), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 8px 24px;
          background: transparent;
          color: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.25s ease;
          min-width: 140px;
          text-align: center;
          display: inline-block;
        }

        .btn-contact:hover {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-2px);
          text-decoration: none;
        }

        /* ─── Bottom-left stats strip ────────────────────── */
        .stats-strip {
          position: fixed;
          bottom: 108px;
          left: 60px;
          display: flex;
          gap: 40px;
          z-index: 10;
        }

        .stat-pill {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-pill-value {
          font-family: var(--font-display, 'Space Grotesk'), sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }

        .stat-pill-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.4);
        }

        .stat-divider {
          width: 1px;
          background: rgba(255, 255, 255, 0.12);
          align-self: stretch;
        }

        /* ─── Status monitor (bottom-right) ──────────────── */
        .status-monitor {
          position: fixed;
          bottom: 44px;
          right: 60px;
          text-align: right;
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          color: rgba(255, 255, 255, 0.28);
          z-index: 10;
          line-height: 1.9;
          letter-spacing: 0.06em;
        }

        .status-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #4ade80;
          border-radius: 50%;
          margin-right: 5px;
          vertical-align: middle;
          box-shadow: 0 0 6px #4ade80;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* ─── Subtle corner decorations ──────────────────── */
        .corner-tl, .corner-br {
          position: fixed;
          width: 40px;
          height: 40px;
          z-index: 5;
          opacity: 0.3;
        }

        .corner-tl {
          top: 20px;
          left: 20px;
          border-top: 1px solid var(--accent);
          border-left: 1px solid var(--accent);
        }

        .corner-br {
          bottom: 20px;
          right: 20px;
          border-bottom: 1px solid var(--accent);
          border-right: 1px solid var(--accent);
        }

        /* ─── Responsive ──────────────────────────────────── */
        @media (max-width: 900px) {
          .landing-header {
            top: 32px;
            left: 24px;
            max-width: calc(100vw - 48px);
          }

          .action-group {
            top: auto;
            right: auto;
            bottom: 120px;
            left: 24px;
            align-items: flex-start;
            flex-direction: row;
            flex-wrap: wrap;
          }

          .btn-launch, .btn-contact {
            min-width: auto;
            padding: 12px 24px;
            font-size: 0.8rem;
          }

          .stats-strip {
            display: none;
          }

          .status-monitor {
            display: none;
          }

          .voyage-title {
            font-size: clamp(2.4rem, 10vw, 4rem);
          }

          .corner-tl, .corner-br {
            display: none;
          }
        }
      ` }} />

      <div className="page-index-container">
        <div className="page-index-overlay"></div>
        
        {/* Decorative corners */}
        <div className="corner-tl"></div>
        <div className="corner-br"></div>

        {/* Top-left: Brand + Tagline */}
        <header className="landing-header">
          <div className="brand-row">
            <h1 className="voyage-title">Voyage</h1>
            <div className="social-icons">
              <a href="#" className="social-link" aria-label="X / Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Discord">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.23 10.23 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="title-rule"></div>
          <p className="tagline-text">
            Campaign credentialing &amp; digital reputation.<br />
            Build your on-chain identity.
          </p>
        </header>

        {/* Top-right: CTA Buttons */}
        <aside className="action-group">
          <Link href="/dashboard" className="btn-launch">Launch App →</Link>
          <a href="#" className="btn-contact">Get in Touch</a>
        </aside>

        {/* Bottom-left: Live stats */}
        <div className="stats-strip">
          <div className="stat-pill">
            <span className="stat-pill-value">12.4K</span>
            <span className="stat-pill-label">Active Users</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-pill">
            <span className="stat-pill-value">$2.1M</span>
            <span className="stat-pill-label">Rewards Paid</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-pill">
            <span className="stat-pill-value">340+</span>
            <span className="stat-pill-label">Campaigns</span>
          </div>
        </div>

        {/* Dock Navigation */}
        <Dock />

        {/* Bottom-right: Status */}
        <footer className="status-monitor" aria-label="System status">
          <span className="status-dot"></span>OPERATIONAL<br />
          NODE: VOYAGE_01 &nbsp;·&nbsp; 99.99% UPTIME
        </footer>
      </div>
    </>
  )
}

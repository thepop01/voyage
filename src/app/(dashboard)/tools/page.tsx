"use client"
import { useWallets } from "@/lib/contexts/WalletContext"
import Link from "next/link"

/* ── Icons ─────────────────────────────────────── */
function BotIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 8V4H8"/>
      <rect x="4" y="8" width="16" height="12" rx="2"/>
      <path d="M2 14h2"/>
      <path d="M20 14h2"/>
      <path d="M15 13v2"/>
      <path d="M9 13v2"/>
    </svg>
  )
}
function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  )
}

/* ── Page ───────────────────────────────────────── */
export default function ToolsHubPage() {
  const { wallets } = useWallets()

  const bots = [
    {
      title: "Polymarket Tracker",
      subtitle: "Prediction market intelligence",
      description: "Track your wallets across Polymarket. Full trade history, open positions, P&L analysis, win rates, and real-time notifications when positions move.",
      href: "/tools/polymarket",
      gradient: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(30,20,80,0.35) 100%)",
      border: "rgba(124,58,237,0.25)",
      accent: "#fff",
      accentLight: "#fff",
      icon: "",
      stats: [
        { label: "Wallets", value: wallets.length.toString() },
        { label: "Open Positions", value: "—" },
        { label: "24h P&L", value: "—" },
      ],
    },
    {
      title: "NFT Mint WL Tracker",
      subtitle: "Whitelist monitoring bot",
      description: "Automatically checks all your connected wallets against upcoming NFT mint whitelists. Get instant alerts when you're selected for a mint.",
      href: "/tools/nft-mint",
      gradient: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(30,40,30,0.3) 100%)",
      border: "rgba(255,255,255,0.15)",
      accent: "#fff",
      accentLight: "#fff",
      icon: "🖼️",
      stats: [
        { label: "Wallets", value: wallets.length.toString() },
        { label: "Upcoming Mints", value: "—" },
        { label: "WL Hits", value: "—" },
      ],
    },
  ]

  return (
    <div>
      {/* ─── Hero ──────────────────────────────────────── */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        marginBottom: 40,
        padding: "60px 48px",
        background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(30,20,80,0.35) 50%, rgba(16,185,129,0.1) 100%)",
        border: "1px solid rgba(124,58,237,0.2)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: 24, pointerEvents: "none", opacity: 0.06,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 580 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 22,
            padding: "5px 16px",
            background: "rgba(124,58,237,0.14)",
            border: "1px solid rgba(124,58,237,0.35)",
            borderRadius: 100,
          }}>
            <span style={{ color: "#fff", display: "flex" }}><BotIcon size={16} /></span>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>
              Automated Trackers
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 18,
            fontFamily: "var(--font-display)",
            background: "linear-gradient(135deg, #e8f1f8 0%, #7dd3fc 50%, #7c3aed 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Bots &amp;<br />Wallet Tracking
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--fg-light)", lineHeight: 1.7, maxWidth: 480 }}>
            Two automated bots that track all your connected profile wallets. Select a bot below to dive into its full dashboard.
          </p>
        </div>
      </div>

      {/* ─── Bot Cards ─────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {bots.map((bot) => (
          <Link
            key={bot.href}
            href={bot.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                border: `1px solid ${bot.border}`,
                background: bot.gradient,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)"
                e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${bot.border}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              {/* Header */}
              <div style={{ padding: "28px 28px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: `${bot.accent}20`,
                    border: `1px solid ${bot.accent}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.6rem",
                  }}>{bot.icon}</div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>{bot.title}</h2>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--muted)" }}>{bot.subtitle}</p>
                  </div>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--fg-light)", lineHeight: 1.6, marginBottom: 20 }}>
                  {bot.description}
                </p>
              </div>

              {/* Stats */}
              <div style={{
                display: "flex", gap: 0,
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}>
                {bot.stats.map((s, i) => (
                  <div key={i} style={{
                    flex: 1,
                    padding: "16px 0",
                    textAlign: "center",
                    borderRight: i < bot.stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 800, color: bot.accent }}>{s.value}</div>
                    <div style={{ fontSize: "0.6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{
                padding: "14px 28px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: bot.accentLight }}>Open Full Dashboard</span>
                <span style={{ color: bot.accentLight, display: "flex" }}><ArrowRightIcon /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ─── Connected Wallets Summary ──────────────────── */}
      <div style={{
        marginTop: 32,
        borderRadius: 16,
        padding: "20px 24px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
            Connected Wallets ({wallets.length})
          </span>
          <Link href="/profile" style={{ fontSize: "0.72rem", fontWeight: 600, color: "#fff", textDecoration: "none" }}>
            Manage in Profile →
          </Link>
        </div>
        {wallets.length === 0 ? (
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0 }}>
            No wallets connected yet. Head to your <Link href="/profile" style={{ color: "#fff" }}>Profile</Link> to add wallets and start tracking.
          </p>
        ) : (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {wallets.map(w => (
              <div key={w.id} style={{
                padding: "6px 14px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--fg-light)",
                fontFamily: "var(--font-display)",
              }}>
                {w.address.slice(0, 6)}...{w.address.slice(-4)}
                <span style={{ fontSize: "0.6rem", color: "var(--muted)", marginLeft: 8 }}>{w.chain}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

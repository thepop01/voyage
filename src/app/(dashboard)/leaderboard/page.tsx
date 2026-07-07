"use client"
import { useState, useEffect } from "react"

/* ─── Data ─────────────────────────────────────────────── */

const announcements = [
  {
    id: 1,
    type: "WINNER",
    typeEmoji: "",
    typecolor: "#fff",
    typeBg: "rgba(245, 158, 11, 0.12)",
    typeBorder: "rgba(245, 158, 11, 0.3)",
    user: "@alpha_dev",
    name: "Alex Devlin",
    initials: "AD",
    avatarColor: "#fff",
    message: "won the DeFi Protocol v2 campaign",
    prize: "$500 USDC",
    date: "June 14, 2026",
  },
  {
    id: 2,
    type: "GOAT",
    typeEmoji: "🌟",
    typecolor: "#fff",
    typeBg: "rgba(124, 58, 237, 0.15)",
    typeBorder: "rgba(139, 92, 246, 0.35)",
    user: "@crypto_king",
    name: "Kyrie Nakamura",
    initials: "KN",
    avatarColor: "#fff",
    message: "became the all-time highest REP holder with",
    prize: "15,800 REP",
    date: "June 12, 2026",
  },
  {
    id: 3,
    type: "GIFT",
    typeEmoji: "",
    typeColor: "#fff",
    typeBg: "rgba(244, 114, 182, 0.12)",
    typeBorder: "rgba(244, 114, 182, 0.3)",
    user: "@nft_whale",
    name: "Nadia Fontaine",
    initials: "NF",
    avatarColor: "#fff",
    message: "received a legendary Solana Alpha NFT whitelist as a surprise",
    prize: "Whitelist Spot",
    date: "June 10, 2026",
  },
  {
    id: 4,
    type: "STREAK",
    typeEmoji: "",
    typeColor: "#fff",
    typeBg: "rgba(251, 146, 60, 0.12)",
    typeBorder: "rgba(251, 146, 60, 0.3)",
    user: "@chain_runner",
    name: "Chen Ruiz",
    initials: "CR",
    avatarColor: "#c2410c",
    message: "completed 30 campaigns in a row and claimed a",
    prize: "VIP Role Access",
    date: "June 8, 2026",
  },
  {
    id: 5,
    type: "WINNER",
    typeEmoji: "",
    typecolor: "#fff",
    typeBg: "rgba(245, 158, 11, 0.12)",
    typeBorder: "rgba(245, 158, 11, 0.3)",
    user: "@dao_maker",
    name: "Dmitri Aoki",
    initials: "DA",
    avatarColor: "#1d4ed8",
    message: "won the Solana L3 Alpha raffle and earned",
    prize: "$1,000 USDC",
    date: "June 5, 2026",
  },
]

const leaderboardData = [
  { rank: 1, user: "@alpha_dev",    name: "Alex Devlin",     initials: "AD", color: "#fff", rep: 15800, quality: "99%", wins: 47 },
  { rank: 2, user: "@crypto_king",  name: "Kyrie Nakamura",  initials: "KN", color: "#fff", rep: 12450, quality: "97%", wins: 32 },
  { rank: 3, user: "@web3_warrior", name: "Wei Okafor",      initials: "WO", color: "#6d28d9", rep: 10120, quality: "96%", wins: 28 },
  { rank: 4, user: "@chain_runner", name: "Chen Ruiz",       initials: "CR", color: "#c2410c", rep: 9850,  quality: "98%", wins: 12 },
  { rank: 5, user: "@dao_maker",    name: "Dmitri Aoki",     initials: "DA", color: "#1d4ed8", rep: 9200,  quality: "95%", wins: 10 },
  { rank: 6, user: "@pixel_punk",   name: "Priya Patel",     initials: "PP", color: "#fff", rep: 8700,  quality: "91%", wins: 9  },
  { rank: 7, user: "@defi_ghost",   name: "Diego Fischer",   initials: "DF", color: "#065f46", rep: 6540,  quality: "89%", wins: 7  },
  { rank: 8, user: "@ninja_user",   name: "You",             initials: "", color: "#fff", rep: 3120,  quality: "92%", wins: 14, isYou: true },
]

/* ─── Sub-components ────────────────────────────────────── */

function Avatar({ initials, color, size = 44 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${color}cc, ${color}66)`,
      border: `2px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: 700, color: "#fff",
      flexShrink: 0, boxShadow: `0 4px 12px ${color}44`
    }}>
      {initials}
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────── */

export default function StatsPage() {
  const [activeTab, setActiveTab]     = useState("reputation")
  const [currentIdx, setCurrentIdx]   = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // auto-rotate
  useEffect(() => {
    const t = setInterval(() => goTo((prev: number) => (prev + 1) % announcements.length), 5000)
    return () => clearInterval(t)
  }, [])

  function goTo(nextOrFn: number | ((p: number) => number)) {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIdx(typeof nextOrFn === "function" ? nextOrFn(currentIdx) : nextOrFn)
      setIsAnimating(false)
    }, 200)
  }

  const ann = announcements[currentIdx]

  const rankMedal = (r: number) => r === 1 ? "🥇" : r === 2 ? "🥈" : r === 3 ? "🥉" : `#${r}`

  return (
    <div style={{ paddingBottom: 120 }}>
      {/* ── Page Header ── */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{
            fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#fff",
            padding: "4px 12px", borderRadius: 100,
            background: "var(--accent-dim)", border: "1px solid rgba(255,255,255,0.15)"
          }}>Live Stats</span>
        </div>
        <h1 style={{ fontSize: "2.8rem", marginBottom: 10, letterSpacing: "-0.02em" }}>
          Stats & Hall of Fame
        </h1>
        <p style={{ color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.8rem", margin: 0 }}>
          Community achievements, rankings & real-time activity
        </p>
      </div>

      {/* ── Live Announcement Carousel ── */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FBEFEF", boxShadow: "0 0 8px #10b981", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg)" }}>
            Live Announcements
          </span>
        </div>

        <div className="glass-panel" style={{
          position: "relative",
          padding: "36px 48px",
          minHeight: 160,
          display: "flex",
          alignItems: "center",
          gap: 32,
          overflow: "hidden",
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? "translateY(4px)" : "translateY(0)",
          transition: "opacity 0.2s ease, transform 0.2s ease"
        }}>
          {/* Glow background accent */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse at 10% 50%, ${ann.typeColor}0a 0%, transparent 60%)`,
            borderRadius: "inherit"
          }} />

          {/* Arrow Left */}
          <button onClick={() => goTo((p: number) => (p - 1 + announcements.length) % announcements.length)}
            style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--fg)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          {/* Arrow Right */}
          <button onClick={() => goTo((p: number) => (p + 1) % announcements.length)}
            style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--fg)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          {/* Avatar */}
          <div style={{ flexShrink: 0, zIndex: 1 }}>
            <Avatar initials={ann.initials} color={ann.avatarColor} size={80} />
          </div>

          {/* Content */}
          <div style={{ flex: 1, zIndex: 1 }}>
            {/* Type badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{
                fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.15em",
                textTransform: "uppercase", color: ann.typeColor,
                padding: "3px 10px", borderRadius: 100,
                background: ann.typeBg, border: `1px solid ${ann.typeBorder}`
              }}>{ann.typeEmoji} {ann.type}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{ann.date}</span>
            </div>

            {/* Name + Handle */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--fg)", fontFamily: "var(--font-display)" }}>
                {ann.name}
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)", fontWeight: 500 }}>
                {ann.user}
              </span>
            </div>

            {/* Message */}
            <p style={{ color: "var(--fg-light)", fontSize: "1rem", margin: 0, lineHeight: 1.5 }}>
              {ann.message}{" "}
              <span style={{ color: ann.typeColor, fontWeight: 700 }}>{ann.prize}</span>
            </p>
          </div>

          {/* Dots */}
          <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
            {announcements.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                width: currentIdx === i ? 18 : 6, height: 6, borderRadius: 3,
                background: currentIdx === i ? ann.typeColor : "rgba(255,255,255,0.15)",
                border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Hall of Fame Gallery ── */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: "1.5rem", margin: "0 0 4px 0" }}>🏛️ Hall of Fame</h2>
            <p style={{ color: "var(--muted)", fontSize: "0.8rem", margin: 0 }}>All-time memorable moments from the community</p>
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--muted)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", padding: "5px 12px", borderRadius: 8 }}>
            {announcements.length} moments
          </span>
        </div>

        {/* Gallery Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {announcements.map((a, idx) => (
            <div
              key={a.id}
              className="dense-card"
              style={{
                padding: "24px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                borderLeft: `3px solid ${a.typeColor}`,
                background: idx === 0 ? "rgba(245,158,11,0.04)" : undefined,
              }}
            >
              {/* Top row: avatar + type badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <Avatar initials={a.initials} color={a.avatarColor} size={48} />
                <span style={{
                  fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: a.typeColor,
                  padding: "3px 10px", borderRadius: 100,
                  background: a.typeBg, border: `1px solid ${a.typeBorder}`
                }}>{a.typeEmoji} {a.type}</span>
              </div>

              {/* Name */}
              <div style={{ marginBottom: 4 }}>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--fg)", fontFamily: "var(--font-display)" }}>
                  {a.name}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{a.user}</div>
              </div>

              {/* Message */}
              <p style={{ color: "var(--fg-light)", fontSize: "0.82rem", margin: "12px 0 16px", lineHeight: 1.5 }}>
                {a.message}{" "}
                <span style={{ color: a.typeColor, fontWeight: 700 }}>{a.prize}</span>
              </p>

              {/* Date */}
              <div style={{ fontSize: "0.7rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {a.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Leaderboard ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: "1.5rem", margin: "0 0 4px 0" }}> Rankings</h2>
            <p style={{ color: "var(--muted)", fontSize: "0.8rem", margin: 0 }}>Global ranking across all community members</p>
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, padding: "4px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid var(--border)" }}>
            {[
              { id: "reputation", label: "Reputation" },
              { id: "wins", label: "Wins" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "7px 18px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  background: activeTab === tab.id ? "var(--accent)" : "transparent",
                  color: activeTab === tab.id ? "white" : "var(--muted)",
                  border: "none",
                  borderRadius: 7,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-body)"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="glass-panel" style={{ padding: "40px 32px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 40 }}>
            {/* 2nd */}
            <div style={{ textAlign: "center" }}>
              <div style={{ position: "relative", display: "inline-block", marginBottom: 12 }}>
                <Avatar initials={leaderboardData[1].initials} color={leaderboardData[1].color} size={60} />
                <span style={{ position: "absolute", bottom: -4, right: -4, fontSize: "1.1rem" }}>🥈</span>
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--fg)", marginBottom: 2 }}>{leaderboardData[1].name}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: 8 }}>{leaderboardData[1].user}</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--fg-light)" }}>
                {activeTab === "wins" ? `${leaderboardData[1].wins} wins` : `${leaderboardData[1].rep.toLocaleString()} REP`}
              </div>
              <div style={{ height: 100, width: 80, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px 8px 0 0", margin: "12px auto 0" }} />
            </div>
            {/* 1st */}
            <div style={{ textAlign: "center" }}>
              <div style={{ position: "relative", display: "inline-block", marginBottom: 12 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${leaderboardData[0].color}cc, ${leaderboardData[0].color}66)`, border: `3px solid ${leaderboardData[0].color}88`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "#fff", boxShadow: `0 0 24px ${leaderboardData[0].color}55` }}>
                  {leaderboardData[0].initials}
                </div>
                <span style={{ position: "absolute", bottom: -4, right: -4, fontSize: "1.2rem" }}>🥇</span>
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--fg)", marginBottom: 2 }}>{leaderboardData[0].name}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: 8 }}>{leaderboardData[0].user}</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>
                {activeTab === "wins" ? `${leaderboardData[0].wins} wins` : `${leaderboardData[0].rep.toLocaleString()} REP`}
              </div>
              <div style={{ height: 140, width: 80, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: "8px 8px 0 0", margin: "12px auto 0" }} />
            </div>
            {/* 3rd */}
            <div style={{ textAlign: "center" }}>
              <div style={{ position: "relative", display: "inline-block", marginBottom: 12 }}>
                <Avatar initials={leaderboardData[2].initials} color={leaderboardData[2].color} size={60} />
                <span style={{ position: "absolute", bottom: -4, right: -4, fontSize: "1.1rem" }}>🥉</span>
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--fg)", marginBottom: 2 }}>{leaderboardData[2].name}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: 8 }}>{leaderboardData[2].user}</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--fg-light)" }}>
                {activeTab === "wins" ? `${leaderboardData[2].wins} wins` : `${leaderboardData[2].rep.toLocaleString()} REP`}
              </div>
              <div style={{ height: 70, width: 80, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px 8px 0 0", margin: "12px auto 0" }} />
            </div>
          </div>
        </div>

        {/* Full Table */}
        <div className="glass-panel" style={{ padding: 0, overflow: "hidden" }}>
          <table className="dense-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>{activeTab === "wins" ? "Wins" : "Reputation"}</th>
                <th>Quality</th>
                <th>{activeTab === "wins" ? "REP" : "Wins"}</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((row) => (
                <tr key={row.rank} style={row.isYou ? {
                  background: "rgba(124,58,237,0.08)",
                  outline: "1px solid rgba(124,58,237,0.25)"
                } : undefined}>
                  <td style={{ fontWeight: 700, color: row.rank <= 3 ? "var(--accent)" : "var(--fg-light)" }}>
                    {rankMedal(row.rank)}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar initials={row.initials} color={row.color} size={28} />
                      <div>
                        <div style={{ fontWeight: 600, color: row.isYou ? "var(--accent)" : "var(--fg)", fontSize: "0.88rem" }}>
                          {row.name} {row.isYou && <span style={{ fontSize: "0.7rem", color: "#fff", marginLeft: 4 }}>(you)</span>}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{row.user}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, color: "var(--fg)" }}>
                    {activeTab === "wins" ? row.wins : row.rep.toLocaleString()}
                  </td>
                  <td style={{ color: "var(--fg-light)" }}>{row.quality}</td>
                  <td style={{ color: "var(--fg-light)" }}>
                    {activeTab === "wins" ? `${row.rep.toLocaleString()} REP` : row.wins}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }
      `}} />
    </div>
  )
}

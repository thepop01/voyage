"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

/* ─── Icons ────────────────────────────────────────────── */

const VerifiedIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#10b981"/>
  </svg>
)

const RepIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const WinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
)

const DiamondIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#3b82f6" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 9l10 13 10-13-10-7z" fill="#3b82f6"/>
    <path d="M12 2L2 9l10 13V2z" fill="#60a5fa"/>
    <path d="M12 2L7 9l5 13V2z" fill="#93c5fd"/>
  </svg>
)

const TrophyIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M19 5h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2H5a2 2 0 0 0-2 2v1a6 6 0 0 0 5.14 5.92L9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1l.86-7.08A6 6 0 0 0 21 8V7a2 2 0 0 0-2-2zM5 8V7h2v3.82A4 4 0 0 1 5 8zm14 0a4 4 0 0 1-2 2.82V7h2v1z"/>
  </svg>
)

/* ─── Data ─────────────────────────────────────────────── */

const announcements = [
  {
    id: 1, type: "WINNER", typeEmoji: "🏆", typeColor: "#f59e0b", typeBg: "rgba(245, 158, 11, 0.12)", typeBorder: "rgba(245, 158, 11, 0.3)",
    user: "@alpha_dev", name: "Alex Devlin", initials: "AD", avatarColor: "#7c3aed",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    message: "won the DeFi Protocol v2 campaign", prize: "$500 USDC",
    date: "June 14, 2026", rep: "15.8k", wins: "47",
    desc: "A visionary developer pushing the boundaries of decentralized finance protocols and smart contracts."
  },
  {
    id: 2, type: "GOAT", typeEmoji: "🌟", typeColor: "#c4b5fd", typeBg: "rgba(124, 58, 237, 0.15)", typeBorder: "rgba(139, 92, 246, 0.35)",
    user: "@crypto_king", name: "Kyrie Nakamura", initials: "KN", avatarColor: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    message: "became the all-time highest REP holder with", prize: "15,800 REP",
    date: "June 12, 2026", rep: "15.8k", wins: "32",
    desc: "An elite strategist dominating the leaderboards through high-quality campaign submissions."
  },
  {
    id: 3, type: "GIFT", typeEmoji: "🎁", typeColor: "#f472b6", typeBg: "rgba(244, 114, 182, 0.12)", typeBorder: "rgba(244, 114, 182, 0.3)",
    user: "@nft_whale", name: "Nadia Fontaine", initials: "NF", avatarColor: "#be185d",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    message: "received a legendary Solana Alpha NFT whitelist as a surprise", prize: "Whitelist Spot",
    date: "June 10, 2026", rep: "11.2k", wins: "18",
    desc: "A prominent NFT collector and community builder focused on digital art and utility."
  },
]

// Base leaderboard data
const rawData = [
  { rank: 1, user: "@alpha_dev",    name: "Jolie Joie",       image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", followers: "24,500", reward: 1000 },
  { rank: 2, user: "@crypto_king",  name: "Brian Ngo",        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150", followers: "18,200", reward: 800 },
  { rank: 3, user: "@web3_warrior", name: "David Do",         image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", followers: "15,400", reward: 500 },
  { rank: 4, user: "@chain_runner", name: "Henrietta O'Connell",image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", followers: "12,241", reward: 250 },
  { rank: 5, user: "@pixel_punk",   name: "Samantha Lee",     image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150", followers: "10,120", reward: 200 },
  { rank: 6, user: "@defi_ghost",   name: "Marcus Chen",      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", followers: "8,940", reward: 150 },
  { rank: 7, user: "@nft_whale",    name: "Nadia Fontaine",   image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", followers: "7,800", reward: 100 },
  { rank: 8, user: "@dao_maker",    name: "Dmitri Aoki",      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150", followers: "6,200", reward: 100 },
  { rank: 9, user: "@darrel",       name: "Darrel Bins",      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150", followers: "5,400", reward: 50, isYou: true },
  { rank: 10, user: "@meta_chad",   name: "Chad Johnson",     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", followers: "4,100", reward: 50 },
]

const tabConfig: Record<string, { data: any[], col1: string, format: (v: number) => string }> = {
  points:     { data: rawData.map(r => ({ ...r, value: 130000 - (r.rank * 10000) })), col1: "Point", format: (v) => v.toLocaleString() },
  earnings:   { data: rawData.map(r => ({ ...r, value: 30000 - (r.rank * 2500) })), col1: "Earned", format: (v) => `$${v.toLocaleString()}` },
  reputation: { data: rawData.map(r => ({ ...r, value: 16000 - (r.rank * 800) })), col1: "Point", format: (v) => v.toLocaleString() },
}

const activityFeed = [
  { id: 1, user: "@chain_runner", action: "completed an Engage task", time: "2m ago" },
  { id: 2, user: "@dao_maker", action: "entered Raffle #12", time: "5m ago" },
  { id: 3, user: "@pixel_punk", action: "earned 50 REP", time: "12m ago" },
  { id: 4, user: "@defi_ghost", action: "won 3rd place in UI Design", time: "18m ago" },
  { id: 5, user: "@web3_warrior", action: "claimed a daily reward", time: "24m ago" },
  { id: 6, user: "@alpha_dev", action: "reached level 40", time: "1h ago" },
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
  const [activeTab, setActiveTab]     = useState("points")
  const [timeframe, setTimeframe]     = useState("all_time")
  const [currentIdx, setCurrentIdx]   = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // auto-rotate announcements
  useEffect(() => {
    const t = setInterval(() => goTo((prev: number) => (prev + 1) % announcements.length), 6000)
    return () => clearInterval(t)
  }, [])

  function goTo(nextOrFn: number | ((p: number) => number)) {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIdx(nextOrFn)
      setIsAnimating(false)
    }, 200)
  }

  const ann = announcements[currentIdx]

  return (
    <div style={{ paddingBottom: 120 }}>
      {/* ── Page Header ── */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", padding: "4px 12px", borderRadius: 100, background: "var(--accent-dim)", border: "1px solid rgba(124,58,237,0.3)" }}>Live Stats</span>
        </div>
        <h1 style={{ fontSize: "2.8rem", marginBottom: 10, letterSpacing: "-0.02em" }}>
          Stats & Hall of Fame
        </h1>
        <p style={{ color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.8rem", margin: 0 }}>
          Community achievements, rankings & real-time activity
        </p>
      </div>

      {/* ── Two Column Layout ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
        
        {/* LEFT COLUMN: Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          
          {/* Announcement Card & Details */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg)" }}>
                Latest Highlights
              </span>
            </div>

            <div style={{ display: "flex", gap: 32, opacity: isAnimating ? 0 : 1, transform: isAnimating ? "translateY(4px)" : "translateY(0)", transition: "opacity 0.2s ease, transform 0.2s ease" }}>
              
              {/* Left: The Profile Card */}
              <div style={{ 
                width: 280, flexShrink: 0, background: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, overflow: "hidden",
                boxShadow: "0 24px 40px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column"
              }}>
                <div style={{ height: 260, position: "relative" }}>
                  <img src={ann.image} alt={ann.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  {/* Subtle gradient overlay at bottom of image */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, rgba(15,23,42,1), transparent)" }} />
                </div>
                
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <h3 style={{ margin: 0, fontSize: "1.3rem", color: "#fff", fontWeight: 700 }}>{ann.name}</h3>
                    <VerifiedIcon />
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.5, margin: "0 0 20px 0", flex: 1 }}>
                    {ann.desc}
                  </p>
                  
                  {/* Stats Row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--fg-light)", fontSize: "0.9rem", fontWeight: 600 }}>
                      <RepIcon /> {ann.rep}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--fg-light)", fontSize: "0.9rem", fontWeight: 600 }}>
                      <WinIcon /> {ann.wins}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Announcement Details */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", color: ann.typeColor, padding: "4px 12px", borderRadius: 100, background: ann.typeBg, border: `1px solid ${ann.typeBorder}` }}>
                    {ann.typeEmoji} {ann.type}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{ann.date}</span>
                </div>

                <p style={{ color: "var(--fg-light)", fontSize: "1.2rem", margin: "0 0 32px 0", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--fg)", fontWeight: 700 }}>{ann.name}</span> ({ann.user}) {ann.message} <span style={{ color: ann.typeColor, fontWeight: 700 }}>{ann.prize}</span>!
                </p>

                {/* Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => goTo((p: number) => (p - 1 + announcements.length) % announcements.length)} className="glass-icon" style={{ width: 44, height: 44, borderRadius: "50%", border: "none" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <button onClick={() => goTo((p: number) => (p + 1) % announcements.length)} className="glass-icon" style={{ width: 44, height: 44, borderRadius: "50%", border: "none" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                  
                  <Link 
                    href="/stats/hall-of-fame"
                    style={{ 
                      padding: "0 24px", height: 44, borderRadius: 22, 
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", 
                      color: "var(--fg)", fontWeight: 600, cursor: "pointer", textDecoration: "none",
                      display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                    onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  >
                    View Hall of Fame <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* 3D Leaderboard Section */}
          <div style={{ background: "#0b0c10", borderRadius: 24, padding: "32px 0 0 0", overflow: "hidden" }}>
            
            {/* Timeframe Filter */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 100, padding: 4, gap: 4 }}>
                {[
                  { id: "weekly", label: "Weekly" },
                  { id: "monthly", label: "Monthly" },
                  { id: "all_time", label: "All Time" },
                ].map(t => (
                  <button 
                    key={t.id} 
                    onClick={() => setTimeframe(t.id)}
                    style={{ 
                      padding: "8px 24px", borderRadius: 100, border: "none", fontSize: "0.85rem", fontWeight: 600,
                      background: timeframe === t.id ? "rgba(59, 130, 246, 0.2)" : "transparent",
                      color: timeframe === t.id ? "#fff" : "var(--muted)", cursor: "pointer", transition: "0.2s"
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Header Tabs inside the dark panel */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 4, padding: "4px", background: "rgba(255,255,255,0.04)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                {[
                  { id: "points",     label: "Points" },
                  { id: "earnings",   label: "Earned" },
                  { id: "reputation", label: "Reputation" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: "8px 24px", fontSize: "0.8rem", fontWeight: 600,
                      background: activeTab === tab.id ? "rgba(255,255,255,0.1)" : "transparent",
                      color: activeTab === tab.id ? "white" : "var(--muted)",
                      border: "none", borderRadius: 8, cursor: "pointer", transition: "all 0.2s"
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Podium Container */}
            <div style={{ 
              position: "relative", padding: "60px 24px 0 24px", 
              display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 16, 
              background: "radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, transparent 70%)" 
            }}>
              {(() => {
                const cfg = tabConfig[activeTab]
                const multiplier = timeframe === "weekly" ? 0.15 : timeframe === "monthly" ? 0.45 : 1;
                const dynamicData = cfg.data.map(row => ({
                  ...row,
                  value: Math.floor(row.value * multiplier),
                  reward: Math.floor(row.reward * multiplier)
                }));
                const top3 = dynamicData.slice(0, 3)
                const podiumOrder = [top3[1], top3[0], top3[2]] // 2nd, 1st, 3rd

                return podiumOrder.map((row, i) => {
                  if (!row) return null;
                  const isFirst = i === 1;
                  const isSecond = i === 0;
                  const height = isFirst ? 280 : isSecond ? 230 : 200;
                  const width = isFirst ? 260 : 230;
                  const trophyColor = isFirst ? "#fcd34d" : isSecond ? "#d1d5db" : "#b45309";
                  
                  return (
                    <div key={row.user} style={{ display: "flex", flexDirection: "column", alignItems: "center", width }}>
                      {/* Avatar & Name */}
                      <div style={{ marginBottom: 16, textAlign: "center" }}>
                        <img src={row.image} alt={row.name} style={{ width: 88, height: 88, borderRadius: 16, objectFit: "cover", boxShadow: "0 12px 24px rgba(0,0,0,0.4)" }} />
                        <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 12, color: "#fff" }}>{row.name}</div>
                      </div>

                      {/* Pedestal Block */}
                      <div style={{
                        height, width: "100%", 
                        background: "linear-gradient(180deg, #1e2436 0%, #0f111a 100%)",
                        borderTop: "2px solid #3b4261",
                        borderLeft: "1px solid rgba(255,255,255,0.02)",
                        borderRight: "1px solid rgba(255,255,255,0.02)",
                        borderRadius: "8px 8px 0 0",
                        boxShadow: "0 -5px 20px rgba(0,0,0,0.3)",
                        display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px"
                      }}>
                        {/* Trophy */}
                        <div style={{ background: trophyColor, width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: `0 4px 12px ${trophyColor}44` }}>
                          <TrophyIcon color={isFirst ? "#000" : isSecond ? "#000" : "#fff"} />
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                          <DiamondIcon /> {cfg.format(row.value)}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{cfg.col1}</div>
                      </div>
                    </div>
                  )
                })
              })()}
            </div>

            {/* User Rank Banner */}
            <div style={{ 
              background: "#161822", borderRadius: 100, padding: "14px 28px", 
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8, 
              margin: "24px auto 40px auto", width: "fit-content", 
              fontSize: "0.85rem", color: "var(--muted)", border: "1px solid rgba(255,255,255,0.05)" 
            }}>
              You earned <DiamondIcon /> <span style={{ color: "white", fontWeight: 700 }}>5</span> today and are ranked <span style={{ color: "white", fontWeight: 700 }}>{rawData.find(r => r.isYou)?.rank || "-"}</span> out of <span style={{ color: "white", fontWeight: 700 }}>{rawData.length} users</span>
            </div>

            {/* Custom Dark Table */}
            <div style={{ width: "100%", padding: "0 24px 32px 24px" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "60px 2.5fr 1fr 1fr 100px", padding: "0 24px 12px 24px", fontSize: "0.8rem", color: "var(--muted)", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 16 }}>
                <div>Rank</div>
                <div>User name</div>
                <div>Followers</div>
                <div>{tabConfig[activeTab].col1}</div>
                <div style={{ textAlign: "right" }}>Reward</div>
              </div>

              {/* Rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {(() => {
                  const cfg = tabConfig[activeTab]
                  const multiplier = timeframe === "weekly" ? 0.15 : timeframe === "monthly" ? 0.45 : 1;
                  const dynamicData = cfg.data.map(row => ({
                    ...row,
                    value: Math.floor(row.value * multiplier),
                    reward: Math.floor(row.reward * multiplier)
                  }));
                  
                  return dynamicData.slice(3).map((row) => (
                    <div key={row.rank} style={{ 
                      display: "grid", gridTemplateColumns: "60px 2.5fr 1fr 1fr 100px", 
                      alignItems: "center", padding: "12px 24px", 
                      background: row.isYou ? "rgba(59, 130, 246, 0.1)" : "#161822", 
                      borderRadius: 12, border: row.isYou ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent" 
                    }}>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>{row.rank}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img src={row.image} alt={row.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />
                      <div>
                        <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff", marginBottom: 2 }}>{row.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{row.user}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 600 }}>{row.followers}</div>
                    <div style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                      <DiamondIcon /> {tabConfig[activeTab].format(row.value)}
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.05)", padding: "6px 12px", borderRadius: 100, fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>
                        <DiamondIcon /> {row.reward}
                      </div>
                    </div>
                  </div>
                ))
                })()}
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "sticky", top: 24 }}>
          
          {/* Your Rank Callout */}
          <div className="glass-panel" style={{ padding: 24, background: "linear-gradient(180deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.7) 100%)", borderTop: "2px solid var(--accent)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <Avatar initials="👤" color="#7c3aed" size={56} />
              <div>
                <h3 style={{ margin: "0 0 4px 0", fontSize: "1.1rem" }}>Your Rank</h3>
                <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.3rem" }}>Top 8%</div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: 8, color: "var(--fg-light)" }}>
                <span>3,120 REP</span>
                <span style={{ color: "var(--muted)" }}>4,000 REP needed</span>
              </div>
              <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: "78%", height: "100%", background: "var(--accent)", borderRadius: 4 }} />
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)", margin: "12px 0 0 0" }}>
                You are 880 REP away from reaching <strong style={{ color: "var(--fg-light)" }}>Elite Rank</strong>. Keep engaging!
              </p>
            </div>
            
            <button className="primary-button" style={{ width: "100%", padding: "10px", fontSize: "0.85rem" }}>
              Earn More REP
            </button>
          </div>

          {/* Live Activity Feed */}
          <div className="glass-panel" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <h3 style={{ margin: 0, fontSize: "1rem", color: "var(--fg)" }}>Live Activity</h3>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxHeight: 400, overflowY: "auto", paddingRight: 8 }}>
              {activityFeed.map((item, i) => (
                <div key={item.id} style={{ display: "flex", gap: 12, opacity: 1 - (i * 0.15) }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? "var(--success)" : "rgba(255,255,255,0.2)", marginTop: 6, flexShrink: 0, boxShadow: i === 0 ? "0 0 8px var(--success)" : undefined }} />
                  <div>
                    <div style={{ fontSize: "0.85rem", color: "var(--fg-light)", lineHeight: 1.4 }}>
                      <strong style={{ color: "var(--fg)" }}>{item.user}</strong> {item.action}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: 4 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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

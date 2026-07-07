"use client"
import { useState } from "react"
import { useWallets, ChainType } from "@/lib/contexts/WalletContext"

type Raffle = {
  id: number
  title: string
  description: string
  prize: string
  winners: number
  entries: number
  progress: number
  drawsIn: string
  entered: boolean
  urgent: boolean
  chain: ChainType | null
  twitterLink: string
}

const raffles: Raffle[] = [
  {
    id: 1,
    title: "DeFi Protocol v2 Launch",
    description: "Random draw from all verified participants. Must complete at least 3 tasks to qualify.",
    prize: "$5,000 USDT",
    winners: 10,
    entries: 1284,
    progress: 72,
    drawsIn: "2 days",
    entered: true,
    urgent: false,
    chain: "Ethereum",
    twitterLink: "https://x.com/defiprotocol"
  },
  {
    id: 2,
    title: "NFT Marketplace Beta",
    description: "Exclusive NFT drop for early testers. Complete the bug bounty to enter.",
    prize: "3 Rare NFTs",
    winners: 3,
    entries: 892,
    progress: 45,
    drawsIn: "5 days",
    entered: true,
    urgent: false,
    chain: "Ethereum",
    twitterLink: "https://x.com/nftmarket"
  },
  {
    id: 3,
    title: "L2 Bridge Stress Test",
    description: "High-value raffle for security researchers. Requires verified completion of bridge audit tasks.",
    prize: "$10,000 USDC",
    winners: 5,
    entries: 2341,
    progress: 88,
    drawsIn: "12 hours",
    entered: false,
    urgent: true,
    chain: "Polygon",
    twitterLink: "https://x.com/l2bridge"
  },
  {
    id: 4,
    title: "Governance DAO Access",
    description: "Win an exclusive governance seat with voting power. Must hold 1,000+ REP.",
    prize: "DAO Seat + 5K REP",
    winners: 1,
    entries: 567,
    progress: 30,
    drawsIn: "9 days",
    entered: true,
    urgent: false,
    chain: null,
    twitterLink: "https://x.com/govdao"
  },
  {
    id: 5,
    title: "Alpha Node Access",
    description: "Early access to the alpha node network. Complete 5 validation tasks to qualify.",
    prize: "Node License + 2K REP",
    winners: 20,
    entries: 450,
    progress: 20,
    drawsIn: "14 days",
    entered: false,
    urgent: false,
    chain: "Solana",
    twitterLink: "https://x.com/alphanode"
  },
  {
    id: 6,
    title: "Protocol Genesis Event",
    description: "The flagship raffle for genesis contributors. Top contributors get priority slots.",
    prize: "$25,000 USDT",
    winners: 2,
    entries: 3100,
    progress: 95,
    drawsIn: "6 hours",
    entered: false,
    urgent: true,
    chain: "Ethereum",
    twitterLink: "https://x.com/genesis"
  },
]

const pastWins = [
  { raffle: "Solana Validator Challenge", prize: "$800 USDT", date: "Sep 15, 2023", status: "Claimed" },
  { raffle: "Cross-Chain Hackathon", prize: "1,500 REP", date: "Aug 22, 2023", status: "Claimed" },
]

function TicketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 21h8M12 17v4M12 17a7 7 0 007-7V5H5v5a7 7 0 007 7z" />
      <path d="M5 7H2a5 5 0 005 5M19 7h3a5 5 0 01-5 5" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

export default function RafflePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  const { wallets, getDefaultWallet } = useWallets()
  const [enteredRaffles, setEnteredRaffles] = useState<Record<number, number>>(
    Object.fromEntries(raffles.filter(r => r.entered).map(r => [r.id, 100]))
  )
  const [enteredWallets, setEnteredWallets] = useState<Record<number, string>>({})
  const [totalRep, setTotalRep] = useState<number>(2500)
  
  const [selectedRaffleId, setSelectedRaffleId] = useState<number | null>(null)
  const [repInput, setRepInput] = useState<string>("")
  const [selectedWalletId, setSelectedWalletId] = useState<string>("")

  const handleOpenModal = (id: number) => {
    setSelectedRaffleId(id)
    setRepInput("")
    
    const raffle = raffles.find(r => r.id === id)
    if (raffle && raffle.chain) {
      if (enteredWallets[id]) {
        setSelectedWalletId(enteredWallets[id])
      } else {
        const defaultWallet = getDefaultWallet(raffle.chain)
        const chainWallets = wallets.filter(w => w.chain === raffle.chain)
        setSelectedWalletId(defaultWallet?.id || (chainWallets.length > 0 ? chainWallets[0].id : ""))
      }
    } else {
      setSelectedWalletId("")
    }
  }

  const handleConfirmEnter = () => {
    if (!selectedRaffleId) return
    const raffle = raffles.find(r => r.id === selectedRaffleId)
    
    if (raffle?.chain && !selectedWalletId) {
      alert("Please select a wallet to enter this raffle.")
      return
    }

    const repToSpend = parseInt(repInput, 10)
    const isUpdatingWalletOnly = isNaN(repToSpend) || repToSpend <= 0;

    if (isUpdatingWalletOnly) {
      // Must be already entered to just update wallet
      if (!enteredRaffles[selectedRaffleId]) return
      if (raffle?.chain) {
        setEnteredWallets(prev => ({ ...prev, [selectedRaffleId]: selectedWalletId }))
        alert("Wallet updated successfully!")
      }
      setSelectedRaffleId(null)
      setRepInput("")
      return
    }

    if (repToSpend > totalRep) return
    
    setEnteredRaffles(prev => ({
      ...prev,
      [selectedRaffleId]: (prev[selectedRaffleId] || 0) + repToSpend
    }))
    if (raffle?.chain) {
      setEnteredWallets(prev => ({ ...prev, [selectedRaffleId]: selectedWalletId }))
    }
    setTotalRep(prev => prev - repToSpend)
    setSelectedRaffleId(null)
    setRepInput("")
  }
  
  const totalEntries = Object.values(enteredRaffles).reduce((acc, val) => acc + val, 0)
  const selectedRaffle = raffles.find(r => r.id === selectedRaffleId)
  const availableWallets = selectedRaffle?.chain ? wallets.filter(w => w.chain === selectedRaffle.chain) : []

  return (
    <div style={{ position: "relative" }}>

      {/* ─── HERO SECTION ─── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 24,
          marginBottom: 48,
          padding: "64px 48px",
          background: "linear-gradient(135deg, rgba(30,20,80,0.35) 0%, rgba(20,15,60,0.5) 50%, rgba(124,58,237,0.12) 100%)",
          border: "1px solid rgba(124,58,237,0.18)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          borderRadius: 24,
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px",
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: 100,
            marginBottom: 24,
          }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
              Voyage Raffle System
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 20,
            fontFamily: "var(--font-display)",
            color: "var(--fg)",
          }}>
            Win Exclusive<br />Protocol Rewards
          </h1>

          <p style={{
            fontSize: "1.05rem",
            color: "var(--fg-light)",
            lineHeight: 1.7,
            marginBottom: 36,
            maxWidth: 520,
          }}>
            Earn raffle entries by completing campaign tasks and contributing to the ecosystem. The more you build, the better your chances.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { icon: <TrophyIcon />, value: totalRep.toLocaleString(), label: "Available REP" },
              { icon: <TicketIcon />, value: totalEntries.toLocaleString(), label: "Total Tickets" },
              { icon: <UsersIcon />, value: "2", label: "Past Wins" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 20px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--accent)",
                  flexShrink: 0,
                }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, lineHeight: 1, color: "var(--fg)" }}>{stat.value}</div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", marginTop: 3 }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── OPEN RAFFLES ─── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 6 }}>Live Now</div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, fontFamily: "var(--font-display)", margin: 0, color: "var(--fg)" }}>Open Raffles</h2>
        </div>
        <div style={{
          padding: "6px 16px",
          background: "rgba(124,58,237,0.08)",
          border: "1px solid rgba(124,58,237,0.2)",
          borderRadius: 100,
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "var(--accent)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "blink 1.5s ease-in-out infinite" }} />
          {raffles.length} Active
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 20,
        marginBottom: 56,
      }}>
        {raffles.map((raffle) => {
          const ticketsBought = enteredRaffles[raffle.id]
          const isEntered = !!ticketsBought
          const isHovered = hoveredCard === raffle.id

          return (
            <div
              key={raffle.id}
              onMouseEnter={() => setHoveredCard(raffle.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                position: "relative",
                borderRadius: 20,
                padding: "24px",
                background: isHovered
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.03)",
                border: isHovered
                  ? "1px solid rgba(124,58,237,0.25)"
                  : "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                transition: "all 0.25s ease",
                transform: isHovered ? "translateY(-4px)" : "none",
                boxShadow: isHovered
                  ? "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.15)"
                  : "0 4px 24px rgba(0,0,0,0.3)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
              }}
            >
              {/* Urgent ribbon */}
              {raffle.urgent && (
                <div style={{
                  position: "absolute", top: 16, right: -24,
                  background: "rgba(239,68,68,0.85)",
                  color: "#fff",
                  fontSize: "0.6rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "4px 32px",
                  transform: "rotate(45deg) translate(8px, -8px)",
                  zIndex: 10
                }}>
                  Ending Soon
                </div>
              )}

              {/* Subtle hover glow */}
              {isHovered && (
                <div style={{
                  position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
                  background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 70%)",
                }} />
              )}

              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, position: "relative", zIndex: 1 }}>
                <div style={{ flex: 1, paddingRight: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <a href={raffle.twitterLink} target="_blank" rel="noreferrer" style={{ color: "var(--muted)", textDecoration: "none", display: "flex", alignItems: "center" }}
                       onMouseEnter={e => e.currentTarget.style.color = "var(--fg)"}
                       onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>
                      <XIcon />
                    </a>
                    {raffle.chain && (
                      <span style={{ fontSize: "0.65rem", padding: "2px 8px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 100, color: "var(--fg-light)", fontWeight: 600 }}>
                        {raffle.chain}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, lineHeight: 1.3, fontFamily: "var(--font-display)", color: "var(--fg)" }}>{raffle.title}</h3>
                </div>

                {isEntered ? (
                  <div style={{
                    padding: "5px 12px",
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    borderRadius: 100,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    flexShrink: 0,
                  }}>
                    ✓ {ticketsBought} Tickets
                  </div>
                ) : (
                  <div style={{
                    padding: "5px 12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 100,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    flexShrink: 0,
                  }}>
                    Open
                  </div>
                )}
              </div>

              <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: 20, lineHeight: 1.6, position: "relative", zIndex: 1, flex: 1 }}>{raffle.description}</p>

              <div style={{ marginTop: "auto" }}>
                {/* Prize display */}
                <div style={{
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative", zIndex: 1,
                }}>
                  <div>
                    <div style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 2 }}>Prize Pool</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--fg)" }}>{raffle.prize}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 2 }}>Winners</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--fg)" }}>{raffle.winners}</div>
                  </div>
                </div>

                {/* Progress */}
                <div style={{ marginBottom: 16, position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontWeight: 500 }}>
                      {raffle.entries.toLocaleString()} entries
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontWeight: 500 }}>
                      {raffle.progress}% full
                    </span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 100, height: 5, overflow: "hidden" }}>
                    <div style={{
                      width: `${raffle.progress}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, rgba(124,58,237,0.6), #7c3aed)",
                      borderRadius: 100,
                      transition: "width 0.8s ease",
                    }} />
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, color: raffle.urgent ? "rgba(239,68,68,0.8)" : "var(--muted)", fontSize: "0.72rem", fontWeight: 600 }}>
                    <ClockIcon />
                    Draws in {raffle.drawsIn}
                  </div>

                  <button
                    onClick={() => handleOpenModal(raffle.id)}
                    style={{
                      padding: "8px 20px",
                      background: "rgba(124,58,237,0.12)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      borderRadius: 10,
                      color: "var(--accent)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      letterSpacing: "0.04em",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.background = "rgba(124,58,237,0.2)"
                      el.style.transform = "scale(1.03)"
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.background = "rgba(124,58,237,0.12)"
                      el.style.transform = "scale(1)"
                    }}
                  >
                    {isEntered ? "Buy More →" : "Enter Raffle →"}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── PAST WINS ─── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ color: "var(--muted)", display: "flex" }}><TrophyIcon /></div>
        <div>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>History</div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, fontFamily: "var(--font-display)", margin: 0, color: "var(--fg)" }}>Your Past Wins</h2>
        </div>
      </div>

      <div style={{
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {["Raffle", "Prize Won", "Draw Date", "Status"].map((h) => (
                <th key={h} style={{
                  padding: "14px 20px",
                  textAlign: "left",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--muted)",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pastWins.map((w, i) => (
              <tr
                key={i}
                style={{ borderBottom: i < pastWins.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "16px 20px", fontWeight: 600, fontSize: "0.9rem", color: "var(--fg)" }}>{w.raffle}</td>
                <td style={{ padding: "16px 20px", color: "var(--accent)", fontWeight: 700 }}>{w.prize}</td>
                <td style={{ padding: "16px 20px", color: "var(--fg-light)", fontSize: "0.85rem" }}>{w.date}</td>
                <td style={{ padding: "16px 20px" }}>
                  <span style={{
                    padding: "4px 12px",
                    background: "rgba(124,58,237,0.08)",
                    border: "1px solid rgba(124,58,237,0.2)",
                    borderRadius: 100,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}>
                    ✓ {w.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── MODAL ─── */}
      {selectedRaffleId && selectedRaffle && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}>
          <div style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: 32,
            width: "100%",
            maxWidth: 420,
            boxShadow: "var(--glass-shadow-deep)",
          }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 8, fontFamily: "var(--font-display)", color: "var(--fg)" }}>
              Enter {selectedRaffle.title}
            </h3>
            
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: 24, lineHeight: 1.5 }}>
              1 REP = 1 Ticket. You have <strong style={{ color: "var(--accent)" }}>{totalRep.toLocaleString()} REP</strong> available.
            </p>

            {/* Wallet Selection if Chain is required */}
            {selectedRaffle.chain && (
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Select {selectedRaffle.chain} Wallet
                </label>
                {availableWallets.length > 0 ? (
                  <select
                    value={selectedWalletId}
                    onChange={e => setSelectedWalletId(e.target.value)}
                    className="glass-input"
                  >
                    {availableWallets.map(w => (
                      <option key={w.id} value={w.id} style={{ color: "var(--bg)" }}>
                        {w.address} {w.isDefault ? "(Default)" : ""}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div style={{ padding: "12px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, color: "rgba(255,200,200,0.9)", fontSize: "0.85rem" }}>
                    You don&apos;t have any {selectedRaffle.chain} wallets linked. Go to your Profile to add one first.
                  </div>
                )}
              </div>
            )}

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <span>REP to spend</span>
                {enteredRaffles[selectedRaffle.id] && selectedRaffle.chain && (
                  <span style={{ color: "var(--accent)", fontSize: "0.65rem" }}>(Leave empty to just update wallet)</span>
                )}
              </label>
              <input
                type="number"
                min="1"
                max={totalRep}
                value={repInput}
                onChange={e => setRepInput(e.target.value)}
                placeholder="0"
                className="glass-input"
              />
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setSelectedRaffleId(null)}
                style={{
                  flex: 1, padding: "12px", borderRadius: 10,
                  background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
                  color: "var(--fg)", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmEnter}
                disabled={!!(selectedRaffle.chain && availableWallets.length === 0)}
                style={{
                  flex: 1, padding: "12px", borderRadius: 10,
                  background: (selectedRaffle.chain && availableWallets.length === 0) ? "var(--muted)" : "var(--accent)", 
                  border: "none",
                  color: "#fff", fontSize: "0.85rem", fontWeight: 700, 
                  cursor: (selectedRaffle.chain && availableWallets.length === 0) ? "not-allowed" : "pointer",
                }}
              >
                {enteredRaffles[selectedRaffle.id] && (!repInput || parseInt(repInput) <= 0) && selectedRaffle.chain 
                  ? "Update Wallet" 
                  : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyframe styles */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}

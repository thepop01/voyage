"use client"
import { useState, useMemo } from "react"
import { useWallets } from "@/lib/contexts/WalletContext"
import Link from "next/link"

/* ── Types ───────────────────────────────────────── */
type TimeRange = "24h" | "7d" | "30d" | "all"
type MarketCategory = "All" | "Politics" | "Crypto" | "Sports" | "World Events"
type TradeStatus = "OPEN" | "WON" | "LOST" | "REDEEMED"
type TradeSide = "Yes" | "No"

interface Trade {
  id: string
  market: string
  category: MarketCategory
  side: TradeSide
  amount: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPct: number
  status: TradeStatus
  timestamp: string
  resolution?: string
  marketDescription?: string
  partialHistory?: { action: string; amount: number; price: number; time: string }[]
}

/* ── Icons ───────────────────────────────────────── */
function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
  )
}
function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  )
}
function BellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  )
}
function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  )
}
function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

/* ── Mock trade generator ────────────────────────── */
function generateTrades(walletAddress: string): Trade[] {
  let hash = 0
  for (let i = 0; i < walletAddress.length; i++) {
    hash = walletAddress.charCodeAt(i) + ((hash << 5) - hash)
  }

  const MARKETS: { market: string; category: MarketCategory; description: string; resolution: string }[] = [
    { market: "Trump Wins 2024 Election", category: "Politics", description: "Will Donald Trump win the 2024 US Presidential Election?", resolution: "Resolves Yes if Trump is inaugurated as the 47th President." },
    { market: "Fed Cuts Rates Before July", category: "World Events", description: "Will the Federal Reserve cut interest rates before July 2025?", resolution: "Resolves based on FOMC announcement." },
    { market: "Bitcoin Above $100K by EOY", category: "Crypto", description: "Will Bitcoin trade above $100,000 at any point before Dec 31?", resolution: "Resolves Yes if any major exchange shows BTC > $100K." },
    { market: "Lakers Win NBA Championship", category: "Sports", description: "Will the Los Angeles Lakers win the 2025 NBA Championship?", resolution: "Resolves based on NBA Finals result." },
    { market: "ETH ETF Approved", category: "Crypto", description: "Will a spot Ethereum ETF be approved by the SEC?", resolution: "Resolves Yes upon SEC approval of any spot ETH ETF." },
    { market: "Ukraine Ceasefire by 2025", category: "World Events", description: "Will a formal ceasefire be declared in the Russia-Ukraine conflict?", resolution: "Resolves based on official diplomatic declarations." },
    { market: "Solana Flips BNB Market Cap", category: "Crypto", description: "Will Solana's market cap exceed BNB before year end?", resolution: "Resolves based on CoinGecko data." },
    { market: "Super Bowl LVIII Over 47.5", category: "Sports", description: "Will the total score of Super Bowl LVIII exceed 47.5 points?", resolution: "Resolves based on final score." },
  ]

  const STATUSES: TradeStatus[] = ["OPEN", "OPEN", "WON", "LOST", "REDEEMED", "OPEN"]
  const SIDES: TradeSide[] = ["Yes", "No"]
  const TIMES = ["2m ago", "18m ago", "1h ago", "3h ago", "6h ago", "12h ago", "1d ago", "2d ago", "4d ago", "1w ago"]

  const count = (Math.abs(hash) % 6) + 4 // 4-9 trades per wallet
  const trades: Trade[] = []

  for (let i = 0; i < count; i++) {
    const seed = Math.abs(hash + i * 137)
    const mkt = MARKETS[seed % MARKETS.length]
    const side = SIDES[seed % 2]
    const status = STATUSES[seed % STATUSES.length]
    const entryPrice = ((seed % 80) + 10) / 100
    const currentPrice = status === "WON" ? 1.0 : status === "LOST" ? 0.0 : ((seed % 60) + 20) / 100
    const amount = ((seed % 50) + 5) * 100
    const shares = Math.round(amount / entryPrice)
    const pnl = status === "OPEN"
      ? Math.round((currentPrice - entryPrice) * shares)
      : status === "WON"
        ? Math.round((1 - entryPrice) * shares)
        : -Math.round(entryPrice * shares)

    trades.push({
      id: `t-${walletAddress.slice(0, 6)}-${i}`,
      market: mkt.market,
      category: mkt.category,
      side,
      amount,
      entryPrice,
      currentPrice,
      pnl,
      pnlPct: entryPrice > 0 ? Math.round(((currentPrice - entryPrice) / entryPrice) * 100) : 0,
      status,
      timestamp: TIMES[i % TIMES.length],
      resolution: mkt.resolution,
      marketDescription: mkt.description,
      partialHistory: [
        { action: "Buy", amount: Math.round(amount * 0.6), price: entryPrice, time: TIMES[Math.min(i + 2, TIMES.length - 1)] },
        { action: "Buy", amount: Math.round(amount * 0.4), price: entryPrice + 0.03, time: TIMES[Math.min(i + 1, TIMES.length - 1)] },
      ],
    })
  }

  return trades
}

/* ── Helpers ──────────────────────────────────────── */
const CATEGORIES: MarketCategory[] = ["All", "Politics", "Crypto", "Sports", "World Events"]
const TIME_RANGES: { label: string; value: TimeRange }[] = [
  { label: "24h", value: "24h" },
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
  { label: "All Time", value: "all" },
]

/* ── Page ────────────────────────────────────────── */
export default function PolymarketTrackerPage() {
  const { wallets } = useWallets()
  const [selectedWalletId, setSelectedWalletId] = useState<string | "all">("all")
  const [timeRange, setTimeRange] = useState<TimeRange>("30d")
  const [categoryFilter, setCategoryFilter] = useState<MarketCategory>("All")
  const [expandedTradeId, setExpandedTradeId] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [alertNewPosition, setAlertNewPosition] = useState(true)
  const [alertResolution, setAlertResolution] = useState(true)
  const [alertThreshold, setAlertThreshold] = useState("1000")

  // Build trade data for all wallets
  const allTradesMap = useMemo(() => {
    const map: Record<string, Trade[]> = {}
    wallets.forEach(w => {
      map[w.id] = generateTrades(w.address)
    })
    return map
  }, [wallets])

  // Filter trades
  const filteredTrades = useMemo(() => {
    let trades: (Trade & { walletAddress: string; walletChain: string })[] = []

    const walletIds = selectedWalletId === "all" ? wallets.map(w => w.id) : [selectedWalletId]
    walletIds.forEach(wId => {
      const wallet = wallets.find(w => w.id === wId)
      if (!wallet || !allTradesMap[wId]) return
      allTradesMap[wId].forEach(t => {
        trades.push({ ...t, walletAddress: wallet.address, walletChain: wallet.chain })
      })
    })

    if (categoryFilter !== "All") {
      trades = trades.filter(t => t.category === categoryFilter)
    }

    return trades
  }, [wallets, allTradesMap, selectedWalletId, categoryFilter])

  // Summary stats
  const stats = useMemo(() => {
    const open = filteredTrades.filter(t => t.status === "OPEN")
    const totalPnl = filteredTrades.reduce((s, t) => s + t.pnl, 0)
    const totalVolume = filteredTrades.reduce((s, t) => s + t.amount, 0)
    const resolved = filteredTrades.filter(t => t.status === "WON" || t.status === "LOST")
    const winRate = resolved.length > 0
      ? Math.round((resolved.filter(t => t.status === "WON").length / resolved.length) * 100)
      : 0

    return {
      totalPnl,
      openCount: open.length,
      winRate,
      totalVolume,
    }
  }, [filteredTrades])

  // Top performers
  const topPerformers = useMemo(() => {
    return [...filteredTrades]
      .filter(t => t.status === "WON" || t.status === "REDEEMED")
      .sort((a, b) => b.pnl - a.pnl)
      .slice(0, 3)
  }, [filteredTrades])

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, { count: number; pnl: number }> = {}
    filteredTrades.forEach(t => {
      if (!map[t.category]) map[t.category] = { count: 0, pnl: 0 }
      map[t.category].count++
      map[t.category].pnl += t.pnl
    })
    return Object.entries(map).sort((a, b) => b[1].count - a[1].count)
  }, [filteredTrades])

  // Streak
  const currentStreak = useMemo(() => {
    const resolved = filteredTrades.filter(t => t.status === "WON" || t.status === "LOST")
    if (resolved.length === 0) return { type: "none" as const, count: 0 }
    const lastStatus = resolved[0].status
    let count = 0
    for (const t of resolved) {
      if (t.status === lastStatus) count++
      else break
    }
    return { type: lastStatus as "WON" | "LOST", count }
  }, [filteredTrades])

  const statusColor = (s: TradeStatus) => {
    if (s === "OPEN") return { color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(167,139,250,0.3)" }
    if (s === "WON" || s === "REDEEMED") return { color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)" }
    return { color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(239,68,68,0.3)" }
  }

  return (
    <div style={{ position: "relative" }}>

      {/* ─── Back link ──────────────────────────────────── */}
      <Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600, marginBottom: 20, transition: "color 0.15s" }}
        onMouseEnter={e => { e.currentTarget.style.color = "var(--fg)" }}
        onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)" }}
      >
        <ArrowLeftIcon /> Back to Tools
      </Link>

      {/* ─── Page Header ───────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.6rem",
          }}></div>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>Polymarket Tracker</h1>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--muted)" }}>Full trade history and real-time position monitoring</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              padding: "10px 18px", borderRadius: 12,
              background: showSettings ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${showSettings ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.1)"}`,
              color: showSettings ? "#fff" : "var(--fg-light)",
              fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
            }}
          >
            <SettingsIcon /> Settings
          </button>
        </div>
      </div>

      {/* ─── Settings Panel ────────────────────────────── */}
      {showSettings && (
        <div style={{
          borderRadius: 16, padding: 24, marginBottom: 24,
          background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)",
          animation: "fadeSlideIn 0.2s ease",
        }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--fg)" }}>
            <span style={{ marginRight: 8 }}><BellIcon /></span> Notification Settings
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--fg-light)" }}>Alert when a tracked wallet opens a new position</span>
              <div onClick={() => setAlertNewPosition(!alertNewPosition)} style={{
                width: 40, height: 22, borderRadius: 100, cursor: "pointer",
                background: alertNewPosition ? "#fff" : "rgba(255,255,255,0.1)",
                border: `1px solid ${alertNewPosition ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.15)"}`,
                position: "relative", transition: "all 0.2s",
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%", background: "#E6F2DD",
                  position: "absolute", top: 2, left: alertNewPosition ? 20 : 2,
                  transition: "left 0.2s",
                }} />
              </div>
            </label>
            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--fg-light)" }}>Alert when a market resolves</span>
              <div onClick={() => setAlertResolution(!alertResolution)} style={{
                width: 40, height: 22, borderRadius: 100, cursor: "pointer",
                background: alertResolution ? "#fff" : "rgba(255,255,255,0.1)",
                border: `1px solid ${alertResolution ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.15)"}`,
                position: "relative", transition: "all 0.2s",
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%", background: "#E6F2DD",
                  position: "absolute", top: 2, left: alertResolution ? 20 : 2,
                  transition: "left 0.2s",
                }} />
              </div>
            </label>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--fg-light)" }}>Alert when position size exceeds</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>$</span>
                <input
                  type="number"
                  value={alertThreshold}
                  onChange={e => setAlertThreshold(e.target.value)}
                  style={{
                    width: 80, padding: "6px 10px", borderRadius: 8,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                    color: "var(--fg)", fontSize: "0.85rem", outline: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Top Bar Filters ───────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        {/* Wallet selector */}
        <div style={{ position: "relative" }}>
          <select
            value={selectedWalletId}
            onChange={e => setSelectedWalletId(e.target.value)}
            style={{
              padding: "8px 32px 8px 14px", borderRadius: 10,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--fg)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              appearance: "none", outline: "none",
            }}
          >
            <option value="all" style={{ color: "#111" }}>All Wallets ({wallets.length})</option>
            {wallets.map(w => (
              <option key={w.id} value={w.id} style={{ color: "#111" }}>
                {w.address.slice(0, 6)}...{w.address.slice(-4)} ({w.chain})
              </option>
            ))}
          </select>
          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--muted)" }}><ChevronDownIcon /></span>
        </div>

        {/* Time range */}
        <div style={{
          display: "flex", gap: 2, padding: 3,
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
        }}>
          {TIME_RANGES.map(t => (
            <button
              key={t.value}
              onClick={() => setTimeRange(t.value)}
              style={{
                padding: "6px 12px", borderRadius: 8, border: "none",
                background: timeRange === t.value ? "rgba(124,58,237,0.2)" : "transparent",
                color: timeRange === t.value ? "#fff" : "var(--muted)",
                fontSize: "0.72rem", fontWeight: 700, cursor: "pointer",
                transition: "all 0.15s",
              }}
            >{t.label}</button>
          ))}
        </div>

        {/* Category filter */}
        <div style={{
          display: "flex", gap: 2, padding: 3,
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: "6px 12px", borderRadius: 8, border: "none",
                background: categoryFilter === cat ? "rgba(124,58,237,0.2)" : "transparent",
                color: categoryFilter === cat ? "#fff" : "var(--muted)",
                fontSize: "0.72rem", fontWeight: 700, cursor: "pointer",
                transition: "all 0.15s",
              }}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* ─── Summary Stats Row ─────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Total P&L", value: `${stats.totalPnl >= 0 ? "+" : ""}$${Math.abs(stats.totalPnl).toLocaleString()}`, color: stats.totalPnl >= 0 ? "#fff" : "#fff" },
          { label: "Open Positions", value: stats.openCount.toString(), color: "#fff" },
          { label: "Win Rate", value: `${stats.winRate}%`, color: stats.winRate >= 60 ? "#fff" : "#fff" },
          { label: "Total Volume", value: `$${stats.totalVolume.toLocaleString()}`, color: "#fff" },
        ].map((s, i) => (
          <div key={i} style={{
            padding: "18px 20px", borderRadius: 16,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ─── Main Two-Column ───────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28, alignItems: "start" }}>

        {/* LEFT: Trade Feed */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>
              Trade History
            </div>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{filteredTrades.length} trades</span>
          </div>

          {wallets.length === 0 ? (
            <div style={{
              padding: 40, textAlign: "center", borderRadius: 16,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
            }}>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>No wallets connected.</p>
              <Link href="/profile" style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>Add wallets in Profile →</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filteredTrades.map(trade => {
                const sc = statusColor(trade.status)
                const isExpanded = expandedTradeId === trade.id
                return (
                  <div key={trade.id}>
                    <div
                      onClick={() => setExpandedTradeId(isExpanded ? null : trade.id)}
                      style={{
                        borderRadius: isExpanded ? "14px 14px 0 0" : 14,
                        padding: "16px 20px",
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${isExpanded ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.07)"}`,
                        borderBottom: isExpanded ? "none" : undefined,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)" }}
                      onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)" }}
                    >
                      {/* Top row */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-display)" }}>{trade.market}</span>
                          <span style={{
                            padding: "2px 8px", borderRadius: 100,
                            fontSize: "0.6rem", fontWeight: 700,
                            background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color,
                          }}>{trade.status}</span>
                        </div>
                        <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{trade.timestamp}</span>
                      </div>

                      {/* Stats row */}
                      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        <div>
                          <span style={{
                            padding: "3px 10px", borderRadius: 8,
                            background: trade.side === "Yes" ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.08)",
                            border: `1px solid ${trade.side === "Yes" ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.15)"}`,
                            color: trade.side === "Yes" ? "#fff" : "#fff",
                            fontSize: "0.72rem", fontWeight: 700,
                          }}>{trade.side}</span>
                        </div>
                        <div style={{ fontSize: "0.78rem" }}>
                          <span style={{ color: "var(--muted)" }}>Amount: </span>
                          <span style={{ fontWeight: 700 }}>${trade.amount.toLocaleString()}</span>
                        </div>
                        <div style={{ fontSize: "0.78rem" }}>
                          <span style={{ color: "var(--muted)" }}>Entry: </span>
                          <span style={{ fontWeight: 600 }}>{(trade.entryPrice * 100).toFixed(0)}¢</span>
                        </div>
                        {trade.status === "OPEN" && (
                          <div style={{ fontSize: "0.78rem" }}>
                            <span style={{ color: "var(--muted)" }}>Current: </span>
                            <span style={{ fontWeight: 600 }}>{(trade.currentPrice * 100).toFixed(0)}¢</span>
                          </div>
                        )}
                        <div style={{ marginLeft: "auto", fontSize: "0.88rem", fontWeight: 800, fontFamily: "var(--font-display)", color: trade.pnl >= 0 ? "#fff" : "#fff" }}>
                          {trade.pnl >= 0 ? "+" : ""}${Math.abs(trade.pnl).toLocaleString()}
                        </div>
                      </div>

                      {/* Wallet tag (when showing all wallets) */}
                      {selectedWalletId === "all" && (
                        <div style={{ marginTop: 8, fontSize: "0.65rem", color: "var(--muted)" }}>
                          Wallet: {trade.walletAddress.slice(0, 6)}...{trade.walletAddress.slice(-4)} · {trade.walletChain}
                        </div>
                      )}
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div style={{
                        padding: "16px 20px",
                        background: "rgba(0,0,0,0.15)",
                        border: "1px solid rgba(124,58,237,0.25)",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: "0 0 14px 14px",
                        animation: "fadeSlideIn 0.15s ease",
                      }}>
                        {/* Market info */}
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 6 }}>Market Details</div>
                          <p style={{ fontSize: "0.82rem", color: "var(--fg-light)", lineHeight: 1.5, margin: "0 0 6px" }}>{trade.marketDescription}</p>
                          <p style={{ fontSize: "0.75rem", color: "var(--muted)", margin: 0 }}>Resolution: {trade.resolution}</p>
                        </div>

                        {/* Position history table */}
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                            <ExternalIcon />
                            <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff" }}>Position History</span>
                          </div>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
                            <thead>
                              <tr>
                                {["Action", "Amount", "Price", "Time"].map(h => (
                                  <th key={h} style={{ padding: "6px 10px", textAlign: "left", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {trade.partialHistory?.map((h, i) => (
                                <tr key={i}>
                                  <td style={{ padding: "8px 10px" }}>
                                    <span style={{ padding: "2px 8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(167,139,250,0.25)", borderRadius: 100, fontSize: "0.65rem", fontWeight: 700, color: "#fff" }}>{h.action}</span>
                                  </td>
                                  <td style={{ padding: "8px 10px", fontWeight: 700 }}>${h.amount.toLocaleString()}</td>
                                  <td style={{ padding: "8px 10px", color: "var(--fg-light)" }}>{(h.price * 100).toFixed(0)}¢</td>
                                  <td style={{ padding: "8px 10px", color: "var(--muted)" }}>{h.time}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* View on Polymarket link */}
                        <a href="https://polymarket.com" target="_blank" rel="noreferrer" style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          padding: "8px 16px", borderRadius: 10,
                          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                          color: "#fff", fontSize: "0.78rem", fontWeight: 700,
                          textDecoration: "none", transition: "all 0.15s",
                        }}>
                          <ExternalIcon /> View on Polymarket
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* RIGHT: Analytics Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Category Breakdown */}
          <div style={{
            borderRadius: 16, padding: 20,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 4 }}>Analytics</div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: 16 }}> Category Breakdown</h3>
            {categoryBreakdown.length === 0 ? (
              <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>No data yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {categoryBreakdown.map(([cat, data]) => (
                  <div key={cat} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{cat}</span>
                      <span style={{ fontSize: "0.68rem", color: "var(--muted)", marginLeft: 6 }}>{data.count} trades</span>
                    </div>
                    <span style={{
                      fontSize: "0.82rem", fontWeight: 700, fontFamily: "var(--font-display)",
                      color: data.pnl >= 0 ? "#fff" : "#fff",
                    }}>
                      {data.pnl >= 0 ? "+" : ""}${Math.abs(data.pnl).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Win/Loss Streak */}
          <div style={{
            borderRadius: 16, padding: 20,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 4 }}>Momentum</div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: 16 }}> Current Streak</h3>
            {currentStreak.type === "none" ? (
              <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>No resolved trades yet.</p>
            ) : (
              <div style={{
                padding: "14px 16px", borderRadius: 12,
                background: currentStreak.type === "WON" ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
                border: `1px solid ${currentStreak.type === "WON" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.15)"}`,
                textAlign: "center",
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: currentStreak.type === "WON" ? "#fff" : "#fff" }}>
                  {currentStreak.count}
                </div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: currentStreak.type === "WON" ? "#fff" : "#fff" }}>
                  {currentStreak.type === "WON" ? "Win" : "Loss"} Streak
                </div>
              </div>
            )}
          </div>

          {/* Top Performers */}
          <div style={{
            borderRadius: 16, padding: 20,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 4 }}>Best Trades</div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: 16 }}> Top Performers</h3>
            {topPerformers.length === 0 ? (
              <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>No winning trades yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {topPerformers.map((t, i) => (
                  <div key={t.id} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 0",
                    borderBottom: i < topPerformers.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.market}</div>
                      <div style={{ fontSize: "0.65rem", color: "var(--muted)" }}>{t.side} · ${t.amount.toLocaleString()}</div>
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.95rem", color: "#fff", flexShrink: 0 }}>
                      +${t.pnl.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Risk Metrics */}
          <div style={{
            borderRadius: 16, padding: 20,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 4 }}>Risk</div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: 16 }}>⚖️ Risk Metrics</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Avg Position Size", value: filteredTrades.length > 0 ? `$${Math.round(filteredTrades.reduce((s, t) => s + t.amount, 0) / filteredTrades.length).toLocaleString()}` : "—" },
                { label: "Largest Position", value: filteredTrades.length > 0 ? `$${Math.max(...filteredTrades.map(t => t.amount)).toLocaleString()}` : "—" },
                { label: "Total Trades", value: filteredTrades.length.toString() },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{m.label}</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--fg)" }}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

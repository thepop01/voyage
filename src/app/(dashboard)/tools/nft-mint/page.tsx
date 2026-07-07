"use client"
import { useState, useMemo, useEffect } from "react"
import { useWallets } from "@/lib/contexts/WalletContext"
import Link from "next/link"

/* ── Types ───────────────────────────────────────── */
type Chain = "Ethereum" | "Solana" | "Polygon"
type StatusFilter = "All" | "Whitelisted" | "Not Selected" | "Pending"
type ViewMode = "by-mint" | "by-wallet"

interface Mint {
  id: string
  name: string
  chain: Chain
  mintDate: Date
  mintPrice: string
  supply: string
  image: string
  twitter: string
  floorPrice?: string
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
function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

/* ── Mock Mints ──────────────────────────────────── */
const MINTS: Mint[] = [
  { id: "m1", name: "Azuki Elementals", chain: "Ethereum", mintDate: new Date(Date.now() + 4 * 3600 * 1000), mintPrice: "0.5 ETH", supply: "10,000", image: "🌊", twitter: "https://x.com/Azuki", floorPrice: "2.1 ETH" },
  { id: "m2", name: "Pudgy Penguins 2", chain: "Ethereum", mintDate: new Date(Date.now() + 26 * 3600 * 1000), mintPrice: "0.8 ETH", supply: "8,888", image: "🐧", twitter: "https://x.com/pudaborgs", floorPrice: "11.2 ETH" },
  { id: "m3", name: "DeGods Genesis", chain: "Solana", mintDate: new Date(Date.now() + 50 * 3600 * 1000), mintPrice: "3 SOL", supply: "5,000", image: "", twitter: "https://x.com/DeGodsNFT" },
  { id: "m4", name: "Lil Pudgys Drop", chain: "Ethereum", mintDate: new Date(Date.now() + 72 * 3600 * 1000), mintPrice: "0.2 ETH", supply: "22,222", image: "🧊", twitter: "https://x.com/lilpudgys", floorPrice: "0.9 ETH" },
  { id: "m5", name: "y00ts Polygon", chain: "Polygon", mintDate: new Date(Date.now() + 96 * 3600 * 1000), mintPrice: "80 MATIC", supply: "15,000", image: "🎨", twitter: "https://x.com/y00tsNFT" },
  { id: "m6", name: "Mad Lads S2", chain: "Solana", mintDate: new Date(Date.now() + 120 * 3600 * 1000), mintPrice: "5 SOL", supply: "7,777", image: "😎", twitter: "https://x.com/MadLadsNFT" },
]

// Past mints for historical section
const PAST_MINTS = [
  { name: "Doodles 2", chain: "Ethereum" as Chain, mintPrice: "0.1 ETH", floorNow: "0.35 ETH", roi: "+250%", date: "2 weeks ago" },
  { name: "Claynosaurz", chain: "Solana" as Chain, mintPrice: "2 SOL", floorNow: "8.4 SOL", roi: "+320%", date: "3 weeks ago" },
  { name: "Beanz", chain: "Ethereum" as Chain, mintPrice: "Free", floorNow: "0.15 ETH", roi: "∞", date: "1 month ago" },
]

/* ── WL check (deterministic mock) ───────────────── */
function isWhitelisted(walletAddress: string, mintId: string): "wl" | "not" | "pending" {
  let hash = 0
  const combined = walletAddress + mintId
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash)
  }
  const val = Math.abs(hash) % 10
  if (val < 3) return "wl"
  if (val < 8) return "not"
  return "pending"
}

/* ── Countdown hook ──────────────────────────────── */
function useCountdown(targetDate: Date): string {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const diff = targetDate.getTime() - now.getTime()
  if (diff <= 0) return "LIVE NOW"

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  if (hours >= 24) {
    const days = Math.floor(hours / 24)
    return `${days}d ${hours % 24}h`
  }
  return `${hours}h ${minutes}m ${seconds}s`
}

function CountdownDisplay({ date }: { date: Date }) {
  const text = useCountdown(date)
  const isLive = text === "LIVE NOW"
  return (
    <span style={{
      fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.82rem",
      color: isLive ? "#fff" : "#fff",
      animation: isLive ? "blink 1s ease-in-out infinite" : undefined,
    }}>{text}</span>
  )
}

/* ── Helpers ──────────────────────────────────────── */
const CHAIN_COLORS: Record<Chain, { color: string; bg: string; border: string }> = {
  Ethereum: { color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)" },
  Solana:   { color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)" },
  Polygon:  { color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)" },
}

const STATUS_FILTERS: StatusFilter[] = ["All", "Whitelisted", "Not Selected", "Pending"]

/* ── Page ────────────────────────────────────────── */
export default function NftMintTrackerPage() {
  const { wallets } = useWallets()
  const [chainFilter, setChainFilter] = useState<Chain | "All">("All")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All")
  const [viewMode, setViewMode] = useState<ViewMode>("by-mint")
  const [expandedMintId, setExpandedMintId] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [alertWlConfirmed, setAlertWlConfirmed] = useState(true)
  const [alertBeforeMint, setAlertBeforeMint] = useState(true)
  const [alertHours, setAlertHours] = useState("2")

  const filteredMints = useMemo(() => {
    return MINTS.filter(m => chainFilter === "All" || m.chain === chainFilter)
  }, [chainFilter])

  // Build WL matrix
  const wlMatrix = useMemo(() => {
    const matrix: Record<string, Record<string, "wl" | "not" | "pending">> = {}
    filteredMints.forEach(mint => {
      matrix[mint.id] = {}
      wallets.forEach(w => {
        matrix[mint.id][w.id] = isWhitelisted(w.address, mint.id)
      })
    })
    return matrix
  }, [filteredMints, wallets])

  // Summary stats
  const stats = useMemo(() => {
    let totalWl = 0
    let totalChecked = 0
    filteredMints.forEach(mint => {
      wallets.forEach(w => {
        const status = wlMatrix[mint.id]?.[w.id]
        if (status) totalChecked++
        if (status === "wl") totalWl++
      })
    })
    return { totalWl, totalChecked, mintCount: filteredMints.length }
  }, [filteredMints, wallets, wlMatrix])

  return (
    <div style={{ position: "relative" }}>

      {/* ─── Back ──────────────────────────────────────── */}
      <Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600, marginBottom: 20, transition: "color 0.15s" }}
        onMouseEnter={e => { e.currentTarget.style.color = "var(--fg)" }}
        onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)" }}
      >
        <ArrowLeftIcon /> Back to Tools
      </Link>

      {/* ─── Header ────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "rgba(255,255,255,0.15)", border: "1px solid rgba(16,185,129,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.6rem",
          }}>🖼️</div>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>NFT Mint WL Tracker</h1>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--muted)" }}>Checking your wallets against upcoming mint whitelists</p>
          </div>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          style={{
            padding: "10px 18px", borderRadius: 12,
            background: showSettings ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${showSettings ? "rgba(16,185,129,0.35)" : "rgba(255,255,255,0.1)"}`,
            color: showSettings ? "#fff" : "var(--fg-light)",
            fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
          }}
        >
          <SettingsIcon /> Settings
        </button>
      </div>

      {/* ─── Settings Panel ────────────────────────────── */}
      {showSettings && (
        <div style={{
          borderRadius: 16, padding: 24, marginBottom: 24,
          background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)",
          animation: "fadeSlideIn 0.2s ease",
        }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--fg)" }}>
            <span style={{ marginRight: 8 }}><BellIcon /></span> Notification Settings
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--fg-light)" }}>Alert when WL status changes for any wallet</span>
              <div onClick={() => setAlertWlConfirmed(!alertWlConfirmed)} style={{
                width: 40, height: 22, borderRadius: 100, cursor: "pointer",
                background: alertWlConfirmed ? "#fff" : "rgba(255,255,255,0.1)",
                border: `1px solid ${alertWlConfirmed ? "rgba(16,185,129,0.6)" : "rgba(255,255,255,0.15)"}`,
                position: "relative", transition: "all 0.2s",
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%", background: "#FBEFEF",
                  position: "absolute", top: 2, left: alertWlConfirmed ? 20 : 2,
                  transition: "left 0.2s",
                }} />
              </div>
            </label>
            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--fg-light)" }}>Alert before mint goes live</span>
              <div onClick={() => setAlertBeforeMint(!alertBeforeMint)} style={{
                width: 40, height: 22, borderRadius: 100, cursor: "pointer",
                background: alertBeforeMint ? "#fff" : "rgba(255,255,255,0.1)",
                border: `1px solid ${alertBeforeMint ? "rgba(16,185,129,0.6)" : "rgba(255,255,255,0.15)"}`,
                position: "relative", transition: "all 0.2s",
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%", background: "#FBEFEF",
                  position: "absolute", top: 2, left: alertBeforeMint ? 20 : 2,
                  transition: "left 0.2s",
                }} />
              </div>
            </label>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--fg-light)" }}>Alert hours before mint</span>
              <input
                type="number"
                value={alertHours}
                onChange={e => setAlertHours(e.target.value)}
                style={{
                  width: 60, padding: "6px 10px", borderRadius: 8,
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--fg)", fontSize: "0.85rem", outline: "none", textAlign: "center",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── Filters ───────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        {/* Chain filter */}
        <div style={{
          display: "flex", gap: 2, padding: 3,
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
        }}>
          {(["All", "Ethereum", "Solana", "Polygon"] as const).map(chain => (
            <button
              key={chain}
              onClick={() => setChainFilter(chain)}
              style={{
                padding: "6px 12px", borderRadius: 8, border: "none",
                background: chainFilter === chain ? "rgba(16,185,129,0.15)" : "transparent",
                color: chainFilter === chain ? "#fff" : "var(--muted)",
                fontSize: "0.72rem", fontWeight: 700, cursor: "pointer",
                transition: "all 0.15s",
              }}
            >{chain}</button>
          ))}
        </div>

        {/* Status filter */}
        <div style={{
          display: "flex", gap: 2, padding: 3,
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
        }}>
          {STATUS_FILTERS.map(sf => (
            <button
              key={sf}
              onClick={() => setStatusFilter(sf)}
              style={{
                padding: "6px 12px", borderRadius: 8, border: "none",
                background: statusFilter === sf ? "rgba(16,185,129,0.15)" : "transparent",
                color: statusFilter === sf ? "#fff" : "var(--muted)",
                fontSize: "0.72rem", fontWeight: 700, cursor: "pointer",
                transition: "all 0.15s",
              }}
            >{sf}</button>
          ))}
        </div>

        {/* View toggle */}
        <div style={{
          display: "flex", gap: 2, padding: 3,
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10, marginLeft: "auto",
        }}>
          {([{ label: "By Mint", value: "by-mint" as ViewMode }, { label: "By Wallet", value: "by-wallet" as ViewMode }]).map(v => (
            <button
              key={v.value}
              onClick={() => setViewMode(v.value)}
              style={{
                padding: "6px 12px", borderRadius: 8, border: "none",
                background: viewMode === v.value ? "rgba(16,185,129,0.15)" : "transparent",
                color: viewMode === v.value ? "#fff" : "var(--muted)",
                fontSize: "0.72rem", fontWeight: 700, cursor: "pointer",
                transition: "all 0.15s",
              }}
            >{v.label}</button>
          ))}
        </div>
      </div>

      {/* ─── Summary Stats ─────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Upcoming Mints", value: stats.mintCount.toString(), color: "#fff" },
          { label: "Wallets Checked", value: wallets.length.toString(), color: "#fff" },
          { label: "WL Hits", value: stats.totalWl.toString(), color: "#fff" },
          { label: "Checks Run", value: stats.totalChecked.toString(), color: "#fff" },
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

      {/* ─── Upcoming Mints Scroll ─────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>Upcoming Mints</div>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>

        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8 }}>
          {filteredMints.map(mint => {
            const cc = CHAIN_COLORS[mint.chain]
            const wlCount = wallets.filter(w => wlMatrix[mint.id]?.[w.id] === "wl").length
            const isExpanded = expandedMintId === mint.id
            return (
              <div key={mint.id} style={{ minWidth: 240, flexShrink: 0 }}>
                <div
                  onClick={() => setExpandedMintId(isExpanded ? null : mint.id)}
                  style={{
                    borderRadius: 16, padding: "18px 20px",
                    background: isExpanded ? `${cc.bg}` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isExpanded ? cc.border : "rgba(255,255,255,0.08)"}`,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: "1.5rem" }}>{mint.image}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-display)" }}>{mint.name}</div>
                      <span style={{
                        padding: "2px 6px", borderRadius: 6,
                        background: cc.bg, border: `1px solid ${cc.border}`,
                        fontSize: "0.58rem", fontWeight: 700, color: cc.color,
                      }}>{mint.chain}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>Countdown</span>
                    <CountdownDisplay date={mint.mintDate} />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.72rem" }}>
                    <span style={{ color: "var(--muted)" }}>Price</span>
                    <span style={{ fontWeight: 700 }}>{mint.mintPrice}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.72rem" }}>
                    <span style={{ color: "var(--muted)" }}>Supply</span>
                    <span style={{ fontWeight: 600 }}>{mint.supply}</span>
                  </div>

                  <div style={{
                    padding: "6px 10px", borderRadius: 8, textAlign: "center",
                    background: wlCount > 0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${wlCount > 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)"}`,
                    fontSize: "0.72rem", fontWeight: 700,
                    color: wlCount > 0 ? "#fff" : "var(--muted)",
                  }}>
                    {wlCount > 0 ? `✓ ${wlCount}/${wallets.length} wallets WL'd` : `0/${wallets.length} whitelisted`}
                  </div>

                  <a href={mint.twitter} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    marginTop: 10, padding: "6px 0", borderRadius: 8,
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--muted)", fontSize: "0.7rem", fontWeight: 600, textDecoration: "none",
                    transition: "color 0.15s",
                  }}>
                    <XIcon /> Project Twitter
                  </a>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div style={{
                    marginTop: -1, padding: "14px 18px",
                    background: "rgba(0,0,0,0.15)", border: `1px solid ${cc.border}`, borderTop: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "0 0 14px 14px",
                    animation: "fadeSlideIn 0.15s ease",
                  }}>
                    {mint.floorPrice && (
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.75rem" }}>
                        <span style={{ color: "var(--muted)" }}>Existing Floor</span>
                        <span style={{ fontWeight: 700, color: "#fff" }}>{mint.floorPrice}</span>
                      </div>
                    )}
                    <div style={{ fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.5, marginTop: 8 }}>
                      ⓘ This bot checks whitelist status every 15 minutes. Results are based on on-chain snapshot data.
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── WL STATUS MATRIX ──────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>WL Status Matrix</div>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
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
          <div style={{
            borderRadius: 16, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "sticky", left: 0, background: "rgba(9,9,26,0.95)", zIndex: 1 }}>Wallet</th>
                    {filteredMints.map(m => (
                      <th key={m.id} style={{ padding: "12px 14px", textAlign: "center", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--muted)", borderBottom: "1px solid rgba(255,255,255,0.07)", minWidth: 120 }}>
                        <span style={{ fontSize: "0.9rem" }}>{m.image}</span><br />{m.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {wallets.map((w, wi) => (
                    <tr key={w.id} style={{ borderBottom: wi < wallets.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <td style={{
                        padding: "12px 16px",
                        fontWeight: 700, fontFamily: "var(--font-display)", fontSize: "0.78rem",
                        color: "var(--fg-light)",
                        position: "sticky", left: 0, background: "rgba(9,9,26,0.95)", zIndex: 1,
                        borderRight: "1px solid rgba(255,255,255,0.05)",
                      }}>
                        {w.address.slice(0, 6)}...{w.address.slice(-4)}
                        <div style={{ fontSize: "0.58rem", color: "var(--muted)", fontWeight: 600 }}>{w.chain}</div>
                      </td>
                      {filteredMints.map(m => {
                        const status = wlMatrix[m.id]?.[w.id] || "not"

                        // Apply status filter
                        if (statusFilter === "Whitelisted" && status !== "wl") return <td key={m.id} style={{ padding: "12px 14px", textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>—</td>
                        if (statusFilter === "Not Selected" && status !== "not") return <td key={m.id} style={{ padding: "12px 14px", textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>—</td>
                        if (statusFilter === "Pending" && status !== "pending") return <td key={m.id} style={{ padding: "12px 14px", textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>—</td>

                        return (
                          <td key={m.id} style={{ padding: "12px 14px", textAlign: "center" }}>
                            {status === "wl" ? (
                              <span style={{
                                padding: "4px 10px", borderRadius: 8,
                                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(16,185,129,0.3)",
                                color: "#fff", fontSize: "0.68rem", fontWeight: 800,
                              }}>✓ WL</span>
                            ) : status === "pending" ? (
                              <span style={{
                                padding: "4px 10px", borderRadius: 8,
                                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(167,139,250,0.25)",
                                color: "#fff", fontSize: "0.68rem", fontWeight: 700,
                              }}>⏳ Pending</span>
                            ) : (
                              <span style={{
                                padding: "4px 10px", borderRadius: 8,
                                background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)",
                                color: "#fff", fontSize: "0.68rem", fontWeight: 700,
                                opacity: 0.7,
                              }}>✗</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ─── Historical Results ─────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>Past Mints</div>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {PAST_MINTS.map((pm, i) => {
            const cc = CHAIN_COLORS[pm.chain]
            return (
              <div key={i} style={{
                borderRadius: 14, padding: "16px 18px",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontWeight: 700, fontSize: "0.88rem", fontFamily: "var(--font-display)" }}>{pm.name}</span>
                  <span style={{
                    padding: "2px 6px", borderRadius: 6,
                    background: cc.bg, border: `1px solid ${cc.border}`,
                    fontSize: "0.58rem", fontWeight: 700, color: cc.color,
                  }}>{pm.chain}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.75rem" }}>
                  <span style={{ color: "var(--muted)" }}>Mint Price</span>
                  <span style={{ fontWeight: 600 }}>{pm.mintPrice}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.75rem" }}>
                  <span style={{ color: "var(--muted)" }}>Floor Now</span>
                  <span style={{ fontWeight: 700, color: "#fff" }}>{pm.floorNow}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.75rem" }}>
                  <span style={{ color: "var(--muted)" }}>ROI</span>
                  <span style={{ fontWeight: 800, fontFamily: "var(--font-display)", color: "#fff" }}>{pm.roi}</span>
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--muted)", marginTop: 6 }}>{pm.date}</div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}

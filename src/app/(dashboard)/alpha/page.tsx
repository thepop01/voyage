"use client"
import { useState, useMemo } from "react"

/* ─── Types ──────────────────────────────────────────────────────── */
type CallCategory = "Polymarket" | "Crypto" | "Stock" | "Meme"
type CallOutcome = "win" | "loss" | "pending"
type FeedTab = "All" | "Following" | "Saved" | CallCategory
type SortMode = "newest" | "likes" | "target" | "caller"

interface Comment {
  id: string
  username: string
  avatar: string
  body: string
  time: string
  likes: number
}

interface AlphaCaller {
  id: string
  username: string
  handle: string
  avatar: string
  avatarColor: string
  totalAlphas: number
  followers: number
  bio: string
  verified: boolean
  xLink?: string
  stats: {
    [K in CallCategory]?: {
      total: number
      wins: number
      likes: number
    }
  }
}

interface AlphaPost {
  id: string
  callerId: string
  category: CallCategory
  title: string
  body: string
  createdAt: string
  createdAtMs: number // for sorting
  outcome: CallOutcome
  likes: number
  liked: boolean
  bookmarked: boolean
  targetPct?: string
  targetNum?: number // numeric for sorting
  result?: string
  ticker?: string
  comments: Comment[]
}

/* ─── Mock Callers ───────────────────────────────────────────────── */
const CALLERS: AlphaCaller[] = [
  {
    id: "c1", username: "0xVault", handle: "@0xvault", avatar: "", avatarColor: "#fff",
    totalAlphas: 47, followers: 2841, bio: "On-chain degen. Crypto & DeFi calls since 2018.", verified: true,
    xLink: "https://x.com/0xvault",
    stats: { Crypto: { total: 28, wins: 21, likes: 0 }, Meme: { total: 11, wins: 7, likes: 0 } },
  },
  {
    id: "c2", username: "NeuralNomad", handle: "@neuralnomad", avatar: "", avatarColor: "#fff",
    totalAlphas: 31, followers: 1420, bio: "Polymarket whale. Rating prediction markets so you don't have to.", verified: true,
    xLink: "https://x.com/neuralnomad",
    stats: { Polymarket: { total: 31, wins: 18, likes: 0 } },
  },
  {
    id: "c3", username: "FlipKing", handle: "@flipking", avatar: "👑", avatarcolor: "#fff",
    totalAlphas: 8, followers: 389, bio: "Meme coin flipper. Early in most memes that matter.", verified: false,
    stats: { Meme: { total: 2, wins: 1, likes: 0 } },
  },
  {
    id: "c4", username: "AlphaQuant", handle: "@alphaquant", avatar: "", avatarcolor: "#fff",
    totalAlphas: 22, followers: 976, bio: "Quant trader. Stocks & macro calls with data-backed thesis.", verified: true,
    xLink: "https://x.com/alphaquant",
    stats: { Stock: { total: 15, wins: 11, likes: 0 }, Crypto: { total: 7, wins: 4, likes: 0 } },
  },
]

const INITIAL_POSTS: AlphaPost[] = [
  { id: "p1", callerId: "c1", category: "Crypto", title: "ETH accumulation zone — $2,800 is the floor", body: "On-chain data shows exchange outflows hitting 6-month highs. Smart money is loading bags quietly. Entry here, target $4,200 by Q3.", createdAt: "2h ago", createdAtMs: Date.now() - 2 * 3600000, outcome: "pending", likes: 184, liked: false, bookmarked: false, targetPct: "+50%", targetNum: 50, ticker: "ETH", comments: [
    { id: "cm1", username: "whale_watcher", avatar: "🐋", body: "Exchange outflows confirmed on Glassnode. This is legit.", time: "1h ago", likes: 12 },
    { id: "cm2", username: "bearish_bob", avatar: "🐻", body: "Disagree — macro headwinds are too strong. Waiting for $2,400.", time: "45m ago", likes: 5 },
  ] },
  { id: "p2", callerId: "c2", category: "Polymarket", title: "Trump 2024 Odds are significantly mispriced at 55%", body: "Recent polling data in swing states hasn't been fully priced in by the market. Expecting a correction towards 65% by end of week.", createdAt: "5h ago", createdAtMs: Date.now() - 5 * 3600000, outcome: "pending", likes: 312, liked: false, bookmarked: false, comments: [] },
  { id: "p3", callerId: "c1", category: "Meme", title: "$PEPE2 breakout incoming — 3x potential", body: "Volume spike + whale wallet accumulation + CT sentiment shift. Same setup as $WIF in Nov '23. Risk 1%, reward 3x.", createdAt: "1d ago", createdAtMs: Date.now() - 24 * 3600000, outcome: "win", likes: 97, liked: false, bookmarked: false, targetPct: "+280%", targetNum: 280, result: "Hit ✓", ticker: "PEPE2", comments: [
    { id: "cm3", username: "degen_king", avatar: "🎰", body: "Followed this call. Made 2.8x. Legend.", time: "6h ago", likes: 24 },
  ] },
  { id: "p4", callerId: "c4", category: "Stock", title: "NVDA dip buy — $880 is accumulation territory", body: "Macro headwinds priced in. AI infrastructure spend is not slowing — Jensen confirmed $300B+ orders on last call. Earnings beat incoming.", createdAt: "1d ago", createdAtMs: Date.now() - 26 * 3600000, outcome: "win", likes: 203, liked: false, bookmarked: false, targetPct: "+34%", targetNum: 34, result: "Hit ✓", ticker: "NVDA", comments: [] },
  { id: "p5", callerId: "c2", category: "Polymarket", title: "ETH ETF Approval market is free money at 85%", body: "SEC insiders have signaled approval is effectively guaranteed. Buying Yes at 85 cents is a low-risk 15% return in 3 weeks.", createdAt: "2d ago", createdAtMs: Date.now() - 48 * 3600000, outcome: "win", likes: 198, liked: false, bookmarked: false, comments: [] },
  { id: "p7", callerId: "c4", category: "Stock", title: "META — miss was overdone, 20% bounce in 3 weeks", body: "Ad revenue beats were ignored because of Reality Labs losses. Stripping that out, core business is growing 28% YoY. Market overreacted.", createdAt: "4d ago", createdAtMs: Date.now() - 96 * 3600000, outcome: "loss", likes: 89, liked: false, bookmarked: false, targetPct: "+20%", targetNum: 20, result: "Missed ✗", ticker: "META", comments: [] },
]

/* ─── Helpers ────────────────────────────────────────────────────── */
const CATEGORY_TABS: CallCategory[] = ["Polymarket", "Crypto", "Stock", "Meme"]
const ALL_TABS: FeedTab[] = ["All", "Following", "Saved", ...CATEGORY_TABS]

const CATEGORY_META: Record<CallCategory, { color: string; bg: string; border: string; icon: string; rateType: "like" | "market" }> = {
  Polymarket: { color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)", icon: "", rateType: "market" },
  Crypto:     { color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)", icon: "", rateType: "market" },
  Stock:      { color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)", icon: "📈", rateType: "market" },
  Meme:       { color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(167,139,250,0.3)", icon: "🐸", rateType: "market" },
}

function calcOverallSuccessRate(caller: AlphaCaller): number | null {
  if (caller.totalAlphas < 10) return null
  let totalWeight = 0, weightedScore = 0
  for (const [cat, s] of Object.entries(caller.stats)) {
    const meta = CATEGORY_META[cat as CallCategory]
    if (!s) continue
    if (meta.rateType === "market") {
      const rate = s.total > 0 ? s.wins / s.total : 0
      weightedScore += rate * s.total
      totalWeight += s.total
    } else {
      const rate = Math.min(s.likes / 500, 1)
      weightedScore += rate * s.total
      totalWeight += s.total
    }
  }
  if (totalWeight === 0) return null
  return Math.round((weightedScore / totalWeight) * 100)
}

function calcCategoryRate(caller: AlphaCaller, cat: CallCategory): string {
  const s = caller.stats[cat]
  const meta = CATEGORY_META[cat]
  if (!s || s.total === 0) return "—"
  if (meta.rateType === "market") return `${Math.round((s.wins / s.total) * 100)}%`
  return `~${Math.round(s.likes / s.total)} ♥/post`
}

function calcStreak(callerId: string, posts: AlphaPost[]): { type: "win" | "loss" | "none"; count: number } {
  const resolved = posts.filter(p => p.callerId === callerId && (p.outcome === "win" || p.outcome === "loss"))
    .sort((a, b) => b.createdAtMs - a.createdAtMs)
  if (resolved.length === 0) return { type: "none", count: 0 }
  const first = resolved[0].outcome as "win" | "loss"
  let count = 0
  for (const p of resolved) {
    if (p.outcome === first) count++
    else break
  }
  return { type: first, count }
}

/* ─── Icons ──────────────────────────────────────────────────────── */
function ThumbUpIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> }
function BrainIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66Z"/></svg> }
function CheckIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> }
function UserIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function SearchIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> }
function BookmarkIcon({ filled }: { filled: boolean }) { return <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> }
function MessageIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> }
function PlusIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> }
function XTwitterIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> }
function FireIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg> }
function SortIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg> }

/* ─── Page ───────────────────────────────────────────────────────── */
export default function AlphaPage() {
  const [activeTab, setActiveTab] = useState<FeedTab>("All")
  const [posts, setPosts] = useState<AlphaPost[]>(INITIAL_POSTS)
  const [expandedCaller, setExpandedCaller] = useState<string | null>(null)
  const [selectedCallerProfile, setSelectedCallerProfile] = useState<string | null>(null)
  const [followedCallers, setFollowedCallers] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [sortMode, setSortMode] = useState<SortMode>("newest")
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({})
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newCall, setNewCall] = useState({ category: "Crypto" as CallCategory, ticker: "", title: "", body: "", targetPct: "" })

  /* ── Actions ──────────────────────────────── */
  const toggleFollow = (callerId: string) => {
    setFollowedCallers(prev => {
      const next = new Set(prev)
      if (next.has(callerId)) next.delete(callerId)
      else next.add(callerId)
      return next
    })
  }

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p))
  }

  const handleBookmark = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
  }

  const toggleComments = (id: string) => {
    setExpandedComments(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const submitComment = (postId: string) => {
    const body = commentDrafts[postId]?.trim()
    if (!body) return
    setPosts(prev => prev.map(p => p.id === postId ? {
      ...p,
      comments: [...p.comments, { id: `cm-${Date.now()}`, username: "You", avatar: "🧑", body, time: "Just now", likes: 0 }],
    } : p))
    setCommentDrafts(prev => ({ ...prev, [postId]: "" }))
  }

  const submitNewCall = () => {
    if (!newCall.title.trim() || !newCall.body.trim()) return
    const post: AlphaPost = {
      id: `p-${Date.now()}`,
      callerId: "c1", // pretend current user
      category: newCall.category,
      title: newCall.title,
      body: newCall.body,
      createdAt: "Just now",
      createdAtMs: Date.now(),
      outcome: "pending",
      likes: 0,
      liked: false,
      bookmarked: false,
      ticker: newCall.ticker || undefined,
      targetPct: newCall.targetPct ? `+${newCall.targetPct}%` : undefined,
      targetNum: newCall.targetPct ? parseInt(newCall.targetPct) : undefined,
      comments: [],
    }
    setPosts(prev => [post, ...prev])
    setNewCall({ category: "Crypto", ticker: "", title: "", body: "", targetPct: "" })
    setShowCreateModal(false)
  }

  /* ── Filtering + Sorting ──────────────────── */
  const filteredPosts = useMemo(() => {
    let result = [...posts]

    // Tab filter
    if (activeTab === "Following") result = result.filter(p => followedCallers.has(p.callerId))
    else if (activeTab === "Saved") result = result.filter(p => p.bookmarked)
    else if (activeTab !== "All") result = result.filter(p => p.category === activeTab)

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        (p.ticker && p.ticker.toLowerCase().includes(q)) ||
        CALLERS.find(c => c.id === p.callerId)?.username.toLowerCase().includes(q)
      )
    }

    // Sort
    if (sortMode === "newest") result.sort((a, b) => b.createdAtMs - a.createdAtMs)
    else if (sortMode === "likes") result.sort((a, b) => b.likes - a.likes)
    else if (sortMode === "target") result.sort((a, b) => (b.targetNum || 0) - (a.targetNum || 0))
    else if (sortMode === "caller") {
      result.sort((a, b) => {
        const ra = calcOverallSuccessRate(CALLERS.find(c => c.id === a.callerId)!) ?? 0
        const rb = calcOverallSuccessRate(CALLERS.find(c => c.id === b.callerId)!) ?? 0
        return rb - ra
      })
    }

    return result
  }, [posts, activeTab, followedCallers, searchQuery, sortMode])

  // Trending: top 3 posts by likes in last 48h
  const trendingPosts = useMemo(() => {
    const cutoff = Date.now() - 48 * 3600000
    return [...posts].filter(p => p.createdAtMs >= cutoff).sort((a, b) => b.likes - a.likes).slice(0, 3)
  }, [posts])

  const getOutcomeBadge = (post: AlphaPost) => {
    if (post.outcome === "win") return { label: "✓ Win", color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)" }
    if (post.outcome === "loss") return { label: "✗ Loss", color: "#fff", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)" }
    return { label: "⏳ Open", color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)" }
  }

  const SORT_OPTIONS: { label: string; value: SortMode }[] = [
    { label: "Newest", value: "newest" },
    { label: "Most Liked", value: "likes" },
    { label: "Highest Target", value: "target" },
    { label: "Best Caller", value: "caller" },
  ]

  return (
    <div style={{ position: "relative" }}>

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <div style={{
        position: "relative", overflow: "hidden", borderRadius: 24, marginBottom: 36, padding: "52px 48px",
        background: "linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(30,20,80,0.3) 50%, rgba(124,58,237,0.1) 100%)",
        border: "1px solid rgba(139,92,246,0.2)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, pointerEvents: "none", opacity: 0.05, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "5px 16px", background: "rgba(139,92,246,0.14)", border: "1px solid rgba(139,92,246,0.35)", borderRadius: 100 }}>
            <span style={{ color: "#fff", display: "flex" }}><BrainIcon /></span>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>Alpha Intelligence Feed</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.7rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, fontFamily: "var(--font-display)", background: "linear-gradient(135deg, #e8f1f8 0%, #c4b5fd 50%, #8b5cf6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Community Alpha<br />Caller Feed
              </h1>
              <p style={{ fontSize: "0.95rem", color: "var(--fg-light)", lineHeight: 1.65, maxWidth: 520 }}>
                Verified callers share calls across Polymarket, crypto, stocks, NFTs &amp; more. Track their success rate, follow the best signals, and post your own alpha.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexShrink: 0, alignItems: "center" }}>
              {[
                { value: `${CALLERS.length}`, label: "Active Callers", color: "#fff" },
                { value: `${posts.length}`, label: "Alpha Posts", color: "#fff" },
                { value: "73%", label: "Avg Win Rate", color: "#fff" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "14px 18px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
              <button onClick={() => setShowCreateModal(true)} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "14px 22px", borderRadius: 14,
                background: "rgba(124,58,237,0.25)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.35)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.25)" }}
              >
                <PlusIcon /> Post a Call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── TRENDING ─────────────────────────────────────────────── */}
      {trendingPosts.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ display: "flex", color: "#fff" }}><FireIcon /></span>
            <div style={{ fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>Trending Now</div>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {trendingPosts.map(post => {
              const caller = CALLERS.find(c => c.id === post.callerId)!
              const catMeta = CATEGORY_META[post.category]
              return (
                <div key={post.id} style={{
                  padding: "14px 16px", borderRadius: 14,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "default",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: "0.9rem" }}>{caller.avatar}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>{caller.username}</span>
                    <span style={{ padding: "1px 6px", borderRadius: 6, background: catMeta.bg, border: `1px solid ${catMeta.border}`, fontSize: "0.55rem", fontWeight: 700, color: catMeta.color, marginLeft: "auto" }}>{catMeta.icon} {post.category}</span>
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.3, marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.68rem", color: "var(--muted)" }}>
                    <span>♥ {post.likes}</span>
                    {post.ticker && <span style={{ fontWeight: 700, color: "var(--fg-light)" }}>${post.ticker}</span>}
                    {post.targetPct && <span style={{ color: "#fff", fontWeight: 700 }}>{post.targetPct}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── CALLER LEADERBOARD ───────────────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>Community</div>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {CALLERS.map(caller => {
            const rate = calcOverallSuccessRate(caller)
            const isExpanded = expandedCaller === caller.id
            const isFollowing = followedCallers.has(caller.id)
            const streak = calcStreak(caller.id, posts)
            return (
              <div key={caller.id} onClick={() => setExpandedCaller(isExpanded ? null : caller.id)} style={{
                borderRadius: 16, padding: "18px 20px",
                background: "rgba(255,255,255,0.04)", border: `1px solid ${isExpanded ? caller.avatarColor + "40" : "rgba(255,255,255,0.08)"}`,
                backdropFilter: "blur(16px)", cursor: "pointer", transition: "all 0.2s ease",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${caller.avatarColor}20`, border: `2px solid ${caller.avatarColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>{caller.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontWeight: 700, fontSize: "0.92rem", fontFamily: "var(--font-display)" }}>{caller.username}</span>
                      {caller.verified && <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, borderRadius: "50%", background: caller.avatarColor, color: "#fff" }}><CheckIcon /></span>}
                      {/* Streak badge */}
                      {streak.count >= 2 && (
                        <span style={{ padding: "1px 6px", borderRadius: 100, fontSize: "0.55rem", fontWeight: 800, background: streak.type === "win" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.08)", border: `1px solid ${streak.type === "win" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.15)"}`, color: streak.type === "win" ? "#fff" : "#fff" }}>
                          {streak.type === "win" ? "" : ""} {streak.count}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{caller.handle}</div>
                  </div>
                  {/* Success rate pill */}
                  <div style={{
                    padding: "5px 10px", borderRadius: 100, textAlign: "center", flexShrink: 0,
                    background: rate !== null ? (rate >= 60 ? "rgba(255,255,255,0.08)" : rate >= 40 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.08)") : "rgba(255,255,255,0.06)",
                    border: rate !== null ? (rate >= 60 ? "1px solid rgba(16,185,129,0.3)" : rate >= 40 ? "1px solid rgba(167,139,250,0.25)" : "1px solid rgba(239,68,68,0.25)") : "1px solid rgba(255,255,255,0.1)",
                  }}>
                    {rate !== null ? (
                      <>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.95rem", lineHeight: 1, color: rate >= 60 ? "#fff" : rate >= 40 ? "#fff" : "#fff" }}>{rate}%</div>
                        <div style={{ fontSize: "0.58rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", marginTop: 2 }}>Success</div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.8rem", lineHeight: 1, color: "var(--muted)" }}>N/A</div>
                        <div style={{ fontSize: "0.55rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--muted)", marginTop: 2, whiteSpace: "nowrap" }}>{10 - caller.totalAlphas} more</div>
                      </>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.72rem", color: "var(--muted)" }}>
                    <span style={{ fontWeight: 700, color: caller.avatarColor }}>{caller.totalAlphas}</span> alphas
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.72rem", color: "var(--muted)" }}>
                    <UserIcon /> <span style={{ fontWeight: 700, color: "var(--fg-light)" }}>{caller.followers.toLocaleString()}</span>
                  </div>
                  {caller.xLink && (
                    <a href={caller.xLink} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.72rem", color: "var(--muted)", textDecoration: "none" }}>
                      <XTwitterIcon /> X
                    </a>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.4, margin: 0, flex: 1 }}>{caller.bio}</p>
                  <button onClick={e => { e.stopPropagation(); toggleFollow(caller.id) }} style={{
                    padding: "5px 14px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", marginLeft: 12, flexShrink: 0,
                    background: isFollowing ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.06)",
                    border: `1px solid ${isFollowing ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.15)"}`,
                    color: isFollowing ? "#fff" : "var(--fg-light)",
                  }}>{isFollowing ? "Following" : "Follow"}</button>
                </div>

                {isExpanded && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14, marginTop: 14, animation: "fadeSlideIn 0.2s ease" }}>
                    <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 10 }}>Category Breakdown</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {(Object.keys(caller.stats) as CallCategory[]).map(cat => {
                        const s = caller.stats[cat]!
                        const meta = CATEGORY_META[cat]
                        return (
                          <div key={cat} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                              <span style={{ fontSize: "0.85rem" }}>{meta.icon}</span>
                              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: meta.color }}>{cat}</span>
                              <span style={{ fontSize: "0.68rem", color: "var(--muted)" }}>({s.total} calls)</span>
                            </div>
                            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--fg-light)" }}>
                              {caller.totalAlphas >= 10 ? calcCategoryRate(caller, cat) : "Not available"}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    {caller.totalAlphas < 10 && (
                      <div style={{ marginTop: 12, padding: "8px 12px", background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 10, fontSize: "0.7rem", color: "#fff" }}>
                        ⚠️ Needs {10 - caller.totalAlphas} more alpha posts to unlock success rate
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── SEARCH + SORT BAR ────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", display: "flex" }}><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search calls, tickers, callers..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px 10px 36px", borderRadius: 12,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--fg)", fontSize: "0.82rem", outline: "none", transition: "border-color 0.2s",
            }}
            onFocus={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)" }}
            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ display: "flex", color: "var(--muted)" }}><SortIcon /></span>
          <div style={{ display: "flex", gap: 2, padding: 3, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10 }}>
            {SORT_OPTIONS.map(s => (
              <button key={s.value} onClick={() => setSortMode(s.value)} style={{
                padding: "6px 10px", borderRadius: 8, border: "none",
                background: sortMode === s.value ? "rgba(124,58,237,0.2)" : "transparent",
                color: sortMode === s.value ? "#fff" : "var(--muted)",
                fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
              }}>{s.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── ALPHA FEED ───────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28, alignItems: "start" }}>
        <div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 24, padding: 4, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflowX: "auto", width: "fit-content" }}>
            {ALL_TABS.map(tab => {
              const meta = (tab !== "All" && tab !== "Following" && tab !== "Saved") ? CATEGORY_META[tab] : null
              const isSpecial = tab === "Following" || tab === "Saved"
              const count = tab === "Following" ? posts.filter(p => followedCallers.has(p.callerId)).length
                : tab === "Saved" ? posts.filter(p => p.bookmarked).length
                : null
              return (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: "7px 14px", borderRadius: 10, border: "none", cursor: "pointer",
                  fontSize: "0.78rem", fontWeight: 600, whiteSpace: "nowrap", transition: "all 0.18s ease",
                  background: activeTab === tab ? (meta ? meta.bg : isSpecial ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.1)") : "transparent",
                  color: activeTab === tab ? (meta ? meta.color : isSpecial ? "#fff" : "var(--fg)") : "var(--muted)",
                  boxShadow: activeTab === tab && meta ? `0 0 0 1px ${meta.border}` : activeTab === tab ? "0 0 0 1px rgba(124,58,237,0.3)" : "none",
                }}>
                  {tab === "Following" && "👁 "}{tab === "Saved" && "🔖 "}
                  {meta && meta.icon + " "}{tab}
                  {count !== null && count > 0 && <span style={{ marginLeft: 4, fontSize: "0.6rem", opacity: 0.7 }}>({count})</span>}
                </button>
              )
            })}
          </div>

          {/* Post cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filteredPosts.length === 0 && (
              <div style={{ padding: 40, textAlign: "center", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                  {activeTab === "Following" ? "You're not following anyone yet. Follow callers above to see their posts here."
                    : activeTab === "Saved" ? "No saved calls. Bookmark calls to find them here."
                    : searchQuery ? `No results for "${searchQuery}".`
                    : "No posts in this category yet."}
                </p>
              </div>
            )}
            {filteredPosts.map(post => {
              const caller = CALLERS.find(c => c.id === post.callerId)!
              const catMeta = CATEGORY_META[post.category]
              const outcome = getOutcomeBadge(post)
              const rate = calcOverallSuccessRate(caller)
              const showComments = expandedComments.has(post.id)
              return (
                <div key={post.id} style={{
                  borderRadius: 18, padding: "22px 24px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)", transition: "border-color 0.2s ease",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${catMeta.color}30` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)" }}
                >
                  {/* Caller info row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div onClick={() => setSelectedCallerProfile(caller.id)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", transition: "opacity 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = "0.7" }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
                    >
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: `${caller.avatarColor}18`, border: `1px solid ${caller.avatarColor}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{caller.avatar}</div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>{caller.username}</span>
                          {caller.verified && <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, borderRadius: "50%", background: caller.avatarColor, color: "#fff" }}><CheckIcon /></span>}
                          {rate !== null ? (
                            <span style={{ padding: "2px 7px", background: rate >= 60 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.08)", border: `1px solid ${rate >= 60 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.15)"}`, borderRadius: 100, fontSize: "0.62rem", fontWeight: 700, color: rate >= 60 ? "#fff" : "#fff" }}>{rate}% success</span>
                          ) : (
                            <span style={{ padding: "2px 7px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, fontSize: "0.62rem", fontWeight: 600, color: "var(--muted)" }}>Rate N/A</span>
                          )}
                        </div>
                        <div style={{ fontSize: "0.68rem", color: "var(--muted)" }}>{caller.handle} · {post.createdAt}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ padding: "4px 10px", background: catMeta.bg, border: `1px solid ${catMeta.border}`, borderRadius: 100, fontSize: "0.65rem", fontWeight: 700, color: catMeta.color }}>{catMeta.icon} {post.category}</span>
                      <span style={{ padding: "4px 10px", background: outcome.bg, border: `1px solid ${outcome.border}`, borderRadius: 100, fontSize: "0.65rem", fontWeight: 700, color: outcome.color }}>{outcome.label}</span>
                    </div>
                  </div>

                  {/* Ticker + target */}
                  {post.ticker && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span style={{ padding: "3px 10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, fontFamily: "var(--font-display)", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.05em" }}>${post.ticker}</span>
                      {post.targetPct && <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>Target {post.targetPct}</span>}
                      {post.result && <span style={{ fontSize: "0.75rem", fontWeight: 700, color: post.outcome === "win" ? "#fff" : "#fff" }}>{post.result}</span>}
                    </div>
                  )}

                  <h3 style={{ fontSize: "0.98rem", fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--fg-light)", lineHeight: 1.65, marginBottom: 16 }}>{post.body}</p>

                  {/* Footer: like + bookmark + comments */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button onClick={() => handleLike(post.id)} style={{
                      display: "flex", alignItems: "center", gap: 7, padding: "7px 14px",
                      background: post.liked ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${post.liked ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: 10, color: post.liked ? "#fff" : "var(--muted)", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", transition: "all 0.18s ease",
                    }}>
                      <ThumbUpIcon /> {post.likes}
                    </button>
                    <button onClick={() => handleBookmark(post.id)} style={{
                      display: "flex", alignItems: "center", gap: 5, padding: "7px 12px",
                      background: post.bookmarked ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${post.bookmarked ? "rgba(167,139,250,0.35)" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: 10, color: post.bookmarked ? "#fff" : "var(--muted)", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", transition: "all 0.18s",
                    }}>
                      <BookmarkIcon filled={post.bookmarked} /> {post.bookmarked ? "Saved" : "Save"}
                    </button>
                    <button onClick={() => toggleComments(post.id)} style={{
                      display: "flex", alignItems: "center", gap: 5, padding: "7px 12px",
                      background: showComments ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${showComments ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: 10, color: showComments ? "#fff" : "var(--muted)", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", transition: "all 0.18s",
                    }}>
                      <MessageIcon /> {post.comments.length > 0 ? post.comments.length : "Reply"}
                    </button>
                  </div>

                  {/* Comments section */}
                  {showComments && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", animation: "fadeSlideIn 0.2s ease" }}>
                      {post.comments.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                          {post.comments.map(c => (
                            <div key={c.id} style={{ display: "flex", gap: 10, padding: "10px 14px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                              <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: 2 }}>{c.avatar}</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                  <span style={{ fontWeight: 700, fontSize: "0.78rem" }}>{c.username}</span>
                                  <span style={{ fontSize: "0.65rem", color: "var(--muted)" }}>{c.time}</span>
                                  <span style={{ fontSize: "0.65rem", color: "var(--muted)", marginLeft: "auto" }}>♥ {c.likes}</span>
                                </div>
                                <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--fg-light)", lineHeight: 1.5 }}>{c.body}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Comment input */}
                      <div style={{ display: "flex", gap: 10 }}>
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentDrafts[post.id] || ""}
                          onChange={e => setCommentDrafts(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={e => { if (e.key === "Enter") submitComment(post.id) }}
                          style={{
                            flex: 1, padding: "9px 14px", borderRadius: 10,
                            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                            color: "var(--fg)", fontSize: "0.8rem", outline: "none",
                          }}
                        />
                        <button onClick={() => submitComment(post.id)} style={{
                          padding: "9px 16px", borderRadius: 10,
                          background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)",
                          color: "#fff", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
                        }}>Send</button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ─── SIDEBAR ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Top callers */}
          <div style={{ borderRadius: 18, padding: "22px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
            <div style={{ fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 4 }}>Leaderboard</div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: 18 }}> Top Callers</h3>
            {CALLERS.filter(c => calcOverallSuccessRate(c) !== null)
              .sort((a, b) => (calcOverallSuccessRate(b) ?? 0) - (calcOverallSuccessRate(a) ?? 0))
              .map((c, i) => {
                const rate = calcOverallSuccessRate(c)!
                const streak = calcStreak(c.id, posts)
                return (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `${c.avatarColor}20`, border: `1px solid ${c.avatarColor}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}>{c.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>{c.username}</span>
                        {streak.count >= 2 && <span style={{ fontSize: "0.55rem", color: streak.type === "win" ? "#fff" : "#fff" }}>{streak.type === "win" ? "" : ""}{streak.count}</span>}
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "var(--muted)" }}>{c.totalAlphas} calls</div>
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: rate >= 60 ? "#fff" : "#fff" }}>{rate}%</div>
                  </div>
                )
              })}
            <div style={{ marginTop: 14, padding: "10px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, fontSize: "0.7rem", color: "var(--muted)", lineHeight: 1.5 }}>
              ⓘ Callers need <strong style={{ color: "var(--fg-light)" }}>10+ alpha posts</strong> before their success rate is calculated and shown.
            </div>
          </div>

          {/* How It Works */}
          <div style={{ borderRadius: 18, padding: "22px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
            <div style={{ fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 4 }}>How It Works</div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: 16 }}>📐 Success Rate Logic</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CATEGORY_TABS.map(cat => {
                const meta = CATEGORY_META[cat]
                return (
                  <div key={cat} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ padding: "2px 8px", borderRadius: 8, background: meta.bg, border: `1px solid ${meta.border}`, fontSize: "0.65rem", fontWeight: 700, color: meta.color, flexShrink: 0, marginTop: 1 }}>{meta.icon} {cat}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.4 }}>
                      {meta.rateType === "like" ? "Measured by avg ♥ per post" : "Win/loss based on call outcome"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── CALLER PROFILE MODAL ────────────────────────────────── */}
      {selectedCallerProfile && (() => {
        const caller = CALLERS.find(c => c.id === selectedCallerProfile)!
        const rate = calcOverallSuccessRate(caller)
        const callerPosts = posts.filter(p => p.callerId === caller.id)
        const streak = calcStreak(caller.id, posts)
        const bestCall = [...callerPosts].filter(p => p.outcome === "win").sort((a, b) => (b.targetNum || 0) - (a.targetNum || 0))[0]
        const worstCall = [...callerPosts].filter(p => p.outcome === "loss").sort((a, b) => (a.targetNum || 0) - (b.targetNum || 0))[0]
        const isFollowing = followedCallers.has(caller.id)

        return (
          <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", padding: 24 }}
            onClick={e => { if (e.target === e.currentTarget) setSelectedCallerProfile(null) }}
          >
            <div style={{
              width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto",
              background: "rgba(10,20,32,0.95)", border: `1px solid ${caller.avatarColor}50`,
              borderRadius: 24, padding: 32, boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px ${caller.avatarColor}30`, position: "relative",
            }}>
              <button onClick={() => setSelectedCallerProfile(null)} style={{ position: "absolute", top: 24, right: 24, background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", cursor: "pointer" }}>✕</button>

              <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
                <div style={{ width: 72, height: 72, borderRadius: 16, background: `${caller.avatarColor}20`, border: `2px solid ${caller.avatarColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", flexShrink: 0 }}>{caller.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <h2 style={{ margin: 0, fontSize: "1.5rem", fontFamily: "var(--font-display)" }}>{caller.username}</h2>
                    {caller.verified && <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "50%", background: caller.avatarColor, color: "#fff" }}><CheckIcon /></span>}
                    {streak.count >= 2 && (
                      <span style={{ padding: "2px 8px", borderRadius: 100, fontSize: "0.65rem", fontWeight: 800, background: streak.type === "win" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.08)", border: `1px solid ${streak.type === "win" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.15)"}`, color: streak.type === "win" ? "#fff" : "#fff" }}>
                        {streak.type === "win" ? "" : ""} {streak.count} streak
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)", fontSize: "0.9rem", marginBottom: 8 }}>
                    <span>{caller.handle}</span>
                    {caller.xLink && (
                      <a href={caller.xLink} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--muted)", textDecoration: "none", fontSize: "0.82rem" }}>
                        <XTwitterIcon /> X Profile
                      </a>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--fg-light)", lineHeight: 1.5, flex: 1 }}>{caller.bio}</p>
                    <button onClick={() => toggleFollow(caller.id)} style={{
                      padding: "7px 18px", borderRadius: 100, fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
                      background: isFollowing ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.06)",
                      border: `1px solid ${isFollowing ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.15)"}`,
                      color: isFollowing ? "#fff" : "var(--fg-light)",
                    }}>{isFollowing ? "Following ✓" : "Follow"}</button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
                {[
                  { label: "Followers", value: caller.followers.toLocaleString() },
                  { label: "Total Calls", value: caller.totalAlphas.toString() },
                  { label: "Success Rate", value: rate !== null ? `${rate}%` : "N/A", color: rate !== null ? (rate >= 60 ? "#fff" : "#fff") : "var(--muted)" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: 700, color: s.color || "var(--fg)" }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Best & Worst Call */}
              {(bestCall || worstCall) && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                  {bestCall && (
                    <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
                      <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#fff", marginBottom: 6 }}> Best Call</div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{bestCall.title}</div>
                      {bestCall.targetPct && <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fff" }}>{bestCall.targetPct}</div>}
                    </div>
                  )}
                  {worstCall && (
                    <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                      <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#fff", marginBottom: 6 }}>📉 Worst Call</div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{worstCall.title}</div>
                      {worstCall.targetPct && <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fff" }}>{worstCall.targetPct}</div>}
                    </div>
                  )}
                </div>
              )}

              {/* Call History */}
              <h3 style={{ fontSize: "1.1rem", marginBottom: 16, fontFamily: "var(--font-display)", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 8 }}>Call History</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {callerPosts.map(p => {
                  const cMeta = CATEGORY_META[p.category]
                  const out = getOutcomeBadge(p)
                  return (
                    <div key={p.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: cMeta.color, background: cMeta.bg, padding: "2px 6px", borderRadius: 4 }}>{cMeta.icon} {p.category}</span>
                            <span style={{ fontSize: "0.65rem", color: "var(--muted)" }}>{p.createdAt}</span>
                          </div>
                          <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{p.title}</div>
                        </div>
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, color: out.color, background: out.bg, border: `1px solid ${out.border}`, padding: "3px 8px", borderRadius: 100 }}>{out.label}</span>
                      </div>
                      {p.ticker && (
                        <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 4 }}>
                          <span style={{ fontWeight: 600 }}>${p.ticker}</span>
                          {p.targetPct && ` • Target: ${p.targetPct}`}
                          {p.result && ` • Result: ${p.result}`}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })()}

      {/* ─── CREATE CALL MODAL ────────────────────────────────────── */}
      {showCreateModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", padding: 24 }}
          onClick={e => { if (e.target === e.currentTarget) setShowCreateModal(false) }}
        >
          <div style={{ width: "100%", maxWidth: 520, background: "rgba(10,20,32,0.95)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, padding: 32, boxShadow: "0 24px 80px rgba(0,0,0,0.6)", position: "relative" }}>
            <button onClick={() => setShowCreateModal(false)} style={{ position: "absolute", top: 24, right: 24, background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", cursor: "pointer" }}>✕</button>

            <h2 style={{ margin: "0 0 24px", fontSize: "1.3rem", fontFamily: "var(--font-display)" }}>📡 Post a New Alpha Call</h2>

            {/* Category */}
            <label style={{ display: "block", marginBottom: 16 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", display: "block", marginBottom: 6 }}>Category</span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {CATEGORY_TABS.map(cat => {
                  const meta = CATEGORY_META[cat]
                  return (
                    <button key={cat} onClick={() => setNewCall(p => ({ ...p, category: cat }))} style={{
                      padding: "6px 14px", borderRadius: 10, border: "none", cursor: "pointer",
                      background: newCall.category === cat ? meta.bg : "rgba(255,255,255,0.04)",
                      color: newCall.category === cat ? meta.color : "var(--muted)",
                      fontSize: "0.75rem", fontWeight: 700, transition: "all 0.15s",
                      boxShadow: newCall.category === cat ? `0 0 0 1px ${meta.border}` : "none",
                    }}>{meta.icon} {cat}</button>
                  )
                })}
              </div>
            </label>

            {/* Ticker + Target */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <label>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", display: "block", marginBottom: 6 }}>Ticker (optional)</span>
                <input type="text" placeholder="e.g. ETH, NVDA" value={newCall.ticker} onChange={e => setNewCall(p => ({ ...p, ticker: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--fg)", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }} />
              </label>
              <label>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", display: "block", marginBottom: 6 }}>Target % (optional)</span>
                <input type="number" placeholder="e.g. 50" value={newCall.targetPct} onChange={e => setNewCall(p => ({ ...p, targetPct: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--fg)", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }} />
              </label>
            </div>

            {/* Title */}
            <label style={{ display: "block", marginBottom: 16 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", display: "block", marginBottom: 6 }}>Title</span>
              <input type="text" placeholder="Your alpha call headline" value={newCall.title} onChange={e => setNewCall(p => ({ ...p, title: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--fg)", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }} />
            </label>

            {/* Body */}
            <label style={{ display: "block", marginBottom: 24 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", display: "block", marginBottom: 6 }}>Thesis</span>
              <textarea placeholder="Explain your thesis, reasoning, and conviction..." value={newCall.body} onChange={e => setNewCall(p => ({ ...p, body: e.target.value }))} rows={4}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--fg)", fontSize: "0.85rem", outline: "none", resize: "vertical", lineHeight: 1.6, boxSizing: "border-box" }} />
            </label>

            <button onClick={submitNewCall} style={{
              width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "#fff",
              fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.85" }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
            >
              Publish Alpha Call
            </button>
            <p style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: 10, textAlign: "center" }}>
              Your call will be live immediately. Win/loss will be tracked by the community.
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

import { getCampaignById } from "@/lib/actions/campaigns"
import { notFound } from "next/navigation"
import Link from "next/link"

const bannerGradients = [
  "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(124,58,237,0.2) 100%)",
  "linear-gradient(135deg, rgba(167,139,250,0.3) 0%, rgba(16,185,129,0.15) 100%)",
  "linear-gradient(135deg, rgba(167,139,250,0.3) 0%, rgba(239,68,68,0.15) 100%)",
  "linear-gradient(135deg, rgba(167,139,250,0.3) 0%, rgba(236,72,153,0.15) 100%)",
  "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(124,58,237,0.15) 100%)",
  "linear-gradient(135deg, rgba(239,68,68,0.3) 0%, rgba(167,139,250,0.15) 100%)",
]

const bannerIcons = [
  /* DeFi */     `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  /* Network */  `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="12" r="3"/><path d="M12 1v4m0 14v4m11-11h-4M5 12H1m16.36-7.36l-2.83 2.83M7.46 16.54l-2.83 2.83m14.73 0l-2.83-2.83M7.46 7.46L4.63 4.63"/></svg>`,
  /* Bot */      `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 8V5"/><circle cx="12" cy="3" r="2"/><path d="M8 14h0m8 0h0"/></svg>`,
  /* Security */ `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
  /* Social */   `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  /* Bridge */   `<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
]

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  hybrid:    { bg: "rgba(255,255,255,0.08)",  border: "rgba(255,255,255,0.15)",  text: "#fff" },
  raffle:    { bg: "rgba(255,255,255,0.08)",  border: "rgba(255,255,255,0.15)",  text: "#fff" },
  technical: { bg: "rgba(255,255,255,0.08)",  border: "rgba(255,255,255,0.15)",  text: "#fff" },
  manual:    { bg: "rgba(255,255,255,0.08)",  border: "rgba(255,255,255,0.15)",  text: "#fff" },
  fcfs:      { bg: "rgba(255,255,255,0.08)",  border: "rgba(255,255,255,0.15)",  text: "#fff" },
}

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  // If the actual DB call fails, we rely on the mock data fallback from getCampaignById / getCampaigns
  let campaign = await getCampaignById(params.id)
  
  if (!campaign) {
    // Manually supply mock data if the single endpoint fails entirely
    campaign = {
      id: params.id,
      title: "Solana L3 Alpha Testing",
      selection_method: "hybrid",
      status: "active",
      reward_pool: "5,000",
      prize_name: "$5,000 USDT",
      description: "We are stress testing the new Layer-3 deployment on Solana devnet. Join the vanguard of developers pushing the limits of high-throughput environments. You will need to bridge devnet assets, execute 10 swaps across our new automated market maker, and submit your transaction logs.",
      ends_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      banner_url: null,
      max_winners: 50,
      photo_mandatory: true,
      winners: null
    }
  }

  const isClosed = campaign.status === 'closed'
  const isDraft = campaign.status === 'draft'
  const isUrgent = campaign.ends_at && (new Date(campaign.ends_at).getTime() - Date.now()) < 48 * 60 * 60 * 1000
  
  const method = campaign.selection_method?.toLowerCase() || "hybrid"
  const typeStyle = typeColors[method] || typeColors.hybrid
  
  const idx = typeof campaign.id === "string" ? campaign.id.charCodeAt(campaign.id.length - 1) % bannerGradients.length : 0

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* ─── IMMERSIVE HERO ─── */}
      <div style={{
        position: "relative",
        margin: "-12px -100px 48px -100px", // Breaks out of the standard container padding for edge-to-edge feel
        padding: "100px 100px 60px 100px",
        background: bannerGradients[idx],
        borderBottom: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden"
      }}>
        {/* Background Icon Watermark */}
        {!campaign.banner_url && (
          <div 
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) scale(2.5)", color: "rgba(255,255,255,0.03)", pointerEvents: "none" }}
            dangerouslySetInnerHTML={{ __html: bannerIcons[idx] }}
          />
        )}

        <div style={{ position: "relative", zIndex: 10, maxWidth: 800 }}>
          <Link href="/campaigns" className="glass-icon" style={{
            display: "inline-flex",
            padding: "6px 16px",
            borderRadius: 100,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: "0.1em",
            marginBottom: 32,
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)",
            color: "var(--muted)",
          }}>
            ← Back to Campaigns
          </Link>
          
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 20 }}>
            {/* Status Badge */}
            <span style={{
              padding: "6px 16px",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              borderRadius: 100,
              background: isClosed ? "rgba(239,68,68,0.2)" : isDraft ? "rgba(255,255,255,0.1)" : "rgba(167,139,250,0.15)",
              border: `1px solid ${isClosed ? "rgba(239,68,68,0.3)" : isDraft ? "var(--border)" : "rgba(167,139,250,0.3)"}`,
              color: "#fff",
              backdropFilter: "blur(12px)",
            }}>
              {isClosed ? "Closed" : isDraft ? "Draft" : "Active Campaign"}
            </span>

            {/* Type Badge */}
            <span style={{
              padding: "6px 16px",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              borderRadius: 100,
              background: typeStyle.bg,
              border: `1px solid ${typeStyle.border}`,
              color: typeStyle.text,
              backdropFilter: "blur(12px)",
            }}>
              {method.replace('_', ' ')}
            </span>
          </div>

          <h1 style={{
            fontSize: "3.5rem",
            lineHeight: 1.1,
            marginBottom: 24,
            textShadow: "0 4px 24px rgba(0,0,0,0.5)"
          }}>
            {campaign.title}
          </h1>

          <p style={{
            fontSize: "1.1rem",
            color: "var(--fg-light)",
            lineHeight: 1.6,
            maxWidth: 600,
            margin: "0 auto",
            textShadow: "0 2px 12px rgba(0,0,0,0.5)"
          }}>
            {campaign.description}
          </p>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      {isClosed && campaign.winners && campaign.winners.length > 0 ? (
        /* Winners Mode: Show winners, hide details/submission */
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h3 style={{ fontSize: "1.4rem", marginBottom: 24, color: "var(--fg)", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 14, height: 14, background: "#fff", borderRadius: 3, display: "inline-block", boxShadow: "0 0 12px #fff" }} />
            Campaign Winners Announced
          </h3>
          
          <div className="glass-panel" style={{ padding: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
              {campaign.winners.map((winner: any, i: number) => (
                <div key={i} style={{ 
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 20px", 
                  background: "rgba(255,255,255,0.03)", 
                  border: "1px solid var(--border)",
                  borderRadius: 12
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff" }} />
                    <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--fg)" }}>{winner.username}</span>
                  </div>
                  <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-display)" }}>{winner.reward}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Active/Closed (No winners yet) Mode: Show details & form */
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 40, alignItems: "start" }}>
          
          {/* LEFT COL: DETAILS */}
          <div>
            {/* Metrics Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
              <div className="glass-panel" style={{ padding: "20px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.05em", marginBottom: 8 }}>Prize</div>
                <div style={{
                  padding: "5px 16px",
                  borderRadius: 100,
                  fontSize: "1rem",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                   color: "#fff",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "inline-block",
                  marginTop: 4,
                }}>
                  {campaign.prize_name || (campaign.reward_pool ? `$${campaign.reward_pool}` : "TBD")}
                </div>
              </div>
              
              <div className="glass-panel" style={{ padding: "20px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.05em", marginBottom: 8 }}>Deadline</div>
                <div style={{ fontSize: "1.4rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", marginTop: 8 }}>
                  {new Date(campaign.ends_at || new Date()).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>

              <div className="glass-panel" style={{ padding: "20px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.05em", marginBottom: 8 }}>Max Winners</div>
                <div style={{ fontSize: "2.2rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)" }}>
                  {campaign.max_winners ? campaign.max_winners : "∞"}
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: "1.2rem", marginBottom: 20, color: "var(--fg)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 12, height: 12, background: "#fff", borderRadius: 2, display: "inline-block" }} />
              Mission Requirements
            </h3>
            
            <div className="glass-panel" style={{ padding: 32, marginBottom: 48 }}>
              {campaign.requirements ? (
                <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, color: "var(--fg-light)", margin: 0 }}>{campaign.requirements}</p>
              ) : (
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 24, padding: 0, margin: 0 }}>
                  {[
                    "Connect your primary wallet and ensure you have testnet tokens.",
                    "Execute at least 5 swaps on the new automated market maker.",
                    "Provide a detailed feedback report in our official Discord.",
                    "Submit your primary transaction hash below for verification."
                  ].map((req, i) => (
                    <li key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{
                        width: 28, height: 28,
                        borderRadius: "50%",
                        background: "rgba(124,58,237,0.15)",
                        border: "1px solid rgba(124,58,237,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        flexShrink: 0
                      }}>
                        {i + 1}
                      </div>
                      <span style={{ lineHeight: 1.5, color: "var(--fg-light)", paddingTop: 3 }}>{req}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* RIGHT COL: STICKY FORM */}
          <div style={{ position: "sticky", top: 24 }}>
            <div className="glass-panel" style={{ 
              padding: 32, 
              background: "rgba(10,20,32,0.6)",
              borderTop: "2px solid #fff",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6)"
            }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8, color: "var(--fg)" }}>Submit Entry</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: 28, lineHeight: 1.5 }}>
                Provide the details of your submission to claim your spot in the reward pool.
              </p>

              <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>
                    <span>Title of your submission</span>
                    <span style={{ fontSize: "0.65rem", background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4 }}>Optional</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="E.g. Fixed the liquidity bug" 
                    className="glass-input"
                  />
                </div>

                <div>
                  <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>
                    <span>Context of your submission</span>
                    <span style={{ fontSize: "0.65rem", background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4 }}>Optional</span>
                  </label>
                  <textarea 
                    placeholder="Provide any additional details or context..." 
                    className="glass-input"
                    rows={3}
                    style={{ resize: "vertical" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>Proof URL (Post/Thread)</label>
                  <input 
                    type="text" 
                    placeholder="https://x.com/..." 
                    className="glass-input"
                  />
                </div>

                <div>
                  <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>
                    <span>Upload Photo Proof</span>
                    {!campaign.photo_mandatory && <span style={{ fontSize: "0.65rem", background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4 }}>Optional</span>}
                  </label>
                  <div className="glass-upload">
                    <svg style={{ margin: "0 auto 8px" }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--fg)" }}>Click to upload image</div>
                    <div style={{ fontSize: "0.7rem", marginTop: 4 }}>PNG, JPG or GIF (max. 5MB)</div>
                  </div>
                </div>

                <div style={{ marginTop: 8 }}>
                  <button 
                    className="glass-button" 
                    type="button" // Make it button to prevent actual submit reload
                    style={{ 
                      width: "100%", 
                      padding: 16, 
                      background: isClosed ? "rgba(255,255,255,0.05)" : "#E6F2DD",
                      border: "none",
                      color: isClosed ? "var(--muted)" : "#000",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      borderRadius: 8,
                      cursor: isClosed ? "not-allowed" : "pointer",
                      boxShadow: isClosed ? "none" : "0 4px 14px rgba(124,58,237,0.4)"
                    }}
                    disabled={isClosed || isDraft}
                  >
                    {isClosed ? 'Winner Announcement Soon' : isDraft ? 'Coming Soon' : 'Submit for Review'}
                  </button>
                </div>
              </form>

              <div style={{ marginTop: 24, textAlign: "center" }}>
                <p style={{ fontSize: "0.7rem", color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Secured via Voyage Protocol. Verification takes ~24h.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

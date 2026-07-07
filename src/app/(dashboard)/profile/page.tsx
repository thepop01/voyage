"use client"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useWallets, ChainType } from "@/lib/contexts/WalletContext"

function WalletManager() {
  const { wallets, addWallet, removeWallet, setDefaultWallet } = useWallets()
  const [newAddress, setNewAddress] = useState("")
  const [newChain, setNewChain] = useState<ChainType>("Ethereum")

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAddress.trim()) return
    addWallet(newAddress.trim(), newChain)
    setNewAddress("")
  }

  return (
    <div className="glass-panel" style={{ padding: 32 }}>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 16, marginBottom: 32, alignItems: "center" }}>
        <input 
          type="text" 
          value={newAddress} 
          onChange={e => setNewAddress(e.target.value)} 
          placeholder="Enter wallet address (0x...)" 
          className="glass-input" 
          style={{ flex: 1 }} 
        />
        <select 
          value={newChain} 
          onChange={e => setNewChain(e.target.value as ChainType)} 
          className="glass-input" 
          style={{ width: "auto" }}
        >
          <option value="Ethereum" style={{ color: "var(--bg)" }}>Ethereum</option>
          <option value="Solana" style={{ color: "var(--bg)" }}>Solana</option>
          <option value="Polygon" style={{ color: "var(--bg)" }}>Polygon</option>
        </select>
        <button type="submit" className="glass-button" style={{ padding: "14px 24px", borderRadius: 8, background: "#FBEFEF", color: "#fff", border: "none" }}>
          Add Wallet
        </button>
      </form>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {wallets.length === 0 ? (
          <div style={{ color: "var(--muted)", textAlign: "center", padding: 40, border: "1px dashed var(--border)", borderRadius: 12 }}>
            No wallets linked yet. Add a wallet to receive rewards.
          </div>
        ) : (
          wallets.map(w => (
            <div key={w.id} style={{ 
              display: "flex", alignItems: "center", justifyContent: "space-between", 
              padding: "20px 24px", 
              background: w.isDefault ? "rgba(124,58,237,0.05)" : "rgba(255,255,255,0.02)", 
              borderRadius: 12, 
              border: w.isDefault ? "1px solid rgba(124,58,237,0.3)" : "1px solid var(--border)",
              boxShadow: w.isDefault ? "0 4px 20px rgba(124,58,237,0.1)" : "none"
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: w.isDefault ? "var(--fg)" : "var(--fg-light)" }}>{w.address}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: w.chain === "Solana" ? "#fff" : w.chain === "Polygon" ? "#fff" : "#fff" }}></span>
                  {w.chain}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {w.isDefault ? (
                  <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700, background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>Primary</span>
                ) : (
                  <button onClick={() => setDefaultWallet(w.id, w.chain)} style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--fg-light)", padding: "6px 16px", borderRadius: 100, fontSize: "0.75rem", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "var(--fg)"} onMouseOut={e => e.currentTarget.style.color = "var(--fg-light)"}>
                    Set as Primary
                  </button>
                )}
                <button onClick={() => removeWallet(w.id)} style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "1.5rem", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "var(--danger)"} onMouseOut={e => e.currentTarget.style.color = "var(--muted)"}>
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "submissions", label: "Submissions" },
    { id: "wallets", label: "Wallets" },
    { id: "earnings", label: "Earnings" }
  ]

  return (
    <div style={{ paddingBottom: 100, maxWidth: 1000, margin: "0 auto" }}>
      
      {/* IMMERSIVE HERO */}
      <div style={{
        position: "relative",
        padding: "60px 40px",
        background: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(10,20,32,0) 100%)",
        border: "1px solid var(--border)",
        borderRadius: 24,
        marginBottom: 40,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        gap: 32
      }}>
        {/* Glow behind avatar */}
        <div style={{ position: "absolute", top: "50%", left: 80, transform: "translate(-50%, -50%)", width: 150, height: 150, background: "var(--accent)", filter: "blur(80px)", opacity: 0.3, pointerEvents: "none" }} />
        
        <div style={{ width: 120, height: 120, borderRadius: "50%", background: "#FBEFEF", padding: 4, flexShrink: 0, position: "relative", zIndex: 1 }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
             {session?.user?.image ? (
               <img src={session.user.image} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
             ) : (
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" color="var(--muted)"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
             )}
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <h1 style={{ fontSize: "2.5rem", margin: 0, lineHeight: 1 }}>{session?.user?.name || "Ninja"}</h1>
            <span style={{ padding: "4px 10px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(16,185,129,0.2)" }}>Verified</span>
          </div>
          <div style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 16 }}>
            @{session?.user?.name?.toLowerCase().replace(/\s+/g, '_') || "ninja_user"}
          </div>
          <p style={{ color: "var(--fg-light)", margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            Full-stack developer and web3 enthusiast. Specializing in L2 security and DeFi liquidity analysis. Active participant in Voyage since Oct 2023.
          </p>
          
          <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "var(--fg)"} onMouseOut={e => e.currentTarget.style.color = "var(--muted)"}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
              @ninja_web3
            </a>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "var(--fg)"} onMouseOut={e => e.currentTarget.style.color = "var(--muted)"}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              github.com/ninja
            </a>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
        <div className="glass-panel" style={{ padding: "20px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.05em", marginBottom: 8 }}>Global Rank</div>
          <div style={{ fontSize: "2rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)" }}>#08</div>
        </div>
        <div className="glass-panel" style={{ padding: "20px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.05em", marginBottom: 8 }}>Total REP</div>
          <div style={{ fontSize: "2rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff" }}>{session?.user?.reputationScore || "3,120"}</div>
        </div>
        <div className="glass-panel" style={{ padding: "20px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.05em", marginBottom: 8 }}>Approval Rate</div>
          <div style={{ fontSize: "2rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)" }}>92%</div>
        </div>
        <div className="glass-panel" style={{ padding: "20px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.05em", marginBottom: 8 }}>Campaign Wins</div>
          <div style={{ fontSize: "2rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)" }}>14</div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: 8, borderBottom: "1px solid var(--border)", marginBottom: 32 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "12px 24px",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid var(--accent)" : "2px solid transparent",
              color: activeTab === tab.id ? "var(--fg)" : "var(--muted)",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gap: 24 }}>
          <div className="glass-panel" style={{ padding: 32 }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 12, height: 12, borderRadius: 2, background: "var(--accent)", display: "inline-block" }} />
              Recent Activity
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { title: "DeFi Protocol v1 Beta", type: "Submission Approved", time: "2 days ago", pts: "+500 REP" },
                { title: "L2 Bridge Alpha", type: "Reward Claimed", time: "1 week ago", pts: " $1,200 USDC" },
                { title: "Solana L3 Early Access", type: "Submission Under Review", time: "2 weeks ago", pts: "Pending" }
              ].map((act, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--fg)", marginBottom: 4 }}>{act.title}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{act.type} • {act.time}</div>
                  </div>
                  <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", color: act.pts.includes("Pending") ? "var(--warning)" : "var(--accent)", background: act.pts.includes("") ? "rgba(124,58,237,0.12)" : "transparent", border: act.pts.includes("") ? "1px solid rgba(139,92,246,0.3)" : "none", padding: act.pts.includes("") ? "4px 12px" : 0, borderRadius: 100 }}>
                    {act.pts}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "submissions" && (
        <div className="glass-panel" style={{ overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(0,0,0,0.2)" }}>
                <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "0.8rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase" }}>Campaign</th>
                <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "0.8rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "16px 24px", textAlign: "right", fontSize: "0.8rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase" }}>Points</th>
                <th style={{ padding: "16px 24px", textAlign: "right", fontSize: "0.8rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase" }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "DeFi Protocol v1 Beta", status: "Approved", pts: "+500", score: "88" },
                { name: "L2 Bridge Alpha", status: "Approved", pts: "+1,200", score: "94" },
                { name: "NFT Marketplace Stress Test", status: "Approved", pts: "+300", score: "82" },
                { name: "Solana L3 Early Access", status: "Reviewing", pts: "—", score: "—" }
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                  <td style={{ padding: "16px 24px", fontWeight: 600 }}>{row.name}</td>
                  <td style={{ padding: "16px 24px" }}>
                    <span style={{ 
                      padding: "4px 12px", 
                      borderRadius: 100, 
                      fontSize: "0.75rem", 
                      fontWeight: 700, 
                      background: row.status === "Approved" ? "rgba(255,255,255,0.08)" : "rgba(234,179,8,0.1)", 
                      color: row.status === "Approved" ? "#fff" : "#fff",
                      border: row.status === "Approved" ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(234,179,8,0.2)"
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px", textAlign: "right", fontFamily: "var(--font-display)", color: "#fff", fontWeight: 700 }}>{row.pts}</td>
                  <td style={{ padding: "16px 24px", textAlign: "right", fontFamily: "var(--font-display)", fontWeight: 700 }}>{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "wallets" && (
        <WalletManager />
      )}

      {activeTab === "earnings" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
            <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>Total Claimed</div>
              <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff" }}>$1,450.00</div>
            </div>
            <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>Pending Approval</div>
              <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff" }}>$250.00</div>
            </div>
            <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>Total Earned REP</div>
              <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)" }}>5,200</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
            <div className="glass-panel" style={{ overflow: "hidden" }}>
              <h4 style={{ padding: "24px 24px 16px", margin: 0, fontSize: "1.1rem" }}>Reward History</h4>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(0,0,0,0.2)" }}>
                    <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase" }}>Campaign</th>
                    <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase" }}>Reward</th>
                    <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase" }}>Status</th>
                    <th style={{ padding: "12px 24px", textAlign: "right", fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "DeFi Protocol v1 Beta", amt: "$500 USDT", status: "Claimed", date: "Oct 12, 2023" },
                    { name: "EVM Load Test", amt: "$250 USDC", status: "Pending", date: "Nov 02, 2023" },
                    { name: "L2 Bridge Alpha", amt: "$700 USDT", status: "Claimed", date: "Sep 28, 2023" },
                    { name: "Governance Participation", amt: "200 REP", status: "Claimed", date: "Oct 05, 2023" }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                      <td style={{ padding: "16px 24px", fontWeight: 600 }}>{row.name}</td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{
                          padding: "4px 12px",
                          borderRadius: 100,
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "#fff",
                          fontFamily: "var(--font-display)",
                          whiteSpace: "nowrap"
                        }}>
                           {row.amt}
                        </span>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{ color: row.status === "Claimed" ? "var(--success)" : "var(--warning)", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: row.status === "Claimed" ? "var(--success)" : "var(--warning)" }}></span>
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: "16px 24px", textAlign: "right", color: "var(--muted)", fontSize: "0.85rem" }}>{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="glass-panel" style={{ padding: 32, borderTop: "2px solid var(--accent)", background: "rgba(10,20,32,0.6)" }}>
              <h4 style={{ margin: "0 0 16px 0", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Locked Rewards
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5, marginBottom: 24 }}>
                The following rewards are locked until the campaign verification phase completes.
              </p>
              <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                $250.00
              </div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600, letterSpacing: "0.05em" }}>
                Est. Release: 4 days
              </div>
              <button className="glass-button" style={{ marginTop: 32, width: "100%", padding: 16, borderRadius: 8, opacity: 0.5, cursor: "not-allowed", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--muted)", fontWeight: 600 }} disabled>
                Claim Rewards
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


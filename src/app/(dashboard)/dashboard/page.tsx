export const metadata = {
  title: "Dashboard — Voyage",
  description: "Your Voyage dashboard — stats, campaigns, and activity.",
}

export default function DashboardPage() {
  const stats = [
    { value: "#08", label: "Rank", icon: "", accent: "var(--warning)" },
    { value: "3,120", label: "Points", icon: "", accent: "var(--accent)" },
    { value: "92%", label: "Score", icon: "", accent: "var(--success)" },
    { value: "$450", label: "Pending", icon: "", accent: "#fff" },
  ]

  const campaigns = [
    { title: "DeFi Protocol v2", type: "Hybrid", time: "38h", reward: "$5,000 USDT", rewardType: "money", desc: "Test liquidity migration path and document findings.", participants: 482, urgent: true },
    { title: "Solana L3 Alpha", type: "Raffle", time: "5d", reward: "NFT Whitelist", rewardType: "nft", desc: "Bridge assets to devnet and complete 5 swaps.", participants: 1200, urgent: false },
    { title: "NFT Mint Bot Test", type: "Technical", time: "12h", reward: "OG Role", rewardType: "role", desc: "Stress test the NFT minting bot. Submit logs.", participants: 150, urgent: true },
    { title: "ZK Rollup Security Audit", type: "Security", time: "2d", reward: "$10,000", rewardType: "money", desc: "Review the new ZK circuits for potential vulnerabilities.", participants: 45, urgent: true },
    { title: "SocialFi Growth Campaign", type: "Social", time: "7d", reward: "Alpha Access", rewardType: "access", desc: "Create a thread explaining our new tokenomics model.", participants: 850, urgent: false },
    { title: "DEX Aggregator UI Bug Hunt", type: "QA", time: "48h", reward: "$500 Pool", rewardType: "money", desc: "Find UI/UX issues in the new mobile responsive design.", participants: 320, urgent: false },
  ]

  const activity = [
    { time: "10:42 AM", action: "Proof Accepted", detail: "L2 Load Test", reward: "+120 REP", color: "#fff" },
    { time: "09:15 AM", action: "Proof Submitted", detail: "DeFi Protocol v2 · Liquidity Migration", reward: null, color: "#fff" },
    { time: "Yesterday", action: "Reward Distributed", detail: "Wallet ending in 4x9A", reward: "$50 USDC", color: "#fff" },
    { time: "2 Days Ago", action: "Proof Accepted", detail: "Solana L3 Alpha", reward: "+50 REP", color: "#fff" },
  ]

  const entries = [
    { name: "DeFi Protocol v2", date: "Today", status: "Pending", score: "—", color: "#fff" },
    { name: "L2 Load Test", date: "Today", status: "Accepted", score: "98/100", color: "#fff" },
    { name: "Solana L3 Alpha", date: "Oct 12", status: "Accepted", score: "100/100", color: "#fff" },
    { name: "NFT Mint Bot", date: "Oct 10", status: "Accepted", score: "92/100", color: "#fff" },
  ]

  return (
    <div>
      {/* ─── HERO GREETING ─── */}
      <div style={{ marginBottom: 32, paddingTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: "1.9rem",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, var(--fg) 0%, var(--fg-light) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Good evening
            </h1>
            <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: "0.88rem" }}>
              Here&apos;s what&apos;s happening across your campaigns
            </p>
          </div>
          {/* Deadline pill */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 18px",
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: "var(--radius-md)",
          }}>
            <div style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
              animation: "pulse 2s ease-in-out infinite",
            }} />
            <div>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#fff" }}>
                Next deadline
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--fg)" }}>
                38h 14m
              </div>
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--muted)", maxWidth: 140, lineHeight: 1.3 }}>
              DeFi Protocol v2 — Liquidity Migration
            </div>
          </div>
        </div>
      </div>

      {/* ─── STAT CARDS ─── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 14,
        marginBottom: 28,
      }}>
        {stats.map((stat) => (
          <div key={stat.label} className="glass-panel" style={{
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Glow dot */}
            <div style={{
              position: "absolute",
              top: -20, right: -20,
              width: 60, height: 60,
              borderRadius: "50%",
              background: stat.accent,
              opacity: 0.06,
              filter: "blur(16px)",
            }} />
            <div style={{
              width: 42, height: 42,
              borderRadius: "var(--radius-sm)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              flexShrink: 0,
            }}>
              {stat.icon}
            </div>
            <div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 700,
                lineHeight: 1,
                color: "var(--fg)",
                marginBottom: 3,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--muted)",
              }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── SECONDARY STATS ROW ─── */}
      <div style={{
        display: "flex",
        gap: 20,
        marginBottom: 28,
        padding: "14px 0",
        borderBottom: "1px solid var(--border-subtle)",
      }}>
        {[
          { value: "24", label: "Campaigns Joined" },
          { value: "14", label: "Campaigns Won" },
          { value: "98%", label: "Approval Rate" },
          { value: "$2,450", label: "Total Earned" },
        ].map((s, i) => (
          <div key={s.label} style={{
            flex: 1,
            textAlign: "center",
            borderRight: i < 3 ? "1px solid var(--border-subtle)" : "none",
          }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--fg)",
              marginBottom: 2,
            }}>
              {s.value}
            </div>
            <div style={{
              fontSize: "0.65rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--muted)",
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ─── MAIN 2-COL GRID: CAMPAIGNS + ACTIVITY SIDEBAR ─── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        gap: 20,
        marginBottom: 24,
      }}>

        {/* ACTIVE CAMPAIGNS */}
        <div className="glass-panel" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{
            padding: "16px 22px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                width: 6, height: 6,
                borderRadius: "50%",
                background: "var(--success)",
                display: "inline-block",
              }} />
              <span className="section-title">Active Campaigns</span>
              <span style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "var(--muted)",
                background: "rgba(255,255,255,0.04)",
                padding: "2px 8px",
                borderRadius: 100,
                border: "1px solid var(--border)",
              }}>{campaigns.length}</span>
            </div>
            <a href="/campaigns" style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--muted)", textDecoration: "none" }}>View All →</a>
          </div>
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10, maxHeight: 440, overflowY: "auto", paddingRight: 10 }}>
            {campaigns.map((c) => (
              <div key={c.title} className="dense-card" style={{ marginBottom: 0, padding: "14px 16px", background: "#000000" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--fg)" }}>{c.title}</span>
                      {c.urgent && (
                        <span style={{
                          width: 6, height: 6,
                          borderRadius: "50%",
                          background: "var(--warning)",
                          boxShadow: "0 0 6px var(--warning)",
                          display: "inline-block",
                        }} />
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.4 }}>{c.desc}</p>
                  </div>
                  {/* Prize badge - uniform purple */}
                  <span style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    padding: "4px 12px",
                    borderRadius: 100,
                    flexShrink: 0,
                    marginLeft: 16,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                  }}>
                     {c.reward}
                  </span>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 10,
                  borderTop: "1px solid var(--border-subtle)",
                }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span className="dense-badge">{c.type}</span>
                    <span className={`dense-badge ${c.urgent ? "warning" : ""}`}>{c.time} left</span>
                    <span className="dense-badge">{c.participants >= 1000 ? `${(c.participants / 1000).toFixed(1)}k` : c.participants} joined</span>
                  </div>
                  <a href="/campaigns" className="glass-button" style={{
                    padding: "4px 14px",
                    fontSize: "0.75rem",
                    borderRadius: 6,
                    textDecoration: "none",
                    fontWeight: 600,
                  }}>Join →</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* ACTIVITY FEED */}
          <div className="glass-panel" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span className="section-title">Activity</span>
              <span style={{
                fontSize: "0.65rem",
                color: "var(--muted)",
                fontWeight: 500,
              }}>Last 48h</span>
            </div>
            <div style={{ padding: "4px 0" }}>
              {activity.map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "12px 20px",
                  borderBottom: i < activity.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  transition: "background 0.15s ease",
                }}>
                  {/* Dot indicator */}
                  <div style={{
                    width: 8, height: 8,
                    borderRadius: "50%",
                    background: item.color,
                    marginTop: 5,
                    flexShrink: 0,
                    boxShadow: `0 0 6px ${item.color}`,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--fg)" }}>{item.action}</span>
                      {item.reward && (
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: item.color }}>{item.reward}</span>
                      )}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{item.detail}</span>
                      <span style={{ fontSize: "0.65rem", color: "var(--muted)", fontWeight: 500 }}>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVE TASKS */}
          <div className="glass-panel" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{
              padding: "14px 20px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span className="section-title">Active Engagements</span>
              <a href="/engage" style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--muted)", textDecoration: "none" }}>View All →</a>
            </div>
            <div style={{ padding: "6px 16px 12px" }}>
              {[
                { task: "Follow @VoyageProtocol", type: "Social", status: "+10 REP", accent: true },
                { task: "Join Official Discord", type: "Community", status: "+10 REP", accent: true },
                { task: "Follow @satoshi", type: "Hall of Fame", status: "+10 REP", accent: false },
              ].map((item) => (
                <div key={item.task} style={{
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border-subtle)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.84rem", color: "var(--fg)" }}>{item.task}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{item.type}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "#fff" }}>{item.status}</span>
                      <a href="/engage" className="glass-button" style={{ padding: "4px 10px", fontSize: "0.7rem", borderRadius: 4, textDecoration: "none" }}>Go</a>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM ROW: ENTRIES + WINS ─── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
      }}>

        {/* RECENT ENTRIES */}
        <div className="glass-panel" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{
            padding: "14px 20px",
            borderBottom: "1px solid var(--border-subtle)",
          }}>
            <span className="section-title">Recent Entries</span>
          </div>
          <table className="dense-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((row) => (
                <tr key={row.name}>
                  <td style={{ fontWeight: 500 }}>{row.name}</td>
                  <td style={{ color: "var(--muted)" }}>{row.date}</td>
                  <td>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                    }}>
                      <span style={{
                        width: 6, height: 6,
                        borderRadius: "50%",
                        background: row.color,
                        display: "inline-block",
                      }} />
                      <span style={{ color: row.color, fontWeight: 600 }}>{row.status}</span>
                    </span>
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 600, fontFamily: "var(--font-display)" }}>{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* WINS */}
        <div className="glass-panel" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{
            padding: "14px 20px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="section-title">Wins</span>
              <span style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "#fff",
                background: "rgba(255,255,255,0.08)",
                padding: "2px 8px",
                borderRadius: 100,
                border: "1px solid rgba(167,139,250,0.2)",
              }}>3 prizes won</span>
            </div>
            <a href="/profile" style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--muted)", textDecoration: "none" }}>View All →</a>
          </div>
          <table className="dense-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Prize</th>
                <th style={{ textAlign: "right" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "L2 Bridge Alpha", prize: "$1,200 USDC", status: "Claimed" },
                { name: "Solana L3 Raffle", prize: "NFT Whitelist", status: "Claimed" },
                { name: "SocialFi Campaign", prize: "Alpha Access", status: "Claimed" },
                { name: "DeFi Protocol v1", prize: "OG Role", status: "Pending" },
              ].map((row) => (
                <tr key={row.name}>
                  <td style={{ fontWeight: 500 }}>{row.name}</td>
                  <td>
                    <span style={{
                      padding: "2px 10px",
                      borderRadius: 100,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#fff",
                    }}>
                       {row.prize}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <span style={{
                        width: 6, height: 6,
                        borderRadius: "50%",
                        background: row.status === "Claimed" ? "var(--success)" : "var(--warning)",
                        display: "inline-block",
                      }} />
                      <span style={{ color: row.status === "Claimed" ? "var(--success)" : "var(--warning)", fontWeight: 600 }}>{row.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}

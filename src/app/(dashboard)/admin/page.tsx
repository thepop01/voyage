"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import { ChainType } from "@/lib/contexts/WalletContext"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("campaigns")

  // Raffle form state
  const [raffleTitle, setRaffleTitle] = useState("")
  const [raffleDesc, setRaffleDesc]   = useState("")
  const [rafflePrize, setRafflePrize] = useState("")
  const [raffleWinners, setRaffleWinners] = useState("1")
  const [raffleDrawsIn, setRaffleDrawsIn] = useState("2 days")
  const [raffleChain, setRaffleChain] = useState<ChainType | "None">("None")
  const [raffleTwitter, setRaffleTwitter] = useState("")

  const handleCreateRaffle = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Raffle Created!\n\nTitle: ${raffleTitle}\nChain: ${raffleChain}\nPrize: ${rafflePrize}`)
    setRaffleTitle(""); setRaffleDesc(""); setRafflePrize("")
    setRaffleWinners("1"); setRaffleChain("None"); setRaffleTwitter("")
    setRaffleDrawsIn("2 days")
  }

  if (status === "loading") {
    return <div style={{ padding: 40, textAlign: "center", color: "var(--muted)" }}>Loading...</div>
  }

  // Double check client-side just in case
  if (!session?.user?.isAdmin) {
    redirect("/dashboard")
  }

  const tabs = [
    { id: "campaigns", label: "Manage Campaigns", icon: "" },
    { id: "create", label: "Create Campaign", icon: "" },
    { id: "submissions", label: "Review Submissions", icon: "✅" },
    { id: "raffles", label: "Manage Raffles", icon: "" },
    { id: "engage", label: "Manage Engage Tasks", icon: "" },
    { id: "announcements", label: "Manage Announcements", icon: "" },
    { id: "users", label: "Users & Access", icon: "" }
  ]

  return (
    <div style={{ paddingBottom: 100, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 40, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: 8, color: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "2rem" }}></span>
            Admin Command Center
          </h1>
          <p style={{ color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem", margin: 0 }}>
            Superuser Access Verified
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: 32 }}>
        {/* Sidebar Nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "16px 20px",
                background: activeTab === tab.id ? "rgba(220,38,38,0.1)" : "rgba(255,255,255,0.02)",
                border: activeTab === tab.id ? "1px solid rgba(220,38,38,0.3)" : "1px solid var(--border)",
                color: activeTab === tab.id ? "#fca5a5" : "var(--muted)",
                borderRadius: 12,
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s"
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="glass-panel" style={{ padding: 40, minHeight: 600 }}>
          
          {activeTab === "campaigns" && (
            <div>
              <h2 style={{ marginBottom: 24, fontSize: "1.5rem" }}>Active Campaigns</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { title: "DeFi Protocol v2", status: "Active", method: "Hybrid", entries: 142 },
                  { title: "Solana L3 Alpha", status: "Active", method: "Raffle", entries: 856 },
                  { title: "EVM Bridge Alpha", status: "Draft", method: "Hybrid", entries: 0 }
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px", background: "rgba(0,0,0,0.2)", borderRadius: 12, border: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 6 }}>{c.title}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", gap: 16 }}>
                        <span>Method: <span style={{ color: "var(--fg-light)" }}>{c.method}</span></span>
                        <span>Entries: <span style={{ color: "var(--fg-light)" }}>{c.entries}</span></span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700, background: c.status === "Active" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.1)", color: c.status === "Active" ? "#fff" : "var(--muted)" }}>
                        {c.status}
                      </span>
                      <button className="glass-button" onClick={() => alert("Edit functionality is currently mocked!")} style={{ padding: "6px 16px", borderRadius: 6, fontSize: "0.8rem" }}>Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "create" && (
            <div>
              <h2 style={{ marginBottom: 24, fontSize: "1.5rem" }}>Create New Campaign</h2>
              <form style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)", marginBottom: 8 }}>Campaign Title</label>
                  <input type="text" className="glass-input" placeholder="e.g. Protocol Stress Test" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)", marginBottom: 8 }}>Description</label>
                  <textarea className="glass-input" rows={4} placeholder="What do participants need to do?"></textarea>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)", marginBottom: 8 }}>Prize Name (e.g. $500 USDC, NFT Whitelist)</label>
                    <input type="text" className="glass-input" placeholder="Enter prize label..." />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)", marginBottom: 8 }}>Selection Method</label>
                    <select className="glass-input" style={{ width: "100%" }}>
                      <option value="hybrid" style={{ color: "var(--bg)" }}>Hybrid (Review + Points)</option>
                      <option value="raffle" style={{ color: "var(--bg)" }}>Raffle (Random)</option>
                      <option value="manual" style={{ color: "var(--bg)" }}>Manual Selection</option>
                      <option value="fcfs" style={{ color: "var(--bg)" }}>First Come First Serve</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)", marginBottom: 8 }}>Deadline</label>
                    <input type="datetime-local" className="glass-input" style={{ width: "100%" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "var(--muted)", marginBottom: 8 }}>Max Winners (Leave blank for unlimited)</label>
                    <input type="number" className="glass-input" placeholder="e.g. 50" />
                  </div>
                </div>
                <button type="button" className="glass-button" style={{ marginTop: 16, padding: "16px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, fontSize: "1rem", fontWeight: 700 }}>
                  Publish Campaign
                </button>
              </form>
            </div>
          )}

          {activeTab === "submissions" && (
            <div>
              <h2 style={{ marginBottom: 24, fontSize: "1.5rem" }}>Review Submissions</h2>
              <div style={{ color: "var(--muted)", textAlign: "center", padding: 60, border: "1px dashed var(--border)", borderRadius: 12 }}>
                No pending submissions requiring manual review.
              </div>
            </div>
          )}

          {activeTab === "raffles" && (
            <div>
              <h2 style={{ marginBottom: 8, fontSize: "1.5rem" }}>Create New Raffle</h2>
              <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: "0.85rem" }}>Create and publish a raffle for your community.</p>
              <form onSubmit={handleCreateRaffle} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Raffle Title</label>
                    <input type="text" value={raffleTitle} onChange={e => setRaffleTitle(e.target.value)} required placeholder="e.g. NFT Beta Access" className="glass-input" style={{ width: "100%" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>X (Twitter) Link</label>
                    <input type="url" value={raffleTwitter} onChange={e => setRaffleTwitter(e.target.value)} placeholder="https://x.com/project" className="glass-input" style={{ width: "100%" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</label>
                  <textarea value={raffleDesc} onChange={e => setRaffleDesc(e.target.value)} required placeholder="Describe the raffle requirements and details..." className="glass-input" style={{ width: "100%", minHeight: 100, resize: "vertical" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Prize Details</label>
                    <input type="text" value={rafflePrize} onChange={e => setRafflePrize(e.target.value)} required placeholder="e.g. 5,000 USDC" className="glass-input" style={{ width: "100%" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Number of Winners</label>
                    <input type="number" min="1" value={raffleWinners} onChange={e => setRaffleWinners(e.target.value)} required className="glass-input" style={{ width: "100%" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Duration</label>
                    <input type="text" value={raffleDrawsIn} onChange={e => setRaffleDrawsIn(e.target.value)} required placeholder="e.g. 2 days" className="glass-input" style={{ width: "100%" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Blockchain Requirement</label>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: 12 }}>If a chain is selected, users must link a wallet for this chain to enter.</p>
                  <select value={raffleChain} onChange={e => setRaffleChain(e.target.value as ChainType | "None")} className="glass-input" style={{ width: "100%", maxWidth: 300 }}>
                    <option value="None" style={{ color: "var(--bg)" }}>No Chain (Off-chain/Role reward)</option>
                    <option value="Ethereum" style={{ color: "var(--bg)" }}>Ethereum (ETH / ERC-20 / NFT)</option>
                    <option value="Solana" style={{ color: "var(--bg)" }}>Solana (SOL / SPL / NFT)</option>
                    <option value="Polygon" style={{ color: "var(--bg)" }}>Polygon (MATIC / ERC-20)</option>
                  </select>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid var(--border)", margin: "8px 0" }} />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 16 }}>
                  <button type="button" className="glass-button" style={{ padding: "12px 24px", color: "var(--fg-light)" }}>Save Draft</button>
                  <button type="submit" className="glass-button" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", padding: "12px 32px", fontWeight: 700 }}>Create Raffle</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <h2 style={{ marginBottom: 24, fontSize: "1.5rem" }}>User Management</h2>
              <div style={{ color: "var(--muted)", textAlign: "center", padding: 60, border: "1px dashed var(--border)", borderRadius: 12 }}>
                User access control module loading...
              </div>
            </div>
          )}

          {activeTab === "engage" && (
            <div>
              <h2 style={{ marginBottom: 24, fontSize: "1.5rem" }}>Manage Engage Tasks</h2>
              <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: "0.85rem" }}>Create and manage simple actions for users to earn reputation.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                {[
                  { title: "Follow @VoyageProtocol", reward: "+10 REP", type: "Twitter" },
                  { title: "Join Official Discord", reward: "+10 REP", type: "Discord" },
                  { title: "Share your first Campaign", reward: "+10 REP", type: "Twitter" }
                ].map((task, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px", background: "rgba(0,0,0,0.2)", borderRadius: 12, border: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 6 }}>{task.title}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", gap: 16 }}>
                        <span>Type: <span style={{ color: "var(--fg-light)" }}>{task.type}</span></span>
                        <span>Reward: <span style={{ color: "#fff" }}>{task.reward}</span></span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <button className="glass-button" onClick={() => alert("Edit task functionality is mocked!")} style={{ padding: "6px 16px", borderRadius: 6, fontSize: "0.8rem" }}>Edit</button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="glass-button" style={{ padding: "12px 24px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>
                + Add New Task
              </button>
            </div>
          )}

          {activeTab === "announcements" && (
            <div>
              <h2 style={{ marginBottom: 24, fontSize: "1.5rem" }}>Manage Announcements</h2>
              <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: "0.85rem" }}>Update the live ticker and cards shown on the Stats page.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                {[
                  { title: "Alpha Tester Badge distributed to Top 500", status: "Active" },
                  { title: "Season 1 Rewards are now live", status: "Active" },
                  { title: "New Solana integration is live", status: "Archived" }
                ].map((ann, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px", background: "rgba(0,0,0,0.2)", borderRadius: 12, border: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 6 }}>{ann.title}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                        Status: <span style={{ color: ann.status === "Active" ? "#fff" : "var(--muted)" }}>{ann.status}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <button className="glass-button" onClick={() => alert("Edit announcement functionality is mocked!")} style={{ padding: "6px 16px", borderRadius: 6, fontSize: "0.8rem" }}>Edit</button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="glass-button" style={{ padding: "12px 24px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>
                + New Announcement
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

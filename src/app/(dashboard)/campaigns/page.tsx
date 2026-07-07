"use client"
import { CampaignGrid } from "@/components/campaigns/CampaignGrid"

export default function CampaignsPage() {
  return (
    <div>
      {/* Header */}
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
              Explore Campaigns
            </h1>
            <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: "0.88rem" }}>
              Discover opportunities, earn rewards, and build your reputation
            </p>
          </div>
          {/* Campaign count */}
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
              background: "var(--success)",
              boxShadow: "0 0 8px var(--success)",
            }} />
            <div>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#fff" }}>
                Active now
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--fg)" }}>
                6 Campaigns
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {["All", "Active", "Ending Soon", "High Reward", "Raffle", "Hybrid"].map((filter, i) => (
          <button
            key={filter}
            className={i === 0 ? "dense-badge accent" : "dense-badge"}
            style={{
              cursor: "pointer",
              padding: "6px 14px",
              fontSize: "0.72rem",
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <CampaignGrid />
    </div>
  )
}

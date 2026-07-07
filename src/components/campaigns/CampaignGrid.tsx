"use client"

import { useState, useEffect } from "react"
import { CampaignCard } from "./CampaignCard"
import { getCampaigns } from "@/lib/actions/campaigns"

export function CampaignGrid() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const data = await getCampaigns()
      setCampaigns(data)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="glass-panel" style={{ padding: 0, overflow: "hidden", display: "flex", height: 140, opacity: 0.5 }}>
            <div style={{ width: 140, flexShrink: 0, background: "var(--surface)" }} />
            <div style={{ flex: 1, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ height: 16, width: "50%", background: "var(--surface)", borderRadius: 6 }} />
              <div style={{ height: 12, width: "30%", background: "var(--surface)", borderRadius: 6 }} />
              <div style={{ height: 10, width: "80%", background: "var(--surface)", borderRadius: 6 }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (campaigns.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: 16 }}></div>
        <h3 style={{ fontSize: "1.2rem", marginBottom: 8, color: "var(--fg)" }}>No campaigns active</h3>
        <p style={{ fontSize: "0.88rem" }}>Check back later for new opportunities.</p>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {campaigns.map(campaign => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  )
}

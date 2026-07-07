import Link from "next/link"

interface CampaignCardProps {
  campaign: any
}

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  hybrid:    { bg: "rgba(255,255,255,0.08)",  border: "rgba(255,255,255,0.15)",  text: "#fff" },
  raffle:    { bg: "rgba(255,255,255,0.08)",  border: "rgba(255,255,255,0.15)",  text: "#fff" },
  technical: { bg: "rgba(255,255,255,0.08)",  border: "rgba(255,255,255,0.15)",  text: "#fff" },
  manual:    { bg: "rgba(255,255,255,0.08)",  border: "rgba(255,255,255,0.15)",  text: "#fff" },
  fcfs:      { bg: "rgba(255,255,255,0.08)",  border: "rgba(255,255,255,0.15)",  text: "#fff" },
}

const bannerGradients = [
  "linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0.25) 100%)",
  "linear-gradient(135deg, rgba(167,139,250,0.35) 0%, rgba(16,185,129,0.2) 100%)",
  "linear-gradient(135deg, rgba(167,139,250,0.35) 0%, rgba(239,68,68,0.2) 100%)",
  "linear-gradient(135deg, rgba(167,139,250,0.35) 0%, rgba(236,72,153,0.2) 100%)",
  "linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0.2) 100%)",
  "linear-gradient(135deg, rgba(239,68,68,0.35) 0%, rgba(167,139,250,0.2) 100%)",
]

const bannerIcons = [
  `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4m0 14v4m11-11h-4M5 12H1m16.36-7.36l-2.83 2.83M7.46 16.54l-2.83 2.83m14.73 0l-2.83-2.83M7.46 7.46L4.63 4.63"/></svg>`,
  `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 8V5"/><circle cx="12" cy="3" r="2"/></svg>`,
  `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
  `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
]

function getTimeRemaining(endsAt: string): { label: string; urgent: boolean } {
  const diff = new Date(endsAt).getTime() - Date.now()
  if (diff <= 0) return { label: "Ended", urgent: false }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const urgent = diff < 48 * 60 * 60 * 1000
  if (days > 0) return { label: `${days}d ${hours}h left`, urgent }
  return { label: `${hours}h left`, urgent }
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const isClosed = campaign.status === 'closed'
  const isDraft = campaign.status === 'draft'
  const isActive = !isClosed && !isDraft
  const method = campaign.selection_method?.toLowerCase() || "hybrid"
  const colors = typeColors[method] || typeColors.hybrid
  const idx = typeof campaign.id === "string"
    ? campaign.id.charCodeAt(campaign.id.length - 1) % bannerGradients.length
    : 0
  const { label: timeLabel, urgent: isUrgent } = campaign.ends_at
    ? getTimeRemaining(campaign.ends_at)
    : { label: "TBD", urgent: false }

  return (
    <div className="glass-panel campaign-list-tile" style={{ padding: 0, overflow: "hidden", display: "flex" }}>

      {/* Square Thumbnail */}
      <div style={{
        width: 180,
        flexShrink: 0,
        background: campaign.banner_url ? `url('${campaign.banner_url}') center/cover` : bannerGradients[idx],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRight: "1px solid var(--border-subtle)",
      }}>
        {!campaign.banner_url && (
          <div
            style={{ color: "rgba(255,255,255,0.3)" }}
            dangerouslySetInnerHTML={{ __html: bannerIcons[idx] }}
          />
        )}
        {/* Status dot */}
        <div style={{
          position: "absolute",
          top: 10,
          left: 10,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#FBEFEF",
          boxShadow: "0 0 8px #fff",
        }} />
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: "18px 24px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        minWidth: 0,
      }}>

        {/* Main Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <h3 style={{
              margin: 0,
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--fg)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {campaign.title}
            </h3>
            {/* Type pill */}
            <span style={{
              flexShrink: 0,
              padding: "2px 9px",
              fontSize: "0.62rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              borderRadius: 100,
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              color: colors.text,
              whiteSpace: "nowrap",
            }}>
              {method.replace('_', ' ')}
            </span>
          </div>

          <p style={{
            margin: "0 0 0",
            fontSize: "0.8rem",
            color: "var(--muted)",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {campaign.description}
          </p>
        </div>

        {/* Stats strip */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          flexShrink: 0,
        }}>
          {/* Reward Pool */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.62rem", textTransform: "uppercase", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.05em", marginBottom: 6 }}>Prize</div>
            <div style={{
              padding: "3px 12px",
              borderRadius: 100,
              fontSize: "0.78rem",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              whiteSpace: "nowrap",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
            }}>
               {campaign.prize_name || (campaign.reward_pool ? `$${campaign.reward_pool}` : "TBD")}
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 36, background: "var(--border-subtle)" }} />

          {/* Time remaining */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.62rem", textTransform: "uppercase", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.05em", marginBottom: 3 }}>Ends</div>
            <div style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#fff",
              whiteSpace: "nowrap",
            }}>
              {timeLabel}
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 36, background: "var(--border-subtle)" }} />

          {/* Status */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.62rem", textTransform: "uppercase", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.05em", marginBottom: 3 }}>Status</div>
            <div style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#fff",
            }}>
              {isActive ? "Active" : isClosed ? "Closed" : "Draft"}
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/campaigns/${campaign.id}`}
            className="glass-button"
            style={{
              padding: "9px 22px",
              fontSize: "0.78rem",
              fontWeight: 700,
              borderRadius: 8,
              textDecoration: "none",
              whiteSpace: "nowrap",
              background: isActive ? "#fff" : undefined,
              color: isActive ? "#000" : undefined,
              border: isActive ? "none" : undefined,
              boxShadow: isActive ? "0 3px 12px rgba(255,255,255,0.15)" : undefined,
            }}
          >
            {isActive ? "View →" : isClosed ? "View Results" : "Preview"}
          </Link>
        </div>
      </div>
    </div>
  )
}

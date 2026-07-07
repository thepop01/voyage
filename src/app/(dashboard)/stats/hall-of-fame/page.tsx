"use client"
import Link from "next/link"

const VerifiedIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#fff"/>
  </svg>
)

const RepIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const WinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
)

// Data extended with images for all cards to match the requested design
const hallOfFameData = [
  {
    id: 1,
    type: "WINNER", typeEmoji: "", typecolor: "#fff", typeBg: "rgba(245, 158, 11, 0.12)", typeBorder: "rgba(245, 158, 11, 0.3)",
    user: "@alpha_dev", name: "Alex Devlin",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    message: "won the DeFi Protocol v2 campaign",
    prize: "$500 USDC",
    date: "June 14, 2026", rep: "15.8k", wins: "47",
    desc: "A visionary developer pushing the boundaries of decentralized finance protocols and smart contracts."
  },
  {
    id: 2,
    type: "GOAT", typeEmoji: "🌟", typecolor: "#fff", typeBg: "rgba(124, 58, 237, 0.15)", typeBorder: "rgba(139, 92, 246, 0.35)",
    user: "@crypto_king", name: "Kyrie Nakamura",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    message: "became the all-time highest REP holder with",
    prize: "15,800 REP",
    date: "June 12, 2026", rep: "15.8k", wins: "32",
    desc: "An elite strategist dominating the leaderboards through high-quality campaign submissions."
  },
  {
    id: 3,
    type: "GIFT", typeEmoji: "", typeColor: "#fff", typeBg: "rgba(244, 114, 182, 0.12)", typeBorder: "rgba(244, 114, 182, 0.3)",
    user: "@nft_whale", name: "Nadia Fontaine",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    message: "received a legendary Solana Alpha NFT whitelist as a surprise",
    prize: "Whitelist Spot",
    date: "June 10, 2026", rep: "11.2k", wins: "18",
    desc: "A prominent NFT collector and community builder focused on digital art and utility."
  },
  {
    id: 4,
    type: "STREAK", typeEmoji: "", typeColor: "#fff", typeBg: "rgba(251, 146, 60, 0.12)", typeBorder: "rgba(251, 146, 60, 0.3)",
    user: "@chain_runner", name: "Chen Ruiz",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    message: "completed 30 campaigns in a row and claimed a",
    prize: "VIP Role Access",
    date: "June 8, 2026", rep: "9.8k", wins: "12",
    desc: "Consistent contributor focused on steady growth and reliable high-quality execution."
  },
  {
    id: 5,
    type: "WINNER", typeEmoji: "", typecolor: "#fff", typeBg: "rgba(245, 158, 11, 0.12)", typeBorder: "rgba(245, 158, 11, 0.3)",
    user: "@dao_maker", name: "Dmitri Aoki",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    message: "won the Solana L3 Alpha raffle and earned",
    prize: "$1,000 USDC",
    date: "June 5, 2026", rep: "9.2k", wins: "10",
    desc: "DAO governance expert and active participant in the wider web3 ecosystem."
  },
]

export default function HallOfFamePage() {
  return (
    <div style={{ paddingBottom: 120 }}>
      {/* ── Page Header ── */}
      <div style={{ marginBottom: 48 }}>
        <Link href="/stats" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--muted)", textDecoration: "none", fontSize: "0.9rem", marginBottom: 24, transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "var(--muted)"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Back to Stats
        </Link>
        <h1 style={{ fontSize: "2.8rem", marginBottom: 10, letterSpacing: "-0.02em" }}>
          🏛️ Hall of Fame
        </h1>
        <p style={{ color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.8rem", margin: 0 }}>
          All-time memorable moments, top achievements & legendary drops
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 32 }}>
        {hallOfFameData.map((ann) => (
          <div key={ann.id} style={{ display: "flex", flexDirection: "column" }}>
            
            {/* The Badge above the card */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", color: ann.typeColor, padding: "4px 12px", borderRadius: 100, background: ann.typeBg, border: `1px solid ${ann.typeBorder}` }}>
                {ann.typeEmoji} {ann.type}
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{ann.date}</span>
            </div>

            {/* The Image Card (matching reference style) */}
            <div style={{ 
              flex: 1, background: "rgba(255,255,255,0.03)", 
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, overflow: "hidden",
              boxShadow: "0 24px 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column",
              transition: "transform 0.3s ease, box-shadow 0.3s ease", cursor: "pointer"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = `0 24px 40px ${ann.typeColor || "#fff"}33`
              e.currentTarget.style.borderColor = ann.typeColor || "#fff"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 24px 40px rgba(0,0,0,0.15)"
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
            }}>
              <div style={{ height: 280, position: "relative" }}>
                <img src={ann.image} alt={ann.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to top, rgba(15,23,42,1), transparent)" }} />
              </div>
              
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: "1.35rem", color: "#fff", fontWeight: 700 }}>{ann.name}</h3>
                  <VerifiedIcon />
                </div>
                <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.5, margin: "0 0 20px 0", flex: 1 }}>
                  {ann.desc}
                </p>
                
                {/* Stats Row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--fg-light)", fontSize: "0.9rem", fontWeight: 600 }}>
                      <RepIcon /> {ann.rep}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--fg-light)", fontSize: "0.9rem", fontWeight: 600 }}>
                      <WinIcon /> {ann.wins}
                    </div>
                  </div>
                  
                  {/* Action Button matching reference */}
                  <button style={{ 
                    padding: "6px 16px", borderRadius: 20, 
                    background: "rgba(255,255,255,0.1)", border: "none", 
                    color: "white", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
                    Follow +
                  </button>
                </div>
              </div>
            </div>

            {/* Achievement text below card */}
            <p style={{ color: "var(--fg-light)", fontSize: "0.95rem", margin: "16px 0 0 0", lineHeight: 1.6 }}>
              {ann.message} <span style={{ color: ann.typeColor, fontWeight: 700 }}>{ann.prize}</span>!
            </p>

          </div>
        ))}
      </div>
    </div>
  )
}

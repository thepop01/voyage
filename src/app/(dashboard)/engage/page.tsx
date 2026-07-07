export const metadata = {
  title: "Engage — Voyage",
  description: "Complete tasks to build reputation.",
}

export default function EngagePage() {
  return (
    <div>
      <div style={{ marginBottom: 64 }}>
        <h1 style={{ marginBottom: 8 }}>Engage</h1>
        <p style={{ color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Complete simple actions to build your reputation on Voyage
        </p>
      </div>

      <div className="split">
        <div>

          <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 16, marginTop: 0 }}>
            <div className="dense-card" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 24, marginBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
                <div>
                  <h4 style={{ marginBottom: 4 }}>Follow @VoyageProtocol</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: 0 }}>Stay updated with the latest news on X.</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <span style={{ color: "var(--accent)", fontWeight: "bold" }}>+10 REP</span>
                <button className="glass-button" style={{
                  padding: "4px 16px",
                  fontSize: "0.78rem",
                  borderRadius: 8,
                  fontWeight: 600,
                }}>Follow</button>
              </div>
            </div>

            <div className="dense-card" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 24, marginBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(88,101,242,0.1)", color: "#5865F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1569 2.419 0 1.3332-.946 2.4189-2.1569 2.4189z"/></svg>
                </div>
                <div>
                  <h4 style={{ marginBottom: 4 }}>Join Official Discord</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: 0 }}>Engage with the Voyage community.</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <span style={{ color: "var(--accent)", fontWeight: "bold" }}>+10 REP</span>
                <span className="dense-badge accent">Claimed</span>
              </div>
            </div>

            <div className="dense-card" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 24, marginBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
                <div>
                  <h4 style={{ marginBottom: 4 }}>Share your first Campaign</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: 0 }}>Retweet any active campaign from Voyage.</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <span style={{ color: "var(--accent)", fontWeight: "bold" }}>+10 REP</span>
                <button className="glass-button" style={{
                  padding: "4px 16px",
                  fontSize: "0.78rem",
                  borderRadius: 8,
                  fontWeight: 600,
                }}>Share</button>
              </div>
            </div>
          </div>
        </div>

        <aside>
          {/* HALL OF FAME */}
          <div className="dense-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.1))",
              padding: "24px 24px 16px 24px",
              borderBottom: "1px solid var(--border-subtle)"
            }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: 10, color: "#a855f7", marginBottom: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Hall of Fame
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: 0 }}>Follow our top reputation holders</p>
            </div>
            
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { name: "Satoshi Nakamoto", handle: "@satoshi", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Satoshi" },
                { name: "Vitalik Buterin", handle: "@VitalikButerin", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vitalik" },
                { name: "Anatoly Yakovenko", handle: "@aeyakovenko", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anatoly" },
              ].map((person, i) => (
                <div key={i} style={{ 
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 8,
                  border: "1px solid var(--border-subtle)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img 
                      src={person.image} 
                      alt={person.name}
                      style={{ 
                        width: 36, height: 36, borderRadius: "50%", 
                        objectFit: "cover",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.05)"
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{person.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{person.handle}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <span style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "0.7rem" }}>+10 REP</span>
                    <button className="glass-button" style={{
                      padding: "4px 12px",
                      fontSize: "0.7rem",
                      borderRadius: 6,
                    }}>Follow</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

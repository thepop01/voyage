"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

const navItems = [
  { name: "Dash", href: "/dashboard" },
  { name: "Campaign", href: "/campaigns" },
  { name: "Engage", href: "/engage" },
  { name: "Stats", href: "/leaderboard" },
  { name: "Raffle", href: "/raffle" },
]

export function Topbar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 28px",
      background: "transparent",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      {/* Left: Logo + Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "var(--fg)",
          }}>Voyage</h2>
        </Link>
        <input
          type="text"
          placeholder="Search campaigns..."
          style={{
            width: 240,
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border)",
            color: "var(--fg)",
            padding: "8px 14px",
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            borderRadius: "var(--radius-md)",
          }}
        />
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: 8 }}>
          <a href="#" aria-label="X / Twitter" className="glass-icon" style={{
            width: 34, height: 34, borderRadius: 10,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/>
            </svg>
          </a>
          <a href="#" aria-label="Discord" className="glass-icon" style={{
            width: 34, height: 34, borderRadius: 10,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.23 10.23 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Right: Nav + User */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {/* Navigation links removed, dock is used instead */}

        {/* Notification bell */}
        <button style={{
          background: "transparent",
          border: "none",
          padding: "6px",
          borderRadius: 8,
          cursor: "pointer",
          color: "var(--muted)",
          display: "flex",
          alignItems: "center",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>

        {/* User pill */}
        {session?.user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {session.user.isAdmin && (
              <Link href="/admin" style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#fff",
                fontFamily: "var(--font-display)",
                marginRight: 8
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Admin Panel
              </Link>
            )}
            <Link href="/profile" style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 10px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid var(--border)",
              borderRadius: 10,
            }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--fg)" }}>
                @{session.user.name?.toLowerCase().replace(/\s+/g, "_") || "user"}
              </span>
              <div style={{
                width: 26, height: 26,
                background: "var(--accent)",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {session.user.image ? (
                  <img src={session.user.image} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                )}
              </div>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "5px 10px",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--muted)",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              Log out
            </button>
          </div>
        ) : (
          <Link href="/login" style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 18px",
            background: "linear-gradient(135deg, rgba(124,58,237,0.5) 0%, rgba(109,40,217,0.6) 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 10,
            fontSize: "0.82rem",
            fontWeight: 700,
            color: "#fff",
            boxShadow: "0 2px 12px rgba(124,58,237,0.3)",
            letterSpacing: "0.01em",
          }}>
            Log in
          </Link>
        )}
      </div>
    </header>
  )
}

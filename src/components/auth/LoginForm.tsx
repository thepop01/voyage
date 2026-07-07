"use client"

import * as React from "react"
import { signIn } from "next-auth/react"

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState<string | null>(null)

  const handleOAuthLogin = async (provider: 'discord' | 'twitter') => {
    setIsLoading(provider)
    await signIn(provider, { callbackUrl: "/dashboard" })
  }

  return (
    <div style={{ 
      width: "100%", 
      maxWidth: 420, 
      margin: "0 auto", 
      padding: "48px 40px",
      textAlign: "center",
      background: "rgba(226, 232, 240, 0.4)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderRadius: "24px",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.3)"
    }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ 
          fontSize: "2rem", 
          fontWeight: 700,
          margin: "0 0 12px 0", 
          fontFamily: "var(--font-display, sans-serif)",
          color: "#ffffff",
          textShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          Log in to Voyage
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
          Choose a provider below to access your account
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <button 
          disabled={isLoading !== null}
          onClick={() => handleOAuthLogin('discord')}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: 12, 
            padding: "16px", 
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: 600,
            background: "rgba(255, 255, 255, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.5)",
            color: "#ffffff",
            opacity: isLoading !== null ? 0.7 : 1,
            cursor: isLoading !== null ? "not-allowed" : "pointer",
            transition: "all 0.2s"
          }}
        >
          {isLoading === 'discord' ? (
            <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", animation: "spin 1s linear infinite" }} />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.23 10.23 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
          )}
          Continue with Discord
        </button>

        <button 
          disabled={isLoading !== null}
          onClick={() => handleOAuthLogin('twitter')}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: 12, 
            padding: "16px", 
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: 600,
            background: "rgba(255, 255, 255, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.5)",
            color: "#ffffff",
            opacity: isLoading !== null ? 0.7 : 1,
            cursor: isLoading !== null ? "not-allowed" : "pointer",
            transition: "all 0.2s"
          }}
        >
          {isLoading === 'twitter' ? (
            <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", animation: "spin 1s linear infinite" }} />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>
          )}
          Continue with X (Twitter)
        </button>

        <div style={{ display: "flex", alignItems: "center", margin: "16px 0", color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255, 255, 255, 0.2)" }} />
          <span style={{ padding: "0 12px" }}>Or</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255, 255, 255, 0.2)" }} />
        </div>

        <button 
          disabled={isLoading !== null}
          onClick={() => {
            setIsLoading('credentials')
            signIn('credentials', { callbackUrl: "/dashboard" })
          }}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: 12, 
            padding: "16px", 
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: 700,
            background: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 20px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
            color: "#ffffff",
            opacity: isLoading !== null ? 0.7 : 1,
            cursor: isLoading !== null ? "not-allowed" : "pointer",
            transition: "all 0.2s"
          }}
        >
          {isLoading === 'credentials' ? (
            <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", animation: "spin 1s linear infinite" }} />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="#bfdbfe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          )}
          Test Login (Admin)
        </button>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        button:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        button:active:not(:disabled) {
          transform: translateY(0);
        }
      `}} />
    </div>
  )
}

"use client"
import { useState } from "react"
import { ChainType } from "@/lib/contexts/WalletContext"

export default function AdminRafflesPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [prize, setPrize] = useState("")
  const [winners, setWinners] = useState("1")
  const [drawsIn, setDrawsIn] = useState("2 days")
  const [chain, setChain] = useState<ChainType | "None">("None")
  const [twitterLink, setTwitterLink] = useState("")

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Raffle Created Successfully!\n\nTitle: ${title}\nChain: ${chain}\nPrize: ${prize}`)
    // Reset form
    setTitle("")
    setDescription("")
    setPrize("")
    setWinners("1")
    setChain("None")
    setTwitterLink("")
    setDrawsIn("2 days")
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 0" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--fg)", marginBottom: 8 }}>
        Raffle Management
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: 40 }}>Create and manage protocol raffles and rewards.</p>

      <div className="card" style={{ padding: 32 }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--fg)", marginBottom: 24, borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
          Create New Raffle
        </h2>

        <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Basic Info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Raffle Title
              </label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required 
                placeholder="e.g. NFT Beta Access" 
                className="glass-input" 
                style={{ width: "100%" }} 
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                X (Twitter) Link
              </label>
              <input 
                type="url" 
                value={twitterLink} 
                onChange={e => setTwitterLink(e.target.value)} 
                placeholder="https://x.com/project" 
                className="glass-input" 
                style={{ width: "100%" }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Description
            </label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              required 
              placeholder="Describe the raffle requirements and details..." 
              className="glass-input" 
              style={{ width: "100%", minHeight: 100, resize: "vertical" }} 
            />
          </div>

          {/* Reward Details */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Prize Details
              </label>
              <input 
                type="text" 
                value={prize} 
                onChange={e => setPrize(e.target.value)} 
                required 
                placeholder="e.g. 5,000 USDC" 
                className="glass-input" 
                style={{ width: "100%" }} 
              />
            </div>
            
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Number of Winners
              </label>
              <input 
                type="number" 
                min="1" 
                value={winners} 
                onChange={e => setWinners(e.target.value)} 
                required 
                className="glass-input" 
                style={{ width: "100%" }} 
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Duration
              </label>
              <input 
                type="text" 
                value={drawsIn} 
                onChange={e => setDrawsIn(e.target.value)} 
                required 
                placeholder="e.g. 2 days"
                className="glass-input" 
                style={{ width: "100%" }} 
              />
            </div>
          </div>

          {/* Blockchain Requirements */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-light)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Blockchain Requirement
            </label>
            <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: 12 }}>
              If a chain is selected, users will be required to select a linked wallet for this chain to enter the raffle.
            </p>
            <select 
              value={chain} 
              onChange={e => setChain(e.target.value as ChainType | "None")} 
              className="glass-input" 
              style={{ width: "100%", maxWidth: 300 }}
            >
              <option value="None" style={{ color: "var(--bg)" }}>No Chain (Off-chain/Role reward)</option>
              <option value="Ethereum" style={{ color: "var(--bg)" }}>Ethereum (ETH / ERC-20 / NFT)</option>
              <option value="Solana" style={{ color: "var(--bg)" }}>Solana (SOL / SPL / NFT)</option>
              <option value="Polygon" style={{ color: "var(--bg)" }}>Polygon (MATIC / ERC-20)</option>
            </select>
          </div>

          <hr style={{ border: "none", borderBottom: "1px solid var(--border)", margin: "8px 0" }} />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 16 }}>
            <button type="button" className="glass-button" style={{ padding: "12px 24px", color: "var(--fg-light)" }}>
              Save Draft
            </button>
            <button type="submit" className="glass-button" style={{ background: "#E6F2DD", color: "#000", padding: "12px 32px", fontWeight: 700, border: "none" }}>
              Create Raffle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

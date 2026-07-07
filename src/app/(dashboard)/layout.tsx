import { Topbar } from "@/components/layout/Topbar"
import { Dock } from "@/components/layout/Dock"
import { WalletProvider } from "@/lib/contexts/WalletContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
        {/* Background — deep dark navy with teal glow from bottom-left */}
        <div className="fixed inset-0 -z-10" style={{
          background: `
            radial-gradient(ellipse at 0% 100%, rgba(30,20,80,0.55) 0%, transparent 55%),
            radial-gradient(ellipse at 100% 0%,  rgba(20,15,60,0.4)  0%, transparent 60%),
            linear-gradient(160deg, #07111a 0%, #050d14 50%, #040b10 100%)
          `
        }} />

        {/* Topbar — no side borders */}
        <Topbar />

        {/* Side-bordered content area — centered like modern web apps (max-width 1280px) */}
        <div style={{
          flex: 1,
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
          borderLeft: "1px solid rgba(30,20,80,0.4)",
          borderRight: "1px solid rgba(30,20,80,0.4)",
        }}>
          <main style={{ padding: "12px 32px 120px 32px" }}>
            {children}
          </main>
        </div>

        <Dock />
      </div>
    </WalletProvider>
  )
}

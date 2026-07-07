import { Topbar } from "@/components/layout/Topbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col font-body">
      <Topbar />

      <div style={{ background: "rgba(239, 68, 68, 0.08)", borderBottom: "1px solid rgba(239, 68, 68, 0.2)", color: "#fff", textAlign: "center", padding: "6px", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        ⚠ Admin Mode Active
      </div>

      <main style={{ flex: 1, maxWidth: 960, margin: "0 auto", width: "100%", padding: "32px 24px" }}>
        {children}
      </main>
    </div>
  )
}

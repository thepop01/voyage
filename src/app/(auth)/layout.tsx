export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background gradients from prototype */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#e2e8f0] to-[#c8d6e5]"></div>
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] z-[-1] pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-[100px] z-[-1] pointer-events-none"></div>
      
      {children}
    </div>
  )
}

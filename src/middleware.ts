import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const user = req.nextauth.token as any

    // We can handle strict admin checks inside the app pages using requireAdmin()
    // but we can do a basic check here if isAdmin is available on the token
    if (isAdminRoute && user && user.isAdmin === false) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const pathname = req.nextUrl.pathname

        // Only admin requires login for now
        const requiresAuth = pathname.startsWith('/admin')

        if (requiresAuth) {
          return !!token
        }

        // Campaigns, leaderboard, tasks, alpha, tools, rewards — all public
        return true
      }
    }
  }
)

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      isAdmin?: boolean
      reputationScore?: number
      totalPoints?: number
    } & DefaultSession["user"]
  }

  interface User {
    id: string
  }
}

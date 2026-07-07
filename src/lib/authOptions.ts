import { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import TwitterProvider from "next-auth/providers/twitter"
import { createClient } from "@supabase/supabase-js"
import CredentialsProvider from "next-auth/providers/credentials"

// Bypass RLS with the service role key since we aren't using Supabase Auth
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder_key"
const supabase = createClient(supabaseUrl, supabaseKey)

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      version: "2.0",
    }),
    CredentialsProvider({
      name: "Dummy Admin",
      credentials: {},
      async authorize(credentials, req) {
        // Automatically return a mock admin user
        return {
          id: "dummy-admin-123",
          name: "Test Admin",
          email: "admin@voyage.local",
          image: "https://github.com/shadcn.png",
          isAdmin: true
        } as any
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!supabaseUrl || !supabaseKey) {
        console.warn("Supabase env vars missing, skipping DB sync")
        return true
      }

      try {
        if (account?.provider === "discord") {
          const { data, error } = await supabase
            .from('users')
            .upsert({
              discord_id: account.providerAccountId,
              username: user.name || (profile as any)?.username || 'user',
              avatar_url: user.image,
            }, { onConflict: 'discord_id' })
            .select()
            .single()

          if (error) throw error
          user.id = data.id
        } else if (account?.provider === "twitter") {
          const { data, error } = await supabase
            .from('users')
            .upsert({
              twitter_id: account.providerAccountId,
              username: user.name || (profile as any)?.data?.username || 'user',
              avatar_url: user.image,
            }, { onConflict: 'twitter_id' })
            .select()
            .single()

          if (error) throw error
          user.id = data.id
        } else if (user.id === "dummy-admin-123") {
          // Dummy admin login: mock it if DB is not available
          if (supabaseUrl === "https://placeholder.supabase.co") {
            console.log("Using mock DB for dummy admin")
            user.isAdmin = true
          } else {
            const { data, error } = await supabase
              .from('users')
              .upsert({
                id: "00000000-0000-0000-0000-000000000000",
                username: "Test Admin",
                is_admin: true,
                reputation_score: 9999,
                total_points: 9999
              }, { onConflict: 'id' })
              .select()
              .single()

            if (!error && data) {
               user.id = data.id
            } else {
               console.error("Error creating dummy admin user:", error)
            }
          }
        }
      } catch (error) {
        console.error("Error syncing user to DB:", error)
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        if ((user as any).isAdmin) {
          token.isAdmin = true
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        
        // If we mocked the admin in the token, pass it to session
        if (token.isAdmin || token.id === "dummy-admin-123") {
          session.user.isAdmin = true
          session.user.reputationScore = 9999
          session.user.totalPoints = 9999
        }
        
        if (supabaseUrl && supabaseKey && supabaseUrl !== "https://placeholder.supabase.co") {
          const { data } = await supabase
            .from('users')
            .select('is_admin, reputation_score, total_points')
            .eq('id', token.id)
            .single()
            
          if (data) {
            session.user.isAdmin = data.is_admin
            session.user.reputationScore = data.reputation_score
            session.user.totalPoints = data.total_points
          }
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  }
}

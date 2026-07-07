"use client"

import { LogOut, Settings, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"

export function UserMenu() {
  const router = useRouter()
  const { data: session } = useSession()
  const username = session?.user?.name || "User"

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm font-medium text-slate-700 mr-2">{username}</div>
      <Button variant="ghost" size="icon" onClick={() => router.push('/profile')} title="Profile">
        <User className="h-5 w-5 text-slate-600" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => router.push('/settings')} title="Settings">
        <Settings className="h-5 w-5 text-slate-600" />
      </Button>
      <Button variant="ghost" size="icon" onClick={handleSignOut} title="Log out">
        <LogOut className="h-5 w-5 text-red-600" />
      </Button>
    </div>
  )
}

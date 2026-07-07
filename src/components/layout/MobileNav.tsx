"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  navItems: { name: string; href: string }[]
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Prevent scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 bg-white/95 backdrop-blur-lg">
          <div className="relative z-20 grid gap-6 rounded-md bg-white/50 p-4 text-popover-foreground shadow-sm border border-white/20">
            <nav className="grid grid-flow-row auto-rows-max text-sm font-medium">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                    pathname.startsWith(item.href) ? "text-blue-600 bg-blue-50/50" : "text-slate-600"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="my-2 border-t border-slate-200"></div>
              <Link href="/profile" className="flex w-full items-center rounded-md p-2 text-sm font-medium text-slate-600 hover:underline" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
              <Link href="/settings" className="flex w-full items-center rounded-md p-2 text-sm font-medium text-slate-600 hover:underline" onClick={() => setIsOpen(false)}>
                Settings
              </Link>
              <button className="flex w-full items-center rounded-md p-2 text-sm font-medium text-red-600 hover:underline" onClick={() => setIsOpen(false)}>
                Log out
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

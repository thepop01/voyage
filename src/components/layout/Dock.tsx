"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

const dockItems = [
  {
    name: "Dash",
    href: "/dashboard",
    icon: (
      <svg className="dock-icon-3d" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="dash-g1" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="dash-g2" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <rect x="6" y="6" width="20" height="20" rx="6" fill="url(#dash-g1)" opacity="0.65" />
        <rect x="22" y="22" width="20" height="20" rx="6" fill="url(#dash-g2)" opacity="0.9" />
        <rect x="28" y="6" width="14" height="14" rx="5" fill="url(#dash-g1)" opacity="0.45" />
        <rect x="6" y="28" width="14" height="14" rx="5" fill="url(#dash-g2)" opacity="0.45" />
        <rect x="23" y="23" width="18" height="8" rx="4" fill="white" opacity="0.25" />
      </svg>
    ),
  },
  {
    name: "Campaign",
    href: "/campaigns",
    icon: <img className="dock-icon-3d" src="/campaign.png" alt="Campaign" />,
  },
  {
    name: "Engage",
    href: "/engage",
    icon: (
      <svg className="dock-icon-3d" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="tasks-g1" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <rect x="6" y="8" width="36" height="32" rx="10" fill="url(#tasks-g1)" opacity="0.8" />
        <rect x="10" y="10" width="28" height="12" rx="6" fill="white" opacity="0.2" />
        <polyline points="16,25 22,31 34,19" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95" />
      </svg>
    ),
  },
  {
    name: "Stats",
    href: "/stats",
    icon: (
      <svg className="dock-icon-3d" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="rank-g1" x1="0" y1="48" x2="0" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="rank-g2" x1="0" y1="48" x2="0" y2="0">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <rect x="6" y="26" width="10" height="16" rx="4" fill="url(#rank-g2)" opacity="0.6" />
        <rect x="19" y="12" width="10" height="30" rx="4" fill="url(#rank-g1)" opacity="0.85" />
        <rect x="32" y="20" width="10" height="22" rx="4" fill="url(#rank-g2)" opacity="0.65" />
        <rect x="20" y="13" width="8" height="8" rx="3" fill="white" opacity="0.25" />
      </svg>
    ),
  },
  {
    name: "Raffle",
    href: "/raffle",
    icon: (
      <svg className="dock-icon-3d" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="ticket-g1" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <path d="M8 14 h32 v6 a4 4 0 0 0 0 8 v6 h-32 v-6 a4 4 0 0 0 0 -8 v-6 z" fill="url(#ticket-g1)" opacity="0.85" />
        <path d="M14 18 h20 v12 h-20 z" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
        <path d="M 24 19 L 25.5 22 L 28.5 22.5 L 26.5 25 L 27 28.5 L 24 26.5 L 21 28.5 L 21.5 25 L 19.5 22.5 L 22.5 22 Z" fill="white" opacity="0.9" />
      </svg>
    ),
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <img className="dock-icon-3d" src="/profile.png" alt="Profile" />,
  },
]

export function Dock() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const items = [...dockItems]
  
  if (session?.user?.isAdmin) {
    items.push({
      name: "Admin",
      href: "/admin",
      icon: (
        <svg className="dock-icon-3d" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="admin-g1" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
          <rect x="6" y="8" width="36" height="32" rx="8" fill="url(#admin-g1)" opacity="0.85" />
          <path d="M16 24l4 4 12-12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 32H18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    })
  }

  return (
    <nav className="dock" role="navigation" aria-label="Main navigation">
      {items.map((item, index) => {
        const isActive = pathname.startsWith(item.href)
        return (
          <React.Fragment key={item.href}>
            <Link
              href={item.href}
              className={`dock-item ${isActive ? "active" : ""}`}
            >
              <div className="dock-icon-wrapper">
                <div className="dock-icon-bg" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="dock-icon-fg">
                  {item.icon}
                </div>
              </div>
              <span className="dock-label">{item.name}</span>
            </Link>
            {index < items.length - 1 && (
              <div className="dock-separator" aria-hidden="true" />
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

import { DollarSign, Trophy, Clock, CheckCircle2, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Earn | Voyage",
  description: "View your rewards, winnings, and earning history on Voyage.",
}

const mockRewards = [
  { campaign: "Polymarket Prediction Challenge", amount: 250, status: "claimable", date: "Jun 5, 2026", type: "winner" },
  { campaign: "X Engagement Raffle #12", amount: 50, status: "claimed", date: "May 28, 2026", type: "raffle" },
  { campaign: "NFT Alpha Campaign", amount: 100, status: "pending", date: "Jun 7, 2026", type: "winner" },
]

const statusStyle: Record<string, string> = {
  claimable: "bg-green-100 text-green-700",
  claimed: "bg-slate-100 text-slate-500",
  pending: "bg-yellow-100 text-yellow-700",
}

export default function RewardsPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Earn</h1>
        <p className="text-muted-foreground text-lg">Your rewards, winnings, and earning history.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Earned", value: "$400", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
          { label: "Campaigns Won", value: "3", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-100" },
          { label: "Pending Rewards", value: "$100", icon: Clock, color: "text-blue-600", bg: "bg-blue-100" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="backdrop-blur-md bg-white/40 border-white/20 shadow-xl">
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rewards list */}
      <Card className="backdrop-blur-md bg-white/40 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle>Reward History</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {mockRewards.map((r) => (
            <div key={r.campaign} className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-white/30 gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {r.status === "claimed" ? (
                  <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" />
                ) : (
                  <Trophy className="w-5 h-5 text-yellow-500 shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 truncate">{r.campaign}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-lg font-bold text-green-700">${r.amount}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyle[r.status]}`}>{r.status}</span>
                {r.status === "claimable" && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs">Claim</Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/20 backdrop-blur-md p-8 text-center">
        <h3 className="text-xl font-bold mb-2">Want to earn more?</h3>
        <p className="text-muted-foreground mb-6">Browse active campaigns and submit your entry to win from the prize pools.</p>
        <Link href="/campaigns">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Browse Campaigns <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

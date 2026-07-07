"use server"

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder_key"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function getCampaigns(filters?: { status?: string; type?: string }) {
  let query = supabase.from('campaigns').select(`
    *,
    creator:users(username, avatar_url)
  `)

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }
  
  if (filters?.type && filters.type !== 'all') {
    query = query.eq('selection_method', filters.type)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error || !data || data.length === 0) {
    if (error) console.error("Error fetching campaigns:", error)
    // Fallback to mock data for the UI
    return [
      {
        id: "mock-1",
        title: "DeFi Protocol v2",
        selection_method: "hybrid",
        status: "active",
        reward_pool: "5,000",
        prize_name: "$5,000 USDT",
        description: "Test liquidity migration path and document findings. High quality score required. Join us in shaping the next generation of DeFi.",
        ends_at: new Date(Date.now() + 38 * 60 * 60 * 1000).toISOString(),
        banner_url: null,
      },
      {
        id: "mock-2",
        title: "Solana L3 Alpha",
        selection_method: "raffle",
        status: "active",
        reward_pool: "2,000",
        prize_name: "NFT Whitelist",
        description: "Bridge assets to the devnet and complete 5 swaps to qualify for the raffle. We are testing the throughput of our new L3.",
        ends_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        banner_url: null,
      },
      {
        id: "mock-3",
        title: "NFT Mint Bot Test",
        selection_method: "technical",
        status: "active",
        reward_pool: "1,200",
        prize_name: "OG Discord Role",
        description: "Stress test the new NFT minting bot. Submit logs and latency reports. Early participants get a special discord role.",
        ends_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        banner_url: null,
      },
      {
        id: "mock-4",
        title: "ZK Rollup Security Audit",
        selection_method: "manual",
        status: "active",
        reward_pool: "10,000",
        prize_name: "$10,000 USDC",
        description: "Review the new ZK circuits for potential vulnerabilities. Looking for experienced auditors to find edge cases.",
        ends_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        banner_url: null,
      },
      {
        id: "mock-5",
        title: "SocialFi Growth Campaign",
        selection_method: "fcfs",
        status: "active",
        reward_pool: "500",
        prize_name: "Alpha Node Access",
        description: "Create a thread explaining our new tokenomics model. Best threads will be retweeted by the official account.",
        ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        banner_url: null,
      },
      {
        id: "mock-6",
        title: "EVM Bridge Alpha",
        selection_method: "hybrid",
        status: "draft",
        reward_pool: "3,000",
        prize_name: "Whitelist Spot",
        description: "Test the new cross-chain bridge before mainnet launch.",
        ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        banner_url: null,
      }
    ]
  }

  return data
}

export async function getCampaignById(id: string) {
  const { data, error } = await supabase
    .from('campaigns')
    .select(`
      *,
      creator:users(username, avatar_url)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error("Error fetching campaign:", error)
    return null
  }

  return data
}

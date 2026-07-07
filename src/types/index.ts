export interface User {
  id: string;
  username: string;
  avatar_url?: string;
  reputation_score: number;
  total_points: number;
  total_earned: number;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export type CampaignStatus = 'draft' | 'active' | 'closed';
export type SelectionType = 'admin_selection' | 'raffle' | 'hybrid';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  requirements?: string;
  banner_url?: string;
  reward_pool: number;
  status: CampaignStatus;
  selection_method: SelectionType;
  max_winners?: number;
  created_by: string;
  starts_at?: string;
  ends_at?: string;
  created_at: string;
}

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Submission {
  id: string;
  campaign_id: string;
  user_id: string;
  proof_url: string;
  x_username?: string;
  x_post_url?: string;
  status: SubmissionStatus;
  quality_score?: number;
  is_winner: boolean;
  reward_claimed: boolean;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  points_reward: number;
  is_daily: boolean;
  is_active: boolean;
  created_at: string;
}

export type WalletType = 'polymarket' | 'nft';

export interface TrackedWallet {
  id: string;
  user_id: string;
  address: string;
  type: WalletType;
  label?: string;
  alerts_enabled: boolean;
  created_at: string;
}

export type NotificationType = 'submission_approved' | 'winner_selected' | 'trade_alert' | 'mint_detected';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  link_url?: string;
  created_at: string;
}

export interface LeaderboardEntry {
  id: string;
  month: string;
  category: string;
  user_id: string;
  rank: number;
  score: number;
  created_at: string;
}

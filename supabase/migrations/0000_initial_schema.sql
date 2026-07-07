-- Initial Schema for Voyage Platform

-- 1. Users Table (Custom Auth)
CREATE TABLE public.users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  discord_id TEXT UNIQUE,
  twitter_id TEXT UNIQUE,
  username TEXT NOT NULL,
  avatar_url TEXT,
  reputation_score INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  total_earned NUMERIC DEFAULT 0,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: Since we are not using Supabase Auth, RLS policies using auth.uid() will not work natively. 
-- We will handle authorization at the application level (Next.js API/Server Actions).
-- Alternatively, if we use a custom JWT, we can pass it to Supabase. For now, we'll keep RLS off or bypass it via the Service Role key on the server.
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- 2. Campaigns Table
CREATE TYPE campaign_status AS ENUM ('draft', 'active', 'closed');
CREATE TYPE selection_type AS ENUM ('admin_selection', 'raffle', 'hybrid');

CREATE TABLE public.campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  banner_url TEXT,
  photo_urls TEXT[],
  reward_pool NUMERIC NOT NULL,
  status campaign_status DEFAULT 'draft',
  selection_method selection_type DEFAULT 'admin_selection',
  max_winners INTEGER,
  created_by UUID REFERENCES public.users(id),
  starts_at TIMESTAMP WITH TIME ZONE,
  ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.campaigns DISABLE ROW LEVEL SECURITY;

-- 3. Submissions Table
CREATE TYPE submission_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  proof_url TEXT NOT NULL, -- Screenshot URL
  x_username TEXT,
  x_post_url TEXT,
  status submission_status DEFAULT 'pending',
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  is_winner BOOLEAN DEFAULT FALSE,
  reward_claimed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(campaign_id, user_id)
);

ALTER TABLE public.submissions DISABLE ROW LEVEL SECURITY;

-- 4. Tasks Table (Daily/Global tasks)
CREATE TABLE public.tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  points_reward INTEGER NOT NULL DEFAULT 10,
  is_daily BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.tasks DISABLE ROW LEVEL SECURITY;

-- 5. User Tasks (Completion tracking)
CREATE TABLE public.user_tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(task_id, user_id, completed_at) -- Simplified daily uniqueness, logic in app
);

ALTER TABLE public.user_tasks DISABLE ROW LEVEL SECURITY;

-- 6. Tracked Wallets Table (Polymarket / NFT)
CREATE TYPE wallet_type AS ENUM ('polymarket', 'nft');

CREATE TABLE public.tracked_wallets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  type wallet_type NOT NULL,
  label TEXT,
  alerts_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, address)
);

ALTER TABLE public.tracked_wallets DISABLE ROW LEVEL SECURITY;

-- 7. Notifications Table
CREATE TYPE notification_type AS ENUM ('submission_approved', 'winner_selected', 'trade_alert', 'mint_detected');

CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.notifications DISABLE ROW LEVEL SECURITY;

-- 8. Leaderboard Snapshots (Monthly archives)
CREATE TABLE public.leaderboard_snapshots (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  month DATE NOT NULL, -- First day of the month (e.g. 2026-06-01)
  category TEXT NOT NULL, -- 'reputation', 'earnings', 'points', 'nft'
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  rank INTEGER NOT NULL,
  score NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(month, category, user_id)
);

ALTER TABLE public.leaderboard_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view leaderboard snapshots" ON public.leaderboard_snapshots FOR SELECT USING (TRUE);

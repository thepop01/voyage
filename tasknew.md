# Voyage Platform - Production Deployment Task Plan

> **Status**: Ready for Development Phase  
> **Last Updated**: 2026-06-07  
> **Prototype Status**: Complete (Static HTML/CSS)  
> **Target**: Production-ready web application with Supabase backend

---

## Executive Summary

This document outlines the complete deployment strategy for transforming the Voyage prototype into a production-ready web application. The prototype features are complete (campaigns, tasks, leaderboard, tools, alpha intelligence), and this plan focuses on:

1. **Technology Stack Selection** - Modern, scalable, and cost-effective
2. **Architecture Design** - Production-grade structure with security and performance
3. **Backend Integration** - Supabase for database, auth, storage, and real-time features
4. **Deployment Strategy** - Vercel hosting with CI/CD pipeline
5. **External API Integration** - Polymarket tracking, OpenSea NFT data, AI services

---

## 🏗️ Technology Stack Decision

### Frontend Framework: **Next.js 14 with App Router**

**Rationale:**
- ✅ **React-based**: Industry standard with massive ecosystem
- ✅ **Server Components**: Optimal performance with RSC (React Server Components)
- ✅ **TypeScript**: Type safety reduces bugs and improves developer experience
- ✅ **Vercel Deployment**: Zero-config deployment with edge functions
- ✅ **SEO Optimized**: Server-side rendering for better search engine visibility
- ✅ **Image Optimization**: Built-in image optimization for faster loads
- ✅ **File-based Routing**: Intuitive routing structure matching our prototype

**Alternatives Considered:**
- ❌ **Pure React (Vite)**: Lacks SSR, requires more infrastructure setup
- ❌ **SvelteKit**: Smaller ecosystem, less mature Supabase integration
- ❌ **Remix**: Good but smaller community and fewer Vercel optimizations


#### Task 7.1: Admin Components
- [ ] Create `AdminDashboardStats` component (total users, campaigns, submissions, rewards)
- [ ] Create `CampaignManagementTable` with CRUD actions
- [ ] Create `UserManagementTable` with ban/unban, adjust points/score
- [ ] Create `SubmissionReviewPanel` with approve/reject/score actions
- [ ] Create `WinnerSelectionInterface` for all 3 selection types:
  - Admin_Selection (manual checkbox selection)
  - Raffle (random selection button)
  - Hybrid_Selection (two-tier selection)
- [ ] Implement bulk actions for admin operations
- **Requirements:** R11 (Admin Dashboard), R4 (Submission Review), R5 (Winner Selection)
- **Estimated Time:** 10 hours

#### Task 7.2: Admin Pages & API
- [ ] Create `/admin/dashboard` page with platform stats
- [ ] Create `/admin/campaigns` page with management table
- [ ] Create `/admin/submissions` page with review panel
- [ ] Create `/admin/users` page with user management
- [ ] Create `/admin/winners` page with selection interface
- [ ] Implement admin-only middleware for all admin routes
- [ ] Create admin API endpoints for user management
- [ ] Implement winner selection API with notification triggers
- **Requirements:** R11 (Admin Dashboard), R5 (Winner Selection)
- **Estimated Time:** 8 hours

---

### Phase 8: Research Tools - Polymarket Integration (Week 5)

#### Task 8.1: Polymarket API Integration
- [ ] Research and document Polymarket API endpoints
- [ ] Create Polymarket API client (`lib/api/polymarket.ts`)
- [ ] Implement wallet tracking functions:
  - `getWalletPositions(address)` - fetch all open positions
  - `getWalletStats(address)` - calculate volume, ROI, win rate
  - `getTradeHistory(address)` - fetch recent trades
- [ ] Implement rate limiting and error handling
- [ ] Create data transformation utilities for API responses
- **Requirements:** R22 (Polymarket Multi-Wallet Tracking)
- **Estimated Time:** 8 hours

#### Task 8.2: Wallet Tracking Database
- [ ] Create `tracked_wallets` table schema
- [ ] Create `wallet_positions` table for storing open positions
- [ ] Create `trade_alerts` table for notifications
- [ ] Implement wallet tracking API endpoints:
  - POST `/api/polymarket/track` - add wallet
  - GET `/api/polymarket/wallets` - list tracked wallets
  - GET `/api/polymarket/wallets/[address]` - wallet details with positions
  - DELETE `/api/polymarket/wallets/[address]` - remove wallet
- [ ] Create Edge Function for periodic wallet data refresh
- **Requirements:** R22 (Polymarket Multi-Wallet Tracking)
- **Estimated Time:** 6 hours

#### Task 8.3: Polymarket UI Components
- [ ] Create `WalletCard` component showing stats (volume, ROI, win rate, multiplier)
- [ ] Create `WalletList` component for tracked wallets (up to 50)
- [ ] Create `AddWalletForm` component with address validation
- [ ] Create `TradeAlertsPanel` with real-time notifications
- [ ] Create `WalletDetailModal` with sortable positions table:
  - Sort by: Latest Trade, Highest Amount, Best ROI, Probability
- [ ] Create `PositionCard` component with P&L display
- [ ] Implement alert customization (new trades, large bets >$1K, wins/losses)
- **Requirements:** R22 (Polymarket Multi-Wallet Tracking)
- **Estimated Time:** 10 hours

---

### Phase 9: Research Tools - NFT Integration (Week 6)


### Backend & Database: **Supabase (PostgreSQL)**

**Rationale:**
- ✅ **PostgreSQL Database**: Production-grade relational database with excellent performance
- ✅ **Built-in Authentication**: Email/password, OAuth (Google, Twitter/X), magic links
- ✅ **Row-Level Security**: Database-level authorization for secure data access
- ✅ **Storage**: Built-in file storage for avatars, screenshots, campaign banners
- ✅ **Real-time Subscriptions**: WebSocket support for live updates (trades, notifications)
- ✅ **Generous Free Tier**: 500MB database, 1GB file storage, 50K monthly active users
- ✅ **Edge Functions**: Serverless functions for scheduled jobs and webhooks
- ✅ **Auto-generated APIs**: Instant REST and GraphQL APIs from database schema

**Alternatives Considered:**
- ❌ **Firebase**: NoSQL structure doesn't fit our relational data model well
- ❌ **MongoDB + Custom Auth**: More setup, no built-in RLS
- ❌ **AWS RDS + Lambda**: Higher complexity and cost

---

### Styling: **Tailwind CSS v4**

**Rationale:**
- ✅ **Already Used in Prototype**: `shared.css` converts easily to Tailwind utilities
- ✅ **Design System Ready**: Custom colors, glassmorphism effects map to Tailwind config
- ✅ **Responsive**: Mobile-first approach matches our requirements
- ✅ **Performance**: Purges unused CSS in production
- ✅ **Dark Mode**: Built-in dark mode support for future feature

**Component Library**: **shadcn/ui**
- ✅ **Headless UI + Radix**: Accessible components out of the box
- ✅ **Customizable**: Copy components into project, full control
- ✅ **TypeScript Native**: Perfect type safety
- ✅ **Tailwind Integration**: Seamless styling


---

### State Management: **Zustand + React Query (TanStack Query)**

**Rationale:**
- ✅ **Zustand**: Lightweight global state for UI (theme, notifications, modals)
- ✅ **React Query**: Server state management with caching, auto-refetch, optimistic updates
- ✅ **Minimal Boilerplate**: Less code than Redux, easier to maintain
- ✅ **TypeScript Support**: Excellent type inference

---

### Form Management: **React Hook Form + Zod**

**Rationale:**
- ✅ **React Hook Form**: Performant, minimal re-renders
- ✅ **Zod**: TypeScript-first schema validation
- ✅ **Type Safety**: End-to-end type safety from form → validation → API
- ✅ **Error Handling**: Built-in error management

---

### Deployment: **Vercel (Frontend) + Supabase (Backend)**

**Rationale:**
- ✅ **Vercel**: Made for Next.js, automatic deployments from GitHub
- ✅ **Edge Network**: Fast global CDN for static assets
- ✅ **Preview Deployments**: Every PR gets a preview URL
- ✅ **Zero Config**: Just connect GitHub repo
- ✅ **Free Tier**: Generous limits for MVP (100GB bandwidth, unlimited deployments)

**Domain & SSL:**
- ✅ Custom domain support (e.g., Voyage.app)
- ✅ Automatic SSL certificates
- ✅ DDoS protection included


#### Task 9.1: OpenSea API Integration
- [ ] Research and document OpenSea API endpoints
- [ ] Create OpenSea API client (`lib/api/opensea.ts`)
- [ ] Implement NFT tracking functions:
  - `getWalletMints(address)` - detect new mints
  - `getWhitelistStatus(address, collection)` - check whitelist
  - `getFloorPrice(collection)` - fetch current floor
  - `calculateInstantProfit(mintPrice, floorPrice)` - profit calculation
- [ ] Implement API key management and rate limiting
- [ ] Create webhook handler for real-time mint detection (if available)
- **Requirements:** R23 (NFT Multi-Wallet Tracker)
- **Estimated Time:** 7 hours

#### Task 9.2: NFT Tracking Database & API
- [ ] Create `nft_tracked_wallets` table
- [ ] Create `nft_mints` table with profit calculations
- [ ] Create `nft_whitelist_status` table for popular collections
- [ ] Implement NFT API endpoints:
  - POST `/api/nft/track` - add wallet for NFT tracking
  - GET `/api/nft/wallets` - list tracked NFT wallets
  - GET `/api/nft/mints` - live mint feed
  - GET `/api/nft/whitelist/[address]` - whitelist status
- [ ] Create Edge Function for periodic mint detection
- **Requirements:** R23 (NFT Multi-Wallet Tracker)
- **Estimated Time:** 5 hours

#### Task 9.3: NFT Tracking UI Components
- [ ] Create `NFTWalletCard` component with whitelist indicators (✓ ✗ ⏳)
- [ ] Create `LiveMintFeed` component showing recent mints with profit %
- [ ] Create `AddNFTWalletForm` component
- [ ] Create `WhitelistStatusPanel` for popular collections:
  - Pudgy Penguins, Azuki, Moonbirds, Doodles, BAYC, CryptoPunks, DeGods
- [ ] Create `NFTMintCard` component with instant profit display
- [ ] Implement auto-tracking settings toggle (mints, whitelist, floor price, drops)
- [ ] Show OpenSea API connection status indicator
- **Requirements:** R23 (NFT Multi-Wallet Tracker)
- **Estimated Time:** 8 hours

---

### Phase 10: Analytics Dashboard (Week 6)

#### Task 10.1: Analytics Data Aggregation
- [ ] Create analytics aggregation functions:
  - `getWalletOverviewStats()` - total wallets, volume, win rate, 24h P&L
  - `getTopPerformers()` - top 3 by 30d ROI
  - `getUnderperformingWallets()` - flagged wallets with losses
  - `getMarketInsights()` - most popular, highest volume, best ROI markets
  - `getNFTAnalytics()` - tracked wallets, mints detected, profitable rate
- [ ] Implement caching strategy for analytics data
- [ ] Create Edge Function for daily analytics snapshot
- **Requirements:** R24 (Analytics Dashboard)
- **Estimated Time:** 6 hours

#### Task 10.2: Analytics UI Components
- [ ] Create `AnalyticsDashboard` modal component (hidden by default)
- [ ] Create `OverviewStatsPanel` with key metrics
- [ ] Create `TopPerformersTable` with ROI display
- [ ] Create `UnderperformingWalletsList` with warning indicators
- [ ] Create `MarketInsightsPanel` with popular/volume/ROI leaders
- [ ] Create `NFTAnalyticsPanel` with mint stats
- [ ] Add "Analytics" button to Tools page
- [ ] Implement dashboard open/close toggle
- **Requirements:** R24 (Analytics Dashboard)
- **Estimated Time:** 7 hours

---

### Phase 11: Alpha Intelligence Page (Week 7)


---

### External APIs & Services

**Polymarket Integration:**
- 🔌 **Polymarket GraphQL API**: Real-time position tracking
- 🔌 **WebSocket**: Live trade updates
- **Cost**: Free (rate limits apply)

**NFT & OpenSea Integration:**
- 🔌 **OpenSea API v2**: NFT metadata, floor prices, whitelist status
- 🔌 **Alchemy/Infura**: Blockchain RPC for mint detection
- **Cost**: Free tier available (5M requests/month on Alchemy)

**AI & Market Intelligence:**
- 🔌 **Manual Curation**: Alpha content curated by admins (no API needed initially)
- 🔌 **Future**: Consider CoinGecko API, DeFiLlama API for market data

**Analytics & Monitoring:**
- 📊 **Vercel Analytics**: Built-in, free
- 📊 **Supabase Logs**: Query logs, error tracking
- 📊 **Sentry** (Optional): Advanced error tracking ($26/mo for 50K errors)

---

## 📐 Application Architecture

### High-Level System Design

```
┌─────────────────────────────────────────────────────────────┐
│                        Users/Browsers                        │
│                   (Desktop, Mobile, Tablet)                  │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Vercel Edge Network                     │
│         (CDN, SSL, DDoS Protection, Edge Functions)          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js 14 Application                     │
├─────────────────────────────────────────────────────────────┤
│  Server Components (RSC)    │    Client Components          │
│  - Page rendering           │    - Interactive UI           │
│  - Data fetching            │    - Forms & modals           │
│  - SEO optimization         │    - Real-time updates        │
├─────────────────────────────────────────────────────────────┤
│              API Routes & Server Actions                     │
│  - Business logic  - Validation  - Authorization            │
└──────────────────────────────┬──────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
      ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
      │  Supabase   │  │  Polymarket │  │  OpenSea    │
      │   Backend   │  │     API     │  │     API     │
      └─────────────┘  └─────────────┘  └─────────────┘
      │
      ├─ PostgreSQL Database (Users, Campaigns, Submissions)
      ├─ Supabase Auth (Email, OAuth)
      ├─ Supabase Storage (Avatars, Screenshots, Banners)
      ├─ Supabase Realtime (Live notifications, trade alerts)
      └─ Edge Functions (Scheduled jobs, webhooks)
```


#### Task 11.1: Alpha Content Management
- [ ] Create `alpha_articles` database table for dynamic content
- [ ] Create `alpha_agents` table for AI agent rankings
- [ ] Create `market_insights` table for Polymarket/NFT/DeFi updates
- [ ] Implement CMS-style API endpoints:
  - POST `/api/alpha/articles` - create/update articles (admin only)
  - GET `/api/alpha/articles` - fetch articles with pagination
  - GET `/api/alpha/agents` - fetch AI agent rankings
  - POST `/api/alpha/insights` - add market insight (admin only)
- [ ] Create seed data for initial AI agents (Claude, ChatGPT, Perplexity, Virtuals)
- **Requirements:** R21 (Alpha Intelligence Page)
- **Estimated Time:** 5 hours

#### Task 11.2: Alpha Page Components
- [ ] Create `AIAgentCard` component with rating display (out of 10)
- [ ] Create `AIAgentRankings` component for top 4 agents
- [ ] Create `SetupGuideSection` component with 3-step guide
- [ ] Create `PromptExamplesPanel` with bad vs good examples
- [ ] Create `MarketAlphaFeed` component for insights:
  - Polymarket volume analysis
  - NFT floor price predictions
  - Yield farming recommendations
  - Trading agent launches
- [ ] Create `TrendingTopics` component with timeline
- [ ] Create `AIMarketPulse` sidebar with metrics
- [ ] Create `QuickActions` component (Try Claude, Join Alpha Groups, etc.)
- **Requirements:** R21 (Alpha Intelligence Page)
- **Estimated Time:** 8 hours

#### Task 11.3: Alpha Page Implementation
- [ ] Create `/alpha` page route
- [ ] Implement featured guide section
- [ ] Integrate all alpha components
- [ ] Add navigation link to topbar
- [ ] Implement content refresh mechanism
- [ ] Optimize for SEO (meta tags, structured data)
- **Requirements:** R21 (Alpha Intelligence Page), R27 (Navigation)
- **Estimated Time:** 4 hours

---

### Phase 12: Tools Page Integration (Week 7)

#### Task 12.1: Tools Page Layout
- [ ] Create `/tools` page route
- [ ] Design 2-column layout (Polymarket left, NFT right)
- [ ] Create `ToolsHeader` with page title and analytics button
- [ ] Integrate `WalletList` and `NFTWalletCard` components
- [ ] Add "Add Wallet" buttons for both trackers
- [ ] Implement tab switching between Polymarket and NFT views (mobile)
- **Requirements:** R22, R23, R24, R27 (Navigation)
- **Estimated Time:** 5 hours

#### Task 12.2: Real-Time Updates
- [ ] Implement WebSocket connection for live trade alerts
- [ ] Create Supabase Realtime subscription for wallet updates
- [ ] Implement notification toast for new trades/mints
- [ ] Add sound alerts for large bets (>$1K) - optional toggle
- [ ] Create real-time position P&L updates
- [ ] Optimize WebSocket reconnection logic
- **Requirements:** R22 (Polymarket), R23 (NFT Tracking)
- **Estimated Time:** 6 hours

---

### Phase 13: Notifications System (Week 8)


---

### Project Structure

```
Voyage/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth routes group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx            # Auth layout (public)
│   │   ├── (dashboard)/              # Authenticated routes group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── campaigns/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── tasks/
│   │   │   │   └── page.tsx
│   │   │   ├── leaderboard/
│   │   │   │   └── page.tsx
│   │   │   ├── alpha/                # AI Intelligence
│   │   │   │   └── page.tsx
│   │   │   ├── tools/                # Research Tools
│   │   │   │   └── page.tsx
│   │   │   ├── rewards/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx            # Dashboard layout
│   │   ├── (admin)/                  # Admin routes group
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── campaigns/
│   │   │   │   ├── submissions/
│   │   │   │   ├── users/
│   │   │   │   └── winners/
│   │   │   └── layout.tsx            # Admin layout
│   │   ├── api/                      # API Routes (for webhooks, external)
│   │   │   └── webhooks/
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Landing page (index.html)
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── auth/
│   │   ├── campaigns/
│   │   ├── submissions/
│   │   ├── dashboard/
│   │   ├── leaderboard/
│   │   ├── alpha/                    # Alpha Intelligence components
│   │   ├── tools/                    # Research Tools components
│   │   ├── admin/
│   │   └── layout/                   # Topbar, Sidebar, Footer
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # Supabase browser client
│   │   │   ├── server.ts             # Supabase server client
│   │   │   └── middleware.ts         # Auth middleware
│   │   ├── actions/                  # Server Actions
│   │   │   ├── campaigns.ts
│   │   │   ├── submissions.ts
│   │   │   ├── tasks.ts
│   │   │   └── users.ts
│   │   ├── api/                      # External API clients
│   │   │   ├── polymarket.ts
│   │   │   └── opensea.ts
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── utils/                    # Utility functions
│   │   └── constants.ts
│   ├── types/
│   │   ├── database.ts               # Supabase generated types
│   │   └── index.ts                  # Custom types
│   └── styles/
│       └── globals.css               # Tailwind + custom CSS
├── supabase/
│   ├── migrations/                   # Database migrations
│   ├── functions/                    # Edge Functions
│   └── seed.sql                      # Seed data
├── public/
│   └── assets/                       # Static assets (images, icons)
├── .env.local                        # Environment variables
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```


#### Task 13.1: Notification Infrastructure
- [ ] Create notification service functions:
  - `createNotification(userId, type, title, message, link?)`
  - `getUserNotifications(userId, unreadOnly?)`
  - `markAsRead(notificationId)`
  - `markAllAsRead(userId)`
- [ ] Implement notification types:
  - submission_approved, submission_rejected
  - campaign_launched, winner_selected
  - reward_distributed, badge_earned
  - trade_alert, mint_detected
- [ ] Create notification API endpoints
- [ ] Implement notification triggers throughout application
- **Requirements:** R14 (Notification System)
- **Estimated Time:** 5 hours

#### Task 13.2: Notification UI
- [ ] Create `NotificationDropdown` component with unread badge
- [ ] Create `NotificationItem` component with type-specific icons
- [ ] Integrate dropdown into main navigation
- [ ] Implement mark as read on click
- [ ] Add "Mark all as read" button
- [ ] Implement real-time notification updates (polling or Realtime)
- [ ] Add notification sound (optional toggle)
- **Requirements:** R14 (Notification System)
- **Estimated Time:** 5 hours

---

### Phase 14: Navigation & Layout (Week 8)

#### Task 14.1: Main Navigation
- [ ] Create `TopNav` component with all links:
  - Dash, Campaign, Tasks, Stats, Earn, Alpha, Tools, Admin (conditional)
- [ ] Implement active page highlighting
- [ ] Add user menu dropdown (Profile, Settings, Logout)
- [ ] Integrate `NotificationDropdown`
- [ ] Add theme toggle button (dark/light)
- [ ] Style with glassmorphism design
- **Requirements:** R17 (Navigation), R27 (Navigation Updates)
- **Estimated Time:** 5 hours

#### Task 14.2: Responsive Navigation
- [ ] Create mobile hamburger menu
- [ ] Implement mobile navigation drawer
- [ ] Add touch-friendly button sizes
- [ ] Test navigation on all screen sizes (320px - 1920px+)
- [ ] Optimize navigation animations
- **Requirements:** R15 (Responsive UI), R17 (Navigation)
- **Estimated Time:** 4 hours

#### Task 14.3: Layout Wrappers
- [ ] Create `DashboardLayout` for authenticated pages
- [ ] Create `AuthLayout` for login/register pages
- [ ] Create `AdminLayout` for admin pages
- [ ] Implement consistent header/footer across layouts
- [ ] Add loading states for layout data fetching
- **Requirements:** R17 (Navigation)
- **Estimated Time:** 4 hours

---

### Phase 15: Theme System (Week 8)

#### Task 15.1: Theme Implementation
- [ ] Create `ThemeProvider` context with dark/light state
- [ ] Implement theme toggle function with localStorage persistence
- [ ] Configure Tailwind dark mode (class strategy)
- [ ] Apply dark mode styles to all components
- [ ] Create theme-aware color utilities
- [ ] Test theme switching across all pages
- **Requirements:** R16 (Theme System)
- **Estimated Time:** 5 hours

#### Task 15.2: Light Glassmorphism Preservation
- [ ] Ensure glassmorphism effects work in both themes
- [ ] Adjust opacity and blur for dark mode
- [ ] Test gradient backgrounds in both themes
- [ ] Maintain visual consistency across theme switch
- **Requirements:** R16 (Theme System)
- **Estimated Time:** 3 hours

---

### Phase 16: Rewards Page (Week 9)


---

## 🗄️ Database Schema (Supabase PostgreSQL)

### Core Tables

#### 1. **users** (extends Supabase auth.users)
```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url TEXT,
  bio TEXT,
  twitter_handle VARCHAR(50),
  discord_handle VARCHAR(50),
  
  -- Stats
  total_points INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0,
  reputation_points INTEGER DEFAULT 0,
  current_rank INTEGER,
  campaigns_completed INTEGER DEFAULT 0,
  campaigns_won INTEGER DEFAULT 0,
  total_earnings DECIMAL(12,2) DEFAULT 0,
  nft_portfolio_value DECIMAL(12,2) DEFAULT 0,
  approval_rate DECIMAL(5,2) DEFAULT 0,
  
  -- Settings
  theme_preference VARCHAR(10) DEFAULT 'light' CHECK (theme_preference IN ('light', 'dark')),
  email_notifications BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_reputation ON users(reputation_points DESC);
CREATE INDEX idx_users_total_earnings ON users(total_earnings DESC);
```

#### 2. **campaigns**
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  banner_url TEXT,
  
  -- Campaign config
  campaign_type VARCHAR(20) NOT NULL CHECK (campaign_type IN ('admin_selection', 'raffle', 'hybrid')),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed', 'archived')),
  
  -- Rewards
  reward_pool DECIMAL(12,2) NOT NULL,
  premium_prize_pool DECIMAL(12,2),      -- For hybrid
  secondary_prize_pool DECIMAL(12,2),    -- For hybrid
  
  -- Rules
  rules TEXT NOT NULL,
  requirements TEXT NOT NULL,
  number_of_winners INTEGER NOT NULL,
  
  -- Dates
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  
  -- Metadata
  participant_count INTEGER DEFAULT 0,
  submission_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_type ON campaigns(campaign_type);
CREATE INDEX idx_campaigns_end_date ON campaigns(end_date);
```


#### Task 16.1: Rewards Components
- [ ] Create `RewardCard` component showing campaign, amount, status (pending/claimed)
- [ ] Create `RewardsList` component with filtering (pending, claimed, all)
- [ ] Create `ClaimRewardButton` component with confirmation modal
- [ ] Create `TotalEarningsDisplay` component with USD total
- [ ] Implement reward status badges (Pending - yellow, Claimed - green, Sent - blue)
- **Requirements:** R5 (Winner Selection), R10 (Dashboard)
- **Estimated Time:** 5 hours

#### Task 16.2: Rewards Page & API
- [ ] Create `/rewards` page route (formerly `/raffle`)
- [ ] Create API endpoint `/api/rewards/[userId]`
- [ ] Implement reward claiming logic (update status to Reward_Sent)
- [ ] Add pagination for rewards list
- [ ] Create empty state for no rewards
- [ ] Update navigation link from "Raffle" to "Earn"
- **Requirements:** R5 (Winner Selection), R27 (Navigation Updates)
- **Estimated Time:** 4 hours

---

### Phase 17: Search & Filtering (Week 9)

#### Task 17.1: Global Search
- [ ] Create `SearchBar` component with debounced input
- [ ] Implement search API endpoint `/api/search`
- [ ] Add search functionality for campaigns (title, description)
- [ ] Add search functionality for users (username)
- [ ] Create `SearchResults` modal with categorized results
- [ ] Add keyboard shortcuts (Cmd+K / Ctrl+K)
- **Requirements:** R2 (Campaigns), R12 (Profiles)
- **Estimated Time:** 6 hours

#### Task 17.2: Advanced Filtering
- [ ] Create filter components for campaigns (type, status, date range)
- [ ] Create filter components for submissions (status, date)
- [ ] Create filter components for leaderboard (time period)
- [ ] Implement filter persistence in URL query params
- [ ] Add "Clear all filters" button
- **Requirements:** R2 (Campaigns), R3 (Submissions), R9 (Leaderboard)
- **Estimated Time:** 5 hours

---

### Phase 18: Performance Optimization (Week 9-10)

#### Task 18.1: Code Splitting & Lazy Loading
- [ ] Implement dynamic imports for heavy components (charts, modals)
- [ ] Configure Next.js code splitting for route-based bundles
- [ ] Lazy load images with Next.js `Image` component
- [ ] Implement infinite scroll pagination for lists
- [ ] Add loading skeletons for all async content
- **Requirements:** R20 (Performance)
- **Estimated Time:** 6 hours

#### Task 18.2: Caching Strategy
- [ ] Configure React Query cache times for different data types
- [ ] Implement SWR for frequently accessed data
- [ ] Set up Supabase query caching
- [ ] Add CDN caching headers for static assets
- [ ] Implement optimistic updates for user actions
- **Requirements:** R20 (Performance)
- **Estimated Time:** 5 hours

#### Task 18.3: Database Optimization
- [ ] Review and optimize all database queries
- [ ] Add missing indexes for performance
- [ ] Implement database query result caching (Redis or Supabase Cache)
- [ ] Optimize N+1 query problems with proper joins
- [ ] Test query performance under load
- **Requirements:** R20 (Performance), R18 (Database)
- **Estimated Time:** 5 hours

---

### Phase 19: Security Hardening (Week 10)


#### 3. **submissions**
```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Submission data
  x_username VARCHAR(100) NOT NULL,
  x_post_url TEXT NOT NULL,
  screenshot_urls TEXT[] NOT NULL,
  comment TEXT,
  
  -- Review
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'winner', 'reward_sent')),
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  points_earned INTEGER DEFAULT 0,
  score_earned INTEGER DEFAULT 0,
  reward_amount DECIMAL(12,2),
  
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(campaign_id, user_id)  -- One submission per campaign per user
);

CREATE INDEX idx_submissions_campaign ON submissions(campaign_id);
CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_submissions_status ON submissions(status);
```

#### 4. **tasks**
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  task_type VARCHAR(20) NOT NULL CHECK (task_type IN ('daily', 'social', 'community', 'referral', 'special')),
  
  points_reward INTEGER NOT NULL,
  verification_method VARCHAR(100),
  
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'expired')),
  expires_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tasks_type ON tasks(task_type);
CREATE INDEX idx_tasks_status ON tasks(status);
```

#### 5. **user_tasks** (completion tracking)
```sql
CREATE TABLE user_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, task_id)
);

CREATE INDEX idx_user_tasks_user ON user_tasks(user_id);
CREATE INDEX idx_user_tasks_completed ON user_tasks(completed);
```


#### 6. **tracked_wallets** (Research Tools)
```sql
CREATE TABLE tracked_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  wallet_address VARCHAR(42) NOT NULL,
  wallet_type VARCHAR(20) NOT NULL CHECK (wallet_type IN ('polymarket', 'nft')),
  
  -- Display settings
  nickname VARCHAR(100),
  notes TEXT,
  
  -- Alert preferences
  alert_new_trades BOOLEAN DEFAULT true,
  alert_large_bets BOOLEAN DEFAULT true,
  alert_wins_losses BOOLEAN DEFAULT true,
  alert_mints BOOLEAN DEFAULT true,
  
  -- Stats (cached)
  total_volume DECIMAL(12,2) DEFAULT 0,
  roi_30d DECIMAL(8,2) DEFAULT 0,
  win_rate DECIMAL(5,2) DEFAULT 0,
  avg_multiplier DECIMAL(5,2) DEFAULT 0,
  active_positions INTEGER DEFAULT 0,
  
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, wallet_address, wallet_type)
);

CREATE INDEX idx_tracked_wallets_user ON tracked_wallets(user_id);
CREATE INDEX idx_tracked_wallets_address ON tracked_wallets(wallet_address);
```

#### 7. **notifications**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  type VARCHAR(50) NOT NULL CHECK (type IN (
    'submission_approved', 'submission_rejected', 'campaign_launched',
    'winner_selected', 'reward_distributed', 'badge_earned',
    'wallet_trade', 'wallet_win', 'nft_mint'
  )),
  
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  
  read BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);
```

#### 8. **leaderboard_snapshots** (Monthly archives)
```sql
CREATE TABLE leaderboard_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  
  period VARCHAR(7) NOT NULL,  -- Format: YYYY-MM
  leaderboard_type VARCHAR(20) NOT NULL CHECK (leaderboard_type IN ('reputation', 'earnings', 'points', 'nft_holdings')),
  
  rank INTEGER NOT NULL,
  value DECIMAL(12,2) NOT NULL,
  
  campaigns_count INTEGER DEFAULT 0,
  change_7d DECIMAL(8,2) DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, period, leaderboard_type)
);

CREATE INDEX idx_leaderboard_period ON leaderboard_snapshots(period);
CREATE INDEX idx_leaderboard_type ON leaderboard_snapshots(leaderboard_type);
```


#### Task 19.1: API Security
- [ ] Implement rate limiting on all API routes (10-100 req/min based on endpoint)
- [ ] Add CORS configuration for production domain
- [ ] Implement request validation middleware with Zod
- [ ] Add API key authentication for external integrations
- [ ] Implement SQL injection prevention (parameterized queries)
- [ ] Add XSS protection headers
- **Requirements:** R1 (Authentication), R19 (File Upload Security)
- **Estimated Time:** 5 hours

#### Task 19.2: File Upload Security
- [ ] Implement file type validation (whitelist: jpg, png, gif, webp)
- [ ] Add file size limits (avatars: 5MB, screenshots: 10MB)
- [ ] Implement malware scanning (ClamAV or cloud service)
- [ ] Add image processing to strip EXIF data
- [ ] Implement secure file naming (UUID-based)
- [ ] Set up storage bucket policies to prevent hotlinking
- **Requirements:** R19 (File Upload Security)
- **Estimated Time:** 5 hours

#### Task 19.3: Authentication Security
- [ ] Implement password strength requirements (min 8 chars, special chars)
- [ ] Add account lockout after 5 failed login attempts
- [ ] Implement email verification for new accounts
- [ ] Add 2FA support (TOTP - optional enhancement)
- [ ] Implement secure session management with refresh tokens
- [ ] Add CSRF protection (verify Next.js built-in)
- **Requirements:** R1 (Authentication)
- **Estimated Time:** 6 hours

---

### Phase 20: Testing & Quality Assurance (Week 10-11)

#### Task 20.1: Unit Testing Setup
- [ ] Install testing dependencies: Vitest, Testing Library, MSW
- [ ] Configure test environment and mocks
- [ ] Create test utilities for Supabase and auth
- [ ] Write unit tests for utility functions
- [ ] Write unit tests for API routes
- [ ] Achieve 70%+ code coverage for critical paths
- **Requirements:** All
- **Estimated Time:** 8 hours

#### Task 20.2: Component Testing
- [ ] Write tests for authentication components
- [ ] Write tests for campaign components
- [ ] Write tests for dashboard components
- [ ] Write tests for form validation
- [ ] Test loading states and error handling
- [ ] Test responsive behavior
- **Requirements:** All
- **Estimated Time:** 10 hours

#### Task 20.3: Integration Testing
- [ ] Write E2E tests for user registration and login flow
- [ ] Write E2E tests for campaign participation flow
- [ ] Write E2E tests for admin submission review flow
- [ ] Write E2E tests for wallet tracking flow
- [ ] Test edge cases and error scenarios
- [ ] Use Playwright or Cypress for E2E tests
- **Requirements:** All
- **Estimated Time:** 10 hours

#### Task 20.4: Manual QA Testing
- [ ] Test all user flows on desktop (Chrome, Firefox, Safari)
- [ ] Test all user flows on mobile (iOS Safari, Android Chrome)
- [ ] Test responsive breakpoints (320px, 768px, 1024px, 1920px)
- [ ] Test theme switching across all pages
- [ ] Test accessibility with screen readers
- [ ] Document bugs and edge cases
- **Requirements:** R15 (Responsive), R16 (Theme)
- **Estimated Time:** 8 hours

---

### Phase 21: Deployment Preparation (Week 11)


---

## 🔐 Security & Authentication Strategy

### Row-Level Security (RLS) Policies

**users table:**
```sql
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Public profiles are viewable by all (username, avatar, stats only)
CREATE POLICY "Public profiles viewable" ON users
  FOR SELECT USING (true);

-- Admins can view and update all users
CREATE POLICY "Admins can manage users" ON users
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
```

**campaigns table:**
```sql
-- Everyone can view active campaigns
CREATE POLICY "Active campaigns viewable" ON campaigns
  FOR SELECT USING (status = 'active' OR auth.uid() IS NOT NULL);

-- Admins can create/update/delete campaigns
CREATE POLICY "Admins manage campaigns" ON campaigns
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
```

**submissions table:**
```sql
-- Users can view their own submissions
CREATE POLICY "Users view own submissions" ON submissions
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create submissions
CREATE POLICY "Users create submissions" ON submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view and manage all submissions
CREATE POLICY "Admins manage submissions" ON submissions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
```

**tracked_wallets table:**
```sql
-- Users can only manage their own tracked wallets
CREATE POLICY "Users manage own wallets" ON tracked_wallets
  FOR ALL USING (auth.uid() = user_id);
```

**notifications table:**
```sql
-- Users can only view and update their own notifications
CREATE POLICY "Users manage own notifications" ON notifications
  FOR ALL USING (auth.uid() = user_id);
```


#### Task 21.1: Environment Configuration
- [ ] Create `.env.production` file with production variables
- [ ] Configure Supabase production project
- [ ] Set up production database (run all migrations)
- [ ] Configure production storage buckets
- [ ] Set up production email templates
- [ ] Configure production API keys (Polymarket, OpenSea)
- [ ] Test production environment variables
- **Requirements:** All
- **Estimated Time:** 4 hours

#### Task 21.2: Vercel Deployment Setup
- [ ] Connect GitHub repository to Vercel
- [ ] Configure build settings and environment variables
- [ ] Set up custom domain and SSL
- [ ] Configure Vercel Edge Functions for scheduled jobs
- [ ] Set up preview deployments for pull requests
- [ ] Configure analytics and monitoring
- **Requirements:** R20 (Performance)
- **Estimated Time:** 3 hours

#### Task 21.3: Database Seeding
- [ ] Create seed script for admin user
- [ ] Create seed script for sample campaigns
- [ ] Create seed script for sample tasks
- [ ] Create seed script for AI agents (Alpha page)
- [ ] Create seed script for sample users (testing)
- [ ] Run seed scripts on production database
- **Requirements:** All
- **Estimated Time:** 4 hours

#### Task 21.4: Performance Monitoring
- [ ] Set up Vercel Analytics
- [ ] Configure Supabase monitoring and alerts
- [ ] Set up error tracking (Sentry or similar)
- [ ] Configure performance monitoring (Web Vitals)
- [ ] Set up uptime monitoring (UptimeRobot or similar)
- [ ] Create monitoring dashboard
- **Requirements:** R20 (Performance)
- **Estimated Time:** 4 hours

---

### Phase 22: Documentation & Launch (Week 12)

#### Task 22.1: User Documentation
- [ ] Create user guide for campaign participation
- [ ] Create guide for wallet tracking setup
- [ ] Create FAQ page
- [ ] Create help center with common issues
- [ ] Write terms of service
- [ ] Write privacy policy
- **Requirements:** All
- **Estimated Time:** 6 hours

#### Task 22.2: Developer Documentation
- [ ] Write README with setup instructions
- [ ] Document API endpoints (OpenAPI/Swagger)
- [ ] Document database schema and relationships
- [ ] Create contributing guidelines
- [ ] Document deployment process
- [ ] Create architecture diagram
- **Requirements:** All
- **Estimated Time:** 6 hours

#### Task 22.3: Admin Documentation
- [ ] Create admin guide for campaign management
- [ ] Create guide for submission review process
- [ ] Create guide for winner selection
- [ ] Document user management procedures
- [ ] Create troubleshooting guide
- **Requirements:** R11 (Admin Dashboard)
- **Estimated Time:** 4 hours

#### Task 22.4: Launch Preparation
- [ ] Perform final security audit
- [ ] Run full test suite on production environment
- [ ] Verify all integrations are working (Polymarket, OpenSea)
- [ ] Test email notifications
- [ ] Verify analytics tracking
- [ ] Create launch checklist
- [ ] Schedule launch date and time
- **Requirements:** All
- **Estimated Time:** 4 hours

---

## Post-Launch Tasks (Ongoing)


---

## 📋 Implementation Tasks

### Phase 1: Foundation & Setup (Week 1)

#### Task 1.1: Project Initialization
- [ ] Create new Next.js 14 project with TypeScript and App Router
  ```bash
  npx create-next-app@latest Voyage-app --typescript --tailwind --app
  ```
- [ ] Install core dependencies:
  - `@supabase/supabase-js` - Supabase client
  - `@supabase/ssr` - SSR utilities
  - `zustand` - State management
  - `@tanstack/react-query` - Server state
  - `react-hook-form` - Forms
  - `zod` - Validation
  - `lucide-react` - Icons
  - `date-fns` - Date utilities
  - `clsx` + `tailwind-merge` - Class merging
- [ ] Install shadcn/ui:
  ```bash
  npx shadcn-ui@latest init
  ```
- [ ] Configure `tailwind.config.ts` with custom colors from prototype:
  - Accent blue: `#3b82f6`
  - Success green: `#22c55e`
  - Muted grey: `#6b7280`
  - Light glassmorphism background gradients
- [ ] Set up folder structure as per architecture design
- [ ] Configure TypeScript paths (`@/components`, `@/lib`, etc.)

**Deliverable:** Empty Next.js project with all dependencies installed and configured

---

#### Task 1.2: Supabase Project Setup
- [ ] Create new Supabase project at [supabase.com](https://supabase.com)
- [ ] Copy project URL and anon key
- [ ] Create `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your-project-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
  ```
- [ ] Add `.env.example` template to repository
- [ ] Install Supabase CLI:
  ```bash
  npm install -g supabase
  supabase login
  supabase link --project-ref your-project-ref
  ```
- [ ] Initialize migrations:
  ```bash
  supabase migration new init_schema
  ```

**Deliverable:** Connected Supabase project with CLI configured


---

#### Task 1.3: Database Schema Implementation
- [ ] Create migration file: `supabase/migrations/001_init_schema.sql`
- [ ] Implement all core tables:
  - `users` (extends auth.users)
  - `campaigns`
  - `submissions`
  - `tasks`
  - `user_tasks`
  - `tracked_wallets`
  - `notifications`
  - `leaderboard_snapshots`
- [ ] Add indexes on frequently queried columns
- [ ] Add foreign key constraints with proper ON DELETE actions
- [ ] Run migration:
  ```bash
  supabase db push
  ```
- [ ] Generate TypeScript types:
  ```bash
  supabase gen types typescript --local > src/types/database.ts
  ```

**Deliverable:** Complete database schema deployed to Supabase

---

#### Task 1.4: Row-Level Security (RLS) Configuration
- [ ] Enable RLS on all tables:
  ```sql
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
  -- ... for all tables
  ```
- [ ] Create RLS policies for each table (see Security section above)
- [ ] Test policies with different user roles using Supabase dashboard
- [ ] Document RLS policies in `supabase/RLS_POLICIES.md`

**Deliverable:** Secure database with RLS policies active

---

#### Task 1.5: Supabase Storage Configuration
- [ ] Create storage buckets:
  - `avatars` (public, 5MB limit)
  - `screenshots` (authenticated, 10MB limit)
  - `campaign-banners` (admin only, 5MB limit)
- [ ] Configure bucket policies:
  ```sql
  -- avatars: public read, authenticated write
  CREATE POLICY "Avatar images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');
  
  CREATE POLICY "Anyone can upload an avatar"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
  ```
- [ ] Set up automatic image optimization (resize to 200x200 for avatars)
- [ ] Configure MIME type validation (only images allowed)

**Deliverable:** Three storage buckets configured with proper policies


### Phase 23: Monitoring & Optimization

#### Task 23.1: Performance Monitoring
- [ ] Monitor Core Web Vitals (LCP, FID, CLS)
- [ ] Track API response times
- [ ] Monitor database query performance
- [ ] Track error rates and types
- [ ] Analyze user behavior patterns
- [ ] Optimize based on metrics

#### Task 23.2: User Feedback Collection
- [ ] Implement feedback widget
- [ ] Create user survey
- [ ] Monitor support tickets
- [ ] Track feature requests
- [ ] Analyze user complaints
- [ ] Prioritize improvements

#### Task 23.3: A/B Testing (Optional)
- [ ] Set up A/B testing framework
- [ ] Test campaign card layouts
- [ ] Test dashboard widgets
- [ ] Test CTAs and button copy
- [ ] Analyze conversion rates
- [ ] Implement winning variants

---

## Optional Enhancements (Future Phases)

### Phase 24: Advanced Features
- [ ] **Social Features:** User following, activity feed, direct messaging
- [ ] **Gamification:** Achievements, streaks, daily bonuses
- [ ] **Mobile App:** React Native or PWA conversion
- [ ] **Advanced Analytics:** Custom dashboards, export reports
- [ ] **AI Integration:** ChatGPT integration for Alpha insights
- [ ] **Web3 Integration:** Wallet connect, NFT verification, token rewards
- [ ] **Referral System:** Referral codes, multi-tier rewards
- [ ] **Advanced Notifications:** Push notifications, email digests
- [ ] **Content Management:** Admin CMS for Alpha articles
- [ ] **API for Partners:** Public API with authentication

---

## Development Timeline Summary

| Phase | Duration | Focus Area |
|-------|----------|------------|
| 1 | Week 1 | Foundation & Setup |
| 2 | Week 1-2 | Database & API |
| 3 | Week 2 | Authentication & Users |
| 4 | Week 3 | Campaign System |
| 5 | Week 3-4 | Dashboard & Core Features |
| 6 | Week 4 | Leaderboard |
| 7 | Week 4-5 | Admin Dashboard |
| 8 | Week 5 | Polymarket Integration |
| 9 | Week 6 | NFT Integration |
| 10 | Week 6 | Analytics Dashboard |
| 11 | Week 7 | Alpha Intelligence |
| 12 | Week 7 | Tools Page Integration |
| 13 | Week 8 | Notifications |
| 14 | Week 8 | Navigation & Layout |
| 15 | Week 8 | Theme System |
| 16 | Week 9 | Rewards Page |
| 17 | Week 9 | Search & Filtering |
| 18 | Week 9-10 | Performance Optimization |
| 19 | Week 10 | Security Hardening |
| 20 | Week 10-11 | Testing & QA |
| 21 | Week 11 | Deployment Preparation |
| 22 | Week 12 | Documentation & Launch |

**Total Estimated Timeline:** 12 weeks (3 months)  
**With 1 developer:** ~480 hours of development work  
**With 2-3 developers:** Can reduce to 6-8 weeks with parallel work

---

## Risk Assessment & Mitigation

### Technical Risks

1. **API Integration Complexity (Polymarket/OpenSea)**
   - *Risk:* APIs may be undocumented, rate-limited, or unstable
   - *Mitigation:* Implement robust error handling, fallback data sources, caching

2. **Real-Time Performance**
   - *Risk:* WebSocket connections may be expensive at scale
   - *Mitigation:* Implement connection pooling, use Supabase Realtime efficiently

3. **Database Scalability**
   - *Risk:* Wallet tracking may generate large amounts of data
   - *Mitigation:* Implement data archival, optimize queries, use proper indexing

### Business Risks

1. **User Adoption**
   - *Risk:* Low initial user engagement
   - *Mitigation:* Focus on UX, implement referral program, create compelling campaigns

2. **Cost Scaling**
   - *Risk:* API costs and infrastructure may scale faster than revenue
   - *Mitigation:* Monitor costs closely, implement usage limits, optimize API calls

---

## Success Metrics

### Technical KPIs
- Page load time < 2 seconds (90th percentile)
- API response time < 500ms (95th percentile)
- Uptime > 99.5%
- Zero critical security vulnerabilities

### Business KPIs
- User registration rate
- Campaign participation rate
- Submission approval rate
- Daily active users (DAU)
- Wallet tracking adoption rate
- User retention (7-day, 30-day)

---

## Conclusion

This implementation plan provides a comprehensive roadmap for transforming the Voyage HTML/CSS prototype into a production-ready full-stack application. The plan prioritizes:

1. **Solid Foundation:** Proper setup, security, and architecture
2. **Core Features First:** Campaign system, authentication, dashboard
3. **Advanced Features:** Research tools, analytics, AI intelligence
4. **Quality & Performance:** Testing, optimization, security
5. **Successful Launch:** Documentation, monitoring, deployment

The modular approach allows for flexibility in prioritization and enables parallel development by multiple team members. Each task is actionable, time-estimated, and mapped to specific requirements from the requirements document.

**Ready to begin implementation!**


---

### Phase 2: Authentication & Core Components (Week 2)

#### Task 2.1: Supabase Client Configuration
- [ ] Create `src/lib/supabase/client.ts` (browser client):
  ```typescript
  import { createBrowserClient } from '@supabase/ssr'
  
  export const createClient = () =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  ```
- [ ] Create `src/lib/supabase/server.ts` (server client for Server Components):
  ```typescript
  import { createServerClient, type CookieOptions } from '@supabase/ssr'
  import { cookies } from 'next/headers'
  ```
- [ ] Create `src/lib/supabase/middleware.ts` for auth middleware
- [ ] Add middleware to `src/middleware.ts` for protected routes
- [ ] Create auth helper: `src/lib/auth.ts` with functions:
  - `getCurrentUser()` - Get current user from session
  - `requireAuth()` - Redirect if not authenticated
  - `requireAdmin()` - Redirect if not admin

**Deliverable:** Supabase client utilities ready for use

---

#### Task 2.2: Authentication UI Components
- [ ] Install shadcn/ui components:
  ```bash
  npx shadcn-ui@latest add button input label card form
  ```
- [ ] Create `src/components/auth/LoginForm.tsx`:
  - Email + password fields
  - React Hook Form + Zod validation
  - Error handling
  - "Forgot password?" link
  - Loading states
- [ ] Create `src/components/auth/RegisterForm.tsx`:
  - Username, email, password, confirm password fields
  - Username availability check
  - Password strength indicator
  - Terms acceptance checkbox
- [ ] Create `src/components/auth/PasswordResetForm.tsx`
- [ ] Create auth pages:
  - `src/app/(auth)/login/page.tsx`
  - `src/app/(auth)/register/page.tsx`
  - `src/app/(auth)/reset-password/page.tsx`
- [ ] Add OAuth providers (Google, Twitter/X) to login page

**Deliverable:** Complete authentication flow (email + OAuth)

---

#### Task 2.3: Layout Components
- [ ] Create `src/components/layout/Topbar.tsx`:
  - Logo + navigation links (Dashboard, Campaign, Tasks, Stats, Alpha, Tools, Earn)
  - User avatar dropdown (Profile, Settings, Logout)
  - Notifications dropdown
  - Mobile hamburger menu
  - Convert prototype's `.topbar` CSS to Tailwind
- [ ] Create `src/components/layout/MobileNav.tsx` for responsive menu
- [ ] Create `src/components/layout/UserMenu.tsx` dropdown
- [ ] Create authenticated layout: `src/app/(dashboard)/layout.tsx`
- [ ] Create admin layout: `src/app/(admin)/layout.tsx`
- [ ] Add active link highlighting logic

**Deliverable:** Complete navigation system matching prototype design


---

#### Task 2.4: TypeScript Types & Utilities
- [ ] Create `src/types/index.ts` with all interfaces:
  - `User`, `Campaign`, `Submission`, `Task`, `Notification`
  - `TrackedWallet`, `LeaderboardEntry`
  - Enum types: `CampaignType`, `SubmissionStatus`, etc.
- [ ] Create utility functions in `src/lib/utils.ts`:
  - `cn()` - Class name merger (clsx + tailwind-merge)
  - `formatCurrency()` - Format USD amounts
  - `formatDate()` - Format dates consistently
  - `truncateAddress()` - Shorten wallet addresses (0x1234...5678)
  - `calculateROI()` - Calculate ROI percentage
- [ ] Create validation schemas in `src/lib/validations/`:
  - `auth.ts` - Login, register schemas
  - `campaign.ts` - Campaign creation schema
  - `submission.ts` - Submission schema
  - `wallet.ts` - Wallet address validation

**Deliverable:** Type-safe utilities and validation schemas

---

### Phase 3: Campaign System (Week 3)

#### Task 3.1: Campaign Data Layer (Server Actions)
- [ ] Create `src/lib/actions/campaigns.ts`:
  - `getCampaigns()` - Fetch campaigns with filters (status, type, pagination)
  - `getCampaignById()` - Single campaign with participant count
  - `createCampaign()` - Admin only, validate dates and prize pools
  - `updateCampaign()` - Admin only
  - `deleteCampaign()` - Admin only, check for submissions
  - `endCampaign()` - Manually close campaign
- [ ] Add error handling with proper error messages
- [ ] Add revalidation tags for caching:
  ```typescript
  revalidateTag('campaigns')
  revalidateTag(`campaign-${id}`)
  ```

**Deliverable:** Complete campaign CRUD operations

---

#### Task 3.2: Campaign UI Components
- [ ] Create `src/components/campaigns/CampaignCard.tsx`:
  - Banner image (Next.js Image component with optimization)
  - Title, description (truncated)
  - Reward pool badge
  - End date countdown
  - Participant count
  - Status badge (Active, Closed)
  - Campaign type indicator (Admin, Raffle, Hybrid)
  - "View Details" button
  - Convert prototype's `.dense-card` to Tailwind
- [ ] Create `src/components/campaigns/CampaignGrid.tsx`:
  - Responsive grid (1 col mobile, 2 tablet, 3 desktop)
  - Loading skeletons
  - Empty state
- [ ] Create `src/components/campaigns/CampaignFilters.tsx`:
  - Status filter (All, Active, Closed)
  - Type filter (All, Admin Selection, Raffle, Hybrid)
  - Search by title
- [ ] Create `src/components/campaigns/CampaignDetail.tsx`:
  - Full campaign information
  - Rules and requirements sections
  - Prize pool breakdown (for hybrid)
  - Countdown timer to end date
  - "Submit Entry" button (if active and not submitted)
  - Show submission status if already submitted

**Deliverable:** Campaign browsing and detail views


---

#### Task 3.3: Campaign Pages
- [ ] Create `src/app/(dashboard)/campaigns/page.tsx`:
  - Fetch campaigns using React Query
  - Render CampaignGrid with filters
  - Add pagination
  - SEO metadata
- [ ] Create `src/app/(dashboard)/campaigns/[id]/page.tsx`:
  - Fetch single campaign (Server Component)
  - Render CampaignDetail
  - Show submission form if eligible
  - SEO metadata with Open Graph tags

**Deliverable:** Campaign listing and detail pages

---

### Phase 4: Submission System (Week 4)

#### Task 4.1: File Upload Utilities
- [ ] Create `src/lib/upload.ts`:
  - `uploadAvatar()` - Upload to avatars bucket, resize
  - `uploadScreenshots()` - Upload multiple files to screenshots bucket
  - `uploadBanner()` - Admin only, upload to campaign-banners bucket
  - `deleteFile()` - Delete from storage
  - Validate file size and type
  - Generate unique filenames (UUID + timestamp)
- [ ] Add image compression before upload (reduce file size)
- [ ] Add upload progress tracking

**Deliverable:** File upload utilities ready

---

#### Task 4.2: Submission Components
- [ ] Create `src/components/submissions/SubmissionForm.tsx`:
  - X username input
  - X post URL input with validation
  - Screenshot upload (drag & drop, multiple files, 1-5 images)
  - Optional comment textarea
  - Preview uploaded images
  - Form validation (React Hook Form + Zod)
  - Loading states and error handling
  - Success toast notification
- [ ] Create `src/components/submissions/SubmissionCard.tsx`:
  - Display submission info
  - Screenshot gallery
  - Status badge
  - Quality score (if approved)
  - Points and rewards earned
  - Timestamp
- [ ] Create `src/components/submissions/SubmissionStatusBadge.tsx`:
  - Color-coded badges: Pending (yellow), Approved (green), Rejected (red), Winner (purple)

**Deliverable:** Submission form and display components


- [ ] 1.1: Initialize Next.js 14 project with TypeScript
- [ ] 1.2: Install dependencies (Supabase, Tailwind, shadcn/ui, React Query, Zustand)
- [ ] 1.3: Configure Tailwind with glassmorphism design tokens from shared.css
- [ ] 1.4: Set up project structure (app/, components/, lib/, types/)
- [ ] 1.5: Copy assets from prototype to public/

**Task 2: Supabase Setup**
- [ ] 2.1: Create Supabase project
- [ ] 2.2: Configure environment variables (.env.local)
- [ ] 2.3: Install Supabase CLI and link project
- [ ] 2.4: Create storage buckets (avatars, screenshots, banners)

**Task 3: Database Schema**
- [ ] 3.1: Create migration file for all tables
- [ ] 3.2: Define users table (extends auth.users)
- [ ] 3.3: Define campaigns table with campaign_type and status
- [ ] 3.4: Define submissions table with screenshot URLs
- [ ] 3.5: Define tasks and user_tasks tables
- [ ] 3.6: Define tracked_wallets table (Polymarket/NFT)
- [ ] 3.7: Define notifications table
- [ ] 3.8: Define leaderboard_snapshots table
- [ ] 3.9: Add indexes for performance
- [ ] 3.10: Run migrations and generate TypeScript types

**Task 4: Row-Level Security**
- [ ] 4.1: Enable RLS on all tables
- [ ] 4.2: Create policies for users table
- [ ] 4.3: Create policies for campaigns table
- [ ] 4.4: Create policies for submissions table
- [ ] 4.5: Create policies for tracked_wallets table
- [ ] 4.6: Create policies for notifications table
- [ ] 4.7: Test RLS policies in Supabase dashboard

---

### WEEK 2: Authentication & Layout

**Task 5: Supabase Client Setup**
- [ ] 5.1: Create browser client (lib/supabase/client.ts)
- [ ] 5.2: Create server client (lib/supabase/server.ts)
- [ ] 5.3: Create auth middleware (middleware.ts)
- [ ] 5.4: Create auth helpers (getCurrentUser, requireAuth, requireAdmin)

**Task 6: Authentication UI**
- [ ] 6.1: Install shadcn/ui components (button, input, form, card)
- [ ] 6.2: Create LoginForm component with validation
- [ ] 6.3: Create RegisterForm component with username availability check
- [ ] 6.4: Create PasswordResetForm component
- [ ] 6.5: Create login page (app/(auth)/login/page.tsx)
- [ ] 6.6: Create register page (app/(auth)/register/page.tsx)
- [ ] 6.7: Add OAuth providers (Google, Twitter/X)

**Task 7: Layout Components**
- [ ] 7.1: Create Topbar component (Dashboard, Campaign, Tasks, Stats, Alpha, Tools, Earn)
- [ ] 7.2: Create UserMenu dropdown (Profile, Settings, Logout)
- [ ] 7.3: Create NotificationDropdown component
- [ ] 7.4: Create MobileNav for responsive menu
- [ ] 7.5: Create dashboard layout (app/(dashboard)/layout.tsx)
- [ ] 7.6: Create admin layout (app/(admin)/layout.tsx)
- [ ] 7.7: Add active link highlighting
- [ ] 7.8: Migrate glassmorphism styles to Tailwind classes

**Task 8: Core Utilities**
- [ ] 8.1: Define TypeScript types (User, Campaign, Submission, etc.)
- [ ] 8.2: Create utility functions (formatCurrency, formatDate, truncateAddress)
- [ ] 8.3: Create validation schemas with Zod (auth, campaign, submission)
- [ ] 8.4: Set up React Query client with default options
- [ ] 8.5: Set up Zustand stores (theme, notifications)

---

### WEEK 3: Campaign System

**Task 9: Campaign Data Layer**
- [ ] 9.1: Create Server Actions (lib/actions/campaigns.ts)
- [ ] 9.2: Implement getCampaigns() with filters and pagination
- [ ] 9.3: Implement getCampaignById() with participant count
- [ ] 9.4: Implement createCampaign() (admin only)
- [ ] 9.5: Implement updateCampaign() (admin only)
- [ ] 9.6: Implement deleteCampaign() (admin only)
- [ ] 9.7: Add error handling and revalidation

**Task 10: Campaign Components**
- [ ] 10.1: Create CampaignCard component (banner, title, reward, countdown)
- [ ] 10.2: Create CampaignGrid component (responsive grid)
- [ ] 10.3: Create CampaignFilters component (status, type, search)
- [ ] 10.4: Create CampaignDetail component (full info, rules)
- [ ] 10.5: Create CampaignStatusBadge component
- [ ] 10.6: Create CampaignTypeIndicator component
- [ ] 10.7: Add loading skeletons and empty states

**Task 11: Campaign Pages**
- [ ] 11.1: Create campaigns listing page (app/(dashboard)/campaigns/page.tsx)
- [ ] 11.2: Create campaign detail page (app/(dashboard)/campaigns/[id]/page.tsx)
- [ ] 11.3: Add SEO metadata and Open Graph tags
- [ ] 11.4: Implement pagination
- [ ] 11.5: Add search functionality

---

### WEEK 4: Submission System

**Task 12: File Upload**
- [ ] 12.1: Create upload utilities (lib/upload.ts)
- [ ] 12.2: Implement uploadScreenshots() with validation
- [ ] 12.3: Implement uploadAvatar() with image resizing
- [ ] 12.4: Implement uploadBanner() (admin only)
- [ ] 12.5: Add file size and type validation
- [ ] 12.6: Add upload progress tracking

**Task 13: Submission Components**
- [ ] 13.1: Create SubmissionForm component (X username, post URL, screenshots)
- [ ] 13.2: Add drag-and-drop file upload
- [ ] 13.3: Add image preview before upload
- [ ] 13.4: Create SubmissionCard component
- [ ] 13.5: Create SubmissionStatusBadge component
- [ ] 13.6: Create SubmissionGallery component for screenshots
- [ ] 13.7: Add form validation with Zod

**Task 14: Submission Data Layer**
- [ ] 14.1: Create Server Actions (lib/actions/submissions.ts)
- [ ] 14.2: Implement createSubmission() with file uploads
- [ ] 14.3: Implement getSubmissions() with filters
- [ ] 14.4: Implement updateSubmissionStatus() (admin only)
- [ ] 14.5: Implement assignScore() (admin only)
- [ ] 14.6: Add one submission per campaign per user validation

**Task 15: Admin Review**
- [ ] 15.1: Create SubmissionReviewPanel component
- [ ] 15.2: Add approve/reject buttons
- [ ] 15.3: Add score assignment (0-100 range)
- [ ] 15.4: Create admin submissions page (app/(admin)/submissions/page.tsx)
- [ ] 15.5: Add filtering by status

---

### WEEK 5: Dashboard & Core Features

**Task 16: Dashboard Components**
- [ ] 16.1: Create DashboardStats component (points, score, rank, wins)
- [ ] 16.2: Create ActiveCampaignsWidget component
- [ ] 16.3: Create RecentEntry component (renamed from Recent Submissions)
- [ ] 16.4: Create WinsSection component (recent victories)
- [ ] 16.5: Remove Reputation Tier card (as per requirements)
- [ ] 16.6: Create RecentActivityFeed component
- [ ] 16.7: Add real-time updates with React Query polling

**Task 17: Dashboard Page**
- [ ] 17.1: Create dashboard page (app/(dashboard)/dashboard/page.tsx)
- [ ] 17.2: Implement grid layout (responsive)
- [ ] 17.3: Fetch user stats from database
- [ ] 17.4: Add loading states
- [ ] 17.5: Set as default page after login

**Task 18: Points & Score System**
- [ ] 18.1: Create Server Actions (lib/actions/points.ts)
- [ ] 18.2: Implement awardPoints() with transaction logging
- [ ] 18.3: Implement assignScore() with range validation (0-100)
- [ ] 18.4: Create database functions for automatic updates
- [ ] 18.5: Integrate points into task completion
- [ ] 18.6: Integrate score into submission approval
- [ ] 18.7: Create audit trail tables (point_transactions, score_transactions)

**Task 19: Task System**
- [ ] 19.1: Create Server Actions (lib/actions/tasks.ts)
- [ ] 19.2: Implement getTasks() with filtering
- [ ] 19.3: Implement completeTask() with points reward
- [ ] 19.4: Create TaskCard component
- [ ] 19.5: Create TaskList component with category filters
- [ ] 19.6: Create tasks page (app/(dashboard)/tasks/page.tsx)
- [ ] 19.7: Add task completion status indicators
- [ ] 19.8: Create Edge Function for daily task reset

---

### WEEK 6: Leaderboard & Profile

**Task 20: Leaderboard System**
- [ ] 20.1: Create Server Actions (lib/actions/leaderboard.ts)
- [ ] 20.2: Implement calculateRankings() for 4 categories
- [ ] 20.3: Create LeaderboardTable component with tabs
- [ ] 20.4: Create LeaderboardEntry component
- [ ] 20.5: Implement reputation leaderboard (REP points)
- [ ] 20.6: Implement earnings leaderboard (Amount Won USD)
- [ ] 20.7: Implement points leaderboard (Total Points)
- [ ] 20.8: Implement NFT holdings leaderboard (Portfolio Value)
- [ ] 20.9: Add current user highlighting
- [ ] 20.10: Add 7-day change indicators
- [ ] 20.11: Create leaderboard page (app/(dashboard)/leaderboard/page.tsx)
- [ ] 20.12: Add pagination
- [ ] 20.13: Create Edge Function for monthly reset

**Task 21: Profile System**
- [ ] 21.1: Create ProfileHeader component (avatar, username, bio, social links)
- [ ] 21.2: Create ProfileStats component (rank, reputation, approval rate)
- [ ] 21.3: Create SubmissionHistory component
- [ ] 21.4: Create AvatarUpload component with preview
- [ ] 21.5: Remove badges section (as per requirements)
- [ ] 21.6: Create profile page (app/(dashboard)/profile/[id]/page.tsx)
- [ ] 21.7: Implement edit mode for own profile
- [ ] 21.8: Create Server Actions (lib/actions/users.ts)
- [ ] 21.9: Implement updateProfile()

---

### WEEK 7: Research Tools (Polymarket)

**Task 22: Polymarket API Integration**
- [ ] 22.1: Research Polymarket API endpoints
- [ ] 22.2: Create Polymarket client (lib/api/polymarket.ts)
- [ ] 22.3: Implement getWalletPositions(address)
- [ ] 22.4: Implement getWalletStats(address) - volume, ROI, win rate
- [ ] 22.5: Implement getTradeHistory(address)
- [ ] 22.6: Add rate limiting and error handling
- [ ] 22.7: Create data transformation utilities

**Task 23: Wallet Tracking Database**
- [ ] 23.1: Create Server Actions (lib/actions/wallets.ts)
- [ ] 23.2: Implement addTrackedWallet()
- [ ] 23.3: Implement getTrackedWallets()
- [ ] 23.4: Implement removeTrackedWallet()
- [ ] 23.5: Implement updateWalletStats()
- [ ] 23.6: Create Edge Function for periodic wallet refresh (every 5 mins)

**Task 24: Polymarket UI Components**
- [ ] 24.1: Create WalletCard component (volume, ROI, win rate, multiplier)
- [ ] 24.2: Create WalletList component (up to 50 wallets)
- [ ] 24.3: Create AddWalletForm component with address validation
- [ ] 24.4: Create WalletDetailModal component
- [ ] 24.5: Create PositionTable component (sortable by latest, amount, ROI, probability)
- [ ] 24.6: Create TradeAlertsPanel component
- [ ] 24.7: Add alert customization (new trades, large bets >$1K, wins/losses)
- [ ] 24.8: Implement real-time updates with Supabase Realtime

---

### WEEK 8: Research Tools (NFT & Analytics)

**Task 25: OpenSea API Integration**
- [ ] 25.1: Research OpenSea API v2 endpoints
- [ ] 25.2: Create OpenSea client (lib/api/opensea.ts)
- [ ] 25.3: Implement getWalletMints(address)
- [ ] 25.4: Implement getWhitelistStatus(address, collection)
- [ ] 25.5: Implement getFloorPrice(collection)
- [ ] 25.6: Add rate limiting and API key management

**Task 26: NFT Tracking Components**
- [ ] 26.1: Create NFTWalletCard component
- [ ] 26.2: Create LiveMintFeed component with profit calculations
- [ ] 26.3: Create AddNFTWalletForm component
- [ ] 26.4: Create WhitelistStatusPanel component (✓ ✗ ⏳ indicators)
- [ ] 26.5: Create NFTMintCard component
- [ ] 26.6: Add auto-tracking settings toggle
- [ ] 26.7: Show OpenSea API connection status

**Task 27: Analytics Dashboard**
- [ ] 27.1: Create analytics aggregation functions
- [ ] 27.2: Implement getWalletOverviewStats()
- [ ] 27.3: Implement getTopPerformers()
- [ ] 27.4: Implement getUnderperformingWallets()
- [ ] 27.5: Implement getMarketInsights()
- [ ] 27.6: Implement getNFTAnalytics()
- [ ] 27.7: Create AnalyticsDashboard modal component
- [ ] 27.8: Create OverviewStatsPanel component
- [ ] 27.9: Create TopPerformersTable component
- [ ] 27.10: Create MarketInsightsPanel component
- [ ] 27.11: Add analytics button to Tools page

**Task 28: Tools Page Integration**
- [ ] 28.1: Create tools page (app/(dashboard)/tools/page.tsx)
- [ ] 28.2: Implement 2-column layout (Polymarket | NFT)
- [ ] 28.3: Integrate all wallet tracking components
- [ ] 28.4: Add tab switching for mobile view
- [ ] 28.5: Implement WebSocket connections for live updates
- [ ] 28.6: Add notification toasts for trade alerts

---

### WEEK 9: Alpha Intelligence & Notifications

**Task 29: Alpha Content Management**
- [ ] 29.1: Create alpha_articles table
- [ ] 29.2: Create alpha_agents table (AI agent rankings)
- [ ] 29.3: Create Server Actions (lib/actions/alpha.ts)
- [ ] 29.4: Seed data for AI agents (Claude, ChatGPT, Perplexity, Virtuals)
- [ ] 29.5: Create admin CMS for alpha content

**Task 30: Alpha Page Components**
- [ ] 30.1: Create AIAgentCard component (rating out of 10)
- [ ] 30.2: Create AIAgentRankings component
- [ ] 30.3: Create SetupGuideSection component (3-step guide)
- [ ] 30.4: Create PromptExamplesPanel component
- [ ] 30.5: Create MarketAlphaFeed component
- [ ] 30.6: Create TrendingTopics component
- [ ] 30.7: Create AIMarketPulse sidebar
- [ ] 30.8: Create QuickActions component

**Task 31: Alpha Page**
- [ ] 31.1: Create alpha page (app/(dashboard)/alpha/page.tsx)
- [ ] 31.2: Integrate all alpha components
- [ ] 31.3: Add content refresh mechanism
- [ ] 31.4: Optimize for SEO

**Task 32: Notification System**
- [ ] 32.1: Create Server Actions (lib/actions/notifications.ts)
- [ ] 32.2: Implement createNotification()
- [ ] 32.3: Implement getUserNotifications()
- [ ] 32.4: Implement markAsRead()
- [ ] 32.5: Create NotificationDropdown component
- [ ] 32.6: Create NotificationItem component with type-specific icons
- [ ] 32.7: Integrate into Topbar
- [ ] 32.8: Add real-time updates with Supabase Realtime
- [ ] 32.9: Add notification triggers (submission approved, winner selected, trade alert, mint detected)

---

### WEEK 10: Admin Dashboard & Rewards

**Task 33: Admin Dashboard**
- [ ] 33.1: Create AdminDashboardStats component (total users, campaigns, submissions, rewards)
- [ ] 33.2: Create CampaignManagementTable component with CRUD
- [ ] 33.3: Create UserManagementTable component (ban, adjust points/score)
- [ ] 33.4: Create WinnerSelectionInterface component
- [ ] 33.5: Implement manual selection (checkboxes)
- [ ] 33.6: Implement raffle selection (random button)
- [ ] 33.7: Implement hybrid selection (two-tier)
- [ ] 33.8: Create admin dashboard page (app/(admin)/dashboard/page.tsx)
- [ ] 33.9: Create admin campaigns page (app/(admin)/campaigns/page.tsx)
- [ ] 33.10: Create admin users page (app/(admin)/users/page.tsx)
- [ ] 33.11: Create admin winners page (app/(admin)/winners/page.tsx)
- [ ] 33.12: Add admin-only middleware

**Task 34: Winner Selection**
- [ ] 34.1: Create Server Actions (lib/actions/winners.ts)
- [ ] 34.2: Implement selectWinners() for admin_selection
- [ ] 34.3: Implement raffleWinners() for random selection
- [ ] 34.4: Implement hybridSelection() for two-tier
- [ ] 34.5: Update submission status to 'winner'
- [ ] 34.6: Assign reward amounts
- [ ] 34.7: Create notifications for winners

**Task 35: Rewards System**
- [ ] 35.1: Create RewardCard component (campaign, amount, status)
- [ ] 35.2: Create RewardsList component with filtering
- [ ] 35.3: Create ClaimRewardButton component
- [ ] 35.4: Create TotalEarningsDisplay component
- [ ] 35.5: Create rewards page (app/(dashboard)/rewards/page.tsx)
- [ ] 35.6: Update navigation link from "Raffle" to "Earn"
- [ ] 35.7: Implement reward claiming logic

---

### WEEK 11: Polish & Optimization

**Task 36: Theme System**
- [ ] 36.1: Create ThemeProvider context
- [ ] 36.2: Implement theme toggle (dark/light)
- [ ] 36.3: Add localStorage persistence
- [ ] 36.4: Configure Tailwind dark mode
- [ ] 36.5: Apply dark mode styles to all components
- [ ] 36.6: Test theme switching

**Task 37: Search & Filtering**
- [ ] 37.1: Create SearchBar component with debouncing
- [ ] 37.2: Implement global search API
- [ ] 37.3: Create SearchResults modal
- [ ] 37.4: Add keyboard shortcuts (Cmd+K / Ctrl+K)
- [ ] 37.5: Implement advanced filters for campaigns
- [ ] 37.6: Implement filters for submissions
- [ ] 37.7: Add filter persistence in URL params

**Task 38: Performance Optimization**
- [ ] 38.1: Implement code splitting with dynamic imports
- [ ] 38.2: Add lazy loading for heavy components
- [ ] 38.3: Optimize images with Next.js Image component
- [ ] 38.4: Configure React Query cache times
- [ ] 38.5: Add infinite scroll pagination
- [ ] 38.6: Implement optimistic updates
- [ ] 38.7: Add loading skeletons everywhere
- [ ] 38.8: Optimize database queries with indexes
- [ ] 38.9: Implement query result caching

**Task 39: Responsive Design**
- [ ] 39.1: Test on mobile (320px - 767px)
- [ ] 39.2: Test on tablet (768px - 1023px)
- [ ] 39.3: Test on desktop (1024px+)
- [ ] 39.4: Fix layout issues
- [ ] 39.5: Optimize touch targets for mobile
- [ ] 39.6: Test mobile navigation
- [ ] 39.7: Test forms on mobile

**Task 40: Accessibility**
- [ ] 40.1: Add ARIA labels to interactive elements
- [ ] 40.2: Ensure keyboard navigation works
- [ ] 40.3: Test with screen readers
- [ ] 40.4: Verify color contrast ratios (WCAG 2.1 AA)
- [ ] 40.5: Add focus indicators
- [ ] 40.6: Test with keyboard only

---

### WEEK 12: Security, Testing & Deployment

**Task 41: Security Hardening**
- [ ] 41.1: Implement rate limiting on API routes
- [ ] 41.2: Add CORS configuration
- [ ] 41.3: Implement request validation middleware
- [ ] 41.4: Add XSS protection headers
- [ ] 41.5: Implement file upload security (type, size validation)
- [ ] 41.6: Add malware scanning for uploads
- [ ] 41.7: Test RLS policies thoroughly
- [ ] 41.8: Implement password strength requirements
- [ ] 41.9: Add account lockout after failed logins
- [ ] 41.10: Implement email verification
- [ ] 41.11: Add CSRF protection

**Task 42: Testing**
- [ ] 42.1: Set up testing framework (Vitest + Testing Library)
- [ ] 42.2: Write unit tests for utilities
- [ ] 42.3: Write unit tests for Server Actions
- [ ] 42.4: Write component tests for auth forms
- [ ] 42.5: Write component tests for campaign components
- [ ] 42.6: Set up E2E testing (Playwright)
- [ ] 42.7: Write E2E test for registration flow
- [ ] 42.8: Write E2E test for campaign participation
- [ ] 42.9: Write E2E test for admin review flow
- [ ] 42.10: Achieve 70%+ code coverage

**Task 43: Environment Configuration**
- [ ] 43.1: Create production Supabase project
- [ ] 43.2: Run migrations on production database
- [ ] 43.3: Configure production storage buckets
- [ ] 43.4: Set up production email templates
- [ ] 43.5: Configure production API keys (Polymarket, OpenSea)
- [ ] 43.6: Create .env.production file
- [ ] 43.7: Test production environment

**Task 44: Deployment**
- [ ] 44.1: Create GitHub repository
- [ ] 44.2: Push code to GitHub
- [ ] 44.3: Connect repository to Vercel
- [ ] 44.4: Configure environment variables in Vercel
- [ ] 44.5: Set up custom domain
- [ ] 44.6: Configure SSL certificate
- [ ] 44.7: Set up preview deployments for PRs
- [ ] 44.8: Configure Vercel Analytics
- [ ] 44.9: Set up error tracking (Sentry)
- [ ] 44.10: Deploy to production

**Task 45: Database Seeding**
- [ ] 45.1: Create seed script for admin user
- [ ] 45.2: Create seed script for sample campaigns
- [ ] 45.3: Create seed script for sample tasks
- [ ] 45.4: Create seed script for AI agents
- [ ] 45.5: Create seed script for test users
- [ ] 45.6: Run seeds on production database

**Task 46: Monitoring & Documentation**
- [ ] 46.1: Set up Vercel Analytics
- [ ] 46.2: Configure Supabase monitoring
- [ ] 46.3: Set up uptime monitoring
- [ ] 46.4: Create monitoring dashboard
- [ ] 46.5: Write README with setup instructions
- [ ] 46.6: Document API endpoints
- [ ] 46.7: Document database schema
- [ ] 46.8: Create user guide
- [ ] 46.9: Create admin guide
- [ ] 46.10: Write deployment guide

**Task 47: Launch Preparation**
- [ ] 47.1: Perform final security audit
- [ ] 47.2: Run full test suite on production
- [ ] 47.3: Verify all integrations work (Polymarket, OpenSea)
- [ ] 47.4: Test email notifications
- [ ] 47.5: Verify analytics tracking
- [ ] 47.6: Create launch checklist
- [ ] 47.7: Prepare rollback plan
- [ ] 47.8: Schedule launch date
- [ ] 47.9: Deploy to production
- [ ] 47.10: Monitor for issues

---

## Timeline Summary

| Week | Focus | Key Deliverables |
|------|-------|------------------|
| 1 | Foundation | Project setup, database schema, RLS |
| 2 | Auth & Layout | Login/register, navigation, utilities |
| 3 | Campaigns | Campaign CRUD, listing, detail pages |
| 4 | Submissions | Submission form, file upload, admin review |
| 5 | Dashboard | User dashboard, points/score, tasks |
| 6 | Leaderboard | 4-category leaderboard, profile pages |
| 7 | Polymarket | Wallet tracking, live positions, alerts |
| 8 | NFT & Analytics | NFT tracking, analytics dashboard |
| 9 | Alpha & Notifications | Alpha intelligence, notification system |
| 10 | Admin & Rewards | Admin dashboard, winner selection, rewards |
| 11 | Polish | Theme, search, performance, responsive, accessibility |
| 12 | Launch | Security, testing, deployment, monitoring |

**Total Duration:** 12 weeks (3 months)  
**Total Tasks:** 47 major tasks with 300+ subtasks

---

## Success Metrics

**Technical:**
- Page load < 2 seconds
- API response < 500ms
- Uptime > 99.5%
- Zero critical vulnerabilities

**Business:**
- User registration rate
- Campaign participation rate
- Wallet tracking adoption
- Daily active users (DAU)
- User retention (7-day, 30-day)

---

## Risk Mitigation

**API Integration Risks:**
- Polymarket/OpenSea APIs may be rate-limited or unstable
- **Mitigation:** Implement robust error handling, caching, fallback data

**Performance Risks:**
- Real-time WebSocket connections expensive at scale
- **Mitigation:** Connection pooling, efficient Supabase Realtime usage

**Cost Risks:**
- API costs may scale faster than revenue
- **Mitigation:** Monitor costs, implement usage limits, optimize API calls

---

## Post-Launch (Ongoing)

**Monitoring:**
- Track Core Web Vitals
- Monitor API response times
- Track error rates
- Analyze user behavior

**Optimization:**
- Optimize slow queries
- Reduce bundle size
- Improve cache hit rates
- A/B test UI changes

**Feature Enhancements:**
- Social features (following, messaging)
- Mobile app (PWA or React Native)
- Advanced analytics dashboards
- Web3 integration (wallet connect)
- Referral system
- Public API for partners

---

## Conclusion

This deployment plan transforms the Voyage prototype into a production-ready application in 12 weeks. The plan prioritizes:

1. ✅ Solid foundation (database, auth, security)
2. ✅ Core features first (campaigns, submissions, dashboard)
3. ✅ Advanced features (research tools, analytics, AI)
4. ✅ Quality & polish (performance, accessibility, testing)
5. ✅ Successful launch (deployment, monitoring, documentation)

**The spec is complete. You can begin implementation by following the tasks sequentially or assigning tasks to team members for parallel development.**

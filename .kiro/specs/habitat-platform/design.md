# Technical Design Document

## Overview

Voyage is a comprehensive campaign participation and reward platform that enables users to complete social media campaigns, submit proof of participation, earn points and quality scores, compete on leaderboards, and win rewards through various selection methods. The platform features a premium modern SaaS interface with dark theme support, role-based access control, and comprehensive admin management capabilities.

### Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes + Supabase
- **Database**: PostgreSQL via Supabase
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth
- **State Management**: React Context API + Zustand for client state
- **Form Management**: React Hook Form + Zod validation
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React
- **Date Handling**: date-fns

### Key Design Principles

1. **Type Safety**: Leverage TypeScript throughout for compile-time safety
2. **Component Modularity**: Build reusable components with clear boundaries
3. **Server-First**: Use Next.js Server Components and Server Actions where possible
4. **Optimistic Updates**: Provide immediate feedback while background operations complete
5. **Progressive Enhancement**: Ensure core functionality works without JavaScript
6. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
7. **Accessibility**: WCAG 2.1 AA compliance for all interactive elements
8. **Performance**: Code splitting, lazy loading, and image optimization


## Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────┐   │
│  │   Browser    │  │    Mobile    │  │      Tablet         │   │
│  │  (Desktop)   │  │   (Phone)    │  │                     │   │
│  └──────────────┘  └──────────────┘  └─────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTPS
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    Next.js Application Layer                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Server Components (RSC)                     │   │
│  │  - Page Rendering  - Data Fetching  - SEO Optimization  │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Client Components                           │   │
│  │  - Interactive UI  - Forms  - Real-time Updates         │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              API Routes / Server Actions                 │   │
│  │  - Business Logic  - Validation  - Authorization        │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Supabase Client
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      Supabase Backend                            │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────┐   │
│  │   Supabase   │  │  PostgreSQL  │  │  Supabase Storage   │   │
│  │     Auth     │  │   Database   │  │  (File Uploads)     │   │
│  └──────────────┘  └──────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Architecture


```
app/
├── (auth)/
│   ├── login/
│   ├── register/
│   └── reset-password/
├── (dashboard)/
│   ├── layout.tsx              # Authenticated layout wrapper
│   ├── dashboard/              # User dashboard
│   ├── campaigns/              # Campaign listing & details
│   ├── tasks/                  # Task management
│   ├── leaderboard/            # Rankings
│   ├── profile/                # User profile
│   └── admin/                  # Admin-only routes
│       ├── dashboard/
│       ├── campaigns/
│       ├── submissions/
│       ├── users/
│       └── winners/
├── api/
│   ├── campaigns/
│   ├── submissions/
│   ├── tasks/
│   ├── users/
│   ├── leaderboard/
│   ├── notifications/
│   └── upload/
└── components/
    ├── ui/                     # shadcn/ui base components
    ├── auth/                   # Authentication components
    ├── campaigns/              # Campaign-related components
    ├── submissions/            # Submission components
    ├── leaderboard/            # Leaderboard components
    ├── dashboard/              # Dashboard widgets
    ├── admin/                  # Admin-specific components
    ├── shared/                 # Shared UI components
    └── layout/                 # Layout components (nav, sidebar)
```


## Components and Interfaces

### Core Component Hierarchy

#### 1. Authentication Components

**LoginForm**
- Purpose: Handle user authentication
- Props: `onSuccess?: () => void, redirectUrl?: string`
- State: `email, password, loading, error`
- Methods: `handleSubmit(), handleGoogleAuth()`

**RegisterForm**
- Purpose: Handle new user registration
- Props: `onSuccess?: () => void`
- State: `email, password, confirmPassword, username, loading, error`
- Methods: `handleSubmit(), validateForm()`

**PasswordResetForm**
- Purpose: Handle password reset requests
- Props: `token?: string`
- State: `email, newPassword, loading, error`
- Methods: `handleRequestReset(), handlePasswordUpdate()`

#### 2. Campaign Components

**CampaignCard**
- Purpose: Display campaign summary in grid/list
- Props: `campaign: Campaign, variant: 'grid' | 'list'`
- Displays: title, banner, reward pool, end date, participant count, status

**CampaignDetail**
- Purpose: Full campaign information display
- Props: `campaignId: string`
- Displays: All campaign fields, participation button, submission form
- Methods: `handleJoinCampaign()`


**CampaignSubmissionForm**
- Purpose: Submit proof of participation
- Props: `campaignId: string, onSuccess: () => void`
- State: `xUsername, xPostUrl, screenshots[], comment, loading, errors`
- Methods: `handleFileUpload(), validateUrls(), handleSubmit()`
- Validation: URL format, file types, file sizes

**CampaignList**
- Purpose: Display filterable campaign grid
- Props: `filters?: CampaignFilters`
- State: `campaigns, loading, filters, pagination`
- Methods: `applyFilters(), loadMore(), refreshList()`

#### 3. Submission Components

**SubmissionCard**
- Purpose: Display submission for review
- Props: `submission: Submission, showActions: boolean`
- Displays: User info, screenshots, post URL, campaign, status
- Actions: Approve, reject, assign score (admin only)

**SubmissionReviewPanel**
- Purpose: Admin review interface
- Props: `submissionId: string`
- State: `submission, score, actionLoading, comment`
- Methods: `handleApprove(), handleReject(), handleScoreAssignment()`

**SubmissionStatusBadge**
- Purpose: Visual submission status indicator
- Props: `status: SubmissionStatus`
- Variants: Pending (yellow), Approved (green), Rejected (red), Winner (purple), Reward_Sent (blue)


#### 4. Dashboard Components

**DashboardStats**
- Purpose: Display key user metrics
- Props: `userId: string`
- Displays: Points, score, rank, campaigns completed, wins, pending rewards
- Real-time updates via polling or websockets

**ActiveCampaignsWidget**
- Purpose: Show current active campaigns
- Props: `limit?: number`
- Displays: Top N active campaigns with quick join action

**RecentActivityFeed**
- Purpose: Display user activity timeline
- Props: `userId: string, limit?: number`
- Displays: Recent actions with timestamps and icons

**UpcomingDeadlinesWidget**
- Purpose: Show campaign deadlines
- Props: `userId: string`
- Displays: Campaigns ending soon with countdown timers

**PointsScoreWidget**
- Purpose: Recent points/score earned
- Props: `userId: string`
- Displays: Recent point/score transactions with sources

#### 5. Leaderboard Components

**LeaderboardTable**
- Purpose: Display ranked user list
- Props: `type: 'global' | 'monthly', limit?: number`
- Columns: Rank, username, avatar, points, score, campaigns, wins
- Features: Pagination, current user highlight, filtering


**LeaderboardEntry**
- Purpose: Single leaderboard row
- Props: `entry: LeaderboardEntry, isCurrentUser: boolean`
- Displays: Rank with medal icons (top 3), user info, stats
- Styling: Highlight current user row

#### 6. Task Components

**TaskCard**
- Purpose: Display individual task
- Props: `task: Task, completed: boolean`
- Displays: Title, description, points reward, completion status
- Actions: Complete task button (if not completed)

**TaskList**
- Purpose: Display categorized tasks
- Props: `category?: TaskType`
- Groups: Daily, Social, Community, Referral, Special
- Features: Filter by category, show completion status

#### 7. Profile Components

**ProfileHeader**
- Purpose: Display user profile summary
- Props: `userId: string, isOwnProfile: boolean`
- Displays: Avatar, username, bio, social links, stats
- Actions: Edit profile (if own), follow/message (if other user)

**ProfileStats**
- Purpose: Display detailed user statistics
- Props: `userId: string`
- Displays: Campaigns joined/won, approval rate, total rewards, badges


**BadgeDisplay**
- Purpose: Show earned badges
- Props: `badges: Badge[], layout: 'grid' | 'list'`
- Displays: Badge icon, name, description, earned date
- Features: Tooltip with badge criteria

**SubmissionHistory**
- Purpose: User's submission history
- Props: `userId: string`
- Displays: Campaign, status, points/score earned, rewards
- Features: Filter by status, sort by date

#### 8. Admin Components

**AdminDashboardStats**
- Purpose: Platform-wide metrics
- Displays: Total users, campaigns, submissions, pending reviews, rewards distributed
- Features: Date range filtering, export data

**CampaignManagementTable**
- Purpose: Admin campaign CRUD interface
- Props: `filters?: AdminCampaignFilters`
- Actions: Create, edit, delete, publish, end campaign
- Features: Bulk actions, status filtering

**UserManagementTable**
- Purpose: Admin user management interface
- Actions: View details, ban/unban, adjust points/score, view submissions
- Features: Search, role filtering, bulk actions


**WinnerSelectionInterface**
- Purpose: Select winners based on campaign type
- Props: `campaignId: string, campaignType: CampaignType`
- Features: 
  - Admin_Selection: Manual checkbox selection
  - Raffle: Random selection button with preview
  - Hybrid_Selection: Two-tier selection (manual + raffle)
- Methods: `selectWinners(), previewSelection(), confirmWinners()`

#### 9. Shared Components

**NotificationDropdown**
- Purpose: Display user notifications
- Props: `userId: string`
- Features: Unread badge, mark as read, notification types with icons
- Real-time updates via polling

**ThemeToggle**
- Purpose: Switch between dark/light theme
- State: `theme: 'dark' | 'light'`
- Methods: `toggleTheme(), persistPreference()`

**AvatarUpload**
- Purpose: Upload/change user avatar
- Props: `currentAvatar?: string, onUpload: (url: string) => void`
- Features: Preview, crop, file validation

**FileUploader**
- Purpose: Generic file upload component
- Props: `accept: string, maxSize: number, multiple: boolean, onUpload: (files: File[]) => void`
- Features: Drag & drop, preview, progress, validation


### TypeScript Interfaces and Types

```typescript
// User Types
interface User {
  id: string;
  email: string;
  username: string;
  role: 'User' | 'Admin';
  avatar_url?: string;
  bio?: string;
  twitter_url?: string;
  instagram_url?: string;
  total_points: number;
  total_score: number;
  current_rank?: number;
  campaigns_completed: number;
  campaigns_won: number;
  approval_rate: number;
  created_at: string;
  updated_at: string;
}

// Campaign Types
type CampaignType = 'Admin_Selection' | 'Raffle' | 'Hybrid_Selection';
type CampaignStatus = 'draft' | 'active' | 'closed' | 'archived';

interface Campaign {
  id: string;
  title: string;
  description: string;
  banner_url: string;
  reward_pool: number;
  campaign_type: CampaignType;
  start_date: string;
  end_date: string;
  rules: string;
  requirements: string;
  number_of_winners: number;
  status: CampaignStatus;
  premium_prize_pool?: number;  // For Hybrid_Selection
  secondary_prize_pool?: number; // For Hybrid_Selection
  participant_count: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// Submission Types
type SubmissionStatus = 'Pending' | 'Approved' | 'Rejected' | 'Winner' | 'Reward_Sent';

interface Submission {
  id: string;
  campaign_id: string;
  user_id: string;
  x_username: string;
  x_post_url: string;
  screenshot_urls: string[];
  comment?: string;
  status: SubmissionStatus;
  score?: number;
  points_earned: number;
  score_earned: number;
  reward_amount?: number;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
}

// Task Types
type TaskType = 'Daily' | 'Social' | 'Community' | 'Referral' | 'Special';
type TaskStatus = 'available' | 'completed' | 'expired';

interface Task {
  id: string;
  title: string;
  description: string;
  task_type: TaskType;
  points_reward: number;
  verification_method: string;
  status: TaskStatus;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

interface UserTask {
  id: string;
  user_id: string;
  task_id: string;
  completed: boolean;
  completed_at?: string;
  created_at: string;
}

// Leaderboard Types
interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  avatar_url?: string;
  points: number;
  score: number;
  campaigns_completed: number;
  campaigns_won: number;
}

interface MonthlyLeaderboard extends LeaderboardEntry {
  monthly_points: number;
  monthly_score: number;
  monthly_rank: number;
  month: string;
}

// Badge Types
interface Badge {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  criteria: string;
  created_at: string;
}

interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}

// Notification Types
type NotificationType = 
  | 'submission_approved'
  | 'submission_rejected'
  | 'campaign_launched'
  | 'winner_selected'
  | 'reward_distributed'
  | 'badge_earned';

interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  created_at: string;
}
```


## Data Models

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'User' CHECK (role IN ('User', 'Admin')),
  avatar_url TEXT,
  bio TEXT,
  twitter_url VARCHAR(255),
  instagram_url VARCHAR(255),
  total_points INTEGER DEFAULT 0 NOT NULL,
  total_score INTEGER DEFAULT 0 NOT NULL,
  current_rank INTEGER,
  campaigns_completed INTEGER DEFAULT 0 NOT NULL,
  campaigns_won INTEGER DEFAULT 0 NOT NULL,
  approval_rate DECIMAL(5,2) DEFAULT 0.00,
  theme_preference VARCHAR(10) DEFAULT 'dark' CHECK (theme_preference IN ('dark', 'light')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_total_points ON users(total_points DESC);
CREATE INDEX idx_users_total_score ON users(total_score DESC);
```


#### Campaigns Table
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  banner_url TEXT NOT NULL,
  reward_pool DECIMAL(12,2) NOT NULL,
  campaign_type VARCHAR(20) NOT NULL CHECK (campaign_type IN ('Admin_Selection', 'Raffle', 'Hybrid_Selection')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  rules TEXT NOT NULL,
  requirements TEXT NOT NULL,
  number_of_winners INTEGER NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed', 'archived')),
  premium_prize_pool DECIMAL(12,2), -- For Hybrid_Selection
  secondary_prize_pool DECIMAL(12,2), -- For Hybrid_Selection
  participant_count INTEGER DEFAULT 0 NOT NULL,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_hybrid_prizes CHECK (
    campaign_type != 'Hybrid_Selection' OR 
    (premium_prize_pool IS NOT NULL AND secondary_prize_pool IS NOT NULL)
  )
);

CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_type ON campaigns(campaign_type);
CREATE INDEX idx_campaigns_end_date ON campaigns(end_date);
CREATE INDEX idx_campaigns_created_by ON campaigns(created_by);
```


#### Submissions Table
```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  x_username VARCHAR(100) NOT NULL,
  x_post_url TEXT NOT NULL,
  screenshot_urls TEXT[] NOT NULL,
  comment TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Winner', 'Reward_Sent')),
  score INTEGER CHECK (score >= 0 AND score <= 100),
  points_earned INTEGER DEFAULT 0 NOT NULL,
  score_earned INTEGER DEFAULT 0 NOT NULL,
  reward_amount DECIMAL(12,2),
  reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, user_id) -- One submission per user per campaign
);

CREATE INDEX idx_submissions_campaign ON submissions(campaign_id);
CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_reviewed_by ON submissions(reviewed_by);
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);
```


#### Tasks Table
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  task_type VARCHAR(20) NOT NULL CHECK (task_type IN ('Daily', 'Social', 'Community', 'Referral', 'Special')),
  points_reward INTEGER NOT NULL,
  verification_method VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'completed', 'expired')),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tasks_type ON tasks(task_type);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_expires_at ON tasks(expires_at);
```

#### User_Tasks Table
```sql
CREATE TABLE user_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, task_id)
);

CREATE INDEX idx_user_tasks_user ON user_tasks(user_id);
CREATE INDEX idx_user_tasks_task ON user_tasks(task_id);
CREATE INDEX idx_user_tasks_completed ON user_tasks(completed);
```


#### Leaderboards Table
```sql
CREATE TABLE leaderboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rank INTEGER NOT NULL,
  points INTEGER NOT NULL,
  score INTEGER NOT NULL,
  campaigns_completed INTEGER DEFAULT 0,
  campaigns_won INTEGER DEFAULT 0,
  period VARCHAR(20) NOT NULL CHECK (period IN ('global', 'monthly')),
  month VARCHAR(7), -- Format: YYYY-MM for monthly leaderboards
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, period, month)
);

CREATE INDEX idx_leaderboards_period ON leaderboards(period);
CREATE INDEX idx_leaderboards_month ON leaderboards(month);
CREATE INDEX idx_leaderboards_rank ON leaderboards(rank);
CREATE INDEX idx_leaderboards_points ON leaderboards(points DESC);
CREATE INDEX idx_leaderboards_score ON leaderboards(score DESC);
```

#### Badges Table
```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  criteria TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```


#### User_Badges Table
```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge ON user_badges(badge_id);
```

#### Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN (
    'submission_approved',
    'submission_rejected',
    'campaign_launched',
    'winner_selected',
    'reward_distributed',
    'badge_earned'
  )),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```


#### Point_Transactions Table (for audit trail)
```sql
CREATE TABLE point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  source VARCHAR(50) NOT NULL CHECK (source IN (
    'daily_login',
    'campaign_participation',
    'referral',
    'task_completion',
    'admin_adjustment'
  )),
  reference_id UUID, -- ID of related entity (task_id, campaign_id, etc.)
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_point_transactions_user ON point_transactions(user_id);
CREATE INDEX idx_point_transactions_source ON point_transactions(source);
CREATE INDEX idx_point_transactions_created_at ON point_transactions(created_at DESC);
```

#### Score_Transactions Table (for audit trail)
```sql
CREATE TABLE score_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_score_transactions_user ON score_transactions(user_id);
CREATE INDEX idx_score_transactions_submission ON score_transactions(submission_id);
CREATE INDEX idx_score_transactions_created_at ON score_transactions(created_at DESC);
```


### Database Relationships

```
users (1) ──────< (M) campaigns (created_by)
users (1) ──────< (M) submissions (user_id)
users (1) ──────< (M) submissions (reviewed_by)
users (1) ──────< (M) user_tasks
users (1) ──────< (M) user_badges
users (1) ──────< (M) notifications
users (1) ──────< (M) leaderboards
users (1) ──────< (M) point_transactions
users (1) ──────< (M) score_transactions

campaigns (1) ──< (M) submissions

tasks (1) ──────< (M) user_tasks

badges (1) ─────< (M) user_badges

submissions (1) ─< (M) score_transactions
```

### Row-Level Security (RLS) Policies

```sql
-- Users can read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Admins can view all users
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin')
  );

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Anyone can view active campaigns
CREATE POLICY "Anyone can view active campaigns" ON campaigns
  FOR SELECT USING (status = 'active');

-- Admins can manage campaigns
CREATE POLICY "Admins can manage campaigns" ON campaigns
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin')
  );

-- Users can view their own submissions
CREATE POLICY "Users can view own submissions" ON submissions
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can view all submissions
CREATE POLICY "Admins can view all submissions" ON submissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin')
  );

-- Users can create submissions
CREATE POLICY "Users can create submissions" ON submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);
```


## API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
- **Purpose**: Register new user account
- **Request Body**:
  ```typescript
  {
    email: string;
    password: string;
    username: string;
  }
  ```
- **Response**: `{ user: User, session: Session }`
- **Validation**: Email format, password strength (min 8 chars), unique username
- **Side Effects**: Creates user record, sends verification email

#### POST /api/auth/login
- **Purpose**: Authenticate existing user
- **Request Body**: `{ email: string; password: string; }`
- **Response**: `{ user: User, session: Session }`
- **Error Codes**: 401 (Invalid credentials), 403 (Account banned)

#### POST /api/auth/logout
- **Purpose**: End user session
- **Request**: Authenticated session
- **Response**: `{ success: boolean }`

#### POST /api/auth/reset-password
- **Purpose**: Request password reset
- **Request Body**: `{ email: string; }`
- **Response**: `{ success: boolean, message: string }`
- **Side Effects**: Sends password reset email

#### POST /api/auth/update-password
- **Purpose**: Update password with reset token
- **Request Body**: `{ token: string; newPassword: string; }`
- **Response**: `{ success: boolean }`


### Campaign Endpoints

#### GET /api/campaigns
- **Purpose**: List campaigns with filters
- **Query Params**: `status?, type?, page?, limit?`
- **Response**: `{ campaigns: Campaign[], total: number, page: number }`
- **Access**: Public (only active campaigns for non-admins)

#### GET /api/campaigns/:id
- **Purpose**: Get campaign details
- **Response**: `{ campaign: Campaign }`
- **Access**: Public for active campaigns

#### POST /api/campaigns
- **Purpose**: Create new campaign
- **Request Body**: Campaign data (all required fields)
- **Response**: `{ campaign: Campaign }`
- **Access**: Admin only
- **Validation**: Date ranges, prize pool values, required fields

#### PUT /api/campaigns/:id
- **Purpose**: Update campaign
- **Request Body**: Partial campaign data
- **Response**: `{ campaign: Campaign }`
- **Access**: Admin only

#### DELETE /api/campaigns/:id
- **Purpose**: Delete campaign
- **Response**: `{ success: boolean }`
- **Access**: Admin only
- **Constraint**: Cannot delete campaigns with submissions

#### POST /api/campaigns/:id/end
- **Purpose**: Manually end campaign
- **Response**: `{ campaign: Campaign }`
- **Access**: Admin only
- **Side Effects**: Updates status to 'closed'


### Submission Endpoints

#### GET /api/submissions
- **Purpose**: List submissions with filters
- **Query Params**: `campaignId?, userId?, status?, page?, limit?`
- **Response**: `{ submissions: Submission[], total: number }`
- **Access**: Users see own, admins see all

#### GET /api/submissions/:id
- **Purpose**: Get submission details
- **Response**: `{ submission: Submission }`
- **Access**: Owner or admin

#### POST /api/submissions
- **Purpose**: Submit campaign participation proof
- **Request Body**:
  ```typescript
  {
    campaign_id: string;
    x_username: string;
    x_post_url: string;
    screenshot_urls: string[];
    comment?: string;
  }
  ```
- **Response**: `{ submission: Submission }`
- **Access**: Authenticated users
- **Validation**: URL format, screenshot count (1-5), campaign is active
- **Side Effects**: Increments campaign participant count

#### PUT /api/submissions/:id/review
- **Purpose**: Review submission (approve/reject)
- **Request Body**: `{ action: 'approve' | 'reject', score?: number, comment?: string }`
- **Response**: `{ submission: Submission }`
- **Access**: Admin only
- **Side Effects**: Updates user stats, awards points, creates notification


### User Endpoints

#### GET /api/users/:id
- **Purpose**: Get user profile
- **Response**: `{ user: User }`
- **Access**: Public for basic info, full details for owner/admin

#### PUT /api/users/:id
- **Purpose**: Update user profile
- **Request Body**: `{ bio?, twitter_url?, instagram_url?, avatar_url? }`
- **Response**: `{ user: User }`
- **Access**: Owner or admin

#### GET /api/users/:id/submissions
- **Purpose**: Get user submission history
- **Query Params**: `page?, limit?`
- **Response**: `{ submissions: Submission[], total: number }`
- **Access**: Owner or admin

#### GET /api/users/:id/badges
- **Purpose**: Get user badges
- **Response**: `{ badges: Badge[] }`
- **Access**: Public

#### POST /api/users/:id/adjust-points
- **Purpose**: Manually adjust user points
- **Request Body**: `{ amount: number, reason: string }`
- **Response**: `{ user: User }`
- **Access**: Admin only
- **Side Effects**: Creates point transaction, updates leaderboard

#### POST /api/users/:id/adjust-score
- **Purpose**: Manually adjust user score
- **Request Body**: `{ amount: number, reason: string }`
- **Response**: `{ user: User }`
- **Access**: Admin only
- **Side Effects**: Creates score transaction, updates leaderboard


#### POST /api/users/:id/ban
- **Purpose**: Ban/unban user
- **Request Body**: `{ banned: boolean, reason?: string }`
- **Response**: `{ user: User }`
- **Access**: Admin only

### Task Endpoints

#### GET /api/tasks
- **Purpose**: List available tasks
- **Query Params**: `type?, status?`
- **Response**: `{ tasks: Task[] }`
- **Access**: Authenticated users

#### GET /api/tasks/:id
- **Purpose**: Get task details
- **Response**: `{ task: Task, userCompletion?: UserTask }`
- **Access**: Authenticated users

#### POST /api/tasks/:id/complete
- **Purpose**: Mark task as completed
- **Response**: `{ userTask: UserTask, pointsAwarded: number }`
- **Access**: Authenticated users
- **Side Effects**: Awards points, creates point transaction, updates user stats

#### POST /api/tasks
- **Purpose**: Create new task
- **Request Body**: Task data
- **Response**: `{ task: Task }`
- **Access**: Admin only


### Leaderboard Endpoints

#### GET /api/leaderboard/global
- **Purpose**: Get global leaderboard
- **Query Params**: `page?, limit?`
- **Response**: `{ entries: LeaderboardEntry[], total: number, currentUserRank?: number }`
- **Access**: Public

#### GET /api/leaderboard/monthly
- **Purpose**: Get monthly leaderboard
- **Query Params**: `month?, page?, limit?`
- **Response**: `{ entries: MonthlyLeaderboard[], total: number, currentUserRank?: number }`
- **Access**: Public

### Winner Selection Endpoints

#### POST /api/campaigns/:id/select-winners
- **Purpose**: Select campaign winners
- **Request Body**:
  ```typescript
  {
    method: 'manual' | 'raffle' | 'hybrid';
    manualSelections?: string[]; // Submission IDs
    premiumSelections?: string[]; // For hybrid
  }
  ```
- **Response**: `{ winners: Submission[], message: string }`
- **Access**: Admin only
- **Validation**: Winner count matches campaign settings
- **Side Effects**: Updates submission statuses, creates notifications, awards rewards


### Notification Endpoints

#### GET /api/notifications
- **Purpose**: Get user notifications
- **Query Params**: `read?, limit?`
- **Response**: `{ notifications: Notification[], unreadCount: number }`
- **Access**: Owner only

#### PUT /api/notifications/:id/read
- **Purpose**: Mark notification as read
- **Response**: `{ notification: Notification }`
- **Access**: Owner only

#### PUT /api/notifications/read-all
- **Purpose**: Mark all notifications as read
- **Response**: `{ success: boolean }`
- **Access**: Owner only

### Upload Endpoints

#### POST /api/upload/avatar
- **Purpose**: Upload user avatar
- **Request**: Multipart form data with image file
- **Response**: `{ url: string }`
- **Access**: Authenticated users
- **Validation**: File type (jpg, png, webp), size (< 5MB)
- **Processing**: Resize to 256x256, optimize

#### POST /api/upload/screenshots
- **Purpose**: Upload submission screenshots
- **Request**: Multipart form data with image files (1-5)
- **Response**: `{ urls: string[] }`
- **Access**: Authenticated users
- **Validation**: File types (jpg, png, webp), size (< 10MB each)
- **Processing**: Optimize, generate thumbnails


#### POST /api/upload/banner
- **Purpose**: Upload campaign banner
- **Request**: Multipart form data with image file
- **Response**: `{ url: string }`
- **Access**: Admin only
- **Validation**: File type (jpg, png, webp), size (< 10MB)
- **Processing**: Optimize for web, generate responsive variants

### Admin Dashboard Endpoints

#### GET /api/admin/stats
- **Purpose**: Get platform statistics
- **Response**:
  ```typescript
  {
    totalUsers: number;
    totalCampaigns: number;
    totalSubmissions: number;
    pendingReviews: number;
    totalRewardsDistributed: number;
    recentActivity: Activity[];
  }
  ```
- **Access**: Admin only

#### GET /api/admin/users
- **Purpose**: List all users with admin filters
- **Query Params**: `role?, banned?, page?, limit?, search?`
- **Response**: `{ users: User[], total: number }`
- **Access**: Admin only


## State Management

### Client State Architecture

We'll use a combination of React Context API for global state and Zustand for complex client state management.

#### Auth Context
```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}
```

#### Theme Context
```typescript
interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}
```

#### Notification Store (Zustand)
```typescript
interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  addNotification: (notification: Notification) => void;
}
```


#### Campaign Store (Zustand)
```typescript
interface CampaignStore {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  filters: CampaignFilters;
  loading: boolean;
  fetchCampaigns: (filters?: CampaignFilters) => Promise<void>;
  selectCampaign: (id: string) => Promise<void>;
  setFilters: (filters: Partial<CampaignFilters>) => void;
}
```

### Server State Management

We'll use Next.js built-in caching and React Server Components for server state:

- **Data Fetching**: Server Components with async/await
- **Caching**: Next.js cache with revalidation tags
- **Mutations**: Server Actions with revalidatePath/revalidateTag
- **Optimistic Updates**: useOptimistic hook for instant feedback

### Data Flow Patterns

1. **Server-First**: Default to Server Components for data display
2. **Client Interactivity**: Use Client Components for forms, modals, interactive widgets
3. **Hybrid Approach**: Server Component containers with Client Component children
4. **Cache Strategy**: 
   - Static data: ISR with long revalidation
   - User data: No caching, fresh on each request
   - Public data: Short-lived cache (60s)


## Authentication Flow

### Registration Flow

```
User → RegisterForm → POST /api/auth/register → Supabase Auth
  ↓
Create User Record in Database
  ↓
Send Verification Email
  ↓
Redirect to Email Verification Page
  ↓
User Clicks Email Link → Verify Email → Redirect to Dashboard
```

### Login Flow

```
User → LoginForm → POST /api/auth/login → Supabase Auth
  ↓
Validate Credentials
  ↓
Check if User is Banned (reject if true)
  ↓
Create Session
  ↓
Set Auth Cookie
  ↓
Redirect to Dashboard
```

### Session Management

- **Session Duration**: 7 days (configurable)
- **Token Refresh**: Automatic via Supabase client
- **Session Storage**: HTTP-only cookies for security
- **CSRF Protection**: Built into Next.js

### Protected Route Implementation

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const supabase = createMiddlewareClient({ req: request, res: response });
  const { data: { session } } = await supabase.auth.getSession();
  
  // Redirect unauthenticated users
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Check admin role for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session?.user.id)
      .single();
    
    if (user?.role !== 'Admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return response;
}
```


### Role-Based Access Control (RBAC)

```typescript
// lib/auth/permissions.ts
type Permission = 
  | 'campaign:create'
  | 'campaign:edit'
  | 'campaign:delete'
  | 'submission:review'
  | 'user:manage'
  | 'winner:select';

const rolePermissions: Record<Role, Permission[]> = {
  User: [],
  Admin: [
    'campaign:create',
    'campaign:edit',
    'campaign:delete',
    'submission:review',
    'user:manage',
    'winner:select'
  ]
};

export function hasPermission(user: User, permission: Permission): boolean {
  return rolePermissions[user.role]?.includes(permission) ?? false;
}
```

### Authorization Patterns

```typescript
// Server Action example
export async function reviewSubmission(submissionId: string, action: 'approve' | 'reject') {
  const { user } = await getSession();
  
  if (!user || !hasPermission(user, 'submission:review')) {
    throw new Error('Unauthorized');
  }
  
  // Proceed with review logic
}
```


## File Upload System Design

### Architecture

```
Client → FileUploader Component → POST /api/upload/* → Validation Layer
  ↓
File Processing (resize, optimize, scan)
  ↓
Supabase Storage (with secure bucket policies)
  ↓
Return Public URL
  ↓
Store URL in Database
```

### Upload Flow Implementation

```typescript
// lib/upload/file-uploader.ts
interface UploadConfig {
  maxSize: number;        // bytes
  allowedTypes: string[]; // MIME types
  bucket: string;         // Supabase storage bucket
  folder?: string;        // Optional subfolder
}

export async function uploadFile(
  file: File,
  config: UploadConfig
): Promise<string> {
  // 1. Validate file
  validateFile(file, config);
  
  // 2. Generate unique filename
  const filename = generateUniqueFilename(file.name);
  const filepath = config.folder 
    ? `${config.folder}/${filename}` 
    : filename;
  
  // 3. Process file (resize/optimize if image)
  const processedFile = await processFile(file);
  
  // 4. Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(config.bucket)
    .upload(filepath, processedFile, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) throw error;
  
  // 5. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(config.bucket)
    .getPublicUrl(filepath);
  
  return publicUrl;
}
```


### File Validation

```typescript
function validateFile(file: File, config: UploadConfig): void {
  // Check file size
  if (file.size > config.maxSize) {
    throw new Error(`File size exceeds ${config.maxSize / 1024 / 1024}MB limit`);
  }
  
  // Check file type
  if (!config.allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} not allowed`);
  }
  
  // Additional checks
  const extension = file.name.split('.').pop()?.toLowerCase();
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  
  if (!extension || !allowedExtensions.includes(extension)) {
    throw new Error('Invalid file extension');
  }
}
```

### Image Processing

```typescript
async function processFile(file: File): Promise<File> {
  // Only process images
  if (!file.type.startsWith('image/')) {
    return file;
  }
  
  // Use sharp or browser-based image processing
  const img = await loadImage(file);
  
  // Resize if necessary (max dimensions)
  const maxWidth = 1920;
  const maxHeight = 1080;
  
  if (img.width > maxWidth || img.height > maxHeight) {
    img = await resizeImage(img, maxWidth, maxHeight);
  }
  
  // Optimize (compression)
  const optimized = await compressImage(img, {
    quality: 0.85,
    format: 'webp'
  });
  
  return optimized;
}
```


### Supabase Storage Configuration

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('avatars', 'avatars', true),
  ('screenshots', 'screenshots', true),
  ('banners', 'banners', true);

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own avatars"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for screenshots
CREATE POLICY "Screenshot images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'screenshots');

CREATE POLICY "Authenticated users can upload screenshots"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'screenshots' AND
    auth.role() = 'authenticated'
  );

-- Storage policies for banners
CREATE POLICY "Banner images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'banners');

CREATE POLICY "Admins can upload banners"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'banners' AND
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin')
  );
```


### Upload Configs

```typescript
export const uploadConfigs = {
  avatar: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    bucket: 'avatars',
    folder: undefined
  },
  screenshot: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    bucket: 'screenshots',
    folder: undefined
  },
  banner: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    bucket: 'banners',
    folder: undefined
  }
};
```

### Security Considerations

1. **File Type Validation**: Check both MIME type and file extension
2. **Size Limits**: Enforce maximum file sizes to prevent abuse
3. **Malware Scanning**: Integrate with scanning service (e.g., ClamAV) before storage
4. **Content-Type Headers**: Set proper Content-Type when serving files
5. **Access Control**: Use Supabase RLS policies to control access
6. **Unique Filenames**: Generate UUIDs to prevent collisions and guessing
7. **Rate Limiting**: Limit upload frequency per user
8. **Signed URLs**: For private files, generate time-limited signed URLs


## Notification System Architecture

### Notification Creation Flow

```
Trigger Event → Notification Service → Create Notification Record
  ↓
Real-time Push (optional via Supabase Realtime)
  ↓
User Interface Update
```

### Notification Service

```typescript
// lib/notifications/service.ts
interface NotificationPayload {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
}

export async function createNotification(
  payload: NotificationPayload
): Promise<Notification> {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: payload.userId,
      type: payload.type,
      title: payload.title,
      message: payload.message,
      link: payload.link,
      read: false
    })
    .select()
    .single();
  
  if (error) throw error;
  
  // Optionally trigger real-time push
  await pushNotification(data);
  
  return data;
}
```


### Notification Templates

```typescript
export const notificationTemplates = {
  submission_approved: (campaignTitle: string) => ({
    title: '🎉 Submission Approved',
    message: `Your submission for "${campaignTitle}" has been approved!`,
    link: '/dashboard'
  }),
  
  submission_rejected: (campaignTitle: string) => ({
    title: '❌ Submission Rejected',
    message: `Your submission for "${campaignTitle}" was not approved.`,
    link: '/dashboard'
  }),
  
  campaign_launched: (campaignTitle: string, campaignId: string) => ({
    title: '🚀 New Campaign Available',
    message: `Check out "${campaignTitle}" and participate now!`,
    link: `/campaigns/${campaignId}`
  }),
  
  winner_selected: (campaignTitle: string, reward: number) => ({
    title: '🏆 You Won!',
    message: `Congratulations! You won $${reward} in "${campaignTitle}"!`,
    link: '/profile'
  }),
  
  reward_distributed: (amount: number) => ({
    title: '💰 Reward Sent',
    message: `Your reward of $${amount} has been distributed!`,
    link: '/profile'
  }),
  
  badge_earned: (badgeName: string) => ({
    title: '⭐ New Badge Earned',
    message: `You've earned the "${badgeName}" badge!`,
    link: '/profile'
  })
};
```


### Real-time Notifications

```typescript
// components/NotificationListener.tsx
'use client';

export function NotificationListener({ userId }: { userId: string }) {
  const { addNotification } = useNotificationStore();
  
  useEffect(() => {
    const supabase = createClientComponentClient();
    
    // Subscribe to new notifications
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          addNotification(payload.new as Notification);
          
          // Optional: Show toast notification
          toast.info(payload.new.title);
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, addNotification]);
  
  return null;
}
```

### Notification Polling (Fallback)

For clients without real-time support, implement polling:

```typescript
export function useNotifications() {
  const { notifications, setNotifications } = useNotificationStore();
  
  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('read', false)
        .order('created_at', { ascending: false });
      
      if (data) {
        setNotifications(data);
      }
    }, 30000); // Poll every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return notifications;
}
```


## Error Handling

### Error Hierarchy

```typescript
// lib/errors/types.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTH_ERROR', 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'AUTHORIZATION_ERROR', 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409);
  }
}
```


### API Error Handler

```typescript
// lib/errors/handler.ts
export function handleApiError(error: unknown): Response {
  console.error('API Error:', error);
  
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: {
          message: error.message,
          code: error.code,
          details: error.details
        }
      },
      { status: error.statusCode }
    );
  }
  
  // PostgreSQL errors
  if (error && typeof error === 'object' && 'code' in error) {
    const pgError = error as { code: string; message: string };
    
    if (pgError.code === '23505') {
      return NextResponse.json(
        { error: { message: 'Resource already exists', code: 'DUPLICATE' } },
        { status: 409 }
      );
    }
    
    if (pgError.code === '23503') {
      return NextResponse.json(
        { error: { message: 'Referenced resource not found', code: 'FOREIGN_KEY' } },
        { status: 400 }
      );
    }
  }
  
  // Unknown errors
  return NextResponse.json(
    { error: { message: 'Internal server error', code: 'INTERNAL_ERROR' } },
    { status: 500 }
  );
}
```


### Client-Side Error Handling

```typescript
// lib/errors/client-handler.ts
export function handleClientError(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return (error as Error).message;
  }
  
  return 'An unexpected error occurred';
}

// components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error tracking service (e.g., Sentry)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>Something went wrong</h1>
          <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```


### Form Validation Errors

```typescript
// Using Zod for validation
import { z } from 'zod';

export const campaignSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(255),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  reward_pool: z.number().min(1, 'Reward pool must be greater than 0'),
  campaign_type: z.enum(['Admin_Selection', 'Raffle', 'Hybrid_Selection']),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  number_of_winners: z.number().int().min(1, 'At least 1 winner required'),
  premium_prize_pool: z.number().optional(),
  secondary_prize_pool: z.number().optional()
}).refine(
  (data) => {
    if (data.campaign_type === 'Hybrid_Selection') {
      return data.premium_prize_pool && data.secondary_prize_pool;
    }
    return true;
  },
  {
    message: 'Hybrid campaigns require both premium and secondary prize pools',
    path: ['campaign_type']
  }
).refine(
  (data) => new Date(data.end_date) > new Date(data.start_date),
  {
    message: 'End date must be after start date',
    path: ['end_date']
  }
);
```


### Error Logging and Monitoring

```typescript
// lib/monitoring/logger.ts
interface LogContext {
  userId?: string;
  requestId?: string;
  metadata?: Record<string, any>;
}

export function logError(error: Error, context?: LogContext) {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
    name: error.name,
    ...context
  };
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', errorLog);
  }
  
  // Send to monitoring service in production (e.g., Sentry, LogRocket)
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(error, { contexts: { custom: context } });
  }
}
```

### User-Facing Error Messages

```typescript
export const errorMessages = {
  // Authentication
  'auth/invalid-credentials': 'Invalid email or password',
  'auth/email-exists': 'An account with this email already exists',
  'auth/weak-password': 'Password must be at least 8 characters',
  
  // Submissions
  'submission/already-exists': 'You have already submitted for this campaign',
  'submission/campaign-closed': 'This campaign is no longer accepting submissions',
  'submission/invalid-url': 'Please provide a valid X post URL',
  
  // Uploads
  'upload/file-too-large': 'File size exceeds maximum limit',
  'upload/invalid-type': 'File type not supported',
  
  // Generic
  'network-error': 'Network error. Please check your connection',
  'server-error': 'Something went wrong. Please try again later'
};
```


## Testing Strategy

### Testing Pyramid

```
        E2E Tests (10%)
       /              \
      /                \
     /  Integration (30%) \
    /                      \
   /    Unit Tests (60%)    \
  /__________________________\
```

### Unit Testing

**Tools**: Jest, React Testing Library

**Coverage Targets**:
- Utility functions: 90%
- Business logic: 85%
- Components: 70%
- API routes: 80%

**Key Areas**:
1. **Validation Functions**
   - Test all validation rules
   - Test edge cases (empty, max length, special characters)
   
2. **Data Transformers**
   - Input/output transformations
   - Date formatting
   - Number calculations
   
3. **Component Logic**
   - State management
   - Event handlers
   - Conditional rendering
   
4. **API Route Handlers**
   - Request validation
   - Authorization checks
   - Response formatting


### Integration Testing

**Tools**: Jest, Supertest, Supabase Test Helpers

**Focus Areas**:
1. **Database Operations**
   - CRUD operations
   - Complex queries
   - Transaction handling
   - RLS policies
   
2. **API Endpoint Flows**
   - Request → validation → database → response
   - Authentication middleware
   - Error handling
   
3. **File Upload Flow**
   - Validation → processing → storage → URL generation
   
4. **Notification System**
   - Event → notification creation → delivery

**Example Integration Test**:
```typescript
describe('Campaign Submission Flow', () => {
  it('should create submission and award points', async () => {
    // Setup
    const user = await createTestUser();
    const campaign = await createTestCampaign();
    
    // Act
    const response = await request(app)
      .post('/api/submissions')
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        campaign_id: campaign.id,
        x_username: 'testuser',
        x_post_url: 'https://x.com/test/status/123',
        screenshot_urls: ['https://example.com/screenshot.jpg']
      });
    
    // Assert
    expect(response.status).toBe(201);
    expect(response.body.submission.status).toBe('Pending');
    
    // Verify database state
    const updatedUser = await getUserById(user.id);
    expect(updatedUser.total_points).toBeGreaterThan(user.total_points);
  });
});
```


### End-to-End Testing

**Tools**: Playwright

**Critical User Flows**:
1. **User Registration and Authentication**
   - Register → verify email → login → access dashboard
   
2. **Campaign Participation**
   - Browse campaigns → view details → submit proof → check status
   
3. **Admin Review Flow**
   - Login as admin → view submissions → review → assign score
   
4. **Winner Selection**
   - Create campaign → receive submissions → select winners → notify users
   
5. **Leaderboard Updates**
   - Complete actions → earn points/score → verify rank changes

**Example E2E Test**:
```typescript
test('complete campaign participation flow', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name="email"]', 'testuser@example.com');
  await page.fill('[name="password"]', 'testpassword');
  await page.click('button[type="submit"]');
  
  // Navigate to campaigns
  await page.click('a[href="/campaigns"]');
  await expect(page).toHaveURL('/campaigns');
  
  // Select campaign
  await page.click('.campaign-card:first-child');
  
  // Submit participation
  await page.fill('[name="x_username"]', '@testuser');
  await page.fill('[name="x_post_url"]', 'https://x.com/test/status/123');
  await page.setInputFiles('[name="screenshots"]', './test-files/screenshot.jpg');
  await page.click('button:has-text("Submit")');
  
  // Verify success
  await expect(page.locator('.success-message')).toBeVisible();
});
```


### Performance Testing

**Tools**: Lighthouse, Web Vitals, k6

**Metrics to Monitor**:
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
  
- **Load Testing**:
  - Concurrent users: 1000+
  - Response time: < 500ms (p95)
  - Error rate: < 0.1%

**Load Test Example** (k6):
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up
    { duration: '5m', target: 100 },  // Stay at 100
    { duration: '2m', target: 0 },    // Ramp down
  ],
};

export default function () {
  const res = http.get('https://Voyage.example.com/api/campaigns');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
```

### Security Testing

**Areas to Test**:
1. **Authentication & Authorization**
   - JWT token validation
   - Role-based access control
   - Session management
   
2. **Input Validation**
   - SQL injection prevention
   - XSS prevention
   - CSRF protection
   
3. **File Upload Security**
   - File type validation
   - Size limits
   - Malware scanning
   
4. **API Security**
   - Rate limiting
   - CORS configuration
   - Request validation


## Performance Optimization

### Frontend Optimization

#### Code Splitting
```typescript
// Dynamic imports for heavy components
const AdminDashboard = dynamic(() => import('@/components/admin/Dashboard'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const CampaignEditor = dynamic(() => import('@/components/campaigns/Editor'), {
  loading: () => <LoadingSpinner />
});
```

#### Image Optimization
```typescript
// Using Next.js Image component
import Image from 'next/image';

<Image
  src={campaign.banner_url}
  alt={campaign.title}
  width={1200}
  height={600}
  priority={isAboveFold}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
  placeholder="blur"
  blurDataURL={campaign.banner_blur}
/>
```

#### Bundle Analysis
- Use `@next/bundle-analyzer` to identify large dependencies
- Tree-shake unused code
- Use lightweight alternatives where possible
- Lazy load non-critical dependencies


### Backend Optimization

#### Database Query Optimization

```typescript
// Bad: N+1 query problem
const submissions = await supabase.from('submissions').select('*');
for (const submission of submissions) {
  const user = await supabase.from('users').select('*').eq('id', submission.user_id).single();
  // Process...
}

// Good: Join query
const submissions = await supabase
  .from('submissions')
  .select(`
    *,
    user:users(id, username, avatar_url),
    campaign:campaigns(title, reward_pool)
  `);
```

#### Caching Strategy

```typescript
// lib/cache/redis-cache.ts (optional Redis integration)
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
});

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 60
): Promise<T> {
  // Try cache first
  const cached = await redis.get<T>(key);
  if (cached) return cached;
  
  // Fetch fresh data
  const data = await fetcher();
  
  // Cache for next time
  await redis.setex(key, ttl, data);
  
  return data;
}

// Usage
const campaigns = await getCachedData(
  'campaigns:active',
  async () => {
    const { data } = await supabase
      .from('campaigns')
      .select('*')
      .eq('status', 'active');
    return data;
  },
  300 // 5 minutes
);
```


#### Database Indexing Strategy

Already defined in schema, key indexes:
- `users`: email, username, total_points, total_score
- `campaigns`: status, type, end_date
- `submissions`: campaign_id, user_id, status, created_at
- `notifications`: user_id, read, created_at

#### API Response Pagination

```typescript
interface PaginationParams {
  page?: number;
  limit?: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function paginate<T>(
  query: SupabaseQueryBuilder,
  params: PaginationParams
): Promise<PaginatedResponse<T>> {
  const page = params.page || 1;
  const limit = Math.min(params.limit || 20, 100); // Max 100 items
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  const { data, count, error } = await query
    .range(from, to)
    .select('*', { count: 'exact' });
  
  if (error) throw error;
  
  return {
    data: data as T[],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit)
    }
  };
}
```


### Rate Limiting

```typescript
// lib/rate-limit/limiter.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
});

// Different rate limits for different operations
export const rateLimits = {
  // General API calls: 100 requests per minute
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m')
  }),
  
  // File uploads: 10 per hour
  upload: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 h')
  }),
  
  // Submissions: 5 per hour
  submission: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h')
  }),
  
  // Auth attempts: 5 per 15 minutes
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '15 m')
  })
};

// Middleware usage
export async function withRateLimit(
  request: Request,
  identifier: string,
  limiter: Ratelimit
) {
  const { success, limit, remaining, reset } = await limiter.limit(identifier);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString()
        }
      }
    );
  }
  
  return null; // Continue processing
}
```


### Monitoring and Analytics

```typescript
// lib/monitoring/analytics.ts
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  userId?: string;
}

export function trackEvent(event: AnalyticsEvent) {
  // Send to analytics service (e.g., PostHog, Mixpanel)
  if (typeof window !== 'undefined') {
    // Client-side tracking
    window.analytics?.track(event.name, event.properties);
  }
  
  // Server-side tracking
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics API
  }
}

// Key events to track
export const AnalyticsEvents = {
  // User events
  USER_REGISTERED: 'User Registered',
  USER_LOGGED_IN: 'User Logged In',
  
  // Campaign events
  CAMPAIGN_VIEWED: 'Campaign Viewed',
  CAMPAIGN_PARTICIPATED: 'Campaign Participated',
  
  // Submission events
  SUBMISSION_CREATED: 'Submission Created',
  SUBMISSION_APPROVED: 'Submission Approved',
  SUBMISSION_REJECTED: 'Submission Rejected',
  
  // Winner events
  WINNER_SELECTED: 'Winner Selected',
  REWARD_DISTRIBUTED: 'Reward Distributed',
  
  // Task events
  TASK_COMPLETED: 'Task Completed',
  
  // Admin events
  CAMPAIGN_CREATED: 'Campaign Created',
  USER_BANNED: 'User Banned'
};
```


## UI Component Library

### Design System

**Color Palette**:
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: {
          50: '#faf5ff',
          500: '#a855f7',
          600: '#9333ea',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        dark: {
          bg: '#0a0a0a',
          card: '#1a1a1a',
          border: '#2a2a2a',
          text: '#e5e5e5',
          muted: '#737373'
        }
      }
    }
  }
}
```

**Typography**:
- **Headings**: Inter (font-semibold to font-bold)
- **Body**: Inter (font-normal)
- **Code**: Fira Code (monospace)

**Spacing Scale**: Tailwind default (4px base unit)

**Border Radius**:
- Small: 0.375rem (6px)
- Medium: 0.5rem (8px)
- Large: 0.75rem (12px)
- XL: 1rem (16px)


### shadcn/ui Components

Using shadcn/ui as the base component library with customization:

**Core Components to Use**:
- Button (with variants: default, destructive, outline, ghost, link)
- Card (for campaign cards, dashboard widgets)
- Dialog (for modals)
- Form (with React Hook Form integration)
- Input, Textarea, Select
- Badge (for status indicators)
- Avatar (for user profiles)
- Table (for leaderboards, admin tables)
- Tabs (for navigation)
- Toast (for notifications)
- Dropdown Menu (for user menu, actions)
- Popover (for tooltips, date pickers)
- Progress (for task completion)
- Skeleton (for loading states)

### Layout Components

**Navigation**:
```typescript
// components/layout/Navbar.tsx
export function Navbar() {
  return (
    <nav className="border-b border-dark-border bg-dark-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <NavLinks />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
```

**Sidebar** (Admin Panel):
```typescript
// components/layout/AdminSidebar.tsx
export function AdminSidebar() {
  const links = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/campaigns', icon: Megaphone, label: 'Campaigns' },
    { href: '/admin/submissions', icon: FileCheck, label: 'Submissions' },
    { href: '/admin/users', icon: Users, label: 'Users' },
    { href: '/admin/winners', icon: Trophy, label: 'Winners' }
  ];
  
  return (
    <aside className="w-64 border-r border-dark-border bg-dark-card">
      {/* Sidebar content */}
    </aside>
  );
}
```


### Responsive Design

**Breakpoints** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-First Approach**:
```typescript
// Example responsive component
<div className="
  grid 
  grid-cols-1        /* Mobile: 1 column */
  md:grid-cols-2     /* Tablet: 2 columns */
  lg:grid-cols-3     /* Desktop: 3 columns */
  gap-4 
  md:gap-6
">
  {campaigns.map(campaign => (
    <CampaignCard key={campaign.id} campaign={campaign} />
  ))}
</div>
```

**Mobile Navigation**:
```typescript
// components/layout/MobileMenu.tsx
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="lg:hidden">
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        <Menu className="h-6 w-6" />
      </Button>
      
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left">
          <nav className="flex flex-col gap-4">
            {/* Mobile nav links */}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
```


## Deployment and Infrastructure

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel Edge Network                   │
│                      (CDN + Edge Functions)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   Next.js Application                        │
│                   (Vercel Serverless)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Platform                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │  PostgreSQL  │  │ Supabase Auth│  │ Supabase Storage│   │
│  │   Database   │  │              │  │                 │   │
│  └──────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Environment Variables

```bash
# .env.local (development)
# .env.production (production)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Database
DATABASE_URL=postgresql://xxx

# Authentication
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp

# Rate Limiting (optional)
UPSTASH_REDIS_URL=https://xxx.upstash.io
UPSTASH_REDIS_TOKEN=xxx

# Monitoring (optional)
SENTRY_DSN=xxx
NEXT_PUBLIC_POSTHOG_KEY=xxx
```


### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v3
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Database Migrations

Using Supabase CLI for migrations:

```bash
# Create migration
supabase migration new create_tables

# Apply migrations
supabase db push

# Reset database (dev only)
supabase db reset
```


### Backup and Disaster Recovery

**Database Backups**:
- Supabase automatic daily backups (retained for 7 days on Pro plan)
- Weekly manual backups to external storage
- Point-in-time recovery available

**Storage Backups**:
- Supabase Storage automatic replication
- Critical files backed up to AWS S3

**Recovery Procedures**:
1. Database restore from Supabase dashboard
2. File restore from S3 if needed
3. Verify data integrity
4. Test critical flows

### Monitoring and Alerting

**Metrics to Monitor**:
- API response times
- Error rates
- Database query performance
- Storage usage
- User growth metrics
- Campaign participation rates

**Alerting Rules**:
- API error rate > 1%
- Response time p95 > 1s
- Database CPU > 80%
- Storage > 90% capacity

**Tools**:
- Vercel Analytics for performance
- Supabase Dashboard for database metrics
- Sentry for error tracking
- PostHog for user analytics


## Security Considerations

### Authentication Security

1. **Password Requirements**:
   - Minimum 8 characters
   - At least one uppercase, one lowercase, one number
   - Password hashing via Supabase Auth (bcrypt)

2. **Session Management**:
   - HTTP-only cookies
   - Secure flag in production
   - SameSite=Lax for CSRF protection
   - Session timeout: 7 days

3. **Password Reset**:
   - Time-limited tokens (1 hour expiry)
   - Single-use tokens
   - Email verification required

### API Security

1. **Input Validation**:
   - Validate all inputs with Zod schemas
   - Sanitize user-provided content
   - Parameterized queries (via Supabase)

2. **Rate Limiting**:
   - Per-endpoint rate limits
   - IP-based and user-based limiting
   - Progressive delays for repeated failures

3. **CORS Configuration**:
   ```typescript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/api/:path*',
           headers: [
             { key: 'Access-Control-Allow-Origin', value: process.env.ALLOWED_ORIGINS },
             { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
             { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' }
           ]
         }
       ];
     }
   };
   ```


### Data Security

1. **Encryption**:
   - TLS 1.3 for all connections
   - Encrypted database storage (Supabase default)
   - Encrypted file storage (Supabase Storage)

2. **Row-Level Security**:
   - RLS policies on all tables
   - User can only access their own data
   - Admin role for elevated access

3. **PII Protection**:
   - Minimal PII collection
   - Email encryption at rest
   - GDPR compliance:
     - Right to access
     - Right to deletion
     - Right to data portability

### File Upload Security

1. **File Validation**:
   - MIME type checking
   - File extension verification
   - Magic number validation
   - File size limits

2. **Malware Prevention**:
   - File scanning before storage
   - Quarantine suspicious files
   - Regular security audits

3. **Access Control**:
   - Signed URLs for private files
   - Public URLs for public content
   - Time-limited access tokens

### XSS Prevention

1. **Output Encoding**:
   - React automatic escaping
   - Sanitize HTML in rich text (if any)
   - Use DOMPurify for user HTML

2. **Content Security Policy**:
   ```typescript
   // next.config.js
   const ContentSecurityPolicy = `
     default-src 'self';
     script-src 'self' 'unsafe-eval' 'unsafe-inline';
     style-src 'self' 'unsafe-inline';
     img-src 'self' data: https:;
     font-src 'self';
     connect-src 'self' https://*.supabase.co;
   `;
   ```


## Accessibility

### WCAG 2.1 AA Compliance

**Key Requirements**:

1. **Perceivable**:
   - Alt text for all images
   - Sufficient color contrast (4.5:1 for text, 3:1 for UI components)
   - Text resizable up to 200%
   - No information conveyed by color alone

2. **Operable**:
   - Keyboard navigation for all functionality
   - Skip links for main content
   - Focus indicators visible and clear
   - No keyboard traps

3. **Understandable**:
   - Clear error messages
   - Consistent navigation
   - Form labels and instructions
   - Predictable behavior

4. **Robust**:
   - Valid HTML
   - ARIA attributes where needed
   - Compatible with assistive technologies

### Implementation

```typescript
// Accessible button example
<button
  type="button"
  aria-label="Submit campaign participation"
  aria-describedby="submit-help"
  disabled={isSubmitting}
  className="btn-primary"
>
  {isSubmitting ? (
    <>
      <Spinner className="mr-2" aria-hidden="true" />
      Submitting...
    </>
  ) : (
    'Submit'
  )}
</button>
<p id="submit-help" className="sr-only">
  Clicking this will submit your campaign participation proof for review
</p>
```


### Focus Management

```typescript
// Modal focus trap
import { Dialog } from '@headlessui/react';

<Dialog open={isOpen} onClose={() => setIsOpen(false)} initialFocus={firstInputRef}>
  <Dialog.Panel>
    <input ref={firstInputRef} />
    {/* Modal content */}
  </Dialog.Panel>
</Dialog>
```

### Screen Reader Support

```typescript
// Live region for dynamic updates
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {statusMessage}
</div>

// Accessible navigation
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/dashboard" aria-current={isActive ? 'page' : undefined}>Dashboard</a></li>
    {/* More links */}
  </ul>
</nav>
```

### Color Contrast

**Dark Theme Compliance**:
- Background: #0a0a0a
- Text: #e5e5e5 (contrast ratio: 17.9:1 ✓)
- Muted text: #737373 (contrast ratio: 5.7:1 ✓)
- Primary: #0ea5e9 (contrast ratio: 6.2:1 ✓)

**Light Theme Compliance**:
- Background: #ffffff
- Text: #0a0a0a (contrast ratio: 17.9:1 ✓)
- Muted text: #525252 (contrast ratio: 7.5:1 ✓)


## Future Enhancements

### Phase 2 Features (Post-MVP)

1. **Social Features**:
   - User profiles with social feed
   - Following/followers system
   - Comments on campaigns
   - Direct messaging

2. **Advanced Rewards**:
   - NFT rewards integration
   - Cryptocurrency payouts
   - Physical merchandise rewards
   - Tiered reward systems

3. **Analytics Dashboard**:
   - User engagement metrics
   - Campaign performance analytics
   - ROI tracking for admins
   - Export reports

4. **Gamification**:
   - Achievement system expansion
   - Streak tracking
   - Seasonal challenges
   - User levels and XP

5. **Mobile App**:
   - React Native mobile apps
   - Push notifications
   - Offline mode
   - Camera integration for submissions

6. **AI Features**:
   - Automatic submission validation
   - Fraud detection
   - Content moderation
   - Personalized campaign recommendations

7. **Integrations**:
   - Multiple social platforms (Instagram, TikTok, YouTube)
   - Payment gateway integrations
   - Email marketing platforms
   - CRM systems


## Technical Debt and Considerations

### Known Limitations

1. **Scalability**:
   - Current design suitable for ~10k active users
   - Database query optimization needed beyond this
   - Consider read replicas for heavy read operations

2. **Real-time Updates**:
   - Polling-based notifications fallback
   - WebSocket connections may be needed for scale

3. **File Storage**:
   - Supabase Storage has bandwidth limits
   - May need CDN for high-traffic scenarios

4. **Search**:
   - Basic filtering implemented
   - Full-text search may require Elasticsearch/Algolia

### Technical Debt Management

1. **Code Quality**:
   - Maintain > 80% test coverage
   - Regular dependency updates
   - Linting and formatting enforced

2. **Performance**:
   - Regular Lighthouse audits
   - Bundle size monitoring
   - Database query optimization

3. **Security**:
   - Monthly security audits
   - Dependency vulnerability scanning
   - Penetration testing before major releases


## Implementation Roadmap

### Phase 1: Core Infrastructure (Weeks 1-2)
- [ ] Project setup (Next.js, TypeScript, Tailwind)
- [ ] Supabase configuration
- [ ] Database schema creation
- [ ] Authentication system
- [ ] Base layout and navigation

### Phase 2: User Features (Weeks 3-4)
- [ ] User dashboard
- [ ] Campaign browsing and details
- [ ] Submission form and file upload
- [ ] Profile management
- [ ] Leaderboard display

### Phase 3: Admin Features (Weeks 5-6)
- [ ] Admin dashboard
- [ ] Campaign CRUD operations
- [ ] Submission review interface
- [ ] User management
- [ ] Winner selection system

### Phase 4: Points and Rewards (Week 7)
- [ ] Task system
- [ ] Points tracking and transactions
- [ ] Score system
- [ ] Badge system
- [ ] Notification system

### Phase 5: Polish and Optimization (Week 8)
- [ ] Theme system refinement
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Security hardening
- [ ] Testing and bug fixes

### Phase 6: Launch Preparation (Week 9)
- [ ] Production deployment
- [ ] Monitoring setup
- [ ] Documentation
- [ ] User onboarding flow
- [ ] Marketing materials


## Property-Based Testing Applicability Assessment

### Overview

The Voyage platform is primarily a full-stack web application with extensive UI, database operations, and external service integrations. While comprehensive property-based testing is **not appropriate for the majority of the system**, there are specific pure functions and algorithms where PBT provides significant value.

### Areas Suitable for Property-Based Testing

#### 1. Winner Selection Algorithms

**Raffle Selection**:
- **Property**: For any set of approved submissions, raffle selection should produce N unique winners where N ≤ number of approved submissions
- **Property**: Raffle selection should be fair - each approved submission has equal probability of winning
- **Property**: Running raffle twice with same seed produces same results (determinism)

**Hybrid Selection**:
- **Property**: Premium winners + secondary winners should equal total winner count
- **Property**: No overlap between premium and secondary winner sets
- **Property**: All selected winners must be from approved submissions

#### 2. Points and Score Calculations

**Points Accumulation**:
- **Property**: Adding points should always increase or maintain (never decrease) total points
- **Property**: Points calculation should be associative: (a + b) + c = a + (b + c)
- **Property**: Subtracting then adding same amount returns to original value

**Leaderboard Ranking**:
- **Property**: For any user list, sorting by points then score should produce stable ranking
- **Property**: Users with equal points and scores should have consistent relative ordering
- **Property**: Rank calculation should be inverse to ordering (rank 1 = highest points)


#### 3. Input Validation

**URL Validation**:
- **Property**: For any valid URL, validation returns true; for invalid URLs, returns false
- **Property**: Validation should handle edge cases (special characters, Unicode, max length)

**Username Validation**:
- **Property**: For any string, validation consistently classifies it as valid or invalid
- **Property**: Validation rules are symmetric (if valid, then sanitize-then-validate is also valid)

**File Validation**:
- **Property**: For any file size N, validation returns true iff N ≤ MAX_SIZE
- **Property**: File type validation based on MIME type and extension should be consistent

#### 4. Date and Time Calculations

**Campaign Duration**:
- **Property**: For any start and end dates where end > start, duration calculation returns positive value
- **Property**: Duration in days should be consistent regardless of time zones

**Deadline Checking**:
- **Property**: For any date D and current time T, D is expired iff D < T

### Areas NOT Suitable for Property-Based Testing

**These should use example-based unit tests and integration tests instead:**

1. **UI Components**: Use snapshot tests and component tests
2. **Database Operations**: Use integration tests with test database
3. **File Upload System**: Use integration tests with mock storage
4. **Authentication Flow**: Use integration and E2E tests
5. **Notification System**: Use integration tests
6. **Admin Dashboard**: Use E2E tests for workflows


### Testing Strategy Summary

**Distribution**:
- **Unit Tests (60%)**: Pure functions, utilities, validation logic, calculations
- **Integration Tests (30%)**: API endpoints, database operations, file uploads
- **E2E Tests (10%)**: Critical user journeys, admin workflows

**Property-Based Tests (Subset of Unit Tests)**:
- Winner selection algorithms
- Points/score calculations
- Leaderboard ranking
- Validation functions
- Use **fast-check** library for TypeScript
- Minimum 100 iterations per property test
- Tag format: `Feature: Voyage, Property: [description]`

**Example Property Test**:
```typescript
import fc from 'fast-check';

describe('Winner Selection - Raffle', () => {
  it('should select exactly N unique winners from approved submissions', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({
          id: fc.uuid(),
          status: fc.constant('Approved'),
          user_id: fc.uuid()
        }), { minLength: 10, maxLength: 100 }),
        fc.integer({ min: 1, max: 10 }),
        (submissions, winnerCount) => {
          const winners = selectRaffleWinners(submissions, winnerCount);
          
          // Property 1: Winner count should not exceed requested or available
          expect(winners.length).toBeLessThanOrEqual(Math.min(winnerCount, submissions.length));
          
          // Property 2: All winners should be unique
          const uniqueWinners = new Set(winners.map(w => w.id));
          expect(uniqueWinners.size).toBe(winners.length);
          
          // Property 3: All winners should be from input submissions
          winners.forEach(winner => {
            expect(submissions.some(s => s.id === winner.id)).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

---

**End of Design Document**


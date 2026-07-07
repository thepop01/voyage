# Implementation Plan: Voyage Campaign Participation Platform

## Overview

This implementation plan breaks down the Voyage platform into discrete, manageable tasks for building a comprehensive campaign participation and reward system. The platform uses Next.js 14 with TypeScript, Supabase for backend services, and follows a server-first architecture with optimistic updates for enhanced user experience.

The implementation follows an incremental approach: database setup → authentication → core features → admin features → polish and optimization.

## Tasks

- [ ] 1. Project Setup and Infrastructure
  - Initialize Next.js 14 project with TypeScript and App Router
  - Configure Tailwind CSS and install shadcn/ui components
  - Set up Supabase project and obtain API keys
  - Configure environment variables for Supabase connection
  - Install required dependencies: zustand, react-hook-form, zod, date-fns, lucide-react
  - Set up project folder structure following the architecture design
  - Configure TypeScript paths and compiler options
  - _Requirements: 18.1, 18.2, 18.3, 18.6_

- [ ] 2. Database Schema Implementation
  - [ ] 2.1 Create core database tables
    - Implement Users table with all fields, indexes, and constraints
    - Implement Campaigns table with campaign types and status checks
    - Implement Submissions table with unique constraint per user per campaign
    - Implement Tasks and UserTasks tables
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6_

  - [ ] 2.2 Create supporting database tables
    - Implement Leaderboards table with period and month indexing
    - Implement Badges and UserBadges tables
    - Implement Notifications table with type constraints
    - Implement PointTransactions and ScoreTransactions audit tables
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6_

  - [ ] 2.3 Configure Row-Level Security policies
    - Implement RLS policies for Users table (own data access)
    - Implement RLS policies for Campaigns table (public read, admin write)
    - Implement RLS policies for Submissions table (own submissions, admin all)
    - Implement RLS policies for Notifications table (own notifications only)
    - _Requirements: 18.1, 18.3, 18.4_

- [ ] 3. TypeScript Types and Interfaces
  - [ ] 3.1 Define core type definitions
    - Create User, Campaign, and Submission TypeScript interfaces
    - Create Task, UserTask, and Leaderboard TypeScript interfaces
    - Create Badge, UserBadge, and Notification TypeScript interfaces
    - Define all enum types: CampaignType, CampaignStatus, SubmissionStatus, TaskType, NotificationType
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 4.1, 5.1, 6.1, 8.1, 9.1, 13.1, 14.1_

- [ ] 4. Supabase Storage Configuration
  - [ ] 4.1 Set up storage buckets and policies
    - Create avatars, screenshots, and banners storage buckets
    - Implement storage policies for public read access on all buckets
    - Implement storage policies for authenticated user uploads
    - Implement storage policies for admin-only banner uploads
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_

- [ ] 5. Authentication System
  - [ ] 5.1 Implement Supabase Auth integration
    - Create Supabase client configuration for server and client components
    - Implement middleware for session management and route protection
    - Create AuthContext provider with user state and session management
    - Implement role-based access control helper functions
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 11.6_

  - [ ] 5.2 Build authentication UI components
    - Create LoginForm component with email/password validation
    - Create RegisterForm component with username, email, password fields
    - Create PasswordResetForm component for password recovery
    - Implement form validation using react-hook-form and zod
    - _Requirements: 1.1, 1.2, 1.3_

  - [ ] 5.3 Implement authentication API routes
    - Create POST /api/auth/register endpoint with user creation
    - Create POST /api/auth/login endpoint with credential validation
    - Create POST /api/auth/logout endpoint
    - Create POST /api/auth/reset-password and update-password endpoints
    - _Requirements: 1.1, 1.2, 1.3, 1.6_

  - [ ]* 5.4 Write unit tests for authentication
    - Test registration validation and user creation
    - Test login with valid and invalid credentials
    - Test password reset token generation and validation
    - Test role-based access control functions
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 6. File Upload System
  - [ ] 6.1 Create file upload utilities
    - Implement file validation function for size, type, and extension checks
    - Implement unique filename generation function
    - Implement image processing functions for resize and optimization
    - Create uploadFile function with Supabase Storage integration
    - _Requirements: 19.1, 19.2, 19.3, 19.4_

  - [ ] 6.2 Implement upload API endpoints
    - Create POST /api/upload/avatar endpoint with 5MB limit
    - Create POST /api/upload/screenshots endpoint supporting 1-5 files
    - Create POST /api/upload/banner endpoint for admin-only access
    - Implement proper error handling and validation responses
    - _Requirements: 19.1, 19.2, 19.3, 3.5, 3.6_

  - [ ]* 6.3 Write unit tests for file upload
    - Test file size validation
    - Test file type validation
    - Test unique filename generation
    - Test upload error scenarios
    - _Requirements: 19.1, 19.2_

- [ ] 7. Checkpoint - Verify foundation
  - Ensure all tests pass, verify database schema is correctly deployed, and ask the user if questions arise.

- [ ] 8. Campaign Management System
  - [ ] 8.1 Implement campaign data layer
    - Create campaign service functions for CRUD operations
    - Implement campaign filtering and pagination logic
    - Implement campaign status validation and transition logic
    - Create participant count increment function
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ] 8.2 Build campaign API endpoints
    - Create GET /api/campaigns endpoint with status and type filters
    - Create GET /api/campaigns/:id endpoint with access control
    - Create POST /api/campaigns endpoint for admin campaign creation
    - Create PUT /api/campaigns/:id endpoint for admin updates
    - Create DELETE /api/campaigns/:id endpoint with submission checks
    - Create POST /api/campaigns/:id/end endpoint for manual closure
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.1_

  - [ ] 8.3 Create campaign UI components
    - Create CampaignCard component for grid and list views
    - Create CampaignList component with filtering and pagination
    - Create CampaignDetail component displaying all campaign information
    - Implement campaign status badges and type indicators
    - _Requirements: 2.1, 2.2, 2.3, 3.1_

  - [ ]* 8.4 Write integration tests for campaigns
    - Test campaign creation with all three campaign types
    - Test campaign filtering by status and type
    - Test campaign deletion with and without submissions
    - Test automatic campaign closure on end date
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 2.6, 2.7_

- [ ] 9. Submission System
  - [ ] 9.1 Implement submission data layer
    - Create submission service functions for create, read, and update
    - Implement submission status transition validation
    - Create submission filtering functions by campaign, user, and status
    - Implement participant count update logic
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.7_

  - [ ] 9.2 Build submission API endpoints
    - Create GET /api/submissions endpoint with filtering and pagination
    - Create GET /api/submissions/:id endpoint with access control
    - Create POST /api/submissions endpoint with validation
    - Create PUT /api/submissions/:id/review endpoint for admin review
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ] 9.3 Create submission UI components
    - Create CampaignSubmissionForm with file upload integration
    - Create SubmissionCard component for display and review
    - Create SubmissionReviewPanel for admin review interface
    - Create SubmissionStatusBadge component with color coding
    - Implement URL validation for X post URLs
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.2, 4.3_

  - [ ]* 9.4 Write integration tests for submissions
    - Test submission creation with screenshot uploads
    - Test submission approval with score assignment
    - Test submission rejection
    - Test one submission per user per campaign constraint
    - _Requirements: 3.2, 3.3, 3.4, 4.3, 4.4, 4.5, 4.6_

- [ ] 10. Points System
  - [ ] 10.1 Implement points service functions
    - Create awardPoints function with transaction logging
    - Implement points sources: daily_login, campaign_participation, referral, task_completion, admin_adjustment
    - Create updateUserPoints function to update total_points in users table
    - Implement getPointTransactions function for audit trail retrieval
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ] 10.2 Build points API endpoints
    - Create POST /api/users/:id/adjust-points endpoint for admin adjustments
    - Integrate points awarding into submission approval endpoint
    - Integrate points awarding into task completion endpoint
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ] 10.3 Create points display components
    - Create PointsScoreWidget showing recent points earned
    - Integrate points display into DashboardStats component
    - Integrate points display into ProfileStats component
    - _Requirements: 6.5, 10.1, 10.5, 12.2_

  - [ ]* 10.4 Write unit tests for points system
    - Test points awarding for each source type
    - Test transaction logging
    - Test user total_points update
    - Test admin points adjustment
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 11. Score System
  - [ ] 11.1 Implement score service functions
    - Create assignScore function for submission scoring
    - Implement score range validation (0-100)
    - Create updateUserScore function to update total_score in users table
    - Implement getScoreTransactions function for audit trail
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ] 11.2 Build score API endpoints
    - Create POST /api/users/:id/adjust-score endpoint for admin adjustments
    - Integrate score assignment into submission review endpoint
    - Implement score validation middleware
    - _Requirements: 7.1, 7.2, 7.4, 4.4, 4.7_

  - [ ] 11.3 Create score display components
    - Integrate score display into DashboardStats component
    - Integrate score display into ProfileStats component
    - Integrate score display into LeaderboardEntry component
    - _Requirements: 7.3, 10.1, 12.2_

  - [ ]* 11.4 Write unit tests for score system
    - Test score assignment within valid range
    - Test score range validation rejects values outside 0-100
    - Test user total_score update
    - Test admin score adjustment
    - _Requirements: 7.1, 7.2, 7.4_

- [ ] 12. Task Management System
  - [ ] 12.1 Implement task data layer
    - Create task service functions for CRUD operations
    - Implement task filtering by type and status
    - Create completeTask function with user_tasks record creation
    - Implement daily task reset logic with scheduled job
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ] 12.2 Build task API endpoints
    - Create GET /api/tasks endpoint with filtering
    - Create GET /api/tasks/:id endpoint with user completion status
    - Create POST /api/tasks/:id/complete endpoint with points integration
    - Create POST /api/tasks endpoint for admin task creation
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [ ] 12.3 Create task UI components
    - Create TaskCard component displaying title, description, points, and completion status
    - Create TaskList component with category filtering
    - Implement task completion button with optimistic updates
    - _Requirements: 8.1, 8.2, 8.3, 8.5_

  - [ ]* 12.4 Write integration tests for tasks
    - Test task completion and points awarding
    - Test daily task reset functionality
    - Test task filtering by type
    - Test preventing duplicate task completion
    - _Requirements: 8.3, 8.4, 8.6_

- [ ] 13. Leaderboard System
  - [ ] 13.1 Implement leaderboard data layer
    - Create updateLeaderboard function to calculate and update rankings
    - Implement ranking logic: primary sort by points, secondary by score
    - Create getGlobalLeaderboard function with pagination
    - Create getMonthlyLeaderboard function with month parameter
    - Implement monthly leaderboard reset scheduled job
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [ ] 13.2 Build leaderboard API endpoints
    - Create GET /api/leaderboard/global endpoint with pagination
    - Create GET /api/leaderboard/monthly endpoint with month filtering
    - Include currentUserRank in both endpoint responses
    - _Requirements: 9.1, 9.2, 9.3, 9.7_

  - [ ] 13.3 Create leaderboard UI components
    - Create LeaderboardTable component with rank, user info, and stats columns
    - Create LeaderboardEntry component with top-3 medal icons
    - Implement current user row highlighting
    - Add pagination controls to leaderboard tables
    - _Requirements: 9.1, 9.2, 9.4, 9.5, 9.7_

  - [ ]* 13.4 Write integration tests for leaderboard
    - Test leaderboard ranking calculation
    - Test tie-breaking logic (equal points, sort by score)
    - Test monthly leaderboard reset
    - Test pagination
    - _Requirements: 9.3, 9.4, 9.5, 9.6_

- [ ] 14. Checkpoint - Verify core features
  - Ensure all tests pass, verify campaign flow from creation to submission, and ask the user if questions arise.

- [ ] 15. Winner Selection System
  - [ ] 15.1 Implement winner selection logic
    - Create selectWinners function for Admin_Selection type
    - Create raffleWinners function for random selection from approved submissions
    - Create hybridSelection function for two-tier selection
    - Implement winner count validation against campaign settings
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ] 15.2 Build winner selection API endpoints
    - Create POST /api/campaigns/:id/select-winners endpoint
    - Implement submission status updates to Winner
    - Integrate notification creation for winning users
    - Implement reward amount assignment based on prize pools
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

  - [ ] 15.3 Create winner selection UI components
    - Create WinnerSelectionInterface with method-specific views
    - Implement manual checkbox selection for Admin_Selection
    - Implement random selection preview and confirm for Raffle
    - Implement two-tier selection interface for Hybrid_Selection
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ]* 15.4 Write integration tests for winner selection
    - Test Admin_Selection with manual winner selection
    - Test Raffle random selection respects winner count
    - Test Hybrid_Selection splits winners correctly between pools
    - Test winner notification creation
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

- [ ] 16. Badge and Achievement System
  - [ ] 16.1 Implement badge logic
    - Create badge criteria definitions for milestones
    - Create checkAndAwardBadges function to evaluate criteria
    - Implement badge awarding for: first campaign, point thresholds, win counts, score thresholds
    - Create getUserBadges function to retrieve earned badges
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [ ] 16.2 Build badge API endpoints
    - Create GET /api/users/:id/badges endpoint
    - Integrate badge checking into submission approval
    - Integrate badge checking into points/score updates
    - _Requirements: 13.1, 13.2, 13.4_

  - [ ] 16.3 Create badge display components
    - Create BadgeDisplay component with grid and list layouts
    - Implement badge tooltips with criteria and earned date
    - Integrate badges into ProfileStats component
    - _Requirements: 13.2, 12.3_

  - [ ]* 16.4 Write unit tests for badge system
    - Test badge criteria evaluation
    - Test badge awarding prevents duplicates
    - Test notification creation on badge earn
    - _Requirements: 13.1, 13.3, 13.4_

- [ ] 17. Notification System
  - [ ] 17.1 Implement notification service
    - Create createNotification function for all notification types
    - Implement notification types: submission_approved, submission_rejected, campaign_launched, winner_selected, reward_distributed, badge_earned
    - Create getUserNotifications function with read filter
    - Create markNotificationAsRead and markAllAsRead functions
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

  - [ ] 17.2 Build notification API endpoints
    - Create GET /api/notifications endpoint with read filter
    - Create PUT /api/notifications/:id/read endpoint
    - Create PUT /api/notifications/read-all endpoint
    - _Requirements: 14.6, 14.7_

  - [ ] 17.3 Create notification UI components
    - Create NotificationDropdown component with unread badge
    - Implement notification list with icons by type
    - Implement mark as read on click
    - Add real-time polling for new notifications
    - _Requirements: 14.6, 14.7_

  - [ ] 17.4 Integrate notification triggers
    - Add notification creation to submission approval/rejection
    - Add notification creation to campaign launch
    - Add notification creation to winner selection
    - Add notification creation to badge earning
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

  - [ ]* 17.5 Write integration tests for notifications
    - Test notification creation for each event type
    - Test marking notifications as read
    - Test unread count calculation
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.7_

- [ ] 18. User Dashboard
  - [ ] 18.1 Implement dashboard data layer
    - Create getUserStats function aggregating points, score, rank, campaigns, wins
    - Create getActiveCampaigns function for widget
    - Create getRecentActivity function for feed
    - Create getUpcomingDeadlines function for widget
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

  - [ ] 18.2 Create dashboard UI components
    - Create DashboardStats component with key metrics display
    - Create ActiveCampaignsWidget with quick join actions
    - Create RecentActivityFeed with timeline display
    - Create UpcomingDeadlinesWidget with countdown timers
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

  - [ ] 18.3 Build dashboard page
    - Create /dashboard route with layout
    - Integrate all dashboard widgets
    - Implement real-time updates for stats
    - Set dashboard as default page after login
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

- [ ] 19. User Profile Management
  - [ ] 19.1 Implement profile data layer
    - Create getUserProfile function with public/private field filtering
    - Create updateUserProfile function with validation
    - Create getSubmissionHistory function with status filtering
    - _Requirements: 12.1, 12.2, 12.4, 12.5_

  - [ ] 19.2 Build profile API endpoints
    - Create GET /api/users/:id endpoint with access control
    - Create PUT /api/users/:id endpoint for profile updates
    - Create GET /api/users/:id/submissions endpoint with filtering
    - _Requirements: 12.1, 12.2, 12.5_

  - [ ] 19.3 Create profile UI components
    - Create ProfileHeader with avatar, username, bio, social links, and stats
    - Create ProfileStats displaying campaigns joined, won, approval rate, and rewards
    - Create SubmissionHistory table with filtering
    - Create AvatarUpload component with preview and validation
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.6_

  - [ ] 19.4 Build profile page
    - Create /profile/[id] route
    - Implement edit mode for own profile
    - Integrate badge display on profile
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

  - [ ]* 19.5 Write integration tests for profile
    - Test profile visibility (public vs private fields)
    - Test profile update validation
    - Test avatar upload
    - _Requirements: 12.1, 12.5, 12.6_

- [ ] 20. Admin Dashboard
  - [ ] 20.1 Implement admin data layer
    - Create getPlatformStats function for total users, campaigns, submissions, rewards
    - Create getRecentActivity function for admin dashboard
    - Create date range filtering for statistics
    - _Requirements: 11.1, 11.6_

  - [ ] 20.2 Build admin API endpoints
    - Create GET /api/admin/stats endpoint with role check
    - Create GET /api/admin/users endpoint with filtering and search
    - Implement admin-only middleware for all admin endpoints
    - _Requirements: 11.1, 11.6_

  - [ ] 20.3 Create admin UI components
    - Create AdminDashboardStats component with platform metrics
    - Create CampaignManagementTable with CRUD actions and bulk operations
    - Create UserManagementTable with ban, adjust points/score, view submissions
    - Create SubmissionReviewPanel already implemented in task 9.3
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [ ] 20.4 Build admin pages
    - Create /admin/dashboard route with stats display
    - Create /admin/campaigns route with management table
    - Create /admin/submissions route with review panel
    - Create /admin/users route with user management table
    - Create /admin/winners route with winner selection interface
    - Implement admin role check on all admin routes
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

  - [ ]* 20.5 Write integration tests for admin features
    - Test admin access restrictions for non-admin users
    - Test user ban/unban functionality
    - Test admin points and score adjustment
    - _Requirements: 11.4, 11.6_

- [ ] 21. Theme System
  - [ ] 21.1 Implement theme functionality
    - Create ThemeContext with dark/light state
    - Create ThemeProvider component
    - Implement theme toggle function with localStorage persistence
    - Configure Tailwind CSS dark mode support
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_

  - [ ] 21.2 Create theme UI components
    - Create ThemeToggle component with icon switching
    - Apply theme classes to all components consistently
    - Test theme switching across all pages
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_

- [ ] 22. Navigation System
  - [ ] 22.1 Create navigation components
    - Create main navigation with links to Dashboard, Campaigns, Tasks, Leaderboard, Profile
    - Implement role-based navigation (show Admin link only for admins)
    - Create responsive mobile navigation with hamburger menu
    - Implement active page highlighting
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6_

  - [ ] 22.2 Build layout components
    - Create authenticated layout wrapper with navigation and notifications
    - Create public layout for authentication pages
    - Integrate ThemeToggle into navigation
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6_

- [ ] 23. Responsive Design Implementation
  - [ ] 23.1 Implement responsive layouts
    - Apply Tailwind responsive utilities to all components
    - Test desktop layout (1024px+) for all pages
    - Test tablet layout (768-1023px) for all pages
    - Test mobile layout (320-767px) for all pages
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 23.2 Optimize mobile experience
    - Implement touch-friendly button sizes
    - Optimize image loading for mobile devices
    - Test navigation collapse and mobile menu
    - _Requirements: 15.2, 15.3, 15.4, 15.5_

- [ ] 24. Performance Optimization
  - [ ] 24.1 Implement caching and optimization
    - Configure Next.js caching strategy for static and dynamic data
    - Implement code splitting for route-based bundles
    - Optimize images using Next.js Image component
    - Implement lazy loading for heavy components
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_

  - [ ] 24.2 Optimize database queries
    - Add database indexes for frequently queried columns
    - Implement query result caching for leaderboard
    - Optimize submission queries with proper joins
    - _Requirements: 20.1, 20.5_

  - [ ]* 24.3 Performance testing
    - Test page load times on standard broadband
    - Test API response times under load
    - Verify animation performance (150-300ms durations)
    - _Requirements: 20.1, 20.6_

- [ ] 25. Campaign Pages Implementation
  - [ ] 25.1 Build campaign list page
    - Create /campaigns route with CampaignList component
    - Implement campaign filtering by status and type
    - Add pagination controls
    - _Requirements: 2.1, 3.1_

  - [ ] 25.2 Build campaign detail page
    - Create /campaigns/[id] route with CampaignDetail component
    - Integrate CampaignSubmissionForm for participation
    - Display participant count and deadline countdown
    - _Requirements: 2.1, 3.1, 3.2_

- [ ] 26. Task Page Implementation
  - [ ] 26.1 Build task page
    - Create /tasks route with TaskList component
    - Implement task category filtering
    - Display task completion status
    - Integrate task completion with optimistic updates
    - _Requirements: 8.1, 8.2, 8.5_

- [ ] 27. Leaderboard Page Implementation
  - [ ] 27.1 Build leaderboard page
    - Create /leaderboard route with tab navigation
    - Integrate LeaderboardTable for global view
    - Integrate LeaderboardTable for monthly view
    - Implement current user highlighting
    - _Requirements: 9.1, 9.2, 9.7_

- [ ] 28. State Management Setup
  - [ ] 28.1 Implement Zustand stores
    - Create NotificationStore with fetchNotifications and mark as read functions
    - Create CampaignStore with fetchCampaigns and filter functions
    - Configure store persistence where needed
    - _Requirements: 14.6, 14.7, 2.1_

  - [ ] 28.2 Integrate context providers
    - Set up AuthContext provider at app root
    - Set up ThemeContext provider at app root
    - Integrate Zustand stores with components
    - _Requirements: 1.1, 1.2, 16.1, 16.3_

- [ ] 29. Form Validation Implementation
  - [ ] 29.1 Create Zod validation schemas
    - Create schema for user registration
    - Create schema for campaign creation
    - Create schema for submission creation
    - Create schema for profile update
    - _Requirements: 1.1, 2.3, 3.2, 12.5_

  - [ ] 29.2 Integrate React Hook Form
    - Apply validation schemas to all forms
    - Implement error message display
    - Add client-side validation feedback
    - _Requirements: 1.1, 2.3, 3.2, 12.5_

- [ ] 30. Checkpoint - Verify complete application
  - Ensure all tests pass, verify all user flows work end-to-end, and ask the user if questions arise.

- [ ] 31. Error Handling and Edge Cases
  - [ ] 31.1 Implement error boundaries
    - Create error boundary components for route-level error handling
    - Implement fallback UI for error states
    - Add error logging and reporting
    - _Requirements: 20.1_

  - [ ] 31.2 Handle edge cases
    - Implement proper loading states for all async operations
    - Handle empty states (no campaigns, no submissions, etc.)
    - Implement network error recovery
    - Add validation for expired campaigns and tasks
    - _Requirements: 2.7, 8.6, 20.1_

- [ ] 32. Accessibility Implementation
  - [ ] 32.1 Add ARIA attributes and semantic HTML
    - Add proper ARIA labels to all interactive elements
    - Use semantic HTML elements throughout
    - Implement keyboard navigation for all interactive components
    - Ensure proper focus management
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

  - [ ]* 32.2 Accessibility testing
    - Test keyboard navigation flows
    - Test screen reader compatibility
    - Verify color contrast ratios meet WCAG 2.1 AA standards
    - _Requirements: 15.1, 15.2, 15.3_

- [ ] 33. Scheduled Jobs and Automation
  - [ ] 33.1 Implement scheduled tasks
    - Create scheduled job for campaign end date checking and status updates
    - Create scheduled job for daily task reset (runs every 24 hours)
    - Create scheduled job for monthly leaderboard reset (runs on first day of month)
    - Configure job scheduling using Supabase Edge Functions or external scheduler
    - _Requirements: 2.7, 8.6, 9.6_

- [ ] 34. Security Hardening
  - [ ] 34.1 Implement security measures
    - Add rate limiting to API endpoints
    - Implement CSRF protection (verify Next.js built-in protection)
    - Add input sanitization for user-generated content
    - Implement secure file upload validation (already in task 6)
    - _Requirements: 1.6, 19.1, 19.2, 19.5_

  - [ ] 34.2 Review and test RLS policies
    - Test RLS policies prevent unauthorized access
    - Test admin-only endpoints reject non-admin users
    - Verify session management and token refresh
    - _Requirements: 1.4, 1.5, 11.6_

- [ ] 35. Data Seeding and Testing Data
  - [ ] 35.1 Create seed data
    - Create seed script for sample users (both User and Admin roles)
    - Create seed script for sample campaigns (all three types)
    - Create seed script for sample tasks
    - Create seed script for sample badges
    - _Requirements: 1.4, 2.2, 8.1, 13.1_

- [ ] 36. Documentation and Polish
  - [ ] 36.1 Create documentation
    - Write README with setup instructions
    - Document environment variables required
    - Create API documentation for endpoints
    - Write deployment guide
    - _Requirements: 18.2, 20.2_

  - [ ] 36.2 UI polish and refinements
    - Review and refine UI component styling for consistency
    - Add smooth transitions and animations (150-300ms)
    - Verify dark/light theme consistency across all components
    - Add helpful tooltips and user guidance
    - _Requirements: 16.6, 20.6_

- [ ] 37. Final Integration and Testing
  - [ ] 37.1 End-to-end testing
    - Test complete user registration to campaign participation flow
    - Test admin campaign creation to winner selection flow
    - Test points and score accumulation across multiple activities
    - Test leaderboard updates after points/score changes
    - _Requirements: 1.1, 1.2, 2.1, 3.2, 5.1, 6.1, 7.1, 9.1_

  - [ ] 37.2 Cross-browser testing
    - Test application in Chrome, Firefox, Safari, and Edge
    - Verify responsive behavior across browsers
    - Test file upload functionality across browsers
    - _Requirements: 15.1, 15.2, 15.3, 19.1_

  - [ ] 37.3 Final review and bug fixes
    - Review all implemented features against requirements
    - Fix any remaining bugs or inconsistencies
    - Optimize any performance bottlenecks identified
    - _Requirements: 20.1_

- [ ] 38. Deployment Preparation
  - [ ] 38.1 Configure production environment
    - Set up production Supabase project
    - Configure production environment variables
    - Set up production database with migrations
    - Configure Supabase Storage buckets in production
    - _Requirements: 18.2, 18.3, 19.3_

  - [ ] 38.2 Deploy application
    - Deploy Next.js application to Vercel or chosen platform
    - Verify all features work in production environment
    - Set up monitoring and error tracking
    - Configure domain and SSL certificates
    - _Requirements: 20.1, 20.2_

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements from the requirements document for traceability
- The implementation follows a progressive approach: foundation → core features → admin features → polish
- Checkpoint tasks ensure validation at critical milestones
- Testing is integrated throughout as optional sub-tasks to maintain code quality
- Database setup and authentication are prioritized as they are dependencies for all other features
- The implementation leverages Next.js Server Components and Server Actions for optimal performance
- TypeScript provides compile-time safety throughout the application
- Supabase handles authentication, database, and storage with built-in security features


## Task Dependency Graph

```json
{
  "waves": [
    {
      "id": 0,
      "tasks": ["2.1", "2.2", "3.1", "4.1"]
    },
    {
      "id": 1,
      "tasks": ["2.3", "5.1", "6.1"]
    },
    {
      "id": 2,
      "tasks": ["5.2", "5.3", "6.2", "8.1", "10.1", "11.1", "12.1", "13.1", "16.1", "17.1", "19.1", "20.1", "21.1", "28.1", "29.1"]
    },
    {
      "id": 3,
      "tasks": ["5.4", "6.3", "8.2", "10.2", "11.2", "12.2", "13.2", "16.2", "17.2", "19.2", "20.2", "22.1", "28.2", "29.2"]
    },
    {
      "id": 4,
      "tasks": ["8.3", "9.1", "10.3", "11.3", "12.3", "13.3", "17.3", "18.1", "19.3", "20.3", "21.2", "22.2"]
    },
    {
      "id": 5,
      "tasks": ["8.4", "9.2", "10.4", "11.4", "12.4", "13.4", "15.1", "16.3", "18.2", "24.1", "25.1"]
    },
    {
      "id": 6,
      "tasks": ["9.3", "15.2", "16.4", "17.4", "18.3", "19.4", "20.4", "24.2", "25.2", "26.1", "27.1", "31.1", "32.1", "33.1", "35.1"]
    },
    {
      "id": 7,
      "tasks": ["9.4", "15.3", "17.5", "19.5", "20.5", "23.1", "24.3", "31.2", "32.2", "34.1"]
    },
    {
      "id": 8,
      "tasks": ["15.4", "23.2", "34.2", "36.1", "36.2", "37.1"]
    },
    {
      "id": 9,
      "tasks": ["37.2", "37.3", "38.1"]
    },
    {
      "id": 10,
      "tasks": ["38.2"]
    }
  ]
}
```

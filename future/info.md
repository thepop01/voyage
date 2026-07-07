# Future Pages — Voyage

This folder contains pages that are planned for future activation. The code is fully written and functional but these pages are **not currently linked in the navigation**. Do not delete this folder.

---

## 📡 Alpha — Community Intelligence Feed

**Route:** `/alpha`  
**File:** `future/alpha/page.tsx`

### What it is
The Alpha page is a community-driven intelligence hub where verified callers share market calls and predictions across multiple categories.

### Features (fully built)
- **Feed categories:** Polymarket, Crypto, Stock, Meme
- **Search & Sort:** Full-text search across post titles, bodies, tickers, and caller names. Sort by Newest, Most Liked, Highest Target %, or Best Caller success rate.
- **Following tab:** See only posts from callers you follow.
- **Saved/Bookmark tab:** Bookmark any call and view saved calls in a dedicated tab.
- **Comment threads:** Expandable comment section on every post with replies and likes.
- **"Post a Call" modal:** Users can submit a new alpha call with category, ticker, target %, and thesis body.
- **Caller leaderboard:** Cards for each caller showing success rate, streak (🔥 win / ❄️ loss), follower count, and X/Twitter link.
- **Trending Now section:** Top 3 most-liked posts from the last 48h surfaced above the feed.
- **Caller profile modal:** Click a caller to see their best/worst call, category breakdown, and follow toggle.
- **Streak badges:** Win/loss streaks displayed on caller cards.

### Why it's paused
Not yet activated for the initial launch. Will be enabled once the caller verification system is ready.

---

## 🛠 Tools — Wallet Tracker Hub

**Route:** `/tools`  
**Files:**
- `future/tools/page.tsx` — Main tools dashboard/landing
- `future/tools/polymarket/page.tsx` — Polymarket wallet tracker
- `future/tools/nft-mint/page.tsx` — NFT mint wallet tracker

### What it is
A two-section tracker tool where users can monitor wallets for both Polymarket activity and upcoming NFT mint whitelists.

### Polymarket Tracker (`/tools/polymarket`)
- Add and track multiple wallets
- View open positions, resolved bets, and full trade history per wallet
- Wallet click-through shows complete history of all trades that are running
- Filters: by market category, outcome (win/loss/open), date range
- Settings: alert thresholds, notification preferences
- All wallets pulled from the user's saved wallets in their Profile

### NFT Mint Tracker (`/tools/nft-mint`)
- Tracks user wallets for NFT whitelist spots on upcoming mints
- Notifies users if any of their wallets have a WL for an upcoming mint
- Shows mint date, chain, project details, and floor estimates
- Filters by chain, mint date, status (upcoming / live / ended)

### Why it's paused
Bot infrastructure (Polymarket + NFT mint data feeds) not yet connected. Will activate once backend data pipelines are ready.

---

## Activation Checklist

When ready to re-enable a page:
1. Copy the relevant folder back to `src/app/(dashboard)/`
2. Add the nav item back to `src/components/layout/Dock.tsx`
3. Add the nav item back to `src/components/layout/Topbar.tsx`
4. Remove from this `future/` folder (or keep as reference)

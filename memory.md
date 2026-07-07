# Voyage — Project Memory

> Last updated: 2026-06-13
> Status: Fully converted to a **Next.js 14 App Router** application with React Context, global state, and a highly polished dark glassmorphic design system.

---

## Technical Stack & Architecture
- **Framework**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Inline styles and Tailwind classes to achieve complex, responsive glassmorphism.
- **Design System**: Dark theme (deep navy `#09091a` background), accented with purple (`#7c3aed`), dark blue, and emerald green. Strict rule: White fonts, dark buttons, no bright rainbow/orange/yellow colors for a premium, high-end feel.
- **State Management**: React Context (`WalletContext.tsx`) for global user state (e.g., connected wallets).

---

## File Structure & Routing

| Route | File | Description |
|-------|------|-------------|
| **`/`** | `src/app/page.tsx` | Main landing page |
| **`/(dashboard)`** | `src/app/(dashboard)/layout.tsx` | Shared layout with topbar, background gradients, and dock |
| **`/dashboard`** | `src/app/(dashboard)/dashboard/page.tsx` | Main command center, metrics, user summary |
| **`/profile`** | `src/app/(dashboard)/profile/page.tsx` | User profile page. **Manages multi-chain wallet connections** |
| **`/raffle`** | `src/app/(dashboard)/raffle/page.tsx` | Raffle participation platform (uses REP points, gates via specific wallet chains, X links) |
| **`/alpha`** | `src/app/(dashboard)/alpha/page.tsx` | Market intelligence hub (Polymarket categories, AI tools) |
| **`/tools`** | `src/app/(dashboard)/tools/page.tsx` | Tools Hub linking to dedicated automated tracker bots |
| **`/tools/polymarket`**| `src/app/(dashboard)/tools/polymarket/page.tsx`| Polymarket Wallet Tracker (trade history, P&L analytics, mock trade generation) |
| **`/tools/nft-mint`**  | `src/app/(dashboard)/tools/nft-mint/page.tsx` | NFT Mint Tracker (WL Status Matrix, live countdowns, multi-wallet sync) |

---

## Core Features & Logic

### 1. Global Wallet System (`WalletContext`)
Users no longer manage wallets individually per tool.
- The `WalletContext` acts as the single source of truth.
- Users add/manage their wallets (Ethereum, Solana, Polygon) exclusively on the **Profile** page.
- One wallet per chain can be set as `isDefault`.
- The entire app (`/raffle`, `/tools`) automatically reads from this global context.

### 2. Raffle System (`/raffle`)
- Entry costs **REP points** (earned via tasks). Users can select how many REP to spend (1 REP = 1 Ticket).
- Raffles are **Chain-gated**. (e.g., an Ethereum NFT raffle requires an Ethereum wallet).
- Users can switch between their eligible wallets directly inside the entry modal before submitting.
- Includes X (Twitter) gating for project links.

### 3. Automated Trackers Suite (`/tools`)
The old static tools dashboard was entirely rebuilt into a 3-page suite to provide depth:
- **Hub (`/tools`)**: Clean overview cards linking to specific bots.
- **Polymarket Tracker (`/tools/polymarket`)**:
  - Automatically loads all user wallets.
  - Simulates detailed trade history (open/won/lost positions, live P&L).
  - Features an analytics sidebar tracking streaks, category breakdown, and top performers.
- **NFT Mint Tracker (`/tools/nft-mint`)**:
  - **WL Status Matrix**: A comprehensive grid cross-referencing all connected wallets against upcoming mints.
  - Provides clear "✓ WL", "✗", or "⏳ Pending" statuses.
  - Live countdown timers for mint launches and historical ROI tracking.

---

## Design Directives (Strict)
1. **Aesthetics**: Premium, modern glassmorphism.
2. **Colors**: Deep dark navy/purple themes. Avoid generic reds/greens unless strictly used for P&L indicators. NEVER use bright rainbows, yellow, or orange.
3. **Typography**: Space Grotesk / Inter combos. High contrast white text.
4. **Layout**: Content centered with a max-width (e.g., 1280px) inside a 2-column or 3-column dense data grid.

---

## Next Steps / Future Enhancements
- Connect `WalletContext` to actual web3 wallet providers (ethers.js / wagmi / solana-web3.js).
- Hook up Polymarket and OpenSea/MagicEden APIs to the `/tools` dashboards to replace the simulated mock data algorithms.
- Implement real backend databases (Supabase/Firebase) for user authentication and REP point tracking.

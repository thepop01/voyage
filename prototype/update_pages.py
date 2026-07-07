import os
import re

header_html = """      <!-- ===== TOP BAR ===== -->
      <header class="topbar dense">
        <div style="display: flex; align-items: center; gap: 24px;">
          <h2 style="margin-bottom: 0; font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; color: var(--fg);">Voyage</h2>
          <input type="text" placeholder="Search campaigns..." style="width: 240px;">
        </div>
        <div style="display: flex; gap: 4px; align-items: center;">
          <nav class="nav-links">
            <a href="dashboard.html" class="nav-link{dash_active}">Dash</a>
            <a href="campaigns.html" class="nav-link{explore_active}">Explore</a>
            <a href="tasks.html" class="nav-link{tasks_active}">Tasks</a>
            <a href="leaderboard.html" class="nav-link{rank_active}">Rank</a>
            <a href="rewards.html" class="nav-link{earn_active}">Earn</a>
            <a href="admin.html" class="nav-link{admin_active}">Admin</a>
          </nav>
          <div style="width: 1px; height: 24px; background: var(--border-subtle); margin: 0 12px;"></div>
          <!-- Notifications -->
          <button style="background: transparent; border: none; padding: 6px; border-radius: 8px; cursor: pointer; color: var(--muted); display: flex; align-items: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <!-- User -->
          <a href="profile.html" style="text-decoration: none; display: flex; align-items: center; gap: 8px; padding: 5px 10px; background: rgba(255,255,255,0.5); border: 1px solid var(--border); border-radius: 10px;">
            <span style="font-size: 0.82rem; font-weight: 600; color: var(--fg);">@ninja_user</span>
            <div style="width: 26px; height: 26px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          </a>
        </div>
      </header>
"""

files = ['admin.html', 'campaign-detail.html', 'campaigns.html', 'leaderboard.html', 'profile.html', 'rewards.html', 'tasks.html']

for filename in files:
    if not os.path.exists(filename):
        continue

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine active state
    dash_active = ' active' if filename == 'dashboard.html' else ''
    explore_active = ' active' if filename in ['campaigns.html', 'campaign-detail.html'] else ''
    tasks_active = ' active' if filename == 'tasks.html' else ''
    rank_active = ' active' if filename == 'leaderboard.html' else ''
    earn_active = ' active' if filename == 'rewards.html' else ''
    admin_active = ' active' if filename == 'admin.html' else ''
    
    formatted_header = header_html.format(
        dash_active=dash_active,
        explore_active=explore_active,
        tasks_active=tasks_active,
        rank_active=rank_active,
        earn_active=earn_active,
        admin_active=admin_active
    )

    # 1. Strip out the old `<header class="topbar">`
    content = re.sub(r'<header class="topbar".*?</header>', '', content, flags=re.DOTALL)
    content = re.sub(r'<header class="topbar dense".*?</header>', '', content, flags=re.DOTALL)
    
    # 2. Strip out the old dock
    content = re.sub(r'<!-- Bottom Dock -->.*?<nav class="dock".*?</nav>', '', content, flags=re.DOTALL)
    content = re.sub(r'<nav class="dock".*?</nav>', '', content, flags=re.DOTALL)

    # 3. Add the new topbar and app-container wrapping
    # We look for <div class="layout">
    layout_match = re.search(r'<div class="layout".*?>', content)
    if layout_match:
        # Wrap everything after layout in app-container if it's not already
        if '<div class="app-container">' not in content:
            # We want to insert the header right after <div class="layout">
            # Then insert <div class="app-container"> before the actual content (e.g. before <div class="page-content">)
            # and close it before the last </div>
            pass

    # A simpler approach using regex replacement
    # Just replace `<div class="layout">` with `<div class="layout">` + header + `<div class="app-container">`
    
    if '<div class="app-container">' not in content:
        content = content.replace('<div class="layout">', f'<div class="layout">\n{formatted_header}\n    <div class="app-container">')
        # Add a closing </div> before the </div> closing layout. The </div> closing layout is just before </body>
        content = content.replace('</body>', '  </div>\n</body>')
    else:
        # Already has app container, just replace the layout line
        # but in dashboard.html I already did this manually. The other files don't have it.
        pass

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {filename}")

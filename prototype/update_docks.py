import os, re

pages = ['dashboard.html', 'campaigns.html', 'campaign-detail.html', 'leaderboard.html', 'rewards.html', 'profile.html', 'admin.html', 'tasks.html', 'Voyage.html']
dock_template = '''  <!-- Bottom Dock -->
  <nav class="dock" role="navigation" aria-label="Main navigation">
    <a href="dashboard.html" class="dock-item{dash_active}" id="dock-dash">
      <svg class="dock-icon" viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
      <span class="dock-label">Dash</span>
    </a>
    <a href="campaigns.html" class="dock-item{explore_active}" id="dock-explore">
      <svg class="dock-icon" viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/>
      </svg>
      <span class="dock-label">Explore</span>
    </a>
    <div class="dock-sep"></div>
    <a href="tasks.html" class="dock-item{tasks_active}" id="dock-tasks">
      <svg class="dock-icon" viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
      <span class="dock-label">Tasks</span>
    </a>
    <a href="leaderboard.html" class="dock-item{rank_active}" id="dock-rank">
      <svg class="dock-icon" viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <polyline points="18 20 18 10"/><polyline points="12 20 12 4"/><polyline points="6 20 6 14"/>
      </svg>
      <span class="dock-label">Rank</span>
    </a>
    <div class="dock-sep"></div>
    <a href="rewards.html" class="dock-item{earn_active}" id="dock-earn">
      <svg class="dock-icon" viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6"/>
      </svg>
      <span class="dock-label">Earn</span>
    </a>
    <a href="profile.html" class="dock-item{me_active}" id="dock-me">
      <svg class="dock-icon" viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
      <span class="dock-label">Me</span>
    </a>
    <a href="admin.html" class="dock-item{admin_active}" id="dock-admin">
      <svg class="dock-icon" viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      <span class="dock-label">Admin</span>
    </a>
  </nav>'''

for p in pages:
    if not os.path.exists(p): continue
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    
    dash_active = ' active' if p == 'dashboard.html' else ''
    explore_active = ' active' if p in ['campaigns.html', 'campaign-detail.html'] else ''
    tasks_active = ' active' if p == 'tasks.html' else ''
    rank_active = ' active' if p == 'leaderboard.html' else ''
    earn_active = ' active' if p == 'rewards.html' else ''
    me_active = ' active' if p == 'profile.html' else ''
    admin_active = ' active' if p == 'admin.html' else ''

    new_dock = dock_template.format(dash_active=dash_active, explore_active=explore_active, tasks_active=tasks_active, rank_active=rank_active, earn_active=earn_active, me_active=me_active, admin_active=admin_active)
    
    # We replace from <nav class="dock"> or <nav class="dock" role... to </nav>
    content = re.sub(r'<nav class="dock"[^>]*>.*?</nav>', new_dock, content, flags=re.DOTALL)
    
    with open(p, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated dock in {p}')

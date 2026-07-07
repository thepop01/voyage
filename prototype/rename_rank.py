import os

files = ['admin.html', 'campaign-detail.html', 'campaigns.html', 'dashboard.html', 'index.html', 'leaderboard.html', 'profile.html', 'rewards.html', 'tasks.html']

for filename in files:
    if not os.path.exists(filename):
        continue

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Rename in topbar
    content = content.replace('href="leaderboard.html" class="nav-link">Rank</a>', 'href="leaderboard.html" class="nav-link">Stats</a>')
    content = content.replace('href="leaderboard.html" class="nav-link active">Rank</a>', 'href="leaderboard.html" class="nav-link active">Stats</a>')
    
    # Rename in dock (index.html)
    content = content.replace('<span class="dock-label">Rank</span>', '<span class="dock-label">Stats</span>')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filename}")

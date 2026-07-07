import os

files = ['admin.html', 'campaign-detail.html', 'campaigns.html', 'dashboard.html', 'index.html', 'leaderboard.html', 'profile.html', 'tasks.html']

for filename in files:
    if not os.path.exists(filename):
        continue

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Rename in topbar navigation
    content = content.replace('>Earn</a>', '>Raffle</a>')
    
    # Rename in dock (index.html)
    content = content.replace('<span class="dock-label">Earn</span>', '<span class="dock-label">Raffle</span>')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filename}")

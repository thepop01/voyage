import os
import re

files = ['dashboard.html', 'admin.html', 'campaign-detail.html', 'campaigns.html', 'leaderboard.html', 'profile.html', 'rewards.html', 'tasks.html']

for filename in files:
    if not os.path.exists(filename):
        continue

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    if '<div class="app-container">' in content:
        # Remove opening tag
        content = content.replace('    <div class="app-container">\n', '')
        content = content.replace('  <div class="app-container">\n', '')
        content = content.replace('<div class="app-container">', '')
        
        # We also need to remove the matching closing tag.
        # It's typically right before the closing </div> of layout, which is before </body>
        # In my previous script, I inserted `  </div>\n</body>`
        content = content.replace('  </div>\n</body>', '</body>')
        content = content.replace('    </div>\n  </div>\n</body>', '  </div>\n</body>')
        
        # If there are any stray `</div>` before `</body>`, let's just do a smarter regex:
        # Actually, let's just reverse the previous script's exact insertion.
        # We know we have:
        # </div>
        # </div>
        # </body>
        # We can just remove the first </div> before </body> if we are not sure, but simple replacement is safer if formatted consistently.
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
    else:
        print(f"Skipped {filename} (no app-container)")


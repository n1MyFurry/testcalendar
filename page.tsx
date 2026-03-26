:root {
  --bg: #f3f6fb;
  --card: #ffffff;
  --muted: #667085;
  --text: #101828;
  --line: #d0d5dd;
  --soft: #eef2f7;
  --accent: #111827;
  --accent-2: #2563eb;
  --success: #16a34a;
  --warning: #ea580c;
  --shadow: 0 10px 30px rgba(16, 24, 40, 0.08);
  --radius: 22px;
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--text);
}

a { color: inherit; }
button, input {
  font: inherit;
}

.page {
  min-height: 100vh;
  padding: 24px;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
}

.card {
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid rgba(16, 24, 40, 0.04);
}

.hero {
  padding: 28px;
  display: grid;
  gap: 20px;
}

.hero-top {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.hero h1 {
  font-size: 44px;
  line-height: 1.05;
  margin: 0 0 10px 0;
}

.hero p {
  margin: 0;
  color: var(--muted);
  max-width: 920px;
  line-height: 1.6;
}

.badges, .chip-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge, .chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 13px;
  background: var(--soft);
  color: var(--text);
  border: 1px solid var(--line);
}

.badge.dark {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.progress-box {
  min-width: 280px;
  padding: 18px;
  border-radius: 18px;
  background: var(--soft);
}

.progress-big {
  font-size: 34px;
  font-weight: 700;
  margin: 8px 0 12px;
}

.progress-line {
  width: 100%;
  height: 12px;
  background: #dbe4f0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-2);
}

.info-grid, .mini-grid, .bottom-grid, .lesson-grid, .triple-grid {
  display: grid;
  gap: 14px;
}

.info-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.mini-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.triple-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.bottom-grid {
  grid-template-columns: 360px 1fr;
  align-items: start;
}

.lesson-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.stat, .mini-box, .exercise, .list-item, .script, .review-item {
  background: var(--soft);
  border-radius: 18px;
  padding: 16px;
}

.stat-head, .muted {
  color: var(--muted);
  font-size: 13px;
}

.stat-value {
  margin-top: 6px;
  font-weight: 700;
  font-size: 18px;
}

.sidebar {
  padding: 18px;
  position: sticky;
  top: 24px;
  max-height: calc(100vh - 48px);
  overflow: hidden;
  display: grid;
  grid-template-rows: auto auto 1fr;
}

.search {
  width: 100%;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: white;
  margin-top: 12px;
}

.days {
  margin-top: 14px;
  overflow: auto;
  display: grid;
  gap: 10px;
  padding-right: 4px;
}

.day-button {
  width: 100%;
  text-align: left;
  border: 1px solid var(--line);
  background: #fafcff;
  border-radius: 18px;
  padding: 14px;
  cursor: pointer;
}

.day-button.active {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.day-button .small {
  font-size: 12px;
  color: inherit;
  opacity: 0.75;
}

.main {
  display: grid;
  gap: 16px;
}

.section {
  padding: 24px;
}

.section h2, .section h3 {
  margin: 0;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.title-wrap {
  display: grid;
  gap: 8px;
}

.lesson-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 34px;
  font-weight: 800;
}

.btn {
  border: 0;
  background: var(--accent);
  color: white;
  padding: 12px 16px;
  border-radius: 14px;
  cursor: pointer;
}

.btn.secondary {
  background: var(--soft);
  color: var(--text);
  border: 1px solid var(--line);
}

ul.clean {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

ul.clean li {
  background: var(--soft);
  border-radius: 16px;
  padding: 12px 14px;
  line-height: 1.55;
}

.timer {
  text-align: center;
  font-size: 46px;
  font-weight: 800;
  padding: 18px;
}

.timer-actions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.timer-main {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.skill-row {
  display: grid;
  gap: 8px;
}

.skill-head {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.small-progress {
  width: 100%;
  height: 10px;
  background: #dbe4f0;
  border-radius: 999px;
  overflow: hidden;
}

.small-progress > div {
  height: 100%;
  background: var(--warning);
}

.two-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 1100px) {
  .bottom-grid, .lesson-grid, .two-grid, .triple-grid, .info-grid, .mini-grid {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    max-height: none;
  }

  .hero h1 {
    font-size: 34px;
  }

  .lesson-title {
    font-size: 28px;
  }
}

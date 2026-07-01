const TTL = 60 * 60 * 1000;
const STORE = 'imes_repo_cache';

interface RepoCacheEntry {
  t: number;
  s: number | null;
  l: string | null;
  d: string;
}

type RepoCache = Record<string, RepoCacheEntry>;

interface GitHubRepoResponse {
  stargazers_count?: number;
  language?: string | null;
  description?: string | null;
}

const LANG_COLORS: Record<string, string> = {
  C: '#555555', 'C++': '#f34b7d', CMake: '#ccc388', Lua: '#000080',
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#2b7489',
  HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', Java: '#b07219',
  Rust: '#dea584', Go: '#00ADD8', Ruby: '#701516', PHP: '#4F5D95',
};

function langColor(l: string | null): string {
  return l ? (LANG_COLORS[l] ?? '#6a6a6a') : '#6a6a6a';
}

function readCache(): RepoCache {
  try {
    return JSON.parse(localStorage.getItem(STORE) ?? '{}') as RepoCache;
  } catch {
    return {};
  }
}

function writeCache(c: RepoCache): void {
  try { localStorage.setItem(STORE, JSON.stringify(c)); } catch { /* ponytail */ }
}

function paint(row: Element, d: RepoCacheEntry): void {
  const s = row.querySelector('.dstars');
  const l = row.querySelector('.dlang');
  const des = row.querySelector('.ds');
  if (s) s.textContent = '\u2605' + (typeof d.s === 'number' ? d.s : '');
  if (l) {
    if (d.l) {
      l.innerHTML = `<span class="dot" style="background:${langColor(d.l)}"></span>${d.l}`;
    } else {
      l.textContent = '';
    }
  }
  if (des) des.textContent = typeof d.d === 'string' && d.d.length ? d.d : '';
}

export function initGitHubRepos(): void {
  const rows = document.querySelectorAll('tr[data-repo]');
  if (!rows.length) return;

  const now = Date.now();
  const cache = readCache();
  let fresh = true;

  for (const row of rows) {
    const repo = row.getAttribute('data-repo');
    if (!repo) continue;
    const entry = cache[repo];
    if (entry && (now - entry.t) < TTL) {
      paint(row, entry);
    } else {
      fresh = false;
    }
  }
  if (fresh) return;

  for (const row of rows) {
    const repo = row.getAttribute('data-repo');
    if (!repo) continue;

    fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2026-03-10',
      },
    })
      .then((r) => (r.ok ? r.json() : null) as Promise<GitHubRepoResponse | null>)
      .then((d) => {
        if (!d) return;
        const data: RepoCacheEntry = {
          t: Date.now(),
          s: typeof d.stargazers_count === 'number' ? d.stargazers_count : null,
          l: typeof d.language === 'string' ? d.language : null,
          d: typeof d.description === 'string' ? d.description : '',
        };
        paint(row, data);
        const c = readCache();
        c[repo] = data;
        writeCache(c);
      })
      .catch(() => { /* ponytail: API fail silent */ });
  }
}

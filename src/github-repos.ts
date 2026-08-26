import { el } from './lib/dom';
import { readJson, writeJson } from './lib/storage';

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

let repoRetryBar: HTMLElement | null = null;

function langColor(l: string | null): string {
  return l ? (LANG_COLORS[l] ?? '#6a6a6a') : '#6a6a6a';
}

function sortRowsByStars(): void {
  const dir = document.querySelector('#mods .dir');
  if (!dir) return;
  const rows = Array.from(dir.querySelectorAll('tr[data-repo]'));
  const stars = (row: Element) => {
    const n = parseInt((row.querySelector('.dstars')?.textContent ?? '').replace(/\u2605/, ''), 10);
    return Number.isFinite(n) ? n : -1;
  };
  rows.sort((a, b) => stars(b) - stars(a));
  for (const r of rows) dir.append(r);
}

function paint(row: Element, d: RepoCacheEntry): void {
  const s = row.querySelector('.dstars');
  const l = row.querySelector('.dlang');
  const des = row.querySelector('.ds');
  if (s) s.textContent = '\u2605' + (typeof d.s === 'number' ? d.s : '');
  if (l) {
    if (d.l) {
      l.replaceChildren(
        el('span', { class: 'dot', style: `background:${langColor(d.l)}` }),
        document.createTextNode(d.l),
      );
    } else {
      l.textContent = '';
    }
  }
  if (des) des.textContent = typeof d.d === 'string' && d.d.length ? d.d : '';
  sortRowsByStars();
}

function showRepoRetry(): void {
  if (repoRetryBar) return;
  const sbody = document.querySelector('#mods .sbody');
  if (!sbody) return;
  const btn = el('button', { class: 'repo-retry-btn', type: 'button' }, '\u21BB \u0e25\u0e2d\u0e07\u0e43\u0e2b\u0e21\u0e48');
  btn.addEventListener('click', () => {
    repoRetryBar?.remove();
    repoRetryBar = null;
    initGitHubRepos(true);
  });
  repoRetryBar = el('div', { class: 'repo-retry-bar', id: 'repo-retry-bar', role: 'alert' },
    el('span', { class: 'repo-retry-icon', 'aria-hidden': 'true' }, '\u26A0'),
    el('span', { class: 'repo-retry-msg' },
      '\u0e42\u0e2b\u0e25\u0e14\u0e2a\u0e16\u0e34\u0e15 GitHub \u0e44\u0e21\u0e48\u0e44\u0e14\u0e49 \u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e2d\u0e32\u0e08\u0e44\u0e21\u0e48\u0e40\u0e1b\u0e47\u0e19\u0e1b\u0e31\u0e08\u0e08\u0e38\u0e1a\u0e31\u0e19',
    ),
    btn,
  );
  sbody.prepend(repoRetryBar);
}

export function initGitHubRepos(force = false): void {
  const rows = document.querySelectorAll('tr[data-repo]');
  if (!rows.length) return;

  repoRetryBar?.remove();
  repoRetryBar = null;

  const now = Date.now();
  const cache = readJson<RepoCache>(STORE, {});
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
  if (fresh && !force) return;

  for (const row of rows) {
    const repo = row.getAttribute('data-repo');
    if (!repo) continue;
    const stale = cache[repo];
    if (!force && stale && (now - stale.t) < TTL) continue;

    fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2026-03-10',
      },
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<GitHubRepoResponse>;
      })
      .then((d) => {
        const data: RepoCacheEntry = {
          t: Date.now(),
          s: typeof d.stargazers_count === 'number' ? d.stargazers_count : null,
          l: typeof d.language === 'string' ? d.language : null,
          d: typeof d.description === 'string' ? d.description : '',
        };
        paint(row, data);
        const c = readJson<RepoCache>(STORE, {});
        c[repo] = data;
        writeJson(STORE, c);
      })
      .catch(() => {
        if (stale) paint(row, stale);
        showRepoRetry();
      });
  }
}

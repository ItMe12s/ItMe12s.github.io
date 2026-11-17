import { el } from './lib/dom';
import { readJson, writeJson } from './lib/storage';

const CACHE_KEY = 'imes_repo_cache_v2';
const CACHE_TTL_MS = 60 * 60 * 1000;

interface RepoInfo {
  fetchedAt: number;
  stars: number | null;
  language: string | null;
  description: string;
}

type RepoCache = Record<string, RepoInfo>;

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
const DEFAULT_LANG_COLOR = '#6a6a6a';

let retryBar: HTMLElement | null = null;

function sortRowsByStars(row: Element): void {
  const dir = row.parentElement;
  if (!dir) return;
  const stars = (r: HTMLElement) => Number(r.dataset.stars ?? -1);
  const rows = Array.from(dir.querySelectorAll<HTMLElement>('tr[data-repo]'));
  rows.sort((a, b) => stars(b) - stars(a));
  dir.append(...rows);
}

function paint(row: HTMLElement, info: RepoInfo): void {
  row.dataset.stars = String(info.stars ?? -1);

  const stars = row.querySelector('.dstars');
  if (stars) stars.textContent = `★${info.stars ?? ''}`;

  const lang = row.querySelector('.dlang');
  if (lang) {
    lang.replaceChildren();
    if (info.language) {
      const color = LANG_COLORS[info.language] ?? DEFAULT_LANG_COLOR;
      lang.append(el('span', { class: 'dot', style: `background:${color}` }), info.language);
    }
  }

  const desc = row.querySelector('.ds');
  if (desc) desc.textContent = info.description;

  sortRowsByStars(row);
}

function hideRetry(): void {
  retryBar?.remove();
  retryBar = null;
}

function showRetry(): void {
  if (retryBar) return;
  const body = document.querySelector('#mods .sbody');
  if (!body) return;

  const button = el('button', { class: 'repo-retry-btn', type: 'button' }, '↻ Retry');
  button.addEventListener('click', () => initGitHubRepos(true));

  retryBar = el('div', { class: 'repo-retry-bar', role: 'alert' },
    el('span', { class: 'repo-retry-icon', 'aria-hidden': 'true' }, '⚠'),
    el('span', { class: 'repo-retry-msg' }, "Couldn't load GitHub stats. They may be out of date."),
    button,
  );
  body.prepend(retryBar);
}

async function fetchRepo(repo: string): Promise<RepoInfo> {
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2026-03-10',
    },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const data = (await res.json()) as GitHubRepoResponse;
  return {
    fetchedAt: Date.now(),
    stars: typeof data.stargazers_count === 'number' ? data.stargazers_count : null,
    language: typeof data.language === 'string' ? data.language : null,
    description: typeof data.description === 'string' ? data.description : '',
  };
}

/** Fills repo rows with stars, language and description, cached for an hour. */
export function initGitHubRepos(force = false): void {
  hideRetry();
  const cache = readJson<RepoCache>(CACHE_KEY, {});

  for (const row of document.querySelectorAll<HTMLElement>('tr[data-repo]')) {
    const repo = row.dataset.repo;
    if (!repo) continue;

    const cached = cache[repo];
    if (cached) paint(row, cached);
    if (!force && cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) continue;

    fetchRepo(repo)
      .then((info) => {
        paint(row, info);
        // Re-read so parallel fetches don't overwrite each other's entries.
        const latest = readJson<RepoCache>(CACHE_KEY, {});
        latest[repo] = info;
        writeJson(CACHE_KEY, latest);
      })
      .catch(showRetry);
  }
}

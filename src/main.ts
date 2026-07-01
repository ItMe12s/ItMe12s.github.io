import { initSearch } from './search';
import { initPoll } from './poll';
import { initGitHubRepos } from './github-repos';

function init(): void {
  initSearch();
  initPoll();
  initGitHubRepos();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

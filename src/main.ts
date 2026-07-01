import { initGitHubRepos } from './github-repos';
import { initPoll } from './poll';
import { renderLinkSections } from './render-links';
import { initSearch } from './search';

function init(): void {
  const mount = document.getElementById('link-sections');
  if (mount) renderLinkSections(mount);
  initSearch();
  initPoll();
  initGitHubRepos();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

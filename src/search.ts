function runSearch(): void {
  const input = document.getElementById('q');
  if (!(input instanceof HTMLInputElement)) return;

  const q = input.value.toLowerCase().trim();
  const rows = document.querySelectorAll('.dir tr');

  for (const row of rows) {
    if (!(row instanceof HTMLElement)) continue;
    if (!q) {
      row.style.display = '';
      continue;
    }
    const t = row.textContent?.toLowerCase() ?? '';
    row.style.display = t.includes(q) ? '' : 'none';
  }
}

export function initSearch(): void {
  const input = document.getElementById('q');
  if (!(input instanceof HTMLInputElement)) return;

  input.addEventListener('input', runSearch);

  const goBtn = input.parentElement?.querySelector('input.btn[value="Go"]');
  if (goBtn instanceof HTMLInputElement) {
    goBtn.addEventListener('click', runSearch);
  }
}

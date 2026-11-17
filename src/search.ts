/** Filters link rows as you type; the Go button just re-runs the same filter. */
export function initSearch(): void {
  const input = document.getElementById('q') as HTMLInputElement | null;
  const go = document.getElementById('qgo');
  if (!input) return;

  const run = () => {
    const query = input.value.toLowerCase().trim();
    for (const row of document.querySelectorAll<HTMLElement>('.dir tr')) {
      row.hidden = query !== '' && !(row.textContent ?? '').toLowerCase().includes(query);
    }
  };

  input.addEventListener('input', run);
  go?.addEventListener('click', run);
}

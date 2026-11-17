import { el } from './lib/dom';
import { readStorage, removeStorage, writeStorage } from './lib/storage';

const STORE_KEY = 'imes_poll_vote';

// The radio inputs in index.html use these keys as their ids.
const OPTIONS = {
  p1: { label: 'Love it', baseVotes: 670 },
  p2: { label: 'Like it', baseVotes: 230 },
  p3: { label: "It's OK", baseVotes: 80 },
  p4: { label: 'Dislike', baseVotes: 20 },
};
type OptionKey = keyof typeof OPTIONS;
const KEYS = Object.keys(OPTIONS) as OptionKey[];

function isOptionKey(value: string | null): value is OptionKey {
  return value !== null && value in OPTIONS;
}

export function initPoll(): void {
  const results = document.getElementById('pollres');
  const voteBtn = document.getElementById('pollvote') as HTMLInputElement | null;
  const undoBtn = document.getElementById('pollundo');
  const note = document.getElementById('pollnote');
  const radios = KEYS.map((k) => document.getElementById(k) as HTMLInputElement | null);
  if (!results || !voteBtn || !undoBtn || !note) return;

  const stored = readStorage(STORE_KEY);
  let voted: OptionKey | null = isOptionKey(stored) ? stored : null;

  const votesFor = (k: OptionKey) => OPTIONS[k].baseVotes + (voted === k ? 1 : 0);

  const render = () => {
    const total = KEYS.reduce((sum, k) => sum + votesFor(k), 0);
    const bars = KEYS.map((k) => {
      const pct = Math.round((votesFor(k) / total) * 100);
      return el('div', { class: 'pollbar-row' },
        el('span', { class: 'pollbar-label' }, OPTIONS[k].label),
        el('span', { class: 'pollbar-track' },
          el('span', { class: 'pollbar-fill', style: `width:${pct}%` }),
          el('span', { class: 'pollbar-pct' }, `${pct}%`),
        ),
      );
    });
    results.replaceChildren(...bars);
    if (voted) {
      results.append(el('div', { class: 'pollbar-voted' }, 'You voted: ', el('b', undefined, OPTIONS[voted].label), ' (Thanks!)'));
    }

    const locked = voted !== null;
    for (const radio of radios) if (radio) radio.disabled = locked;
    voteBtn.disabled = locked;
    undoBtn.hidden = !locked;
  };

  voteBtn.addEventListener('click', () => {
    const chosen = radios.find((r) => r?.checked)?.id ?? null;
    note.hidden = isOptionKey(chosen);
    if (!isOptionKey(chosen)) return;
    voted = chosen;
    writeStorage(STORE_KEY, chosen);
    render();
  });

  undoBtn.addEventListener('click', () => {
    voted = null;
    removeStorage(STORE_KEY);
    render();
  });

  render();
}

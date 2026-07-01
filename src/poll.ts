type PollKey = 'p1' | 'p2' | 'p3' | 'p4';
type PollState = Record<PollKey, number>;
type PollLabels = Record<PollKey, string>;

const POLL: { base: PollState; labels: PollLabels } = {
  base: { p1: 670, p2: 230, p3: 80, p4: 20 },
  labels: { p1: 'ชอบมาก', p2: 'ชอบ', p3: 'ปกติ', p4: 'ไม่ชอบ' },
};
const STORE = 'imes_poll_vote';

function isPollKey(k: string | null): k is PollKey {
  return k === 'p1' || k === 'p2' || k === 'p3' || k === 'p4';
}

function total(o: PollState): number {
  let s = 0;
  for (const k in o) s += o[k as PollKey];
  return s;
}

export function initPoll(): void {
  const state: PollState = { ...POLL.base };
  let voted: PollKey | null = null;

  function render(): void {
    const box = document.getElementById('pollres');
    if (!box) return;

    const t = total(state);
    let html = '';
    for (const k of Object.keys(POLL.labels) as PollKey[]) {
      const pct = t ? Math.round(state[k] / t * 100) : 0;
      html += '<div class="pollbar-wrap">'
        + '<div class="pollbar-row">'
        + `<span style="width:75px;display:inline-block;">${POLL.labels[k]}</span>`
        + '<span class="pollbar-track">'
        + `<span class="pollbar-fill" style="width:${pct}%"></span>`
        + `<span class="pollbar-pct">${pct}%</span>`
        + '</span>'
        + '</div></div>';
    }
    if (voted) {
      html += `<div class="pollbar-voted">คุณโหวตแล้ว: <b>${POLL.labels[voted]}</b> (ขอบคุณครับ!)</div>`;
    }
    box.innerHTML = html;
  }

  function setLocked(locked: boolean): void {
    const btn = document.getElementById('pollvote');
    const undo = document.getElementById('pollundo');
    const radios = document.getElementsByName('p');
    for (const radio of radios) {
      if (radio instanceof HTMLInputElement) radio.disabled = locked;
    }
    if (btn instanceof HTMLButtonElement || btn instanceof HTMLInputElement) btn.disabled = locked;
    if (undo instanceof HTMLElement) undo.style.display = locked ? '' : 'none';
  }

  try {
    const stored = localStorage.getItem(STORE);
    if (isPollKey(stored)) voted = stored;
  } catch { /* ponytail: localStorage blocked */ }

  if (voted) state[voted] += 1;
  render();
  if (voted) setLocked(true);

  const btn = document.getElementById('pollvote');
  if (btn) {
    btn.addEventListener('click', () => {
      let chosen: PollKey | null = null;
      const radios = document.getElementsByName('p');
      for (const radio of radios) {
        if (radio instanceof HTMLInputElement && radio.checked && isPollKey(radio.id)) {
          chosen = radio.id;
          break;
        }
      }
      if (!chosen) {
        const note = document.getElementById('pollnote');
        if (note) note.style.display = 'block';
        return;
      }
      state[chosen] += 1;
      voted = chosen;
      try { localStorage.setItem(STORE, chosen); } catch { /* ponytail */ }
      render();
      setLocked(true);
      const note = document.getElementById('pollnote');
      if (note) note.style.display = 'none';
    });
  }

  const undo = document.getElementById('pollundo');
  if (undo) {
    undo.addEventListener('click', () => {
      if (voted && state[voted] > POLL.base[voted]) state[voted] -= 1;
      voted = null;
      try { localStorage.removeItem(STORE); } catch { /* ponytail */ }
      render();
      setLocked(false);
    });
  }
}

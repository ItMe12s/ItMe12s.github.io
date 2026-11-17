import { DOC_ICON, SECTIONS, type LinkEntry, type LinkSection } from './data/links';
import { el } from './lib/dom';

function icon(src: string): HTMLImageElement {
  return el('img', { src, width: 14, height: 14, alt: '' });
}

function linkRow(link: LinkEntry): HTMLTableRowElement {
  const row = el('tr', { 'data-repo': link.repo },
    el('td', { class: 'di' }, icon(DOC_ICON)),
    el('td', { class: 'dn' }, el('a', { href: link.href }, link.label)),
    el('td', { class: 'dd' }, el('span', { class: 'leader' }, ' ')),
  );
  // Repo rows get empty stars/language/description cells that github-repos.ts fills in.
  if (link.repo) {
    row.append(el('td', { class: 'dstars' }), el('td', { class: 'dlang' }), el('td', { class: 'ds' }));
  } else {
    row.append(el('td', { class: 'ds' }, link.award && el('span', { class: 'award' }, `🏆 ${link.award}`), link.desc));
  }
  row.append(el('td', { class: 'dr' }, '»'));
  return row;
}

function renderSection(section: LinkSection): HTMLTableElement {
  const count = section.links.length;
  const dir = el('table', { class: 'dir', cellpadding: 0, cellspacing: 0 }, ...section.links.map(linkRow));

  return el('table', { id: section.id, class: `sect ${section.id}`, cellpadding: 0, cellspacing: 0 },
    el('tr', undefined,
      el('td', { class: 'shead' },
        icon(section.headerIcon),
        ` ${section.title} `,
        el('span', { class: 'count' }, `(${count} ${count === 1 ? 'link' : 'links'})`),
      ),
    ),
    el('tr', undefined, el('td', { class: 'sbody' }, dir)),
  );
}

export function renderLinkSections(mount: HTMLElement): void {
  mount.replaceChildren(...SECTIONS.map(renderSection));
}

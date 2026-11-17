import { DOC_ICON, SECTIONS, type LinkEntry, type LinkSection } from './data/links';
import { el } from './lib/dom';

function icon(src: string): HTMLImageElement {
  return el('img', { src, width: 14, height: 14, alt: '' });
}

// Every row in a section with awards gets an award cell (maybe empty) so desktop columns line up.
function linkRow(link: LinkEntry, hasAwards: boolean): HTMLTableRowElement {
  const row = el('tr', { 'data-repo': link.repo },
    el('td', { class: 'di' }, icon(DOC_ICON)),
    el('td', { class: 'dn' }, el('a', { href: link.href }, link.label)),
    el('td', { class: 'dd' }, el('span', { class: 'leader' }, ' ')),
  );
  // Repo rows get empty stars/language/description cells that github-repos.ts fills in.
  if (link.repo) {
    row.append(el('td', { class: 'dstars' }), el('td', { class: 'dlang' }), el('td', { class: 'ds' }));
  } else {
    if (hasAwards) row.append(el('td', { class: 'daward' }, link.award && el('span', { class: 'award' }, `🏆 ${link.award}`)));
    row.append(el('td', { class: 'ds' }, link.desc));
  }
  row.append(el('td', { class: 'dr' }, '»'));
  return row;
}

function renderSection(section: LinkSection): HTMLTableElement {
  const count = section.links.length;
  const hasAwards = section.links.some((l) => l.award);
  const dir = el('table', { class: hasAwards ? 'dir has-awards' : 'dir', cellpadding: 0, cellspacing: 0 },
    ...section.links.map((l) => linkRow(l, hasAwards)));

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

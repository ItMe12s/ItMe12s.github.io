import { DOC_ICON, SECTIONS, type LinkEntry, type LinkSection } from './data/links';
import { el } from './lib/dom';

type ElAttrs = Record<string, string | number | boolean | undefined>;

function iconImg(src: string): HTMLImageElement {
  return el('img', { src, width: '14', height: '14', alt: '' }) as HTMLImageElement;
}

function linkRow(link: LinkEntry, isMod: boolean): HTMLTableRowElement {
  const attrs = link.repo ? { 'data-repo': link.repo } : undefined;
  const row = el('tr', attrs) as HTMLTableRowElement;
  row.append(
    el('td', { class: 'di' }, iconImg(DOC_ICON)),
    el('td', { class: 'dn' }, el('a', { href: link.href }, link.label)),
    el('td', { class: 'dd' }, el('span', { class: 'leader' }, '\u00a0')),
  );
  if (isMod) {
    row.append(
      el('td', { class: 'dstars' }),
      el('td', { class: 'dlang' }),
      el('td', { class: 'ds' }),
    );
  } else {
    row.append(el('td', { class: 'ds' }, link.desc));
  }
  row.append(el('td', { class: 'dr' }, '\u00bb'));
  return row;
}

function renderSection(section: LinkSection): HTMLTableElement {
  const tableAttrs: ElAttrs = { class: `sect ${section.cssClass}`, cellpadding: '0', cellspacing: '0' };
  if (section.id === 'mods') tableAttrs.id = 'mods';

  const table = el('table', tableAttrs) as HTMLTableElement;
  const count = section.links.length;
  const head = el('td', { class: 'shead' },
    iconImg(section.headerIcon),
    document.createTextNode(` ${section.titleEn} - ${section.titleTh} `),
    el('span', { class: 'th' }, `(${count} \u0e25\u0e34\u0e07\u0e01\u0e4c)`),
  );

  const dir = el('table', { class: 'dir', cellpadding: '0', cellspacing: '0' }) as HTMLTableElement;
  const isMod = section.cssClass === 'mods';
  for (const link of section.links) dir.append(linkRow(link, isMod));

  table.append(
    el('tr', undefined, head),
    el('tr', undefined, el('td', { class: 'sbody' }, dir)),
  );
  return table;
}

export function renderLinkSections(mount: HTMLElement): void {
  mount.replaceChildren(...SECTIONS.map(renderSection));
}

export type LinkEntry = {
  href: string;
  label: string;
  desc: string;
  repo?: string;
};

export type LinkSection = {
  id: string;
  cssClass: 'store' | 'community' | 'socials' | 'mods';
  titleEn: string;
  titleTh: string;
  headerIcon: string;
  links: LinkEntry[];
};

export const DOC_ICON =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><path d='M3 1h5l2 2v9H3z' fill='%23fff' stroke='%23808080'/><path d='M8 1v2h2' fill='none' stroke='%23808080'/></svg>";

export const SECTIONS: LinkSection[] = [
  {
    id: 'store',
    cssClass: 'store',
    titleEn: 'Store',
    titleTh: 'ร้านค้า',
    headerIcon:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><path d='M2.5 3.5h1.7l.9 5.6h6.2l.9-3.9H6.2' fill='none' stroke='%23303030' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round'/><circle cx='6.1' cy='11.4' r='1' fill='%23303030'/><circle cx='11.3' cy='11.4' r='1' fill='%23303030'/></svg>",
    links: [
      {
        href: 'https://www.roblox.com/catalog?CreatorName=cTicket&CreatorType=Group&salesTypeFilter=1',
        label: 'Roblox UGC',
        desc: 'Roblox catalog items',
      },
    ],
  },
  {
    id: 'community',
    cssClass: 'community',
    titleEn: 'Community',
    titleTh: 'ชุมชน',
    headerIcon:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><circle cx='4.5' cy='5' r='1.8' fill='%234070b0' stroke='%231f3f80' stroke-width='0.6'/><path d='M1.5 12c0-2 1.4-3.4 3-3.4s3 1.4 3 3.4' fill='%234070b0' stroke='%231f3f80' stroke-width='0.6'/><circle cx='9.8' cy='5' r='1.8' fill='%234070b0' stroke='%231f3f80' stroke-width='0.6'/><path d='M6.8 12c0-2 1.4-3.4 3-3.4s3 1.4 3 3.4' fill='%234070b0' stroke='%231f3f80' stroke-width='0.6'/></svg>",
    links: [
      {
        href: 'https://discord.gg/qEt9XhZBuP',
        label: 'Roblox and TikTok projects Discord Server',
        desc: 'โปรเจกต์ Roblox/TikTok',
      },
      {
        href: 'https://discord.gg/E8f6D6XqbW',
        label: 'Geometry Dash and Geode SDK modding Discord Server',
        desc: 'ม็อดดิ้ง GD/Geode',
      },
    ],
  },
  {
    id: 'socials',
    cssClass: 'socials',
    titleEn: 'Socials',
    titleTh: 'เครือข่ายสังคม',
    headerIcon:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><circle cx='7' cy='7' r='5.5' fill='%2340a0ff' stroke='%23002860' stroke-width='0.8'/><path d='M1.5 7h11M7 1.5v11' fill='none' stroke='%23ffffff' stroke-width='0.5'/><path d='M3 3.5c2.5 1.5 5 1.5 8 0M3 10.5c2.5-1.5 5-1.5 8 0' fill='none' stroke='%23ffffff' stroke-width='0.4'/></svg>",
    links: [
      { href: 'https://github.com/ItMe12s', label: 'GitHub', desc: 'ซอร์สโค้ด/โปรเจกต์' },
      { href: 'https://www.instagram.com/i._.mes2/', label: 'Instagram', desc: 'รูปภาพ/สแตตัส' },
      { href: 'https://www.tiktok.com/@itme12s', label: 'TikTok', desc: 'คลิปวิดีโอสั้น' },
      { href: 'https://x.com/ludQC_QA', label: 'Twitter / X', desc: 'ทวีต/อัปเดต' },
      { href: 'https://www.youtube.com/@ItMe12s', label: 'YouTube', desc: 'ช่องวิดีโอ' },
      { href: 'https://www.twitch.tv/imes_s', label: 'Twitch', desc: 'สตรีมสด' },
      { href: 'https://www.roblox.com/users/784247040/profile', label: 'Roblox', desc: 'โปรไฟล์ Roblox' },
    ],
  },
  {
    id: 'mods',
    cssClass: 'mods',
    titleEn: 'Popular Geometry Dash Mods',
    titleTh: 'ม็อดยอดนิยม',
    headerIcon:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><path d='M6 1h2l.4 1.8c.4.2.8.4 1.1.7l1.7-.6.9 1.6-1.3 1.3c.05.4.05.8 0 1.2l1.3 1.3-.9 1.6-1.7-.6c-.3.3-.7.5-1.1.7L8 13H6l-.4-1.8c-.4-.2-.8-.4-1.1-.7l-1.7.6-.9-1.6 1.3-1.3a4 4 0 0 1 0-1.2L1.9 5.5l.9-1.6 1.7.6c.3-.3.7-.5 1.1-.7z' fill='%23909090' stroke='%23333333' stroke-width='0.6'/><circle cx='7' cy='7' r='1.8' fill='%23cccccc' stroke='%23333333' stroke-width='0.6'/></svg>",
    links: [
      { href: 'https://github.com/ItMe12s/Git-Editor', label: 'Git-Editor', desc: '', repo: 'ItMe12s/Git-Editor' },
      { href: 'https://github.com/ItMe12s/LuauAPI/', label: 'LuauAPI', desc: '', repo: 'ItMe12s/LuauAPI' },
      { href: 'https://github.com/ItMe12s/wavefix', label: 'wavefix', desc: '', repo: 'ItMe12s/wavefix' },
      { href: 'https://github.com/ItMe12s/whatishedoing', label: 'whatishedoing', desc: '', repo: 'ItMe12s/whatishedoing' },
      { href: 'https://github.com/ItMe12s/BetterVisuals', label: 'BetterVisuals', desc: '', repo: 'ItMe12s/BetterVisuals' },
      { href: 'https://github.com/ItMe12s/smoothtextinput', label: 'smoothtextinput', desc: '', repo: 'ItMe12s/smoothtextinput' },
    ],
  },
];

export type LinkEntry = {
  href: string;
  label: string;
  desc?: string;
  award?: string;
  /** GitHub "owner/name"; rows with one get live stars and language. */
  repo?: string;
};

export type LinkSection = {
  /** Anchor id and CSS class; the navbar links to it. */
  id: 'store' | 'games' | 'wallpapers' | 'community' | 'socials' | 'mods';
  title: string;
  headerIcon: string;
  links: LinkEntry[];
};

function githubRepo(name: string): LinkEntry {
  return { href: `https://github.com/ItMe12s/${name}`, label: name, repo: `ItMe12s/${name}` };
}

export const DOC_ICON =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><path d='M3 1h5l2 2v9H3z' fill='%23fff' stroke='%23808080'/><path d='M8 1v2h2' fill='none' stroke='%23808080'/></svg>";

export const SECTIONS: LinkSection[] = [
  {
    id: 'store',
    title: 'Store',
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
    id: 'games',
    title: 'My Games',
    headerIcon:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><path d='M3.5 4h7c1.6 0 2.5 1.2 2.5 3.2 0 2.2-.6 3.8-1.8 3.8-1 0-1.5-1.3-2.4-1.3H5.2c-.9 0-1.4 1.3-2.4 1.3C1.6 11 1 9.4 1 7.2 1 5.2 1.9 4 3.5 4z' fill='%23e0e0e0' stroke='%23303030' stroke-width='0.8'/><path d='M4.2 5.7v2.4M3 6.9h2.4' stroke='%23303030' stroke-width='0.9'/><circle cx='9.6' cy='6.2' r='0.7' fill='%23c04040'/><circle cx='10.8' cy='7.6' r='0.7' fill='%234070b0'/></svg>",
    links: [
      {
        href: 'https://www.roblox.com/games/133442653448670/Word-Link',
        label: 'Word Link!',
        desc: 'Roblox game',
      },
    ],
  },
  {
    id: 'wallpapers',
    title: 'Animated iOS Wallpapers',
    headerIcon:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><rect x='3.5' y='0.5' width='7' height='13' rx='1.5' fill='%23303030'/><rect x='4.5' y='2' width='5' height='9' fill='%23a070ff'/><circle cx='6' cy='5' r='0.6' fill='%23fff'/><circle cx='8.2' cy='6.8' r='0.5' fill='%23fff'/><circle cx='6.6' cy='8.8' r='0.4' fill='%23fff'/><circle cx='7' cy='12.3' r='0.5' fill='%23aaa'/></svg>",
    links: [
      { href: 'https://cowabun.ga/wallpapers?section=custom&id=105', label: 'Black Hole', desc: "World's first animated iOS competition", award: '1st place' },
      { href: 'https://cowabun.ga/wallpapers?section=custom&id=108', label: 'Rolling Hills', desc: 'Made for fun and testing out gyro', award: 'Best use of iOS 26 gyro' },
      { href: 'https://cowabun.ga/wallpapers?section=custom&id=35', label: 'Neon Lines', desc: "Based on Snow's Neon Lines 4K" },
      { href: 'https://cowabun.ga/wallpapers?section=custom&id=36', label: 'I am in.', desc: 'Digital rain made from particles only' },
    ],
  },
  {
    id: 'mods',
    title: 'Popular Geometry Dash Mods',
    headerIcon:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><path d='M6 1h2l.4 1.8c.4.2.8.4 1.1.7l1.7-.6.9 1.6-1.3 1.3c.05.4.05.8 0 1.2l1.3 1.3-.9 1.6-1.7-.6c-.3.3-.7.5-1.1.7L8 13H6l-.4-1.8c-.4-.2-.8-.4-1.1-.7l-1.7.6-.9-1.6 1.3-1.3a4 4 0 0 1 0-1.2L1.9 5.5l.9-1.6 1.7.6c.3-.3.7-.5 1.1-.7z' fill='%23909090' stroke='%23333333' stroke-width='0.6'/><circle cx='7' cy='7' r='1.8' fill='%23cccccc' stroke='%23333333' stroke-width='0.6'/></svg>",
    links: [
      githubRepo('Git-Editor'),
      githubRepo('LuauAPI'),
      githubRepo('wavefix'),
      githubRepo('whatishedoing'),
      githubRepo('BetterVisuals'),
      githubRepo('smoothtextinput'),
    ],
  },
  {
    id: 'community',
    title: 'Community',
    headerIcon:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><circle cx='4.5' cy='5' r='1.8' fill='%234070b0' stroke='%231f3f80' stroke-width='0.6'/><path d='M1.5 12c0-2 1.4-3.4 3-3.4s3 1.4 3 3.4' fill='%234070b0' stroke='%231f3f80' stroke-width='0.6'/><circle cx='9.8' cy='5' r='1.8' fill='%234070b0' stroke='%231f3f80' stroke-width='0.6'/><path d='M6.8 12c0-2 1.4-3.4 3-3.4s3 1.4 3 3.4' fill='%234070b0' stroke='%231f3f80' stroke-width='0.6'/></svg>",
    links: [
      { href: 'https://discord.gg/qEt9XhZBuP', label: 'Roblox & TikTok Discord server' },
      { href: 'https://discord.gg/E8f6D6XqbW', label: 'GD & Geode mods Discord server' },
    ],
  },
  {
    id: 'socials',
    title: 'Socials',
    headerIcon:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><circle cx='7' cy='7' r='5.5' fill='%2340a0ff' stroke='%23002860' stroke-width='0.8'/><path d='M1.5 7h11M7 1.5v11' fill='none' stroke='%23ffffff' stroke-width='0.5'/><path d='M3 3.5c2.5 1.5 5 1.5 8 0M3 10.5c2.5-1.5 5-1.5 8 0' fill='none' stroke='%23ffffff' stroke-width='0.4'/></svg>",
    links: [
      { href: 'https://github.com/ItMe12s', label: 'GitHub', desc: 'Source code/projects' },
      { href: 'https://www.instagram.com/i._.mes2/', label: 'Instagram', desc: 'Photos/status' },
      { href: 'https://www.tiktok.com/@itme12s', label: 'TikTok', desc: 'Short videos' },
      { href: 'https://x.com/ludQC_QA', label: 'Twitter / X', desc: 'Tweets/updates' },
      { href: 'https://www.youtube.com/@ItMe12s', label: 'YouTube', desc: 'Video channel' },
      { href: 'https://www.twitch.tv/imes_s', label: 'Twitch', desc: 'Live streams' },
      { href: 'https://www.roblox.com/users/784247040/profile', label: 'Roblox', desc: 'Roblox profile' },
    ],
  },
];

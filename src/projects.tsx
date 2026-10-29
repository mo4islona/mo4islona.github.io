import type { ReactNode } from 'react';

export type Project = {
  name: string;
  href: string;
  repo: string;
  description: string | ReactNode;
  icon: 'github' | 'code';
  // Live preview shown in the full-screen backdrop on hover.
  // Omit when the site blocks framing (X-Frame-Options / CSP) — falls back
  // to a styled placeholder until a screenshot is dropped in here.
  preview?: { kind: 'iframe' | 'image'; src: string };
};

export const projectGroups: { year: string; projects: Project[] }[] = [
  {
    year: '2026',
    projects: [
      {
        name: 'Wick charts',
        href: 'https://wick-charts.eeff.io/',
        repo: 'https://github.com/mo4islona/wick-charts',
        description: (
          <div>
            Realtime, animated charts for React, Vue and Svelte.
            <br />
            Canvas-rendered, zero runtime dependencies
          </div>
        ),
        icon: 'github',
        preview: { kind: 'iframe', src: 'https://wick-charts.eeff.io/' },
      },
      {
        name: 'wikiloop',
        href: 'https://github.com/mo4islona/wikiloop',
        repo: 'https://github.com/mo4islona/wikiloop',
        description: (
          <div>
            Turns what AI coding agents learn into reviewed,
            <br />
            shared team knowledge. Claude Code and Codex plugin
          </div>
        ),
        icon: 'github',
        preview: { kind: 'image', src: '/previews/wikiloop.png' },
      },
    ],
  },
  {
    year: '2015–2019',
    projects: [
      {
        name: 'JS1K: Tear the curtain',
        href: 'https://js1k.com/2015-hypetrain/demo/2241',
        repo: 'https://js1k.com/2015-hypetrain/details/2241',
        description: 'The JavaScript code golfing competition',
        icon: 'code',
        preview: { kind: 'iframe', src: '/js1k/' },
      },
      {
        name: 'Go material playground',
        href: '/material-go-playground/',
        repo: 'https://github.com/mo4islona/material-go-playground',
        description: 'Flexible, lightweight sandbox UI for Go playground',
        icon: 'github',
        preview: { kind: 'iframe', src: '/material-go-playground/' },
      },
      {
        name: 'Node blockly',
        href: '/blockly/',
        repo: 'https://github.com/mo4islona/node-blockly',
        description: 'Google Blockly port for Node.js via CommonJS module',
        icon: 'github',
        preview: { kind: 'iframe', src: '/blockly/' },
      },
    ],
  },
];

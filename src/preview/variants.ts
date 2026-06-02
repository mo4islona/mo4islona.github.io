import type { CSSProperties } from 'react';

// Entry animations for the preview backdrop; one is picked at random per hover.
// `content` is the CSS `animation` shorthand applied to the preview itself;
// `overlay` is an optional glitch layer rendered on top (also inline styles).
//
// Performance rule: the heavy live iframe must never have `filter`/`clip-path`/
// `background-size` animated on it (each frame repaints the whole site). So the
// content only ever does a cheap GPU-composited wake (opacity + transform), and
// all the glitch character lives in the overlay, also driven by opacity/transform.
export type PreviewVariant = {
  content: string;
  contentStyle?: CSSProperties;
  overlay?: CSSProperties & { animation: string };
};

// Gentle fade used for idle auto-rotation — no glitch, just a soft crossfade.
export const idleVariant: PreviewVariant = {
  content: 'softFade 1s ease both',
};

export const previewVariants: PreviewVariant[] = [
  // 1. Pixel mosaic — a dark checkerboard flickers out in blocky steps.
  {
    content: 'imgWake 0.7s ease both',
    overlay: {
      backgroundImage:
        'conic-gradient(#0c0e0e 90deg, transparent 90deg 180deg, #0c0e0e 180deg 270deg, transparent 270deg)',
      backgroundSize: '44px 44px',
      // jump-none, not jump-end: the last block clears one step *before* the
      // end and holds at opacity 0, so the mosaic finishes dissolving instead
      // of snapping from a still-visible ~0.14 opacity straight to 0.
      animation: 'mosaicFade 0.7s steps(7, jump-none) forwards',
    },
  },
  // 2. Chromatic glitch — RGB bars jitter sideways and fade. The color split
  //    lives in the overlay instead of a drop-shadow filter on the iframe.
  {
    content: 'imgWake 0.7s ease both',
    overlay: {
      backgroundImage:
        'repeating-linear-gradient(0deg, rgba(255,0,90,0.12) 0 3px, transparent 3px 7px, rgba(0,200,255,0.12) 7px 10px, transparent 10px 16px)',
      mixBlendMode: 'screen',
      animation: 'glitchBars 0.55s steps(6, end) forwards',
    },
  },
  // 3. Hologram — cyan scanlines roll once over a still preview and fade.
  {
    content: 'holoWake 0.85s ease both',
    overlay: {
      backgroundImage:
        'linear-gradient(rgba(0,229,255,0.06), rgba(0,229,255,0.06)), repeating-linear-gradient(0deg, rgba(0,229,255,0.18) 0px, rgba(0,229,255,0.18) 1px, transparent 1px, transparent 3px)',
      mixBlendMode: 'screen',
      animation: 'scanFade 0.95s ease forwards',
    },
  },
  // 4. Light sweep — a soft accent beam passes once across the preview.
  {
    content: 'imgWake 0.7s ease both',
    overlay: {
      backgroundImage:
        'linear-gradient(115deg, transparent 38%, rgba(147,236,191,0.22) 50%, transparent 62%)',
      mixBlendMode: 'screen',
      animation: 'beamSweep 0.75s ease forwards',
    },
  },
  // 5. Zoom punch — a quick focus-in (transform only, no blur) with a vignette
  //    pulse riding on top.
  {
    content: 'zoomWake 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both',
    overlay: {
      background:
        'radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(4,5,5,0.7) 100%)',
      animation: 'vignettePulse 0.7s ease forwards',
    },
  },
];

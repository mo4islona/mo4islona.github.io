import type { CSSProperties } from 'react';

// Entry animations for the preview backdrop; one is picked at random per hover.
// `content` is the CSS `animation` shorthand applied to the preview itself;
// `overlay` is an optional glitch layer rendered on top (also inline styles).
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
  // Pixel mosaic — coarse dark checkerboard that clears to reveal the preview.
  {
    content: 'pixelReveal 0.8s steps(11, end) both',
    overlay: {
      backgroundColor: 'transparent',
      backgroundImage:
        'conic-gradient(#0c0e0e 90deg, transparent 90deg 180deg, #0c0e0e 180deg 270deg, transparent 270deg)',
      animation: 'mosaicClear 0.85s steps(10, end) forwards',
    },
  },
  // Chromatic converge — RGB channels fly in from the sides and merge.
  {
    content: 'rgbConverge 0.85s ease both',
  },
  // Datamosh — horizontal bands jump and shear, with tearing slice bars.
  {
    content: 'dataMosh 0.8s steps(7, end) both',
    overlay: {
      backgroundImage:
        'repeating-linear-gradient(0deg, rgba(255,0,90,0.10) 0 3px, transparent 3px 7px, rgba(0,200,255,0.10) 7px 10px, transparent 10px 16px)',
      mixBlendMode: 'screen',
      animation: 'sliceShift 0.7s steps(6, end) forwards',
    },
  },
  // Hologram — content lifts in with a cyan wash and scanlines.
  {
    content: 'holoRise 0.9s ease both',
    overlay: {
      backgroundImage:
        'repeating-linear-gradient(0deg, rgba(0,229,255,0.16) 0px, rgba(0,229,255,0.16) 1px, transparent 1px, transparent 3px)',
      mixBlendMode: 'screen',
      animation: 'scanlineFade 1s ease forwards',
    },
  },
  // Zoom warp — a focus pull from blurred and oversized to sharp.
  {
    content: 'zoomWarp 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both',
  },
];

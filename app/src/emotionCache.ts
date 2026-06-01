import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/cache';

// A single, shared cache configuration used on both the server (prerender) and
// the client (hydration). `prepend: true` keeps MUI/emotion styles ahead of any
// later style injections so the rendered markup and hydrated markup match.
export function createEmotionCache(): EmotionCache {
  return createCache({ key: 'css', prepend: true });
}

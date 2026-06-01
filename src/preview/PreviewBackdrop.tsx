import * as React from 'react';
import { type Project, projectGroups } from '../projects';
import { idleVariant, previewVariants, type PreviewVariant } from './variants';

const allProjects = projectGroups.flatMap((group) => group.projects);

// How long each project stays in the backdrop during idle auto-rotation.
const ROTATE_MS = 6000;
// Crossfade duration; the incoming layer fades in over this long while the
// previous one stays put beneath it, then unmounts. Kept >= the longest entry
// animation so the old preview never vanishes mid-reveal.
const FADE_MS = 1000;
// On hover, hold a beat before the new preview animates in, so the menu row's
// pulse leads and the iframe reveal feels deliberate rather than instant.
const HOVER_DELAY_MS = 170;

type PreviewMode = 'idle' | 'hover';

export type PreviewState = {
  project: Project;
  variant: PreviewVariant;
  mode: PreviewMode;
  nonce: number;
};

function PlaceholderPreview({ project }: { project: Project }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          'radial-gradient(120% 120% at 30% 20%, #2c3a33 0%, #16191a 72%)',
      }}
    >
      <span
        className="link-gradient px-4 text-center font-bold tracking-[0.04em]"
        style={{ fontSize: 'clamp(2.5rem, 11vw, 9rem)', opacity: 0.5 }}
      >
        {project.name}
      </span>
    </div>
  );
}

// A single preview (iframe / image / placeholder) plus its entry animation and
// optional glitch overlay. The newest layer fades in over the previous one.
function PreviewLayer({ state, top }: { state: PreviewState; top: boolean }) {
  const { project, variant } = state;
  // Hover previews wait a beat before animating; idle rotation stays immediate.
  // The trailing time value in each `animation` shorthand becomes its delay.
  const delay = state.mode === 'hover' ? ` ${HOVER_DELAY_MS}ms` : '';
  return (
    <div
      className="absolute inset-0"
      style={
        top
          ? { animation: `layerFadeIn ${FADE_MS}ms ease both${delay}` }
          : undefined
      }
    >
      <div
        className="absolute inset-0"
        style={{ animation: `${variant.content}${delay}`, ...variant.contentStyle }}
      >
        {project.preview ? (
          project.preview.kind === 'iframe' ? (
            <iframe
              src={project.preview.src}
              title={`${project.name} preview`}
              loading="lazy"
              tabIndex={-1}
              className="absolute inset-0 h-full w-full border-0"
              style={{ pointerEvents: 'none' }}
            />
          ) : (
            <img
              src={project.preview.src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )
        ) : (
          <PlaceholderPreview project={project} />
        )}
      </div>
      {variant.overlay && (
        <div
          className="absolute inset-0"
          style={{
            ...variant.overlay,
            animation: `${variant.overlay.animation}${delay}`,
          }}
        />
      )}
    </div>
  );
}

export function PreviewBackdrop({ state }: { state: PreviewState | null }) {
  // Keep a short stack of layers so a new preview crossfades over the old one.
  const [layers, setLayers] = React.useState<PreviewState[]>([]);

  React.useEffect(() => {
    if (!state) return;
    setLayers((prev) => [...prev, state].slice(-2));
    // Once the crossfade is done, drop everything but the newest layer.
    // Include the hover delay so the old layer never vanishes before the new
    // (delayed) one has finished fading in.
    const timer = setTimeout(() => {
      setLayers((prev) => prev.filter((layer) => layer.nonce === state.nonce));
    }, FADE_MS + HOVER_DELAY_MS);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg"
    >
      {layers.map((layer, i) => (
        <PreviewLayer
          key={layer.nonce}
          state={layer}
          top={i === layers.length - 1}
        />
      ))}
      {/* Single scrim above all layers; constant strength across idle/hover. */}
      {layers.length > 0 && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 120% at 50% 40%, rgba(6,7,7,0.78) 0%, rgba(4,5,5,0.96) 100%)',
            opacity: 0.82,
          }}
        />
      )}
    </div>
  );
}

// Owns the preview state: which project the backdrop shows and with which entry
// animation. Loads the first project on mount, auto-rotates between projects
// while idle (gentle fade), and lets hover take over (random glitch).
export function usePreview() {
  const [state, setState] = React.useState<PreviewState | null>(null);
  const rotateTimer = React.useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );
  const nonceRef = React.useRef(0);
  const lastVariantRef = React.useRef(-1);
  const currentIdxRef = React.useRef(0);

  const present = React.useCallback(
    (project: Project, idx: number, mode: PreviewMode) => {
      currentIdxRef.current = idx;
      let variant = idleVariant;
      if (mode === 'hover') {
        // Pick a random glitch entry, avoiding an immediate repeat.
        let i = Math.floor(Math.random() * previewVariants.length);
        if (i === lastVariantRef.current && previewVariants.length > 1) {
          i = (i + 1) % previewVariants.length;
        }
        lastVariantRef.current = i;
        variant = previewVariants[i];
      }
      setState({ project, variant, mode, nonce: ++nonceRef.current });
    },
    [],
  );

  // Load the first preview, then auto-rotate until the user's first hover.
  React.useEffect(() => {
    if (allProjects.length === 0) return;
    present(allProjects[0], 0, 'idle');
    rotateTimer.current = setInterval(() => {
      if (allProjects.length < 2) return;
      let next = Math.floor(Math.random() * allProjects.length);
      if (next === currentIdxRef.current) next = (next + 1) % allProjects.length;
      present(allProjects[next], next, 'idle');
    }, ROTATE_MS);
    return () => clearInterval(rotateTimer.current);
  }, [present]);

  const show = React.useCallback(
    (project: Project) => {
      // First interaction stops auto-rotation for good.
      clearInterval(rotateTimer.current);
      const idx = allProjects.indexOf(project);
      const targetIdx = idx === -1 ? currentIdxRef.current : idx;
      // Hovering the already-shown project shouldn't replay the animation.
      if (targetIdx === currentIdxRef.current) return;
      present(project, targetIdx, 'hover');
    },
    [present],
  );

  // Mouse leaving keeps the last preview on screen (autoplay stays off).
  const hide = React.useCallback(() => {}, []);

  return { state, show, hide };
}

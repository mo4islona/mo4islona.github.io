import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { CodeIcon, GithubIcon } from '../icons';
import { type Project, projectGroups } from '../projects';

// Splits the title into per-letter spans. The parent passes a fresh `seed` on
// every hover, so a different random subset of letters animates each time —
// some RGB-glitch, some shake, some lift, the rest stay put. Each runs a finite
// number of cycles and settles back. seed 0 (the SSR/initial value) is fully
// deterministic, so server and client hydration agree.
function TitleChars({ text, seed }: { text: string; seed: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) => {
        const rnd = (k: number) => {
          const x = Math.sin((i + 1) * k + seed * 1000) * 43758.5453;
          return x - Math.floor(x); // 0..1, stable per (i, k, seed)
        };
        // Each letter independently draws an effect (or none) plus its own
        // duration, so both count and motion vary across a title. Each effect
        // plays exactly once (the oscillations live inside one keyframe pass).
        const sel = ch === ' ' ? 0 : rnd(12.9898);
        let fx = '';
        let dur = 0;
        if (sel > 0.8) {
          fx = 'fx-glitch'; // RGB-split jitter
          dur = 0.4 + rnd(7.13) * 0.25; // 0.4..0.65s
        } else if (sel > 0.62) {
          fx = 'fx-shake'; // positional jitter, no color
          dur = 0.4 + rnd(7.13) * 0.25; // 0.4..0.65s
        } else if (sel > 0.46) {
          fx = 'fx-lift'; // gentle bob up/down
          dur = 0.45 + rnd(7.13) * 0.25; // 0.45..0.7s
        }
        // Tight spread (0..120ms) so the picked letters fire near-together and
        // the title reads as one shake rather than a scattered ripple.
        const dly = Math.round(rnd(45.164) * 120);
        return (
          <span
            key={i}
            className={fx ? `title-char ${fx}` : 'title-char'}
            style={
              fx
                ? ({
                    '--dur': `${dur.toFixed(2)}s`,
                    '--dly': `${dly}ms`,
                  } as CSSProperties)
                : undefined
            }
          >
          {ch === ' ' ? ' ' : ch}
        </span>
        );
      })}
    </>
  );
}

function ProjectRow({
  project,
  isActive,
  frameNonce,
  onShow,
  onHide,
  revealStyle,
}: {
  project: Project;
  isActive: boolean;
  frameNonce?: number;
  onShow: (project: Project) => void;
  onHide: () => void;
  revealStyle: CSSProperties;
}) {
  // Re-rolled to a fresh random value on every mouse-enter so the title picks
  // new letters/effects each time; also used as the TitleChars key to restart
  // the (finite) animations. Starts at 0 for a deterministic first render.
  const [animSeed, setAnimSeed] = useState(0);
  // True while idle auto-rotation has the highlight on this row: enables the
  // same per-letter animation as hover (see `.is-active` in index.css). Set in
  // the same render as the seed reroll so only the freshly mounted letters sit
  // under `.is-active` — the stale ones never replay.
  const [idleAnim, setIdleAnim] = useState(false);
  const wasActive = useRef(false);
  useEffect(() => {
    // frameNonce is set only for hover-driven previews, so this branch runs
    // purely during the on-load auto-rotation phase. Hover keeps its own
    // mouseEnter reroll + `.group:hover` CSS.
    if (isActive && !wasActive.current && frameNonce === undefined) {
      setAnimSeed(Math.random());
      setIdleAnim(true);
    } else if (!isActive && wasActive.current) {
      setIdleAnim(false);
    }
    wasActive.current = isActive;
  }, [isActive, frameNonce]);
  // Fires the scan/flash only when a hover preview animation actually starts on
  // this row (frameNonce set + this row active).
  const pulse = isActive && frameNonce !== undefined;
  return (
    <li
      onMouseEnter={() => {
        setAnimSeed(Math.random());
        onShow(project);
      }}
      onMouseLeave={onHide}
      className={`group list-reveal relative flex cursor-pointer items-start gap-3 rounded-md border-l-2 py-2 pr-3 pl-3 transition-colors duration-500 ease-out${idleAnim ? ' is-active' : ''}`}
      style={{
        ...revealStyle,
        borderColor: isActive ? 'var(--color-accent)' : 'transparent',
        backgroundColor: isActive ? 'rgba(147, 236, 191, 0.08)' : 'transparent',
      }}
    >
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} repository`}
        className="relative z-10 mt-0.5 shrink-0 text-white/40 transition-colors hover:text-accent"
      >
        {project.icon === 'github' ? (
          <GithubIcon className="h-5 w-5" />
        ) : (
          <CodeIcon className="h-5 w-5" />
        )}
      </a>
      <div className="w-full sm:min-w-[380px]">
        {/* Stretched link: the ::after covers the whole row so a click anywhere
            (except the icon above) opens the project. */}
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.9rem] after:absolute after:inset-0 after:content-['']"
          aria-label={project.name}
        >
          <TitleChars key={animSeed} text={project.name} seed={animSeed} />
        </a>
        <div className="mt-0.5 text-[0.7rem] text-white/60">
          {project.description}
        </div>
      </div>
      {pulse && (
        <>
          <span key={`bg-${frameNonce}`} className="frame-bg" />
          <span key={`flash-${frameNonce}`} className="frame-flash" />
          <span key={`scan-${frameNonce}`} className="frame-scan" />
        </>
      )}
    </li>
  );
}

type ProjectsProps = {
  activeName?: string;
  frameNonce?: number;
  onShow: (project: Project) => void;
  onHide: () => void;
  reveal: () => CSSProperties;
};

export function Projects({
  activeName,
  frameNonce,
  onShow,
  onHide,
  reveal,
}: ProjectsProps) {
  return (
    <div>
      <h3
        className="list-reveal mb-3 pl-2 text-[0.7rem] font-bold tracking-[0.18em] text-white/85 uppercase"
        style={reveal()}
      >
        Projects
        <span className="mt-[3px] block h-0.5 w-6 rounded-sm bg-accent" />
      </h3>

      {projectGroups.map((group) => (
        <div key={group.year}>
          <div
            className="list-reveal px-2 pt-4 pb-1 text-[0.7rem] font-bold tracking-[0.14em] text-white/60"
            style={reveal()}
          >
            {group.year}
          </div>
          <ul className="m-0 list-none p-0">
            {group.projects.map((project) => (
              <ProjectRow
                key={project.name}
                project={project}
                isActive={project.name === activeName}
                frameNonce={frameNonce}
                onShow={onShow}
                onHide={onHide}
                revealStyle={reveal()}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

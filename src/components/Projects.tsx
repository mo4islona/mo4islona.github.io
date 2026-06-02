import type { CSSProperties } from 'react';
import { CodeIcon, GithubIcon } from '../icons';
import { type Project, projectGroups } from '../projects';

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
            {group.projects.map((project) => {
              const isActive = project.name === activeName;
              // Fires the scan/flash only when a hover preview animation
              // actually starts on this row (frameNonce set + this row active).
              const pulse = isActive && frameNonce !== undefined;
              return (
                <li
                  key={project.name}
                  onMouseEnter={() => onShow(project)}
                  onMouseLeave={onHide}
                  className="group list-reveal relative flex cursor-pointer items-start gap-3 rounded-md border-l-2 py-2 pr-3 pl-3 transition-colors duration-500 ease-out"
                  style={{
                    ...reveal(),
                    borderColor: isActive ? 'var(--color-accent)' : 'transparent',
                    backgroundColor: isActive
                      ? 'rgba(147, 236, 191, 0.08)'
                      : 'transparent',
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
                  <div className="min-w-[380px]">
                    {/* Stretched link: the ::after covers the whole row so a
                        click anywhere (except the icon above) opens the project. */}
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-gradient text-[0.9rem] after:absolute after:inset-0 after:content-['']"
                    >
                      {project.name}
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
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

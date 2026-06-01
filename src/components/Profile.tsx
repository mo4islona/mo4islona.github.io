import type { CSSProperties } from 'react';
import { AwardIcon, GithubIcon, LinkedInIcon, XIcon } from '../icons';
import avatar from '../avatar.jpg';

const socials = [
  { href: 'https://github.com/mo4islona', label: 'GitHub', Icon: GithubIcon },
  {
    href: 'https://www.linkedin.com/in/mo4islona/',
    label: 'LinkedIn',
    Icon: LinkedInIcon,
  },
  { href: 'https://x.com/mo4islona', label: 'X', Icon: XIcon },
];

export function Profile({ reveal }: { reveal: () => CSSProperties }) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={avatar}
        alt="Evgeny Formanenko"
        className="list-reveal m-5 h-[200px] w-[200px] rounded-full object-cover"
        style={reveal()}
      />
      <h1
        className="list-reveal m-0 text-base font-normal text-white/70"
        style={reveal()}
      >
        Evgeny Formanenko
      </h1>
      <h2
        className="list-reveal m-0 text-[0.7rem] font-normal text-white/70"
        style={reveal()}
      >
        Full-stack developer
      </h2>
      <div
        className="list-reveal mt-1 mb-[5px] flex items-center justify-center gap-1 text-white/70"
        style={reveal()}
      >
        <AwardIcon className="h-4 w-4" />
        <span className="text-[0.6rem]">Yandex Hall of Fame</span>
      </div>
      <div
        className="list-reveal mt-1 flex items-center justify-center gap-3"
        style={reveal()}
      >
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-white/60 transition-colors hover:text-accent"
          >
            <Icon className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </div>
  );
}

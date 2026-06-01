import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import AwardIcon from '@mui/icons-material/WorkspacePremium';
import CodeIcon from '@mui/icons-material/Code';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

import avatar from './avatar.jpg';
import * as React from 'react';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#303030',
      paper: '#424242',
    },
  },
  typography: {
    fontFamily:
      '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  },
});

const Github = () => (
  <SvgIcon viewBox="-2 -2 28 28">
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
  </SvgIcon>
);

const globalStyles = (
  <GlobalStyles
    styles={(t) => ({
      'body, html': {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      body: {
        backgroundImage: [
          // 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
          // 'linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          // 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px)',
          // 'linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '24px 24px, 24px 24px, 6px 6px, 6px 6px',
      },
      a: {
        fontSize: '0.9rem',
        color: '#93ecbf',
        transition: t.transitions.create('color'),
        '&:hover': {
          color: t.palette.secondary.light,
        },
      },
      '.MuiListItem-root': {
        marginTop: 4,
      },
      '.MuiListItemText-secondary': {
        opacity: 0.6,
        fontSize: '0.7rem',
        minWidth: 380,
      },
      '.MuiListItemText-primary a': {
        backgroundImage: 'linear-gradient(90deg, #b6f09a 0%, #5fe3c4 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textDecorationColor: 'rgba(147, 236, 191, 0.5)',
        transition: t.transitions.create('text-decoration-color'),
      },
      '.MuiListItemText-primary a:hover': {
        backgroundImage: 'linear-gradient(90deg, #d4f7b8 0%, #8af0d8 100%)',
        textDecorationColor: 'rgba(182, 245, 212, 0.8)',
      },
    })}
  />
);

const linkIconSx = {
  p: 0,
  color: 'text.secondary',
  '&:hover': { backgroundColor: 'transparent' },
  '& svg': {
    opacity: 0.4,
    transition: 'opacity 0.2s, color 0.2s',
  },
  '&:hover svg': { opacity: 1, color: 'secondary.light' },
} as const;

const listItemIconSx = { minWidth: 40, alignSelf: 'flex-start', mt: '2px' } as const;

const listItemTextSx = { my: 0 } as const;

const socialIconSx = {
  color: 'text.secondary',
  opacity: 0.7,
  transition: 'opacity 0.2s, color 0.2s',
  '&:hover': { opacity: 1, color: 'secondary.light' },
  '& svg': { fontSize: '1.05rem' },
} as const;

type Project = {
  name: string;
  href: string;
  repo: string;
  description: string | React.ReactNode;
  icon: 'github' | 'code';
};

const projectGroups: { year: string; projects: Project[] }[] = [
  {
    year: '2026',
    projects: [
      {
        name: 'Wick charts',
        href: 'https://wick-charts.eeff.io/',
        repo: 'https://github.com/mo4islona/wick-charts',
        description: <div>High-performance timeseries charts for React, Vue,<br />and Svelte</div>,
        icon: 'github',
      },
    ],
  },
  {
    year: '2015–2019',
    projects: [
      {
        name: 'JS1K - Tear the curtain',
        href: 'https://js1k.com/2015-hypetrain/demo/2241',
        repo: 'https://js1k.com/2015-hypetrain/details/2241',
        description: 'The JavaScript code golfing competition',
        icon: 'code',
      },
      {
        name: 'Go material playground',
        href: '/material-go-playground/',
        repo: 'https://github.com/mo4islona/material-go-playground',
        description: 'Flexible, lightweight sandbox UI for Go playground',
        icon: 'github',
      },
      {
        name: 'Node blockly',
        href: '/blockly/',
        repo: 'https://github.com/mo4islona/node-blockly',
        description: 'Google Blockly port for Node.js via CommonJS module',
        icon: 'github',
      },
    ],
  },
];

const yearSubheaderSx = {
  bgcolor: 'transparent',
  px: 2,
  pt: 2,
  pb: 0.25,
  lineHeight: 1.6,
  color: 'text.secondary',
  opacity: 0.6,
  fontFamily: 'inherit',
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.14em',
} as const;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <linearGradient id="awardGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b6f09a" />
            <stop offset="100%" stopColor="#5fe3c4" />
          </linearGradient>
        </defs>
      </svg>
      <Paper component="main" sx={{ display: 'flex', alignItems: 'center', p: 2.5 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid>
            <Avatar
              alt="Evgeny Formanenko"
              src={avatar}
              sx={{ m: 2.5, width: 200, height: 200 }}
            />
            <Typography
              component="h1"
              align="center"
              variant="body1"
              color="textSecondary"
              sx={{ m: 0, fontSize: 'body1.fontSize', fontWeight: 'normal' }}
            >
              Evgeny Formanenko
            </Typography>
            <Typography
              component="h2"
              align="center"
              variant="body2"
              color="textSecondary"
              sx={{ m: 0, fontSize: '0.7rem', fontWeight: 'normal' }}
            >
              Full-stack developer
            </Typography>
            <Typography
              sx={{ mb: '5px', opacity: 0.9 }}
              align="center"
              variant="body2"
              color="textSecondary"
              component="div"
            >
              <Grid container justifyContent="center" alignItems="center">
                <Grid>
                  <AwardIcon
                    fontSize="small"
                    sx={{ opacity: 0.95, mr: '4px', mt: '2px', fill: 'url(#awardGradient)' }}
                  />
                </Grid>
                <Grid sx={{ fontSize: '0.6rem' }}>Yandex Hall of Fame</Grid>
              </Grid>
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 0.5 }}>
              <IconButton
                size="small"
                sx={socialIconSx}
                href="https://github.com/mo4islona"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github />
              </IconButton>
              <IconButton
                size="small"
                sx={socialIconSx}
                href="https://www.linkedin.com/in/mo4islona/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={socialIconSx}
                href="https://x.com/mo4islona"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <XIcon sx={{ transform: 'scale(0.88)' }} />
              </IconButton>
            </Stack>
          </Grid>
          <Grid>
            <Typography
              component="h3"
              sx={{
                pl: 2,
                mb: 1,
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                opacity: 0.85,
                '&::after': {
                  content: '""',
                  display: 'block',
                  width: 24,
                  height: 2,
                  mt: 0.75,
                  borderRadius: 1,
                  backgroundColor: '#93ecbf',
                },
              }}
            >
              Projects
            </Typography>
            <List dense disablePadding subheader={<li />} sx={{ '& ul': { p: 0 } }}>
              {projectGroups.map((group, index) => (
                <li key={group.year}>
                  <ul>
                    <ListSubheader sx={{ ...yearSubheaderSx, pt: index === 0 ? 0.25 : 2 }}>
                      {group.year}
                    </ListSubheader>
                    {group.projects.map((project) => (
                      <ListItem key={project.name} alignItems="flex-start">
                        <ListItemIcon sx={listItemIconSx}>
                          <IconButton
                            sx={linkIconSx}
                            disableRipple
                            target="_blank"
                            rel="noopener noreferrer"
                            href={project.repo}
                          >
                            {project.icon === 'github' ? <Github /> : <CodeIcon />}
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText
                          sx={listItemTextSx}
                          secondaryTypographyProps={{ component: 'div' }}
                          primary={
                            <a href={project.href} target="_blank" rel="noopener noreferrer">
                              {project.name}
                            </a>
                          }
                          secondary={project.description}
                        />
                      </ListItem>
                    ))}
                  </ul>
                </li>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;

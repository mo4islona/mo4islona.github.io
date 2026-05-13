import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import CupIcon from '@mui/icons-material/EmojiEvents';
import CodeIcon from '@mui/icons-material/Code';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

import avatar from './avatar.jpg';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#303030',
      paper: '#424242',
    },
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
      '.MuiListItemText-secondary': {
        opacity: 0.6,
        fontSize: '0.7rem',
      },
    })}
  />
);

const linkIconSx = {
  '&:hover': { color: 'inherit' },
  '& svg': { opacity: 0.4 },
} as const;

const listItemIconSx = { minWidth: 48 } as const;

const socialIconSx = {
  color: 'text.secondary',
  opacity: 0.7,
  transition: 'opacity 0.2s, color 0.2s',
  '&:hover': { opacity: 1, color: 'secondary.light' },
  '& svg': { fontSize: '1.05rem' },
} as const;

const smallSx = { opacity: 0.6, fontSize: '0.7rem' } as const;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <Paper sx={{ display: 'flex', alignItems: 'center', p: 2.5 }}>
        <Grid container spacing={4}>
          <Grid>
            <Avatar
              alt="Evgeny Formanenko"
              src={avatar}
              sx={{ m: 2.5, width: 200, height: 200 }}
            />
            <Typography align="center" variant="body1" color="textSecondary">
              Evgeny Formanenko
            </Typography>
            <Typography align="center" variant="body2" color="textSecondary">
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
                  <CupIcon
                    fontSize="small"
                    sx={{ opacity: 0.5, mr: '4px', mt: '2px', color: '#ffd400' }}
                  />
                </Grid>
                <Grid sx={{ fontSize: '0.7rem' }}>Yandex Hall of Fame</Grid>
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
            <List dense>
              <ListItem>
                <ListItemIcon sx={listItemIconSx}>
                  <IconButton
                    sx={linkIconSx}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/mo4islona/node-blockly"
                  >
                    <Github />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <a href="http://mo4islona.github.io/blockly/" target="_blank" rel="noopener noreferrer">
                      Node blockly
                    </a>
                  }
                  secondary="Google Blockly port for Node.js via CommonJS module"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={listItemIconSx}>
                  <IconButton
                    sx={linkIconSx}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/mo4islona/material-go-playground"
                  >
                    <Github />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <a
                      href="http://mo4islona.github.io/material-go-playground/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Go material playground
                    </a>
                  }
                  secondary="Flexible, lightweight sandbox client for goland playground"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={listItemIconSx}>
                  <IconButton
                    sx={linkIconSx}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://js1k.com/2015-hypetrain/details/2241"
                  >
                    <CodeIcon />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <a
                      href="https://js1k.com/2015-hypetrain/demo/2241"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      JS1K - Tear the curtain
                    </a>
                  }
                  secondary="The JavaScript code golfing competition"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={listItemIconSx}>
                  <IconButton
                    sx={linkIconSx}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/mo4islona/lingocard-test/"
                  >
                    <Github />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <a
                      href="https://github.com/mo4islona/lingocard-test"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Some Node.js test task
                    </a>
                  }
                  secondary={
                    <span>
                      <a
                        style={{ color: '#afa8a8', fontSize: '0.7rem' }}
                        href="https://github.com/mo4islona/lingocard-test/blob/master/REQUIREMENTS.md"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Rules
                      </a>
                      &nbsp;
                      <span style={smallSx}>(2020)</span>
                    </span>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={listItemIconSx}>
                  <IconButton
                    sx={linkIconSx}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/mo4islona/zachetka-frontend-test/"
                  >
                    <Github />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <a
                      href="https://mo4islona.github.io/zachetka-frontend-test/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Some Frontend JS test task
                    </a>
                  }
                  secondary={
                    <span>
                      <a
                        style={{ color: '#afa8a8', fontSize: '0.7rem' }}
                        href="https://github.com/mo4islona/zachetka-frontend-test/blob/master/README.md"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Rules
                      </a>
                      &nbsp;
                      <span style={smallSx}>(2015)</span>
                    </span>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import avatar from './avatar.jpg';
import Paper from "@material-ui/core/Paper";
import LocationIcon from "@material-ui/icons/Room";
import CupIcon from "@material-ui/icons/EmojiEvents";
import CodeIcon from "@material-ui/icons/Code";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";

const theme = {
  palette: {
    type: 'dark',
  },
}

const Github = () => {
  return <svg
    className="MuiSvgIcon-root"
    focusable="false"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="presentation">
    <path
      d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"></path>
  </svg>
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    'body, html': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    'a': {
      fontSize: '0.9rem',
      color: '#93ecbf',
      transition: theme.transitions.create(),
      '&:hover': {
        color: theme.palette.secondary.light
      }
    },
    '.MuiListItemText-secondary': {
      opacity: 0.6,
      fontSize: '0.7rem'
    }
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    margin: 20,
    width: 200,
    height: 200,
  },
  chip: {
    margin: theme.spacing(0.2),
  },
  link: {
    '&:hover': {
      color: 'inherit'
    },
    '& svg': {
      opacity: 0.4
    },
  },
  small: {
    opacity: 0.6,
    fontSize: '0.7rem'
  }
}));

function App() {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline/>
      <Paper className={classes.root}>
        <Grid container spacing={40}>
          <Grid item alignContent="space-around" alignItems="center">
            <Avatar alt="Eugene Formanenko" src={avatar} className={classes.avatar}/>
            <Typography align="center" variant="body1" color="textSecondary">Eugene
              Formanenko</Typography>
            <Typography align="center" variant="body2" color="textSecondary">Full-stack
              developer</Typography>
            <Typography align="center" variant="body2" color="textSecondary">
              <Grid container justify={"center"} alignItems={"center"}>
                <Grid item><LocationIcon style={{opacity: 0.4, marginTop: 3, transform: 'scale(0.8)'}}/></Grid>
                <Grid item>Moscow, Russia</Grid>
              </Grid>
            </Typography>
            <Grid container justify={"center"}>
              <Chip className={classes.chip} variant="outlined" size="small" label="NodeJS"></Chip>
              <Chip className={classes.chip} variant="outlined" size="small" label="Golang"></Chip>
              <Chip className={classes.chip} variant="outlined" size="small" label="React"></Chip>
            </Grid>
            <Typography style={{marginTop: 5, opacity: 0.9}} align="center" variant="body2" color="textSecondary">
              <Grid container justify={"center"} alignItems={"center"}>
                <Grid item>
                  <CupIcon
                    fontSize='small'
                    style={{opacity: 0.5, marginRight: 4, marginTop: 2, color: '#ffd400'}}/>
                </Grid>
                <Grid item style={{fontSize: '0.7rem'}}>Yandex Hall of Fame</Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid item>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <IconButton
                    className={classes.link}
                    target="_blank"
                    href="https://github.com/mo4islona/node-blockly"
                  >
                    <Github/>
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={<a href="http://mo4islona.github.io/blockly/" target="_blank">Node blockly</a>}
                  secondary="Google Blockly port for Node.js via CommonJS module"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <IconButton
                    className={classes.link}
                    target="_blank"
                    href="https://github.com/mo4islona/material-go-playground"
                  >
                    <Github/>
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <a href="http://mo4islona.github.io/material-go-playground/" target="_blank">
                      Go material playground
                    </a>
                  }
                  secondary="Flexible, lightweight sandbox client for goland playground"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <IconButton
                    className={classes.link}
                    target="_blank"
                    href="https://js1k.com/2015-hypetrain/details/2241"
                  >
                    <CodeIcon/>
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <a href="https://js1k.com/2015-hypetrain/demo/2241" target="_blank">
                      JS1K - Tear the curtain
                    </a>
                  }
                  secondary="The JavaScript code golfing competition"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <IconButton
                    className={classes.link}
                    target="_blank"
                    href="https://github.com/mo4islona/zachetka-frontend-test/"
                  >
                    <Github/>
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <a href="https://mo4islona.github.io/zachetka-frontend-test/" target="_blank">
                      Some JS test task
                    </a>
                  }
                  secondary={
                    <span>
                      <a style={{color: '#afa8a8', fontSize: '0.7rem'}}
                         href="https://github.com/mo4islona/zachetka-frontend-test/blob/master/README.md" target="_blank">
                        Rules
                      </a>
                      &nbsp;
                      <span className={classes.small}>(2015)</span>
                    </span>
                  }
                />
              </ListItem>

            </List>
          </Grid>
        </Grid>
      </Paper>
    </MuiThemeProvider>
  );
}

export default App;

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


import Menu from './Menu';
import GettingStarted from './pages/GettingStarted';
import Readonly from './pages/Readonly';
import Minimal from './pages/Minimal';
import Light from './pages/Light';
import Headless from './pages/Headless';
import Themes from './pages/Themes';
import Tests from './pages/Tests';
import Playground from './pages/Playground';
import WithTitle from './pages/WithTitle';

const history = createBrowserHistory({
  basename: process.env.production ? 'material-go-playground/' : ''
});

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 70
  },
}));


const theme = {
  typography: {
    h1: {
      fontSize: '1.8rem'
    },
    h4: {
      margin: '5px 0'
    }
  }
};

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <Router history={history}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Golang playground component
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <Menu />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <Menu />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <MuiThemeProvider theme={createMuiTheme(theme)}>
            <Route path="/minimal" exact component={Minimal} />
            <Route path="/readonly" exact component={Readonly} />
            <Route path="/theming" exact component={Themes} />
            <Route path="/tests" exact component={Tests} />
            <Route path="/light" exact component={Light} />
            <Route path="/headless" exact component={Headless} />
            <Route path="/with-title" exact component={WithTitle} />
            <Route path="/full-feature" exact component={Playground} />
            <Route path="/" exact component={GettingStarted} />
          </MuiThemeProvider>
        </main>
      </div>
    </Router>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

render(
  <ResponsiveDrawer />,
  document.getElementById('root'),
);

import Divider from '@material-ui/core/Divider';
import { Link as RouterLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import React from 'react';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  list: {
    width: '100%',
  },
  link: {
    width: '100%',
    display: 'block',
    '* a': {
      textDecoration: 'none'
    }
  }
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

export default function AppMenu() {
  const classes = useStyles();

  const location = window.location.href

  return (
    <div>
      <div className={classes.toolbar}></div>
      <div>
        <Divider/>
        <List disablePadding className={classes.list}>
          <ListItem button divider  component={AdapterLink} to={"/"}>
            <ListItemText primary="Getting started"/>
          </ListItem>
          <ListSubheader>Examples</ListSubheader>
          <ListItem button divider component={AdapterLink} to={"/light"}>
            <ListItemText primary="Light mode"/>
          </ListItem>
          <ListItem button divider component={AdapterLink} to={"/minimal"}>
            <ListItemText primary="Minimal"/>
          </ListItem>
          <ListItem button divider component={AdapterLink} to={"/theming"}>
            <ListItemText primary="Theming"/>
          </ListItem>
          <ListItem button divider component={AdapterLink} to={"/tests"}>
            <ListItemText primary="Tests"/>
          </ListItem>
          <ListItem button divider component={AdapterLink} to={"/with-title"}>
            <ListItemText primary="With title"/>
          </ListItem>
          <ListItem button divider component={AdapterLink} to={"/headless"}>
            <ListItemText primary="Headless"/>
          </ListItem>
          <ListItem button divider component={AdapterLink} to={"/full-feature"}>
            <ListItemText primary="Full feature"/>
          </ListItem>
        </List>
      </div>
    </div>
  );
}

/*

<MenuItem button dense>
          <ListItemText primary="Getting started" />
        </MenuItem>

<ListSubheader>Examples</ListSubheader>
        <ListItem dense button>
          <ListItemText primary="Themes"/>
        </ListItem>
        <ListItem button dense>
          <ListItemText primary="Readonly"/>
        </ListItem>
        <RouterLink className={classes.link} to="minimal"><ListItem button>
          <ListItemText primary="Minimal"/>
        </ListItem></RouterLink>
        <RouterLink className={classes.link} to="playground"><ListItem button>
          <ListItemText primary="Go Playground"/>
        </ListItem></RouterLink>
        <ListItem button>
          <RouterLink to="tests"><ListItemText primary="Tests"/></RouterLink>
        </ListItem>
 */

import Divider from '@material-ui/core/Divider';
import { Link as RouterLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ExitLink from '@material-ui/icons/ExitToApp';
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
  },
  group: {
    marginTop: 20,
    lineHeight: '36px',
    opacity: 0.8,

  },
  blank: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    opacity: 0.2,
    transform: 'scale(0.8)'
  }
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const Link = React.forwardRef((props, ref) => (
  <a innerRef={ref} {...props} />
));

export default function AppMenu() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar}>
        <img
          src="https://golang.org/lib/godoc/images/go-logo-blue.svg"
          height={40}
          style={{ position: 'relative', top: 3, marginLeft: 12, left: 12 }}
        />
      </div>
      <div>
        <Divider/>
        <List className={classes.list}>
          <ListItem button dense component={AdapterLink} to={"/"}>
            <ListItemText primary="Getting started"/>
          </ListItem>
          <ListSubheader className={classes.group}>Examples</ListSubheader>
          <ListItem button divider dense component={AdapterLink} to={"/light"}>
            <ListItemText primary="Light mode"/>
          </ListItem>
          <ListItem button divider dense component={AdapterLink} to={"/minimal"}>
            <ListItemText primary="Minimal"/>
          </ListItem>
          <ListItem button divider dense component={AdapterLink} to={"/theming"}>
            <ListItemText primary="Theming"/>
          </ListItem>
          <ListItem button divider dense component={AdapterLink} to={"/tests"}>
            <ListItemText primary="Tests"/>
          </ListItem>
          <ListItem button divider dense component={AdapterLink} to={"/with-title"}>
            <ListItemText primary="With title"/>
          </ListItem>
          <ListItem button divider dense component={AdapterLink} to={"/errors"}>
            <ListItemText primary="Errors"/>
          </ListItem>
          {/*<ListItem button divider component={AdapterLink} to={"/multiple-code"}>*/}
          {/*  <ListItemText primary="Multiple code"/>*/}
          {/*</ListItem>*/}
          <ListItem button divider dense component={AdapterLink} to={"/headless"}>
            <ListItemText primary="Headless & readonly"/>
          </ListItem>
          <ListItem button divider dense component={Link} target={"_blank"} href={"/material-go-playground/example"}>
            <ListItemText primary="Full feature"/>
            <ListItemAvatar className={classes.blank}><ExitLink  /></ListItemAvatar>
          </ListItem>
          <ListSubheader className={classes.group}>Widgets</ListSubheader>
          <ListItem button divider dense component={Link} target={"_blank"} href={"/material-go-playground/widget"}>
            <ListItemText primary="Simple"/>
            <ListItemAvatar className={classes.blank}><ExitLink   /></ListItemAvatar>
          </ListItem>
        </List>
      </div>
    </div>
  );
}

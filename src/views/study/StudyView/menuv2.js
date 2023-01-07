import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.drawer + 1,
  },
  menu: {
    width: '100%',
    height: '33.33%',
    position: 'fixed',
    bottom: '-33.33%',
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create(['bottom'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  menuOpen: {
    bottom: 0,
  },
}));

function Menu() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Menu"
          icon={<MenuIcon />}
          onClick={handleToggle}
        />
      </BottomNavigation>
      <div className={`${classes.menu} ${open ? classes.menuOpen : ''}`}>
        <BottomNavigation value={value} onChange={handleChange} showLabels>
          <BottomNavigationAction label="Orders" />
          <BottomNavigationAction label="Settings" />
          <BottomNavigationAction label="Cancel" />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default Menu;
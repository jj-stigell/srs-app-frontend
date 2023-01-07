/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';


// Icons
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import InfoIcon from '@material-ui/icons/Info';
import TextSnippetIcon from '@material-ui/icons/TextSnippet';
import EditIcon from '@material-ui/icons/Edit';
import BugReportIcon from '@material-ui/icons/BugReport';

/*
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

import BugReportIcon from '@mui/icons-material/BugReport';

import TextSnippetIcon from '@mui/icons-material/TextSnippet';
*/
//import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

//import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
//import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

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
    height: '60%',
    position: 'fixed',
    bottom: '-60%',
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
  selected: {
    backgroundColor: 'lightgreen'
  },
  selectedBody: {
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgreen'
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

  console.log('value is now:', value);


  return (
    <div className={classes.root}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Open menu"
          icon={<KeyboardArrowUpIcon />}
          onClick={handleToggle}
        />
      </BottomNavigation>
      <div className={`${classes.menu} ${open ? classes.menuOpen : ''}`}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Close menu"
            icon={<KeyboardArrowDownIcon />}
            onClick={handleToggle}
          />
        </BottomNavigation>
        <BottomNavigation value={value} onChange={handleChange} showLabels>
          <BottomNavigationAction
            label="Information"
            icon={<InfoIcon fontSize='small' />}
            className={value === 0 ? classes.selected : ''}
          />
          <BottomNavigationAction
            label="Examples"
            icon={<TextSnippetIcon
              fontSize='small' />}
            className={value === 1 ? classes.selected : ''}
          />
          <BottomNavigationAction
            label="Edit"
            icon={<EditIcon fontSize='small' />}
            className={value === 2 ? classes.selected : ''}
          />
          <BottomNavigationAction
            label="Bug report"
            icon={<BugReportIcon fontSize='small' />}
            className={value === 3 ? classes.selected : ''}
          />
        </BottomNavigation>
        <div className={classes.selectedBody}>
          {value}
        </div>
      </div>
    </div>
  );



}

export default Menu;

/*

import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import BugReportIcon from '@material-ui/icons/BugReport';
import TextSnippetIcon from '@material-ui/icons/TextSnippet';

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
}


*/
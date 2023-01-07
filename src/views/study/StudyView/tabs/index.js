/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import InfoIcon from '@material-ui/icons/Info';
import TextSnippetIcon from '@material-ui/icons/TextSnippet';
import EditIcon from '@material-ui/icons/Edit';
import BugReportIcon from '@material-ui/icons/BugReport';

// project import
import Information from './Information';
import Examples from './Examples';
import Edit from './Edit';
import BugReport from '@material-ui/icons/BugReport';

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
    color: 'black',
    backgroundColor: theme.palette.primary.light
  },
  selectedBody: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.light
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
          {value === 0 ? <Information /> : null}
          {value === 1 ? <Examples /> : null}
          {value === 2 ? <Edit /> : null}
          {value === 3 ? <BugReport /> : null}
        </div>
      </div>
    </div>
  );



}

export default Menu;

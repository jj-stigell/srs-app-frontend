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

const useStyles = makeStyles((theme) => ({
  body: {
    height: '100%',
    backgroundColor: theme.palette.primary.light
  },
  navBody: {
    backgroundColor: theme.palette.primary.light
  },
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
    backgroundColor: theme.palette.primary.light,
    transition: theme.transitions.create(['bottom'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  menuOpen: {
    bottom: 0,
  },
  show: {
    backgroundColor: '#5de364',
    color: 'black'
  }
}));

const ShowAnswerButton = ({ setRevealed }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={`${classes.menu} ${classes.menuOpen}`}>
        <BottomNavigation value={4} showLabels className={classes.navBody} >
          <BottomNavigationAction
            label="Show answer"
            onClick={() => setRevealed(true)}
            className={classes.show}
          />
        </BottomNavigation>
      </div>
    </div>
  );
};

export default ShowAnswerButton;

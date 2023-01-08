/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import TextSnippetIcon from '@material-ui/icons/TextSnippet';
import EditIcon from '@material-ui/icons/Edit';
import BugReportIcon from '@material-ui/icons/BugReport';

// project import
import Information from './Information';
import Examples from './Examples';
import Edit from './Edit';
import BugReport from '@material-ui/icons/BugReport';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.drawer + 1
  },
  menu: {
    width: '100%',
    height: '53%',
    position: 'fixed',
    bottom: '-60%',
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create(['bottom'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeOut
    })
  },
  menuOpen: {
    bottom: 0
  },
  navBody: {
    backgroundColor: theme.palette.primary.light
  },
  selected: {
    backgroundColor: theme.palette.primary.dark,
    color: 'black'
  },
  selectedBody: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.dark
  },
}));

const Tabs = ({ card }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={`${classes.menu} ${classes.menuOpen}`}>
        <BottomNavigation value={value} onChange={handleChange} showLabels className={classes.navBody}>
          <BottomNavigationAction
            label={t('review.tabs.grammar.title')}
            icon={<InfoIcon fontSize='small' />}
            className={value === 0 ? classes.selected : ''}
          />
          <BottomNavigationAction
            label={t('review.tabs.examples.title')}
            icon={<TextSnippetIcon fontSize='small' />}
            className={value === 1 ? classes.selected : ''}
          />
          <BottomNavigationAction
            label={t('review.tabs.edit.title')}
            icon={<EditIcon fontSize='small' />}
            className={value === 2 ? classes.selected : ''}
          />
          <BottomNavigationAction
            label={t('review.tabs.bugReport.title')}
            icon={<BugReportIcon fontSize='small' />}
            className={value === 3 ? classes.selected : ''}
          />
        </BottomNavigation>
        <div className={classes.selectedBody}>
          {value === 0 ? <Information card={card} /> : null}
          {value === 1 ? <Examples card={card} /> : null}
          {value === 2 ? <Edit cardId={card.id} accountCard={card.accountCard} /> : null}
          {value === 3 ? <BugReport /> : null}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

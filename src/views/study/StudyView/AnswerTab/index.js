/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCard } from '../../../../store/cardReducer';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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
    height: '53%',
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
    backgroundColor: theme.palette.primary.light
  },
  navBody: {
    backgroundColor: theme.palette.primary.light
  },
  again: {
    backgroundColor: '#f54242',
    color: 'black'
  },
  hard: {
    backgroundColor: '#db9c1d',
    color: 'black'
  },
  easy: {
    backgroundColor: '#5de364',
    color: 'black'
  },
  selectedBody: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.light
  },
}));

const AnswerTab = ({ card }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const cardStore = useSelector(state => state.cards);
  const dispatcher = useDispatch();

  const rescheduleCard = (result) => {
    let activeCard = null, cards = [];
    if (cardStore.cards.length > 0) {
      [activeCard, ...cards] = cardStore.cards;
    }
    dispatcher(setActiveCard({ cards: cards, activeCard: activeCard }));
  };

  return (
    <div className={classes.root}>
      <div className={`${classes.menu} ${classes.menuOpen}`}>
        <BottomNavigation value={4} showLabels className={classes.navBody}>
          <BottomNavigationAction
            label={t('review.buttons.result.again')}
            onClick={() => rescheduleCard('AGAIN')}
            className={classes.again}
          />
          <BottomNavigationAction
            label={t('review.buttons.result.hard')}
            onClick={() => rescheduleCard('HARD')}
            className={classes.hard}
          />
          <BottomNavigationAction
            label={t('review.buttons.result.easy')}
            onClick={() => rescheduleCard('EASY')}
            className={classes.easy}
          />
        </BottomNavigation>
      </div>
    </div>
  );
};

export default AnswerTab;


/*
mutation RescheduleCard($cardId: Int!, $reviewResult: ReviewResult!, $newInterval: Int!, $newEasyFactor: Float!, $date: Date!, $reviewType: ReviewType!, $timing: Int, $extraReview: Boolean) {
  rescheduleCard(cardId: $cardId, reviewResult: $reviewResult, newInterval: $newInterval, newEasyFactor: $newEasyFactor, date: $date, reviewType: $reviewType, timing: $timing, extraReview: $extraReview) {
    id
    reviewCount
    easyFactor
    accountStory
    accountHint
    dueAt
    mature
    createdAt
    updatedAt
  }
}
*/
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  // ...
  useParams
} from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/styles';
import HelpIcon from '@material-ui/icons/Help';
import { Tooltip, IconButton } from '@material-ui/core';

// project imports
import CardFront from './CardFront';
import ShowAnswerButton from './ShowAnswerButton';
import Answer from './Answer';
import AnswerTab from '../AnswerTab';
import Tab from '../tabs';
import Hint from './Hint';
import { mockData } from '../mockData';
import { setCards, setActiveCard } from '../../../../store/cardReducer';

const useStyles = makeStyles((theme) => ({
  body: {
    height: '100%',
    backgroundColor: theme.palette.primary.light
  },
  partition: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  partitionSecond: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  },
}));

const Card = () => {
  const classes = useStyles();
  const dispatcher = useDispatch();
  const cardStore = useSelector(state => state.cards);
  const [revealed, setRevealed] = useState(false);
  const id = useParams().id;

  console.log('deck id is:', id);

  useEffect( async () => {
    setRevealed(false);
    console.log('STORE IS CHANGED, CURRENT CARD:', cardStore.activeCard);
    console.log('CARD SET NOW:', cardStore.cards);
  }, [cardStore]);


  return (
    <div className={classes.body}>
      {/* Upper half of the page */}
      <CardFront card={cardStore.activeCard} />
      <Hint card={cardStore.activeCard} />
      {/* Render only show answer button if not yet revealed */}
      { !revealed
        ?
        <ShowAnswerButton setRevealed={setRevealed} />
        :
        <>
          <hr style={{ width: '80%' }} />;
          <Answer card={cardStore.activeCard} />
          <AnswerTab card={cardStore.activeCard} />
          <Tab card={cardStore.activeCard} />
        </>
      }
    </div>
  );
};

export default Card;

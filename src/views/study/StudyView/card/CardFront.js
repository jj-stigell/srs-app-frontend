/* eslint-disable no-unused-vars */
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  partition: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  }
}));

const CardFront = ({ card }) => {
  const classes = useStyles();
  let frontData;

  console.log('fron card is',card);

  switch (card.cardType) {
  case 'WORD':
    frontData = card.reviewType === 'RECALL' ? card.word.translation.translation : card.word.word;
    break;
  case 'KANJI':
    frontData = card.reviewType === 'RECALL' ? card.kanji.translation.keyword : card.kanji.kanji;
    break;
  }

  return (
    <div className={classes.partition}>
      <h1>{frontData}</h1>
    </div>
  );
};

export default CardFront;

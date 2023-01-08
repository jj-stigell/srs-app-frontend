/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/styles';
import HelpIcon from '@material-ui/icons/Help';
import { Tooltip, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  help: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  }
}));

const Hint = ({ card }) => {
  const classes = useStyles();
  let hint = 'Problem rendering hint';
  const [hintVisible, setHintVisible] = useState(false);
  const cardStore = useSelector(state => state.cards);

  if (card?.accountCard?.accountHint) {
    hint = card.accountCard.accountHint;
  } else {
    switch (card.cardType) {
    case 'WORD':
      hint = card.word.translation.hint;
      break;
    case 'KANJI':
      hint = card.kanji.translation.hint;
      break;
    }
  }

  useEffect( async () => {
    setHintVisible(false);
  }, [cardStore]);

  return (
    <div className={classes.help}>
      { !hintVisible
        ?
        <Tooltip title="Show hint">
          <IconButton
            onClick={() => setHintVisible(true)} >
            <HelpIcon />
          </IconButton>
        </Tooltip>
        :
        <h3>{hint}</h3>
      }
    </div>
  );
};

export default Hint;

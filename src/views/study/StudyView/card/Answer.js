import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';

// project imports
import AddFurigana from './furigana';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  partition: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  }
}));

const Answer = ({ card }) => {
  const classes = useStyles();
  let keyword = 'Problem rendering keyword';
  let story = 'Problem rendering story';

  switch (card.cardType) {
  case 'WORD':
    if (card.reviewType === 'RECALL') {
      if (card.word.furigana) {
        keyword = <AddFurigana kanji={card.word.word} furigana={card.word.reading} />;
      } else {
        keyword = <AddFurigana kanji={card.word.word} />;
      }
    } else if (card.reviewType === 'RECOGNISE') {
      keyword = <AddFurigana kanji={card.word.translation.translation} />;
    }
    break;
  case 'KANJI':

    if (card.reviewType === 'RECALL') {
      keyword = <AddFurigana kanji={card.kanji.kanji} />;
    } else if (card.reviewType === 'RECOGNISE') {
      keyword = <AddFurigana kanji={card.kanji.translation.keyword} />;
    }
    break;
  }

  if (card?.accountCard?.accountStory) {
    story = card.accountCard.accountStory;
  } else {
    switch (card.cardType) {
    case 'WORD':
      story = card.word.word.translation.story;
      break;
    case 'KANJI':
      story = card.kanji.kanji.translation.story;
      break;
    }
  }

  return (
    <div className={classes.partition}>
      <div>
        <h3>{keyword}</h3>
        <h3>{story}</h3>
      </div>
    </div>
  );
};

export default Answer;

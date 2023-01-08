/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));
const Information = ({ card }) => {
  const classes = useStyles();

  const vocabulary = [
    {
      reading: 'sdfds',
      meaning: 'meaning',
      translation: 'tarnss'
    },
    {
      reading: '534',
      meaning: 'meaning',
      translation: 'tarnss'
    },
    {
      reading: 'dsfh',
      meaning: 'meaning',
      translation: 'tarnss'
    },
  ];

  /*
    id: 105,
    cardType: 'WORD',
    reviewType: 'RECALL',
    createdAt: '2022-12-24T09:52:08.745Z',
    updatedAt: '2022-12-24T09:52:08.745Z',
    accountCard: {
      id: 1,
      reviewCount: 65,
      easyFactor: 2.5,
      accountStory: 'this is my account story: cars are cool',
      accountHint: 'My own hint: its too complex to make up a hint',
      dueAt: '2021-03-08',
      mature: false,
      createdAt: '2022-12-24T09:52:08.745Z',
      updatedAt: '2022-12-24T09:52:08.745Z'
    },
    word: {
      id: 2,
      word: '自動車',
      jlptLevel: 5,
      furigana: true,
      reading: 'じどうしゃ',
      readingRomaji: 'jidousha',
      createdAt: '2022-12-24T09:52:08.745Z',
      updatedAt: '2022-12-24T09:52:08.745Z',
      translation: {
        translation: 'card',
        hint: 'this is the default hint for car',
        story: 'Story for car word, default one',
        description: 'description for the word car',
        createdAt: '2022-12-24T09:52:08.745Z',
        updatedAt: '2022-12-24T09:52:08.745Z'
      }
    }
  */

  /*
  if (card.cardType === 'WORD') {

  }
*/




  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow>
          <TableCell>Reading</TableCell>
          <TableCell>Meaning</TableCell>
          <TableCell>Translation</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vocabulary.map((word) => (
          <TableRow key={word.reading}>
            <TableCell>{word.reading}</TableCell>
            <TableCell>{word.meaning}</TableCell>
            <TableCell>{word.translation}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Information;
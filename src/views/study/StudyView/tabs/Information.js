import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));
const Information = () => {
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
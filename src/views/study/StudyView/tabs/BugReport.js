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

const BugReport = () => {
  const classes = useStyles();

  return (
    <>Bugs</>
  );
};

export default BugReport;
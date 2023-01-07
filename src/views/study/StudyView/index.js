/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { Tooltip, IconButton } from '@material-ui/core';

// project imports
import Tab from './tabs';

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

const Study = () => {
  const classes = useStyles();
  const [revealed, setRevealed] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  const handleReschedule = (result) => {

    console.log('review result is:', result);
  };

  return (
    <Grid>
      <div className={classes.body}>
        {/* Upper half of the page */}
        <div className={classes.partition}>
          <h1>Car</h1>
        </div>
        <div className={classes.partition}>
          { !hintVisible
            ?
            <Tooltip title="Show hint">
              <IconButton
                onClick={() => setHintVisible(true)} >
                <HelpIcon />
              </IconButton>
            </Tooltip>
            :
            <h3>Draw just few lines</h3>
          }
        </div>
        {/* Lower half of the page */}
        {revealed && (
          <div>
            <hr />
            <div className={classes.partition}>
              <h1>自動車</h1>
            </div>
            <div className={classes.partitionSecond}>
              <button onClick={() => handleReschedule('again')}>again</button>
              <button onClick={() => handleReschedule('hard')}>hard</button>
              <button onClick={() => handleReschedule('easy')}>easy</button>
            </div>
          </div>
        )}
        {/* Reveal button */}
        {!revealed && (
          <div className={classes.partitionSecond}>
            <button onClick={() => setRevealed(true)}>show answer</button>
          </div>
        )}
        {/* Menu toggle button */}
        {revealed && (
          <div>
            <Tab />
          </div>
        )}
      </div>
    </Grid>
  );
};

export default Study;

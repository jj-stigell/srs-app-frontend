/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

import HelpIcon from '@material-ui/icons/Help';


import { ButtonBase, Link, Tooltip, IconButton } from '@material-ui/core';




import Tab from './tabs';

//import { gridSpacing } from './../../../store/constant';


const Study = () => {
  const [revealed, setRevealed] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  const showHint = () => {

  };

  return (
    <Grid>
      <div style={{ height: '100%', backgroundColor: 'lightgreen' }}>
        {/* Upper half of the page */}
        <div style={{ height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <h1>Car</h1>
        </div>
        <div style={{ height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
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
            <div style={{ height: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h1>自動車</h1>
            </div>
          </div>
        )}
        {/* Reveal button */}
        {!revealed && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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


/*
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function BasicTooltip() {
  return (
    <Tooltip title="Delete">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

*/
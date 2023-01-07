import React, { useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

import Menu from './menuv2';

//import { gridSpacing } from './../../../store/constant';


const Study = () => {
  const [revealed, setRevealed] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  return (


    <Grid>







      <div style={{ height: '100%', backgroundColor: 'lightgreen' }}>
        {/* Upper half of the page */}
        <div style={{ height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <h1>Hello</h1>
        </div>
        {/* Lower half of the page */}
        {revealed && (
          <div style={{ height: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>World</h1>
          </div>
        )}
        {/* Reveal button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => setRevealed(!revealed)}>Reveal</button>
        </div>
        {/* Menu toggle button */}
        {revealed && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => setMenuVisible(!menuVisible)}>Toggle Menu</button>
          </div>
        )}
        {menuVisible && revealed && (
          <div style={{ height: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Menu goes here */}
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
          </div>
        )}
        <>
          <Menu />
        </>
      </div>
    </Grid>
  );
};

export default Study;

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Menu = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Examples" />
        <Tab label="Grammar" />
        <Tab label="Settings" />
      </Tabs>
      {value === 0 && (
        <div>
          {/* Examples tab content goes here */}
        </div>
      )}
      {value === 1 && (
        <div>
          {/* Grammar tab content goes here */}
        </div>

      )}
      {value === 2 && (
        <div>
          {/* Settings tab content goes here */}
        </div>
      )}
    </div>
  );
};

export default Menu;
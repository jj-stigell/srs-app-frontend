import React from 'react';

// material-ui
import InfoIcon from '@material-ui/icons/Info';
import { IconButton, Tooltip } from '@material-ui/core';

//==============================|| INFO TOOLTIP ||==============================//

const InfoTooltip = ({ title }) => {
  return (
    <Tooltip title={title}>
      <IconButton size="small">
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default InfoTooltip;

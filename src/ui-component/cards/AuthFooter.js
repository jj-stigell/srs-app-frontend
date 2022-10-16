import React from 'react';

import { Link, Typography, Stack } from '@material-ui/core';
import config from '../../config';

//-----------------------|| FOOTER - AUTHENTICATION 2 & 3 ||-----------------------//

const AuthFooter = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="subtitle2" component={Link} href={config.leftLink.url} target="_blank" underline="hover">
        {config.leftLink.text}
      </Typography>
      <Typography variant="subtitle2" component={Link} href={config.rightLink.url} target="_blank" underline="hover">
                &copy; {config.rightLink.text}
      </Typography>
    </Stack>
  );
};

export default AuthFooter;

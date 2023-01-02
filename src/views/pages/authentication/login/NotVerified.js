import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@material-ui/core';
import { Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import { setVerified } from '../../../../store/accountReducer';

//===============================|| REGISTER MAIN ||===============================//

const NotVerified = () => {
  const register = useSelector((state) => state.register);
  const theme = useTheme();
  const { t } = useTranslation();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatcher = useDispatch();
  const resetVerifyData = () => dispatcher(setVerified(true));

  return (
    <>
      <Grid item xs={12}>
        <Grid
          container
          direction={matchDownSM ? 'column-reverse' : 'row'}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Stack alignItems="center" justifyContent="center" spacing={1}>
              <Typography
                color={theme.palette.secondary.main}
                gutterBottom
                variant={matchDownSM ? 'h3' : 'h2'}
                align='center'
              >
                {t('login.emailNotVerifiedMessage', { email: register.email } )}
              </Typography>
              <Typography
                color={theme.palette.secondary.main}
                gutterBottom
                variant={matchDownSM ? 'h3' : 'h2'}
                align='center'
                component={RouterLink}
                to="/verify/resend"
              >
                {t('login.resendVerificationLink')}
              </Typography>
              <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                <Typography
                  onClick={resetVerifyData}
                  variant="subtitle1"
                  sx={{ textDecoration: 'none' }}
                >
                  {t('login.linkToLogin')}
                </Typography>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NotVerified;

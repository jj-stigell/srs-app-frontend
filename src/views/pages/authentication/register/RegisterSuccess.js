import React, { useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@material-ui/core';
import { Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

//===============================|| REGISTER MAIN ||===============================//

const RegisterSuccess = () => {
  const register = useSelector((state) => state.register);
  const theme = useTheme();
  const { t } = useTranslation();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/login');
    }, 5000);
  }, [history]);

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
                {t('register.success', { email: register.email } )}
              </Typography>
              <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                <Typography
                  component={RouterLink}
                  to="/login"
                  variant="subtitle1"
                  sx={{ textDecoration: 'none' }}
                >
                  {t('register.linkToLogin')}
                </Typography>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterSuccess;

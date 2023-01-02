import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper1 from './../AuthWrapper1';
import Logo from './../../../../ui-component/Logo';
import AuthCardWrapper from './../AuthCardWrapper';
import LoginForm from './LoginForm';
import AuthFooter from './../../../../ui-component/cards/AuthFooter';
import LangSelector from '../LangSelector';
import { setRegister } from '../../../../store/registerReducer';
import NotVerified from './NotVerified';

//================================|| LOGIN MAIN ||================================//

const Login = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const dispatcher = useDispatch();
  const account = useSelector((state) => state.account);

  const resetRegisterData = () => {
    dispatcher(setRegister({ registered: false, email: '' }));
    history.push('/register');
  };

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <RouterLink to="#">
                      <Logo />
                    </RouterLink>
                  </Grid>
                  {!account.verified ?
                    <NotVerified/>
                    :
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
                              >
                                {t('login.welcomeBack')}
                              </Typography>
                              <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                {t('login.enterCredentials')}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <LoginForm />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container direction="column" alignItems="center" xs={12}>
                          <Typography
                            onClick={resetRegisterData}
                            variant="subtitle1"
                            sx={{ textDecoration: 'none' }}
                          >
                            {t('register.noAccount')}
                          </Typography>
                          <LangSelector />
                        </Grid>
                      </Grid>
                    </>
                  }
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;

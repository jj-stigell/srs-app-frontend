/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { LOGIN } from '../../../../queries/mutations';
import { setAccount, setVerified } from '../../../../store/accountReducer';
import { setRememberMe, resetRememberMe } from '../../../../store/rememberMeReducer';
import { constants } from '../../../../utils/constants';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// style constant
const useStyles = makeStyles((theme) => ({
  redButton: {
    fontSize: '1rem',
    fontWeight: 500,
    backgroundColor: theme.palette.grey[50],
    border: '1px solid',
    borderColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem'
    }
  },
  signDivider: {
    flexGrow: 1
  },
  signText: {
    cursor: 'unset',
    margin: theme.spacing(2),
    padding: '5px 56px',
    borderColor: theme.palette.grey[100] + ' !important',
    color: theme.palette.grey[900] + '!important',
    fontWeight: 500
  },
  loginIcon: {
    marginRight: '16px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '8px'
    }
  },
  loginInput: {
    ...theme.typography.customInput
  }
}));

//============================|| API JWT - LOGIN ||============================//

const LoginForm = (props, { ...others }) => {
  const classes = useStyles();
  const dispatcher = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const savedCreds = useSelector(state => state.remember);
  const [checked, setChecked] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // eslint-disable-next-line no-unused-vars
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    }
  });

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: savedCreds.email ? savedCreds.email : '',
          password: savedCreds.password ? savedCreds.password : '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(t('errors.notValidEmailError')) //
            .max(constants.account.emailMaxLength, t('errors.emailMaxLengthError', { length: constants.account.emailMaxLength  }))
            .required(t('errors.requiredEmailError')),
          password: Yup.string()
            .max(constants.account.passwordMaxLength, t('errors.passwordMaxLengthError', { length: constants.account.passwordMaxLength }))
            .required(t('errors.requiredPasswordError'))
        })}
        onSubmit={ async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const res = await login({
              variables: {
                email: values.email,
                password: values.password
              }
            });

            if (res.errors) {
              const error = res.errors.graphQLErrors[0].extensions.code;
              if (error === 'emailNotVerifiedError') {
                dispatcher(setVerified(false));
              }
              setStatus({ success: false });
              setErrors({ submit: t(`errors.${error}`) });
              setSubmitting(false);
            } else if (res.data) {
              const account = res.data.login.account;
              const token = res.data.login.token;
              const session = res.data.login.session;
              const payload = { isLoggedIn: true, account: account, token: token, session: session };

              if (checked) {
                dispatcher(setRememberMe({ email: values.email, password: values.password }));
              } else {
                dispatcher(resetRememberMe());
              }

              window.localStorage.setItem('srs-token', token);
              dispatcher(setAccount(payload));
            }
          } catch(error) {
            console.log('error:::', error);
            setStatus({ success: false });
            setErrors({ submit: t('errors.connectionError') });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
              <InputLabel htmlFor="outlined-adornment-email-login">{t('misc.email')}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label={t('misc.email')}
                inputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {' '}
                  {errors.email}{' '}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} className={classes.loginInput}>
              <InputLabel htmlFor="outlined-adornment-password-login">{t('misc.password')}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t('misc.password')}
                inputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {' '}
                  {errors.password}{' '}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label={t('login.rememberMe')}
              />
              <Typography
                variant="subtitle1"
                component={Link}
                to={props.login ? '/pages/forgot-password/forgot-password' + props.login : '#'}
                color="secondary"
                sx={{ textDecoration: 'none' }}
              >
                {t('misc.passwordForgot')}
              </Typography>
            </Stack>
            {errors.submit && (
              <Box
                sx={{
                  mt: 3
                }}
              >
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box
              sx={{
                mt: 2
              }}
            >
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  {t('login.logInButton')}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default LoginForm;

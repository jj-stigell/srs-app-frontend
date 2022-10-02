import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../../../../queries/mutations';
import { setAccount } from '../../../../store/accountReducer';

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

//import axios from 'axios';

// project imports
//import useScriptRef from '../../../../hooks/useScriptRef';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';

//import { ACCOUNT_INITIALIZE } from './../../../../store/actions';
//import configData from '../../../../config';

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

const RestLogin = (props, { ...others }) => {
  const classes = useStyles();
  const dispatcher = useDispatch();
  const { t } = useTranslation();

  //const scriptedRef = useScriptRef();
  const [checked, setChecked] = React.useState(true);
  const [error, setError] = React.useState(null);

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
      const message = t(`errors.${error.graphQLErrors[0].extensions.errorName}`);
      setError(message);
    }
  });

  useEffect(() => {
    if (result.data) {
      //console.log('login succes, data:', result.data.login.user);
      console.log('login success!!!');
      const user = result.data.login.user;
      const token = result.data.login.token.value;
      console.log(user, token);
      const payload = { isLoggedIn: true, user: user, token: token };

      dispatcher(setAccount(payload));
      //dispatch(setToken(token));
      //navigate('/');
    }
  }, [result.data]);

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(t('errors.notEmailError')) //
            .max(255, t('errors.emailMaxLengthError', { length: 255 }))
            .required(t('errors.requiredEmailError')),
          password: Yup.string()
            .max(50, t('errors.passwordMaxLengthError', { length: 50 }))
            .required(t('errors.requiredPasswordError'))
        })}
        // eslint-disable-next-line no-unused-vars
        onSubmit={ async (values, { setErrors, setStatus, setSubmitting }) => {
          //console.log('email', values.email, 'password', values.password, 'checked', values.checked);

          try {
            await login({ variables: { email: values.email, password: values.password } });
          } catch(e) {
            console.log('error:::', e);
          }

          if (error) {
            //console.log(error);
            setStatus({ success: false });
            setErrors({ submit: error });
            setSubmitting(false);
            setError(null);
          }

          //setStatus({ success: false });
          //setErrors({ submit: 'testinggg' });
          //setSubmitting(false);
          /*
          try {
            axios
              .post( configData.API_SERVER + 'users/login', {
                password: values.password,
                email: values.email
              })
              .then(function (response) {
                if (response.data.success) {
                  console.log(response.data);
                  dispatcher({
                    type: ACCOUNT_INITIALIZE,
                    payload: { isLoggedIn: true, user: response.data.user, token: response.data.token }
                  });
                  if (scriptedRef.current) {
                    setStatus({ success: true });
                    setSubmitting(false);
                  }
                } else {
                  setStatus({ success: false });
                  setErrors({ submit: response.data.msg });
                  setSubmitting(false);
                }
              })
              .catch(function (error) {
                setStatus({ success: false });
                setErrors({ submit: error.response.data.msg });
                setSubmitting(false);
              });
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
          */





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
                {t('misc.passwordsForgot')}
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

export default RestLogin;

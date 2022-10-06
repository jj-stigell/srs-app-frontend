import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

//import configData from '../../../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
//import axios from 'axios';

// project imports
//import useScriptRef from '../../../../hooks/useScriptRef';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';
import { REGISTER } from '../../../../queries/mutations';

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

//===========================|| API JWT - REGISTER ||===========================//

const RegisterForm = ({ ...others }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  //let history = useHistory();
  //const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassConf, setShowPassConf] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState('');

  // eslint-disable-next-line no-unused-vars
  const [ register, result ] = useMutation(REGISTER, {
    onError: (error) => {
      console.log(error);
    }
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(t('errors.notEmailError'))
            .max(255, t('errors.emailMaxLengthError', { length: 255 }))
            .required(t('errors.requiredEmailError')),
          username: Yup.string()
            .max(14, t('errors.usernameMaxLengthError', { length: 14 }))
            .min(1, t('errors.usernameMinLengthError', { length: 1 }))
            .required(t('errors.requiredUsernameError')),
          password: Yup.string()
            .max(50, t('errors.passwordMaxLengthError', { length: 50 }))
            .min(8, t('errors.passwordMinLengthError', { length: 8 }))
            .required(t('errors.requiredPasswordError')),
          passwordConfirmation: Yup.string()
            .max(50, t('errors.passwordMaxLengthError', { length: 50 }))
            .min(8, t('errors.passwordMinLengthError', { length: 8 }))
            .oneOf([Yup.ref('password'), null], t('errors.passwordMismatchError'))
            .required(t('errors.requiredPasswordConfirmError'))
        })}
        // eslint-disable-next-line no-unused-vars
        onSubmit={ async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            const res = await register({ variables: {
              username: values.username,
              email: values.email,
              password: values.password,
              passwordConfirmation: values.passwordConfirmation
            } });
            const data = res.data.createAccount;
            console.log(data);

            switch(data.__typename) {
            case 'Error': {
              setStatus({ success: false });
              setErrors({ submit: t(`errors.${data.errorCode}`) });
              setSubmitting(false);
              break;
            }
            case 'Account': {
              resetForm({ values: '' });
              setStatus({ success: false });
              setErrors({ submit: t('register.success', { email: data.email }) });
              setSubmitting(false);
              break;
            }
            default: {
              setStatus({ success: false });
              setErrors({ submit: t('errors.connectionError') });
              setSubmitting(false);
            }
            }
          } catch(e) {
            console.log('error:::', e);
            setStatus({ success: false });
            setErrors({ submit: t('errors.connectionError') });
            setSubmitting(false);
          }
          /*
          try {
            axios
              .post( configData.API_SERVER + 'users/register', {
                username: values.username,
                password: values.password,
                email: values.email
              })
              .then(function (response) {
                if (response.data.success) {
                  history.push('/login');
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
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('misc.username')}
                  margin="normal"
                  name="username"
                  id="username"
                  type="text"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={classes.loginInput}
                  error={touched.username && Boolean(errors.username)}
                />
                {touched.username && errors.username && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.username}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
              <InputLabel htmlFor="outlined-adornment-email-register">{t('misc.email')}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {' '}
                  {errors.email}{' '}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} className={classes.loginInput}>
              <InputLabel htmlFor="outlined-adornment-password-register">{t('misc.password')}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)} className={classes.loginInput}>
              <InputLabel htmlFor="outlined-adornment-password-confirmation-register">{t('misc.passwordConfirm')}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-confirmation-register"
                type={showPassConf ? 'text' : 'password'}
                value={values.passwordConfirmation}
                name="passwordConfirmation"
                label="passwordConfirmation"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassConf(!showPassConf)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassConf ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
              {touched.passwordConfirmation && errors.passwordConfirmation && (
                <FormHelperText error id="standard-weight-helper-text-password-confirmation-register">
                  {errors.passwordConfirmation}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box
                  sx={{
                    mb: 2
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        backgroundColor={level.color}
                        sx={{
                          width: 85,
                          height: 8,
                          borderRadius: '7px'
                        }}
                      ></Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="subtitle1">
                      {t('register.agreeWith')} &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        {t('register.TOS')}
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
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
                  {t('register.registerButton')}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default RegisterForm;

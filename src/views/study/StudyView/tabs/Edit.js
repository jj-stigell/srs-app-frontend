/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { TextField, Button, FormControl } from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import { useTranslation } from 'react-i18next';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link, redirect, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { constants } from '../../../../utils/constants';

// material-ui
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery
} from '@material-ui/core';

// project imports
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';
import { REGISTER } from '../../../../queries/mutations';
import { setRegister } from '../../../../store/registerReducer';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// style constant
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  },
}));

const Edit = ({ cardId, accountCard }) => {
  const classes = useStyles();
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  const [story, setStory] = React.useState(accountCard?.accountStory ? accountCard.accountStory : '');
  const [hint, setHint] = React.useState(accountCard?.accountHint ? accountCard.accountStory : '');
  const [storyError, setStoryError] = React.useState(false);
  const [hintError, setHintError] = React.useState(false);
  const [storyErrorMessage, setStoryErrorMessage] = React.useState('');
  const [hintErrorMessage, setHintErrorMessage] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(story, hint);
  };

  const editStory = (event) => {
    setStory(event.target.value);
    if (event.target.value.length > constants.card.storyMaxLength) {
      setDisableSubmit(true);
      setStoryError(true);
      setStoryErrorMessage(t('errors.storyTooLongError', { length: constants.card.storyMaxLength }));
    } else if (event.target.value.length < constants.card.storyMinLength) {
      setDisableSubmit(true);
      setStoryError(true);
      setStoryErrorMessage(t('errors.storyTooShortError', { length: constants.card.storyMinLength }));
    } else {
      setStoryErrorMessage('');
      setStoryError(false);
      setDisableSubmit(false);
    }
  };

  const editHint = (event) => {
    setHint(event.target.value);
    if (event.target.value.length > constants.card.hintMaxLength) {
      setDisableSubmit(true);
      setHintError(true);
      setHintErrorMessage(t('errors.hintTooLongError', { length: constants.card.hintMaxLength }));
    } else if (event.target.value.length < constants.card.hintMinLength) {
      setDisableSubmit(true);
      setHintError(true);
      setHintErrorMessage(t('errors.hintTooShortError', { length: constants.card.hintMinLength }));
    } else {
      setHintErrorMessage('');
      setHintError(false);
      setDisableSubmit(false);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>{t('card.accountCard.editTitle')}</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit}>
          <FormControl style={{ width: '90%', margin: '10px' }} variant="filled" margin="dense">
            <TextField
              error={storyError}
              label={t('card.accountCard.accountStory')}
              value={story}
              onChange={(event) => editStory(event)}
              placeholder={t('card.accountCard.storyPlaceholder')}
              helperText={storyErrorMessage}
            />
          </FormControl>
          <FormControl style={{ width: '90%', margin: '10px' }} variant="filled" margin="dense">
            <TextField
              error={hintError}
              label={t('card.accountCard.accountHint')}
              value={hint}
              onChange={(event) => editHint(event)}
              placeholder={t('card.accountCard.hintPlaceholder')}
              helperText={hintErrorMessage}
            />
          </FormControl>
          <Button
            sx={{ m: 2 }}
            disabled={disableSubmit}
            onClick={handleSubmit} variant="outlined" startIcon={<UpdateIcon />}>
            {t('buttonGeneral.update')}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Edit;

/*
<Button
sx={{ m: 2 }}
disabled={disableSubmit}
onClick={() => updateSettings()} variant="outlined" startIcon={<UpdateIcon />}>
{t('buttonGeneral.update')}
</Button>
*/

/*
    <>
      <h2 style={{ textAlign: 'center' }}>Edit customized card data</h2>

    </>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth variant="filled" margin="dense">
            <TextField
              label="Account custom story"
              value={story}
              onChange={(event) => {
                setStory(event.target.value);
                setDisableSubmit(false);
              }}
              placeholder="Enter your story here"
            />
          </FormControl>
          <FormControl fullWidth variant="filled" margin="dense">
            <TextField
              label="Account custom hint"
              value={hint}
              onChange={(event) => {
                setHint(event.target.value);
                setDisableSubmit(false);
              }}
              placeholder="Enter your hint here"
            />
            <TextField
              error
              id="outlined-error-helper-text"
              label="Error"
              defaultValue="Hello World"
              helperText="Incorrect entry."
            />
          </FormControl>
          <Button
            sx={{ m: 2 }}
            disabled={disableSubmit}
            onClick={handleSubmit} variant="outlined" startIcon={<UpdateIcon />}>
            Update
          </Button>
        </form>
      </div>

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
            .email(t('errors.notValidEmailError'))
            .max(constants.account.emailMaxLength, t('errors.emailMaxLengthError', { length: constants.account.emailMaxLength }))
            .required(t('errors.requiredEmailError')),
          username: Yup.string()
            .max(constants.account.usernameMaxLength, t('errors.usernameMaxLengthError', { length: constants.account.usernameMaxLength }))
            .min(constants.account.usernameMinLength, t('errors.usernameMinLengthError', { length: constants.account.usernameMinLength }))
            .required(t('errors.requiredUsernameError')),
          password: Yup.string()
            .max(constants.account.passwordMaxLength, t('errors.passwordMaxLengthError', { length: constants.account.passwordMaxLength }))
            .min(constants.account.passwordMinLength, t('errors.passwordMinLengthError', { length: constants.account.passwordMinLength }))
            .matches(constants.regex.lowercaseRegex, t('errors.passwordLowercaseError'))
            .matches(constants.regex.uppercaseRegex, t('errors.passwordUppercaseError'))
            .matches(constants.regex.numberRegex, t('errors.passwordNumberError'))
            .required(t('errors.requiredPasswordError')),
          passwordConfirmation: Yup.string()
            .max(constants.account.passwordMaxLength, t('errors.passwordMaxLengthError', { length: constants.account.passwordMaxLength }))
            .min(constants.account.passwordMinLength, t('errors.passwordMinLengthError', { length: constants.account.passwordMinLength }))
            .matches(constants.regex.lowercaseRegex, t('errors.passwordLowercaseError'))
            .matches(constants.regex.uppercaseRegex, t('errors.passwordUppercaseError'))
            .matches(constants.regex.numberRegex, t('errors.passwordNumberError'))
            .oneOf([Yup.ref('password'), null], t('errors.passwordMismatchError'))
            .required(t('errors.requiredPasswordConfirmError'))
        })}
        onSubmit={ async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          if (!tosChecked) {
            setStatus({ success: false });
            setErrors({ submit: t('errors.tosNotChecked') });
            setSubmitting(false);
          } else {
            try {
              const res = await register({ variables: {
                username: values.username,
                email: values.email,
                password: values.password,
                passwordConfirmation: values.passwordConfirmation
              } });
              if (res.errors) {
                const error = res.errors.graphQLErrors[0].extensions.code;
                console.log(error);
                setStatus({ success: false });
                setErrors({ submit: t(`errors.${error}`) });
                setSubmitting(false);
              } else if (res.data) {
                const account = res.data.createAccount;
                console.log(account);
                resetForm({ values: '' });
                dispatcher(setRegister({ registered: true, email: account.email }));
              }
            } catch(error) {
              console.log('error:::', error);
              setStatus({ success: false });
              setErrors({ submit: t('errors.connectionError') });
              setSubmitting(false);
            }
          }
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
                        {t(`passwordStrength.${level.label}`)}
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
                      checked={tosChecked}
                      onChange={(event) => setTosChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="subtitle1">
                      {t('register.agreeWith')} &nbsp;
                      <Typography
                        variant="subtitle1"
                        component={Link}
                        to="/tos"
                      >
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

            <Formik
        initialValues={{
          story: '',
          hint: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          story: Yup.string()
            .max(constants.card.storyMaxLength, t('errors.storyTooLongError', { length: constants.card.storyMaxLength }))
            .min(constants.card.storyMinLength, t('errors.storyTooShortError', { length: constants.card.storyMinLength })),
          hint: Yup.string()
            .max(constants.card.hintMaxLength, t('errors.hintTooLongError', { length: constants.card.hintMaxLength }))
            .min(constants.card.hintMinLength, t('errors.hintTooShortError', { length: constants.card.hintMinLength })),
        })}
        onSubmit={ async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {

          try {
            const res = 0;
            /*
            const res = await register({ variables: {
              username: values.username,
              email: values.email,
              password: values.password,
              passwordConfirmation: values.passwordConfirmation
            } });

              "card": {
    "accountCard": {
      "accountStory": "Account custom story",
      "accountHint": "Account custom hint"
    }

    if (res.errors) {
      //const error = res.errors.graphQLErrors[0].extensions.code;
      //console.log(error);
      setStatus({ success: false });
      //setErrors({ submit: t(`errors.${error}`) });
      setErrors({ submit: t('errors.connectionError') });
      setSubmitting(false);
    } else if (res.data) {
      const account = res.data.createAccount;
      console.log(account);
      resetForm({ values: '' });
      //dispatcher(setRegister({ registered: true, email: account.email }));
      //          <form noValidate onSubmit={handleSubmit} {...others}>
    }
  } catch(error) {
    console.log('error:', error);
    setStatus({ success: false });
    setErrors({ submit: t('errors.connectionError') });
    setSubmitting(false);
  }

}}
>
{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
  <form noValidate onSubmit={handleSubmit}>
    <Grid container spacing={matchDownSM ? 0 : 2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={t('card.accountCard.accountStory')}
          margin="normal"
          name="story"
          id="story"
          type="text"
          value={values.story}
          onBlur={handleBlur}
          onChange={handleChange}
          className={classes.loginInput}
          error={touched.story && Boolean(errors.story)}
        />
        {touched.story && errors.story && (
          <FormHelperText error id="standard-weight-helper-text--register">
            {errors.story}
          </FormHelperText>
        )}
      </Grid>
    </Grid>
    <FormControl fullWidth error={Boolean(touched.hint && errors.hint)} className={classes.loginInput}>
      <InputLabel htmlFor="outlined-adornment-email-register">{t('card.accountCard.accountStory')}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-email-register"
        type="text"
        value={values.hint}
        name="hint"
        onBlur={handleBlur}
        onChange={handleChange}
        inputProps={{
          classes: {
            notchedOutline: classes.notchedOutline
          }
        }}
      />
      {touched.hint && errors.hint && (
        <FormHelperText error id="standard-weight-helper-text--register">
          {' '}
          {errors.hint}{' '}
        </FormHelperText>
      )}
    </FormControl>
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
          {t('buttonGeneral.update')}
        </Button>
      </AnimateButton>
    </Box>
  </form>
)}
</Formik>
*/



/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import React, { useEffect } from 'react';
import { Link, redirect, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { constants } from '../../../../utils/constants';

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

const VerificationForm = ({ ...others }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  //const history = useHistory();
  //const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassConf, setShowPassConf] = React.useState(false);
  const [tosChecked, setTosChecked] = React.useState(false);
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
            .email(t('errors.notValidEmailError'))
            .max(constants.account.emailMaxLength, t('errors.emailMaxLengthError', { length: constants.account.emailMaxLength }))
            .required(t('errors.requiredEmailError'))
        })}
        onSubmit={ async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            console.log('clicked, email:', values.email);
            /*
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
            */
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
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('misc.email')}
                  margin="normal"
                  name="email"
                  id="email"
                  type="text"
                  value={values.email}
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
                  {t('verify.resendVerifyButton')}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default VerificationForm;

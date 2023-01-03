/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLazyQuery, useMutation } from '@apollo/client';

// material-ui
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import { SESSIONS } from '../../queries/queries';
import { DELETE_SESSION, CHANGE_PASSWORD } from '../../queries/mutations';
import { setSessions, removeSession, logOutAccount } from '../../store/accountReducer';
import { formatDate } from '../../utils/formatDate';
import AnimateButton from '../../ui-component/extended/AnimateButton';
import { constants } from '../../utils/constants';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


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


//==============================|| ACCOUNT PAGE ||==============================//

const AccountPage = () => {
  const classes = useStyles();
  const account = useSelector(state => state.account);
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showNewPassConf, setNewPassConf] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState(false);
  let allowDelete = false;

  // GraphQL
  const [ sessions ] = useLazyQuery(SESSIONS);
  const [ delSession ] = useMutation(DELETE_SESSION, {
    onError: (error) => {
      console.log(error);
    }
  });
  const [ changePassword ] = useMutation(CHANGE_PASSWORD, {
    onError: (error) => {
      console.log(error);
    }
  });

  const fetchSessions = async () => {
    setSubmitting(true);
    try {
      const res = await sessions();
      if (res.errors) {
        const error = res.errors.graphQLErrors[0].extensions.code;
        console.log(error);
      } else if (res.data) {
        dispatcher(setSessions(res.data.sessions));
      }
    } catch(error) {
      console.log('error:', error);
    }
    setSubmitting(false);
  };

  const deleteSession = async (id) => {
    setSubmitting(true);
    if (id === account.session && !allowDelete) {
      setModal(true);
    } else {
      try {
        const res = await delSession({
          variables: {
            sessionId: id
          }
        });
        if (res.errors) {
          const error = res.errors.graphQLErrors[0].extensions.code;
          console.log(error);
        } else if (res.data) {
          dispatcher(removeSession(res.data.deleteSession));
          if (res.data.deleteSession === account.session) {
            dispatcher(logOutAccount());
          } else {
            setSubmitting(false);
          }
        }
      } catch(error) {
        console.log('error:', error);
      }
    }
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h2>{t('accountPage.title')}</h2>
      <h2>{t('accountPage.changePasswordTitle')}</h2>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          newPasswordConfirmation: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          currentPassword: Yup.string()
            .max(constants.account.passwordMaxLength, t('errors.passwordMaxLengthError', { length: constants.account.passwordMaxLength }))
            .required(t('errors.requiredPasswordError')),
          newPassword: Yup.string()
            .max(constants.account.passwordMaxLength, t('errors.passwordMaxLengthError', { length: constants.account.passwordMaxLength }))
            .min(constants.account.passwordMinLength, t('errors.passwordMinLengthError', { length: constants.account.passwordMinLength }))
            .matches(constants.regex.lowercaseRegex, t('errors.passwordLowercaseError'))
            .matches(constants.regex.uppercaseRegex, t('errors.passwordUppercaseError'))
            .matches(constants.regex.numberRegex, t('errors.passwordNumberError'))
            .required(t('errors.requiredPasswordError')),
          newPasswordConfirmation: Yup.string()
            .max(constants.account.passwordMaxLength, t('errors.passwordMaxLengthError', { length: constants.account.passwordMaxLength }))
            .min(constants.account.passwordMinLength, t('errors.passwordMinLengthError', { length: constants.account.passwordMinLength }))
            .matches(constants.regex.lowercaseRegex, t('errors.passwordLowercaseError'))
            .matches(constants.regex.uppercaseRegex, t('errors.passwordUppercaseError'))
            .matches(constants.regex.numberRegex, t('errors.passwordNumberError'))
            .oneOf([Yup.ref('newPassword'), null], t('errors.passwordMismatchError'))
            .required(t('errors.requiredPasswordConfirmError'))
        })}
        onSubmit={ async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const res = await changePassword({
              variables: {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
                newPasswordConfirmation: values.newPasswordConfirmation
              }
            });
            if (res.errors) {
              const error = res.errors.graphQLErrors[0].extensions.code;
              setStatus({ success: false });
              setErrors({ submit: t(`errors.${error}`) });
              setSubmitting(false);
            } else if (res.data) {





              console.log(res.data);





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
            <FormControl fullWidth error={Boolean(touched.currentPassword && errors.currentPassword)} className={classes.loginInput}>
              <InputLabel htmlFor="outlined-adornment-current-password">{t('misc.currentPassword')}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-current-password"
                type={showPassword ? 'text' : 'password'}
                value={values.currentPassword}
                name="currentPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={handleMouseDown}
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
                <FormHelperText error id="standard-weight-helper-text-password">
                  {' '}
                  {errors.currentPassword}{' '}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.newPassword && errors.newPassword)} className={classes.loginInput}>
              <InputLabel htmlFor="outlined-adornment-new-password">{t('misc.newPassword')}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-new-password"
                type={showNewPass ? 'text' : 'password'}
                value={values.newPassword}
                name="newPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowNewPass(!showNewPass)}
                      onMouseDown={handleMouseDown}
                      edge="end"
                    >
                      {showNewPass ? <Visibility /> : <VisibilityOff />}
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
              {touched.newPassword && errors.newPassword && (
                <FormHelperText error id="standard-weight-helper-text-password">
                  {' '}
                  {errors.newPassword}{' '}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.newPasswordConfirmation && errors.newPasswordConfirmation)} className={classes.loginInput}>
              <InputLabel htmlFor="outlined-adornment-new-password-confirm">{t('misc.confirmNewPassword')}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-new-password-confirm"
                type={showNewPassConf ? 'text' : 'password'}
                value={values.newPasswordConfirmation}
                name="newPasswordConfirmation"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setNewPassConf(!showNewPassConf)}
                      onMouseDown={handleMouseDown}
                      edge="end"
                    >
                      {showNewPassConf ? <Visibility /> : <VisibilityOff />}
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
              {touched.newPasswordConfirmation && errors.newPasswordConfirmation && (
                <FormHelperText error id="standard-weight-helper-text-password">
                  {' '}
                  {errors.newPasswordConfirmation}{' '}
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
                  {t('accountPage.changePasswordButton')}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      <h2>{t('accountPage.sessionsTitle')}</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('session.id')}</TableCell>
              <TableCell>{t('session.browser')}</TableCell>
              <TableCell>{t('session.device')}</TableCell>
              <TableCell>{t('session.createdAt')}</TableCell>
              <TableCell>{t('session.expireAt')}</TableCell>
              <TableCell>{t('session.delete')}</TableCell>
            </TableRow>
          </TableHead>
          {!account.sessions ?
            <></>
            :
            <TableBody>
              {account.sessions.map((session) => (
                <TableRow
                  key={session.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {account.session === session.id ?
                      <b>{session.id} {t('session.current')}</b> : session.id}
                  </TableCell>
                  <TableCell>{session.browser}</TableCell>
                  <TableCell>{session.device}</TableCell>
                  <TableCell>{formatDate(session.createdAt)}</TableCell>
                  <TableCell>{formatDate(session.expireAt)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteSession(session.id)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          }
        </Table>
      </TableContainer>
      <Button
        disabled={submitting}
        onClick={fetchSessions}
        size="small"
        type="submit"
        variant="contained"
        color="secondary"
      >
        {t('accountPage.fetchSessionsButton')}
      </Button>
      <>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t('misc.warning')}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {t('session.sessionWarning')}
            </Typography>
            <Button onClick={() => {
              allowDelete = true;
              deleteSession(account.session);
            }} variant="outlined" startIcon={<DeleteIcon />}>
              {t('buttonGeneral.delete')}
            </Button>
            <Button onClick={() => {
              setModal(false);
              setSubmitting(false);
            }} variant="contained" endIcon={<CancelIcon />}>
              {t('buttonGeneral.cancel')}
            </Button>
          </Box>
        </Modal>
      </>
    </>
  );
};

export default AccountPage;

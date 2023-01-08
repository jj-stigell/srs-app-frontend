import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: theme.palette.primary.light
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

const LoadingPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} />
      <p>{t('review.loadingMessage')}</p>
    </div>
  );
};

export default LoadingPage;

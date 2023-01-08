import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

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

const ReviewFinished = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      history.push('/dashboard');
    }, 5000);
  }, [history]);

  return (
    <div className={classes.root}>
      <p>{t('review.reviewFinished')}</p>
    </div>
  );
};

export default ReviewFinished;

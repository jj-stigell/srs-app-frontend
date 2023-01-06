import React from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import { Typography, Grid } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import logo from './neko.png';

//==============================|| SAMPLE PAGE ||==============================//

const UnderConstruction = () => {


  const { t } = useTranslation();


  return (
    <MainCard title={t('construction.title')}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="body2">
            {t('construction.body1')}
            <br /><br />
            {t('construction.body2')}
            <br /><br />
            {t('construction.body3')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={logo} alt="under_construction" />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default UnderConstruction;


/*

*/
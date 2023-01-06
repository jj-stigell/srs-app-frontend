/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import EarningCard from './EarningCard';
//import DeckCard from '../../study/DeckCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import LearningProgressDonutChart from './LearningProgressDonutChart';
import { gridSpacing } from './../../../store/constant';
import ReviewHistoryHeatmap from './ReviewHistoryHeatmap';

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

import ReactTooltip from 'react-tooltip';


//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  /*
            <DeckCard isLoading={isLoading} />

                <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>

          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={7}>
            <LearningProgressDonutChart isLoading={isLoading} cardType='kanji' />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
*/

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={10}>
            <ReviewHistoryHeatmap isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={7}>
            <LearningProgressDonutChart isLoading={isLoading} cardType='kanji' />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

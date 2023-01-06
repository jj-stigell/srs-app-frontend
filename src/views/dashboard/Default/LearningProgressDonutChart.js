/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import { Grid, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';

// third-party
import Chart from 'react-apexcharts';
import { useLazyQuery } from '@apollo/client';

// project imports
import LearningProgressDonutChartSkeleton from '../../../ui-component/cards/Skeleton/LearningProgressDonutChartSkeleton';
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import { GET_LEARNING_STATS_BY_TYPE } from '../../../queries/queries';

//-----------------------|| DASHBOARD DONUT CHART LEARNING PROGRESS ||-----------------------//

const LearningProgressDonutChart = ({ isLoading, cardType }) => {
  const [ recallType, setRecallType ] = useState('RECALL');
  const [ stats, setStats ] = useState([0, 0, 0]);
  const theme = useTheme();
  const { t } = useTranslation();
  const [ statsByType ] = useLazyQuery(GET_LEARNING_STATS_BY_TYPE);


  const status = [
    {
      value: 'RECALL',
      label: t('stats.labels.recall')
    },
    {
      value: 'RECOGNISE',
      label: t('stats.labels.recognise')
    }
  ];

  const chartData = {
    series: [44, 55, 18],
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    },
    options: {
      labels: [ t('stats.labels.new'), t('stats.labels.learning'), t('stats.labels.matured') ],
      colors: ['#ff0000', '#ffb84d', '#33cc33'],
      chart: {
        width: 380,
        type: 'donut',
      },
      dataLabels: {
        enabled: false
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      }],
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
        // eslint-disable-next-line quotes
        fontFamily: `'Roboto', sans-serif`
      }
    },
  };

  const fetchStats = async () => {
    try {
      const res = await statsByType({
        variables: {
          cardType: cardType.toUpperCase(),
          reviewType: recallType
        }
      });
      if (res.errors) {
        const error = res.errors.graphQLErrors[0].extensions.code;
        console.log(error);
      } else if (res.data) {
        return res.data.learningStatisticsByType;
        //dispatcher(setDecks(res.data.decks));
      }
    } catch(error) {
      console.log('error:', error);
    }
  };

  useEffect( async () => {
    const statss = await fetchStats();
    setStats([statss.new, statss.learning, statss.matured]);
  }, [recallType]);

  return (
    <React.Fragment>
      {isLoading ? (
        <LearningProgressDonutChartSkeleton />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={10}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h3">{t(`stats.${cardType}.title`)}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <TextField
                    id="review-type-selector"
                    select
                    value={recallType}
                    onChange={(e) => setRecallType(e.target.value)}
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Chart options={chartData.options} series={stats} type="donut" width="300" />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </React.Fragment>
  );
};

LearningProgressDonutChart.propTypes = {
  isLoading: PropTypes.bool
};

export default LearningProgressDonutChart;

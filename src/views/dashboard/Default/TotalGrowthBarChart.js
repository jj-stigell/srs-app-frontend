/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import { Grid, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import { useLazyQuery } from '@apollo/client';

// project imports
import SkeletonTotalGrowthBarChart from './../../../ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';
import { GET_LEARNING_STATS_BY_TYPE } from '../../../queries/queries';

//-----------------------|| DASHBOARD DONUT CHART LEARNING PROGRESS ||-----------------------//

const TotalGrowthBarChart = ({ isLoading, cardType = 'kanji' }) => {
  const [recallType, setRecallType] = useState('RECALL');
  const [stats, setStats] = useState([0, 0, 0]);
  const theme = useTheme();
  const { t } = useTranslation();

  const primary = theme.palette.text.primary;
  const grey200 = theme.palette.grey[200];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;
  const grey500 = theme.palette.grey[500];


  const status = [
    {
      value: 'RECALL',
      label: 'Recall'
    },
    {
      value: 'RECOGNISE',
      label: 'Recognise'
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
      //labels: [ t('statistics.labels.new'), t('statistics.labels.learning'), t('statistics.labels.matured') ],
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


  const [ statsByType ] = useLazyQuery(GET_LEARNING_STATS_BY_TYPE);

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

        console.log(res.data.learningStatisticsByType);

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

    /*

  "statistics:": {
    "titles": {
      "kanji": "Kanji learning progress"
    },
    "labels": {
      "new": "New",
      "learning": "Learning",
      "matured": "Matured"
    }
  },

  query LearningStatisticsByType($cardType: CardType!, $reviewType: ReviewType!) {
  learningStatisticsByType(cardType: $cardType, reviewType: $reviewType) {
    matured
    learning
    new
  }
}

    const newChartData = {
      ...chartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };
              <Chart {...chartData} />
    options={this.state.options} series={this.state.series} type="donut" width="380" />

    {t('deck.settings.dayoff')}
    */

    /*
  learningStatisticsByType(cardType: $cardType, reviewType: $reviewType) {
    matured
    learning
    new
  }
    */

    // do not load chart when loading
    if (!isLoading) {
      // eslint-disable-next-line quotes
      //ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
      //ApexCharts.exec('donut', 'updateOptions', newChartData);
    }
  }, [primary200, primaryDark, secondaryMain, secondaryLight, primary, grey200, isLoading, recallType, grey500]);

  const falsee = false;


  return (
    <React.Fragment>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={10}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h3">{t(`statistics.${cardType}.title`)}</Typography>
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

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;

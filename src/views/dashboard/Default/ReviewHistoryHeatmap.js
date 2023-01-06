import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import { Grid, Typography } from '@material-ui/core';

// third-party
import { useLazyQuery } from '@apollo/client';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';

// project imports
import LearningProgressDonutChartSkeleton from '../../../ui-component/cards/Skeleton/LearningProgressDonutChartSkeleton';
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import { GET_REVIEW_HISTORY } from '../../../queries/queries';

//-----------------------|| DASHBOARD DONUT CHART LEARNING PROGRESS ||-----------------------//

const ReviewHistoryHeatmap = ({ isLoading }) => {
  const { t } = useTranslation();
  const [ reviewHistory ] = useLazyQuery(GET_REVIEW_HISTORY);
  const [stats, setStats] = useState([
    { date: '2022-12-01', count: 5 },
    { date: '2022-12-22', count: 25 },
    { date: '2022-12-30', count: 78 },
    { date: '2022-11-30', count: 142 }
  ]);
  const today = new Date('2023-02-01');
  const firstDayFromHistory = new Date(today);
  firstDayFromHistory.setDate(firstDayFromHistory.getDate() - 150);

  const fetchStats = async () => {
    try {
      const res = await reviewHistory({
        variables: {
          limitReviews: 365
        }
      });
      if (res.errors) {
        const error = res.errors.graphQLErrors[0].extensions.code;
        console.log(error);
      } else if (res.data) {
        setStats(res.data.reviewHistory);
      }
    } catch(error) {
      console.log('error:', error);
    }
  };

  useEffect( async () => {
    await fetchStats();
  }, []);

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
                      <Typography variant="h3">{t('stats.heatmap.title')}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <CalendarHeatmap
                  startDate={firstDayFromHistory}
                  endDate={today}
                  values={stats}
                  tooltipDataAttrs={value => {
                    if (!value.count) {
                      return {
                        'data-tip': t('stats.heatmap.hoverDataNoReviews'),
                      };
                    }
                    return {
                      'data-tip': t('stats.heatmap.hoverData', { date: value.date, count: value.count }),
                    };
                  }}
                  classForValue={value => {
                    if (!value || isNaN(value.count) || value.count === 0) return 'color-empty';
                    if (value.count > 0 && value.count < 10) {
                      return 'color-github-1';
                    } else if (value.count >= 10 && value.count < 50) {
                      return 'color-github-2';
                    } else if (value.count >= 50 && value.count < 100) {
                      return 'color-github-3';
                    } else {
                      return 'color-github-4';
                    }
                  }}
                />
                <ReactTooltip />
              </Grid>
            </Grid>
            <Grid item xs={10}>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </React.Fragment>
  );
};

ReviewHistoryHeatmap.propTypes = {
  isLoading: PropTypes.bool
};

export default ReviewHistoryHeatmap;

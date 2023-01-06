/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import {
  Grid,
  Table,
  TableBody,
  Typography,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  Checkbox,
  FormGroup,
  useTheme
} from '@material-ui/core';

// third-party
import Chart from 'react-apexcharts';
import { useLazyQuery } from '@apollo/client';

// project imports
import LearningProgressDonutChartSkeleton from '../../../ui-component/cards/Skeleton/LearningProgressDonutChartSkeleton';
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import { GET_DUE_COUNTS } from '../../../queries/queries';

//-----------------------|| DASHBOARD DUE COUNT LIST ||-----------------------//

const DueCountList = ({ isLoading }) => {
  const [ filterDues, setFilterDues ] = useState(false);
  const [ stats, setStats ] = useState([]);
  const theme = useTheme();
  const { t } = useTranslation();
  const [ dueCounts ] = useLazyQuery(GET_DUE_COUNTS);

  const fetchDueCounts = async () => {
    try {
      const res = await dueCounts({
        variables: {
          limitReviews: 7,
          date: new Date()
        }
      });
      if (res.errors) {
        const error = res.errors.graphQLErrors[0].extensions.code;
        console.log(error);
      } else if (res.data) {
        setStats(res.data.dueCount);
      }
    } catch(error) {
      console.log('error:', error);
    }
  };

  useEffect( async () => {
    await fetchDueCounts();
  }, []);

  useEffect( () => {
    console.log('clickckckckck');
  }, [filterDues]);

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
                      <Typography variant="h3">{t('stats.dueCount.title')}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <FormGroup>
                    <FormControlLabel control={
                      <Checkbox
                        checked={filterDues}
                        onChange={e => {
                          setFilterDues(!filterDues);
                        }}
                      />} label={t('stats.dueCount.ShowOnlyDues')} />
                  </FormGroup>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 35 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('stats.dueCount.date')}</TableCell>
                      <TableCell align="right">{t('stats.dueCount.due')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.map((row) => (
                      <TableRow
                        key={row.date}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.date}</TableCell>
                        <TableCell align="right">{row.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </React.Fragment>
  );
};

DueCountList.propTypes = {
  isLoading: PropTypes.bool
};

export default DueCountList;

/*
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



import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels() {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
    </FormGroup>
  );
}


*/
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client';

// material-ui
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
  IconButton
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';




// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { SESSIONS } from '../../queries/queries';
import { setSessions } from '../../store/accountReducer';

//==============================|| ACCOUNT PAGE ||==============================//

const AccountPage = () => {
  const account = useSelector(state => state.account);
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [ fetSessions, { called, loading, data }] = useLazyQuery(SESSIONS);

  const fetchSessions = async () => {
    setSubmitting(true);
    try {
      const res = await fetSessions();
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

    console.log(account.session);

    console.log('deleteting session id:', id);
  };



  //console.log(account.sessions);

  //const x = [1,2,3,4,5,6,7,8];


  return (
    <>
      <MainCard title={t('accountPage.title')}>
        <Typography variant="body2">
                Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut
                enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue
                dolor in reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president,
                sunk in culpa qui officiate descent molls anim id est labours.
        </Typography>
      </MainCard>

      <h2>{t('accountPage.sessionsTitle')}</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('session.id')}</TableCell>
              <TableCell align="right">{t('session.browser')}</TableCell>
              <TableCell align="right">{t('session.os')}</TableCell>
              <TableCell align="right">{t('session.device')}</TableCell>
              <TableCell align="right">{t('session.createdAt')}</TableCell>
              <TableCell align="right">{t('session.expireAt')}</TableCell>
              <TableCell align="right">{t('session.delete')}</TableCell>
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
                    {session.id}
                  </TableCell>
                  <TableCell align="right">{session.browser}</TableCell>
                  <TableCell align="right">{session.os}</TableCell>
                  <TableCell align="right">{session.device}</TableCell>
                  <TableCell align="right">{session.createdAt}</TableCell>
                  <TableCell align="right">{session.expireAt}</TableCell>
                  <TableCell align="right">
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
    </>
  );
};

export default AccountPage;

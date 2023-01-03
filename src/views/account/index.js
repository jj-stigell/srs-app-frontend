/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLazyQuery, useMutation } from '@apollo/client';

// material-ui
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
  Box
} from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { SESSIONS } from '../../queries/queries';
import { DELETE_SESSION } from '../../queries/mutations';
import { setSessions, removeSession, logOutAccount } from '../../store/accountReducer';
import { formatDate } from '../../utils/formatDate';

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

//==============================|| ACCOUNT PAGE ||==============================//

const AccountPage = () => {
  const account = useSelector(state => state.account);
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  let allowDelete = false;
  const [modal, setModal] = useState(false);
  const [ sessions, { called, loading, data } ] = useLazyQuery(SESSIONS);

  const [ delSession, result ] = useMutation(DELETE_SESSION, {
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
          console.log(res.data);
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

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// material-ui
import UpdateIcon from '@material-ui/icons/Update';
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
  Modal,
  Box,
  TextField,
  Rating
} from '@material-ui/core';

// third party
import { useLazyQuery, useMutation } from '@apollo/client';

// project imports
import { GET_DECK_SETTINGS } from '../../queries/queries';
import { CHANGE_DECK_SETTINGS } from '../../queries/mutations';
import { constants } from '../../utils/constants';
import { addDeckSettingsToDeck, setDecks } from '../../store/deckReducer';
import InfoTooltip from './InfoTooltip';
import { notification } from '../../utils/notification';

const modalStyle = {
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

//==============================|| DECK SETTINGS MODAL ||==============================//

const SettingsModal = ({ modalStatus, setModal, deckId, deckSettings }) => {
  const decks = useSelector(state => state.decks);
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const [ getDeckSettings ] = useLazyQuery(GET_DECK_SETTINGS);
  const [ disableSubmit, setDisableSubmit ] = useState(true);
  const [ settingsData, setSettingsData ] = useState(deckSettings);
  const [ favorite, setFavorite ] = useState(0);
  const [ newReviews, setNewReviews ] = useState(constants.review.minNewReviews);
  const [ dueReviews, setDueReviews ] = useState(constants.review.minLimitReviews);
  const [ reviewInterval, setReviewInterval ] = useState(constants.review.minReviewInterval);

  const [ updateDeckSettings, result ] = useMutation(CHANGE_DECK_SETTINGS, {
    onError: (error) => {
      console.log(error);
    }
  });

  const updateNewReviews = (number) => {
    setDisableSubmit(false);
    if (number > constants.review.maxNewReviews) return setNewReviews(constants.review.maxNewReviews);
    if (number < constants.review.minNewReviews) return setNewReviews(constants.review.minNewReviews);
    setNewReviews(number);
  };

  const updateDueReviews = (number) => {
    setDisableSubmit(false);
    if (number > constants.review.maxLimitReviews) return setDueReviews(constants.review.maxLimitReviews);
    if (number < constants.review.minLimitReviews) return setDueReviews(constants.review.minLimitReviews);
    setDueReviews(number);
  };

  const updateReviewInterval = (number) => {
    setDisableSubmit(false);
    if (number > constants.review.maxReviewInterval) return setReviewInterval(constants.review.maxReviewInterval);
    if (number < constants.review.minReviewInterval) return setReviewInterval(constants.review.minReviewInterval);
    setReviewInterval(number);
  };

  const fetchDeckSettings = async () => {
    try {
      const res = await getDeckSettings({
        variables: {
          deckId: deckId
        }
      });
      if (res.errors) {
        const errors = res.errors.graphQLErrors[0].extensions.code;
        console.log(errors);
        errors.forEach(error => {
          notification({
            title: t('notification.error'),
            message: t(`errors.${error}`),
            type: 'danger'
          });
        });
      } else if (res.data) {
        setSettingsData(res.data.deckSettings);
        setFavorite(res.data.deckSettings.favorite === true ? 1 : 0 );
        setNewReviews(res.data.deckSettings.newCardsPerDay);
        setDueReviews(res.data.deckSettings.reviewsPerDay);
        setReviewInterval(res.data.deckSettings.reviewInterval);
        dispatcher(addDeckSettingsToDeck({ deckId: deckId, deckSettings: res.data.deckSettings, decks: decks }));
      }
    } catch(error) {
      console.log('error:', error);
    }
  };

  const updateSettings = async () => {
    try {
      const res = await updateDeckSettings({
        variables: {
          deckId: deckId,
          newCardsPerDay: Number(newReviews),
          reviewsPerDay: Number(dueReviews),
          reviewInterval: Number(reviewInterval),
          favorite: favorite === 1 ? true : false
        }
      });
      if (res.errors) {
        const errors = res.errors.graphQLErrors[0].extensions.code;
        console.log(errors);
        errors.forEach(error => {
          notification({
            title: t('notification.error'),
            message: t(`errors.${error}`),
            type: 'danger'
          });
        });
      } else if (res.data) {
        notification({
          title: t('notification.success'),
          message: t('deck.settings.settingsChangeSuccess'),
          type: 'success'
        });
        setDisableSubmit(true);
        dispatcher(addDeckSettingsToDeck({ deckId: deckId, deckSettings: settingsData, decks: decks }));
      }
    } catch(error) {
      console.log('error:', error);
    }
  };

  useEffect(async () => {
    if (!deckSettings) {
      await fetchDeckSettings();
    } else {
      setFavorite(deckSettings.favorite === true ? 1 : 0 );
      setNewReviews(deckSettings.newCardsPerDay);
      setDueReviews(deckSettings.reviewsPerDay);
      setReviewInterval(deckSettings.reviewInterval);
    }
  }, []);

  if (!deckSettings) return <></>;

  return (
    <Modal
      open={modalStatus}
      onClose={() => setModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h3" component="h2">
          {t('deck.settings.title')}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 30 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key='new-reviews-row'
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {t('deck.settings.newCardsPerDay')}
                  <InfoTooltip title={t('deck.settings.newCardsPerDayInfo', { minNewReviews: constants.review.minNewReviews, maxNewReviews: constants.review.maxNewReviews })}/>
                </TableCell>
                <TableCell align="right">
                  <Box component="form">
                    <TextField
                      id="new-reviews-input"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        width: 80
                      }}
                      onChange={(e) => updateNewReviews(e.target.value)}
                      value={newReviews}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow
                key='due-reviews-row'
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {t('deck.settings.reviewsPerDay')}
                  <InfoTooltip title={t('deck.settings.reviewsPerDayInfo',{ minLimitReviews: constants.review.minLimitReviews, maxLimitReviews: constants.review.maxLimitReviews })}/>
                </TableCell>
                <TableCell align="right">
                  <Box component="form">
                    <TextField
                      id="due-reviews-input"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        width: 80
                      }}
                      onChange={(e) => updateDueReviews(e.target.value)}
                      value={dueReviews}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow
                key='review-interval-row'
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {t('deck.settings.reviewInterval')}
                  <InfoTooltip title={t('deck.settings.reviewIntervalInfo', { minReviewInterval: constants.review.minReviewInterval, maxReviewInterval: constants.review.maxReviewInterval })}/>
                </TableCell>
                <TableCell align="right">
                  <Box component="form">
                    <TextField
                      id="review-interval-input"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        width: 80
                      }}
                      onChange={(e) => updateReviewInterval(e.target.value)}
                      value={reviewInterval}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow
                key='favorite-row'
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {t('deck.settings.favorite')}
                  <InfoTooltip title={t('deck.settings.favoriteInfo')}/>
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      '& > legend': { mt: 2 },
                    }}
                  >
                    <Rating
                      max={1}
                      name="simple-controlled"
                      value={favorite}
                      onChange={(event, newValue) => {
                        setFavorite(newValue);
                        setDisableSubmit(false);
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          sx={{ m: 2 }}
          disabled={disableSubmit}
          onClick={() => updateSettings()} variant="outlined" startIcon={<UpdateIcon />}>
          {t('buttonGeneral.update')}
        </Button>
        <Button
          sx={{ m: 2 }}
          onClick={() => {
            setModal(false);
            setDisableSubmit(false);
          }} variant="contained" endIcon={<CancelIcon />}>
          {t('buttonGeneral.close')}
        </Button>
      </Box>
    </Modal>
  );
};

export default SettingsModal;

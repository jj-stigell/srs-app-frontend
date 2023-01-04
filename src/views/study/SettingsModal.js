/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// material-ui
import { makeStyles } from '@material-ui/styles';
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
  IconButton,
  Modal,
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Switch
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'react-notifications-component/dist/theme.css';
import { Store } from 'react-notifications-component';
import { useLazyQuery, useMutation } from '@apollo/client';

// project imports
import { GET_DECK_SETTINGS, SESSIONS } from '../../queries/queries';
import { DELETE_SESSION, CHANGE_PASSWORD } from '../../queries/mutations';
import { setSessions, removeSession, logOutAccount } from '../../store/accountReducer';
import { formatDate } from '../../utils/formatDate';
import AnimateButton from '../../ui-component/extended/AnimateButton';
import { constants } from '../../utils/constants';
import { addDeckSettingsToDeck } from '../../store/deckReducer';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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


/*
/*
  /*
query Decks($date: Date!) {
  decks(date: $date) {
    id
    deckName
    subscriberOnly
    languageId
    active
    createdAt
    updatedAt
    deckTranslations {
      id
      languageId
      title
      description
      active
      createdAt
      updatedAt
    }
    accountDeckSettings {
      id
      accountId
      deckId
      favorite
      dueCards
      reviewInterval
      reviewsPerDay
      newCardsPerDay
      createdAt
      updatedAt
    }
  }
}

  "deck": {
    "settings": {
      "dayoff": "Day off",
      "settings": "Settings",
      "optimize": "Optimize"
    }
  },
*/


//==============================|| ACCOUNT PAGE ||==============================//

const SettingsModal = ({ modalStatus, setModal, deckId, deckSettings }) => {
  const account = useSelector(state => state.decks);
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  let allowDelete = false;
  const [ getDeckSettings ] = useLazyQuery(GET_DECK_SETTINGS);
  const [ settingsData, setSettingsData ] = useState(deckSettings);

  const decks = useSelector(state => state.decks);

  const fetchDecks = async () => {
    try {
      const res = await getDeckSettings({
        variables: {
          deckId: deckId
        }
      });
      if (res.errors) {
        const error = res.errors.graphQLErrors[0].extensions.code;
        console.log(error);
      } else if (res.data) {
        setSettingsData(res.data.deckSettings);
        dispatcher(addDeckSettingsToDeck({ deckId: deckId, deckSettings: settingsData, decks: decks }));
      }
    } catch(error) {
      console.log('error:', error);
    }
  };

  useEffect(async () => {
    //setLoading(true);
    if (!deckSettings) await fetchDecks();
    //setLoading(false);
  }, []);

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  console.log(settingsData);


  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  /*
accountId
createdAt
deckId
dueCards
favorite
id
newCardsPerDay
reviewInterval
reviewsPerDay
updatedAt

import * as React from 'react';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function BasicSwitches() {
  return (
    <div>
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Switch {...label} disabled defaultChecked />
      <Switch {...label} disabled />
    </div>
  );
}
  "deck": {
    "settings": {
      "favorite": "Favorite deck:",
      "newCardsPerDay": "New cards every day:",
      "reviewInterval": "Maximimum review interval:",
      "reviewsPerDay": "Maximum reviews per day:",

                  <br></br>

            favorite {t('deck.settings.favorite')}
            <br></br>

            newCardsPerDay {t('deck.settings.newCardsPerDay')}
            <br></br>

            reviewInterval {t('deck.settings.reviewInterval')}
            <br></br>
            reviewsPerDay {t('deck.settings.reviewsPerDay')}
  */

  if (!settingsData) {
    return  (
      <></>
    );
  }

  return (
    <>
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <br></br>
            {t('deck.settings.favorite')} {settingsData.favorite ? <>YES</> : <>NO</>}
            <br></br>
            {t('deck.settings.newCardsPerDay')} {settingsData.newCardsPerDay}
            <br></br>
            {t('deck.settings.reviewInterval')} {settingsData.reviewInterval}
            <br></br>
            {t('deck.settings.reviewsPerDay')} {settingsData.reviewsPerDay}
          </Typography>



          <Button
            sx={{ m: 2 }}
            disabled={true}
            onClick={() => {
              allowDelete = true;
              //deleteSession(account.session);
              setModal(false);
            }} variant="outlined" startIcon={<UpdateIcon />}>
            {t('buttonGeneral.update')}
          </Button>




          <Button
            sx={{ m: 2 }}
            onClick={() => {
              setModal(false);
            //setSubmitting(false);
            }} variant="contained" endIcon={<CancelIcon />}>
            {t('buttonGeneral.close')}
          </Button>




        </Box>
      </Modal>
    </>
  );
};

export default SettingsModal;

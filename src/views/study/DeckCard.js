/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, Menu, MenuItem, Typography, Button } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SettingsModal from './SettingsModal';
import SkeletonDeckCard from '../../ui-component/cards/Skeleton/DeckCard';
import { getTranslation } from '../../utils/languageFinder';
import { constants } from '../../utils/constants';

// assets
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import HotelTwoToneIcon from '@material-ui/icons/Hotel';
import SettingsTwoToneIcon from '@material-ui/icons/Settings';
import LowPriorityTwoToneIcon from '@material-ui/icons/LowPriority';

// style constant
const useStyles = makeStyles((theme) => ({
  card: {
    // Card background color
    //backgroundColor: theme.palette.secondary.dark,
    backgroundColor: '#64b5f6',
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    /*
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '210px',
      height: '210px',
      //background: theme.palette.secondary[800],
      background: '#fff',
      borderRadius: '50%',
      top: '-85px',
      right: '-95px',
      [theme.breakpoints.down('xs')]: {
        top: '-105px',
        right: '-140px'
      }
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '210px',
      height: '210px',
      // Corner ball color
      //background: theme.palette.secondary[800],
      background: '#fff',
      borderRadius: '50%',
      top: '-125px',
      right: '-15px',
      opacity: 0.5,
      [theme.breakpoints.down('xs')]: {
        top: '-155px',
        right: '-70px'
      }
    }*/
  },
  content: {
    padding: '20px !important'
  },
  avatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.largeAvatar,
    //backgroundColor: theme.palette.secondary[800],
    backgroundColor: theme.palette.secondary[800],
    marginTop: '8px'
  },
  // Pop up menu with sleep, settings and optimize buttons
  avatarRight: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    //backgroundColor: theme.palette.secondary.dark,
    backgroundColor: '#2286c3',
    // Color for 3 dots
    //color: theme.palette.secondary[200],
    color: '#e9eff5',
    zIndex: 1
  },
  cardHeading: {
    fontSize: '2.125rem',
    fontWeight: 500,
    marginRight: '8px',
    marginTop: '14px',
    marginBottom: '6px'
  },
  subHeading: {
    fontSize: '1rem',
    fontWeight: 500,
    //color: theme.palette.secondary[200]
  },
  avatarCircle: {
    cursor: 'pointer',
    ...theme.typography.smallAvatar,
    backgroundColor: theme.palette.secondary[200],
    color: theme.palette.secondary.dark
  },
  circleIcon: {
    transform: 'rotate3d(1, 1, 1, 45deg)'
  },
  menuItem: {
    marginRight: '14px',
    fontSize: '1.25rem'
  }
}));

//===========================|| DECK CARD ||===========================//

const DeckCard = ({ userLanguage, deck, isLoading }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const deckTranslationData = getTranslation(deck.deckTranslations, userLanguage);
  const [settingsModal, setSettingsModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    setSettingsModal(true);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <SkeletonDeckCard />
      ) : (
        <MainCard border={false} className={classes.card} contentClass={classes.content}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography className={classes.cardHeading}>{deckTranslationData.title}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Avatar
                    variant="rounded"
                    className={classes.avatarRight}
                    aria-controls="menu-earning-card"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreHorizIcon fontSize="inherit" />
                  </Avatar>
                  <Menu
                    id="menu-earning-card"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    variant="selectedMenu"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <HotelTwoToneIcon fontSize="inherit" className={classes.menuItem} />{t('deck.settings.dayoff')}
                    </MenuItem>
                    <MenuItem onClick={handleSettings}>
                      <SettingsTwoToneIcon fontSize="inherit" className={classes.menuItem} />{t('deck.settings.settings')}
                    </MenuItem>
                    <SettingsModal modalStatus={settingsModal} setModal={setSettingsModal} deckId={deck.id} deckSettings={deck.accountDeckSettings} />
                    <MenuItem onClick={handleClose}>
                      <LowPriorityTwoToneIcon fontSize="inherit" className={classes.menuItem} />{t('deck.settings.optimize')}
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
              <Grid item>
                <Typography className={classes.subHeading}>{deckTranslationData.description}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item sx={{ mb: 1.25 }}>
                  <Typography className={classes.subHeading}>
                    {deck.accountDeckSettings ?
                      <>{t('deck.dueAndNewCards', { old: deck.accountDeckSettings.dueCards, new: deck.accountDeckSettings.newCardsPerDay })}</>
                      :
                      <>{t('deck.onlyNewCards', { new: constants.review.defaultNewPerDay })}</>
                    }
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    disableElevation
                    variant='contained'
                    size="small"
                    //onClick={}
                  >
                    Study
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </React.Fragment>
  );
};

DeckCard.propTypes = {
  isLoading: PropTypes.bool
};

export default DeckCard;

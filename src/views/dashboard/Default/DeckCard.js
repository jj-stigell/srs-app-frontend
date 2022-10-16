import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, Menu, MenuItem, Typography, Button } from '@material-ui/core';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonEarningCard from '../../../ui-component/cards/Skeleton/EarningCard';

// assets
//import EarningIcon from './../../../assets/images/icons/earning.svg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
//import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
//import GetAppTwoToneIcon from '@material-ui/icons/GetAppOutlined';
//import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyOutlined';
//import PictureAsPdfTwoToneIcon from '@material-ui/icons/PictureAsPdfOutlined';
//import ArchiveTwoToneIcon from '@material-ui/icons/ArchiveOutlined';
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

const DeckCard = ({ isLoading }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard border={false} className={classes.card} contentClass={classes.content}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography className={classes.cardHeading}>JLPT N5</Typography>
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
                      <HotelTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Day off
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <SettingsTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Settings
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <LowPriorityTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Optimize
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
              <Grid item>
                <Typography className={classes.subHeading}>Kanji Recall</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item sx={{ mb: 1.25 }}>
                  <Typography className={classes.subHeading}>Cards due: 67 (20 new cards)</Typography>
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

import React from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, Stack } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/Logout';

// third party
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

// project imports
import { LOGOUT } from '../../queries/mutations';
import { logOutAccount } from '../../store/accountReducer';

//-----------------------|| LOGOUT BUTTON ||-----------------------//

const Logout = () => {
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const [ logout ] = useMutation(LOGOUT, {
    onError: (error) => {
      console.log(error);
    }
  });

  const handleLogOut = async () => {
    try {
      const res = await logout();
      if (res.errors) {
        console.log(res.errors);
      } else if (res.data) {
        dispatcher(logOutAccount());
      }
    } catch(error) {
      console.log('error:', error);
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={() => handleLogOut()}
        variant="outlined"
        startIcon={<LogoutIcon />}>
        {t('buttonGeneral.logout')}
      </Button>
    </Stack>
  );
};

export default Logout;
import React from 'react';
import { useTranslation } from 'react-i18next';

const Logout = () => {
  const { t } = useTranslation();
  return (
    <h1>{t('signout.title')}</h1>
  );
};

export default Logout;

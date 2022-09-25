import React from 'react';
import { useTranslation } from 'react-i18next';

const Signout = () => {
  const { t } = useTranslation();
  return (
    <h1>{t('signout.title')}</h1>
  );
};

export default Signout;

import React from 'react';
import { useTranslation } from 'react-i18next';

const Signin = () => {
  const { t } = useTranslation();
  return (
    <h1>{t('signin.title')}</h1>
  );
};

export default Signin;

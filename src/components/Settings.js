import React from 'react';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();
  return (
    <h1>{t('settings.title')}</h1>
  );
};

export default Settings;

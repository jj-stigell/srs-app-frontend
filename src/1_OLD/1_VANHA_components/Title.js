import React from 'react';
import { useTranslation } from 'react-i18next';

const Title = () => {
  const { t } = useTranslation();
  return (
    <h1>{t('title')}</h1>
  );
};

export default Title;

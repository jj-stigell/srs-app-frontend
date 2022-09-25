import React from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <h1>{t('dashboard.title')}</h1>
  );
};

export default Dashboard;

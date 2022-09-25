import React from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';
import LanguageBar from './LanguageBar';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Signin from './Signin';
import Signout from './Signout';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const { t } = useTranslation();
  const padding = {
    padding: 5
  };
  return (
    <Router>
      <div>
        <Link style={padding} to="/">{t('navbar.dashboard')}</Link>
        <Link style={padding} to="/settings">{t('navbar.settings')}</Link>
        <Link style={padding} to="/signout">{t('navbar.signout')}</Link>
        <Link style={padding} to="/signin">{t('navbar.signin')}</Link>
      </div>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <LanguageBar />
    </Router>

  );
};

export default NavBar;

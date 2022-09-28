import React from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';
import LanguageBar from './LanguageBar';
import Dashboard from './Dashboard';
import Settings from './Settings';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';

const NavBar = () => {
  const client = useApolloClient();
  const { t } = useTranslation();
  const padding = {
    padding: 5
  };

  const logout = () => {
    //setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <Router>
      <div>
        <Link style={padding} to="/">{t('navbar.dashboard')}</Link>
        <Link style={padding} to="/settings">{t('navbar.settings')}</Link>
        <Link style={padding} to="/login">{t('navbar.signin')}</Link>
        <Link style={padding} to="/register">{t('navbar.register')}</Link>
        <button onClick={logout}>{t('navbar.signout')}</button>
        <LanguageBar />
      </div>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>

  );
};

export default NavBar;

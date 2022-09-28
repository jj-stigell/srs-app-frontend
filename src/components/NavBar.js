import React from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate
} from 'react-router-dom';
import LanguageBar from './LanguageBar';
import Dashboard from './Dashboard';
import Settings from './Settings';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/reducers/userReducer';

const NavBar = ({ user }) => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const padding = {
    padding: 5
  };

  const logout = () => {
    //setToken(null);
    //logoutUser
    dispatch(logoutUser());
    localStorage.clear();
    client.resetStore();
  };

  return (
    <Router>
      <div>
        {user
          ? <div>
            <Link style={padding} to="/">{t('navbar.dashboard')}</Link>
            <Link style={padding} to="/settings">{t('navbar.settings')}</Link>
            <button onClick={logout}>{t('navbar.signout')}</button>
          </div>
          : <div>
            <Link style={padding} to="/login">{t('navbar.signin')}</Link>
            <Link style={padding} to="/register">{t('navbar.register')}</Link>
          </div>}

        <LanguageBar />
      </div>
      <Routes>
        <Route path="/settings" element={user ? <Settings /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <LoginForm />} />
        <Route path="/register" element={user ? <Navigate replace to="/" /> : <RegisterForm />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>

  );
};

export default NavBar;

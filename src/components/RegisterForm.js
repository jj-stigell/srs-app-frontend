import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RegisterForm = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('username', username, 'password', password);
  };

  return (
    <div>
      <h2>{t('register.title')}</h2>
      <form onSubmit={handleLogin}>
        <div>
          {t('misc.username')}
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
            placeholder={t('placeholder.username')}
          />
        </div>
        <div>
          {t('misc.email')}
          <input
            type="text"
            value={email}
            name="email"
            onChange={({ target }) => setEmail(target.value)}
            id="email"
            placeholder={t('placeholder.email')}
          />
        </div>
        <div>
          {t('misc.password')}
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
            placeholder={t('placeholder.password')}
          />
        </div>
        <div>
          {t('misc.passwordConfirm')}
          <input
            type="password"
            value={passwordConfirm}
            name="passwordConfirm"
            onChange={({ target }) => setPasswordConfirm(target.value)}
            id="passwordConfirm"
            placeholder={t('placeholder.passwordConfirm')}
          />
        </div>
        <button id="register" type="submit">{t('misc.signin')}</button>
      </form>
    </div>
  );
};

export default RegisterForm;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SigninForm = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('username', username, 'password', password);
  };

  return (
    <div>
      <h2>{t('signin.title')}</h2>
      <form onSubmit={handleLogin}>
        <div>
          {t('misc.email')}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
            placeholder={t('placeholder.email')}
          />
        </div>
        <div>
          {t('misc.password')}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
            placeholder={t('placeholder.password')}
          />
        </div>
        <button id="login" type="submit">{t('misc.signin')}</button>
      </form>
    </div>
  );
};

export default SigninForm;

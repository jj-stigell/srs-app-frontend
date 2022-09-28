import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries/mutations';

const LoginForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //const found = window.localStorage.getItem('srs-acc-token');
  //console.log('token in store', found);

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      //setError(error.graphQLErrors[0].message);
      console.log('error:::', error.graphQLErrors[0].extensions.errorName);
    }
  });

  useEffect(() => {
    if ( result.data ) {
      //console.log('login succes, data::::', result.data.login.value);
      const token = result.data.login.value;
      localStorage.setItem('srs-acc-token', token);
    }
  }, [result.data]);

  const handleLogin = async (event) => {
    event.preventDefault();
    //console.log('username', email, 'password', password);
    login({ variables: { email, password } });
  };

  return (
    <div>
      <h2>{t('signin.title')}</h2>
      <form onSubmit={handleLogin}>
        <div>
          {t('misc.email')}
          <input
            type="text"
            value={email}
            name="username"
            onChange={({ target }) => setEmail(target.value)}
            id="username"
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
        <button id="login" type="submit">{t('misc.signin')}</button>
      </form>
    </div>
  );
};

export default LoginForm;

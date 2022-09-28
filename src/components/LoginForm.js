import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries/mutations';
import Notification from './Notification';

const LoginForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  //const found = window.localStorage.getItem('token');
  //console.log('token in store', found);

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      const message = t(`errors.${error.graphQLErrors[0].extensions.errorName}`);
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  });

  useEffect(() => {
    if ( result.data ) {
      //console.log('login succes, data::::', result.data.login.user);
      const token = result.data.login.token.value;
      localStorage.setItem('token', token);
    }
  }, [result.data]);

  const handleLogin = async (event) => {
    event.preventDefault();
    //console.log('username', email, 'password', password);
    login({ variables: { email, password } });
  };

  return (
    <div>
      <Notification notification={errorMessage} error={true}/>
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

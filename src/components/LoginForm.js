import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries/mutations';
import Notification from './Notification';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, reset, formState: { errors }, handleSubmit } = useForm();

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      const message = t(`errors.${error.graphQLErrors[0].extensions.errorName}`);
      reset({ password: '' });
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  });

  useEffect(() => {
    if (result.data) {
      //console.log('login succes, data:', result.data.login.user);
      const user = result.data.login.user;
      const token = result.data.login.token.value;
      dispatch(setUser(user));
      dispatch(setToken(token));
      navigate('/');
    }
  }, [result.data]);

  const handleLogin = async ({ email, password }) => {
    //console.log('username', email, 'password', password);
    login({ variables: { email, password } });
  };

  return (
    <div>
      <Notification notification={errorMessage} error={true}/>
      <h2>{t('signin.title')}</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        {t('misc.email')}
        <input
          type="text"
          placeholder={t('placeholder.email')}
          {...register('email', {
            required: t('errors.requiredEmailError'),
            pattern: {
              value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
              message: t('errors.notEmailError')
            }
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <p role="alert">{errors.email?.message}</p>}
        {t('misc.password')}
        <input
          type="password"
          placeholder={t('placeholder.password')}
          {...register('password', { required: t('errors.requiredPasswordError') } )}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && <p role="alert">{errors.password?.message}</p>}
        <input type="submit" value={t('signin.signinButton')} />
      </form>
    </div>
  );
};

export default LoginForm;

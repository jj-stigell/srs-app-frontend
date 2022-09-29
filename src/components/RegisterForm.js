import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../queries/mutations';
import Notification from './Notification';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [notificationMessage, setMessage] = useState(null);
  const [errorOn, setErrorOn] = useState(false);
  const { register, reset, formState: { errors }, handleSubmit } = useForm();

  //eslint-disable-next-line
  const regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  const [ registerAccount, result ] = useMutation(REGISTER, {
    onError: (error) => {
      const message = t(`errors.${error.graphQLErrors[0].extensions.errorName}`);
      reset({ password: '', passwordConfirmation: '' });
      setErrorOn(true);
      setMessage(message);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  });

  useEffect(() => {
    if (result.data?.createAccount) {
      const registeredEmail = result.data.createAccount.email;
      reset({ email: '', username: '', password: '', passwordConfirmation: '' });
      setErrorOn(false);
      setMessage(t('register.success', { email: registeredEmail }));
      setTimeout(() => {
        setMessage(null);
        navigate('/login');
      }, 3000);
    }
  }, [result.data]);

  const handleRegister = async ({ username, email, password, passwordConfirmation }) => {
    //console.log('username', data.username, 'email:', data.email, 'password', data.password, 'confirm', data.passwordConfirmation);
    registerAccount({ variables: { username, email, password, passwordConfirmation }
    });
  };

  return (
    <div>
      <Notification notification={notificationMessage} error={errorOn}/>
      <h2>{t('register.title')}</h2>
      <form onSubmit={handleSubmit(handleRegister)}>
        {t('misc.email')}
        <input
          type="text"
          placeholder={t('placeholder.email')}
          {...register('email', {
            required: t('errors.requiredEmailError'),
            pattern: {
              value: regexEmail,
              message: t('errors.notEmailError')
            }
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <p role="alert">{errors.email?.message}</p>}
        {t('misc.username')}
        <input
          type="text"
          placeholder={t('placeholder.username')}
          {...register('username', { required: t('errors.requiredUsernameError') })}
          aria-invalid={errors.username ? 'true' : 'false'}
        />
        {errors.username && <p role="alert">{errors.username?.message}</p>}
        {t('misc.password')}
        <input
          type="password"
          placeholder={t('placeholder.password')}
          {...register('password', { required: t('errors.requiredPasswordError') })}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && <p role="alert">{errors.password?.message}</p>}
        {t('misc.passwordConfirm')}
        <input
          type="password"
          placeholder={t('placeholder.passwordConfirm')}
          {...register('passwordConfirmation', { required: t('errors.requiredPasswordConfirmError') })}
          aria-invalid={errors.passwordConfirmation ? 'true' : 'false'}
        />
        {errors.passwordConfirmation && <p role="alert">{errors.passwordConfirmation?.message}</p>}
        <input type="submit" value={t('register.registerButton')} />
      </form>
    </div>
  );
};

export default RegisterForm;

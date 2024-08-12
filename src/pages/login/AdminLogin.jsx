import React, { useState } from 'react';
import userService from '../../api/services/userService';
import PageTemplate from '../../components/other/PageTemplate';
import { useTranslation } from 'react-i18next';
import '../../assets/styles/forms/AdminLogin.css'
import InputForm from '../../components/inputs/InputForm';
import ButtonSubmit from '../../components/buttons/ButtonSubmit';
import ReCAPTCHA from 'react-google-recaptcha';

const AdminLogin = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('mne12mrl_31zawfhc8');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await userService.authenticateAdmin({ username, password });
      const { accessToken, refreshToken } = response;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setError(null); // Сброс ошибки при успешной авторизации
      console.log('Admin logged in successfully');
      // Здесь можно выполнить дополнительные действия, например, перенаправление на защищенную страницу
    } catch (err) {
      setError('Failed to login as admin');
      console.error('Error logging in:', err);
    }
  };

  function onChangeCaptcha(value) {
    console.log("Captcha value:", value);
  }

  return (
    <PageTemplate content={t('admin-panel.authorization.header')} contentSection={
      <div className='login-container'>
        <div className='login-input-container'>
          <InputForm
            placeholder={t('admin-panel.authorization.login')}
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />

        </div>
        <div className='login-input-container'>
          <InputForm
            placeholder={t('admin-panel.authorization.password')}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className='login-captcha-container'>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChangeCaptcha}
          />
        </div>

        <div className='login-btn-container'>
          <ButtonSubmit
            isColorsInverse={true}
            themeColor="yellow"
            href="none"
            spanText={t("admin-panel.btn.enter")}
            onClick={handleLogin}
            size="s" />
        </div>

      </div>
    }
    />

  );
};

export default AdminLogin;

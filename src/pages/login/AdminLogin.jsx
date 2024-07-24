import React, { useState } from 'react';
import userService from '../../api/services/userService';

const AdminLogin = () => {
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

  return (
    <div>
      <h1>Admin Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Важно: Убедитесь, что перехватчики подключены один раз в основном файле вашего приложения
import './api/interceptors';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <script src="https://api-maps.yandex.ru/v3/?apikey=6d85a114-74fe-4685-bb56-5802a759c0e9&lang=ru_RU"></script>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, maximum-scale=1" /> 
    <App />
  </React.StrictMode>,
)

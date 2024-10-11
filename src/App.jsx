import React, { useEffect, useState } from 'react';


import DefaultLayout from './layouts/DefaultLayout';
import LandingPage from './pages/LandingPage';

import { createBrowserRouter, Route, RouterProvider, Routes, Navigate, Outlet } from 'react-router-dom';
import './index.css';
import './utils/globalFunctions';

import { scheduleTokenRefresh } from './utils/tokenService';
import { HelmetProvider } from 'react-helmet-async';


const router = createBrowserRouter([
  { path: '/*', element: <DefaultLayout /> },
]);


export default function App() {
  useEffect(() => {
    scheduleTokenRefresh(); // Активируем регулярное обновление токенов
  }, []);

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}




import React, {  useEffect, useState } from 'react';


import DefaultLayout from './layouts/DefaultLayout';
import LandingPage from './pages/LandingPage';

import { createBrowserRouter, Route, RouterProvider, Routes, Navigate, Outlet } from 'react-router-dom';
import './index.css';
import './utils/globalFunctions';

import PageTemplate from './components/other/PageTemplate';
import Spinner from './components/other/Spinner';
import { scheduleTokenRefresh } from './utils/tokenService';


// const router = createBrowserRouter([
//   { path: '/*', element: <DefaultLayout /> },
//   { path: '/', element: <LandingPage /> },
// ], { basename: '/Front-end2024/' });

const router = createBrowserRouter([
  { path: '/*', element: <DefaultLayout /> },
]);


export default function App() {
  useEffect(() => {
    scheduleTokenRefresh(); // Активируем регулярное обновление токенов
  }, []);

  return (
      
      <RouterProvider router={router} />

  );
}




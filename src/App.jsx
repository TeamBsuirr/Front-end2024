import React, { useState } from 'react';


import DefaultLayout from './layouts/DefaultLayout';
import LandingPage from './pages/LandingPage';

import { createBrowserRouter, Route, RouterProvider, Routes, Navigate, Outlet } from 'react-router-dom';
import './index.css';
import './js/common/globalFunctions';
import PageTemplate from './components/other/PageTemplate';
import Spinner from './components/other/Spinner';






// const router = createBrowserRouter([
//   { path: '/*', element: <DefaultLayout /> },
//   { path: '/', element: <LandingPage /> },
// ], { basename: '/Front-end2024/' });

const router = createBrowserRouter([
  { path: '/*', element: <DefaultLayout /> },
  { path: '/', element: <LandingPage /> },

]);


export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <PageTemplate content={<Spinner size="large" />} />;
  }

  return (
    <RouterProvider router={router} />
  );
}




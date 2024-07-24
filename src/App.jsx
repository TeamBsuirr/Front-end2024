import React, { useState } from 'react';

import { createBrowserRouter, Route, RouterProvider, Routes, Navigate, Outlet } from 'react-router-dom';
import './index.css';



import LoadingIndicator from './components/layout/LoadingIndicator';
import DefaultLayout from './layouts/DefaultLayout';
import LandingPage from './pages/LandingPage';
import CreateStoryPage from './pages/story/CreateStoryPage';
import About from './pages/about/About';
import MapUzniki from './components/other/MapUzniki';
import PhotoArchive from './components/forms/PhotoArchive';
import Contact from './pages/contact/Contact';
import SearchResults from './components/forms/SearchResults';
import PrisonerStories from './pages/prisoners/PrisonerStories';
import PrisonerPage from './pages/search/prisoner/PrisonerPage';



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
    return <LoadingIndicator />
  }

  return (
    <RouterProvider router={router} />
  );
}




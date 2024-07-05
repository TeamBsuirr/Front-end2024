import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import F12Main from './F12Main';

import AboutProject from './pages/AboutProject';
import AddStory from './pages/AddStory';
import Base from './pages/Base';
import Bot from './pages/Bot';
import BotheadMain from './pages/BotheadMain';
import BotheadMain1 from './pages/BotheadMain1';
import But1 from './pages/But1';
import But11 from './pages/But11';
import But1AddStory from './pages/But1AddStory';
import But1Bot from './pages/But1Bot';
import But1Main from './pages/But1Main';
import But2 from './pages/But2';
import But21 from './pages/But21';
import But2Main from './pages/But2Main';
import But3 from './pages/But3';
import But31 from './pages/But31';
import But32 from './pages/But32';
import But32 from './pages/But32';
import But4Main from './pages/But4Main';
import But4Main1 from './pages/But4Main1';
import But4Main2 from './pages/But4Main2';
import ButLoopsearch1 from './pages/ButLoopsearch1';
import ButOtherstory from './pages/ButOtherstory';
import ButStorystory from './pages/ButStorystory';
import Contacts from './pages/Contacts';
import Doc2AddStory from './pages/Doc2AddStory';
import Header from './pages/Header';
import Header from './pages/Header';
import Header1 from './pages/Header1';
import Img2AddStory from './pages/Img2AddStory';
import Langheader from './pages/Langheader';
import Language from './pages/Language';
import Main from './pages/Main';
import Map from './pages/Map';
import MapRb from './pages/MapRb';
import Photo from './pages/Photo';
import Photo1 from './pages/Photo1';
import PhotoArchive from './pages/PhotoArchive';
import Search1 from './pages/Search1';
import Search1 from './pages/Search1';
import Story from './pages/Story';
import Story from './pages/Story';
import StoryArchive from './pages/StoryArchive';
import StoryArchive from './pages/StoryArchive';
import StoryArchive1 from './pages/StoryArchive1';
import StoryArchive2 from './pages/StoryArchive2';
import StoryArchive3 from './pages/StoryArchive3';
import StoryArchive4 from './pages/StoryArchive4';
import StoryArchive5 from './pages/StoryArchive5';
import StoryArchive6 from './pages/StoryArchive6';
import Test1 from './pages/Test1';
import Vid2AddStory from './pages/Vid2AddStory';


const router = createBrowserRouter([
  { path: '/', element: <F12Main /> },
{ path: '/AboutProject', element: <AboutProject /> },
{ path: '/AddStory', element: <AddStory /> },
{ path: '/Base', element: <Base /> },
{ path: '/Bot', element: <Bot /> },
{ path: '/BotheadMain', element: <BotheadMain /> },
{ path: '/BotheadMain1', element: <BotheadMain1 /> },
{ path: '/But1', element: <But1 /> },
{ path: '/But11', element: <But11 /> },
{ path: '/But1AddStory', element: <But1AddStory /> },
{ path: '/But1Bot', element: <But1Bot /> },
{ path: '/But1Main', element: <But1Main /> },
{ path: '/But2', element: <But2 /> },
{ path: '/But21', element: <But21 /> },
{ path: '/But2Main', element: <But2Main /> },
{ path: '/But3', element: <But3 /> },
{ path: '/But31', element: <But31 /> },
{ path: '/But32', element: <But32 /> },
{ path: '/But32', element: <But32 /> },
{ path: '/But4Main', element: <But4Main /> },
{ path: '/But4Main1', element: <But4Main1 /> },
{ path: '/But4Main2', element: <But4Main2 /> },
{ path: '/ButLoopsearch1', element: <ButLoopsearch1 /> },
{ path: '/ButOtherstory', element: <ButOtherstory /> },
{ path: '/ButStorystory', element: <ButStorystory /> },
{ path: '/Contacts', element: <Contacts /> },
{ path: '/Doc2AddStory', element: <Doc2AddStory /> },
{ path: '/Header', element: <Header /> },
{ path: '/Header', element: <Header /> },
{ path: '/Header1', element: <Header1 /> },
{ path: '/Img2AddStory', element: <Img2AddStory /> },
{ path: '/Langheader', element: <Langheader /> },
{ path: '/Language', element: <Language /> },
{ path: '/Main', element: <Main /> },
{ path: '/Map', element: <Map /> },
{ path: '/MapRb', element: <MapRb /> },
{ path: '/Photo', element: <Photo /> },
{ path: '/Photo1', element: <Photo1 /> },
{ path: '/PhotoArchive', element: <PhotoArchive /> },
{ path: '/Search1', element: <Search1 /> },
{ path: '/Search1', element: <Search1 /> },
{ path: '/Story', element: <Story /> },
{ path: '/Story', element: <Story /> },
{ path: '/StoryArchive', element: <StoryArchive /> },
{ path: '/StoryArchive', element: <StoryArchive /> },
{ path: '/StoryArchive1', element: <StoryArchive1 /> },
{ path: '/StoryArchive2', element: <StoryArchive2 /> },
{ path: '/StoryArchive3', element: <StoryArchive3 /> },
{ path: '/StoryArchive4', element: <StoryArchive4 /> },
{ path: '/StoryArchive5', element: <StoryArchive5 /> },
{ path: '/StoryArchive6', element: <StoryArchive6 /> },
{ path: '/Test1', element: <Test1 /> },
{ path: '/Vid2AddStory', element: <Vid2AddStory /> },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
import { React } from 'react';
import '../assets/styles/layout/DefaultLayout.css'
import CreateStoryPage from '../pages/story/CreateStoryPage';
import HeaderLayout from '../components/layout/HeaderLayout';
import FooterLayout from '../components/layout/FooterLayout';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/about/About';
import Contact from '../pages/contact/Contact';
import SearchResults from '../components/forms/SearchResults';
import PrisonerPage from '../pages/search/prisoner/PrisonerPage';
import PrisonerSearchResult from '../components/forms/PrisonerSearchResult';
import PrisonerStories from '../pages/prisoners/PrisonerStories';
import MapUzniki from '../components/other/MapUzniki';
import PhotoArchive from '../components/forms/PhotoArchive';


export default function DefaultLayout() {

    return (
        <>
            <HeaderLayout />
            <main className='main-layout'>

                <Routes>

                    {/* {workingUser && <Route path="profile" element={<ProfileTemplate />} />} */}

                    <Route path="/story" element={<CreateStoryPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/map" element={<MapUzniki />} />
                    <Route path="/archive/photos" element={<PhotoArchive />} />
                    <Route path="/contacts" element={<Contact />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/prisoners" element={<PrisonerStories />} />
                    <Route path="/search/prisoner/*" element={<PrisonerPage />} />
                </Routes>


            </main >
            <FooterLayout />


        </>
    )
}
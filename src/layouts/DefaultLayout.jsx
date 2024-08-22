import { React, Suspense, useEffect } from 'react';
import '../assets/styles/layout/DefaultLayout.css'
import CreateStoryPage from '../pages/story/CreateStoryPage';
import HeaderLayout from '../components/layout/HeaderLayout';
import FooterLayout from '../components/layout/FooterLayout';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import About from '../pages/about/About';
import Contact from '../pages/contact/Contact';
import PrisonerPage from '../pages/search/prisoner/PrisonerPage';
import PrisonerStories from '../pages/prisoners/PrisonerStories';
import PageTemplate from '../components/other/PageTemplate';
import AdminLogin from '../pages/login/AdminLogin';
import SearchResultPage from '../pages/search/SearchResultPage';
import PhotoArchivePage from '../pages/archive/photos/PhotoArchivePage';
import PlacePage from '../pages/search/place/PlacePage';
import Analysis from '../pages/archive/analysis/Analysis';
import MapPage from '../pages/map/MapPage';
import i18n from '../i18n';
import Spinner from '../components/other/Spinner';

import Policy from '../pages/about/policy/Policy';
import NewPhotoPage from '../pages/crud/photo/NewPhotoPage';
import NewPlacePage from '../pages/crud/place/NewPlacePage';
import NewHumanPage from '../pages/crud/human/NewHumanPage';
import AdminDashboardPage from '../pages/crud/AdminDashboardPage';

const useLanguage = () => {
    const { lang } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang);
            localStorage.setItem('language', lang);

            // Получаем текущий путь, параметры запроса и хэш
            const currentPath = window.location.pathname;
            const searchParams = window.location.search;
            const hashParams = window.location.hash;

            // Проверяем, если текущий путь уже содержит языковой префикс
            const pathWithoutLang = currentPath.replace(/^\/(ru|de|be)/, ''); // можно расширить список языков по необходимости
            const newPath = `/${lang}${pathWithoutLang}${searchParams}${hashParams}`;

            // Переходим на новый путь, если он отличается от текущего
            if (newPath !== `${currentPath}${searchParams}${hashParams}`) {
                navigate(newPath, { replace: true });
            }
        } else {
            // Если lang не задан, перенаправляем на язык по умолчанию
            const defaultLang = localStorage.getItem('language') || 'ru';

            // Получаем текущий путь, параметры запроса и хэш
            const currentPath = window.location.pathname;
            const searchParams = window.location.search;
            const hashParams = window.location.hash;

            // Проверяем, если текущий путь уже содержит языковой префикс
            const pathWithoutLang = currentPath.replace(/^\/(ru|de|be)/, ''); // можно расширить список языков по необходимости
            const newPath = `/${defaultLang}${pathWithoutLang}${searchParams}${hashParams}`;

            // Переходим на новый путь, если он отличается от текущего
            if (newPath !== `${currentPath}${searchParams}${hashParams}`) {
                navigate(newPath, { replace: true });
            }
        }
    }, [lang, navigate]);

    return lang;
};

export default function DefaultLayout() {
    useLanguage();

    return (
        <>
            <HeaderLayout />
            <Suspense fallback={<PageTemplate content={<Spinner size="large" />} />}>
                {/* <Suspense fallback={<Spinner size="large"s />}> */}
                <main className='main-layout'>
                    <Routes>
                        {/* ONLY FOR ADMIN */}
                        <Route path="/:lang/story" element={<CreateStoryPage />} />
                        <Route path="/:lang/login" element={<AdminLogin />} />
                        <Route path="/:lang/crud/place/*" element={<NewPlacePage />} />
                        <Route path="/:lang/crud/photo/*" element={<NewPhotoPage />} />
                        <Route path="/:lang/crud/human/*" element={<NewHumanPage />} />
                        <Route path="/:lang/crud" element={<AdminDashboardPage />} />
                        {/* ONLY FOR ADMIN */}

                        <Route path="/:lang/about" element={<About />} />
                        <Route path="/:lang/about/policy" element={<Policy />} />
                        <Route path="/:lang/map" element={<MapPage />} />
                        <Route path="/:lang/archive/photos" element={<PhotoArchivePage />} />
                        <Route path="/:lang/archive/analysis" element={<Analysis />} />
                        <Route path="/:lang/contacts" element={<Contact />} />
                        <Route path="/:lang/search" element={<SearchResultPage />} />
                        <Route path="/:lang/prisoners" element={<PrisonerStories />} />
                        <Route path="/:lang/search/prisoner/*" element={<PrisonerPage />} />
                        <Route path="/:lang/search/place/*" element={<PlacePage />} />
                        <Route path="*" element={<PageTemplate />} />
                    </Routes>
                </main>
            </Suspense>
            <FooterLayout />
        </>
    );
}
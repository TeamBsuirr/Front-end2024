import { React, Suspense, useEffect, useState } from 'react';
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
import LandingPage from '../pages/LandingPage';
import ProtectedRoute from './ProtectedRoute';
import { checkAdminStatus } from '../utils/auth';


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

    const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(()=>{
        const result = checkAdminStatus();
        setIsAdmin(result);
    },[])

  
    return (
        <>
            <meta http-equiv="Access-Control-Allow-Origin" content="*" />
            <script src="https://api-maps.yandex.ru/v3/?apikey=6d85a114-74fe-4685-bb56-5802a759c0e9&lang=ru_RU"></script>
            <meta name="viewport" content="initial-scale=1.0, user-scalable=no, maximum-scale=1" />
            <HeaderLayout />
            <Suspense fallback={<PageTemplate content={<Spinner size="large" />} />}>
                {/* <Suspense fallback={<Spinner size="large"s />}> */}
                <main className='main-layout'>
                    <Routes>
                        {/* Admin Protected Routes */}
                        <Route
                            path="/:lang/story"
                            element={
                                <ProtectedRoute>
                                    <CreateStoryPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/:lang/crud/place/*"
                            element={
                                <ProtectedRoute>
                                    <NewPlacePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/:lang/crud/photo/*"
                            element={
                                <ProtectedRoute>
                                    <NewPhotoPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/:lang/crud/human/*"
                            element={
                                <ProtectedRoute>
                                    <NewHumanPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/:lang/crud"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboardPage />
                                </ProtectedRoute>
                            }
                        />

                        {/* Public Routes */}

                        <Route path="/:lang/login" element={<AdminLogin />} />
                        <Route path="/:lang/about" element={<About />} />
                        <Route path="/:lang/about/policy" element={<Policy />} />
                        <Route path="/:lang/map" element={<MapPage isAdmin={isAdmin}/>} />
                        <Route path="/:lang/archive/photos" element={<PhotoArchivePage isAdmin={isAdmin} />} />
                        <Route path="/:lang/archive/analysis" element={<Analysis />} />
                        <Route path="/:lang/contacts" element={<Contact />} />
                        <Route path="/:lang/search" element={<SearchResultPage isAdmin={isAdmin}/>} />
                        <Route path="/:lang/prisoners" element={<PrisonerStories isAdmin={isAdmin}/>} />
                        <Route path="/:lang/search/prisoner/*" element={<PrisonerPage isAdmin={isAdmin}/>} />
                        <Route path="/:lang/search/place/*" element={<PlacePage isAdmin={isAdmin}/>} />
                        <Route path="/:lang/" element={<LandingPage />} />
                        <Route path="*" element={<PageTemplate />} />
                    </Routes>
                </main>
            </Suspense>
            <FooterLayout />
        </>
    );
}
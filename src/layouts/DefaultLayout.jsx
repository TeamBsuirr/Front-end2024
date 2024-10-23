/* eslint-disable no-unused-vars */
import { React, Suspense, useEffect, useState } from "react";
import "../assets/styles/layout/DefaultLayout.css";
import CreateStoryPage from "../pages/story/CreateStoryPage";
import HeaderLayout from "../components/layout/HeaderLayout";
import FooterLayout from "../components/layout/FooterLayout";
import {
    Route,
    Routes,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import PrisonerPage from "../pages/search/prisoner/PrisonerPage";
import PrisonerStories from "../pages/prisoners/PrisonerStories";
import PageTemplate from "../components/other/PageTemplate";
import AdminLogin from "../pages/login/AdminLogin";
import SearchResultPage from "../pages/search/SearchResultPage";
import PhotoArchivePage from "../pages/archive/photos/PhotoArchivePage";
import PlacePage from "../pages/search/place/PlacePage";
import Analysis from "../pages/archive/analysis/Analysis";
import MapPage from "../pages/map/MapPage";
import i18n from "../i18n";
import Spinner from "../components/other/Spinner";

import Policy from "../pages/about/policy/Policy";
import NewPhotoPage from "../pages/crud/photo/NewPhotoPage";
import NewPlacePage from "../pages/crud/place/NewPlacePage";
import NewHumanPage from "../pages/crud/human/NewHumanPage";
import AdminDashboardPage from "../pages/crud/AdminDashboardPage";
import LandingPage from "../pages/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import { checkAdminStatus } from "../utils/auth";
import { Helmet } from "react-helmet-async";
import { t } from "i18next";
import { notification } from "antd";

const useLanguage = () => {
    const { lang } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang);
            localStorage.setItem("language", lang);

            // Получаем текущий путь, параметры запроса и хэш
            const currentPath = window.location.pathname;
            const searchParams = window.location.search;
            const hashParams = window.location.hash;

            // Проверяем, если текущий путь уже содержит языковой префикс
            const pathWithoutLang = currentPath.replace(/^\/(ru|de|be)/, ""); // можно расширить список языков по необходимости
            const newPath = `/${lang}${pathWithoutLang}${searchParams}${hashParams}`;

            // Переходим на новый путь, если он отличается от текущего
            if (newPath !== `${currentPath}${searchParams}${hashParams}`) {
                navigate(newPath, { replace: true });
            }
        } else {
            // Если lang не задан, перенаправляем на язык по умолчанию
            const defaultLang = localStorage.getItem("language") || "ru";

            // Получаем текущий путь, параметры запроса и хэш
            const currentPath = window.location.pathname;
            const searchParams = window.location.search;
            const hashParams = window.location.hash;

            // Проверяем, если текущий путь уже содержит языковой префикс
            const pathWithoutLang = currentPath.replace(/^\/(ru|de|be)/, ""); // можно расширить список языков по необходимости
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
    const location = useLocation(); // Get the current route

    useLanguage();

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const result = checkAdminStatus();
        setIsAdmin(result);
        notification.warning({
            message: t("errors.front-end.warning-site-not-finished"),
            description: t("errors.front-end.warning-site-not-finished-msg"),
            duration: 7,
        });
    }, []);

    // Determine the current page based on the route
    const parts = location.pathname.split("/");
    let currentPage = parts[2] || "main"; // второй элемент после языка

    // Если третий элемент (после языка) — это число, значит это ID объекта, и его нужно игнорировать
    if (!isNaN(parts[3])) {
        // Если после названия страницы идет число (ID объекта), оставляем currentPage как есть
        currentPage = parts[2]; // Например, '/ru/crud/place/123' -> 'place'
    } else if (parts[3]) {
        // Если после названия страницы идет не число, возможно это подстраница
        currentPage = `${parts[2]}/${parts[3]}`;
    }

    return (
        <>
            <Helmet>
                {/* Use t() to fetch the title and description dynamically */}
                <title>{t(`page-title.${currentPage}`)}</title>
                <meta
                    name="description"
                    content={t(`page-description.${currentPage}`)}
                />
            </Helmet>

            <HeaderLayout />
            <Suspense
                fallback={<PageTemplate content={<Spinner size="large" />} />}
            >
                {/* <Suspense fallback={<Spinner size="large"s />}> */}
                <main className="main-layout">
                    <Routes>
                        {/* Admin Protected Routes */}

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

                        <Route
                            path="/:lang/map"
                            element={<MapPage isAdmin={isAdmin} />}
                        />
                        <Route path="/:lang/contacts" element={<Contact />} />
                        <Route path="/:lang/login" element={<AdminLogin />} />
                        <Route
                            path="/:lang/archive/photos"
                            element={<PhotoArchivePage isAdmin={isAdmin} />}
                        />
                        <Route
                            path="/:lang/archive/analysis"
                            element={<Analysis />}
                        />
                        <Route path="/:lang/about" element={<About />} />
                        <Route
                            path="/:lang/about/policy"
                            element={<Policy />}
                        />
                        <Route
                            path="/:lang/search"
                            element={<SearchResultPage isAdmin={isAdmin} />}
                        />
                        <Route
                            path="/:lang/prisoners"
                            element={<PrisonerStories isAdmin={isAdmin} />}
                        />

                        <Route
                            path="/:lang/story"
                            element={<CreateStoryPage />}
                        />

                        <Route
                            path="/:lang/search/prisoner/*"
                            element={<PrisonerPage isAdmin={isAdmin} />}
                        />
                        <Route
                            path="/:lang/search/place/*"
                            element={<PlacePage isAdmin={isAdmin} />}
                        />
                        <Route path="/:lang/" element={<LandingPage />} />
                        <Route path="*" element={<PageTemplate />} />
                    </Routes>
                </main>
            </Suspense>
            <FooterLayout />
        </>
    );
}

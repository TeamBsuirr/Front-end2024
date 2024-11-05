// i18n.js
import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "ru", // Язык по умолчанию
        debug: true,
        backend: {
            loadPath: process.env.REACT_APP_I18N_PATH, // Путь к файлам с переводами
        },
        detection: {
            order: [
                "localStorage",
                "querystring",
                "cookie",
                "navigator",
                "htmlTag",
                "path",
                "subdomain",
            ],
            caches: ["localStorage"], // Используйте только localStorage для кеширования
        },
        interpolation: {
            escapeValue: false, // React сам экранирует HTML
        },
    });

export default i18n;

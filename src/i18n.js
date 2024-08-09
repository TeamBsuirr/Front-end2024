// i18n.js
import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru', // Язык по умолчанию
    debug: true,
    backend: {
      //loadPath: '/locales/{{lng}}/{{ns}}.json', // Путь к файлам с переводами
      loadPath: 'http://localhost:8080/i18n/{{lng}}.json', // Путь к файлам с переводами
      
    },
    detection: {
      // order: ['querystring', 'localStorage', 'cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],
      // caches: ['localStorage'],
      order: ['localStorage', 'querystring', 'cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'], // Используйте только localStorage для кеширования  
    },
    interpolation: {
      escapeValue: false, // React сам экранирует HTML
    },
  });

export default i18n;

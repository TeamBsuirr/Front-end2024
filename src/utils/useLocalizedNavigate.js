import { useNavigate } from 'react-router-dom';

const useLocalizedNavigate = () => {
    const navigate = useNavigate();

    return (path, options) => {
        // Retrieve the current language from localStorage or default to 'ru'
        const currentLang = localStorage.getItem('language') || 'ru';
        console.log('Current language from localStorage in hook:', currentLang); // Debug log
        
        // Extract the path without the language prefix if present
        const pathWithoutLangPrefix = path.replace(/^\/(ru|de|be)/, '');
        
        // Construct the new path with the current language prefix
        const newPath = `/${currentLang}${pathWithoutLangPrefix}`;
        console.log('Navigating to new path from hook:', newPath); // Debug log
        
        // Navigate to the new path
        navigate(newPath, options);
    };
};

export default useLocalizedNavigate;

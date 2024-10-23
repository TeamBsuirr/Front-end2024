import { useEffect, useState } from "react";
import "../../assets/styles/layout/HeaderLayout.css";
import SiteMainHeaderSpan from "../other/SiteMainHeaderSpan";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import useLocalizedNavigate from "../../utils/useLocalizedNavigate";
import { useLocation } from "react-router-dom";
import globusIcon from "!!file-loader!../../assets/images/icons/other/globusIcon.svg";
import globusIconHovered from "!!file-loader!../../assets/images/icons/other/globusIconHovered.svg";

export default function HeaderLayout() {
    const navigate = useLocalizedNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem("language") || "ru",
    );
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const { t } = useTranslation();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLanguageSelect = (language) => {
        //console.log('Selected language:', language); // Debug log
        setSelectedLanguage(language);
        setMenuVisible(false); // Close menu after selection

        // Update localStorage with the selected language
        localStorage.setItem("language", language);

        // Get the selected language or default to 'ru'
        const selectedLang = language || "ru";
        //console.log('Selected language from localStorage:', selectedLang); // Debug log

        // Get current path, query parameters, and hash
        const currentPath = location.pathname;
        const searchParams = location.search;
        const hashParams = location.hash;

        // Remove the current language prefix if it exists
        const currentLangMatch = currentPath.match(/^\/(ru|de|be)/);
        const pathWithoutCurrentLang = currentLangMatch
            ? currentPath.replace(currentLangMatch[0], "")
            : currentPath;

        // Construct the new path with the selected language prefix
        const newPath = `/${selectedLang}${pathWithoutCurrentLang}${searchParams}${hashParams}`;
        //console.log('Navigating to new path:', newPath); // Debug log

        // Navigate to the new path
        navigate(newPath, { replace: true });
    };

    useEffect(() => {
        i18next.changeLanguage(selectedLanguage);
        localStorage.setItem("language", selectedLanguage);
    }, [selectedLanguage]);

    return (
        <header className="header-layout">
            <div className="header-container">
                <div className="links">
                    <a href="/about" className="link">
                        {t("ref.about-project")}
                    </a>
                    <a href="/contacts" className="link">
                        {t("ref.contacts")}
                    </a>
                </div>
                <div className="site-main-header-header-container">
                    <a href="/" style={{ textDecoration: "none" }}>
                        <div>
                            <SiteMainHeaderSpan size="md" />
                        </div>
                    </a>
                </div>
                <button
                    className="globus-button"
                    onClick={toggleMenu}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered ? <>
                        <img
                            src={globusIconHovered}
                            alt="Globus Icon"
                            className={isHovered ? "globus-hovered" : "globus"}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        />
                    </>
                        :
                        <>
                            <img
                                src={globusIcon}
                                alt="Globus Icon"
                                className={isHovered ? "globus-hovered" : "globus"}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            />
                        </>
                    }

                </button>
                {menuVisible && (
                    <div className="language-menu">
                        <ul>
                            <li
                                className={
                                    selectedLanguage === "ru" ? "active" : ""
                                }
                                onClick={() => handleLanguageSelect("ru")}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                        handleLanguageSelect("ru");
                                }}
                                role="option"
                                aria-selected={
                                    selectedLanguage === "ru" ? "true" : "false"
                                }
                                tabIndex={0}
                            >
                                Русский
                            </li>
                            <li
                                className={
                                    selectedLanguage === "be" ? "active" : ""
                                }
                                onClick={() => handleLanguageSelect("be")}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                        handleLanguageSelect("be");
                                }}
                                role="option"
                                aria-selected={
                                    selectedLanguage === "be" ? "true" : "false"
                                }
                                tabIndex={0}
                            >
                                Белорусский
                            </li>
                            <li
                                className={
                                    selectedLanguage === "de" ? "active" : ""
                                }
                                onClick={() => handleLanguageSelect("de")}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                        handleLanguageSelect("de");
                                }}
                                role="option"
                                aria-selected={
                                    selectedLanguage === "de" ? "true" : "false"
                                }
                                tabIndex={0}
                            >
                                Deutsch
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}

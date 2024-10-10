import { useState } from 'react';
import '../assets/styles/LandingPage.css'
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import HeaderLanding from '../components/layout/HeaderLanding';
import FooterLanding from '../components/layout/FooterLanding';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useLocalizedNavigate from '../utils/useLocalizedNavigate';


export default function LandingPage() {
    const { t } = useTranslation();
    const navigate = useLocalizedNavigate();
    let isLngWarn = false;
    const [searchInputValue, setSearchInputValue] = useState("");

    function clickGlobalSearchButton() {
        console.log(localStorage.getItem('language'), isLngWarn)


        if (searchInputValue !== "") {
            if (localStorage.getItem('language') !== "ru" && !isLngWarn) {
                isLngWarn = true;
                notification.warning({
                    message: t("errors.front-end.warning-search-title"),
                    description: t("errors.front-end.warning-search-description")
                })
            } else {
                //window.location.href = `/search?searchFor=${searchInputValue}`;
                navigate(`/search?searchFor=${encodeURIComponent(searchInputValue)}`);
            }

        } else {
            notification.warning({
                message: t("errors.front-end.empty-search-field"),
                description: t("errors.front-end.empty-search-field-description")
            })
        }

    }

    return (
        <>
            <HeaderLanding />
            <main className="main">

                <section className="section-background">
                    <div className="section-content">
                        <h1>
                            123{t('main.title.h1')}
                        </h1>
                        <h2> {t('main.title.h2-1')}</h2>
                        <h2> {t('main.title.h2-2')}</h2>
                        <h2> {t('main.title.h2-3')}</h2>
                        <div className='button-container-landing'>
                            <ButtonSubmit isColorsInverse={false} themeColor="yellow" href="/story" spanText={t("add-story.btn.add-story")} size="lg" />
                        </div>

                    </div>
                </section>

                <section className="section-search-and-links">
                    <div className="search-section">
                        <div className="search-section-container">
                            <h2>{t('search.title')}</h2>
                            <div className="search-bar">
                                <input type="text" value={searchInputValue}
                                    onChange={(event) => {
                                        setSearchInputValue(event.target.value);
                                    }}
                                    placeholder={t('search.placeholder')} />
                                <button class="search-button" onClick={clickGlobalSearchButton}>
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.6465 20.3536C19.8417 20.5489 20.1583 20.5489 20.3536 20.3536C20.5489 20.1583 20.5489 19.8417 20.3536 19.6465L19.6465 20.3536ZM13.8761 14.5832L19.6465 20.3536L20.3536 19.6465L14.5832 13.8761L13.8761 14.5832Z" fill="#E2D4C4" />
                                        <circle cx="8.37034" cy="8.37034" r="7.87034" stroke="#E2D4C4" />
                                    </svg>
                                    {t('search.btn')}
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="links-section">
                        <div className='links-section-container'>
                            <div className="link-item ">
                                <div className='line-container'>

                                    <button className="link-button item1"
                                        onClick={() => { navigate("/prisoners"); }}
                                    >{t('main.btn.stories')}</button>

                                    <p>{t("main.btn-description.stories")}</p>
                                </div>
                            </div>
                            <div className="link-item ">
                                <div className='line-container'>
                                    <button className="link-button item2"
                                        onClick={() => { navigate("/archive/photos"); }}
                                    >{t('main.btn.photo-archive')}</button>
                                    <p>{t("main.btn-description.photo-archive")}</p>
                                </div>
                            </div>
                            <div className="link-item ">
                                <div className='line-container'>
                                    <button className="link-button item3"
                                        onClick={() => { navigate("/map"); }}
                                    >{t('main.btn.places')}</button>
                                    <p>{t("main.btn-description.places")}</p>
                                </div>
                            </div>
                            <div className="link-item ">
                                <div className='line-container'>
                                    <button className="link-button item4" style={{ textTransform: "uppercase", fontSize: "22px" }}
                                        onClick={() => { navigate("/archive/analysis"); }}
                                    >{t('main.btn.legal-analysis')}</button>
                                    <p>{t("main.btn-description.legal-analysis")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >

                {/* <FooterLanding /> */}

            </main >



        </>
    )
}
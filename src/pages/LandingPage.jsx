import { useState } from 'react';
import '../assets/styles/LandingPage.css'
import ButtonSubmit from '../components/buttons/ButtonSubmit';
import HeaderLanding from '../components/layout/HeaderLanding';
import FooterLayout from '../components/layout/FooterLayout';
import FooterLanding from '../components/layout/FooterLanding';
import { useHref } from 'react-router-dom';
import { notification } from 'antd';
// import HeaderLayout from '../components/layout/HeaderLayout';
export default function LandingPage() {
    const [searchInputValue,setSearchInputValue] = useState("");

    function clickGlobalSearchButton(){
        if(searchInputValue!==""){
            window.location.href=`/search?searchFor=${searchInputValue}`;
        } else {
            notification.warning({
                message: 'Пустое поле поиска!',
                description: 'Пожалуйста, введите поисковой запрос в соответсвующее поле.'
            })
        }
    }

    return (
        <>
            <HeaderLanding />
            <main className="main">

                <section className="section-background">
                    <div className="section-content">
                        <h1>Память и боль Белорусской земли</h1>
                        <h2>нельзя забыть</h2>
                        <h2>нельзя понять</h2>
                        <h2>нельзя оправдать</h2>
                        <div className='button-container-landing'>
                            <ButtonSubmit isColorsInverse={false} themeColor="yellow" href="/story" spanText="ХОЧУ ДОБАВИТЬ ИСТОРИЮ" size="lg" />
                        </div>

                    </div>
                </section>

                <section className="section-search-and-links">
                    <div className="search-section">
                        <div className="search-section-container">
                            <h2>Поиск жертв геноцида</h2>
                            <div className="search-bar">
                                <input type="text" value={searchInputValue}
                                onChange={(event) => {
                                    setSearchInputValue(event.target.value);
                                  }}
                                placeholder="ФИО, концлагерь..." />
                                <button class="search-button" onClick={clickGlobalSearchButton}>
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.6465 20.3536C19.8417 20.5489 20.1583 20.5489 20.3536 20.3536C20.5489 20.1583 20.5489 19.8417 20.3536 19.6465L19.6465 20.3536ZM13.8761 14.5832L19.6465 20.3536L20.3536 19.6465L14.5832 13.8761L13.8761 14.5832Z" fill="#E2D4C4" />
                                        <circle cx="8.37034" cy="8.37034" r="7.87034" stroke="#E2D4C4" />
                                    </svg>
                                    Поиск
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="links-section">
                        <div className='links-section-container'>
                            <div className="link-item ">
                                <div className='line-container'>

                                    <button className="link-button item1"
                                        onClick={()=>{window.location.href="/prisoners";}}
                                    >ИСТОРИИ УЧАСТНИКОВ</button>

                                    <p>Какой-то текст об истории участников, откуда собраны, я не знаю, я художник - я так вижу, может всё-же надо описание, или не надо, ну вы решите и мне скажите, я буду ждать и всё поправлю.</p>
                                </div>
                            </div>
                            <div className="link-item ">
                                <div className='line-container'>
                                    <button className="link-button item2"
                                     onClick={()=>{window.location.href="/archive/photos";}}
                                    >ФОТОАРХИВ</button>
                                    <p>Какой-то текст о фотоархиве, источниках, я не знаю, я художник - я так вижу, может всё-же надо описание, или не надо, ну вы решите и мне скажите, я буду ждать и всё поправлю.</p>
                                </div>
                            </div>
                            <div className="link-item ">
                                <div className='line-container'>
                                    <button className="link-button item3"
                                    onClick={()=>{window.location.href="/map";}}
                                    >МЕСТА ГЕНОЦИДА НА КАРТЕ РБ</button>
                                    <p>Какой-то текст о карте с местами геноцида, откуда информация, я не знаю, я художник - я так вижу, может всё-же надо описание, или не надо, ну вы решите и мне скажите, я буду ждать и всё поправлю.</p>
                                </div>
                            </div>
                            <div className="link-item ">
                                <div className='line-container'>
                                    <button className="link-button item4" style={{textTransform:"uppercase",fontSize:"22px"}}
                                    onClick={()=>{window.location.href="/archive/analysis";}}
                                    >Правовой анализ событий геноцида белорусского народа в 1941-1945 гг.</button>
                                    <p>Какой-то текст о правовом анализе событий геноцида, откуда информация, я не знаю, я художник - я так вижу, может всё-же надо описание, или не надо, ну вы решите и мне скажите, я буду ждать и всё поправлю.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >

                <FooterLanding />

            </main >



        </>
    )
}
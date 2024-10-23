import { React, useEffect, useState } from 'react';
import '../../assets/styles/forms/SearchResults.css'
import '../../assets/styles/forms/PrisonerSearchResult.css'
import xIcon from '../../assets/vectors/x-icon.svg';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import HeaderSection from '../other/HeaderSection';
import useLocalizedNavigate from '../../utils/useLocalizedNavigate';

export default function SearchResults({ arrayFoundObjects }) {
    const { t } = useTranslation();
    const navigate = useLocalizedNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const searchForValue = searchParams.get('searchFor') || ""; // Default to "" if 'searchFor' is not present

    const [searchInputValue, setSearchInputValue] = useState(searchForValue);
    const [selectedFilter, setSelectedFilter] = useState(t('search.parameters.show-all'));
    const [filteredObjects, setFilteredObjects] = useState(arrayFoundObjects);

    function clickGlobalSearchButton() {
        if (searchInputValue !== "") {
            //window.location.href = `/search?searchFor=${searchInputValue}`;
            navigate(`/search?searchFor=${encodeURIComponent(searchInputValue)}`);
            window.location.reload();
        } else {
            notification.warning({
                message: t('errors.front-end.empty-search-field'),
                description: t('errors.front-end.empty-search-field-description'),
            })
        }
    }

    function clickDeleteInputBtn() {
        if (searchInputValue !== "") {
            setSearchInputValue("");
        } else {
            notification.warning({
                message: t('errors.front-end.empty-search-field'),
                description: t('errors.front-end.empty-search-field-description'),
            })
        }
    }

    useEffect(() => {
        const inputs = document.querySelectorAll('#sort-arrayFoundObjects');
        const lists = document.querySelectorAll('.list');
        const listItems = document.querySelectorAll('.list li');

        //console.log(inputs)

        const handleInputClick = (event) => {
            hideList();
            event.target.nextElementSibling.style.display = 'block';
        };

        const handleListMouseLeave = (event) => {
            event.target.style.display = 'none';
        };

        const handleListItemClick = (event) => {
            const value = event.target.textContent;
            setSelectedFilter(value);
            filterHistories(value);
        };

        inputs.forEach((elem) => {
            elem.addEventListener('click', handleInputClick);
        });

        lists.forEach((elem) => {
            elem.addEventListener('mouseleave', handleListMouseLeave);
        });

        listItems.forEach((elem) => {
            elem.addEventListener('click', handleListItemClick);
        });

        function hideList() {
            lists.forEach((elem) => {
                elem.style.display = 'none';
            });
        }

        // Cleanup event listeners on component unmount
        return () => {
            inputs.forEach((elem) => {
                elem.removeEventListener('click', handleInputClick);
            });
            lists.forEach((elem) => {
                elem.removeEventListener('mouseleave', handleListMouseLeave);
            });
            listItems.forEach((elem) => {
                elem.removeEventListener('click', handleListItemClick);
            });
        };
    }, []);

    const filterHistories = (value) => {
        if (value === t('search.parameters.show-all')) {
            setFilteredObjects(arrayFoundObjects);
        } else if (value === t('search.parameters.places')) {
            setFilteredObjects(arrayFoundObjects.filter(obj => obj.type === 'places'));
        } else if (value === t('search.parameters.prisoners')) {
            setFilteredObjects(arrayFoundObjects.filter(obj => obj.type === 'humans'));
        }
    };

    return (
        <div className='section-search-result'>
            <section className='section-form-search-result'>

                <HeaderSection
                    textFirst={t('ref.main')}
                    textSecond={t('search.header')}
                    isMarginLeftText={true}
                />

                <div className='container-form-search-result'>
                    <div className="search-bar-search-result">
                        <input type="text" placeholder={t('search.placeholder')}
                            value={searchInputValue}
                            onChange={(event) => {
                                setSearchInputValue(event.target.value);
                            }}
                        />
                        <button
                            onClick={clickDeleteInputBtn}
                            onKeyDown={(e) => { if (e.key === 'Enter') clickDeleteInputBtn }}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} // Убираем стили кнопки
                            tabIndex={0}  // Делаем элемент фокусируемым
                        >
                            <img
                                src={xIcon}
                                alt="delete"

                            />
                        </button>
                        <button onClick={clickGlobalSearchButton}>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.6465 20.3536C19.8417 20.5489 20.1583 20.5489 20.3536 20.3536C20.5489 20.1583 20.5489 19.8417 20.3536 19.6465L19.6465 20.3536ZM13.8761 14.5832L19.6465 20.3536L20.3536 19.6465L14.5832 13.8761L13.8761 14.5832Z" fill="#E2D4C4" />
                                <circle cx="8.37034" cy="8.37034" r="7.87034" stroke="#E2D4C4" />
                            </svg>
                        </button>

                    </div>
                </div>

                <div className='container-result-search-result'>
                    <span>{t('search.number-of-results')} {filteredObjects.length}</span>

                    <div className='container-result-search-result-for-filter'>
                        <input className='input-filter' type="text" name="sort-arrayFoundObjects" id="sort-arrayFoundObjects" value={selectedFilter} readonly />
                        <ul class="list">
                            <li>{t('search.parameters.show-all')}</li>
                            <li>{t('search.parameters.places')}</li>
                            <li>{t('search.parameters.prisoners')}</li>
                        </ul>
                    </div>
                </div>

            </section>
            {/* ADD TOP BORDER TO THIS */}
            <section className='section-register-search-result'>
                {filteredObjects.map((obj) => (
                    <div className='result-container-search-result' key={obj.id}>
                        <button
                            onClick={() => {
                                const hrefString = obj.type === "humans" ? "/search/prisoner/" : "/search/place/";
                                navigate(hrefString + obj.id);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const hrefString = obj.type === "humans" ? "/search/prisoner/" : "/search/place/";
                                    navigate(hrefString + obj.id);
                                }
                            }}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} // Убираем стили кнопки
                            tabIndex={0}  // Делаем элемент фокусируемым
                        >
                            <img
                                src={obj.img}
                                alt={" #" + 1}

                            />
                        </button>
                        <div className='result-container-search-result-description'>
                            <h3>{obj.header}</h3>
                            <span>{obj.description}</span>
                        </div>
                    </div>
                ))}

            </section>

        </div>
    )
}
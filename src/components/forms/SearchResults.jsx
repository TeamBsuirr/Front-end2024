import { React, useEffect, useState } from 'react';
import '../../assets/styles/forms/SearchResults.css'
import '../../assets/styles/forms/PrisonerSearchResult.css'


import xIcon from '../../assets/vectors/x-icon.svg';
import { notification } from 'antd';

export default function SearchResults({ arrayFoundObjects }) {
    const [searchInputValue, setSearchInputValue] = useState("");
    const [selectedFilter, setSelectedFilter] = useState('Показать всё');
    const [filteredObjects, setFilteredObjects] = useState(arrayFoundObjects);

    function clickGlobalSearchButton() {
        if (searchInputValue !== "") {
            window.location.href = `/search?searchFor=${searchInputValue}`;
        } else {
            notification.warning({
                message: 'Пустое поле поиска!',
                description: 'Пожалуйста, введите поисковой запрос в соответсвующее поле.'
            })
        }
    }

    useEffect(() => {
        const inputs = document.querySelectorAll('#sort-arrayFoundObjects');
        const lists = document.querySelectorAll('.list');
        const listItems = document.querySelectorAll('.list li');

        console.log(inputs)

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
        if (value === 'Показать всё') {
            setFilteredObjects(arrayFoundObjects);
        } else if (value === 'Концлагеря') {
            setFilteredObjects(arrayFoundObjects.filter(obj => obj.type === 'places'));
        } else if (value === 'Узники') {
            setFilteredObjects(arrayFoundObjects.filter(obj => obj.type === 'humans'));
        }
    };

    return (
        <div className='section-search-result'>
            <section className='section-form-search-result'>

                <div className='header-container-search-result'>

                    <h2 className='span-of-section'>
                        Главная
                    </h2>
                    <h1 className='header-of-section'>

                        ПОИСК
                    </h1>
                </div>



                <div className='container-form-search-result'>
                    <div className="search-bar-search-result">
                        <input type="text" placeholder="ФИО, концлагерь..."
                            value={searchInputValue}
                            onChange={(event) => {
                                setSearchInputValue(event.target.value);
                            }}
                        />
                        <img src={xIcon} alt="X-ICON" />

                        <button onClick={clickGlobalSearchButton}>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.6465 20.3536C19.8417 20.5489 20.1583 20.5489 20.3536 20.3536C20.5489 20.1583 20.5489 19.8417 20.3536 19.6465L19.6465 20.3536ZM13.8761 14.5832L19.6465 20.3536L20.3536 19.6465L14.5832 13.8761L13.8761 14.5832Z" fill="#E2D4C4" />
                                <circle cx="8.37034" cy="8.37034" r="7.87034" stroke="#E2D4C4" />
                            </svg>
                        </button>

                    </div>
                </div>

                <div className='container-result-search-result'>
                    <span>Найдено результатов: {filteredObjects.length}</span>

                    <div className='container-result-search-result-for-filter'>
                        <input className='input-filter' type="text" name="sort-arrayFoundObjects" id="sort-arrayFoundObjects" value={selectedFilter} readonly />
                        <ul class="list">
                            <li>Показать всё</li>
                            <li>Концлагеря</li>
                            <li>Узники</li>
                        </ul>
                    </div>
                </div>

            </section>
            {/* ADD TOP BORDER TO THIS */}
            <section className='section-register-search-result'>
                {filteredObjects.map((obj) => (
                    <div className='result-container-search-result' key={obj.id}>
                        <img src={obj.img} alt={"image #" + 1} onClick={() => {
                            const hrefString = obj.type === "humans" ? "/search/prisoner/" : "/search/place/";
                            window.location.href = hrefString + obj.id;
                        }} />
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
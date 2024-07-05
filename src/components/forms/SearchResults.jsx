import { React } from 'react';
import '../../assets/styles/forms/SearchResults.css'

import InputForm from '../inputs/InputForm';
import DateForm from '../inputs/DateForm';
import InputDescription from '../inputs/InputDescription';
import ButtonSubmit from '../buttons/ButtonSubmit';
import Image4 from '../../assets/images/Image4.jpeg'

import xIcon from '../../assets/vectors/x-icon.svg';

export default function SearchResults() {
    const arrayOfResults = [
        {
            img: Image4,
            header: "Ивано Петр Иванович",
            description: "текст текст текст текст текст текст текст текст текст текст текст текст текст текст...",
        },
        {
            img: Image4,
            header: "Ивано Петр Иванович",
            description: "текст текст текст текст текст текст текст текст текст текст текст текст текст текст...",
        },
        {
            img: Image4,
            header: "Ивано Петр Иванович",
            description: "текст текст текст текст текст текст текст текст текст текст текст текст текст текст...",
        },
        {
            img: Image4,
            header: "Ивано Петр Иванович",
            description: "текст текст текст текст текст текст текст текст текст текст текст текст текст текст...",
        },
        {
            img: Image4,
            header: "Ивано Петр Иванович",
            description: "текст текст текст текст текст текст текст текст текст текст текст текст текст текст...",
        },
        {
            img: Image4,
            header: "Ивано Петр Иванович",
            description: "текст текст текст текст текст текст текст текст текст текст текст текст текст текст...",
        },

    ]
    const obj = {
        firstName: "",
        lastName: "",
        dataOfBirth: "",
        placeOfBirt: "",
        placeOfStay: "",
        startDateOfSt: "",
        endDateOfStay: ""
    }
    function functionSumbit() {
        return 1;
    }
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
                        <input type="text" placeholder="ФИО, концлагерь..." />
                        <img src={xIcon} alt="X-ICON" />

                        <button onClick={() => { window.location.href = "/search"; }}>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.6465 20.3536C19.8417 20.5489 20.1583 20.5489 20.3536 20.3536C20.5489 20.1583 20.5489 19.8417 20.3536 19.6465L19.6465 20.3536ZM13.8761 14.5832L19.6465 20.3536L20.3536 19.6465L14.5832 13.8761L13.8761 14.5832Z" fill="#E2D4C4" />
                                <circle cx="8.37034" cy="8.37034" r="7.87034" stroke="#E2D4C4" />
                            </svg>
                        </button>

                    </div>
                </div>

                <div className='container-result-search-result'>
                    <span>Найдено результатов: 5</span>
                </div>

            </section>
            {/* ADD TOP BORDER TO THIS */}
            <section className='section-register-search-result'>
                {arrayOfResults.map((obj, index) => (
                    <div className='result-container-search-result' key={index}>
                        <img src={obj.img} alt={"image #" + index} onClick={() => { window.location.href = "/search/prisoner/"+index; }} />
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
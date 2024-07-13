import { React, useEffect, useRef } from 'react';
// import '../../assets/styles/forms/SearchResults.css'
import '../../assets/styles/forms/PrisonerSearchResult.css'
import InputForm from '../inputs/InputForm';
import DateForm from '../inputs/DateForm';
import InputDescription from '../inputs/InputDescription';
import ButtonSubmit from '../buttons/ButtonSubmit';
import Image4 from '../../assets/images/Image4.jpeg'

import xIcon from '../../assets/vectors/x-icon.svg';

export default function PrisonerSearchResult() {
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

  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    const lists = document.querySelectorAll('.list');
    const listItems = document.querySelectorAll('.list li');

    const handleInputClick = (event) => {
      hideList();
      event.target.nextElementSibling.style.display = 'block';
    };

    const handleListMouseLeave = (event) => {
      event.target.style.display = 'none';
    };

    const handleListItemClick = (event) => {
      event.target.closest('.list').previousElementSibling.value = event.target.textContent;
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

  return (
    <div className='section-search-result'>
      <section className='section-form-search-result'>

        <div className='header-container-search-result-prisoners'>
          <div className='span-of-section-prisoners'>

          </div>
          <div className='header-of-section-prisoners'>
            ИСТОРИИ УЧАСТНИКОВ
          </div>
        </div>

        <div className='container-description-prisoners'>
          <span>Истории, собранные из каких-то источников, а также добавленные пользователями и тд текст текст текст текст текст текст текст </span>
        </div>

      </section>
      {/* ADD TOP BORDER TO THIS */}
      <section className='section-register-search-result'>

        <div class="container">
          <div class="sort-field">
            <div class="place">
              <input className='input-filter' type="text" name="sort-place" id="sort-place" value="Все места пребывания" readonly />
              <ul class="list">
                <li>Концлагерь</li>
                <li>Концлагерь</li>
                <li>Концлагерь</li>
                <li>Все места пребывания</li>
              </ul>
            </div>
            <div class="calendar">
              <input className='input-filter' type="text" name="sort-calendar" id="sort-calendar" value="Все года" readonly />
              <ul class="list">
                <li>1941</li>
                <li>1942</li>
                <li>1943</li>
                <li>1944</li>
                <li>1945</li>
                <li>Все года</li>
              </ul>
            </div>
            <div class="alphabet">
              <input className='input-filter' type="text" name="sort-alphabet" id="sort-alphabet" value="По алфавиту" readonly />
              <ul class="list">
                <li>По алфавиту</li>
                <li>По дате добавления</li>
              </ul>
            </div>
          </div>
        </div>

        {arrayOfResults.map((obj, index) => (
          <div className='result-container-search-result' key={index}>
            <img src={obj.img} alt={"image #" + index} onClick={() => { window.location.href = "/search/prisoner/" + index; }} />
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
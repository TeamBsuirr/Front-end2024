import { React,useEffect, useRef } from 'react';
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
    // function functionSumbit() {
    //     return 1;
    // }

    const inputRefs = useRef([]);
    const listRefs = useRef([]);
  
    useEffect(() => {
      const hideList = () => {
        listRefs.current.forEach(list => {
          list.style.display = 'none';
        });
      };
  
      inputRefs.current.forEach(input => {
        input.addEventListener('click', () => {
          hideList();
          const nextList = input.nextElementSibling;
          if (nextList && nextList.classList.contains('list')) {
            nextList.style.display = 'block';
          }
        });
      });
  
      listRefs.current.forEach(list => {
        list.addEventListener('mouseleave', () => {
          list.style.display = 'none';
        });
      });
  
      listRefs.current.forEach(list => {
        const listItems = list.querySelectorAll('li');
        listItems.forEach(item => {
          item.addEventListener('click', (ev) => {
            const input = list.previousElementSibling;
            if (input && input.tagName.toLowerCase() === 'input') {
              input.value = item.textContent;
            }
          });
        });
      });
  
      // Cleanup event listeners on component unmount
      return () => {
        inputRefs.current.forEach(input => {
          input.removeEventListener('click', hideList);
        });
        listRefs.current.forEach(list => {
          list.removeEventListener('mouseleave', hideList);
          const listItems = list.querySelectorAll('li');
          listItems.forEach(item => {
            item.removeEventListener('click', hideList);
          });
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
                        ПОИСК


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
                            <input type="text" name="sort-place" id="sort-place" value="Все места пребывания" readonly />
                                <ul class="list">
                                    <li>Концлагерь</li>
                                    <li>Концлагерь</li>
                                    <li>Концлагерь</li>
                                    <li>Все места пребывания</li>
                                </ul>
                        </div>
                        <div class="calendar">
                            <input type="text" name="sort-calendar" id="sort-calendar" value="Все года" readonly />
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
                            <input type="text" name="sort-alphabet" id="sort-alphabet" value="По алфавиту" readonly />
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
import { React, useEffect, useState } from 'react';
// import '../../assets/styles/forms/SearchResults.css'
import '../../assets/styles/forms/PrisonerSearchResult.css'

export default function PrisonerSearchResult({ histories, places, years }) {

  const [filteredHistories, setFilteredHistories] = useState(histories);
  const [selectedPlace, setSelectedPlace] = useState('Все места пребывания');
  const [selectedCalendar, setSelectedCalendar] = useState('Все года');
  const [selectedAlphabet, setSelectedAlphabet] = useState('По алфавиту');

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
      const input = event.target.closest('.list').previousElementSibling;
      input.value = event.target.textContent;

      console.log("вставить значение фильтра: ", event.target.textContent)
      if (input.name === 'sort-place') {
        console.log("вставил 1")
        setSelectedPlace(event.target.textContent);
      } else if (input.name === 'sort-calendar') {
        console.log("вставил 2")
        setSelectedCalendar(event.target.textContent);
      } else if (input.name === 'sort-alphabet') {
        console.log("вставил 3")
        setSelectedAlphabet(event.target.textContent);
      }

      filterHistories(event.target.textContent, input.name);
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

  const filterHistories = (value, type) => {
    let updatedHistories = [...histories];

    if (type === 'sort-place') {
      setSelectedPlace(value);
      if (value !== 'Все места пребывания') {
        updatedHistories = updatedHistories.filter(obj => obj.places.includes(value));
      }
    }
  
    if (type === 'sort-calendar') {
      setSelectedCalendar(value);
      if (value !== 'Все года') {
        updatedHistories = updatedHistories.filter(obj => obj.years.includes(value));
      }
    }

    if (type === 'sort-alphabet') {
      if (value === 'По алфавиту') {
        updatedHistories = updatedHistories.sort((a, b) => a.header.localeCompare(b.header));
      } else if (value === 'С конца алфавита') {
        updatedHistories = updatedHistories.sort((a, b) => b.header.localeCompare(a.header));
      } else if (value === 'По дате добавления') {
        updatedHistories = updatedHistories.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      }
    }

    setFilteredHistories(updatedHistories);
  };

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
              <input className='input-filter' type="text" name="sort-place" id="sort-place" value={selectedPlace} readonly />
              <ul class="list">
                {places.map((place, index) => (
                  <li key={index}>{place}</li>
                ))}
                <li>Все места пребывания</li>
              </ul>
            </div>
            <div class="calendar">
              <input className='input-filter' type="text" name="sort-calendar" id="sort-calendar" value={selectedCalendar} readonly />
              <ul class="list">
                {years.map((year, index) => (
                  <li key={index}>{year}</li>
                ))}
                <li>Все года</li>
              </ul>
            </div>
            <div class="alphabet">
              <input className='input-filter' type="text" name="sort-alphabet" id="sort-alphabet" value={selectedAlphabet} readonly />
              <ul class="list">
                <li>По алфавиту</li>
                <li>С конца алфавита</li>
                <li>По дате добавления</li>
              </ul>
            </div>
          </div>
        </div>

        {filteredHistories.map((obj) => (
          <div className='result-container-search-result' key={obj.id}>
            <img src={obj.img} alt={"image #" + 1} onClick={() => { window.location.href = "/search/prisoner/" + obj.id; }} />
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
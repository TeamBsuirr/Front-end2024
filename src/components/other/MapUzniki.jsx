import { React, useCallback, useEffect, useRef, useState } from 'react';
import '../../assets/styles/other/Map.css';
import { useTranslation } from 'react-i18next';
import HeaderSection from './HeaderSection';
import ButtonSubmit from '../buttons/ButtonSubmit';
import closeSvg from '../../assets/images/icons/other/close.svg';
import PlaceMarkIcon from '../../assets/images/icons/other/star.svg';


export default function MapUzniki({isAdmin,arrayOfPlaceMarks,passedPlace}) {
  const { t } = useTranslation();
  const mapRef = useRef(null); // Контейнер для карты
  const [activePlace, setActivePlace] = useState(passedPlace);

  // Обработчик клика на метку
  const handlePlacemarkClick = useCallback((place, e) => {
    e.stopPropagation();
    setActivePlace(place); // Устанавливаем активное место
  }, []);

  useEffect(() => {
    const loadYandexMap = () => {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${process.env.REACT_APP_YANDEX_API_KEY}`;
      script.onload = () => {
        window.ymaps.ready(init);
      };
      document.body.appendChild(script);
    };

    const init = () => {
      const map = new window.ymaps.Map(mapRef.current, {
        center: [53.551244, 27.668423], // Координаты центра карты (Минск)
        zoom: 7,
      });

      // Кастомный макет для hint (подсказки)
      const customHintLayout = window.ymaps.templateLayoutFactory.createClass(
        '<div style="display: flex; width: max-content;height: 40px; box-sizing: border-box;align-items: center; color: #E4B474; background-color: #4D4B48; opacity: 0.9; border-radius: 10px; padding: 10px; color: white;">{{ properties.hintContent }}</div>'
      );

      // Добавляем метки из массива arrayOfPlaceMarks
      arrayOfPlaceMarks.forEach((place) => {
        const placemark = new window.ymaps.Placemark(
          [place.coordinates.latitude, place.coordinates.longitude],
          {
            hintContent: place.placeName, // Hint при наведении
          },
          {
            iconLayout: 'default#image',
            iconImageHref: PlaceMarkIcon, // Кастомная иконка
            iconImageSize: [30, 30], // Изменяем размер иконки для активной метки
            iconImageOffset: [-15, -15],
            hintLayout: customHintLayout, // Применяем кастомный hint
          }
        );

        // Добавляем обработчик клика для метки
        placemark.events.add('click', (e) => handlePlacemarkClick(place, e));
        

        // Добавляем обработчик наведения (hover) — увеличение иконки
        placemark.events
        .add('mouseenter', () => {
          placemark.options.set({
            iconImageSize: [40, 40], // Увеличиваем размер иконки при наведении
            iconImageOffset: [-20, -20], // Корректируем смещение
          });
        })
        .add('mouseleave', () => {
          placemark.options.set({
            iconImageSize: [30, 30], // Возвращаем стандартный размер иконки
            iconImageOffset: [-15, -15],
          });
        });

        // В бой  
        map.geoObjects.add(placemark);
      });

      // Если передано passedPlace, выделяем его
      if (passedPlace) {
        // Центрируем карту на выбранную метку
        map.setCenter([passedPlace.coordinates.latitude, passedPlace.coordinates.longitude], 12);
      }
    };

    loadYandexMap();


    return () => {
      if (window.ymaps && mapRef.current) {
        window.ymaps.destroy(mapRef.current);
      }
    };
  }, [arrayOfPlaceMarks, passedPlace]);



  return (

    <div className='section-map-page'>
      <section className='section-map-header'>
        <HeaderSection textFirst={t('map.header')} />
        {isAdmin ? (
          <div className='container-description-map-admin'>
            <span>{t('map.additional-text')}</span>
            <div className='admin-btn-container'>
              <ButtomAdmin
                isColorsInverse={false}
                themeColor='black'
                href={`/crud/place`}
                spanText={t('admin-panel.btn.add-camp')}
                size='m'
              />
            </div>
          </div>
        ) : (
          <div className='container-description-map'>
            <span>{t('map.additional-text')}</span>
          </div>
        )}
      </section>

       <section className='section-map'>
        <div className='container-map'>
          <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
        </div>
       </section>

       {activePlace && (<>
          <div className='active-place'>
            <div className='header-active-place'>
              <img src={closeSvg} alt="close icon" onClick={() => setActivePlace(null)} />
            </div>
            <div className='container-active-place'>
              <div className='content-active-place'>
                <div className='container-image-active-place'>
                  <img src={activePlace.previewImg} alt="image of place" />
                </div>
                <div className='container-text-active-place'>
                  <h2>
                    {activePlace.placeName}
                  </h2>
                  <ul>
                    <li>
                      <h3>{t('map.card.location')}: </h3>
                      <span>{activePlace.locationDescription}</span>
                    </li>
                    <li>
                      <h3>{t('map.card.description')}: </h3>
                      <span>{activePlace.shortDescription}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='container-button-selected-place'>
              <ButtonSubmit
                isColorsInverse={true}
                themeColor="yellow"
                href={"/search/place/" + activePlace.id}
                spanText={t("map.card.btn")}
                
                size />
            </div>
          </div>
        </>)}
     </div>
  );
}

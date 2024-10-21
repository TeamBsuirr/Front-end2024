import { React, useEffect, useRef, useState } from 'react';
import '../../assets/styles/other/Map.css';
import { useTranslation } from 'react-i18next';
import ButtomAdmin from '../buttons/ButtonAdmin';
import HeaderSection from './HeaderSection';

export default function MapUzniki({ arrayOfPlaceMarks, passedPlace, isAdmin = false }) {
  const { t } = useTranslation();
  const mapRef = useRef(null); // Контейнер для карты
  const [map, setMap] = useState(null);
  const [ymapsInstance, setYmapsInstance] = useState(null);

  // Функция для загрузки API Яндекс.Карт
  const loadYandexMaps = () => {
    return new Promise((resolve) => {
      if (window.ymaps) {
        resolve(window.ymaps);
      } else {
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.REACT_APP_YANDEX_API_KEY}&lang=ru_RU`;
        script.onload = () => {
          window.ymaps.ready(() => {
            resolve(window.ymaps);
          });
        };
        document.head.appendChild(script);
      }
    });
  };

  useEffect(() => {
    if (mapRef.current) {
      const initializeMap = async () => {
        const ymaps = await loadYandexMaps();
        setYmapsInstance(ymaps);
        
        if (!map) {
          const initialCenter = passedPlace
            ? [passedPlace.coordinates.latitude, passedPlace.coordinates.longitude]
            : [53.55, 27.66];

          const mapInstance = new ymaps.Map(mapRef.current, {
            center: initialCenter,
            zoom: 10,
            controls: ['zoomControl', 'fullscreenControl'],
          });

          setMap(mapInstance);
        }
      };
      initializeMap();
    }
  }, [passedPlace, mapRef.current]); // Гарантия инициализации карты только после загрузки контейнера

  useEffect(() => {
    if (ymapsInstance && map) {
      // Удаление старых меток перед добавлением новых
      map.geoObjects.removeAll();

      // Добавление новых меток
      arrayOfPlaceMarks.forEach((place) => {
        const placemark = new ymapsInstance.Placemark(
          [place.coordinates.latitude, place.coordinates.longitude],
          {
            hintContent: place.placeName,
            balloonContent: place.shortDescription,
          }
        );
        map.geoObjects.add(placemark);
      });

      if (passedPlace) {
        map.setCenter([passedPlace.coordinates.latitude, passedPlace.coordinates.longitude], 10);
      }
    }
  }, [arrayOfPlaceMarks, passedPlace, ymapsInstance, map]);

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
          <div ref={mapRef} className="map-container" style={{ width: '100%', height: '100%' }} /> {/* Стили через класс */}
        </div>
      </section>
    </div>
  );
}

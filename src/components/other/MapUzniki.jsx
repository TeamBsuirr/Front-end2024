import { React, useCallback, useEffect, useState } from 'react';
import '../../assets/styles/other/Map.css'
import PlaceMarkIcon from '../../assets/images/icons/other/star.svg'
import closeSvg from '../../assets/images/icons/other/close.svg'
import ButtonSubmit from '../buttons/ButtonSubmit';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { useTranslation } from 'react-i18next';
import ButtomAdmin from '../buttons/ButtonAdmin';
import HeaderSection from './HeaderSection';

export default function MapUzniki({ arrayOfPlaceMarks, passedPlace, isAdmin = false }) {
  const { t } = useTranslation();
  const [activePlace, setActivePlace] = useState(passedPlace);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapKey, setMapKey] = useState(Date.now()); // Dynamic key for Map to force re-render

  // Handler function for setting the active place
  const handlePlacemarkClick = useCallback((place, e) => {
    e.stopPropagation();
    setActivePlace(place);
  }, []);

  // Ensure map is fully loaded before allowing interaction with placemarks
  const handleMapLoad = () => {
    console.log('Map fully loaded');
    setIsMapLoaded(true);
  };

  // Trigger re-render of map when arrayOfPlaceMarks changes
  useEffect(() => {
    if (arrayOfPlaceMarks.length > 0) {
      setMapKey(Date.now()); // Force Map re-render by changing key
    }

     // Очистка при размонтировании компонента
     return () => {
      console.log('Component unmounting: cleaning up resources');
      // Здесь можно добавить логику очистки, например, удаление обработчиков событий
    };
  }, [arrayOfPlaceMarks]);

  return (
    <div className='section-map-page'>
      <section className='section-map-header'>

        <HeaderSection
          textFirst={t('map.header')}
        />

        {isAdmin ?
          <>
            <div className='container-description-map-admin'>
              <span>{t('map.additional-text')}</span>
              <div className='admin-btn-container'>
                <ButtomAdmin isColorsInverse={false} themeColor="black" href={`/crud/place`} spanText={t('admin-panel.btn.add-camp')} size="m" />
              </div>
            </div>
          </>
          :
          <div className='container-description-map'>
            <span>{t('map.additional-text')}</span>
          </div>
        }


      </section>
      {/* ADD TOP BORDER TO THIS */}
      <section className='section-map'>

        <div className='container-map'>
          <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_API_KEY, lang: 'ru_RU', load: 'Map,Placemark' }}>
              <Map
              key={mapKey}
              width={1320}
              height={627}
              defaultState={{
                center: passedPlace
                  ? [passedPlace.coordinates.latitude, passedPlace.coordinates.longitude]
                  : [53.55, 27.66],
                zoom: 6.5,
              }}
              options={{
                optimizeMemoryUsage: true,
                suppressMapOpenBlock: true, // отключает открытия панели "Яндекс.Карты"
                autoFitToViewport: 'always', // карта всегда будет подстраиваться под размер контейнера
                // controls: [] // убирает все контролы на карте, если они не нужны
              }}
              onLoad={handleMapLoad} // Ensure map is fully loaded
            >
             {isMapLoaded  && // Render placemarks only after the map is fully loaded
                arrayOfPlaceMarks.map((obj) => (
                  <Placemark
                    key={obj.id}
                    geometry={[obj.coordinates.latitude, obj.coordinates.longitude]}
                    options={{
                      
                      iconLayout: 'default#image',
                      iconImageHref: PlaceMarkIcon,
                      iconImageSize: obj.id === activePlace?.id ? [40, 40] : [30, 30],
                      iconImageOffset: obj.id === activePlace?.id ? [-20, -20] : [-15, -15],

        
                    }}
                    onClick={(e) => handlePlacemarkClick(obj, e)}
                  />
                ))}
            </Map>
          </YMaps>
        </div>


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
                onClick={() => { 1; }}
                size />
            </div>
          </div>
        </>)}
      </section>

    </div>

  )
}
import { React, useCallback, useState } from 'react';
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

  // Handler function for setting the active place
//   const handlePlacemarkClick = (place, e) => {
//     e.stopPropagation();
//     setActivePlace(place);
// };

  const handlePlacemarkClick = useCallback((place, e) => {
    e.stopPropagation();
    setActivePlace(place);
  }, []);

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
          <YMaps>
            {/* <Map
              width={1320}
              height={627}
              defaultState={{ center: passedPlace ? [passedPlace.coordinates.latitude, passedPlace.coordinates.longitude] : [53.55, 27.66], zoom: 6.5 }}
            > */}
              <Map
              width={1320}
              height={627}
              defaultState={{
                center: passedPlace
                  ? [passedPlace.coordinates.latitude, passedPlace.coordinates.longitude]
                  : [53.55, 27.66],
                zoom: 6.5,
              }}
              onLoad={(ymaps) => console.log('Map loaded')} // Ensure map is fully loaded
            >
              {arrayOfPlaceMarks.map((obj) => (
                <Placemark
                  key={obj.id}
                  geometry={[obj.coordinates.latitude, obj.coordinates.longitude]}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: PlaceMarkIcon,
                    iconImageSize: obj.id === activePlace?.id ? [40, 40] : [30, 30],  // Increase size if active
                    iconImageOffset: obj.id === activePlace?.id ? [-20, -20] : [-15, -15],
                  }}
                  onClick={(e) => handlePlacemarkClick(obj,e)}
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
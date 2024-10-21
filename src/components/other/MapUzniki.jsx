// // import { React, useCallback, useEffect, useState } from 'react';
// // import '../../assets/styles/other/Map.css'
// // import PlaceMarkIcon from '../../assets/images/icons/other/star.svg'
// // import closeSvg from '../../assets/images/icons/other/close.svg'
// // import ButtonSubmit from '../buttons/ButtonSubmit';
// // import { Map, Placemark, YMaps } from 'react-yandex-maps';
// // import { useTranslation } from 'react-i18next';
// // import ButtomAdmin from '../buttons/ButtonAdmin';
// // import HeaderSection from './HeaderSection';

// // export default function MapUzniki({ arrayOfPlaceMarks, passedPlace, isAdmin = false }) {
// //   const { t } = useTranslation();
// //   const [activePlace, setActivePlace] = useState(passedPlace);
// //   const [isMapLoaded, setIsMapLoaded] = useState(false);
// //   const [mapKey, setMapKey] = useState(Date.now()); // Dynamic key for Map to force re-render

// //   // Handler function for setting the active place
// //   const handlePlacemarkClick = useCallback((place, e) => {
// //     e.stopPropagation();
// //     setActivePlace(place);
// //   }, []);

// //   // Ensure map is fully loaded before allowing interaction with placemarks
// //   const handleMapLoad = () => {
// //     console.log('Map fully loaded');
// //     setIsMapLoaded(true);
// //   };

// //   // Trigger re-render of map when arrayOfPlaceMarks changes
// //   useEffect(() => {
// //     if (arrayOfPlaceMarks.length > 0) {
// //       setMapKey(Date.now()); // Force Map re-render by changing key
// //     }

// //      // Очистка при размонтировании компонента
// //      return () => {
// //       console.log('Component unmounting: cleaning up resources');
// //       // Здесь можно добавить логику очистки, например, удаление обработчиков событий
// //     };
// //   }, [arrayOfPlaceMarks]);

// //   return (
// //     <div className='section-map-page'>
// //       <section className='section-map-header'>

// //         <HeaderSection
// //           textFirst={t('map.header')}
// //         />

// //         {isAdmin ?
// //           <>
// //             <div className='container-description-map-admin'>
// //               <span>{t('map.additional-text')}</span>
// //               <div className='admin-btn-container'>
// //                 <ButtomAdmin isColorsInverse={false} themeColor="black" href={`/crud/place`} spanText={t('admin-panel.btn.add-camp')} size="m" />
// //               </div>
// //             </div>
// //           </>
// //           :
// //           <div className='container-description-map'>
// //             <span>{t('map.additional-text')}</span>
// //           </div>
// //         }


// //       </section>
// //       {/* ADD TOP BORDER TO THIS */}
// //       <section className='section-map'>

// //         <div className='container-map'>
// //           <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_API_KEY, lang: 'ru_RU', load: 'Map,Placemark' }}>
// //               <Map
// //               key={mapKey}
// //               width={1320}
// //               height={627}
// //               defaultState={{
// //                 center: passedPlace
// //                   ? [passedPlace.coordinates.latitude, passedPlace.coordinates.longitude]
// //                   : [53.55, 27.66],
// //                 zoom: 6.5,
// //               }}
// //               options={{
// //                 optimizeMemoryUsage: true,
// //                 suppressMapOpenBlock: true, // отключает открытия панели "Яндекс.Карты"
// //                 autoFitToViewport: 'always', // карта всегда будет подстраиваться под размер контейнера
// //                 // controls: [] // убирает все контролы на карте, если они не нужны
// //               }}
// //               onLoad={handleMapLoad} // Ensure map is fully loaded
// //             >
// //              {isMapLoaded  && // Render placemarks only after the map is fully loaded
// //                 arrayOfPlaceMarks.map((obj) => (
// //                   <Placemark
// //                     key={obj.id}
// //                     geometry={[obj.coordinates.latitude, obj.coordinates.longitude]}
// //                     options={{
                      
// //                       iconLayout: 'default#image',
// //                       iconImageHref: PlaceMarkIcon,
// //                       iconImageSize: obj.id === activePlace?.id ? [40, 40] : [30, 30],
// //                       iconImageOffset: obj.id === activePlace?.id ? [-20, -20] : [-15, -15],

        
// //                     }}
// //                     onClick={(e) => handlePlacemarkClick(obj, e)}
// //                   />
// //                 ))}
// //             </Map>
// //           </YMaps>
// //         </div>


// //         {activePlace && (<>

// //           <div className='active-place'>
// //             <div className='header-active-place'>
// //               <img src={closeSvg} alt="close icon" onClick={() => setActivePlace(null)} />
// //             </div>
// //             <div className='container-active-place'>

// //               <div className='content-active-place'>
// //                 <div className='container-image-active-place'>
// //                   <img src={activePlace.previewImg} alt="image of place" />
// //                 </div>
// //                 <div className='container-text-active-place'>
// //                   <h2>
// //                     {activePlace.placeName}
// //                   </h2>
// //                   <ul>
// //                     <li>
// //                       <h3>{t('map.card.location')}: </h3>
// //                       <span>{activePlace.locationDescription}</span>
// //                     </li>
// //                     <li>
// //                       <h3>{t('map.card.description')}: </h3>
// //                       <span>{activePlace.shortDescription}</span>
// //                     </li>
// //                   </ul>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className='container-button-selected-place'>
// //               <ButtonSubmit
// //                 isColorsInverse={true}
// //                 themeColor="yellow"
// //                 href={"/search/place/" + activePlace.id}
// //                 spanText={t("map.card.btn")}
// //                 onClick={() => { 1; }}
// //                 size />
// //             </div>
// //           </div>
// //         </>)}
// //       </section>

// //     </div>

// //   )
// // }

// import { React, useEffect, useState } from 'react';
// import '../../assets/styles/other/Map.css'
// // import PlaceMarkIcon from '../../assets/images/icons/other/star.svg'
// // import closeSvg from '../../assets/images/icons/other/close.svg'
// // import ButtonSubmit from '../buttons/ButtonSubmit';
// import { Map, Placemark, YMaps } from 'react-yandex-maps';
// import { useTranslation } from 'react-i18next';
// import ButtomAdmin from '../buttons/ButtonAdmin';
// import HeaderSection from './HeaderSection';

// export default function MapUzniki({ arrayOfPlaceMarks, passedPlace, isAdmin = false }) {
//   const { t } = useTranslation();

//   const [mapConfig, setMapConfig] = useState({
//     center: [53.55, 27.66], // Coordinates for Moscow (Change as needed)
//     zoom: 10,
//     controls: ['zoomControl', 'fullscreenControl'], // Controls to show
//     placemarks: [
//       {
//         coordinates: [55.751574, 37.573856],
//         hintContent: 'Moscow',
//         balloonContent: 'This is Moscow!'
//       },
//       {
//         coordinates: [55.751244, 37.624376],
//         hintContent: 'Another place',
//         balloonContent: 'Another interesting place in Moscow'
//       }
//     ]
//   });


  

//   // Trigger re-render of map when arrayOfPlaceMarks changes
//   useEffect(() => {
//     if (arrayOfPlaceMarks && arrayOfPlaceMarks.length > 0) {
//       console.log()
//       setMapConfig({
//         center: passedPlace
//           ? [passedPlace.coordinates.latitude, passedPlace.coordinates.longitude]
//           : [53.55, 27.66],
//         zoom: 10,
//         controls: ['zoomControl', 'fullscreenControl'],
//         placemarks: arrayOfPlaceMarks.map(place => ({
//           coordinates: [place.coordinates.latitude, place.coordinates.longitude],
//           hintContent: place.placeName,
//           balloonContent: place.shortDescription
//         }))
//       });
//     }
//   }, [arrayOfPlaceMarks, passedPlace]);

//   return (
//     <div className='section-map-page'>
//       <section className='section-map-header'>

//         <HeaderSection
//           textFirst={t('map.header')}
//         />

//         {isAdmin ?
//           <>
//             <div className='container-description-map-admin'>
//               <span>{t('map.additional-text')}</span>
//               <div className='admin-btn-container'>
//                 <ButtomAdmin isColorsInverse={false} themeColor="black" href={`/crud/place`} spanText={t('admin-panel.btn.add-camp')} size="m" />
//               </div>
//             </div>
//           </>
//           :
//           <div className='container-description-map'>
//             <span>{t('map.additional-text')}</span>
//           </div>
//         }


//       </section>
//       {/* ADD TOP BORDER TO THIS */}
//       <section className='section-map'>

//         <div className='container-map'>
//           <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_API_KEY, lang: 'ru_RU' }}>
//               <Map
//               width="1320px"
//               height="627px"
//               state={{
//                 center: mapConfig.center, zoom: mapConfig.zoom

//               }}
//               options={{
//                 optimizeMemoryUsage: true,
//                 suppressMapOpenBlock: true, // отключает открытия панели "Яндекс.Карты"
//                 autoFitToViewport: 'always', // карта всегда будет подстраиваться под размер контейнера
//                 // controls: [] // убирает все контролы на карте, если они не нужны
//               }}
             
//             >
             
//                {mapConfig.placemarks.map((placemark, index) => (
//                   <Placemark
//                     key={index}
//                     geometry={placemark.coordinates}
//                     properties={{
//                       hintContent: placemark.hintContent,
//                       balloonContent: placemark.balloonContent
//                     }}
//                   />
//                 ))}
//             </Map>
//           </YMaps>
//         </div>
//       </section>

//     </div>

//   )
// }


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
    // Загрузка API Яндекс.Карт и инициализация карты
    const initializeMap = async () => {
      const ymaps = await loadYandexMaps();
      setYmapsInstance(ymaps); // Сохраняем экземпляр Yandex API

      const initialCenter = passedPlace
        ? [passedPlace.coordinates.latitude, passedPlace.coordinates.longitude]
        : [53.55, 27.66];

      const mapInstance = new ymaps.Map(mapRef.current, {
        center: initialCenter,
        zoom: 10,
        controls: ['zoomControl', 'fullscreenControl'],
      });

      setMap(mapInstance); // Сохраняем экземпляр карты
    };

    initializeMap();
  }, [passedPlace]);

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
          <div ref={mapRef} style={{ width: '100%', height: '627px' }} /> {/* Контейнер для карты */}
        </div>
      </section>
    </div>
  );
}

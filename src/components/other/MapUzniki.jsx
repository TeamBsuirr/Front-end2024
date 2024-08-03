import { React, useState } from 'react';
import '../../assets/styles/other/Map.css'
import Image3 from '../../assets/images/Image3.jpeg'
import PlaceMarkIcon from '../../assets/images/icons/other/star.svg'
import closeSvg from '../../assets/images/icons/other/close.svg'
import ButtonSubmit from '../buttons/ButtonSubmit';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { Descriptions } from 'antd';
export default function MapUzniki() {

  const arrayOfPlaceMarks = [
    {
      placeName: "Тростенец",
      locationDescription: "локация Тростенец",
      description: "описание Тростенец",
      id:1,
      coordinates: {
        latitude: 50.28,
        longitude: 34.58,
      }
    },
    {
      placeName: "Озаричи",
      id:2,
      locationDescription: "локация Озаричи",
      description: "описание Озаричи",
      coordinates: {
        latitude: 52.2749,
        longitude: 29.1602,
      }
    },
    {
      placeName: "Минское гетто",
      id:3,
      locationDescription: "локация Минское гетто",
      description: "описание Минское гетто",
      coordinates: {
        latitude: 53.5434,
        longitude: 27.3233,
      }
    },
  ]
  const [activePlace, setActivePlace] = useState(null);

  // Handler function for setting the active place
  const handlePlacemarkClick = (place) => {
    console.log('Place clicked:', place);
    setActivePlace(place);
  };

  return (
    <div className='section-map-page'>
      <section className='section-map-header'>

        <div className='header-container-search-result-prisoners'>
          <div className='span-of-section-prisoners'>

          </div>
          <div className='header-of-section-prisoners'>
            МЕСТА ГЕНОЦИДА НА КАРТЕ РЕСПУБЛИКИ БЕЛАРУСЬ

          </div>
        </div>

        <div className='container-description-map'>
          <span>Места Боли отмечены маркерами на карте Республики Беларусь. Нажмите на метку для просмотра информации о концлагере и списке узников.</span>
        </div>

      </section>
      {/* ADD TOP BORDER TO THIS */}
      <section className='section-map'>

        <div className='container-map'>
          <YMaps>
            <Map
              width={1320}
              height={627}
              defaultState={{ center: [53.55, 27.66], zoom: 6.5 }}
            >
              {arrayOfPlaceMarks.map((obj, index) => (
                <Placemark
                  key={index}
                  geometry={[obj.coordinates.latitude, obj.coordinates.longitude]}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: PlaceMarkIcon,
                    iconImageSize: [30, 30],
                    iconImageOffset: [-15, -15],
                  }}
                  onClick={() => handlePlacemarkClick(obj)}
                />
              ))}
            </Map>
          </YMaps>
        </div>


        {activePlace && (<>

          <div className='active-place'>
            <div className='header-active-place'>
              <img src={closeSvg} alt="close icon" onClick={() =>  setActivePlace(null) } />
            </div>
            <div className='container-active-place'>

              <div className='content-active-place'>
                <div className='container-image-active-place'>
                  <img src={Image3} alt="image of place" />
                </div>
                <div className='container-text-active-place'>
                  <h2>
                    {activePlace.placeName}
                  </h2>
                  <ul>
                    <li>
                      <h3>Местоположение: </h3>
                      <span>{activePlace.coordinates.latitude}</span>
                    </li>
                    <li>
                      <h3>Описание: </h3>
                      <span>текст</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='container-button-selected-place'>
              <ButtonSubmit
                isColorsInverse={true}
                themeColor="yellow"
                href={"/search/place/"+activePlace.id}
                spanText='ПОДРОБНЕЕ О ЛАГЕРЕ'
                onClick={() => { 1; }}

                size />
            </div>
          </div>
        </>)}
      </section>

    </div>

  )
}
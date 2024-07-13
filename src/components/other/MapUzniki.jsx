import { React, useState } from 'react';
import '../../assets/styles/other/Map.css'
import Image3 from '../../assets/images/Image3.jpeg'
import closeSvg from '../../assets/images/icons/other/close.svg'
export default function MapUzniki() {
  const [activePlace, setActivePlace] = useState({});

  const ready = function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE';
    document.body.appendChild(script);
  };
  
  return (
    <div className='section-search-result'>
      <section className='section-form-search-result'>

        <div className='header-container-search-result-prisoners'>
          <div className='span-of-section-prisoners'>

          </div>
          <div className='header-of-section-prisoners'>
            МЕСТА ГЕНОЦИДА НА КАРТЕ РЕСПУБЛИКИ БЕЛАРУСЬ

          </div>
        </div>

        <div className='container-description-prisoners'>
          <span>Истории, собранные из каких-то источников, а также добавленные пользователями и тд текст текст текст текст текст текст текст </span>
        </div>

      </section>
      {/* ADD TOP BORDER TO THIS */}
      <section className='section-default'>
        {activePlace ? <>

          <div className='active-place'>
            <div className='header-active-place'>
              <img src={closeSvg} alt="close icon" onClick={()=>{setActivePlace(null);}}/>
            </div>
            <div className='container-active-place'>

              <div className='content-active-place'>
                <div className='container-image-active-place'>
                  <img src={Image3} alt="image of place" />
                </div>
                <div className='container-text-active-place'>
                  <h2>
                    Концлагерь 1
                  </h2>
                  <ul>
                    <li>
                      <h3>Местоположение: </h3>
                      <span>текст</span>
                    </li>
                    <li>
                      <h3>Описание: </h3>
                      <span>текст</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </> : <></>}
      </section>

    </div>

  )
}
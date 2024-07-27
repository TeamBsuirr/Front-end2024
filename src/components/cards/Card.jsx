

import { React } from 'react';
import '../../assets/styles/cards/Card.css'
import '../../assets/styles/layout/DefaultLayout.css'
import Image3 from '../../assets/images/Image3.jpeg'
import Carousel from '../other/Carousel';
import ButtonSubmit from '../buttons/ButtonSubmit';
import { notification } from 'antd';

export default function Card({ objectOfPrisoners }) {
    const splitIndex = 73; // Количество символов в первой части строки

    const firstPart = objectOfPrisoners.history.description.slice(0, splitIndex);
    const secondPart = objectOfPrisoners.history.description.slice(splitIndex);

    return (

        <section className='section-prisoner'>
            <div className='container-header-prisoner'>
                <div className='container-prisoner-portrait'>
                    <img className='img-prisoner-portrait' src={objectOfPrisoners.images[0].urlToFile} alt="portrait of a prisoner"></img>
                </div>
                <div className='container-header-prisoner-content'>

                    <h1 className='header-of-container-prisoner'>
                        {objectOfPrisoners.surname + " " + objectOfPrisoners.name + " " + objectOfPrisoners.patronymic}

                    </h1>



                    <ul>
                        <li>
                            <h2>Дата рождения: </h2>
                            <span>{objectOfPrisoners.dateOfBirth} г.</span>
                        </li>
                        <li>
                            <h2>Место рождения: </h2>
                            <span>{objectOfPrisoners.placeOfBirth}</span>
                        </li>
                        {objectOfPrisoners.places.map((place) => (<>

                            <li>
                                <h2>Место содержания: </h2>
                                <span>{place.place.placeName}, {place.region?.centralCity}</span>
                                <br />
                            </li>

                            <li>
                                <strong>с {place.dateFrom} по {place.dateTo}</strong>
                            </li>
                        </>
                        ))}
                    </ul>


                    <div className='container-story-prisoner'>

                        <p>{firstPart}</p>

                    </div>

                </div>
                <div className='container-story-prisoner'>
                    <p>{secondPart}</p>
                </div>

            </div>

            <Carousel images={objectOfPrisoners.images} />
            <div className='container-prisoner-button'>
                <ButtonSubmit
                    isColorsInverse={true}
                    themeColor="yellow"
                    href="/story"
                    spanText='ХОЧУ ДОБАВИТЬ ИСТОРИЮ'
                    onClick={() => { 1; }}

                    size />
                <ButtonSubmit
                    isColorsInverse={false}
                    themeColor="transparent"
                    href="/prisoners"
                    spanText='ДРУГИЕ ИСТОРИИ'
                    onClick={() => { 1; }}

                    size />
            </div>
        </section>


    )
}




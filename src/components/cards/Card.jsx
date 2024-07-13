

import { React } from 'react';
import '../../assets/styles/cards/Card.css'
import '../../assets/styles/layout/DefaultLayout.css'
import Image3 from '../../assets/images/Image3.jpeg'
import Carousel from '../other/Carousel';
import ButtonSubmit from '../buttons/ButtonSubmit';

export default function Card() {
    const objectOfPrisoners = {
        dateOfBirth: "12.02.1929",
        placeOfBirth: "Минск",
        places: [{
            placeName: "Концлагерь 1",
            region: {
                id: 2,
                centralCity: "Минск"
            },
            dataFrom: "12.02.1941",
            dataTo: "27.05.1942",
        }],
        images: [
            {
                "id": 1,
                "urlToFile": Image3
            },
            {
                "id": 2,
                "urlToFile": Image3
            },
            {
                "id": 3,
                "urlToFile": Image3
            },
            {
                "id": 4,
                "urlToFile": Image3
            },
            {
                "id": 5,
                "urlToFile": Image3
            },
            {
                "id": 6,
                "urlToFile": Image3
            },
            {
                "id": 7,
                "urlToFile": Image3
            },
        ],
        history: [
            {
                id: 1,
                article: "История жизни",
                description: "\"Когда вернулись домой в Брянск, ей дали десять лет тюрьмы за то оказалось, у меня трех позвонков нет. Это хорошо еще, горбатым не остался. Только тогда я вспомнил об этом случае в лагере\", — поделился он.\n\nОн вспоминает, что начальницей лагеря была немка, холеная, красивая, в сапогах и с плеткой. \"Зайдет, бывало, эта фрау в лагерь."
            }
        ],


    };

    function functionSumbit() { return 1; }

    return (

        <section className='section-prisoner'>
            <div className='container-header-prisoner'>
                <div className='container-prisoner-portrait'>
                    <img className='img-prisoner-portrait' src={objectOfPrisoners.images[0].urlToFile} alt="portrait of a prisoner"></img>
                </div>
                <div className='container-header-prisoner-content'>

                    <h1 className='header-of-container-default'>
                        Иванов Иван Иванович
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
                                <span>{place.placeName}, {place.region?.centralCity}</span>
                                <br />
                            </li>

                            <li>
                                <strong>с {place.dataFrom} по {place.dataTo}</strong>
                            </li>
                        </>
                        ))}
                    </ul>


                    <div className='container-story-prisoner'>
                        {objectOfPrisoners.history.map((storyObj) => (
                            <p>{storyObj.description}</p>
                        ))}
                    </div>


                </div>
                <div className='container-story-prisoner'>
                    {objectOfPrisoners.history.map((storyObj) => (
                        <p>{storyObj.description}</p>
                    ))}
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




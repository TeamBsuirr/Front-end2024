import { React, useCallback, useEffect, useRef, useState } from "react";
import "../../assets/styles/other/Map.css";
import { useTranslation } from "react-i18next";
import HeaderSection from "./HeaderSection";
import ButtonSubmit from "../buttons/ButtonSubmit";
import closeSvg from "../../assets/images/icons/other/close.svg";
import PlaceMarkIcon from "../../assets/images/icons/other/star.svg";

export default function MapUzniki({
    arrayOfPlaceMarks,
    passedPlace,
    setLoading,
}) {
    // BOUNDS
    // const { t } = useTranslation();
    // const mapRef = useRef(null); // Контейнер для карты
    // const [activePlace, setActivePlace] = useState(passedPlace);

    // // Обработчик клика на метку
    // const handlePlacemarkClick = useCallback((place, e) => {
    //   e.stopPropagation();
    //   setActivePlace(place); // Устанавливаем активное место
    // }, []);

    // useEffect(() => {
    //   const loadYandexMap = () => {
    //     const script = document.createElement('script');
    //     script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${process.env.REACT_APP_YANDEX_API_KEY}`;
    //     script.onload = () => {
    //       console.log('Яндекс.Карты API загружен');
    //       window.ymaps.ready(init); // Ожидаем полной инициализации API Яндекс.Карт
    //     };
    //     document.body.appendChild(script);
    //   };

    //   const init = () => {
    //     const map = new window.ymaps.Map(mapRef.current, {
    //       center: [53.551244, 27.668423],
    //       zoom: 7,
    //       controls: [],
    //       suppressMapOpenBlock: true,
    //     });

    //     console.log('Карта инициализирована');

    //     // Кастомный макет для hint (подсказки)
    //     const customHintLayout = window.ymaps.templateLayoutFactory.createClass(
    //       '<div style="display: flex; width: max-content;height: 40px; box-sizing: border-box;align-items: center; color: #E4B474; background-color: #4D4B48; opacity: 0.9; border-radius: 10px; padding: 10px; color: white;">{{ properties.hintContent }}</div>'
    //     );

    //     // Добавляем метки сразу после инициализации карты
    //     if (arrayOfPlaceMarks.length > 0) {
    //       arrayOfPlaceMarks.forEach((place) => {
    //         const placemark = new window.ymaps.Placemark(
    //           [place.coordinates.latitude, place.coordinates.longitude],
    //           {
    //             hintContent: place.placeName,
    //           },
    //           {
    //             iconLayout: 'default#image',
    //             iconImageHref: PlaceMarkIcon,
    //             iconImageSize: [40, 40],
    //             iconImageOffset: [-15, -15],
    //             hintLayout: customHintLayout,
    //           }
    //         );

    //         // Добавляем обработчики событий для меток
    //         placemark.events.add('click', (e) => handlePlacemarkClick(place, e));

    //         placemark.events
    //           .add('mouseenter', () => {
    //             placemark.options.set({
    //               iconImageSize: [50, 50],
    //               iconImageOffset: [-20, -20],
    //             });
    //           })
    //           .add('mouseleave', () => {
    //             placemark.options.set({
    //               iconImageSize: [40, 40],
    //               iconImageOffset: [-15, -15],
    //             });
    //           });

    //         map.geoObjects.add(placemark);
    //       });
    //     } else {
    //       console.log('Массив меток пуст');
    //     }

    //     // Если передано passedPlace, выделяем его
    //     if (passedPlace) {
    //       map.setCenter([passedPlace.coordinates.latitude, passedPlace.coordinates.longitude], 12);
    //       console.log('Карта центрирована на:', passedPlace.placeName);
    //     }
    //   };

    //   loadYandexMap();

    //   return () => {
    //     if (window.ymaps && mapRef.current) {
    //       window.ymaps.destroy(mapRef.current);
    //       console.log('Карта уничтожена');
    //     }
    //   };
    // }, [arrayOfPlaceMarks, passedPlace]);

    const { t } = useTranslation();
    const mapRef = useRef(null); // Контейнер для карты
    const [activePlace, setActivePlace] = useState(passedPlace);

    // Обработчик клика на метку
    const handlePlacemarkClick = useCallback((place, e) => {
        e.stopPropagation();
        setActivePlace(place); // Устанавливаем активное место
    }, []);

    useEffect(() => {
        const currentMapContainer = mapRef.current;

        const init = () => {
            const map = new window.ymaps.Map(currentMapContainer, {
                center: [53.551244, 27.668423],
                zoom: 7,
                controls: [],
                suppressMapOpenBlock: true,
            });

            // console.log("Карта инициализирована");

            // Кастомный макет для hint (подсказки)
            const customHintLayout =
                window.ymaps.templateLayoutFactory.createClass(
                    '<div style="display: flex; width: max-content;height: 40px; box-sizing: border-box;align-items: center; color: #E4B474; background-color: #4D4B48; opacity: 0.9; border-radius: 10px; padding: 10px; color: white;">{{ properties.hintContent }}</div>',
                );

            // Добавляем метки сразу после инициализации карты
            if (arrayOfPlaceMarks.length > 0) {
                arrayOfPlaceMarks.forEach((place) => {
                    const placemark = new window.ymaps.Placemark(
                        [
                            place.coordinates.latitude,
                            place.coordinates.longitude,
                        ],
                        {
                            hintContent: place.placeName,
                        },
                        {
                            iconLayout: "default#image",
                            iconImageHref: PlaceMarkIcon,
                            iconImageSize: [40, 40],
                            iconImageOffset: [-15, -15],
                            hintLayout: customHintLayout,
                        },
                    );

                    // Добавляем обработчики событий для меток
                    placemark.events.add("click", (e) =>
                        handlePlacemarkClick(place, e),
                    );

                    placemark.events
                        .add("mouseenter", () => {
                            placemark.options.set({
                                iconImageSize: [50, 50],
                                iconImageOffset: [-20, -20],
                            });
                        })
                        .add("mouseleave", () => {
                            placemark.options.set({
                                iconImageSize: [40, 40],
                                iconImageOffset: [-15, -15],
                            });
                        });

                    map.geoObjects.add(placemark);
                });

                // console.log("Метки сделаны!");
                // Устанавливаем, что карта и метки загружены
                setLoading(false);
            } else {
                // console.log("Массив меток пуст");
                setLoading(false);
            }

            // Если передано passedPlace, выделяем его
            if (passedPlace) {
                map.setCenter(
                    [
                        passedPlace.coordinates.latitude,
                        passedPlace.coordinates.longitude,
                    ],
                    12,
                );
                // console.log("Карта центрирована на:", passedPlace.placeName);
            }
        };

        const loadYandexMap = () => {
            const script = document.createElement("script");
            script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${process.env.REACT_APP_YANDEX_API_KEY}`;
            script.onload = () => {
                // console.log("Яндекс.Карты API загружен");
                window.ymaps.ready(init); // Ожидаем полной инициализации API Яндекс.Карт
            };
            document.body.appendChild(script);
        };

        loadYandexMap();

        return () => {
            if (window.ymaps && currentMapContainer) {
                //window.ymaps.destroy(currentMapContainer);
                // console.log("Карта уничтожена");
            }
        };
    }, [arrayOfPlaceMarks, passedPlace, setLoading, handlePlacemarkClick]);

    return (
        <div className="section-map-page">
            <section className="section-map-header">
                <HeaderSection textFirst={t("map.header")} />

                <div className="container-description-map">
                    <span>{t("map.additional-text")}</span>
                </div>

            </section>

            <section className="section-map">
                <div className="container-map">
                    <div
                        ref={mapRef}
                        style={{ width: "1520px", height: "100vh" }}
                    />
                </div>
            </section>

            {activePlace && (
                <>
                    <div className="active-place">
                        <div className="header-active-place">
                            <button
                                onClick={() => setActivePlace(null)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") setActivePlace(null);
                                }}
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                }} // Убираем стили кнопки
                                tabIndex={0} // Делаем элемент фокусируемым
                            >
                                <img src={closeSvg} alt="close" />
                            </button>
                        </div>
                        <div className="container-active-place">
                            <div className="content-active-place">
                                <div className="container-image-active-place">
                                    <img
                                        src={activePlace.previewImg}
                                        alt=" place"
                                    />
                                </div>
                                <div className="container-text-active-place">
                                    <h2>{activePlace.placeName}</h2>
                                    <ul>
                                        <li>
                                            <h3>{t("map.card.location")}: </h3>
                                            <span>
                                                {
                                                    activePlace.locationDescription
                                                }
                                            </span>
                                        </li>
                                        <li>
                                            <h3>
                                                {t("map.card.description")}:{" "}
                                            </h3>
                                            <span>
                                                {activePlace.shortDescription}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="container-button-selected-place">
                            <ButtonSubmit
                                isColorsInverse={true}
                                themeColor="yellow"
                                href={"/search/place/" + activePlace.id}
                                spanText={t("map.card.btn")}
                                size
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

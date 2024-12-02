import { React, useCallback, useEffect, useRef, useState } from "react";
import PlaceMarkIcon from "../../assets/images/icons/other/star.svg";
import "../../assets/styles/other/Map.css";
import { useTranslation } from "react-i18next";
// import HeaderSection from "./HeaderSection";
import ButtonSubmit from "../buttons/ButtonSubmit";
import closeSvg from "../../assets/images/icons/other/close.svg";
// import ButtonAdmin from "../buttons/ButtonAdmin";

export default function MapUzniki({
    // isAdmin,
    arrayOfPlaceMarks,
    passedPlace,
}) {
    const { t } = useTranslation();
    const mapRef = useRef(null); // Контейнер для карты
    const [activePlace, setActivePlace] = useState(passedPlace); // Выбранное место
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки карты

    // Инициализация карты
    const initializeMap = useCallback(() => {
        if (!mapRef.current || !window.ymaps) return;

        const map = new window.ymaps.Map(mapRef.current, {
            center: [53.551244, 27.668423], // Центр карты
            zoom: 7,
            controls: ["zoomControl", "typeSelector"], // Элементы управления
        });


        // Добавление меток
        if (arrayOfPlaceMarks?.length) {
            arrayOfPlaceMarks.forEach((place) => {
                const placemark = new window.ymaps.Placemark(
                    [place.coordinates.latitude, place.coordinates.longitude],
                    { hintContent: place.placeName }, // Всплывающая подсказка
                    {
                        iconLayout: "default#image",
                        iconImageHref: PlaceMarkIcon,
                        iconImageSize: [30, 30],
                        iconImageOffset: [-15, -15],
                    }
                );

                // Событие клика на метке
                placemark.events.add("click", () => setActivePlace(place));
                map.geoObjects.add(placemark);
            });
            setIsLoading(false);
        }

        // Снимаем состояние загрузки
        
    }, [arrayOfPlaceMarks]);

    // Подгрузка API Яндекс.Карт
    useEffect(() => {
        const loadYandexMaps = () => {
            if (window.ymaps) {
                // Если API уже загружен
                window.ymaps.ready(initializeMap);
                return;
            }

            const script = document.createElement("script");
            script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${process.env.REACT_APP_YANDEX_API_KEY}`;
            script.onload = () => window.ymaps.ready(initializeMap);
            document.body.appendChild(script);
        };

        loadYandexMaps();
    }, [initializeMap]);
    return <>

       


        <div className="section-map">
        {isLoading ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                            fontSize: "1.5rem",
                        }}
                    >
                        {t("map.loading")}...
                    </div>
                ) : (
                    <div
                        ref={mapRef}
                        style={{ width: "100%", height: "100vh", zIndex: 9 }}
                    />
                )}
        </div>

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
    </>;
}
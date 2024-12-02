import { React, useCallback, useEffect, useRef, useState } from "react";
import PlaceMarkIcon from "../../assets/images/icons/other/star.svg";
import "../../assets/styles/other/Map.css";
import { useTranslation } from "react-i18next";
// import HeaderSection from "./HeaderSection";
import ButtonSubmit from "../buttons/ButtonSubmit";
import closeSvg from "../../assets/images/icons/other/close.svg";
import HeaderSection from "./HeaderSection";
// import ButtonAdmin from "../buttons/ButtonAdmin";

export default function MapUzniki({
    isAdmin,
    arrayOfPlaceMarks,
    passedPlace,
}) {
    const { t } = useTranslation();
    const mapRef = useRef(null);
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
            });

            if (arrayOfPlaceMarks.length > 0) {
                arrayOfPlaceMarks.forEach((place) => {
                    const placemark = new window.ymaps.Placemark(
                        [
                            place.coordinates.latitude,
                            place.coordinates.longitude,
                        ],
                        {},
                        {
                            iconLayout: "default#image",
                            iconImageHref: PlaceMarkIcon,
                            iconImageSize: [30, 30],
                            iconImageOffset: [-15, -15],
                        }
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
            }
        };

        const loadYandexMap = () => {
            const script = document.createElement("script");
            script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${process.env.REACT_APP_YANDEX_API_KEY}`;
            script.onload = () => window.ymaps.ready(init);
            document.body.appendChild(script);
        };

        loadYandexMap();
    }, [arrayOfPlaceMarks]);

    return <div className="section-map-page">

        <div className="section-map-header">
            <HeaderSection textFirst={t("map.header")} />
            {isAdmin ? (
                <div className="container-description-map-admin">
                    <span>{t("map.additional-text")}</span>
                    <div className="admin-btn-container">
                        <ButtonAdmin
                            isColorsInverse={false}
                            themeColor="black"
                            href={`/crud/place`}
                            spanText={t("admin-panel.btn.add-camp")}
                            size="m"
                        />
                    </div>
                </div>
            ) : (
                <div className="container-description-map">
                    <span>{t("map.additional-text")}</span>
                </div>
            )}
        </div>


        <div className="section-map">
            <div ref={mapRef} style={{ width: "1520px", height: "100vh", zIndex: "9" }} />
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
    </div>;
}
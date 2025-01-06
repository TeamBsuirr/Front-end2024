import { React, useCallback, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Стандартный стиль для Leaflet
import "../../assets/styles/other/Map.css";

import { useTranslation } from "react-i18next";

import ButtonSubmit from "../buttons/ButtonSubmit";
import closeSvg from "../../assets/images/icons/other/close.svg";
import PlaceMarkIcon from "../../assets/images/icons/other/star.svg";


export default function MapUzniki({
    arrayOfPlaceMarks,
    passedPlace,
    setLoading
}) {
    const { t } = useTranslation();
    const [activePlace, setActivePlace] = useState(passedPlace);

    // Стейт для хранения состояния карты
    const mapCenter = passedPlace
        ? [passedPlace.coordinates.latitude, passedPlace.coordinates.longitude]
        : [53.551244, 27.668423]; // Если passedPlace передан, центрируем карту на нем
    const zoomLevel = 7; // Уровень зума

    // Обработчик клика по метке
    const handlePlacemarkClick = useCallback((place) => {
        //e.stopPropagation();
        setActivePlace(place); // Устанавливаем активное место
    }, []);

    // Кастомный хинт
    const getHintContent = (place) => {
        //console.log(place)
        return (
            `
                ${place?.placeName}
           `
        );
    };

    return (
        <>
            <section className="section-map">
                <div className="container-map">
                    <MapContainer center={mapCenter} zoom={zoomLevel} style={{ width: "100%", height: "100%" }} onLoad={setLoading(false)}>
                        {/* Тайлы OpenStreetMap */}
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                        />

                        {/* Рендеринг маркеров на карте без кластеризации */}
                        {arrayOfPlaceMarks.map((place, index) => (
                            <Marker
                                key={index}
                                position={[place.coordinates.latitude, place.coordinates.longitude]}
                                icon={new L.Icon({
                                    iconUrl: PlaceMarkIcon,
                                    iconSize: [30, 30],
                                })}
                                eventHandlers={{
                                    click: (e) => handlePlacemarkClick(place, e),
                                }}
                            >
                                {/* Подсказка для каждого маркера */}
                                <Tooltip
                                    direction="top"
                                    offset={[-10, -20]}
                                    opacity={1}
                                    permanent={false}
                                    sticky={true}
                                    className="custom-tooltip" // Используем ваш класс
                                >
                                    {getHintContent(place)} {/* Используем ваши стили здесь */}
                                </Tooltip>

                            </Marker>
                        ))}
                    </MapContainer>
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
        </>
    );
}

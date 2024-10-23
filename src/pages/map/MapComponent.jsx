import React, { useEffect, useRef } from "react";

const MapComponent = ({ center = [55.751574, 37.573856], zoom = 10 }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const loadMap = async () => {
            const ymaps = await loadYandexMaps();
            const map = new ymaps.Map(mapRef.current, {
                center: center,
                zoom: zoom,
                controls: ["zoomControl", "fullscreenControl"],
            });

            // Пример добавления меток
            const placemark = new ymaps.Placemark(center, {
                hintContent: "Москва!",
                balloonContent: "Столица России",
            });

            map.geoObjects.add(placemark);
        };

        loadMap();
    }, [center, zoom]);

    const loadYandexMaps = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src =
                "https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU";
            script.onload = () => {
                window.ymaps.ready(() => {
                    resolve(window.ymaps);
                });
            };
            document.head.appendChild(script);
        });
    };

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;

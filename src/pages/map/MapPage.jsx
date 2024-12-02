import { React, useEffect, useState } from "react";
import Spinner from "../../components/other/Spinner";
import PageTemplate from "../../components/other/PageTemplate";
import { notification } from "antd";
import NotFound from "../../components/layout/NotFound";
import placeService from "../../api/services/placeService";
import MapUzniki from "../../components/other/MapUzniki";
import { useTranslation } from "react-i18next";
import HeaderSection from "../../components/other/HeaderSection";

export default function MapPage() {
    const { t } = useTranslation();
    const [arrayOfPlaces, setArrayOfPlaces] = useState(null);
    const [loading, setLoading] = useState(true);
    const [passedPlace, setPassedPlace] = useState(null);

    useEffect(() => {
        setLoading(true);

        const queryStringArray = window.location.hash.split("#");
        const idOfPlace = +queryStringArray[queryStringArray.length - 1];

        placeService
            .getAllPlaces()
            .then((data) => {
                setArrayOfPlaces(data);

                if (idOfPlace && data) {
                    data.forEach((obj) => {
                        if (obj.id === idOfPlace) setPassedPlace(obj);
                    });
                }

                setLoading(false);
                return data;
            })
            .catch((error) => {
                let errMsg = error.message || error;
                notification.error({
                    message: t("errors.front-end.fetch.msg-places"),
                    description:
                        t("errors.front-end.fetch.description") + errMsg,
                });
                setLoading(false);
                throw error;
            });
    }, [t]);

    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (!arrayOfPlaces) {
        return <NotFound />;
    } else {
        return (
            <div className="map-container" style={{ width: "100%", height: "100%" }}>
                <section className="section-map-header">
                    <HeaderSection textFirst={t("map.header")} />
                </section>

                <MapUzniki
                    arrayOfPlaceMarks={arrayOfPlaces}
                    passedPlace={passedPlace}
                    setLoading={setLoading}
                />
            </div>
        );
    }
}

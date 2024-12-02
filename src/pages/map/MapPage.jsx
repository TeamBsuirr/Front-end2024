import { React, useEffect, useState } from "react";
import Spinner from "../../components/other/Spinner";
import PageTemplate from "../../components/other/PageTemplate";
import { notification } from "antd";
import NotFound from "../../components/layout/NotFound";
import placeService from "../../api/services/placeService";
import MapUzniki from "../../components/other/MapUzniki";
import { useTranslation } from "react-i18next";
import ButtonAdmin from "../../components/buttons/ButtonAdmin";
import HeaderSection from "../../components/other/HeaderSection";

export default function MapPage({ isAdmin = false }) {
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
            <div className="section-map-page">
                <section className="section-map-header">
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
                </section>

                <MapUzniki
                    arrayOfPlaceMarks={arrayOfPlaces}
                    passedPlace={passedPlace}
                    isAdmin={isAdmin}
                    setLoading={setLoading}
                />
            </div>
        );
    }
}
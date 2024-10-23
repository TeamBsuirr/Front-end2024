import { React, useEffect, useState } from "react";
import PageTemplate from "../../components/other/PageTemplate";
import PrisonerSearchResult from "../../components/forms/PrisonerSearchResult";
import humanService from "../../api/services/humanService";
import Spinner from "../../components/other/Spinner";
import NotFound from "../../components/layout/NotFound";
import { notification } from "antd";
import { useTranslation } from "react-i18next";

export default function PrisonerStories({ isAdmin = false }) {
    const { t } = useTranslation();
    const [histories, setHistoies] = useState([]);
    const [places, setPlaces] = useState([]);
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        humanService
            .getAllHistoriesForPrisonerStories()
            .then((data) => {
                //console.log(data)
                setHistoies(data.histories);
                setLoading(false);

                setPlaces(data.places);
                setYears(data.years);
                return data;
            })
            .catch((error) => {
                //console.error('Ошибка получения данных историй участников:', error);

                let errMsg = error.message ? error.message : error;

                notification.error({
                    message: t("errors.front-end.fetch.msg-prisoners"),
                    description:
                        t("errors.front-end.fetch.description") + errMsg,
                });

                setLoading(false);
                throw error;
            });
    }, [t]);

    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (!histories || !places || !years) {
        return <NotFound />;
    } else {
        return (
            <PrisonerSearchResult
                histories={histories}
                places={places}
                years={years}
                isAdmin={isAdmin}
            />
        );
    }
}

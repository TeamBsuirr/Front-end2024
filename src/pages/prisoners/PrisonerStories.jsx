import { React, useEffect, useState } from "react";
import PageTemplate from "../../components/other/PageTemplate";
import PrisonerSearchResult from "../../components/forms/PrisonerSearchResult";
import humanService from "../../api/services/humanService";
import Spinner from "../../components/other/Spinner";
import NotFound from "../../components/layout/NotFound";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import placeService from "../../api/services/placeService";

export default function PrisonerStories({ isAdmin = false }) {
    const { t } = useTranslation();
    const [histories, setHistoies] = useState([]);
    const [places, setPlaces] = useState([]);
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);  // Текущая страница
    const [itemsPerPage, setItemsPerPage] = useState(15); // Количество элементов на странице
    const [totalElements, setTotalElements] = useState(15); // Количество элементов на странице
    const [totalPages, setTotalPages] = useState(1); // Количество элементов на странице


    const [selectedPlace, setSelectedPlace] = useState(
        t("stories.filter.place"),
    );
    const [selectedCalendar, setSelectedCalendar] = useState(
        t("stories.filter.year"),
    );
    const [selectedAlphabet, setSelectedAlphabet] = useState(
        t("stories.sort.alphabetically"),
    );

    useEffect(() => {
        setLoading(true);

        humanService
            .getAllHistoriesForPrisonerStories(currentPage, 15,
                selectedAlphabet,
                selectedPlace !== t("stories.filter.place") ? selectedPlace : '',  
                selectedCalendar !== t("stories.filter.year") ? selectedCalendar : '')
                    .then((data) => {
                        // данные

                        setHistoies(data.histories);

                        // пагинация
                        setTotalElements(data.totalElements)
                        setTotalPages(data.totalPages)
                        const qItems = (data.histories)?.length || 0;
                        setItemsPerPage((currentPage * 15) + qItems)

                        //загрузка
                        setLoading(false);

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

        

        setLoading(true);

        placeService
            .getAllYearsAndPlaces()
            .then((data) => {

                // данные
                setPlaces(data.places);
                setYears(data.years);

                //загрузка
                setLoading(false);

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

    }, [t, currentPage, setCurrentPage, selectedPlace, selectedCalendar, selectedAlphabet]);

    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (!places || !years) {
        return <NotFound />;
    } else {







        return (
            <PrisonerSearchResult
                histories={histories}
                places={places}
                years={years}
                isAdmin={isAdmin}
                setLoading={setLoading}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalElements={totalElements}
                totalPages={totalPages}
                selectedPlace={selectedPlace}
                setSelectedPlace={setSelectedPlace}
                selectedCalendar={selectedCalendar}
                setSelectedCalendar={setSelectedCalendar}
                selectedAlphabet={selectedAlphabet}
                setSelectedAlphabet={setSelectedAlphabet}
            />
        );
    }
}

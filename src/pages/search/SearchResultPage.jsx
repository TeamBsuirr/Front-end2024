import { React, useEffect, useState } from "react";
import Spinner from "../../components/other/Spinner";
import searchService from "../../api/services/searchService";
import SearchResults from "../../components/forms/SearchResults";
import PageTemplate from "../../components/other/PageTemplate";
import { notification } from "antd";
import NotFound from "../../components/layout/NotFound";
import { useTranslation } from "react-i18next";

export default function SearchResultPage() {
    const { t } = useTranslation();
    const [humans, setHumans] = useState(null);
    const [places, setPlaces] = useState(null);
    const [arrayFoundObjects, setArrayFoundObjects] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        setSearchString("");

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let urlParamsString = "";
        if (urlParams.has("searchFor")) {
            setSearchString(urlParams.get("searchFor"));
            urlParamsString = urlParams.get("searchFor");
        } else {
            //console.error('Ошибка получения результатов. Поиск пустой!');
            notification.error({
                message: t("errors.front-end.empty-main-search-field"),
                description: t(
                    "errors.front-end.empty-main-search-field-description",
                ),
            });

            setLoading(false);
        }

        searchService
            .getGlobalSearch(urlParamsString)
            .then((data) => {
                //console.log(data);

                setHumans(data.humans);
                setPlaces(data.places);

                const humansFormatted = data.humans.map((human) => ({
                    id: human?.id,
                    type: "humans",
                    img:
                        human.images && human.images.length > 0
                            ? human.images[0].urlToFile
                            : "",
                    header: `${human.surname} ${human.name} ${human.patronymic}`,
                    description: human.history?.description
                        .split(" ")
                        .slice(0, 15)
                        .join(" "),
                }));

                const placesFormatted = data.places.map((place) => ({
                    id: place?.id,
                    type: "places",
                    img:
                        place.images && place.images.length > 0
                            ? place.images[0].urlToFile
                            : "",
                    header: place.placeName,
                    description: place.history?.description
                        .split(" ")
                        .slice(0, 15)
                        .join(" "),
                }));

                //console.log(humansFormatted,placesFormatted)

                const combinedResults = [
                    ...humansFormatted,
                    ...placesFormatted,
                ];
                setArrayFoundObjects(combinedResults);

                //console.log(arrayFoundObjects)

                setLoading(false);
                return data;
            })
            .catch((error) => {
                console.error("Ошибка получения результатов:", error);
                let errMsg = error.message ? error.message : error;
                notification.error({
                    message: "Ошибка получения результатов",
                    description:
                        "Ошибка получения данных узников и концлагерей с сервера: " +
                        errMsg,
                });
                setLoading(false);
                throw error;
            });
    }, [t]);

    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (
        (humans === null && places === null) ||
        (!humans && !places) ||
        searchString === ""
    ) {
        return <NotFound />;
    } else {
        return <SearchResults arrayFoundObjects={arrayFoundObjects} />;
    }
}

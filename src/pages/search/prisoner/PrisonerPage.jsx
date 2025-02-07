import { React, useEffect, useState } from "react";
import Spinner from "../../../components/other/Spinner";
import PageTemplate from "../../../components/other/PageTemplate";
import Card from "../../../components/cards/Card";
import humanService from "../../../api/services/humanService";
import { notification } from "antd";
import NotFound from "../../../components/layout/NotFound";
import { useTranslation } from "react-i18next";
import { addMainImagePreview } from "../../../utils/globalFunctions";

export default function PrisonerPage() {
    const { t } = useTranslation();
    const [objectOfPrisoners, setObjectOfPrisoners] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const queryStringArray = window.location.pathname.split("/");
        let idOfPrisoner = queryStringArray[queryStringArray.length - 1];

        // Проверяем, является ли последний элемент числом
        if (!isNaN(idOfPrisoner) && idOfPrisoner.trim() !== "") {
            idOfPrisoner = Number(idOfPrisoner);
        } else {
            // Если это не число, делаем соответствующее действие, например, присваиваем null
            idOfPrisoner = null;
        }

        humanService
            .getHumanById(idOfPrisoner)
            .then((data) => {
        
                setObjectOfPrisoners(addMainImagePreview(data));
                setLoading(false);
                return data;
            })
            .catch((error) => {
                // console.error('Ошибка получения данных узника:', error);

                let errMsg = error.message ? error.message : error;

                notification.error({
                    message: t("errors.front-end.fetch.msg-prisoner"),
                    description:
                        t("errors.front-end.fetch.description") + errMsg,
                });

                setLoading(false);
                throw error;
            });
    }, [t]);

    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (!objectOfPrisoners) {
        return <NotFound />;
    } else {
        return (
            <>
               
                <Card
                    objectOfPrisoners={objectOfPrisoners}
                  
                />
            </>
        );
    }
}

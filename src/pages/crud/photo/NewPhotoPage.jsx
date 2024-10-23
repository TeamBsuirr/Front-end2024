import { React, useEffect, useState } from "react";
import NewPhoto from "../../../components/forms/NewPhoto";
import { useTranslation } from "react-i18next";
import searchService from "../../../api/services/searchService";
import Spinner from "../../../components/other/Spinner";
import PageTemplate from "../../../components/other/PageTemplate";
import { notification } from "antd";

export default function NewPhotoPage() {
    const { t } = useTranslation();
    const [objectOfPhoto, setObjectOfPhoto] = useState({
        id: "",
        image: "",
        title: "",
        description: "",
    });
    const [loading, setLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        setLoading(true);
        const queryStringArray = window.location.pathname.split("/");
        let idOfPhoto = queryStringArray[queryStringArray.length - 1];

        // Проверяем, является ли последний элемент числом
        if (!isNaN(idOfPhoto) && idOfPhoto.trim() !== "") {
            idOfPhoto = Number(idOfPhoto);
            setIsUpdate(true);
            objectOfPhoto.id = idOfPhoto;
        } else {
            // Если это не число, делаем соответствующее действие, например, присваиваем null
            idOfPhoto = null;
            setIsUpdate(false);
            setLoading(false);
        }

        if (idOfPhoto)
            searchService
                .getPhotoByIdForPostPhoto(idOfPhoto)
                .then((data) => {
                    setObjectOfPhoto(data);
                    setLoading(false);
                    return data;
                })
                .catch((errorPrisoner) => {
                    let errMsg = errorPrisoner.message
                        ? errorPrisoner.message
                        : errorPrisoner;
                    notification.error({
                        message: t("errors.front-end.fetch.msg-prisoner"),
                        description:
                            t("errors.front-end.fetch.description") + errMsg,
                    });

                    setLoading(false);
                    throw errorPrisoner;
                });
    }, [objectOfPhoto, t]);

    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else {
        return <NewPhoto objectOfPhoto={objectOfPhoto} isUpdate={isUpdate} />;
    }
}

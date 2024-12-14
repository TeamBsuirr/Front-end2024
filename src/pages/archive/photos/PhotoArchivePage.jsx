import { React, useEffect, useState } from "react";
import Spinner from "../../../components/other/Spinner";
import searchService from "../../../api/services/searchService";

import PageTemplate from "../../../components/other/PageTemplate";

import PhotoArchive from "../../../components/forms/PhotoArchive";
import { notification } from "antd";
import NotFound from "../../../components/layout/NotFound";
import { useTranslation } from "react-i18next";

export default function PhotoArchivePage({ isAdmin = false }) {
    const { t } = useTranslation();
    const [arrayOfPhotoObjects, setArrayOfPhotoObjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);  // Текущая страница
    const [itemsPerPage, setItemsPerPage] = useState(15); // Количество элементов на странице
    const [totalElements, setTotalElements] = useState(15); // Количество элементов на странице
    const [totalPages, setTotalPages] = useState(1); // Количество элементов на странице

    useEffect(() => {
        setLoading(true);
        searchService
            .getAllPhotos(currentPage, 15)
            .then((data) => {

                setArrayOfPhotoObjects(data.data);

                // пагинация
                setTotalElements(data.totalElements)
                setTotalPages(data.totalPages)
                setItemsPerPage((currentPage * 15) + (data.data).length)


                setLoading(false);
                return data;
            })
            .catch((error) => {
                //console.error( error);

                let errMsg = error.message ? error.message : error;

                notification.error({
                    message: t("errors.front-end.fetch.msg-photo-a"),
                    description:
                        t("errors.front-end.fetch.description") + errMsg,
                });

                setLoading(false);
                throw error;
            });
    }, [t, currentPage, setCurrentPage]);

    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (!arrayOfPhotoObjects) {
        return <NotFound />;
    } else {
        return (
            <PhotoArchive
                arrayOfPhotoObjects={arrayOfPhotoObjects}
                isAdmin={isAdmin}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalElements={totalElements}
                totalPages={totalPages}
            />
        );
    }
}

import { React, useEffect, useState } from "react";
import Spinner from "../../../components/other/Spinner";
import searchService from "../../../api/services/searchService";

import PageTemplate from "../../../components/other/PageTemplate";

import PhotoArchive from "../../../components/forms/PhotoArchive";
import { notification } from "antd";
import NotFound from "../../../components/layout/NotFound";
import { useTranslation } from "react-i18next";

export default function PhotoArchivePage() {
    const { t } = useTranslation();
    const [arrayOfPhotoObjects, setArrayOfPhotoObjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        searchService
            .getAllPhotos()
            .then((data) => {
                //console.log(data);
                setArrayOfPhotoObjects(data);

                setLoading(false);
                return data;
            })
            .catch((error) => {

                let errMsg = error.message ? error.message : error;

                notification.error({
                    message: t("errors.front-end.fetch.msg-photo-a"),
                    description:
                        t("errors.front-end.fetch.description") + errMsg,
                });

                setLoading(false);
                throw error;
            });
    }, [t]);

    if (loading) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (!arrayOfPhotoObjects) {
        return <NotFound />;
    } else {
        return (
            <PhotoArchive
                arrayOfPhotoObjects={arrayOfPhotoObjects}
            />
        );
    }
}

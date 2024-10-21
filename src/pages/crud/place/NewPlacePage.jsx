

import { React, useEffect, useState } from 'react';
import NewPlace from '../../../components/forms/NewPlace';
import placeService from '../../../api/services/placeService';
import { useTranslation } from 'react-i18next';
import NotFound from '../../../components/layout/NotFound';
import PageTemplate from '../../../components/other/PageTemplate';
import Spinner from '../../../components/other/Spinner';
import { notification } from 'antd';


export default function NewPlacePage() {
    const { t } = useTranslation();
    const [objectOfPlace, setObjectOfPlace] = useState({
        "id": "",
        "placeName": "",
        "countDeath": 0,

        "article": "Заголовок истории",
        "history":{
            "description": "",
        },
      
        "region": {
            "id":0,
            "centralCity":"",
        },
        "images": [
        ],
        "dateOfFoundation": "",
        "locationDescription": "",
        "shortDescription": "",

        "latitude": 0,
        "longitude": 0

    });
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    // Function to fetch file and create File object
    async function urlToFile(url, fileName, fileExtension, fileType) {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], `${fileName}.${fileExtension}`, { type: fileType });
    }

    // Function to get MIME type from file extension
    function getMimeType(fileExtension) {
        const mimeTypes = {
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png",
            gif: "image/gif",
            bmp: "image/bmp",
            tiff: "image/tiff",
            svg: "image/svg+xml",
            mp4: "video/mp4",
            avi: "video/x-msvideo",
            mov: "video/quicktime",
            mkv: "video/x-matroska",
            flv: "video/x-flv",
            wmv: "video/x-ms-wmv",
            webm: "video/webm",
            pdf: "application/pdf",
            doc: "application/msword",
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            xls: "application/vnd.ms-excel",
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ppt: "application/vnd.ms-powerpoint",
            pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            txt: "text/plain",
            csv: "text/csv",
            zip: "application/zip",
            rar: "application/x-rar-compressed",
        };
        return mimeTypes[fileExtension.toLowerCase()] || "application/octet-stream";
    }

    // Function to convert files from URLs to File objects
    async function convertFiles(files) {
        if (!Array.isArray(files) || files.length === 0) {
            return [];
        }
        return Promise.all(files.map(async (fileObj) => {
            const fileExtension = fileObj.urlToFile.split('.').pop();
            const fileName = `file_${fileObj.id}`;
            const mimeType = getMimeType(fileExtension);
            return await urlToFile(fileObj.urlToFile, fileName, fileExtension, mimeType);
        }));
    }

    // Fetch data and handle file conversion
    useEffect(() => {
        setLoading(true);
        const queryStringArray = window.location.pathname.split('/');
        let idOfPlace = queryStringArray[queryStringArray.length - 1];

        if (!isNaN(idOfPlace) && idOfPlace.trim() !== '') {
            idOfPlace = Number(idOfPlace);
            setIsUpdate(true)
            objectOfPlace.id = idOfPlace
        } else {
            idOfPlace = null;
            setIsUpdate(false)
        }


        if (idOfPlace) {
            placeService.getPlaceById(idOfPlace)
                .then(async data => {
                    const fileObjects = await convertFiles(data.images);
                    setObjectOfPlace({
                        ...data,
                        images: fileObjects
                    });
                    setDataLoaded(true); // Ensure that data is fully loaded
                    console.log(data)
                })
                .catch(errorPrisoner => {
                    let errMsg = errorPrisoner.message ? errorPrisoner.message : errorPrisoner;
                    notification.error({
                        message: t('errors.front-end.fetch.msg-prisoner'),
                        description: t('errors.front-end.fetch.description') + errMsg
                    });
                    setDataLoaded(true); // Ensure that data is fully loaded even if there is an error
                });
        } else {
            setDataLoaded(true); // Ensure that data is fully loaded even if no prisoner ID
        }

        setLoading(false); // Set loading to false after processing all data
    }, [t]);

    // Check if the data is loaded and has valid content
    if (loading || !dataLoaded) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (!objectOfPlace) {
        return <NotFound />;
    } else {
        return (
            <NewPlace objectOfPlace={objectOfPlace} isUpdate={isUpdate} />
        );
    }
}

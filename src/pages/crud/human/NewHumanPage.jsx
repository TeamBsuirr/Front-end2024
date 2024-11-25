import React, { useCallback, useEffect, useState } from "react";
import NewHuman from "../../../components/forms/NewHuman";
import PageTemplate from "../../../components/other/PageTemplate";
import Spinner from "../../../components/other/Spinner";
import { notification } from "antd";
import NotFound from "../../../components/layout/NotFound";
import placeService from "../../../api/services/placeService";
import { useTranslation } from "react-i18next";
import humanService from "../../../api/services/humanService";

export default function NewHumanPage() {
    const { t } = useTranslation();
    const [arrayOfPlaces, setArrayOfPlaces] = useState([]);
    const [objectOfPrisoners, setObjectOfPrisoners] = useState({
        id: "",
        name: "",
        surname: "",
        patronymic: "",
        dateOfBirth: "",
        dateOfDie: "",
        placeOfBirth: "",
        places: [],
        history: "",
        files: [],
    });
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    // Function to fetch file and create File object
    const urlToFile = useCallback(async (url, fileName, fileExtension, fileType) => {
        try {
            const response = await fetch(url, { mode: 'cors' }); // Убедитесь, что сервер поддерживает CORS
            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.statusText}`);
            }
            const blob = await response.blob();
            const file = new File([blob], `${fileName}.${fileExtension}`, {
                type: fileType,
            });
            //file.preview = URL.createObjectURL(blob); // Создаем preview
            file.preview = url; // Создаем preview
            file.cameFrom="yandex";
            return file;
        } catch (error) {
            console.error('Error fetching file:', error);
            return null;
        }
    }, []);

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
        return (
            mimeTypes[fileExtension.toLowerCase()] || "application/octet-stream"
        );
    }


    // Function to convert files from URLs to File objects
    const convertFiles = useCallback(async (files) => {
        if (!Array.isArray(files) || files.length === 0) {
            return [];
        }
        const convertedFiles = await Promise.all(
            files.map(async (fileObj) => {
                const fileExtension = fileObj.urlToFile.split('.').pop();
                const fileName = `file_${fileObj.id}`;
                const mimeType = getMimeType(fileExtension);
                return await urlToFile(
                    fileObj.urlToFile,
                    fileName,
                    fileExtension,
                    mimeType
                );
            })
        );
        return convertedFiles.filter(Boolean); // Исключаем неудачные загрузки
    }, [urlToFile]);

    // Fetch data and handle file conversion
    useEffect(() => {
        setLoading(true);
        const queryStringArray = window.location.pathname.split("/");
        let idOfPrisoner = queryStringArray[queryStringArray.length - 1];

        if (!isNaN(idOfPrisoner) && idOfPrisoner.trim() !== "") {
            idOfPrisoner = Number(idOfPrisoner);
            setIsUpdate(true);
            //objectOfPrisoners.id = idOfPrisoner;
        } else {
            idOfPrisoner = null;
            setIsUpdate(false);
            setLoading(false);
        }

        // Fetch places data
        placeService
            .getAllPlacesForPostHuman()
            .then((data) => {
                setArrayOfPlaces(data);
                return data;
            })
            .catch((error) => {
                let errMsg = error.message ? error.message : error;
                notification.error({
                    message: t("errors.front-end.fetch.msg-photo-a"),
                    description:
                        t("errors.front-end.fetch.description") + errMsg,
                });
                throw error;
            });

        if (idOfPrisoner) {
            humanService
                .getHumanByIdForPostHuman(idOfPrisoner)
                .then(async (data) => {

                    const fileObjects = await convertFiles(data.files);
                    console.log("ошибка с получением фотографий (data.files функция urlToFile) 2:",fileObjects)
                   
                    setObjectOfPrisoners({
                        ...data,
                        id: idOfPrisoner,
                        files: fileObjects,
                    });
                    setDataLoaded(true); // Ensure that data is fully loaded
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
                    setDataLoaded(true); // Ensure that data is fully loaded even if there is an error
                    throw errorPrisoner;
                });
        } else {
            setDataLoaded(true); // Ensure that data is fully loaded even if no prisoner ID
        }

        setLoading(false); // Set loading to false after processing all data
    }, [t, convertFiles]);

    // Check if the data is loaded and has valid content
    if (loading || !dataLoaded) {
        return <PageTemplate content={<Spinner size="large" />} />;
    } else if (arrayOfPlaces.length === 0){
        return <NotFound message={"404 | Fill places of detention before creating a prisonwer"}/>; 
    }else if (!objectOfPrisoners) {
        return <NotFound/>;
    }  else {
        return (
            <NewHuman
                arrayOfPlaces={arrayOfPlaces}
                objectOfPrisoners={objectOfPrisoners}
                isUpdate={isUpdate}
            />
        );
    }
}

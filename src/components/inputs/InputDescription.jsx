import { React, useCallback, useEffect, useState } from "react";
import "../../assets/styles/inputs/InputDescription.css";
import { useTranslation } from "react-i18next";
import FileUploadWithDragAndDrop from "../other/FileUploadWithDragAndDrop";

export default function InputDescription({
    onFileChange,
    onStoryChange,
    typesDisallowed = [],
    value,
    valueFiles = [],
}) {
    const { t } = useTranslation();
    const [fileList, setFileList] = useState([]);

    // Обновляем fileList при изменении valueFiles
    // useEffect(() => {
    //     // Check if the new files differ from the current fileList
    //     const updatedFiles = valueFiles.map((file) => ({
    //         uid: file.name + "-" + file.lastModified,
    //         id: file.id,
    //         name: file.name,
    //         type: file.type,
    //         status: "done",
    //         file,
    //         preview:
    //             file.cameFrom === "yandex" ? file.preview :
    //                 file.type?.startsWith("image/") ? URL.createObjectURL(file)
    //                     : null


    //         ,
    //     }));

    //     // Prevent unnecessary state updates by comparing existing and new files
    //     const hasChanged = updatedFiles.some(
    //         (newFile, index) =>
    //             !fileList[index] || fileList[index].uid !== newFile.uid,
    //     );

    //     if (hasChanged) {
    //         // Cleanup existing previews
    //         fileList.forEach((file) => {
    //             if (file.preview) {
    //                 URL.revokeObjectURL(file.preview);
    //             }
    //         });
    //         setFileList(updatedFiles);
    //     }

    //     return () => {
    //         // Cleanup previews for the new files when component unmounts or fileList changes
    //         updatedFiles.forEach((file) => {
    //             if (file.preview) {
    //                 URL.revokeObjectURL(file.preview);
    //             }
    //         });
    //     };
    // }, [valueFiles, fileList]);

    useEffect(() => {
        //console.log("inside use effect descr",valueFiles)
        // Только обновляем state, если действительно что-то изменилось
        const updatedFiles = valueFiles.map((file) => {
            // Проверяем, является ли файл изображением
            let isImage;
            if (file?.cameFrom === "yandex") {
                isImage = file?.preview?.match(/\.(jpeg|jpg|png|gif|bmp|tiff|svg)$/i)
            } else {
                isImage = file?.type?.startsWith("image/");
            }
            return {
                ...file,
                preview: file?.cameFrom === "yandex"
                    ? file.preview // Яндекс может передавать только preview
                    : isImage
                        ? URL.createObjectURL(file.file) // Для изображений генерируем preview
                        : null,
                isMain: file.isMain, // Устанавливаем флаг isMain для первого изображения
            };
        });

        // Проверка на изменения для минимизации рендеров
        const hasChanged = updatedFiles.some(
            (newFile, index) =>
                !fileList[index] || fileList[index].uid !== newFile.uid
        );

        if (hasChanged) {
            // Очистка старых preview
            fileList.forEach((file) => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });

            setFileList(updatedFiles); // Обновляем fileList
        }

       // console.log("inside use effect descr 2",valueFiles)



        return () => {
            updatedFiles.forEach((file) => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [valueFiles]); // Зависимость только от valueFiles


    const handleFileInputChange = useCallback(
        (event) => {
            if (event.target && event.target.files) {
                const files = event.target.files;
                const newFilesArray = Array.from(files);
                const validatedFiles = newFilesArray.map((file, index) => {
                    let isImage=false;
                    if (file?.cameFrom === "yandex") {
                        isImage = file?.preview?.match(/\.(jpeg|jpg|png|gif|bmp|tiff|svg)$/i)
                    } else {
                        isImage = file?.type?.startsWith("image/");
                    }


                    return {
                        uid: file.name + "-" + file.lastModified,
                        name: file.name,
                        type: file.type,
                        status: "done",
                        isMain: index === 0 && isImage,  // Устанавливаем флаг isMain для первого изображения
                        file,
                        preview:
                            file.cameFrom === "yandex"
                                ? file.preview // Яндекс может передавать только preview
                                : isImage
                                    ? URL.createObjectURL(file) // Для изображений генерируем preview
                                    : null,
                    };
                });

                const updatedFileList = [...fileList, ...validatedFiles];
                setFileList(updatedFileList);
                onFileChange(updatedFileList); // Передаем весь объект файла, включая дополнительные свойства
            }
        },
        [fileList, onFileChange],
    );

    return (
        <div className="story">
            <div className="attachment">
                {/* <label htmlFor="image" className="input-file"></label>
                <input  type="file" name="image" id="image" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg" onChange={handleFileInputChange} multiple />
                <label htmlFor="video" className="input-file"></label>
                <input  type="file" name="video" id="video" accept=".mp4,.avi,.mov,.mkv,.flv,.wmv,.webm" onChange={handleFileInputChange} multiple />
                {typesDisallowed.includes("doc") ? <></> : <>
                    <label htmlFor="document" className="input-file"></label>
                    <input  type="file" name="document" id="document" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar" onChange={handleFileInputChange} multiple />
                </>}
                <FileUploadWithDragAndDrop
                    fileList={fileList}
                    setFileList={setFileList}
                    onFileChange={onFileChange} 
                    typesDisallowed={typesDisallowed}
                /> */}
                {/* Добавляем текстовое описание для каждого label */}
                <label htmlFor="image" className="input-file">
                    Upload Image
                </label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg"
                    onChange={handleFileInputChange}
                    multiple
                />

                {typesDisallowed.includes("video") ? (
                    <></>
                ) : (<>
                    <label htmlFor="video" className="input-file">
                        Upload Video
                    </label>
                    <input
                        type="file"
                        name="video"
                        id="video"
                        accept=".mp4,.avi,.mov,.mkv,.flv,.wmv,.webm"
                        onChange={handleFileInputChange}
                        multiple
                    />
                </>)}


                {typesDisallowed.includes("doc") ? (
                    <></>
                ) : (
                    <>
                        <label htmlFor="document" className="input-file">
                            Upload Document
                        </label>
                        <input
                            type="file"
                            name="document"
                            id="document"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar"
                            onChange={handleFileInputChange}
                            multiple
                        />
                    </>
                )}

                <span style={{ "color": "#e4b474", textAlign: "end" }}>! Размер файлов не должен превышать 25мб ! Изображение с красной единичкой - это превью, убедитесь, чтобы только одна картинка была с ним !</span>

                <FileUploadWithDragAndDrop
                    fileList={fileList}
                    setFileList={setFileList}
                    onFileChange={onFileChange}
                    typesDisallowed={typesDisallowed}
                />
            </div>

            <textarea
                name="story"
                id="story"
                value={value}
                placeholder={t("add-story.placeholder.story-text")}
                onChange={onStoryChange}
            ></textarea>
        </div>
    );
}

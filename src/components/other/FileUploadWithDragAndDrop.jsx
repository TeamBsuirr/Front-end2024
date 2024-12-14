import React, { useEffect, useState } from "react";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import removeIcon from "../../assets/images/icons/other/removeIcon.svg";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { notification } from "antd";

// SVG для удаления
const RemoveIcon = () => <img src={removeIcon} alt="Remove" />;

// Компонент для элемента списка с перетаскиванием
const DraggableUploadListItem = ({ file, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: file.uid,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: "move",
        borderColor: file.status === "error" ? "red" : "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px",
        marginBottom: "4px",
        marginTop: "14px",
        backgroundColor: "#E0CDB4",
        border: "1px solid #1F1B16",
        borderRadius: "4px",
    };

    return (
        <div ref={setNodeRef} style={style} className={isDragging ? "is-dragging" : ""} {...attributes} {...listeners}>
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {file.preview && (
                    <img
                        src={file.preview}
                        alt="Preview"
                        style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                        }}
                    />
                )}
                {file.isMain && (
                    <span
                        style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "red",
                            marginLeft: "4px",
                        }}
                    >
                        1
                    </span>
                )}
                {file.name}
            </div>
            <button
                onClick={() => onRemove(file.uid)}
                style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                }}
            >
                <RemoveIcon />
            </button>
        </div>
    );
};

// Основной компонент загрузки с перетаскиванием
const FileUploadWithDragAndDrop = ({ fileList, setFileList, onFileChange, typesDisallowed }) => {
    const [previewFiles, setPreviewFiles] = useState([]);
    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    // Обработка загрузки файлов
    useEffect(() => {
       

        const newPreviewFiles = fileList.map((file) => {
            if (!file.preview && file.type?.startsWith("image/")) {
                if (file.file.cameFrom === "yandex") {
                    return { ...file, preview: file.file };
                }
                return { ...file, preview: URL.createObjectURL(file.file) };
            }
            return file;
        });

        // Обновляем состояние previewFiles, если оно изменилось
        const hasChanged = newPreviewFiles.some(
            (file, index) => previewFiles[index]?.preview !== file.preview
        );

        if (hasChanged) {
            setPreviewFiles(newPreviewFiles);
        }

      
        // Очистка object URL
        return () => {
            newPreviewFiles.forEach((file) => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [fileList, previewFiles]);

    // Обработка окончания перетаскивания
    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            const reorderedFiles = arrayMove(
                fileList,
                fileList.findIndex((i) => i.uid === active.id),
                fileList.findIndex((i) => i.uid === over?.id)
            );

            // Устанавливаем флаг isMain после перетаскивания
            const filesWithMainFlag = setMainFileFlag(reorderedFiles);
            setFileList(filesWithMainFlag);
            onFileChange(filesWithMainFlag);  // Передаем обновленные файлы
        }
    };

    // Удаление файла
    const handleRemove = (uid) => {
        const updatedFiles = fileList.filter((file) => file.uid !== uid);
        setFileList(updatedFiles);
        onFileChange(updatedFiles);  // Передаем обновленный список файлов с метаданными
    };

    // Обработка изменения файлов в input
    const handleFileInputChange = (event) => {
        if (event.target && event.target.files) {
            const files = Array.from(event.target.files);
            const newFiles = files.map((file,index) => {
                let isImage =false;
                if (file?.cameFrom === "yandex") {
                    isImage = file?.preview?.match(/\.(jpeg|jpg|png|gif|bmp|tiff|svg)$/i)
                } else {
                    isImage = file?.type?.startsWith("image/");
                }

                return {
                    uid: file.name + "-" + file.lastModified,
                    name: file.name,
                    type: file.type,
                    file,
                    preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
                    isMain: index === 0 && isImage, // По умолчанию первый файл не главный
                    status: "done",
                }
            });

            // Устанавливаем флаг isMain для первого изображения
            const imageFiles = newFiles.filter((file) => file.type.startsWith("image/"));
            if (imageFiles.length > 0 && fileList.length === 0) {
                imageFiles[0].isMain = true; // Первое изображение будет основным
            }

            const validatedFiles = newFiles.map(validateFiles);

            setFileList((prevFiles) => {
                const updatedFileList = [...prevFiles, ...validatedFiles];
                return setMainFileFlag(updatedFileList);
            });

            setPreviewFiles((prevFiles) => [
                ...prevFiles,
                ...newFiles.filter((file) => file.preview),
            ]);
            onFileChange([...fileList, ...validatedFiles]);  // Передаем файлы с метаданными
        }
    };

    // Валидация файлов
    const validateFiles = (file) => {
        const fileType = file.type;
        if (typesDisallowed.includes(fileType)) {
            notification.error({
                message: `Недопустимый тип файла: ${file.name}`,
                description: `Тип файла ${fileType} не разрешен.`,
            });
            return {
                ...file,
                status: "error",
            };
        }
        return file;
    };

    // Функция для установки флага isMain для первого изображения
    const setMainFileFlag = (files) => {
        const imageFiles = files.filter((file) => {

            let fileType;

            if (file.cameFrom === "yandex") {
                const preview = file?.preview;
                if (preview && preview.match(/\.(jpeg|jpg|png|gif|bmp|tiff|svg)$/i)) {
                    fileType = "image/jpeg"; // Можно указать любой подходящий тип, например "image/jpeg" для всех
                } else {
                    fileType = undefined
                }
            } else {
                fileType = file.type || (file.file && file.file.type);
            }

            return fileType && fileType.startsWith("image/");
        });

        if (imageFiles.length > 0) {
            // Для всех изображений установим isMain = true только для первого
            imageFiles.forEach((file, index) => {
                file.isMain = index === 0;
            });
        }

        return files;
    };


    const sortedFileList = fileList
        .map((file) => {
            if (file.cameFrom === "yandex") {
                return {
                    ...file,
                    preview: file.preview || (file.file && file.file.type.startsWith("image/") ? file.file : null),
                    type: file.file ? file.file.type : 'image/jpeg', // Берем тип из файла или по умолчанию
                };
            }

            return {
                ...file,
                preview: file.preview || (file.file && file.file.type.startsWith("image/") ? URL.createObjectURL(file.file) : null),
                type: file.type || (file.file && file.file.type) || 'application/octet-stream', // Обеспечиваем тип
            };
        })
        .filter((file) => {
            const fileType = file.type || (file.file && file.file.type);
            return fileType && fileType.startsWith("image/");
        })
        .sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0))  // Сортируем изображения по флагу isMain
        .concat(
            fileList
                .map((file) => {
                    if (file.cameFrom === "yandex") {
                        return {
                            ...file,
                            preview: file.preview || (file.file && file.file.type.startsWith("image/") ? file.file : null),
                            type: file.file ? file.file.type : 'image/jpeg',
                        };
                    }

                    return {
                        ...file,
                        preview: file.preview || (file.file && file.file.type.startsWith("image/") ? URL.createObjectURL(file.file) : null),
                        type: file.type || (file.file && file.file.type) || 'application/octet-stream',
                    };
                })
                .filter((file) => {
                    const fileType = file.type || (file.file && file.file.type);
                    return !fileType || !fileType.startsWith("image/");  // Отфильтровываем не изображения
                })
        );


    return (
        <div>
            <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg,.mp4,.avi,.mov,.mkv,.flv,.wmv,.webm,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar"
                multiple
                onChange={handleFileInputChange}
                style={{ marginBottom: "10px" }}
            />
            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                <SortableContext
                    items={sortedFileList.map((i) => i.uid)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="sortable-file-list">
                        {sortedFileList.map((file) => (
                            <DraggableUploadListItem
                                key={file.uid}
                                file={file}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default FileUploadWithDragAndDrop;

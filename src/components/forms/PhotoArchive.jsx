import { React, useEffect, useState } from "react";
import "../../assets/styles/forms/PhotoArchive.css";

import { useTranslation } from "react-i18next";
import ButtonAdmin from "../buttons/ButtonAdmin";
import HeaderSection from "../other/HeaderSection";
import ButtonCrud from "../buttons/ButtonCrud";
import searchService from "../../api/services/searchService";
import { notification } from "antd";
import PaginationLayout from "../layout/PaginationLayout";

export default function PhotoArchive({
    arrayOfPhotoObjects,
    isAdmin = false,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages,
    totalElements
}) {
    // const navigate = useLocalizedNavigate();
    const { t } = useTranslation();
    const [selectedObject, setSelectedObject] = useState(null);
    const [photoArray, setPhotoArray] = useState(arrayOfPhotoObjects); // Храним массив фотографий

    useEffect(() => { }, [photoArray]);

    function openImage(index) {
        if (photoArray[index]) {
            setSelectedObject(photoArray[index]);
        }
    }

    function closeModal() {
        setSelectedObject(null);
    }

    const handleDelete = async (id) => {
        try {
            await searchService.deletePhotoById(id);

            // Обновляем массив, удаляя элемент с соответствующим id
            const updatedPhotoArray = photoArray.filter(
                (photo) => photo.id !== id,
            );
            setPhotoArray(updatedPhotoArray); // Обновляем состояние массива фотографий

            // console.log('Admin logged in successfully');
            notification.success({ message: t("success deleted photo!") });

            //setTimeout(() => navigate("/archive/photos"), 1000)
            // Здесь можно выполнить дополнительные действия, например, перенаправление на защищенную страницу
        } catch (err) {
            // Check if the error object contains a specific error response message
            const errorMessage =
                err.response?.data?.message || t("delete error");

            // Display an error notification with a specific or fallback message
            notification.error({
                message: errorMessage,
            });

            // Log the error details for debugging
            console.error("Error occurred during deletion:", err);
        }
    };

    return (
        <div className="section-search-result">
            <section className="section-form-search-result">
                <HeaderSection textFirst={t("photo-archive.header")} />
                {isAdmin ? (
                    <>
                        <div className="container-description-map-admin">
                            <span>{t("photo-archive.additional-text")}</span>
                            <div className="admin-btn-container">
                                <ButtonAdmin
                                    isColorsInverse={false}
                                    themeColor="black"
                                    href="/crud/photo"
                                    spanText={t(
                                        "admin-panel.btn.add-photo-archive",
                                    )}
                                    size="s"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="container-description-map">
                        <span>{t("photo-archive.additional-text")}</span>
                    </div>
                )}
            </section>
            {/* ADD TOP BORDER TO THIS */}
            <section className="section-register-search-result">
                {photoArray.map((obj, index) => (
                    <div className="result-container-archive" key={index}>
                        <button
                            onClick={() => {
                                openImage(index);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") openImage(index);
                            }}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                            }} // Убираем стили кнопки
                            tabIndex={0} // Делаем элемент фокусируемым
                        >
                            <img src={obj.image.urlToFile} alt={"#" + index} />
                        </button>
                        <div className="result-container-archive-description">
                            <h3>{obj.title}</h3>
                            {isAdmin ? (
                                <>
                                    <div className="admin-btn-container-archive ">
                                        <ButtonCrud
                                            href={`/crud/photo/${obj?.id}`}
                                            svgType="edit"
                                        />
                                        <ButtonCrud
                                            href="none"
                                            onClick={() =>
                                                handleDelete(obj?.id)
                                            }
                                            svgType="delete"
                                        />
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                ))}

                {selectedObject && (
                    <div
                        className="modal"
                        onClick={closeModal}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") closeModal;
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.stopPropagation();
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            <img
                                src={selectedObject.image.urlToFile}
                                alt="Selected"
                            />
                            <div className="modal-description">
                                <h3>{selectedObject.title}</h3>
                                <span>{selectedObject.description}</span>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <PaginationLayout
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalPages={totalPages}
                totalElements={totalElements}
            />
        </div>
    );
}

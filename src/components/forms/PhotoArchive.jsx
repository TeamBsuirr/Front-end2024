import { React, useEffect, useState } from "react";
import "../../assets/styles/forms/PhotoArchive.css";
import { useTranslation } from "react-i18next";
import HeaderSection from "../other/HeaderSection";
import PaginationLayout from "../layout/PaginationLayout";


export default function PhotoArchive({
    arrayOfPhotoObjects,
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

    useEffect(() => { }, [photoArray,setPhotoArray]);

    function openImage(index) {
        if (photoArray[index]) {
            setSelectedObject(photoArray[index]);
        }
    }

    function closeModal() {
        setSelectedObject(null);
    }

    return (
        <div className="section-search-result">
            <section className="section-form-search-result">
                <HeaderSection textFirst={t("photo-archive.header")} />

                <div className="container-description-map">
                    <span>{t("photo-archive.additional-text")}</span>
                </div>

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

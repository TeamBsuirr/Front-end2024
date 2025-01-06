
import "../../assets/styles/layout/PaginationLayout.css";
import { useTranslation } from "react-i18next";

import arrowSvg from "../../assets/images/icons/other/arrow.svg";
import { handlePagination } from "../../utils/globalFunctions";

export default function PaginationLayout({
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages,
    totalElements
}) {
    const { t } = useTranslation();

    return (
        <section className="pagination-container">

            <div className="pagination-container-btn-l">

                <button
                    onClick={() => handlePagination({ type: "backward", currentPage, setCurrentPage, totalPages })}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") setCurrentPage(null);
                    }}
                    style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                    }} // Убираем стили кнопки
                    tabIndex={0} // Делаем элемент фокусируемым
                >
                    <img src={arrowSvg} alt="arrow" />
                </button>

            </div>

            <div className="pagination-spans">
                <span>
                    {t("pagination.number-page")} : {currentPage + 1} / {totalPages}
                </span>
                <span>
                    ---
                </span>
                <span>
                    {t("pagination.element-page")} : {itemsPerPage} / {totalElements}
                </span>
            </div>

            <div className="pagination-container-btn-r">

                <button
                    onClick={() => handlePagination({ type: "forward", currentPage, setCurrentPage, totalPages })}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") setCurrentPage(null);
                    }}
                    style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                    }} // Убираем стили кнопки
                    tabIndex={0} // Делаем элемент фокусируемым
                >
                    <img src={arrowSvg} alt="arrow" />
                </button>

            </div>

        </section>
    );
}

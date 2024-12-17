import { React, useCallback, useEffect, useState } from "react";
import "../../assets/styles/forms/SearchResults.css";
import "../../assets/styles/forms/PrisonerSearchResult.css";
import xIcon from "../../assets/vectors/x-icon.svg";
import searchIcon from "../../assets/images/icons/search/searchIcon.svg";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import HeaderSection from "../other/HeaderSection";
import useLocalizedNavigate from "../../utils/useLocalizedNavigate";
import PaginationLayout from "../layout/PaginationLayout";
import ButtonCrud from "../buttons/ButtonCrud";
import placeService from "../../api/services/placeService";
import humanService from "../../api/services/humanService";

export default function SearchResults({
    arrayFoundObjects,
    currentPage,
    isAdmin=false,
    setLoading,
    setCurrentPage,
    itemsPerPage,
    totalPages,
    totalElements
}) {
    const { t } = useTranslation();
    const navigate = useLocalizedNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const searchForValue = searchParams.get("searchFor") || ""; // Default to "" if 'searchFor' is not present

    const [searchInputValue, setSearchInputValue] = useState(searchForValue);
    const [selectedFilter, setSelectedFilter] = useState(
        t("search.parameters.show-all"),
    );
    const [filteredObjects, setFilteredObjects] = useState(arrayFoundObjects);

    //console.log(filteredObjects)

    function clickGlobalSearchButton() {
        if (searchInputValue !== "") {
            //window.location.href = `/search?searchFor=${searchInputValue}`;
            navigate(
                `/search?searchFor=${encodeURIComponent(searchInputValue)}`,
            );
            window.location.reload();
        } else {
            notification.warning({
                message: t("errors.front-end.empty-search-field"),
                description: t(
                    "errors.front-end.empty-search-field-description",
                ),
            });
        }
    }

    function clickDeleteInputBtn() {
        if (searchInputValue !== "") {
            setSearchInputValue("");
        } else {
            notification.warning({
                message: t("errors.front-end.empty-search-field"),
                description: t(
                    "errors.front-end.empty-search-field-description",
                ),
            });
        }
    }

    const filterHistories = useCallback(
        (value) => {
            if (value === t("search.parameters.show-all")) {
                setFilteredObjects(arrayFoundObjects);
            } else if (value === t("search.parameters.places")) {
                setFilteredObjects(
                    arrayFoundObjects.filter((obj) => obj.type === "places"),
                );
            } else if (value === t("search.parameters.prisoners")) {
                setFilteredObjects(
                    arrayFoundObjects.filter((obj) => obj.type === "humans"),
                );
            }
        },
        [arrayFoundObjects, t],
    );

    const handleDelete = async (obj) => {
        const id = obj.id;
        if (obj.type === "places") {
            try {
                setLoading(true);
                await placeService.deletePlaceById(id);

                // console.log('Admin logged in successfully');
                notification.success({ message: t("sucess deleted place") });
                setTimeout(window.location.reload(),500)
                
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
            } finally {
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                await humanService.deleteHumanById(id);

                // console.log('Admin logged in successfully');
                notification.success({ message: t("sucess deleted prisoner") });


                setTimeout(window.location.reload(),500)
                
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
            } finally {
                setLoading(false);
            }
        }


    };

    useEffect(() => {
        const inputs = document.querySelectorAll("#sort-arrayFoundObjects");
        const lists = document.querySelectorAll(".list");
        const listItems = document.querySelectorAll(".list li");

        const handleInputClick = (event) => {
            hideList();
            event.target.nextElementSibling.style.display = "block";
        };

        const handleListMouseLeave = (event) => {
            event.target.style.display = "none";
        };

        const handleListItemClick = (event) => {
            const value = event.target.textContent;
            setSelectedFilter(value);
            filterHistories(value);
        };

        inputs.forEach((elem) => {
            elem.addEventListener("click", handleInputClick);
        });

        lists.forEach((elem) => {
            elem.addEventListener("mouseleave", handleListMouseLeave);
        });

        listItems.forEach((elem) => {
            elem.addEventListener("click", handleListItemClick);
        });

        function hideList() {
            lists.forEach((elem) => {
                elem.style.display = "none";
            });
        }

        // Cleanup event listeners on component unmount
        return () => {
            inputs.forEach((elem) => {
                elem.removeEventListener("click", handleInputClick);
            });
            lists.forEach((elem) => {
                elem.removeEventListener("mouseleave", handleListMouseLeave);
            });
            listItems.forEach((elem) => {
                elem.removeEventListener("click", handleListItemClick);
            });
        };
    }, [filterHistories]);

    return (
        <div className="section-search-result">
            <section className="section-form-search-result">
                <HeaderSection
                    textFirst={t("ref.main")}
                    textSecond={t("search.header")}
                    isMarginLeftText={true}
                />

                <div className="container-form-search-result">
                    <div className="search-bar-search-result">
                        <input
                            type="text"
                            placeholder={t("search.placeholder")}
                            value={searchInputValue}
                            onChange={(event) => {
                                setSearchInputValue(event.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.code === "Enter") clickGlobalSearchButton();
                                if (e.code === "Delete") clickDeleteInputBtn();
                            }}
                        />
                        <button
                            onClick={clickDeleteInputBtn}
                            onKeyDown={(e) => {
                                if (e.code === "Delete") clickDeleteInputBtn();
                            }}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                            }} // Убираем стили кнопки
                            tabIndex={0} // Делаем элемент фокусируемым
                        >
                            <img src={xIcon} alt="delete" />
                        </button>
                        <button onClick={clickGlobalSearchButton}

                            onKeyDown={(e) => {
                                if (e.code === "Enter") clickGlobalSearchButton();
                            }}
                        >
                            <img src={searchIcon} alt="Search" />
                        </button>
                    </div>
                </div>

                <div className="container-result-search-result">
                    <span>
                        {t("search.number-of-results")} {totalElements}
                    </span>

                    <div className="container-result-search-result-for-filter">
                        <input
                            className="input-filter"
                            type="text"
                            name="sort-arrayFoundObjects"
                            id="sort-arrayFoundObjects"
                            value={selectedFilter}
                            readOnly
                        />
                        <ul className="list">
                            <li>{t("search.parameters.show-all")}</li>
                            <li>{t("search.parameters.places")}</li>
                            <li>{t("search.parameters.prisoners")}</li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* ADD TOP BORDER TO THIS */}
            <section className="section-register-search-result">
                {filteredObjects.map((obj) => (
                    <div
                        className="result-container-search-result"
                        key={obj.id}
                    >
                        <button
                            onClick={() => {
                                const hrefString =
                                    obj.type === "humans"
                                        ? "/search/prisoner/"
                                        : "/search/place/";
                                navigate(hrefString + obj.id);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const hrefString =
                                        obj.type === "humans"
                                            ? "/search/prisoner/"
                                            : "/search/place/";
                                    navigate(hrefString + obj.id);
                                }
                            }}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                            }} // Убираем стили кнопки
                            tabIndex={0} // Делаем элемент фокусируемым
                        >
                            <img src={obj.img} alt={" #" + 1} />
                        </button>
                        <div className="result-container-search-result-description">
                            <h3>{obj.header}</h3>
                            <span>{obj.description}</span>
                            {isAdmin ? (
                                <>
                                    <div className="admin-btn-container-prisoners ">
                                        <ButtonCrud
                                            href={`/crud/${obj.type === "places" ? "place" : "human"}/${obj?.id}`}
                                            svgType="edit"
                                        />
                                        <ButtonCrud
                                            href="none"
                                            onClick={() =>
                                                handleDelete(obj)
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

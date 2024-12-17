import { React, useEffect } from "react";
// import '../../assets/styles/forms/SearchResults.css'
import "../../assets/styles/forms/PrisonerSearchResult.css";
import { useTranslation } from "react-i18next";
import ButtonAdmin from "../buttons/ButtonAdmin";
import HeaderSection from "../other/HeaderSection";
import useLocalizedNavigate from "../../utils/useLocalizedNavigate";
import PaginationLayout from "../layout/PaginationLayout";
import humanService from "../../api/services/humanService";
import { notification } from "antd";
import ButtonCrud from "../buttons/ButtonCrud";


export default function PrisonerSearchResult({
    histories,
    places,
    years,
    isAdmin = false,
    setLoading,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages,
    totalElements,
    selectedPlace,        // Новый пропс
    setSelectedPlace,     // Новый пропс
    selectedCalendar,     // Новый пропс
    setSelectedCalendar,  // Новый пропс
    selectedAlphabet,     // Новый пропс
    setSelectedAlphabet   // Новый пропс

}) {
    const navigate = useLocalizedNavigate();
    const { t } = useTranslation();
    //const [filteredHistories, setFilteredHistories] = useState(histories);



    // const filterHistories = useCallback(
    //     (value, type) => {
    //         let updatedHistories = [...histories];

    //         if (type === "sort-place") {
    //             setSelectedPlace(value);
    //             if (value !== t("stories.filter.place")) {
    //                 updatedHistories = updatedHistories.filter((obj) =>
    //                     obj.places.includes(value),
    //                 );
    //             }
    //         }

    //         if (type === "sort-calendar") {
    //             setSelectedCalendar(value);
    //             if (value !== t("stories.filter.year")) {
    //                 updatedHistories = updatedHistories.filter((obj) =>
    //                     obj.years.includes(value),
    //                 );
    //             }
    //         }

    //         if (type === "sort-alphabet") {
    //             if (value === t("stories.sort.alphabetically")) {
    //                 updatedHistories = updatedHistories.sort((a, b) =>
    //                     a.header.localeCompare(b.header),
    //                 );
    //             } else if (value === t("stories.sort.counter-alphabetically")) {
    //                 updatedHistories = updatedHistories.sort((a, b) =>
    //                     b.header.localeCompare(a.header),
    //                 );
    //             } else if (value === t("stories.sort.by-date")) {
    //                 updatedHistories = updatedHistories.sort(
    //                     (a, b) =>
    //                         new Date(b.dateCreated) - new Date(a.dateCreated),
    //                 );
    //             }
    //         }

    //         setFilteredHistories(updatedHistories);
    //     },
    //     [histories, t],
    // );

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await humanService.deleteHumanById(id);

            // console.log('Admin logged in successfully');
            notification.success({ message: t("sucess deleted prisoner") });


            window.location.reload();
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
    };

    useEffect(() => {
        const inputs = document.querySelectorAll("input");
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
            const input = event.target.closest(".list").previousElementSibling;
            input.value = event.target.textContent;

            // console.log("вставить значение фильтра: ", event.target.textContent)
            if (input.name === "sort-place") {
                //console.log("вставил 1")
                setSelectedPlace(event.target.textContent);
            } else if (input.name === "sort-calendar") {
                //console.log("вставил 2")
                setSelectedCalendar(event.target.textContent);
            } else if (input.name === "sort-alphabet") {
                //console.log("вставил 3")
                setSelectedAlphabet(event.target.textContent);
            }

            // filterHistories(event.target.textContent, input.name);
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
    }, [histories]);

    return (
        <div className="section-search-result">
            <section className="section-form-search-result">
                <HeaderSection textFirst={t("stories.header")} />

                {/* 
        <div className='container-description-prisoners'>
          <span>{t('stories.additional-text')}</span>
        </div> */}

                {isAdmin ? (
                    <>
                        <div className="container-description-prisoners-admin">
                            <span>{t("stories.additional-text")}</span>
                            <div className="admin-btn-container">
                                <ButtonAdmin
                                    isColorsInverse={false}
                                    themeColor="black"
                                    href="/crud/human"
                                    spanText={t("admin-panel.btn.add-story")}
                                    size="m"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="container-description-prisoners">
                        <span>{t("stories.additional-text")}</span>
                    </div>
                )}
            </section>
            {/* ADD TOP BORDER TO THIS */}
            <section className="section-register-search-result">
                <div className="container">
                    <div className="sort-field">
                        <div className="place">
                            <input
                                className="input-filter"
                                type="text"
                                name="sort-place"
                                id="sort-place"
                                value={selectedPlace}
                                readOnly
                            />
                            <ul className="list">
                                {places.map((place, index) => (
                                    <li key={index}>{place}</li>
                                ))}
                                <li>{t("stories.filter.place")}</li>
                            </ul>
                        </div>
                        <div className="calendar">
                            <input
                                className="input-filter"
                                type="text"
                                name="sort-calendar"
                                id="sort-calendar"
                                value={selectedCalendar}
                                readOnly
                            />
                            <ul className="list">
                                {years.map((year, index) => (
                                    <li key={index}>{year}</li>
                                ))}
                                <li>{t("stories.filter.year")}</li>
                            </ul>
                        </div>
                        <div className="alphabet">
                            <input
                                className="input-filter"
                                type="text"
                                name="sort-alphabet"
                                id="sort-alphabet"
                                value={selectedAlphabet}
                                readOnly
                            />
                            <ul className="list">
                                <li>{t("stories.sort.alphabetically")}</li>
                                <li>
                                    {t("stories.sort.counter-alphabetically")}
                                </li>
                                <li>{t("stories.sort.by-date")}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {histories.map((obj) => (
                    <div
                        className="result-container-search-result"
                        key={obj.id}
                    >
                        <button
                            onClick={() => {
                                navigate("/search/prisoner/" + obj.id);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    navigate("/search/prisoner/" + obj.id);
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
                                            href={`/crud/human/${obj?.id}`}
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

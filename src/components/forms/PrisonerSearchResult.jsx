import { React, useEffect } from "react";
import "../../assets/styles/forms/PrisonerSearchResult.css";
import { useTranslation } from "react-i18next";
import HeaderSection from "../other/HeaderSection";
import useLocalizedNavigate from "../../utils/useLocalizedNavigate";
import PaginationLayout from "../layout/PaginationLayout";



export default function PrisonerSearchResult({
    histories,
    places,
    years,
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
                <div className="container-description-prisoners">
                    <span>{t("stories.additional-text")}</span>
                </div>
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

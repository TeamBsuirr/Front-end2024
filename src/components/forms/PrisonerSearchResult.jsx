import { React, useCallback, useEffect, useState } from "react";
import "../../assets/styles/forms/PrisonerSearchResult.css";
import { useTranslation } from "react-i18next";
import HeaderSection from "../other/HeaderSection";
import useLocalizedNavigate from "../../utils/useLocalizedNavigate";

export default function PrisonerSearchResult({
    histories,
    places,
    years,
}) {
    const navigate = useLocalizedNavigate();
    const { t } = useTranslation();
    const [filteredHistories, setFilteredHistories] = useState(histories);
    const [selectedPlace, setSelectedPlace] = useState(
        t("stories.filter.place"),
    );
    const [selectedCalendar, setSelectedCalendar] = useState(
        t("stories.filter.year"),
    );
    const [selectedAlphabet, setSelectedAlphabet] = useState(
        t("stories.sort.alphabetically"),
    );

    const filterHistories = useCallback(
        (value, type) => {
            let updatedHistories = [...histories];

            if (type === "sort-place") {
                setSelectedPlace(value);
                if (value !== t("stories.filter.place")) {
                    updatedHistories = updatedHistories.filter((obj) =>
                        obj.places.includes(value),
                    );
                }
            }

            if (type === "sort-calendar") {
                setSelectedCalendar(value);
                if (value !== t("stories.filter.year")) {
                    updatedHistories = updatedHistories.filter((obj) =>
                        obj.years.includes(value),
                    );
                }
            }

            if (type === "sort-alphabet") {
                if (value === t("stories.sort.alphabetically")) {
                    updatedHistories = updatedHistories.sort((a, b) =>
                        a.header.localeCompare(b.header),
                    );
                } else if (value === t("stories.sort.counter-alphabetically")) {
                    updatedHistories = updatedHistories.sort((a, b) =>
                        b.header.localeCompare(a.header),
                    );
                } else if (value === t("stories.sort.by-date")) {
                    updatedHistories = updatedHistories.sort(
                        (a, b) =>
                            new Date(b.dateCreated) - new Date(a.dateCreated),
                    );
                }
            }

            setFilteredHistories(updatedHistories);
        },
        [histories, t],
    );

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

            filterHistories(event.target.textContent, input.name);
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

                {filteredHistories.map((obj) => (
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
        </div>
    );
}

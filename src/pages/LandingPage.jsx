import { useState } from "react";
import "../assets/styles/LandingPage.css";
import ButtonSubmit from "../components/buttons/ButtonSubmit";
import searchIcon from "../assets/images/icons/search/searchIcon.svg";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import useLocalizedNavigate from "../utils/useLocalizedNavigate";

export default function LandingPage() {
    const { t } = useTranslation();
    const navigate = useLocalizedNavigate();

    let isLngWarn = false;
    const [searchInputValue, setSearchInputValue] = useState("");

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

    function clickGlobalSearchButton() {
        //console.log(localStorage.getItem('language'), isLngWarn)

        if (searchInputValue !== "") {
            if (localStorage.getItem("language") !== "ru" && !isLngWarn) {
                isLngWarn = true;
                notification.warning({
                    message: t("errors.front-end.warning-search-title"),
                    description: t(
                        "errors.front-end.warning-search-description",
                    ),
                });
            } else {
                navigate(
                    `/search?searchFor=${encodeURIComponent(searchInputValue)}`,
                );
            }
        } else {
            notification.warning({
                message: t("errors.front-end.empty-search-field"),
                description: t(
                    "errors.front-end.empty-search-field-description",
                ),
            });
        }
    }

    return (
        <>
            <section className="section-background">
                <div className="section-content">
                    <h1>{t("main.title.h1")}</h1>
                    <h2> {t("main.title.h2-1")}</h2>
                    <h2> {t("main.title.h2-2")}</h2>
                    <h2> {t("main.title.h2-3")}</h2>
                    <div className="button-container-landing">
                        <ButtonSubmit
                            isColorsInverse={false}
                            themeColor="yellow"
                            href="/story"
                            spanText={t("add-story.btn.add-story")}
                            size="lg"
                        />
                    </div>
                </div>
            </section>

            <section className="section-search-and-links">
                <div className="search-section">
                    <div className="search-section-container">
                        <h2>{t("search.title")}</h2>
                        <div className="search-bar">
                            <input
                                type="text"
                                value={searchInputValue}
                                onChange={(event) => {
                                    setSearchInputValue(event.target.value);
                                }}
                                placeholder={t("search.placeholder")}
                                onKeyDown={(e) => {
                                    if (e.code === "Enter") clickGlobalSearchButton();
                                    if (e.code === "Delete") clickDeleteInputBtn();
                                }}
                            />
                            
                            
                            <button
                                className="search-button"
                                onClick={clickGlobalSearchButton}
                            >
                                <img src={searchIcon} alt="Search" />
                                {t("search.btn")}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="links-section">
                    <div className="links-section-container">
                        <div className="link-item ">
                            <div className="line-container">
                                <button
                                    className="link-button item1"
                                    onClick={() => {
                                        navigate("/prisoners");
                                    }}
                                >
                                    {t("main.btn.stories")}
                                </button>

                                <p>{t("main.btn-description.stories")}</p>
                            </div>
                        </div>
                        <div className="link-item ">
                            <div className="line-container">
                                <button
                                    className="link-button item2"
                                    onClick={() => {
                                        navigate("/archive/photos");
                                    }}
                                >
                                    {t("main.btn.photo-archive")}
                                </button>
                                <p>
                                    {t(
                                        "main.btn-description.photo-archive",
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="link-item ">
                            <div className="line-container">
                                <button
                                    className="link-button item3"
                                    onClick={() => {
                                        navigate("/map");
                                    }}
                                >
                                    {t("main.btn.places")}
                                </button>
                                <p>{t("main.btn-description.places")}</p>
                            </div>
                        </div>
                        <div className="link-item ">
                            <div className="line-container">
                                <button
                                    className="link-button item4"
                                    style={{
                                        textTransform: "uppercase",
                                        fontSize: "22px",
                                    }}
                                    onClick={() => {
                                        navigate("/archive/analysis");
                                    }}
                                >
                                    {t("main.btn.legal-analysis")}
                                </button>
                                <p>
                                    {t(
                                        "main.btn-description.legal-analysis",
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

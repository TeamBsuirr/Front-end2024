import { React } from "react";
import "../../assets/styles/cards/Card.css";
import "../../assets/styles/layout/DefaultLayout.css";

import Carousel from "../other/Carousel";
import ButtonSubmit from "../buttons/ButtonSubmit";

import { useTranslation } from "react-i18next";


export default function CardPlace({
    objectOfPlace,
}) {

    const { t } = useTranslation();
    const splitIndex = 73; // Количество символов в первой части строки
    const firstPart = objectOfPlace.history.description.slice(0, splitIndex);
    const secondPart = objectOfPlace.history.description.slice(splitIndex);


    return (
        <section className="section-prisoner">
            <div className="container-header-prisoner">
                <div className="container-prisoner-portrait">
                    <img
                        className="img-prisoner-portrait"
                        src={objectOfPlace.previewImg}
                        alt="portrait of a prisoner"
                    ></img>
                </div>
                <div className="container-header-prisoner-content">
                    <h1 className="header-of-container-prisoner">
                        {objectOfPlace.placeName}
                    </h1>

                  

                    <ul>
                        <li>
                            <h2>
                                {t("add-camp.placeholder.date-of-foundation")}:
                            </h2>
                            <span>
                                {objectOfPlace.dateOfFoundation
                                    ? " " +
                                      objectOfPlace.dateOfFoundation +
                                      " г."
                                    : " год не определен"}{" "}
                            </span>
                        </li>
                        <li>
                            <h2>{t("add-camp.placeholder.location")}: </h2>
                            <span>{objectOfPlace.region.centralCity}</span>
                        </li>
                        <li>
                            <h2>
                                {t("add-camp.placeholder.number-of-prisoners")}:{" "}
                            </h2>
                            <span>{objectOfPlace.countDeath}</span>
                        </li>

                        <div className="container-prisoner-button-map">
                            <ButtonSubmit
                                isColorsInverse={false}
                                themeColor="transparent"
                                href={"/map#" + objectOfPlace.id}
                                spanText={t("add-camp.btn.view-on-map")}
                                onClick={() => {
                                    1;
                                }}
                                size="s"
                            />
                        </div>
                    </ul>

                    <div className="container-story-prisoner">
                        <p>{firstPart}</p>
                    </div>
                </div>
                <div className="container-story-prisoner">
                    <p>{secondPart}</p>
                </div>
            </div>

            <Carousel images={objectOfPlace.images} videos={[]} />
            <div className="container-prisoner-button">
                <ButtonSubmit
                    isColorsInverse={true}
                    themeColor="yellow"
                    href="/prisoners"
                    spanText={t("add-camp.btn.stories-of-prisoners")}
                    onClick={() => {
                        1;
                    }}
                    size
                />
            </div>
        </section>
    );
}

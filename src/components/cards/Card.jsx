import { React } from "react";
import "../../assets/styles/cards/Card.css";
import "../../assets/styles/layout/DefaultLayout.css";

import Carousel from "../other/Carousel";
import ButtonSubmit from "../buttons/ButtonSubmit";
import { useTranslation } from "react-i18next";


export default function Card({
    objectOfPrisoners,
}) {

    const { t } = useTranslation();
    const splitIndex = 73; // Количество символов в первой части строки

    const firstPart = objectOfPrisoners.history.description.slice(
        0,
        splitIndex,
    );
    const secondPart = objectOfPrisoners.history.description.slice(splitIndex);

    return (
        <section className="section-prisoner">
            <div className="container-header-prisoner">
                <div className="container-prisoner-portrait">
                    <img
                        className="img-prisoner-portrait"
                        src={objectOfPrisoners.images[0].urlToFile}
                        alt="portrait of a prisoner"
                    ></img>
                </div>
                <div className="container-header-prisoner-content">
                    <h1 className="header-of-container-prisoner">
                        {objectOfPrisoners.surname +
                            " " +
                            objectOfPrisoners.name +
                            " " +
                            objectOfPrisoners.patronymic}
                    </h1>
                

                    <ul>
                        <li>
                            <h2>
                                {t("add-story.placeholder.date-of-birth")}:{" "}
                            </h2>
                            <span>{objectOfPrisoners.dateOfBirth} г.</span>
                        </li>
                        <li>
                            <h2>
                                {t("add-story.placeholder.place-of-birth")}:{" "}
                            </h2>
                            <span>{objectOfPrisoners.placeOfBirth}</span>
                        </li>
                        <li>
                            <h2>
                                {t("add-story.placeholder.date-of-death")}:{" "}
                            </h2>
                            <span>{objectOfPrisoners.dateOfDie}</span>
                        </li>
                        {objectOfPrisoners.places.map((place) => (
                            <>
                                <li>
                                    <h2>
                                        {t(
                                            "add-story.placeholder.place-of-detention",
                                        )}
                                        :{" "}
                                    </h2>
                                    <br />
                                    <span>
                                        {place.place.placeName},{" "}
                                        {place.region?.centralCity}{" "}
                                    </span>
                                </li>

                                <li>
                                    <strong>
                                        с {place.dateFrom} по {place.dateTo}
                                    </strong>
                                </li>
                            </>
                        ))}
                    </ul>

                    <div className="container-story-prisoner">
                        <p>{firstPart}</p>
                    </div>
                </div>
                <div className="container-story-prisoner">
                    <p>{secondPart}</p>
                </div>
            </div>

            <Carousel images={objectOfPrisoners.images} videos={objectOfPrisoners.videos} />
            <div className="container-prisoner-button">
                <ButtonSubmit
                    isColorsInverse={true}
                    themeColor="yellow"
                    href="/story"
                    spanText={t("add-story.btn.add-story")}
                    onClick={() => {
                        1;
                    }}
                    size
                />
                <ButtonSubmit
                    isColorsInverse={false}
                    themeColor="transparent"
                    href="/prisoners"
                    spanText={t("add-story.btn.other-stories")}
                    onClick={() => {
                        1;
                    }}
                    size
                />
            </div>
        </section>
    );
}

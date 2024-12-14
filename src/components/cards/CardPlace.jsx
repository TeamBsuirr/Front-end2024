import { React } from "react";
import "../../assets/styles/cards/Card.css";
import "../../assets/styles/layout/DefaultLayout.css";

import Carousel from "../other/Carousel";
import ButtonSubmit from "../buttons/ButtonSubmit";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import ButtonCrud from "../buttons/ButtonCrud";
import placeService from "../../api/services/placeService";
import useLocalizedNavigate from "../../utils/useLocalizedNavigate";

export default function CardPlace({
    objectOfPlace,
    isAdmin = false,
    setLoading,
}) {
    const navigate = useLocalizedNavigate();
    const { t } = useTranslation();
    //const [loading, setLoading] = useState(false);
    const splitIndex = 73; // Количество символов в первой части строки

    const firstPart = objectOfPlace.history.description.slice(0, splitIndex);
    const secondPart = objectOfPlace.history.description.slice(splitIndex);


    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await placeService.deletePlaceById(id);

            // console.log('Admin logged in successfully');
            notification.success({ message: t("sucess deleted place") });

            setTimeout(() => navigate("/map"), 1000);
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

                    {isAdmin ? (
                        <>
                            <div className="container-description-map-admin">
                                <div className="admin-btn-container">
                                    <ButtonCrud
                                        href={`/crud/place/${objectOfPlace.id}`}
                                        svgType="edit"
                                    />
                                    <ButtonCrud
                                        href="none"
                                        onClick={() =>
                                            handleDelete(objectOfPlace.id)
                                        }
                                        svgType="delete"
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

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

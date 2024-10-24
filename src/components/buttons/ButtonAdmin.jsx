import "../../assets/styles/buttons/ButtonAdmin.css";
import useLocalizedNavigate from "../../utils/useLocalizedNavigate";

export default function ButtonAdmin({
    themeColor = "black",
    href = "/",
    spanText = "КНОПКА",
    size = "",
    onClick,
}) {
    const navigate = useLocalizedNavigate();
    let styleClass =
        themeColor === "black" ? "admin-button" : "reverse-admin-button";
    let widthButton = 283;
    let heightButton = 39;

    switch (size) {
        // no placeholder span spanText=""
        case "xs":
            spanText = "";
            widthButton = 57;
            heightButton = 39;
            break;
        case "s":
            widthButton = 217;
            heightButton = 39;
            break;
        case "md":
            widthButton = 255;
            heightButton = 39;
            break;
        case "lg":
            widthButton = 283;
            heightButton = 39;
            break;
        default:
            break;
    }

    if (href === "none") {
        return (
            <button
                className={styleClass}
                onClick={onClick}
                style={{
                    width: widthButton,
                    height: heightButton,
                    backgroundPosition: spanText === "" ? "51% 51%" : "",
                }}
            >
                {spanText}
            </button>
        );
    } else {
        return (
            <button
                className={styleClass}
                onClick={() => {
                    navigate(href);
                }}
                style={{ width: widthButton, height: heightButton }}
            >
                {spanText}
            </button>
        );
    }
}

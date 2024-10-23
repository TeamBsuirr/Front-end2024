import { t } from "i18next";
import { Helmet } from "react-helmet-async";

/**
 * Universal SEO setter function
 * @param {Object} data - The object containing either place or prisoner data
 * @param {String} type - The type of data, either 'place' or 'prisoner'
 */
const setSEO = (data, type) => {
    let titleSEO = "";
    let descriptionSEO = "";

    // SEO for places
    if (type === "place") {
        if (data?.placeName) {
            titleSEO = `${data.placeName} - ${t("page-title.template")}`;
        }
        if (data?.shortDescription) {
            descriptionSEO = data.shortDescription;
        }
    }

    // SEO for prisoners
    if (type === "prisoner") {
        if (data?.surname && data?.name && data?.patronymic) {
            titleSEO = `${data.surname} ${data.name} ${data.patronymic} - ${t("page-title.template")}`;
        }
        // Description is not set for prisoners
    }

    return { titleSEO, descriptionSEO };
};

export default function SEOComponent({ data, type }) {
    const { titleSEO, descriptionSEO } = setSEO(data, type);

    return (
        <Helmet>
            {/* Set the title if available */}
            {titleSEO && <title>{titleSEO}</title>}

            {/* Set the description if available */}
            {descriptionSEO && (
                <meta name="description" content={descriptionSEO} />
            )}
        </Helmet>
    );
}

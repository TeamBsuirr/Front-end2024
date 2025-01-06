import { notification } from "antd";
import { t } from "i18next";

notification.config({
    placement: "top",
    top: 70,
    duration: 3,
    className: "notificationError",
    stack: {
        threshold: 5,
    },
});

export function handlePagination({
    type,
    currentPage,
    setCurrentPage,
    totalPages,
}) {
    // Определим следующий номер страницы в зависимости от типа пагинации
    let nextPage;

    if (type === "forward") {
        nextPage = currentPage + 1;
        if (nextPage >= totalPages) {
            nextPage = totalPages - 1; // Не даем выйти за пределы
        }
    } else if (type === "backward") {
        nextPage = currentPage - 1;
        if (nextPage < 0) {
            nextPage = 0; // Не даем перейти на отрицательную страницу
        }
    } else {
        console.error("Invalid pagination type. Use 'forward' or 'backward'.");
        return;
    }

    // Обновляем страницу
    setCurrentPage(nextPage);
}

export const addMainImagePreview = (obj, imagesField = "images") => {
    // Проверяем, что поле с изображениями существует и является массивом
    if (Array.isArray(obj[imagesField]) && obj[imagesField].length > 0) {
        // Находим изображение с isMain === true
        const mainImage = obj[imagesField].find(
            (image) => image.isMain === true,
        );
        // Если нашли - используем его, если нет - берем первое изображение, если оно есть
        const img = mainImage
            ? mainImage.urlToFile
            : obj[imagesField][0]?.urlToFile || "";
        // Добавляем новое поле imgPreview
        obj.previewImg = img;
    } else {
        // Если поле с изображениями отсутствует или пустое, добавляем пустое значение для imgPreview
        obj.previewImg = "";
    }

    // Возвращаем обновленный объект
    return obj;
};

export function parseCalendarContentToInputId(selectedAlphabet) {
    let alphabeticValue = "";
    switch (selectedAlphabet) {
        case t("stories.sort.by-date"):
            alphabeticValue = "by-date";
            break;
        case t("stories.sort.counter-alphabetically"):
            alphabeticValue = "counter-alphabetically";
            break;
        case t("stories.sort.alphabetically"):
            alphabeticValue = "alphabetically";
            break;
        default:
            alphabeticValue = "";
            break;
    }
    return alphabeticValue;
}

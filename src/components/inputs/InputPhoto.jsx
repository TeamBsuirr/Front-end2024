import { React, useEffect, useState } from "react";
import "../../assets/styles/inputs/InputForm.css";
import { sanitizeHTML } from "../../utils/sanitize";
import { notification } from "antd";
import removeIcon from "../../assets/images/icons/other/removeIcon.svg";

export default function InputPhoto({
    placeholder,
    onFileChange,
    initialImage,
}) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(
        initialImage ? initialImage.urlToFile : null,
    ); // Используем URL изображения, если передан

    const handleFileChange = (event) => {
        // Проверяем, что event.target существует и содержит файлы
        if (
            event.target &&
            event.target.files &&
            event.target.files.length > 0
        ) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                if (selectedFile.type.startsWith("image/")) {
                    setFile(selectedFile);
                    setPreview(URL.createObjectURL(selectedFile));
                    onFileChange(selectedFile); // Передаем объект файла в родительский компонент
                } else {
                    notification.error({
                        message:
                            "Неверный формат файла. Пожалуйста, загрузите изображение.",
                    });
                }
            }
        } else {
            console.error(
                "Не удалось получить файл. Проверьте наличие файла в input.",
            );
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setPreview(null);
        onFileChange(null); // Передаем null в родительский компонент
    };

    useEffect(() => {
        // Очищаем URL.createObjectURL при удалении файла
        return () => {
            if (preview && !initialImage) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview, initialImage]);

    return (
        <div className="single-file-upload">
            <input
                className="input-form-photo"
                name="image"
                id="image"
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            {!file && (
                <label htmlFor="image" className="upload-label">
                    {placeholder}
                </label>
            )}
            {preview && (
                <div className="file-preview attachment-preview-image">
                    <img
                        src={preview}
                        alt="Preview"
                        className="file-preview-image"
                    />
                    <p className="file-name">{file?.name}</p>
                    <button
                        onClick={handleRemoveFile}
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src={removeIcon}
                            alt="Remove"
                        />
                    </button>
                </div>
            )}

            <style
                dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(`
                    .input-form-photo::before {
                        content: "${placeholder}";
                      
                    }
    `),
                }}
            ></style>
        </div>
    );
}

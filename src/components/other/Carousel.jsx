import React, { useRef, useState } from "react";

import "../../assets/styles/other/Carousel.css";
import { useTranslation } from "react-i18next";
import arrowSvg from "../../assets/images/icons/other/close.svg";
const Carousel = ({ images, videos = null }) => {

    const { t } = useTranslation();

    const carouselRef = useRef(null);
    let isDragging = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft = carouselRef.current.scrollLeft;
        carouselRef.current.style.cursor = "grabbing";
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            isDragging = false;
            carouselRef.current.style.cursor = "grab";
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            isDragging = false;
            carouselRef.current.style.cursor = "grab";
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 1; // Adjust the scrolling speed
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    const [selectedObject, setSelectedObject] = useState(null);

    function openObject(index, type) {
        if (type === 'image' && images[index]) {
            setSelectedObject({ ...images[index], type: "image" });
        } else if (type === 'video' && videos[index]) {
            setSelectedObject({ ...videos[index], type: "video" });
        }

    }

    function closeModal() {
        setSelectedObject(null);
    }

    const handleWheel = (e) => {
        //e.preventDefault(); // Останавливаем стандартное вертикальное поведение скроллинга

        const scrollSpeed = 100; // Скорость прокрутки
        let scrollAmount = e.deltaY > 0 ? scrollSpeed : -scrollSpeed;

        // Используем requestAnimationFrame для плавного выполнения
        requestAnimationFrame(() => {
            carouselRef.current.scrollLeft += scrollAmount;
        });
    };

    const handlePaginationCarousel = ({ type }) => {
        if (!selectedObject || typeof selectedObject.id !== 'number') return;
    
        let newIndex = selectedObject.id;
    
        // Листание вперед
        if (type === "forward") {
            if (selectedObject.type === "image") {
                // Если на последнем изображении, переключаемся на первое видео (если оно есть)
                if (newIndex === images.length - 1 && videos.length > 0) {
                    newIndex = 0; // Перейти к первому видео
                    setSelectedObject({ ...videos[0], type: "video", id: 0 });
                } else {
                    // Листаем изображения
                    newIndex = (newIndex + 1) % images.length;
                    setSelectedObject({ ...images[newIndex], type: "image", id: newIndex });
                }
            } else if (selectedObject.type === "video") {
                // Если на последнем видео, переключаемся на первое изображение
                if (newIndex === videos.length - 1 && images.length > 0) {
                    newIndex = 0; // Перейти к первому изображению
                    setSelectedObject({ ...images[0], type: "image", id: 0 });
                } else {
                    // Листаем видео
                    newIndex = (newIndex + 1) % videos.length;
                    setSelectedObject({ ...videos[newIndex], type: "video", id: newIndex });
                }
            }
        } 
        // Листание назад
        else if (type === "backward") {
            if (selectedObject.type === "image") {
                // Если на первом изображении, переключаемся на последнее видео (если оно есть)
                if (newIndex === 0 && videos.length > 0) {
                    newIndex = videos.length - 1; // Перейти к последнему видео
                    setSelectedObject({ ...videos[newIndex], type: "video", id: newIndex });
                } else {
                    // Листаем изображения
                    newIndex = (newIndex - 1 + images.length) % images.length;
                    setSelectedObject({ ...images[newIndex], type: "image", id: newIndex });
                }
            } else if (selectedObject.type === "video") {
                // Если на первом видео, переключаемся на последнее изображение
                if (newIndex === 0 && images.length > 0) {
                    newIndex = images.length - 1; // Перейти к последнему изображению
                    setSelectedObject({ ...images[newIndex], type: "image", id: newIndex });
                } else {
                    // Листаем видео
                    newIndex = (newIndex - 1 + videos.length) % videos.length;
                    setSelectedObject({ ...videos[newIndex], type: "video", id: newIndex });
                }
            }
        }
    };


    return (
        <div
            className="carousel-container"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel} // Обработчик скролла колесиком мыши
            role="button" // Указываем, что это значимая область
            aria-label="Media carousel" // Добавляем описание для пользователей с экранными читалками
            tabIndex={0}
        >
            <h4>{t("materials")}</h4>
            <div className="carousel" ref={carouselRef}>
                {images.map((image, index) => (
                    <div className="carousel-item" key={index}>
                        <button
                            onClick={() => {
                                openObject(index, 'image');
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") openObject(index, 'image');
                            }}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                            }} // Убираем стили кнопки
                            tabIndex={0} // Делаем элемент фокусируемым
                        >
                            <img
                                src={image.urlToFile}
                                alt={`Slide ${index + 1}`}
                                draggable="false"
                            />
                        </button>
                    </div>
                ))}
                {videos.map((video, index) => (
                    <div className="carousel-item" key={`video-${index}`}>
                        <button
                            onClick={() => openObject(index, 'video')}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") openObject(index, 'video');
                            }}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                            }}
                            tabIndex={0}
                        >
                            <video
                                src={video.urlToFile}
                                alt={`Video Slide ${index + 1}`}
                                muted
                                loop
                                playsInline
                                draggable="false"
                            />
                        </button>
                    </div>
                ))}
            </div>

            {selectedObject && (
                <div
                    className="modal"
                    onClick={closeModal} // Close the modal when clicking on the background
                    onKeyDown={(e) => {
                        if (e.key === "Escape") closeModal(); // Close modal on 'Esc' key press
                    }}
                    role="button"
                    tabIndex={0}
                >
                    <div className="pagination-container-btn-l">

                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent modal from closing
                                handlePaginationCarousel({ type: "backward" });
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "ArrowLeft") handlePaginationCarousel({ type: "backward" });
                            }}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                                zIndex: 30
                            }}
                            tabIndex={0}
                        >
                            <img src={arrowSvg} alt="arrow" />
                        </button>

                    </div>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside content
                        onKeyDown={(e) => {
                            if (e.key === "Escape") closeModal();
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        {selectedObject.type === "video" ? (
                            <video
                                controls
                                src={selectedObject.urlToFile}
                                style={{ width: "100%" }}
                            >
                                <track kind="captions" src="" label="Video selected" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img src={selectedObject.urlToFile} alt="Selected pic" draggable="false" />
                        )}
                    </div>
                    <div className="pagination-container-btn-r">

                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent modal from closing
                                handlePaginationCarousel({ type: "forward" });
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "ArrowRight") handlePaginationCarousel({ type: "forward" });
                            }}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                                zIndex: 30
                            }}
                            tabIndex={0}
                        >
                            <img src={arrowSvg} alt="arrow" />
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Carousel;

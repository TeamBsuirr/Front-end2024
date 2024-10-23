import React, { useRef, useState } from 'react';

import '../../assets/styles/other/Carousel.css'
import { useTranslation } from 'react-i18next';

const Carousel = ({ images }) => {
    const { t } = useTranslation();

    const carouselRef = useRef(null);
    let isDragging = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft = carouselRef.current.scrollLeft;
        carouselRef.current.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            isDragging = false;
            carouselRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            isDragging = false;
            carouselRef.current.style.cursor = 'grab';
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

    function openImage(index) {
        if (images[index]) {
            setSelectedObject(images[index]);
        }
    }

    function closeModal() {
        setSelectedObject(null);
    }

    const handleWheel = (e) => {
        e.preventDefault(); // Останавливаем стандартное вертикальное поведение скроллинга

        const scrollSpeed = 100; // Скорость прокрутки
        let scrollAmount = e.deltaY > 0 ? scrollSpeed : -scrollSpeed;
        
        // Используем requestAnimationFrame для плавного выполнения
        requestAnimationFrame(() => {
            carouselRef.current.scrollLeft += scrollAmount;
        });
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
            aria-label="Image carousel" // Добавляем описание для пользователей с экранными читалками
            tabIndex={0}
        >
            <h4>{t('materials')}</h4>
            <div className="carousel" ref={carouselRef}>
                {images.map((image, index) => (
                    <div className="carousel-item" key={index}>
                        <button
                            onClick={() => { openImage(index); }}
                            onKeyDown={(e) => { if (e.key === 'Enter') openImage(index); }}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} // Убираем стили кнопки
                            tabIndex={0}  // Делаем элемент фокусируемым
                        >
                            <img
                                src={image.urlToFile}
                                alt={`Slide ${index + 1}`}

                            />
                        </button>
                    </div>
                ))}
            </div>


            {selectedObject && (
                <div
                    className='modal'
                    onClick={closeModal}
                    onKeyDown={(e) => { if (e.key === 'Enter') closeModal(); }}
                    role="button"
                    tabIndex={0}
                >
                    <div className='modal-content'

                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => { if (e.key === 'Enter') e.stopPropagation() }}
                        role="button"
                        tabIndex={0}
                    >
                        <img src={selectedObject.urlToFile} alt="Selected" />
                    </div>
                </div>
            )}

        </div>
    );
};

export default Carousel;
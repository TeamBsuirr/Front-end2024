import React, { useRef } from 'react';

import '../../assets/styles/other/Carousel.css'

const Carousel = ({ images }) => {
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

    return (
        <div
            className="carousel-container"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <h4>Материалы к истории</h4>
            <div className="carousel" ref={carouselRef}>
                {images.map((image, index) => (
                    <div className="carousel-item" key={index}>
                        <img src={image.urlToFile} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
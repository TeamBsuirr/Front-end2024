import React, { useRef, useState } from 'react';

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


    const [selectedObject, setSelectedObject] = useState(null);

    function openImage(index) {
        if (images[index]) {
            setSelectedObject(images[index]);
        }
    }

    function closeModal() {
        setSelectedObject(null);
    }


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
                    <img src={image.urlToFile} alt={`Slide ${index + 1}`} onClick = {() => { openImage(index); }} />
                </div>
            ))}
        </div>


        {selectedObject && (
            <div className='modal' onClick={closeModal}>
                <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                    <img src={selectedObject.urlToFile} alt="Selected" />
                </div>
            </div>
        )}

    </div>
);
};

export default Carousel;
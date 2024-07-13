import { React, useState } from 'react';
import '../../assets/styles/forms/PhotoArchive.css'
import Image4 from '../../assets/images/Image4.jpeg'

export default function PhotoArchive() {
    const [selectedObject, setSelectedObject] = useState(null);

    const arrayOfResults = [
        {
            img: Image4,
            header: "Ивано Петр Иванович",
            description: "текст текст текст текст текст текст текст текст текст текст текст текст текст текст...",
        },
        {
            img: Image4,
            header: "Ивано Петр Иванович",
            description: "текст текст текст текст текст текст текст текст текст текст текст текст текст текст...",
        },
        {
            img: Image4,
            header: "Ивано Петр Иванович",
            description: "текст текст текст текст текст текст текст текст текст текст текст текст текст текст...",
        },
        {
            img: Image4,
            header: "Ивано Петр Иванович",
            description: "текст текст текст текст текст текст текст текст текст текст текст текст текст текст...",
        },
        {
            img: Image4,
            header: "Ивано Петр Иванович",
            description: "текст текст текст текст текст текст текст текст текст текст текст текст текст текст...",
        },
        {
            img: Image4,
            header: "Ивано Петр Иванович",
            description: "текст текст текст текст текст текст текст текст текст текст текст текст текст текст...",
        },

    ]


    function openImage(index) {
        if (arrayOfResults[index]) {
            setSelectedObject(arrayOfResults[index]);
        }
    }

    function closeModal() {
        setSelectedObject(null);
    }


    return (
        <div className='section-search-result'>
            <section className='section-form-search-result'>

                <div className='header-container-search-result-prisoners'>
                    <div className='span-of-section-prisoners'>

                    </div>
                    <div className='header-of-section-prisoners'>
                        ФОТОАРХИВ
                    </div>
                </div>

                <div className='container-description-archive'>
                    <span>Архив фотографий из концлагерей на территории Республики Беларусь</span>
                </div>

            </section>
            {/* ADD TOP BORDER TO THIS */}
            <section className='section-register-search-result'>

                {arrayOfResults.map((obj, index) => (
                    <div className='result-container-archive' key={index}>
                        <img src={obj.img} alt={"image #" + index} onClick={() => { openImage(index); }} />
                        <div className='result-container-archive-description'>
                            <h3>{obj.header}</h3>
                        </div>
                    </div>
                ))}

                {selectedObject && (
                    <div className='modal' onClick={closeModal}>
                        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                            <img src={selectedObject.img} alt="Selected" />
                            <div className='modal-description'>
                                <h3>{selectedObject.header}</h3>
                                <span>{selectedObject.description}</span>

                            </div>
                        </div>
                    </div>
                )}

            </section>

        </div>

    )
}
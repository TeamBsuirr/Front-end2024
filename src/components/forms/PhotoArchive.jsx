import { React, useState } from 'react';
import '../../assets/styles/forms/PhotoArchive.css'
import Image4 from '../../assets/images/Image4.jpeg'

export default function PhotoArchive({arrayOfPhotoObjects}) {
    const [selectedObject, setSelectedObject] = useState(null);


    function openImage(index) {
        if (arrayOfPhotoObjects[index]) {
            setSelectedObject(arrayOfPhotoObjects[index]);
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

                {arrayOfPhotoObjects.map((obj, index) => (
                    <div className='result-container-archive' key={index}>
                        <img src={obj.image.urlToFile} alt={"image #" + index} onClick={() => { openImage(index); }} />
                        <div className='result-container-archive-description'>
                            <h3>{obj.title}</h3>
                        </div>
                    </div>
                ))}

                {selectedObject && (
                    <div className='modal' onClick={closeModal}>
                        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                            <img src={selectedObject.image.urlToFile} alt="Selected" />
                            <div className='modal-description'>
                                <h3>{selectedObject.title}</h3>
                                <span>{selectedObject.description}</span>

                            </div>
                        </div>
                    </div>
                )}

            </section>

        </div>

    )
}
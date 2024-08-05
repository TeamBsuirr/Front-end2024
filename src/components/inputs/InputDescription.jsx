import { React } from 'react';
import '../../assets/styles/inputs/InputDescription.css'


export default function InputDescription({ onFileChange, onStoryChange }) {

    return (
        <div class="story">
            <div className="attachment">
                <label htmlFor="image" className="input-file"></label>
                <input type="file" name="image" id="image" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg" onChange={onFileChange} multiple />
                <label htmlFor="video" className="input-file"></label>
                <input type="file" name="video" id="video" accept=".mp4,.avi,.mov,.mkv,.flv,.wmv,.webm" onChange={onFileChange} multiple />
                <label htmlFor="document" className="input-file"></label>
                <input type="file" name="document" id="document" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar" onChange={onFileChange} multiple />
            </div>
            <textarea name="story" id="story" placeholder="Пожалуйста, напишите Вашу историю..." onChange={onStoryChange}></textarea>

        </div>
    )
}
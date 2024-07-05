import { React } from 'react';
import '../../assets/styles/inputs/InputDescription.css'


export default function InputDescription() {

    return (
        <div class="story">
            <div class="attachment">
                <label for="image" class="input-file"></label>
                <input type="file" name="image" id="image" />
                <label for="video" class="input-file"></label>
                <input type="file" name="video" id="video" />
                <label for="document" class="input-file"></label>
                <input type="file" name="document" id="document" />
            </div>
            <textarea name="story" id="story" placeholder="Пожалуйста, напишите Вашу историю..."></textarea>
        </div>
    )
}
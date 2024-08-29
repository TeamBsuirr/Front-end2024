

import { React } from 'react';
import InputMask from 'react-input-mask';
import '../../assets/styles/inputs/InputForm.css'
import { sanitizeHTML } from '../../utils/sanitize';


export default function InputPhoto({ placeholder, onFileChange, multiple = true }) {

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(`
                    .input-form-photo::before {
                        content: "${placeholder}";
                      
                    }
    `)
                }}
            ></style>
            <input className="input-form-photo"
                name="image"
                id="image"
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg"
                onChange={onFileChange}
                multiple
            />
        </>

    )
}
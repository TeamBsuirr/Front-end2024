

import { React } from 'react';
import InputMask from 'react-input-mask';
import '../../assets/styles/inputs/InputForm.css'


export default function InputPhoto({ placeholder, onFileChange }) {

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    .input-form-photo::before {
                        content: "${placeholder}";
                      
                    }
    `
                }}
            ></style>
            <input className="input-form-photo"
                name="image" id="image" type="file"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg"
                onChange={onFileChange}
                multiple
            />
        </>

    )
}
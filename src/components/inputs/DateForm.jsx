

import { React } from 'react';
import '../../assets/styles/inputs/DateForm.css'

export default function DateForm({ labelText, type, id, name, max, min, onChange }) {

    return (<>
        {/* <label for={id}>{labelText}</label>
        <input className='date-input' type="date" id={id} name={name} min="1800-01-01" max="3000-01-01" />
     */}

        <label htmlFor={id}>{labelText}</label>
        <input
            className='date-input'
            type="date"
            id={id}
            name={name}
            min={min}
            max={max}
            onChange={onChange}
        />

    </>
    )
}


import { React } from 'react';
import '../../assets/styles/inputs/DateForm.css'

export default function DateForm({ id, name, labelText }) {

    return (<>
        <label for={id}>{labelText}</label>
        <input className='date-input' type="date" id={id} name={name} min="1800-01-01" max="3000-01-01" />
    </>
    )
}
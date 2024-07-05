

import { React } from 'react';
import '../../assets/styles/inputs/InputForm.css'


export default function InputForm({ placeholder, type, name, id, min = null, max = null }) {

  if (max || min) {
    return (
      <input className="input-form" type={type} id={id} name={name} placeholder={placeholder} min={min} max={max}
        onfocus="(this.type='date')" onblur="if(this.value==''){this.type='text'}" />
    )
  }

  return (

    <input className="input-form" id={id} name={name} type={type} placeholder={placeholder} />
  )
}
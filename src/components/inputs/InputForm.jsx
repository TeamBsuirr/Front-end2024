

import { React } from 'react';
import InputMask from 'react-input-mask';
import '../../assets/styles/inputs/InputForm.css'


export default function InputForm({ placeholder, type, name, id, min = null, max = null, onChange, value = null }) {

  // Обработчик для text input, который фильтрует вводимые символы
  const handleTextInputChange = (e) => {
    // Регулярное выражение для разрешения букв всех указанных языков и пробелов
    const regex = /^[\p{L}\s]*$/u;
    const value = e.target.value;

    if (regex.test(value) || value === '') {
      onChange(e);
    } else {
      // Если введен недопустимый символ, очистить поле или показать сообщение об ошибке
      e.target.value = value.slice(0, -1); // Удаляем последний символ
      onChange(e); // Обновляем состояние
    }
  };

  // Обработчик для input, если задан max и min
  const handleInputChange = (e) => {
    onChange(e);
  };


  if (type === "coordinates") {
    return <input className="input-form-coordinates" id={id}
      name={name} type="number" placeholder={placeholder}
      onChange={handleInputChange}
      value={value}
    />
  }

  if (type === 'tel') {
    return (
      <InputMask
        className="input-form"
        mask="+375 (99) 999 - 99 - 99"
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    );
  }

  if (max || min) {
    return (
      <input className="input-form-date"
        type={type} id={id} 
        name={name} 
        value={value}
        placeholder={placeholder} 
        min={min} 
        max={max}
        onfocus="(this.type='date')"
        onblur="if(this.value==''){this.type='text'}"
        onChange={onChange} />
        
    )
  }

  return (

    <input className="input-form" id={id}
      name={name} type={type} placeholder={placeholder}
      value={value}
      onChange={type === 'text' ? handleTextInputChange : handleInputChange}
    />
  )
}
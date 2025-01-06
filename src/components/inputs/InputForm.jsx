import { React, useState } from "react";
import InputMask from "react-input-mask";
import "../../assets/styles/inputs/InputForm.css";

export default function InputForm({
    placeholder,
    type,
    name,
    id,
    min = null,
    max = null,
    onChange,
    value = null,
}) {

    // Обработчик для text input, который фильтрует вводимые символы
    const handleTextInputChange = (e) => {
        // Регулярное выражение для разрешения букв всех указанных языков и пробелов
        const regex = /^[\p{L}\p{N}\s.,-]*$/u;
        const value = e.target.value;

        if (regex.test(value) || value === "") {
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

    const [inputValue, setInputValue] = useState(value || "");


    // Функция для проверки и корректировки введенного значения
    const validateInputDate = (value, type) => {
        if (type === "day" || type === "month") {
            if (value.length > 2) return value.slice(-2);
            if (value && !/^\d{1,2}$/.test(value)) return "";
            return value.padStart(2, "0");
        }
        if (type === "year") {
            if (value.length > 4) return value.slice(-4);
            if (value && !/^\d{1,4}$/.test(value)) return "";
            return value.padStart(4, "0");
        }
        return value;
    };

    // Обработчик для input даты (день, месяц, год)
    const handleInputDateChange = (e) => {
        const { value } = e.target;
    
        let [year, month, day] = inputValue.split("-");
    
        // Проверяем и обновляем соответствующее поле
        if (e.target.name === "year") {
            year = validateInputDate(value, "year");
        } else if (e.target.name === "month") {
            month = validateInputDate(value, "month");
        } else if (e.target.name === "day") {
            day = validateInputDate(value, "day");
        }
    
        // Формируем итоговое значение с днями и месяцами по умолчанию, если пусто
        const formattedValue = `${year || "0000"}-${month || "00"}-${day || "00"}`;
    
        setInputValue(formattedValue); // Обновляем локальное состояние
    
        // Передаем в onChange полное значение даты с правильным name из пропсов
        onChange({ target: { name, value: formattedValue } });
    };

    // Обработчик для события blur (покидаем поле)
    const handleBlur = () => {
        const [year, month, day] = inputValue.split("-");
        const formattedValue = `${year || "0000"}-${month || "00"}-${day || "00"}`;
        setInputValue(formattedValue);
        onChange({ target: { name, value: formattedValue } });
    };

    // Если тип даты, отображаем 3 поля для года, месяца и дня в нужном порядке
    if (type === "date" || (max || min)) {
        const [year, month, day] = inputValue.split("-");

        return (
            <div className="input-form-date-container">
                <div className="input-form-container">
                    <label htmlFor={id} className="input-form-label">Год</label>
                    <input
                        className="input-form-date"
                        type="text"
                        id={`${id}-year`}
                        name="year" // фиксируем name
                        value={year || ""}
                        placeholder="Год"
                        onChange={handleInputDateChange}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="input-form-container">
                    <label htmlFor={id} className="input-form-label">Месяц</label>
                    <input
                        className="input-form-date"
                        type="text"
                        id={`${id}-month`}
                        name="month" // фиксируем name
                        value={month || ""}
                        placeholder="Месяц"
                        onChange={handleInputDateChange}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="input-form-container">
                    <label htmlFor={id} className="input-form-label">День</label>
                    <input
                        className="input-form-date"
                        type="text"
                        id={`${id}-day`}
                        name="day" // фиксируем name
                        value={day || ""}
                        placeholder="День"
                        onChange={handleInputDateChange}
                        onBlur={handleBlur}
                    />
                </div>
            </div>
        );
    }

    // if (max || min) {
    //     return (
    //         <input
    //             className="input-form-date"
    //             type={type}
    //             id={id}
    //             name={name}
    //             value={value}
    //             placeholder={placeholder}
    //             min={min}
    //             max={max}
    //             onfocus="(this.type='date')"
    //             onblur="if(this.value==''){this.type='text'}"
    //             onChange={onChange}
    //         />
    //     );
    // }




    if (type === "coordinates") {
        return (
            <input
                className="input-form-coordinates"
                id={id}
                name={name}
                type="number"
                placeholder={placeholder}
                onChange={handleInputChange}
                value={value}
            />
        );
    }

    if (type === "tel") {
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

    return (
        <input
            className="input-form"
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={
                type === "text" ? handleTextInputChange : handleInputChange
            }
        />
    );
}

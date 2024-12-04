import { React, useState } from "react";
import "../../assets/styles/inputs/DateForm.css";

export default function DateForm({
    labelText,
    id,
    name,
    onChange,
    value,
}) {




    const [inputValue, setInputValue] = useState(value || "");
    const [year, month, day] = inputValue.split("-");

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






    return (
        <>
            {/* <label htmlFor={id}>{labelText}</label>
            <input
                className="date-input"
                type="date"
                id={id}
                name={name}
                min={min}
                max={max}
                onChange={onChange}
                value={value}
            /> */}


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
                <span>{labelText}</span>
            </div>
        </>
    );
}

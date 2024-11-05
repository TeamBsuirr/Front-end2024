import { React } from "react";
import "../../assets/styles/inputs/DateForm.css";

export default function DateForm({
    labelText,
    id,
    name,
    max,
    min,
    onChange,
    value,
}) {
    return (
        <>
            <label htmlFor={id}>{labelText}</label>
            <input
                className="date-input"
                type="date"
                id={id}
                name={name}
                min={min}
                max={max}
                onChange={onChange}
                value={value}
            />
        </>
    );
}

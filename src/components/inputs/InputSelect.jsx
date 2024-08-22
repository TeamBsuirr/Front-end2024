

import { React, useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import '../../assets/styles/inputs/InputSelect.css'


export default function InputSelect({ 
  placeholder,
  name,
  arrayOfSelects = [], // Default to an empty array
  onChange,
  value = [], // Default to an empty array if multiple is true
  multiple = false
 }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Toggle the dropdown when the input is clicked
  const handleInputClick = () => {
    setIsOpen(isOpen => !isOpen);
  };

  // Handle selection of a list item
  // const handleListItemClick = (selectedValue) => {
  //   if (onChange) {
  //     if (typeof selectedValue === "object") {
  //       onChange({ target: { name, value: selectedValue.name } });
  //     } else {
  //       onChange({ target: { name, value: selectedValue } });
  //     }

  //   }
  //   setIsOpen(false);
  // };

  // Handle selection of a list item
  const handleListItemClick = (selectedValue) => {
    let newValue;

    if (multiple) {
      if (!Array.isArray(value)) {
        newValue = [selectedValue];
      } else {
        const isAlreadySelected = value.some(item => item.id === selectedValue.id);
        if (isAlreadySelected) {
          newValue = value.filter(item => item.id !== selectedValue.id);
        } else {
          newValue = [...value, selectedValue];
        }
      }
    } else {
      newValue = selectedValue;
      setIsOpen(false); // Close the dropdown for single selection
    }

    if (onChange) {
      onChange({ target: { name, value: newValue } });
    }
  };

  // Close the dropdown when the mouse leaves the list
  const handleMouseLeave = () => {
    setIsOpen(false);
  };


  // Close the dropdown when clicking outside of the component
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Bind the event listener for detecting clicks outside the component
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayValue = () => {
    if (multiple && Array.isArray(value)) {
      return value.map(item => (typeof item === "object" ? item.name : item)).join(', ');
    }
    return typeof value === "object" ? value.name : value;
  };


  return (
    <div className="input-select-container" ref={wrapperRef}>
      <input
        className='input-form-select'
        type="text"
        name={name}
        id={name}
        value={displayValue()}
        placeholder={placeholder}
        readOnly
        onClick={handleInputClick}
      />
      {isOpen && (
        <ul className="list-select">
          {arrayOfSelects.map((selectObj, index) => {
            const isSelected = multiple && Array.isArray(value) && value.some(item => item.id === selectObj.id);
            return (
              <li
                key={index}
                onClick={() => handleListItemClick(selectObj)}
                className={isSelected ? 'selected' : ''}
              >
                {selectObj.name}
              </li>
            );
          })}
        </ul>
      )}
    </div >
  )
}
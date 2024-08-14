

import { React, useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import '../../assets/styles/inputs/InputSelect.css'


export default function InputSelect({ placeholder, name, arrayOfSelects = [], onChange, value }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Toggle the dropdown when the input is clicked
  const handleInputClick = () => {
    setIsOpen(isOpen => !isOpen);
  };

  // Handle selection of a list item
  const handleListItemClick = (selectedValue) => {
    if (onChange) {
      if (typeof selectedValue === "object") {
        onChange({ target: { name, value: selectedValue.name } });
      } else {
        onChange({ target: { name, value: selectedValue } });
      }

    }
    setIsOpen(false);
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

  return (
    <div className="input-select-container" ref={wrapperRef}>
      <input
        className='input-form-select'
        type="text"
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        readOnly
        onClick={handleInputClick}
      />
      {isOpen && (
        <ul className="list-select" onMouseLeave={handleMouseLeave}>
          {arrayOfSelects.map((selectObj, index) => {
            console.log(typeof selectObj)
            if (typeof selectObj === "object") {

              return (
                <li key={selectObj.id} onClick={() => handleListItemClick(selectObj)}>
                  {selectObj.name}
                </li>)
            } else {
              return (
                <li key={index} onClick={() => handleListItemClick(selectObj)}>
                  {selectObj}
                </li>)
            }
          }
          )}
        </ul>
      )
      }
    </div >
  )
}
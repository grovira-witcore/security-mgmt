import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { useAppContext } from '../context/AppContext.js';
import DatePicker from './DatePicker.js';
import { formatDate } from '../utils/format.js';
import { getWords } from '../utils/get-words.js';

const DateBox = function ({ 
  label, 
  placeholder,
  value, 
  onChange, 
  validated,
  required
}) {
  const { i18n } = useAppContext();
  const words = getWords(i18n.code);

  const [textValue, setTextValue] = React.useState(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleOnClick = function (e) {
    setShowDropdown(!showDropdown);
  }
  const handleOnKeyPress = function (e) {
    if (e.key === 'Enter') {
      setShowDropdown(!showDropdown);
    }
  }
  const handleOnChange = function (e) {
    setTextValue(e.target.value);
    let newValue = null;
    if (e.target.value !== null && e.target.value !== undefined && e.target.value !== '') {
      const dateParts = {};
      switch (i18n.dateFormat) {
        case 'dd/mm/yyyy': {
          const valueParts = e.target.value.split('/');
          if (valueParts.length === 3) {
            dateParts.day = parseInt(valueParts[0]);
            dateParts.month = parseInt(valueParts[1]);
            dateParts.year = parseInt(valueParts[2]);
          }
          break;
        }
        case 'mm/dd/yyyy': {
          const valueParts = e.target.value.split('/');
          if (valueParts.length === 3) {
            dateParts.month = parseInt(valueParts[0]);
            dateParts.day = parseInt(valueParts[1]);
            dateParts.year = parseInt(valueParts[2]);
          }
          break;
        }
        case 'dd.mm.yyyy': {
          const valueParts = e.target.value.split('.');
          if (valueParts.length === 3) {
            dateParts.day = parseInt(valueParts[0]);
            dateParts.month = parseInt(valueParts[1]);
            dateParts.year = parseInt(valueParts[2]);
          }
          break;
        }
        case 'mm.dd.yyyy': {
          const valueParts = e.target.value.split('.');
          if (valueParts.length === 3) {
            dateParts.month = parseInt(valueParts[0]);
            dateParts.day = parseInt(valueParts[1]);
            dateParts.year = parseInt(valueParts[2]);
          }
          break;
        }
      }
      if (dateParts.year >= 1900 && dateParts.year <= 2900 && dateParts.month >= 1 && dateParts.month <= 12 && dateParts.day >= 1 && dateParts.day <= 31) {
        newValue = new Date(dateParts.year, dateParts.month - 1, dateParts.day).toISOString();
      }
    }
    onChange(newValue);
  }
  const handleOnBlur = function (e) {
    setTextValue(null);
    setShowDropdown(false);
  }
  const handleDatePickerChange = function (newValue) {
    setTextValue(null);
    onChange(newValue);
    setShowDropdown(false);
  }

  const getDropdownPlacement = function () {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const screenHeight = window.innerHeight;
      const distanceToBottom = screenHeight - rect.bottom;
      if (distanceToBottom < 260) {
        return 'top-start';
      }
    }
    return 'bottom-start';
  };

  const errors = [];
  if (required && (value === null || value === undefined)) {
    errors.push(words.requiredField);
  }

  return (
    <div>
      <div className="px-1 pt-1 pb-2" data-invalid={errors.length > 0 ? '1' : null}>
        <div className="py-1 d-flex fw-bold">
          <div>{label}</div>
          {required && (<div className="ps-1 text-red">*</div>)}
        </div>
        <input ref={inputRef} className={'form-control' + (validated && errors.length > 0 ? ' is-invalid' : '')} type="text" placeholder={placeholder} value={textValue ?? (value !== null && value !== undefined ? formatDate(value, i18n.dateFormat) : '')} onClick={handleOnClick} onKeyPress={handleOnKeyPress} onChange={handleOnChange} onBlur={handleOnBlur} />
        {validated && errors.map((error, index) => (
          <div key={index} className="pt-1 ps-1 fw-bold text-red">{error}</div>
        ))}
      </div>
      {showDropdown &&
        <ReactBootstrap.Overlay show={true} target={inputRef.current} placement={getDropdownPlacement()}>
          <div className="p-2 pb-0 bg-light border border-black rounded" style={{ zIndex: 100000 }} onMouseDown={(e) => e.preventDefault()}>
            <DatePicker value={value} onChange={handleDatePickerChange} />
          </div>
        </ReactBootstrap.Overlay>
      }
    </div>
  );
}

export default DateBox;
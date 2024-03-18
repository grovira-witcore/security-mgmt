import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { useAppContext } from '../context/AppContext.js';
import DatePicker from './DatePicker.js';
import TimePicker from './TimePicker.js';
import { formatDatetime } from '../utils/format.js';
import { getWords } from '../utils/get-words.js';

const DatetimeBox = function ({
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
      const valueParts = e.target.value.split(' ');
      if (valueParts.length === 3) {
        const valuePart1 = valueParts[0];
        const valuePart2 = valueParts[1];
        const valuePart3 = valueParts[2];
        const datetimeParts = {};
        switch (i18n.dateFormat) {
          case 'dd/mm/yyyy': {
            const valuePart1Parts = valuePart1.split('/');
            if (valuePart1Parts.length === 3) {
              datetimeParts.day = parseInt(valuePart1Parts[0]);
              datetimeParts.month = parseInt(valuePart1Parts[1]);
              datetimeParts.year = parseInt(valuePart1Parts[2]);
            }
            break;
          }
          case 'mm/dd/yyyy': {
            const valuePart1Parts = valuePart1.split('/');
            if (valuePart1Parts.length === 3) {
              datetimeParts.month = parseInt(valuePart1Parts[0]);
              datetimeParts.day = parseInt(valuePart1Parts[1]);
              datetimeParts.year = parseInt(valuePart1Parts[2]);
            }
            break;
          }
          case 'dd.mm.yyyy': {
            const valuePart1Parts = valuePart1.split('.');
            if (valuePart1Parts.length === 3) {
              datetimeParts.day = parseInt(valuePart1Parts[0]);
              datetimeParts.month = parseInt(valuePart1Parts[1]);
              datetimeParts.year = parseInt(valuePart1Parts[2]);
            }
            break;
          }
          case 'mm.dd.yyyy': {
            const valuePart1Parts = valuePart1.split('.');
            if (valuePart1Parts.length === 3) {
              datetimeParts.month = parseInt(valuePart1Parts[0]);
              datetimeParts.day = parseInt(valuePart1Parts[1]);
              datetimeParts.year = parseInt(valuePart1Parts[2]);
            }
            break;
          }
        }
        const valuePart2Parts = valuePart2.split(':');
        if (valuePart2Parts.length === 2) {
          datetimeParts.hour = parseInt(valuePart2Parts[0]);
          datetimeParts.minute = parseInt(valuePart2Parts[1]);
        }
        if (valuePart3.toUpperCase() === 'PM') {
          datetimeParts.hour += 12;
        }
        if (datetimeParts.year >= 1900 && datetimeParts.year <= 2900 && datetimeParts.month >= 1 && datetimeParts.month <= 12 && datetimeParts.day >= 1 && datetimeParts.day <= 31 && datetimeParts.hour >= 0 && datetimeParts.hour <= 23 && datetimeParts.minute >= 0 && datetimeParts.day <= 59) {
          newValue = new Date(datetimeParts.year, datetimeParts.month - 1, datetimeParts.day, datetimeParts.hour, datetimeParts.minute).toISOString();
        }
      }
    }
    onChange(newValue);
  }
  const handleOnBlur = function (e) {
    setTextValue(null);
    setShowDropdown(false);
  }
  const handleDatePickerChange = function (newValue) {
    let targetDate = null;
    if (value !== null && value !== undefined) {
      const newDate = new Date(newValue);
      targetDate = new Date(value);
      targetDate.setFullYear(newDate.getFullYear());
      targetDate.setMonth(newDate.getMonth());
      targetDate.setDate(newDate.getDate());
    }
    else {
      targetDate = new Date(newValue);
    }
    setTextValue(null);
    onChange(targetDate.toISOString());
    setShowDropdown(false);
  }
  const handleTimePickerChange = function (newValue) {
    let targetDate = null;
    if (value !== null && value !== undefined) {
      const newDate = new Date(newValue);
      targetDate = new Date(value);
      targetDate.setHours(newDate.getHours());
      targetDate.setMinutes(newDate.getMinutes());
    }
    else {
      targetDate = new Date(newValue);
    }
    setTextValue(null);
    onChange(targetDate.toISOString());
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
    errors.push(i18n.requiredField);
  }

  return (
    <div>
      <div className="px-1 pt-1 pb-2" data-invalid={errors.length > 0 ? '1' : null}>
        <div className="py-1 d-flex fw-bold">
          <div>{label}</div>
          {required && (<div className="ps-1 text-red">*</div>)}
        </div>
        <input ref={inputRef} className={'form-control' + (validated && errors.length > 0 ? ' is-invalid' : '')} type="text" placeholder={placeholder} value={textValue ?? (value !== null && value !== undefined ? formatDatetime(value, i18n.dateFormat) : '')} onClick={handleOnClick} onKeyPress={handleOnKeyPress} onChange={handleOnChange} onBlur={handleOnBlur} />
        {validated && errors.map((error, index) => (
          <div key={index} className="pt-1 ps-1 fw-bold text-red">{error}</div>
        ))}
      </div>
      {showDropdown &&
        <ReactBootstrap.Overlay show={true} target={inputRef.current} placement={getDropdownPlacement()}>
          <div className="p-2 pb-0 bg-light border border-black rounded d-flex" style={{ zIndex: 100000 }} onMouseDown={(e) => e.preventDefault()}>
            <DatePicker value={value} onChange={handleDatePickerChange} />
            <TimePicker value={value} onChange={handleTimePickerChange} />
          </div>
        </ReactBootstrap.Overlay>
      }
    </div>
  );
}

export default DatetimeBox;
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.FilterNumeric = function ({ filterValue, setFilterValue, trySubmit, decimalPlaces }) {
  const [textValue, setTextValue] = React.useState(null);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus({ preventScroll: true });
  }, []);

  const handleChange = function (e, fromOrTo) {
    let cleanValue = e.target.value;
    if (cleanValue) {
      cleanValue = e.target.value.replace(/[^\d.\-]/g, '');
      if (cleanValue.length > 20) {
        cleanValue = cleanValue.substring(0, 20);
      }
    }
    setTextValue(cleanValue);
    let newValue = null;
    if (cleanValue !== null && cleanValue !== undefined && cleanValue !== '') {
      newValue = parseFloat(cleanValue);
      if (isNaN(newValue)) {
        newValue = null;
      }
      if (newValue) {
        if (newValue > 0) {
          if (decimalPlaces) {
            newValue = Math.floor(newValue * (10 ** decimalPlaces)) / (10 ** decimalPlaces);
          }
          else {
            newValue = Math.floor(newValue);
          }
        }
        else {
          if (decimalPlaces) {
            newValue = Math.ceil(newValue * (10 ** decimalPlaces)) / (10 ** decimalPlaces);
          }
          else {
            newValue = Math.ceil(newValue);
          }
        }
      }
    }
    setFilterValue(newValue);
  }
  const handleBlur = function (e, fromOrTo) {
    setTextValue(null);
  }
  const handleKeyPress = function (e) {
    if (e.key === 'Enter') {
      trySubmit();
    }
  }

  const numberToString = function (number) {
    if (number !== null && number !== undefined) {
      if (decimalPlaces) {
        return number.toFixed(decimalPlaces);
      }
      else {
        return number.toString();
      }
    }
    else {
      return '';
    }
  }

  return (
    <div style={{ width: 120 }}>
      <input ref={inputRef} className="form-control text-end" type="text" value={textValue ?? (filterValue ? numberToString(filterValue) : null)} onChange={handleChange} onBlur={handleBlur} onKeyPress={handleKeyPress} />
    </div>
  );
}
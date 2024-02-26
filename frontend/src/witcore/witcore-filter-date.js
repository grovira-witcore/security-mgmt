import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.FilterDate = function ({ filterValue, setFilterValue, trySubmit }) {
  const { dateFormat } = React.useContext(Witcore.Context);

  const [textValue, setTextValue] = React.useState(null);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus({ preventScroll: true });
  }, []);

  const handleChange = function (e) {
    setTextValue(e.target.value);
    let newValue = null;
    if (e.target.value !== null && e.target.value !== undefined && e.target.value !== '') {
      const dateParts = {};
      switch (dateFormat) {
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
    setFilterValue(newValue);
  }
  const handleBlur = function (e) {
    setTextValue(null);
  }
  const handleDatePickerChange = function (newValue) {
    setTextValue(null);
    setFilterValue(newValue);
  }
  const handleKeyPress = function (e) {
    if (e.key === 'Enter') {
      trySubmit();
    }
  }

  return (
    <div style={{ width: 220 }}>
      <input ref={inputRef} className="form-control" type="text" value={textValue ?? (filterValue ? Witcore.Utils.formatDate(filterValue, dateFormat) : '')} onChange={handleChange} onBlur={handleBlur} onKeyPress={handleKeyPress} />
      <div className="p-2 pb-0 bg-light border border-gray rounded">
        <Witcore.DatePicker value={filterValue} onChange={(newValue) => handleDatePickerChange(newValue)} />
      </div>
    </div>
  );
}
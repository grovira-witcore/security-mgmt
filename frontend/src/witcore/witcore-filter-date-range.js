import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.FilterDateRange = function ({ filterValue, setFilterValue, trySubmit }) {
  const { getLang, dateFormat } = React.useContext(Witcore.Context);
  const lang = getLang();

  const [textFrom, setTextFrom] = React.useState(null);
  const [textTo, setTextTo] = React.useState(null);

  const inputFromRef = React.useRef(null);

  React.useEffect(() => {
    inputFromRef.current.focus({ preventScroll: true });
  }, []);

  const handleChange = function (e, fromOrTo) {
    if (fromOrTo === 'from') {
      setTextFrom(e.target.value);
    }
    else {
      setTextTo(e.target.value);
    }
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
    if (fromOrTo === 'from') {
      setFilterValue(prevFilterValue => prevFilterValue ? [newValue, prevFilterValue[1]] : [newValue, null]);
    }
    else {
      setFilterValue(prevFilterValue => prevFilterValue ? [prevFilterValue[0], newValue] : [null, newValue]);
    }
  }
  const handleBlur = function (e, fromOrTo) {
    if (fromOrTo === 'from') {
      setTextFrom(null);
    }
    else {
      setTextTo(null);
    }
  }
  const handleDatePickerChange = function (newValue, fromOrTo) {
    if (fromOrTo === 'from') {
      setTextFrom(null);
      setFilterValue(prevFilterValue => prevFilterValue ? [newValue, prevFilterValue[1]] : [newValue, null]);
    }
    else {
      setTextTo(null);
      setFilterValue(prevFilterValue => prevFilterValue ? [prevFilterValue[0], newValue] : [null, newValue]);
    }
  }
  const handleKeyPress = function (e) {
    if (e.key === 'Enter') {
      trySubmit();
    }
  }

  return (
    <div className="d-flex">
      <div style={{ width: 220 }}>
        <input ref={inputFromRef} className="form-control" type="text" placeholder={lang.from} value={textFrom ?? (filterValue ? (filterValue[0] !== null && filterValue[0] !== undefined ? Witcore.Utils.formatDate(filterValue[0], dateFormat) : '') : null)} onChange={(e) => handleChange(e, 'from')} onBlur={(e) => handleBlur(e, 'from')} onKeyPress={handleKeyPress} />
        <div className="p-2 pb-0 bg-light border border-gray rounded">
          <Witcore.DatePicker value={filterValue ? filterValue[0] : null} onChange={(newValue) => handleDatePickerChange(newValue, 'from')} />
        </div>
      </div>
      <div className="ps-2" style={{ width: 220 }}>
        <input className="form-control" type="text" placeholder={lang.to} value={textTo ?? (filterValue ? (filterValue[1] !== null && filterValue[1] !== undefined ? Witcore.Utils.formatDate(filterValue[1], dateFormat) : '') : null)} onChange={(e) => handleChange(e, 'to')} onBlur={(e) => handleBlur(e, 'to')} onKeyPress={handleKeyPress} />
        <div className="p-2 pb-0 bg-light border border-gray rounded">
          <Witcore.DatePicker value={filterValue ? filterValue[1] : null} onChange={(newValue) => handleDatePickerChange(newValue, 'to')} />
        </div>
      </div>
    </div>
  );
}
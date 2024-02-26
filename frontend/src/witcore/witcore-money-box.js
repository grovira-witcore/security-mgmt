import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.MoneyBox = function ({ 
  label, 
  placeholder,
  value, 
  onChange, 
  validated,
  required,
  decimalPlaces,
  minValue,
  maxValue
}) {
  const { getLang, moneySymbol } = React.useContext(Witcore.Context);
  const lang = getLang();

  const [textValue, setTextValue] = React.useState(null);

  const handleOnChange = function (e) {
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
    onChange(newValue);
  }
  const handleOnBlur = function (e) {
    setTextValue(null);
  }

  const numberToString = function (number) {
    if (number !== null && number !== undefined) {
      if (decimalPlaces) {
        return moneySymbol + ' ' + number.toFixed(decimalPlaces);
      }
      else {
        return moneySymbol + ' ' + number.toString();
      }
    }
    else {
      return '';
    }
  }

  const errors = [];
  if (required && (value === null || value === undefined)) {
    errors.push(lang.requiredField);
  }
  else if (value !== null && value !== undefined) {
    if (minValue !== null && minValue !== undefined && minValue > value) {
      errors.push(lang.minValueAllowed + ': ' + numberToString(minValue));
    }
    if (maxValue !== null && maxValue !== undefined && maxValue < value) {
      errors.push(lang.maxValueAllowed + ': ' + numberToString(maxValue));
    }
  }

  return (
    <div className="px-1 pt-1 pb-2" data-invalid={errors.length > 0 ? '1' : null}>
      <div className="py-1 d-flex fw-bold">
        <div>{label}</div>
        {required && (<div className="ps-1 text-red">*</div>)}
      </div>
      <input className={'form-control text-end' + (validated && errors.length > 0 ? ' is-invalid' : '')} type="text" placeholder={placeholder} value={textValue ?? numberToString(value)} onChange={handleOnChange} onBlur={handleOnBlur} />
      {validated && errors.map((error, index) => (
        <div key={'error-' + index} className="pt-1 ps-1 fw-bold text-red">{error}</div>
      ))}
    </div>
  );
}

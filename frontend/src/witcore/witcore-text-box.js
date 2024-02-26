import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.TextBox = function ({
  label,
  placeholder,
  value,
  onChange,
  validated,
  required,
  maxLength,
  regex,
  regexText
}) {
  const { getLang } = React.useContext(Witcore.Context);
  const lang = getLang();

  const handleOnChange = function (e) {
    let cleanValue = e.target.value;
    if (cleanValue) {
      if (maxLength !== null && maxLength !== undefined && cleanValue.length > maxLength) {
        cleanValue = cleanValue.substring(0, maxLength);
      }
    }
    let newValue = null;
    if (cleanValue !== null && cleanValue !== undefined && cleanValue !== '') {
      newValue = cleanValue;
    }
    onChange(newValue);
  }

  const errors = [];
  if (required && (value === null || value === undefined)) {
    errors.push(lang.requiredField);
  }
  else if (value !== null && value !== undefined) {
    if (regex && !regex.test(value)) {
      errors.push(regexText);
    }
  }

  return (
    <div className="px-1 pt-1 pb-2" data-invalid={errors.length > 0 ? '1' : null}>
      <div className="py-1 d-flex fw-bold">
        <div>{label}</div>
        {required && (<div className="ps-1 text-red">*</div>)}
      </div>
      <input className={'form-control' + (validated && errors.length > 0 ? ' is-invalid' : '')} type="text" placeholder={placeholder} value={value !== null && value !== undefined ? value : ''} onChange={handleOnChange} />
      {validated && errors.map((error, index) => (
        <div key={'error-' + index} className="pt-1 ps-1 fw-bold text-red">{error}</div>
      ))}
    </div>
  );
}

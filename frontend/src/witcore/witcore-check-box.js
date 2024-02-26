import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.CheckBox = function ({
  label,
  value,
  onChange,
  validated,
  required,
  mandatory,
  mandatoryText
}) {
  const { getLang } = React.useContext(Witcore.Context);
  const lang = getLang();

  const handleOnChange = function (e) {
    if (e.target.checked) {
      onChange(true);
    }
    else {
      onChange(false);
    }
  }

  const errors = [];
  if (required && (value === null || value === undefined)) {
    errors.push(lang.requiredField);
  }
  else if (value !== null && value !== undefined) {
    if (mandatory && !value) {
      errors.push(mandatoryText);
    }
  }

  return (
    <div className="px-1 pt-1 pb-2" data-invalid={errors.length > 0 ? '1' : null}>
      <div className="pt-1 d-flex fw-bold">
        <input type="checkbox" checked={value} onChange={handleOnChange} />
        <div className="ps-2">{label}</div>
      </div>
      {validated && errors.map((error, index) => (
        <div key={'error-' + index} className="pt-1 ps-1 fw-bold text-red">{error}</div>
      ))}
    </div>
  );
}

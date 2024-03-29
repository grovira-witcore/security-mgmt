import React from 'react';
import { useAppContext } from '../context/AppContext.js';
import { getWords } from '../utils/get-words.js';

const ComboBox = function ({
  label,
  placeholder,
  value,
  onChange,
  validated,
  dataSource,
  required
}) {
  const { i18n } = useAppContext();
  const words = getWords(i18n.code);

  const handleOnChange = function (e) {
    let newValue = null;
    if (e.target.value !== null && e.target.value !== undefined && e.target.value !== '') {
      newValue = getNewValue(e.target.value);
    }
    onChange(newValue);
  }
  const getNewValue = function (targetValue) {
    for (const dataSourceItem of dataSource) {
      if (dataSourceItem[0] === targetValue) {
        return targetValue;
      }
      else if (dataSourceItem[0] === parseInt(targetValue)) {
        return parseInt(targetValue);
      }
    }
    return null;
  }

  const errors = [];
  if (required && (value === null || value === undefined)) {
    errors.push(words.requiredField);
  }

  return (
    <div className="px-1 pt-1 pb-2" data-invalid={errors.length > 0 ? '1' : null}>
      <div className="py-1 d-flex fw-bold">
        <div>{label}</div>
        {required && (<div className="ps-1 text-red">*</div>)}
      </div>
      <select className={'form-control' + (validated && errors.length > 0 ? ' is-invalid' : '')} placeholder={placeholder} value={value !== null && value !== undefined ? value.toString() : ''} onChange={handleOnChange} >
        <option value=""></option>
        {dataSource.map((dataSourceItem) => (
          <option key={dataSourceItem[0]} value={(dataSourceItem[0]).toString()}>{dataSourceItem[1]}</option>
        ))}
      </select>
      {validated && errors.map((error, index) => (
        <div key={index} className="pt-1 ps-1 fw-bold text-red">{error}</div>
      ))}
    </div>
  );
}

export default ComboBox;
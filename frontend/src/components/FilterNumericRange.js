import React from 'react';
import { useAppContext } from '../context/AppContext.js';
import { getWords } from '../utils/get-words.js';

const FilterNumericRange = function ({ filterValue, setFilterValue, trySubmit, decimalPlaces }) {
  const { i18n } = useAppContext();
  const words = getWords(i18n.code);

  const [textFrom, setTextFrom] = React.useState(null);
  const [textTo, setTextTo] = React.useState(null);

  const inputFromRef = React.useRef(null);

  React.useEffect(() => {
    inputFromRef.current.focus({ preventScroll: true });
  }, []);

  const handleChange = function (e, fromOrTo) {
    let cleanValue = e.target.value;
    if (cleanValue) {
      cleanValue = e.target.value.replace(/[^\d.\-]/g, '');
      if (cleanValue.length > 20) {
        cleanValue = cleanValue.substring(0, 20);
      }
    }
    if (fromOrTo === 'from') {
      setTextFrom(cleanValue);
    }
    else {
      setTextTo(cleanValue);
    }
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
    <div className="d-flex">
      <div style={{ width: 120 }}>
        <input ref={inputFromRef} className="form-control text-end" type="text" placeholder={words.from} value={textFrom ?? (filterValue ? numberToString(filterValue[0]) : null)} onChange={(e) => handleChange(e, 'from')} onBlur={(e) => handleBlur(e, 'from')} onKeyPress={handleKeyPress} />
      </div>
      <div className="ps-2" style={{ width: 120 }}>
        <input className="form-control text-end" type="text" placeholder={words.to} value={textTo ?? (filterValue ? numberToString(filterValue[1]) : null)} onChange={(e) => handleChange(e, 'to')} onBlur={(e) => handleBlur(e, 'to')} onKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

export default FilterNumericRange;
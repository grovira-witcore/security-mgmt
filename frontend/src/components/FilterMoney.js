import React from 'react';
import AppContext from '../context/AppContext.js';

const FilterMoney = function ({ filterValue, setFilterValue, trySubmit, decimalPlaces }) {
  const { moneySymbol } = React.useContext(AppContext);

  const [textValue, setTextValue] = React.useState(null);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus({ preventScroll: true });
  }, []);

  const handleChange = function (e) {
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

  return (
    <div style={{ width: 120 }}>
      <input ref={inputRef} className="form-control text-end" type="text" value={textValue ?? (filterValue ? numberToString(filterValue) : null)} onChange={handleChange} onBlur={handleBlur} onKeyPress={handleKeyPress} />
    </div>
  );
}

export default FilterMoney;
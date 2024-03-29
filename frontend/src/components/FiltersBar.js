import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { useAppContext } from '../context/AppContext.js';
import FilterText from './FilterText.js';
import FilterNumeric from './FilterNumeric.js';
import FilterNumericRange from './FilterNumericRange.js';
import FilterMoney from './FilterMoney.js';
import FilterMoneyRange from './FilterMoneyRange.js';
import FilterPercentage from './FilterPercentage.js';
import FilterPercentageRange from './FilterPercentageRange.js';
import FilterDate from './FilterDate.js';
import FilterDateRange from './FilterDateRange.js';
import FilterDatetime from './FilterDatetime.js';
import FilterDatetimeRange from './FilterDatetimeRange.js';
import FilterOption from './FilterOption.js';
import IconOk from './icons/IconOk.js';
import IconCancel from './icons/IconCancel.js';
import IconDelete from './icons/IconDelete.js';
import { format, formatNumber, formatDate, formatDatetime } from '../utils/format.js';
import { getWords } from '../utils/get-words.js';

const FiltersBar = function ({ filters, filtersValues, setFiltersValues }) {
  const { i18n } = useAppContext();
  const words = getWords(i18n.code);

  const [currentFilterIndex, setCurrentFilterIndex] = React.useState(null);
  const [currentFilterValue, setCurrentFilterValue] = React.useState(null);
  const filterBarRef = React.useRef(null);

  const currentFilter = currentFilterIndex !== null && currentFilterIndex !== undefined ? filters[currentFilterIndex] : null;
  const overlay = {};
  if (currentFilter !== null && currentFilter !== undefined) {
    const findOverlayTarget = function (element, value) {
      if (element.dataset['filter'] === value) {
        return element;
      }
      for (const childElement of element.children) {
        const foundElement = findOverlayTarget(childElement, value);
        if (foundElement) {
          return foundElement;
        }
      }
      return null;
    }
    overlay.target = findOverlayTarget(filterBarRef.current, 'filter-' + currentFilterIndex);
    if (overlay.target) {
      const rect = overlay.target.getBoundingClientRect();
      const screenHeight = window.innerHeight;
      const distanceToBottom = screenHeight - rect.bottom;
      if (distanceToBottom < 260) {
        overlay.placement = 'top-start';
      }
      else {
        overlay.placement = 'bottom-start';
      }
    }
  }

  const handleStartFilterEdition = function (e, index) {
    if (e.ctrlKey) {
      return;
    }
    setCurrentFilterIndex(index);
    setCurrentFilterValue(filtersValues[index]);
  }
  const handleSubmitFilterEdition = function (e) {
    if (e.ctrlKey) {
      return;
    }
    setFiltersValues(filtersValues.map((filterValue, index) => {
      if (index === currentFilterIndex) {
        return currentFilterValue;
      }
      else {
        return filterValue;
      }
    }));
    setCurrentFilterIndex(null);
    setCurrentFilterValue(null);
  }
  const handleCancelFilterEdition = function (e) {
    if (e.ctrlKey) {
      return;
    }
    setCurrentFilterIndex(null);
    setCurrentFilterValue(null);
  }
  const handleDeleteFilterValue = function (e, filterIndex) {
    if (e.ctrlKey) {
      return;
    }
    setFiltersValues(filtersValues.map((filterValue, index) => {
      if (index === filterIndex) {
        return null;
      }
      else {
        return filterValue;
      }
    }));
    setCurrentFilterIndex(null);
    setCurrentFilterValue(null);
    e.stopPropagation();
  }
  const isValidCurrentFilter = function () {
    if (
      currentFilterValue === null ||
      currentFilterValue === undefined ||
      currentFilterValue === '' ||
      (Array.isArray(currentFilterValue) && !currentFilterValue.some((item) => item !== null && item !== undefined))
    ) {
      return false;
    }
    if (
      (currentFilter.variant === 'NumericRange' || currentFilter.variant === 'MoneyRange' || currentFilter.variant === 'PercentageRange' || currentFilter.variant === 'DateRange' || currentFilter.variant === 'DatetimeRange') &&
      (!Array.isArray(currentFilterValue) || currentFilterValue.length !== 2 || (currentFilterValue[0] !== null && currentFilterValue[0] !== undefined && currentFilterValue[1] !== null && currentFilterValue[1] !== undefined && currentFilterValue[0] > currentFilterValue[1]))
    ) {
      return false;
    }
    return true;
  }
  const convertFilterValueToText = function (filter, filterValue) {
    switch (filter.variant) {
      case 'Text': {
        return '"' + filterValue + '"';
      }
      case 'Numeric': {
        return formatNumber(filterValue, filter.decimalPlaces);
      }
      case 'NumericRange': {
        let textParts = [];
        if (filterValue[0] !== null && filterValue[0] !== undefined) {
          textParts.push(words.from + ' ' + formatNumber(filterValue[0], filter.decimalPlaces));
        }
        if (filterValue[1] !== null && filterValue[1] !== undefined) {
          textParts.push(words.to + ' ' + formatNumber(filterValue[1], filter.decimalPlaces));
        }
        return textParts.join(' ');
      }
      case 'Money': {
        return format(filterValue, 'money', null, i18n.moneySymbol);
      }
      case 'MoneyRange': {
        let textParts = [];
        if (filterValue[0] !== null && filterValue[0] !== undefined) {
          textParts.push(words.from + ' ' + format(filterValue[0], 'money', null, i18n.moneySymbol));
        }
        if (filterValue[1] !== null && filterValue[1] !== undefined) {
          textParts.push(words.to + ' ' + format(filterValue[1], 'money', null, i18n.moneySymbol));
        }
        return textParts.join(' ');
      }
      case 'Percentage': {
        return format(filterValue, 'percentage');
      }
      case 'PercentageRange': {
        let textParts = [];
        if (filterValue[0] !== null && filterValue[0] !== undefined) {
          textParts.push(words.from + ' ' + format(filterValue[0], 'percentage'));
        }
        if (filterValue[1] !== null && filterValue[1] !== undefined) {
          textParts.push(words.to + ' ' + format(filterValue[1], 'percentage'));
        }
        return textParts.join(' ');
      }
      case 'Date': {
        return formatDate(filterValue, i18n.dateFormat);
      }
      case 'DateRange': {
        let textParts = [];
        if (filterValue[0] !== null && filterValue[0] !== undefined) {
          textParts.push(words.from + ' ' + formatDate(filterValue[0], i18n.dateFormat));
        }
        if (filterValue[1] !== null && filterValue[1] !== undefined) {
          textParts.push(words.to + ' ' + formatDate(filterValue[1], i18n.dateFormat));
        }
        return textParts.join(' ');
      }
      case 'Datetime': {
        return formatDatetime(filterValue, i18n.dateFormat);
      }
      case 'DatetimeRange': {
        let textParts = [];
        if (filterValue[0] !== null && filterValue[0] !== undefined) {
          textParts.push(words.from + ' ' + formatDatetime(filterValue[0], i18n.dateFormat));
        }
        if (filterValue[1] !== null && filterValue[1] !== undefined) {
          textParts.push(words.to + ' ' + formatDatetime(filterValue[1], i18n.dateFormat));
        }
        return textParts.join(' ');
      }
      case 'Option': {
        const textParts = [];
        for (const item of filterValue) {
          textParts.push(filter.dataSource.find((dataSourceItem) => dataSourceItem[0] === item)[1])
        }
        return textParts.join(', ');
      }
      default: {
        return '';
      }
    }
  }

  return (
    <div>
      <div ref={filterBarRef} className="d-flex">
        {filters.map(function (filter, index) {
          const filterValue = filtersValues[index];
          if (filterValue) {
            return (
              <div key={'filter-' + index} className="pe-2">
                <div className="px-3 py-1 d-flex btn btn-outline-blue" data-filter={'filter-' + index} onClick={(e) => handleStartFilterEdition(e, index)}>
                  <div className="pt-1 d-flex">
                    <div className="fw-bold">{filter.label}</div>
                    <div className="fw-bold">{':'}</div>
                    <div className="ps-1">{convertFilterValueToText(filter, filterValue)}</div>
                  </div>
                  <div className="ps-3 cursor-pointer text-red hover-opaque" onClick={(e) => handleDeleteFilterValue(e, index)}>
                    <IconDelete size="xs" />
                  </div>
                </div>
              </div>
            );
          }
          else {
            return (
              <div key={'filter-' + index} className="pe-2">
                <div className="px-3 py-1 d-flex btn btn-outline-black" data-filter={'filter-' + index} onClick={(e) => handleStartFilterEdition(e, index)}>
                  <div className="pt-1 d-flex">
                    <div className="fw-bold">{filter.label}</div>
                    <div className="fw-bold">{':'}</div>
                    <div className="ps-1">{'< ' + words.all + ' >'}</div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      {overlay.target &&
        <ReactBootstrap.Overlay show={true} target={overlay.target} placement={overlay.placement} rootClose={true} onHide={handleCancelFilterEdition}>
          <div className="p-2 bg-light border border-gray rounded" style={{ zIndex: 100000 }}>
            <div className="pb-2 fw-bold">
              {currentFilter.label}
            </div>
            {currentFilter.variant === 'Text' && (
              <FilterText filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'Numeric' && (
              <FilterNumeric filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} decimalPlaces={currentFilter.decimalPlaces} />
            )}
            {currentFilter.variant === 'NumericRange' && (
              <FilterNumericRange filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} decimalPlaces={currentFilter.decimalPlaces} />
            )}
            {currentFilter.variant === 'Money' && (
              <FilterMoney filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} decimalPlaces={currentFilter.decimalPlaces} />
            )}
            {currentFilter.variant === 'MoneyRange' && (
              <FilterMoneyRange filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} decimalPlaces={currentFilter.decimalPlaces} />
            )}
            {currentFilter.variant === 'Percentage' && (
              <FilterPercentage filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'PercentageRange' && (
              <FilterPercentageRange filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'Date' && (
              <FilterDate filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'DateRange' && (
              <FilterDateRange filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'Datetime' && (
              <FilterDatetime filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'DatetimeRange' && (
              <FilterDatetimeRange filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'Option' && (
              <FilterOption filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} dataSource={currentFilter.dataSource} exclusive={currentFilter.exclusive} />
            )}
            <div className="pt-2 d-flex justify-content-end">
              {isValidCurrentFilter() ?
                <div className="ps-2 cursor-pointer text-green hover-opaque" onClick={handleSubmitFilterEdition}>
                  <IconOk size="sm" />
                </div> :
                <div className="ps-2 text-gray">
                  <IconOk size="sm" />
                </div>
              }
              <div className="ps-2 cursor-pointer text-red hover-opaque" onClick={handleCancelFilterEdition}>
                <IconCancel size="sm" />
              </div>
            </div>
          </div>
        </ReactBootstrap.Overlay>
      }
    </div>
  );
}

export default FiltersBar;
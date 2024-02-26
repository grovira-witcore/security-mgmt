import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.FiltersBar = function ({ filters, filtersValues, setFiltersValues }) {
  const { getLang, dateFormat, moneySymbol } = React.useContext(Witcore.Context);
  const lang = getLang();

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
        return Witcore.Utils.formatNumber(filterValue, filter.decimalPlaces);
      }
      case 'NumericRange': {
        let textParts = [];
        if (filterValue[0] !== null && filterValue[0] !== undefined) {
          textParts.push(lang.from + ' ' + Witcore.Utils.formatNumber(filterValue[0], filter.decimalPlaces));
        }
        if (filterValue[1] !== null && filterValue[1] !== undefined) {
          textParts.push(lang.to + ' ' + Witcore.Utils.formatNumber(filterValue[1], filter.decimalPlaces));
        }
        return textParts.join(' ');
      }
      case 'Money': {
        return Witcore.Utils.format(filterValue, 'money', null, moneySymbol);
      }
      case 'MoneyRange': {
        let textParts = [];
        if (filterValue[0] !== null && filterValue[0] !== undefined) {
          textParts.push(lang.from + ' ' + Witcore.Utils.format(filterValue[0], 'money', null, moneySymbol));
        }
        if (filterValue[1] !== null && filterValue[1] !== undefined) {
          textParts.push(lang.to + ' ' + Witcore.Utils.format(filterValue[1], 'money', null, moneySymbol));
        }
        return textParts.join(' ');
      }
      case 'Percentage': {
        return Witcore.Utils.format(filterValue, 'percentage');
      }
      case 'PercentageRange': {
        let textParts = [];
        if (filterValue[0] !== null && filterValue[0] !== undefined) {
          textParts.push(lang.from + ' ' + Witcore.Utils.format(filterValue[0], 'percentage'));
        }
        if (filterValue[1] !== null && filterValue[1] !== undefined) {
          textParts.push(lang.to + ' ' + Witcore.Utils.format(filterValue[1], 'percentage'));
        }
        return textParts.join(' ');
      }
      case 'Date': {
        return Witcore.Utils.formatDate(filterValue, dateFormat);
      }
      case 'DateRange': {
        let textParts = [];
        if (filterValue[0] !== null && filterValue[0] !== undefined) {
          textParts.push(lang.from + ' ' + Witcore.Utils.formatDate(filterValue[0], dateFormat));
        }
        if (filterValue[1] !== null && filterValue[1] !== undefined) {
          textParts.push(lang.to + ' ' + Witcore.Utils.formatDate(filterValue[1], dateFormat));
        }
        return textParts.join(' ');
      }
      case 'Datetime': {
        return Witcore.Utils.formatDatetime(filterValue, dateFormat);
      }
      case 'DatetimeRange': {
        let textParts = [];
        if (filterValue[0] !== null && filterValue[0] !== undefined) {
          textParts.push(lang.from + ' ' + Witcore.Utils.formatDatetime(filterValue[0], dateFormat));
        }
        if (filterValue[1] !== null && filterValue[1] !== undefined) {
          textParts.push(lang.to + ' ' + Witcore.Utils.formatDatetime(filterValue[1], dateFormat));
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
                    <Witcore.Icon.Delete size="xs" />
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
                    <div className="ps-1">{'< ' + lang.all + ' >'}</div>
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
              <Witcore.FilterText filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'Numeric' && (
              <Witcore.FilterNumeric filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} decimalPlaces={currentFilter.decimalPlaces} />
            )}
            {currentFilter.variant === 'NumericRange' && (
              <Witcore.FilterNumericRange filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} decimalPlaces={currentFilter.decimalPlaces} />
            )}
            {currentFilter.variant === 'Money' && (
              <Witcore.FilterMoney filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} decimalPlaces={currentFilter.decimalPlaces} />
            )}
            {currentFilter.variant === 'MoneyRange' && (
              <Witcore.FilterMoneyRange filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} decimalPlaces={currentFilter.decimalPlaces} />
            )}
            {currentFilter.variant === 'Percentage' && (
              <Witcore.FilterPercentage filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'PercentageRange' && (
              <Witcore.FilterPercentageRange filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'Date' && (
              <Witcore.FilterDate filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'DateRange' && (
              <Witcore.FilterDateRange filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'Datetime' && (
              <Witcore.FilterDatetime filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'DatetimeRange' && (
              <Witcore.FilterDatetimeRange filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} />
            )}
            {currentFilter.variant === 'Option' && (
              <Witcore.FilterOption filterValue={currentFilterValue} setFilterValue={setCurrentFilterValue} trySubmit={() => isValidCurrentFilter() && handleSubmitFilterEdition({})} dataSource={currentFilter.dataSource} exclusive={currentFilter.exclusive} />
            )}
            <div className="pt-2 d-flex justify-content-end">
              {isValidCurrentFilter() ?
                <div className="ps-2 cursor-pointer text-green hover-opaque" onClick={handleSubmitFilterEdition}>
                  <Witcore.Icon.Ok size="sm" />
                </div> :
                <div className="ps-2 text-gray">
                  <Witcore.Icon.Ok size="sm" />
                </div>
              }
              <div className="ps-2 cursor-pointer text-red hover-opaque" onClick={handleCancelFilterEdition}>
                <Witcore.Icon.Cancel size="sm" />
              </div>
            </div>
          </div>
        </ReactBootstrap.Overlay>
      }
    </div>
  );
}
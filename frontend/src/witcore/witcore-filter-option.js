import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.FilterOption = function ({ filterValue, setFilterValue, trySubmit, dataSource, exclusive }) {

  const handleCheckboxChange = function (e, item) {
    if (exclusive) {
      setFilterValue(item);
    }
    else {
      if (filterValue && filterValue.includes(item)) {
        setFilterValue(prevFilterValue => prevFilterValue.filter(itemX => itemX !== item));
      }
      else {
        setFilterValue(prevFilterValue => prevFilterValue ? [...prevFilterValue, item] : [item]);
      }
    }
  }

  return (
    <div>
      {dataSource.map((dataSourceItem) =>
        <div className="pb-2 px-1 d-flex">
          <input type="checkbox" checked={filterValue && (filterValue === dataSourceItem[0] || (Array.isArray(filterValue) && filterValue.includes(dataSourceItem[0])))} onChange={(e) => handleCheckboxChange(e, dataSourceItem[0])} />
          <div className="px-2">{dataSourceItem[1]}</div>
        </div>
      )}
    </div>
  );
}
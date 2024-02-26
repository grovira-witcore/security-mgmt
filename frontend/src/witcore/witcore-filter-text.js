import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.FilterText = function ({ filterValue, setFilterValue, trySubmit }) {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus({ preventScroll: true });
  }, []);  

  const handleChange = function (e) {
    setFilterValue(e.target.value);
  }
  const handleKeyPress = function (e) {
    if (e.key === 'Enter') {
      trySubmit();
    }
  }

  return (
    <div style={{ width: 240 }}>
      <input ref={inputRef} className="form-control" type="text" value={filterValue} onChange={handleChange} onKeyPress={handleKeyPress} />
    </div>
  );
}
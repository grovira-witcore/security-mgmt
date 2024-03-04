import React from 'react';

const FilterText = function ({ filterValue, setFilterValue, trySubmit }) {
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

export default FilterText;
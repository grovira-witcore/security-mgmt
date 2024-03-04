import React from 'react';

const ProgressBar = function ({ value, color }) {
  return (
    <div className="progress bg-light">
      <div className={'progress-bar bg-' + (color ?? 'blue')} role="progressbar" style={{ width: Math.floor(value * 100) + '%' }} />
    </div>
  );
};

export default ProgressBar;
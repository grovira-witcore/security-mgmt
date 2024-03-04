import React from 'react';

const Title = function ({ level, icon, color, label, secondaryLabel }) {
  if (level === 1) {
    return (
      <div className="d-flex align-items-center">
        <div className="pe-2 pt-1 pb-2">
          <div className={'rounded bg-' + color + ' text-white'}>
            <div className="p-2">
              {React.createElement(icon, { size: 'lg' })}
            </div>
          </div>
        </div>
        {secondaryLabel === null || secondaryLabel === undefined ?
          <div className="pt-1 fs-4 fw-bold">
            {label}
          </div> :
          <div className="fs-5 fw-bold">
            <div>{label}</div>
            <div className="fs-6 text-muted fw-light">{secondaryLabel}</div>
          </div>
        }
      </div>
    );
  }
  else {
    return (
      <div className="d-flex align-items-center">
        <div className="pe-2">
          {React.createElement(icon, { size: 'sm' }, null)}
        </div>
        <div className="pt-1 fs-5 fw-bold">
          {label}
        </div>
      </div>
    );
  }
}

export default Title;
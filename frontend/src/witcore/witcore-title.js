import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Title = function ({ level, icon, color, label, secondaryLabel }) {
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

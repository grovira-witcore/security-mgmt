import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.ProgressBar = function ({ value, color }) {
  return (
    <div className="progress bg-light">
      <div className={'progress-bar bg-' + (color ?? 'blue')} role="progressbar" style={{ width: Math.floor(value * 100) + '%' }} />
    </div>
  );
};

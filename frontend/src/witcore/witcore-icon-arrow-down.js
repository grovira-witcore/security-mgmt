import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Icon.ArrowDown = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 24 24" width={convertedSize} height={convertedSize} fill="currentColor">
      <path d="M18.414,10.656c-0.781-0.781-2.047-0.781-2.828,0L14,12.242V5c0-1.105-0.896-2-2-2c-1.105,0-2,0.895-2,2v7.242l-1.586-1.586  c-0.781-0.781-2.047-0.781-2.828,0s-0.781,2.047,0,2.828L12,19.898l6.414-6.414C19.195,12.703,19.195,11.438,18.414,10.656z" />
    </svg>
  );
}

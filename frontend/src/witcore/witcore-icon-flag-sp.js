import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Icon.FlagSp = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 512 512" width={convertedSize} height={convertedSize}>
      <g>
        <rect fill="#B5002A" height="298.7" width="512" y="106.7" />
        <rect fill="#F4C327" height="149.4" width="512" y="181.3" />
      </g>
    </svg>
  );
}

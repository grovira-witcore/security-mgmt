import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Icon.FlagGe = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 512 512" width={convertedSize} height={convertedSize}>
      <g>
        <rect fill="#000000" height="99.6" width="512" y="106.7" />
        <rect fill="#D60000" height="99.6" width="512" y="206.2" />
        <rect fill="#F7C800" height="99.6" width="512" y="305.8" />
      </g>
    </svg>
  );
}

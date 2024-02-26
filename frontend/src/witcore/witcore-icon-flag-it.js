import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Icon.FlagIt = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 512 512" width={convertedSize} height={convertedSize}>
      <g>
        <rect fill="#3D9448" height="298.7" width="170.7" y="106.7" />
        <rect fill="#F4F4F4" height="298.7" width="170.7" x="170.7" y="106.7" />
        <rect fill="#D81E34" height="298.7" width="170.7" x="341.3" y="106.7" />
      </g>
    </svg>
  );
}

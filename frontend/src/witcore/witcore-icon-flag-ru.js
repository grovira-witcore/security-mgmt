import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Icon.FlagRu = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 512 512" width={convertedSize} height={convertedSize}>
      <g>
        <rect fill="#F4F4F4" height="99.6" width="512" y="106.7" />
        <rect fill="#324095" height="99.6" width="512" y="206.2" />
        <rect fill="#D81F26" height="99.6" width="512" y="305.8" />
      </g>
    </svg>
  );
}

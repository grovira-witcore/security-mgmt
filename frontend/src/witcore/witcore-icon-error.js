import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Icon.Error = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 20 20" width={convertedSize} height={convertedSize} fill="currentColor">
      <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">
        <g fill="currentColor" transform="translate(-2.000000, -212.000000)">
          <g transform="translate(2.000000, 212.000000)">
            <path d="M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M11,15 L9,15 L9,13 L11,13 L11,15 L11,15 Z M11,11 L9,11 L9,5 L11,5 L11,11 L11,11 Z" />
          </g>
        </g>
      </g>
    </svg>
  );
}

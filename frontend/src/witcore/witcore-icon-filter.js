import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Icon.Filter = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 16 16" width={convertedSize} height={convertedSize} fill="currentColor">
      <path d="M1 1H15V4L10 10V16H6V10L1 4V1Z" />
    </svg>
  );
}

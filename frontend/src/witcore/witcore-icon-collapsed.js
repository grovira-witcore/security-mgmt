import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Icon.Collapsed = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 48 48" width={convertedSize} height={convertedSize} fill="currentColor">
      <path d="M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z" />
      <path fill="none" d="M0-.25h48v48h-48z" />
    </svg>
  );
}
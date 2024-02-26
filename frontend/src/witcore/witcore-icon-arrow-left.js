import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Icon.ArrowLeft = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 24 24" width={convertedSize} height={convertedSize} fill="currentColor">
      <path d="M18,11h-7.244l1.586-1.586c0.781-0.781,0.781-2.049,0-2.828c-0.781-0.781-2.047-0.781-2.828,0L3.1,13l6.414,6.414  C9.904,19.805,10.416,20,10.928,20s1.023-0.195,1.414-0.586c0.781-0.781,0.781-2.049,0-2.828L10.756,15H18c1.104,0,2-0.896,2-2  C20,11.895,19.104,11,18,11z" />
    </svg>
  );
}


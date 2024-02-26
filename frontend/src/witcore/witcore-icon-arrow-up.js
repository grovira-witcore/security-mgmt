import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Icon.ArrowUp = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 24 24" width={convertedSize} height={convertedSize} fill="currentColor">
      <path d="M12,3.172L5.586,9.586c-0.781,0.781-0.781,2.047,0,2.828s2.047,0.781,2.828,0L10,10.828v7.242c0,1.104,0.895,2,2,2  c1.104,0,2-0.896,2-2v-7.242l1.586,1.586C15.977,12.805,16.488,13,17,13s1.023-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828  L12,3.172z" />
    </svg>
  );
}

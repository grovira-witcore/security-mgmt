import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';

const IconAccess = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 16 16" width={convertedSize} height={convertedSize} fill="currentColor">
      <path d="M0,11.864c0,2.209,1.791,4,4,4c2.209,0,4-1.791,4-4c0-0.554-0.113-1.082-0.317-1.562l8.181-8.181L13.743,0l-2.2,2.2  L9.439,0.096L8.732,0.803l2.104,2.104L10.043,3.7L7.939,1.596L7.232,2.303l2.104,2.104L5.562,8.181C5.082,7.977,4.554,7.864,4,7.864  C1.791,7.864,0,9.655,0,11.864z M3,11.864c0.552,0,1,0.448,1,1s-0.448,1-1,1c-0.552,0-1-0.448-1-1S2.448,11.864,3,11.864z">
      </path>
    </svg>
  );
}

export default IconAccess;

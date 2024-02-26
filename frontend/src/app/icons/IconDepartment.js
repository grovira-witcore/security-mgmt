import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';

const IconDepartment = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 24 24" width={convertedSize} height={convertedSize} fill="currentColor">
      <title>
      </title>
      <g>
        <path d="M12.5,13h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,12.5,13Z">
        </path>
        <path d="M12.5,9h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,12.5,9Z">
        </path>
        <path d="M12.5,5h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,12.5,5Z">
        </path>
        <path d="M8.5,13h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,8.5,13Z">
        </path>
        <path d="M8.5,9h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,8.5,9Z">
        </path>
        <path d="M8.5,5h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,8.5,5Z">
        </path>
        <path d="M16.5,13h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,16.5,13Z">
        </path>
        <path d="M16.5,9h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,16.5,9Z">
        </path>
        <path d="M16.5,5h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,16.5,5Z">
        </path>
        <path d="M22,21H21V2a1,1,0,0,0-1-1H4A1,1,0,0,0,3,2V21H2a1,1,0,0,0,0,2H22A1,1,0,0,0,22,21ZM10,21V19h4v2Zm6,0V18a1,1,0,0,0-1-1H9a1,1,0,0,0-1,1v3H5V3H19V21Z">
        </path>
      </g>
    </svg>
  );
}

export default IconDepartment;

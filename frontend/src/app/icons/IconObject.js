import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';

const IconObject = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 48 48" width={convertedSize} height={convertedSize} fill="currentColor">
      <g>
        <g>
          <path d="M0.062,0.062v21.943h21.943v-8.978V0.062H0.062z M0.062,47.938h21.943V25.995H0.062V47.938z M25.995,25.995v21.942h21.942    V25.995H34.972H25.995z M34.972,0.063L22.005,13.028l12.966,12.967l12.966-12.966L34.972,0.063z">
          </path>
        </g>
      </g>
    </svg>
  );
}

export default IconObject;

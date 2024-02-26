import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';

const IconLogo = function ({ size }) {
  const convertedSize = Witcore.Utils.convertSizeIcon(size);
  return (
    <svg viewBox="0 0 32 32" width={convertedSize} height={convertedSize} fill="currentColor">
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
        <g>
          <path d="M23,17H9c-0.5522,0-1-0.4478-1-1V9c0-4.4111,3.5889-8,8-8s8,3.5889,8,8v7C24,16.5522,23.5522,17,23,17z     M10,15h12V9c0-3.3086-2.6914-6-6-6s-6,2.6914-6,6V15z" fill="#FFC10A">
          </path>
        </g>
        <g>
          <path d="M27,16v6c0,4.96-4.04,9-9,9h-4c-4.96,0-9-4.04-9-9v-6c0-0.55,0.45-1,1-1h20C26.55,15,27,15.45,27,16z" fill="#2197F3">
          </path>
        </g>
        <g>
          <path d="M14.8594,27c-0.0039,0-0.0078,0-0.0117,0c-0.2959-0.0034-0.5752-0.1382-0.7627-0.3672l-2.8594-3.5    c-0.3496-0.4277-0.2861-1.0576,0.1416-1.4072c0.4277-0.3486,1.0576-0.2856,1.4072,0.1416l2.103,2.5747l4.3633-5.0923    c0.3604-0.4199,0.9917-0.4673,1.4097-0.1089c0.4194,0.3594,0.4683,0.9907,0.1089,1.4097l-5.1406,6    C15.4287,26.8726,15.1514,27,14.8594,27z" fill="#FFFFFF">
          </path>
        </g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
    </svg>
  );
}

export default IconLogo;

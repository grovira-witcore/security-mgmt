import React from 'react';
import BaseIcon from './BaseIcon.js';

const IconYes = function ({ size }) {
  return (
    <BaseIcon viewBox="0 0 24 24" size={size}>
      <g>
        <g>
          <circle fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" cx="12" cy="12" r="11.2" />
        </g>
        <g>
          <polyline fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="7.2,12 10.4,15.2 16.8,8.8   " />
        </g>
      </g>
    </BaseIcon>
  );
}

export default IconYes;
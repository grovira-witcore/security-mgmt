import React from 'react';
import BaseIcon from './BaseIcon.js';

const IconCancel = function ({ size }) {
  return (
    <BaseIcon viewBox="0 0 128 128" size={size}>
      <g>
        <circle cx="64" cy="64" r="64" />
      </g>
      <g>
        <path fill="#FFFFFF" d="M100.3,90.4L73.9,64l26.3-26.4c0.4-0.4,0.4-1,0-1.4l-8.5-8.5c-0.4-0.4-1-0.4-1.4,0L64,54.1L37.7,27.8  c-0.4-0.4-1-0.4-1.4,0l-8.5,8.5c-0.4,0.4-0.4,1,0,1.4L54,64L27.7,90.3c-0.4,0.4-0.4,1,0,1.4l8.5,8.5c0.4,0.4,1.1,0.4,1.4,0L64,73.9  l26.3,26.3c0.4,0.4,1.1,0.4,1.5,0.1l8.5-8.5C100.7,91.4,100.7,90.8,100.3,90.4z" />
      </g>
    </BaseIcon>
  );
}

export default IconCancel;
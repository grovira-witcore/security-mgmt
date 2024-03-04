import React from 'react';
import BaseIcon from './BaseIcon.js';

const IconCollapsed = function ({ size }) {
  return (
    <BaseIcon viewBox="0 0 48 48" size={size}>
      <path d="M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z" />
      <path fill="none" d="M0-.25h48v48h-48z" />
    </BaseIcon>
  );
}

export default IconCollapsed;
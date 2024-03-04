import React from 'react';
import BaseIcon from './BaseIcon.js';

const IconExpanded = function ({ size }) {
  return (
    <BaseIcon viewBox="0 0 48 48" size={size}>
      <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z" />
      <path fill="none" d="M0-.75h48v48h-48z" />
    </BaseIcon>
  );
}

export default IconExpanded;
import React from 'react';
import BaseIcon from './BaseIcon.js';

const IconFilter = function ({ size }) {
  return (
    <BaseIcon viewBox="0 0 16 16" size={size}>
      <path d="M1 1H15V4L10 10V16H6V10L1 4V1Z" />
    </BaseIcon>
  );
}

export default IconFilter;
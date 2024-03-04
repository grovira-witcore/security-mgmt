import React from 'react';
import BaseIcon from './BaseIcon.js';

const IconAdd = function ({ size }) {
  return (
    <BaseIcon viewBox="0 0 512 512" size={size}>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112" />
    </BaseIcon>
  );
}

export default IconAdd;

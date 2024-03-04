import React from 'react';
import BaseIcon from './BaseIcon.js';

const IconStructure = function ({ size }) {
  return (
    <BaseIcon viewBox="0 0 16 16" size={size}>
      <polygon points="13,9 13,8 8,8 8,6 12,6 12,0 4,0 4,6 7,6 7,8 3,8 3,9 3,11 0,11 0,16 7,16 7,11 4,11 4,9 12,9 12,11 9,11 9,16   16,16 16,11 13,11 ">
      </polygon>
    </BaseIcon>
  );
}

export default IconStructure;

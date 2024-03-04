import React from 'react';

const BaseIcon = function ({ size, viewBox, children }) {
  let convertedSize = null;
  switch (size) {
    case 'xs': {
      convertedSize = '12px';
      break;
    }
    case 'sm': {
      convertedSize = '16px';
      break;
    }
    case 'lg': {
      convertedSize = '20px';
      break;
    }
    case 'xl': {
      convertedSize = '24px';
      break;
    }
    default: {
      convertedSize = '16px';
      break;
    }
  }
  if (viewBox) {
    return (
      <svg viewBox={viewBox} width={convertedSize} height={convertedSize} fill="currentColor">
        {children}
      </svg>
    );
  }
  else {
    return (
      <div style={{ width: convertedSize, height: convertedSize }}>
      </div>
    );
  }
}

export default BaseIcon;
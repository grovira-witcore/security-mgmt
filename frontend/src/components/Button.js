import React from 'react';

const Button = function ({ icon, label, color, outline, disabled, onClick }) {
  if (disabled) {
    return (
      <div className="px-3 py-1 d-flex border rounded border-gray text-gray">
        {icon &&
          <div className="pe-2">
            {React.createElement(icon, { size: 'xs' }, null)}
          </div>
        }
        <div className="pt-1">
          {label}
        </div>
      </div>
    );
  }
  else {
    return (
      <div className={'px-3 py-1 d-flex btn btn-' + (outline ? 'outline-' : '')  + color} onClick={onClick}>
        {icon &&
          <div className="pe-2">
            {React.createElement(icon, { size: 'xs' }, null)}
          </div>
        }
        <div className="pt-1">
          {label}
        </div>
      </div>
    );
  }
}

export default Button;
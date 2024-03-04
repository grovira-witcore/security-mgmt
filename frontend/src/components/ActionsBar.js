import React from 'react';
import Button from './Button.js';
import { getJoinedBreadcrumbs } from '../utils/helpers.js';

const ActionsBar = function ({ actions }) {
  const actionClick = function (e, action) {
    action.onClick(e);
  }

  return (
    <div className="d-flex">
      {actions.map((action, index) =>
        !action.hidden ? (
          <div key={'action-' + index} className="ps-2">
            <Button icon={action.icon} label={action.label} color={action.color} outline={true} onClick={(e) => actionClick(e, action)} />
          </div>
        ) : null
      )}
    </div>
  );
}

export default ActionsBar;
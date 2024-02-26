import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.ActionsBar = function ({ actions }) {
  const actionClick = function (e, action) {
    action.onClick(e);
  }

  return (
    <div className="d-flex">
      {actions.map((action, index) =>
        !action.hidden ? (
          <div key={'action-' + index} className="ps-2">
            <Witcore.Button icon={action.icon} label={action.label} color={action.color} outline={true} onClick={(e) => actionClick(e, action)} />
          </div>
        ) : null
      )}
    </div>
  );
}

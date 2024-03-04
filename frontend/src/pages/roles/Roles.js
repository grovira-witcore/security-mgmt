import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import RolesBody from './RolesBody.js';

const Roles = ReactRouterDOM.withRouter(function () {
  const { session, setError } = React.useContext(AppContext)


  return (
    <div className="p-1">
      <div className="p-1">
        <div className="border bg-light">
          <div className="p-2 fs-6">
            <RolesBody />
          </div>
        </div>
      </div>
    </div>
  );
})

export default Roles;

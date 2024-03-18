import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.js';
import UsersBody from './UsersBody.js';

const Users = ReactRouterDOM.withRouter(function () {
  const { setError } = useAppContext();


  return (
    <div className="p-1">
      <div className="p-1">
        <div className="border bg-light">
          <div className="p-2 fs-6">
            <UsersBody />
          </div>
        </div>
      </div>
    </div>
  );
})

export default Users;

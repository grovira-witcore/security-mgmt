import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import UsersPt0 from './UsersPt0.js';

const Users = ReactRouterDOM.withRouter(function ({  }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();


  return (
    <div className="p-1">
      <div className="p-1">
        <div className="border bg-light">
          <div className="p-2 fs-6">
            <UsersPt0 />
          </div>
        </div>
      </div>
    </div>
  );
})

export default Users;

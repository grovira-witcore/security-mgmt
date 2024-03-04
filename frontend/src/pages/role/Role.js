import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import RoleBody1 from './RoleBody1.js';
import RoleBody2 from './RoleBody2.js';
import { getRole } from '../../services/api.js';

const Role = ReactRouterDOM.withRouter(function ({ match }) {
  const { session, setError } = React.useContext(AppContext)

  const [role, setRole] = React.useState(null);

  React.useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = async function () {
    try {
      setRole(await getRole(match.params.roleId, session.accessToken));
    }
    catch (error) {
      setError(error);
      return;
    }
  }

  if (role === null || role === undefined) {
    return (
      <div>
      </div>
    );
  }

  return (
    <div className="p-1">
      <div className="p-1">
        <div className="border bg-light">
          <div className="p-2 fs-6">
            <RoleBody1 role={role} />
          </div>
        </div>
      </div>
      <div className="p-1">
        <div className="border bg-light">
          <div className="p-2 fs-6">
            <RoleBody2 role={role} />
          </div>
        </div>
      </div>
    </div>
  );
})

export default Role;

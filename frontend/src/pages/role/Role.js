import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.js';
import RoleBody1 from './RoleBody1.js';
import RoleBody2 from './RoleBody2.js';
import ApiService from '../../services/ApiService.js';

const Role = ReactRouterDOM.withRouter(function ({ match }) {
  const { setError } = useAppContext();

  const [role, setRole] = React.useState(null);

  React.useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = async function () {
    try {
      setRole(await ApiService.getRole(match.params.roleId));
    }
    catch (error) {
      setError(error);
      return;
    }
  }

  if (role === null || role === undefined) {
    return (
      <div />
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

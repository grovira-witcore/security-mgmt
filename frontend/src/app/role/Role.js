import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import RolePt0 from './RolePt0.js';
import RolePt1 from './RolePt1.js';

const Role = ReactRouterDOM.withRouter(function ({ match }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const [role, setRole] = React.useState(null);

  React.useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = async function () {
    const response = await fetch(`/api/role/${match.params.roleId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`
      }
    });
    if (!response.ok) {
      setError(response);
      return;
    }
    setRole(await response.json());
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
            <RolePt0 role={role} />
          </div>
        </div>
      </div>
      <div className="p-1">
        <div className="border bg-light">
          <div className="p-2 fs-6">
            <RolePt1 role={role} />
          </div>
        </div>
      </div>
    </div>
  );
})

export default Role;

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import DepartmentPt0 from './DepartmentPt0.js';

const Department = ReactRouterDOM.withRouter(function ({ match }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const [department, setDepartment] = React.useState(null);

  React.useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async function () {
    const response = await fetch(`/api/department/${match.params.departmentId}`, {
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
    setDepartment(await response.json());
  }

  if (department === null || department === undefined) {
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
            <DepartmentPt0 department={department} />
          </div>
        </div>
      </div>
    </div>
  );
})

export default Department;

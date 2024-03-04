import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import DepartmentBody from './DepartmentBody.js';
import { getDepartment } from '../../services/api.js';

const Department = ReactRouterDOM.withRouter(function ({ match }) {
  const { session, setError } = React.useContext(AppContext)

  const [department, setDepartment] = React.useState(null);

  React.useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async function () {
    try {
      setDepartment(await getDepartment(match.params.departmentId, session.accessToken));
    }
    catch (error) {
      setError(error);
      return;
    }
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
            <DepartmentBody department={department} />
          </div>
        </div>
      </div>
    </div>
  );
})

export default Department;

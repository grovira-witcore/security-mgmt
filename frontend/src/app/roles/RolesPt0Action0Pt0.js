import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';

const RolesPt0Action0Pt0 = ReactRouterDOM.withRouter(function ({ data, updateData, validated }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const [dataSourceDepartmentId, setDataSourceDepartmentId] = React.useState([]);

  React.useEffect(() => {
    fetchDataSourceDepartmentId();
  }, []);

  const fetchDataSourceDepartmentId = async function () {
    const response = await fetch(`/api/departments`, {
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
    const records = await response.json();
    setDataSourceDepartmentId(
      records.map((record) => [record.departmentId, record.name])
    );
  }
  
  return (
    <div>
      <div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <Witcore.TextBox
              label={lang.name}
              value={data.name}
              onChange={(value) => updateData('name', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-12 col-md-12 col-sm-12 col-12">
            <Witcore.TextArea
              label={lang.description}
              value={data.description}
              onChange={(value) => updateData('description', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <Witcore.ComboBox
              label={lang.department}
              value={data.departmentId}
              onChange={(value) => updateData('departmentId', value)}
              validated={validated}
              dataSource={dataSourceDepartmentId}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
})

export default RolesPt0Action0Pt0;

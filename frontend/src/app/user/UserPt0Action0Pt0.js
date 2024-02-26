import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';

const UserPt0Action0Pt0 = ReactRouterDOM.withRouter(function ({ user, data, updateData, validated }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const [dataSourceRoleId, setDataSourceRoleId] = React.useState([]);

  React.useEffect(() => {
    fetchDataSourceRoleId();
  }, []);

  const fetchDataSourceRoleId = async function () {
    const response = await fetch(`/api/roles`, {
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
    setDataSourceRoleId(
      records.map((record) => [record.roleId, record.name])
    );
  }
  
  return (
    <div>
      <div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <Witcore.ComboBox
              label={lang.role}
              value={data.roleId}
              onChange={(value) => updateData('roleId', value)}
              validated={validated}
              dataSource={dataSourceRoleId}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
})

export default UserPt0Action0Pt0;

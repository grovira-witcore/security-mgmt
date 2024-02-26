import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';

const RolePt0Action0Pt0 = ReactRouterDOM.withRouter(function ({ role, data, updateData, validated }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const [dataSourceObjectId, setDataSourceObjectId] = React.useState([]);

  React.useEffect(() => {
    fetchDataSourceObjectId();
  }, []);

  const fetchDataSourceObjectId = async function () {
    const response = await fetch(`/api/objects`, {
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
    setDataSourceObjectId(
      records.map((record) => [record.objectId, record.name])
    );
  }
  
  return (
    <div>
      <div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <Witcore.ComboBox
              label={lang.object}
              value={data.objectId}
              onChange={(value) => updateData('objectId', value)}
              validated={validated}
              dataSource={dataSourceObjectId}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <Witcore.ComboBox
              label={lang.accessLevel}
              value={data.accessLevel}
              onChange={(value) => updateData('accessLevel', value)}
              validated={validated}
              dataSource={[['read', lang.read], ['write', lang.write], ['full', lang.full]]}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
})

export default RolePt0Action0Pt0;

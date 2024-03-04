import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import ComboBox from '../../components/ComboBox.js';
import { getObjects } from '../../services/api.js';

const RoleBody1Action1 = ReactRouterDOM.withRouter(function ({ role, data, updateData, validated }) {
  const { getLang, session, setError } = React.useContext(AppContext)
  const lang = getLang();

  const [dataSourceObjectId, setDataSourceObjectId] = React.useState([]);

  React.useEffect(() => {
    fetchDataSourceObjectId();
  }, []);

  const fetchDataSourceObjectId = async function () {
    let records = null;
    try {
      records = await getObjects(null, session.accessToken);
    }
    catch (error) {
      setError(error);
      return;
    }
    setDataSourceObjectId(
      records.map((record) => [record.objectId, record.name])
    );
  }
  
  return (
    <div>
      <div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <ComboBox
              label={lang.object}
              value={data.objectId}
              onChange={(value) => updateData('objectId', value)}
              validated={validated}
              dataSource={dataSourceObjectId}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <ComboBox
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

export default RoleBody1Action1;

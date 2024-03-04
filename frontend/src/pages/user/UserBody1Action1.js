import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import ComboBox from '../../components/ComboBox.js';
import { getRoles } from '../../services/api.js';

const UserBody1Action1 = ReactRouterDOM.withRouter(function ({ user, data, updateData, validated }) {
  const { getLang, session, setError } = React.useContext(AppContext)
  const lang = getLang();

  const [dataSourceRoleId, setDataSourceRoleId] = React.useState([]);

  React.useEffect(() => {
    fetchDataSourceRoleId();
  }, []);

  const fetchDataSourceRoleId = async function () {
    let records = null;
    try {
      records = await getRoles(null, session.accessToken);
    }
    catch (error) {
      setError(error);
      return;
    }
    setDataSourceRoleId(
      records.map((record) => [record.roleId, record.name])
    );
  }
  
  return (
    <div>
      <div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <ComboBox
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

export default UserBody1Action1;

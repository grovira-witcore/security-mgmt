import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import TextBox from '../../components/TextBox.js';
import TextArea from '../../components/TextArea.js';
import ComboBox from '../../components/ComboBox.js';
import { getDepartments } from '../../services/api.js';

const RolesBodyAction1 = ReactRouterDOM.withRouter(function ({ data, updateData, validated }) {
  const { getLang, session, setError } = React.useContext(AppContext)
  const lang = getLang();

  const [dataSourceDepartmentId, setDataSourceDepartmentId] = React.useState([]);

  React.useEffect(() => {
    fetchDataSourceDepartmentId();
  }, []);

  const fetchDataSourceDepartmentId = async function () {
    let records = null;
    try {
      records = await getDepartments(null, session.accessToken);
    }
    catch (error) {
      setError(error);
      return;
    }
    setDataSourceDepartmentId(
      records.map((record) => [record.departmentId, record.name])
    );
  }
  
  return (
    <div>
      <div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <TextBox
              label={lang.name}
              value={data.name}
              onChange={(value) => updateData('name', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-12 col-md-12 col-sm-12 col-12">
            <TextArea
              label={lang.description}
              value={data.description}
              onChange={(value) => updateData('description', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <ComboBox
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

export default RolesBodyAction1;

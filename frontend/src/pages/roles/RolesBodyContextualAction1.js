import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.js';
import TextBox from '../../components/TextBox.js';
import TextArea from '../../components/TextArea.js';
import ComboBox from '../../components/ComboBox.js';
import ApiService from '../../services/ApiService.js';
import { getWords } from '../../utils/get-words.js';

const RolesBodyContextualAction1 = ReactRouterDOM.withRouter(function ({ role, data, updateData, validated }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);

  const [dataSourceDepartmentId, setDataSourceDepartmentId] = React.useState([]);

  React.useEffect(() => {
    fetchDataSourceDepartmentId();
  }, []);

  const fetchDataSourceDepartmentId = async function () {
    let records = null;
    try {
      records = await ApiService.getDepartments(null);
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
              label={words.name}
              value={data.name}
              onChange={(value) => updateData('name', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-12 col-md-12 col-sm-12 col-12">
            <TextArea
              label={words.description}
              value={data.description}
              onChange={(value) => updateData('description', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <ComboBox
              label={words.department}
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

export default RolesBodyContextualAction1;

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.js';
import ComboBox from '../../components/ComboBox.js';
import ApiService from '../../services/ApiService.js';
import { getWords } from '../../utils/get-words.js';

const RoleBody1Action1 = ReactRouterDOM.withRouter(function ({ role, data, updateData, validated }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);

  const [dataSourceObjectId, setDataSourceObjectId] = React.useState([]);

  React.useEffect(() => {
    fetchDataSourceObjectId();
  }, []);

  const fetchDataSourceObjectId = async function () {
    let records = null;
    try {
      records = await ApiService.getObjects(null);
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
              label={words.object}
              value={data.objectId}
              onChange={(value) => updateData('objectId', value)}
              validated={validated}
              dataSource={dataSourceObjectId}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <ComboBox
              label={words.accessLevel}
              value={data.accessLevel}
              onChange={(value) => updateData('accessLevel', value)}
              validated={validated}
              dataSource={[['read', words.read], ['write', words.write], ['full', words.full]]}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
})

export default RoleBody1Action1;

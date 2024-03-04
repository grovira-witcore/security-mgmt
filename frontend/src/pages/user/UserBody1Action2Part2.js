import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import Grid from '../../components/Grid.js';
import IconDummy from '../../components/icons/IconDummy.js';
import { getUserAccesses } from '../../services/api.js';

const UserBody1Action2Part2 = ReactRouterDOM.withRouter(function ({ user }) {
  const { getLang, session, setError } = React.useContext(AppContext)
  const lang = getLang();

  const [items, setItems] = React.useState([]);

  const history = ReactRouterDOM.useHistory();

  React.useEffect(() => {
  }, []);

  React.useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async function () {
    let records = null;
    try {
      records = await getUserAccesses(user.userId, session.accessToken);
    }
    catch (error) {
      setError(error);
      return;
    }
    setItems(records.map((record, index) => ({
      key: 'key' + index,
      data: [
        record.objectName,
        record.objectDescription,
        record.accessLevel,
      ],
      record: record
    })));
  }

  const refreshMe = async function () {
    await loadRecords();
  }

  return (
    <div>
      <div>
        <Grid
          containerSize={4}
          contextualActions={[
          ]}
          fields={[
            { icon: IconDummy, label: lang.object, type: 'string' },
            { type: 'string', docked: true },
            { icon: IconDummy, label: lang.accessLevel, type: 'string', translate: true, variant: 'FramedText', color: function (value) { return value === 'read' ? 'green' : (value === 'write' ? 'red' : (value === 'full' ? 'purple' : 'black')); } },
          ]}
          items={items}
        />
      </div>
    </div>
  );
})

export default UserBody1Action2Part2;

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import IconDummy from '../icons/IconDummy.js';

const UserPt0Action1Pt1 = ReactRouterDOM.withRouter(function ({ user }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const [items, setItems] = React.useState([]);

  const history = ReactRouterDOM.useHistory();

  React.useEffect(() => {
  }, []);

  React.useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async function () {
    const response = await fetch(`/api/user/${user.userId}/accesses`, {
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
        <Witcore.Grid
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

export default UserPt0Action1Pt1;

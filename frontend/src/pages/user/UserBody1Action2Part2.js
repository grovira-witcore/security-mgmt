import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.js';
import Grid from '../../components/Grid.js';
import ApiService from '../../services/ApiService.js';
import { getWords } from '../../utils/get-words.js';

const UserBody1Action2Part2 = ReactRouterDOM.withRouter(function ({ user }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
  }, []);

  React.useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async function () {
    let records = null;
    try {
      records = await ApiService.getUserAccesses(user.userId);
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
            { label: words.object, type: 'string' },
            { type: 'string', docked: true },
            { label: words.accessLevel, type: 'string', translate: true, variant: 'FramedText', color: function (value) { return value === 'read' ? 'green' : (value === 'write' ? 'red' : (value === 'full' ? 'purple' : 'black')); } },
          ]}
          items={items}
        />
      </div>
    </div>
  );
})

export default UserBody1Action2Part2;

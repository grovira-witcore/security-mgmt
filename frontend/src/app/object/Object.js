import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import ObjectPt0 from './ObjectPt0.js';

const Object = ReactRouterDOM.withRouter(function ({ match }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const [object, setObject] = React.useState(null);

  React.useEffect(() => {
    fetchObject();
  }, []);

  const fetchObject = async function () {
    const response = await fetch(`/api/object/${match.params.objectId}`, {
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
    setObject(await response.json());
  }

  if (object === null || object === undefined) {
    return (
      <div>
      </div>
    );
  }

  return (
    <div className="p-1">
      <div className="p-1">
        <div className="border bg-light">
          <div className="p-2 fs-6">
            <ObjectPt0 object={object} />
          </div>
        </div>
      </div>
    </div>
  );
})

export default Object;

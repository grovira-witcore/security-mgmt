import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import ObjectBody from './ObjectBody.js';
import { getObject } from '../../services/api.js';

const Object = ReactRouterDOM.withRouter(function ({ match }) {
  const { session, setError } = React.useContext(AppContext)

  const [object, setObject] = React.useState(null);

  React.useEffect(() => {
    fetchObject();
  }, []);

  const fetchObject = async function () {
    try {
      setObject(await getObject(match.params.objectId, session.accessToken));
    }
    catch (error) {
      setError(error);
      return;
    }
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
            <ObjectBody object={object} />
          </div>
        </div>
      </div>
    </div>
  );
})

export default Object;

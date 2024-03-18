import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.js';
import ObjectBody from './ObjectBody.js';
import ApiService from '../../services/ApiService.js';

const Object = ReactRouterDOM.withRouter(function ({ match }) {
  const { setError } = useAppContext();

  const [object, setObject] = React.useState(null);

  React.useEffect(() => {
    fetchObject();
  }, []);

  const fetchObject = async function () {
    try {
      setObject(await ApiService.getObject(match.params.objectId));
    }
    catch (error) {
      setError(error);
      return;
    }
  }

  if (object === null || object === undefined) {
    return (
      <div />
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

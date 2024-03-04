import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import UserBody1 from './UserBody1.js';
import UserBody2 from './UserBody2.js';
import { getUser } from '../../services/api.js';

const User = ReactRouterDOM.withRouter(function ({ match }) {
  const { session, setError } = React.useContext(AppContext)

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async function () {
    try {
      setUser(await getUser(match.params.userId, session.accessToken));
    }
    catch (error) {
      setError(error);
      return;
    }
  }

  if (user === null || user === undefined) {
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
            <UserBody1 user={user} />
          </div>
        </div>
      </div>
      <div className="p-1">
        <div className="border bg-light">
          <div className="p-2 fs-6">
            <UserBody2 user={user} />
          </div>
        </div>
      </div>
    </div>
  );
})

export default User;

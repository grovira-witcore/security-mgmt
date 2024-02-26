import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import UserPt0 from './UserPt0.js';
import UserPt1 from './UserPt1.js';

const User = ReactRouterDOM.withRouter(function ({ match }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async function () {
    const response = await fetch(`/api/user/${match.params.userId}`, {
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
    setUser(await response.json());
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
            <UserPt0 user={user} />
          </div>
        </div>
      </div>
      <div className="p-1">
        <div className="border bg-light">
          <div className="p-2 fs-6">
            <UserPt1 user={user} />
          </div>
        </div>
      </div>
    </div>
  );
})

export default User;

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import IconRole from '../icons/IconRole.js';
import UserPt1Pt0 from './UserPt1Pt0.js';

const UserPt1 = ReactRouterDOM.withRouter(function ({ user }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  return (
    <div>
      <Witcore.Tabs
        tabs={[
          { icon: IconRole, label: lang.roles, component: UserPt1Pt0, arguments: { user: user } },
        ]}
      />
    </div>
  );
})

export default UserPt1;

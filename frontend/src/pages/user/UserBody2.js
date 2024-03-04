import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import Tabs from '../../components/Tabs.js';
import IconRole from '../../components/icons/IconRole.js';
import UserBody2Tab1 from './UserBody2Tab1.js';

const UserBody2 = ReactRouterDOM.withRouter(function ({ user }) {
  const { getLang, session, setError } = React.useContext(AppContext)
  const lang = getLang();

  return (
    <div>
      <Tabs
        tabs={[
          { icon: IconRole, label: lang.roles, component: UserBody2Tab1, arguments: { user: user } },
        ]}
      />
    </div>
  );
})

export default UserBody2;

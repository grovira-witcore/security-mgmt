import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import Tabs from '../../components/Tabs.js';
import IconAccess from '../../components/icons/IconAccess.js';
import RoleBody2Tab1 from './RoleBody2Tab1.js';

const RoleBody2 = ReactRouterDOM.withRouter(function ({ role }) {
  const { getLang, session, setError } = React.useContext(AppContext)
  const lang = getLang();

  return (
    <div>
      <Tabs
        tabs={[
          { icon: IconAccess, label: lang.accesses, component: RoleBody2Tab1, arguments: { role: role } },
        ]}
      />
    </div>
  );
})

export default RoleBody2;

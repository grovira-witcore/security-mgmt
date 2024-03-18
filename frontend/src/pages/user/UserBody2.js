import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.js';
import Tabs from '../../components/Tabs.js';
import IconRole from '../../components/icons/IconRole.js';
import UserBody2Tab1 from './UserBody2Tab1.js';
import { getWords } from '../../utils/get-words.js';

const UserBody2 = ReactRouterDOM.withRouter(function ({ user }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);

  return (
    <div>
      <Tabs
        tabs={[
          { icon: IconRole, label: words.roles, component: UserBody2Tab1, arguments: { user: user } },
        ]}
      />
    </div>
  );
})

export default UserBody2;

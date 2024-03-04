import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import Paragraph from '../../components/Paragraph.js';
import { protect } from '../../utils/helpers.js';

const UserBody1Action2Part1 = ReactRouterDOM.withRouter(function ({ user }) {
  const { getLang, session, setError } = React.useContext(AppContext)
  const lang = getLang();

  const history = ReactRouterDOM.useHistory();

  const refreshMe = async function () {
    window.location.reload();
  }


  return (
    <div>
      <div>
        <div className="py-4 px-2 fs-5">
          <Paragraph
            template={lang.allAccessList}
            fields={[
              { type: 'string', style: function (value) { return 'fw-bold'; } },
            ]}
            data={[
              protect(function ([firstName, lastName]) { return `${firstName} ${lastName}` }, [ user.firstName, user.lastName ]),
            ]}
          />
        </div>
      </div>
    </div>
  );
})

export default UserBody1Action2Part1;

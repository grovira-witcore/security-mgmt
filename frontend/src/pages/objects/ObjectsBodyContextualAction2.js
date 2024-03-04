import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppContext from '../../context/AppContext.js';
import Paragraph from '../../components/Paragraph.js';

const ObjectsBodyContextualAction2 = ReactRouterDOM.withRouter(function ({ object }) {
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
            template={lang.confirmDeleteObject}
            alignment="justify-content-center"
            fields={[
              { type: 'string', style: function (value) { return 'fw-bold'; } },
            ]}
            data={[
              object.name,
            ]}
          />
        </div>
      </div>
    </div>
  );
})

export default ObjectsBodyContextualAction2;

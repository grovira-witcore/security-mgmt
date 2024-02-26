import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import IconRole from '../icons/IconRole.js';
import IconAdd from '../icons/IconAdd.js';
import RolePt0Action0Pt0 from './RolePt0Action0Pt0.js';

const RolePt0 = ReactRouterDOM.withRouter(function ({ role }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const [action, setAction] = React.useState(null);
  const [actionData, setActionData] = React.useState(null);
  const [actionValidated, setActionValidated] = React.useState(null);
  const bodyRefAction0 = React.useRef(null);

  const history = ReactRouterDOM.useHistory();

  const refreshMe = async function () {
    window.location.reload();
  }

  const getFieldColor = function (color, value) {
    if (color) {
      const solvedColor = Witcore.Utils.protect(color, value);
      if (solvedColor) {
        return 'text-' + solvedColor;
      }
    }
    return '';
  }

  const handleAction0 = async function (e) {
    if (e.ctrlKey) {
      return;
    }
    setAction({ index: 0 });
    const data = {};
    setActionData(data);
    setActionValidated(false);
  }
  const submitAction0 = async function (e, roleId) {
    if (e.ctrlKey) {
      return;
    }
    if (Witcore.Utils.isValid(bodyRefAction0.current)) {
      const response = await fetch(`/api/role/${roleId}/object`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(actionData)
      });
      if (!response.ok) {
        setError(response);
        return;
      }
      setAction(null);
      setActionData(null);
      setActionValidated(null);
      refreshMe();
    }
    else {
      setActionValidated(true);
    }
  }
  const updateActionData = function (field, value) {
    setActionData({ ...actionData, [field]: value });
  }
  const cancelAction = async function (e) {
    if (e.ctrlKey) {
      return;
    }
    setAction(null);
    setActionData(null);
    setActionValidated(null);
  }
  

  return (
    <div>
      <div>
        <div className="d-flex align-items-center pb-1 border-bottom">
          <div>
            <Witcore.Title
              level={1}
              icon={IconRole}
              color="purple"
              label={<Witcore.Field
                value={role.name}
                type="string"
              />}
              secondaryLabel={<Witcore.Field
                value={role.description}
                type="string"
              />}
            />
          </div>
          <div className="flex-grow-1" />
          <Witcore.ActionsBar
            actions={[
              { icon: IconAdd, label: lang.addAccess, color: 'blue', onClick: handleAction0 },
            ]}
          />
        </div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {lang.department}
            </div>
            <div className="align-middle">
              <Witcore.Field
                value={role.departmentName}
                type="string"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {lang.createdAt}
            </div>
            <div className="align-middle">
              <Witcore.Field
                value={role.createdAt}
                type="datetime"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {lang.updatedAt}
            </div>
            <div className="align-middle">
              <Witcore.Field
                value={role.updatedAt}
                type="datetime"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {lang.hash}
            </div>
            <div className="align-middle">
              <Witcore.Field
                value={role.hash}
                type="string"
              />
            </div>
          </div>
        </div>
      </div>
      {action && action.index === 0 ?
        <ReactBootstrap.Modal
          show={true}
          onHide={() => cancelAction({})}
          scrollable={true}
          centered={true}
         
        >
          <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
            <Witcore.Title level={1} icon={IconAdd} color="blue" label={lang.addAccess} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefAction0} className="p-0">
            <div className="p-2">
              {actionData && <RolePt0Action0Pt0 role={role} data={actionData} updateData={updateActionData} validated={actionValidated} />}
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Witcore.Button label={lang.ok} color="blue" onClick={(e) => submitAction0(e, role.roleId)} />
            </div>
            <div>
              <Witcore.Button label={lang.cancel} color="blue" onClick={(e) => cancelAction(e)} />
            </div>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal> :
        null
      }
    </div>
  );
})

export default RolePt0;

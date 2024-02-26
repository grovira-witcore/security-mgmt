import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import IconUser from '../icons/IconUser.js';
import IconAdd from '../icons/IconAdd.js';
import IconAccess from '../icons/IconAccess.js';
import UserPt0Action0Pt0 from './UserPt0Action0Pt0.js';
import UserPt0Action1Pt0 from './UserPt0Action1Pt0.js';
import UserPt0Action1Pt1 from './UserPt0Action1Pt1.js';

const UserPt0 = ReactRouterDOM.withRouter(function ({ user }) {
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
  const submitAction0 = async function (e, userId) {
    if (e.ctrlKey) {
      return;
    }
    if (Witcore.Utils.isValid(bodyRefAction0.current)) {
      const response = await fetch(`/api/user/${userId}/role`, {
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
  const handleAction1 = async function (e) {
    if (e.ctrlKey) {
      return;
    }
    setAction({ index: 1 });
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
              icon={IconUser}
              color="yellow"
              label={<Witcore.Field
                value={Witcore.Utils.protect(function ([firstName, lastName]) { return `${firstName} ${lastName}` }, [ user.firstName, user.lastName ])}
                type="string"
              />}
              secondaryLabel={<Witcore.Field
                value={user.email}
                type="string"
              />}
            />
          </div>
          <div className="flex-grow-1" />
          <Witcore.ActionsBar
            actions={[
              { icon: IconAdd, label: lang.addRole, color: 'blue', onClick: handleAction0 },
              { icon: IconAccess, label: lang.queryAllAccesses, color: 'blue', onClick: handleAction1 },
            ]}
          />
        </div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {lang.phone}
            </div>
            <div className="align-middle">
              <Witcore.Field
                value={user.phone}
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
                value={user.createdAt}
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
                value={user.updatedAt}
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
                value={user.hash}
                type="string"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {lang.enabled}
            </div>
            <div className="align-middle">
              <Witcore.Field
                value={user.enabled}
                type="boolean"
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
            <Witcore.Title level={1} icon={IconAdd} color="blue" label={lang.addRole} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefAction0} className="p-0">
            <div className="p-2">
              {actionData && <UserPt0Action0Pt0 user={user} data={actionData} updateData={updateActionData} validated={actionValidated} />}
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Witcore.Button label={lang.ok} color="blue" onClick={(e) => submitAction0(e, user.userId)} />
            </div>
            <div>
              <Witcore.Button label={lang.cancel} color="blue" onClick={(e) => cancelAction(e)} />
            </div>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal> :
        null
      }
      {action && action.index === 1 ?
        <ReactBootstrap.Modal
          show={true}
          onHide={() => cancelAction({})}
          scrollable={true}
          centered={true}
         
        >
          <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
            <Witcore.Title level={1} icon={IconAccess} color="sky-blue" label={lang.userAccesses} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body className="p-0">
            <div className="p-2 border-bottom">
              <UserPt0Action1Pt0 user={user} />
            </div>
            <div className="p-2">
              <UserPt0Action1Pt1 user={user} />
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Witcore.Button label={lang.close} color="blue" onClick={(e) => cancelAction(e)} />
            </div>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal> :
        null
      }
    </div>
  );
})

export default UserPt0;

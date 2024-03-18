import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap';
import { useAppContext } from '../../context/AppContext.js';
import Field from '../../components/Field.js';
import Title from '../../components/Title.js';
import ActionsBar from '../../components/ActionsBar.js';
import Button from '../../components/Button.js';
import IconUser from '../../components/icons/IconUser.js';
import IconAdd from '../../components/icons/IconAdd.js';
import IconAccess from '../../components/icons/IconAccess.js';
import UserBody1Action1 from './UserBody1Action1.js';
import UserBody1Action2Part1 from './UserBody1Action2Part1.js';
import UserBody1Action2Part2 from './UserBody1Action2Part2.js';
import ApiService from '../../services/ApiService.js';
import { protect } from '../../utils/protect.js';
import { getWords } from '../../utils/get-words.js';
import { isValid } from '../../utils/is-valid.js';

const UserBody1 = ReactRouterDOM.withRouter(function ({ user }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);

  const [action, setAction] = React.useState(null);
  const [actionData, setActionData] = React.useState(null);
  const [actionValidated, setActionValidated] = React.useState(null);
  const bodyRefAction0 = React.useRef(null);

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
    if (isValid(bodyRefAction0.current)) {
      try {
        await ApiService.postUserRole(userId, actionData);
      }
      catch (error) {
        setError(error);
        return;
      }
      setAction(null);
      setActionData(null);
      setActionValidated(null);
      window.location.reload();
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
            <Title
              level={1}
              icon={IconUser}
              color="yellow"
              label={<Field
                value={protect(function ([firstName, lastName]) { return `${firstName} ${lastName}` }, [ user.firstName, user.lastName ])}
                type="string"
              />}
              secondaryLabel={<Field
                value={user.email}
                type="string"
              />}
            />
          </div>
          <div className="flex-grow-1" />
          <ActionsBar
            actions={[
              { icon: IconAdd, label: words.addRole, color: 'blue', onClick: handleAction0 },
              { icon: IconAccess, label: words.queryAllAccesses, color: 'blue', onClick: handleAction1 },
            ]}
          />
        </div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {words.phone}
            </div>
            <div className="align-middle">
              <Field
                value={user.phone}
                type="string"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {words.createdAt}
            </div>
            <div className="align-middle">
              <Field
                value={user.createdAt}
                type="datetime"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {words.updatedAt}
            </div>
            <div className="align-middle">
              <Field
                value={user.updatedAt}
                type="datetime"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {words.hash}
            </div>
            <div className="align-middle">
              <Field
                value={user.hash}
                type="string"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {words.enabled}
            </div>
            <div className="align-middle">
              <Field
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
            <Title level={1} icon={IconAdd} color="blue" label={words.addRole} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefAction0} className="p-0">
            <div className="p-2">
              {actionData && <UserBody1Action1 user={user} data={actionData} updateData={updateActionData} validated={actionValidated} />}
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Button label={words.ok} color="blue" onClick={(e) => submitAction0(e, user.userId)} />
            </div>
            <div>
              <Button label={words.cancel} color="blue" onClick={(e) => cancelAction(e)} />
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
            <Title level={1} icon={IconAccess} color="sky-blue" label={words.userAccesses} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body className="p-0">
            <div className="p-2 border-bottom">
              <UserBody1Action2Part1 user={user} />
            </div>
            <div className="p-2">
              <UserBody1Action2Part2 user={user} />
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Button label={words.close} color="blue" onClick={(e) => cancelAction(e)} />
            </div>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal> :
        null
      }
    </div>
  );
})

export default UserBody1;

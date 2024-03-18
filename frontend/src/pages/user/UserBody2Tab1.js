import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap';
import { useAppContext } from '../../context/AppContext.js';
import Grid from '../../components/Grid.js';
import PagingBar from '../../components/PagingBar.js';
import Title from '../../components/Title.js';
import Button from '../../components/Button.js';
import IconDelete from '../../components/icons/IconDelete.js';
import UserBody2Tab1ContextualAction1 from './UserBody2Tab1ContextualAction1.js';
import ApiService from '../../services/ApiService.js';
import { getWords } from '../../utils/get-words.js';
import { isValid } from '../../utils/is-valid.js';

const UserBody2Tab1 = ReactRouterDOM.withRouter(function ({ user }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);

  const [count, setCount] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const pageSize = 10;
  const [items, setItems] = React.useState([]);
  const [contextualAction, setContextualAction] = React.useState(null);
  const [contextualActionData, setContextualActionData] = React.useState(null);
  const [contextualActionValidated, setContextualActionValidated] = React.useState(null);
  const bodyRefContextualAction0 = React.useRef(null);

  const history = ReactRouterDOM.useHistory();

  React.useEffect(() => {
  }, []);

  React.useEffect(() => {
    setPageNumber(1);
    loadCount();
  }, [user]);

  const loadCount = async function () {
    try {
      const args = {};
      if (user.userId !== null && user.userId !== undefined) {
        args.userUserId = user.userId;
      }
      setCount(await ApiService.getCountUserRoles(args));
    }
    catch (error) {
      setError(error);
      return;
    }
  }

  React.useEffect(() => {
    loadRecords();
  }, [pageNumber, user]);

  const loadRecords = async function () {
    let records = null;
    try {
      const args = {};
      if (user.userId !== null && user.userId !== undefined) {
        args.userUserId = user.userId;
      }
      args.offset = (pageNumber - 1) * pageSize;
      args.limit = pageSize;
      records = await ApiService.getUserRoles(args);
    }
    catch (error) {
      setError(error);
      return;
    }
    setItems(records.map((record, index) => ({
      key: record.userRoleId,
      data: [
        record.roleName,
        record.roleDescription,
        record.createdAt,
        record.updatedAt,
        record.hash,
      ],
      record: record
    })));
  }

  const refreshMe = async function () {
    await loadCount();
    await loadRecords();
  }

  const handleClickItem = async function (e, item) {
    if (e.ctrlKey) {
      return;
    }
    history.push('/role/' + item.record.roleId);
  }

  const handleContextualAction0 = async function (e, item) {
    if (e.ctrlKey) {
      return;
    }
    let userRole = null;
    try {
      userRole = await ApiService.getUserRole(item.record.userRoleId);
    }
    catch (error) {
      setError(error);
      return;
    }
    setContextualAction({ index: 0, userRole: userRole });
    const data = {};
    setContextualActionData(data);
    setContextualActionValidated(false);
  }
  const submitContextualAction0 = async function (e, userRoleId) {
    if (e.ctrlKey) {
      return;
    }
    if (isValid(bodyRefContextualAction0.current)) {
      try {
        await ApiService.deleteUserRole(userRoleId);
      }
      catch (error) {
        setError(error);
        return;
      }
      setContextualAction(null);
      setContextualActionData(null);
      setContextualActionValidated(null);
      refreshMe();
    }
    else {
      setContextualActionValidated(true);
    }
  }
  const updateContextualActionData = function (field, value) {
    setContextualActionData({ ...contextualActionData, [field]: value });
  }
  const cancelContextualAction = async function (e) {
    if (e.ctrlKey) {
      return;
    }
    setContextualAction(null);
    setContextualActionData(null);
    setContextualActionValidated(null);
  }
  
  return (
    <div>
      <div>
        <Grid
          containerSize={12}
          contextualActions={[
            { icon: IconDelete, label: words.delete, color: 'red', onClick: handleContextualAction0 },
          ]}
          fields={[
            { label: words.role, type: 'string' },
            { type: 'string', docked: true },
            { label: words.createdAt, type: 'datetime' },
            { label: words.updatedAt, type: 'datetime' },
            { label: words.hash, type: 'string' },
          ]}
          onClickItem={handleClickItem}
          items={items}
        />
        {count !== null && count !== undefined ?
          <PagingBar
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            countOfItems={count}
            countOfPages={Math.ceil(count/pageSize)}
          /> :
          null
        }
      </div>
      {contextualAction && contextualAction.index === 0 ?
        <ReactBootstrap.Modal
          show={true}
          onHide={() => cancelContextualAction({})}
          scrollable={true}
          centered={true}
         
        >
          <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
            <Title level={1} icon={IconDelete} color="red" label={words.deleteRole} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefContextualAction0} className="p-0">
            <div className="p-2">
              <UserBody2Tab1ContextualAction1 userRole={contextualAction ? contextualAction.userRole : null} />
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Button label={words.delete} color="red" onClick={(e) => submitContextualAction0(e, contextualAction ? contextualAction.userRole.userRoleId : null)} />
            </div>
            <div>
              <Button label={words.cancel} color="blue" onClick={(e) => cancelContextualAction(e)} />
            </div>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal> :
        null
      }
    </div>
  );
})

export default UserBody2Tab1;

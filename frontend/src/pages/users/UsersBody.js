import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap';
import { useAppContext } from '../../context/AppContext.js';
import Grid from '../../components/Grid.js';
import Title from '../../components/Title.js';
import FiltersBar from '../../components/FiltersBar.js';
import ActionsBar from '../../components/ActionsBar.js';
import PagingBar from '../../components/PagingBar.js';
import Button from '../../components/Button.js';
import IconUser from '../../components/icons/IconUser.js';
import IconAdd from '../../components/icons/IconAdd.js';
import IconEdit from '../../components/icons/IconEdit.js';
import IconDelete from '../../components/icons/IconDelete.js';
import UsersBodyAction1 from './UsersBodyAction1.js';
import UsersBodyContextualAction1 from './UsersBodyContextualAction1.js';
import UsersBodyContextualAction2 from './UsersBodyContextualAction2.js';
import ApiService from '../../services/ApiService.js';
import { getWords } from '../../utils/get-words.js';
import { protect } from '../../utils/protect.js';
import { isValid } from '../../utils/is-valid.js';

const UsersBody = ReactRouterDOM.withRouter(function ({  }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);

  const [count, setCount] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const pageSize = 10;
  const [filtersValues, setFiltersValues] = React.useState([null, null]);
  const [items, setItems] = React.useState([]);
  const [action, setAction] = React.useState(null);
  const [actionData, setActionData] = React.useState(null);
  const [actionValidated, setActionValidated] = React.useState(null);
  const bodyRefAction0 = React.useRef(null);
  const [contextualAction, setContextualAction] = React.useState(null);
  const [contextualActionData, setContextualActionData] = React.useState(null);
  const [contextualActionValidated, setContextualActionValidated] = React.useState(null);
  const bodyRefContextualAction0 = React.useRef(null);
  const bodyRefContextualAction1 = React.useRef(null);

  const history = ReactRouterDOM.useHistory();

  React.useEffect(() => {
  }, []);

  React.useEffect(() => {
    setPageNumber(1);
    loadCount();
  }, [filtersValues]);

  const loadCount = async function () {
    try {
      setCount(await ApiService.getCountUsers(null));
    }
    catch (error) {
      setError(error);
      return;
    }
  }

  React.useEffect(() => {
    loadRecords();
  }, [pageNumber, filtersValues]);

  const loadRecords = async function () {
    let records = null;
    try {
      const args = {};
      if (filtersValues[0] !== null && filtersValues[0] !== undefined) {
        args.email = '%' + filtersValues[0] + '%';
      }
      if (filtersValues[1] !== null && filtersValues[1] !== undefined) {
        args.hash = '%' + filtersValues[1] + '%';
      }
      args.offset = (pageNumber - 1) * pageSize;
      args.limit = pageSize;
      records = await ApiService.getUsers(args);
    }
    catch (error) {
      setError(error);
      return;
    }
    setItems(records.map((record, index) => ({
      key: record.userId,
      data: [
        protect(function ([firstName, lastName]) { return `${firstName} ${lastName}` }, [ record.firstName, record.lastName ]),
        record.email,
        record.phone,
        record.createdAt,
        record.updatedAt,
        record.hash,
        record.enabled,
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
    history.push('/user/' + item.record.userId);
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
  const submitAction0 = async function (e) {
    if (e.ctrlKey) {
      return;
    }
    if (isValid(bodyRefAction0.current)) {
      try {
        await ApiService.postUser(actionData);
      }
      catch (error) {
        setError(error);
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
  
  const handleContextualAction0 = async function (e, item) {
    if (e.ctrlKey) {
      return;
    }
    let user = null;
    try {
      user = await ApiService.getUser(item.record.userId);
    }
    catch (error) {
      setError(error);
      return;
    }
    setContextualAction({ index: 0, user: user });
    const data = {};
    data.firstName = user.firstName;
    data.lastName = user.lastName;
    data.phone = user.phone;
    setContextualActionData(data);
    setContextualActionValidated(false);
  }
  const submitContextualAction0 = async function (e, userId) {
    if (e.ctrlKey) {
      return;
    }
    if (isValid(bodyRefContextualAction0.current)) {
      try {
        await ApiService.putUser(userId, contextualActionData);
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
  const handleContextualAction1 = async function (e, item) {
    if (e.ctrlKey) {
      return;
    }
    let user = null;
    try {
      user = await ApiService.getUser(item.record.userId);
    }
    catch (error) {
      setError(error);
      return;
    }
    setContextualAction({ index: 1, user: user });
    const data = {};
    setContextualActionData(data);
    setContextualActionValidated(false);
  }
  const submitContextualAction1 = async function (e, userId) {
    if (e.ctrlKey) {
      return;
    }
    if (isValid(bodyRefContextualAction1.current)) {
      try {
        await ApiService.deleteUser(userId);
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
        <div className="pb-1 d-flex align-items-center border-bottom">
          <Title level={1} icon={IconUser} color="yellow" label={words.users} />
          <div className="ps-4">
            <FiltersBar
              filters={[
                {
                  label: words.email,
                  variant: 'Text'
                },
                {
                  label: words.hash,
                  variant: 'Text'
                },
              ]}
              filtersValues={filtersValues}
              setFiltersValues={setFiltersValues}
            />
          </div>
          <div className="flex-grow-1" />
          <ActionsBar
            actions={[
              { icon: IconAdd, label: words.add, color: 'blue', onClick: handleAction0 },
            ]}
          />
        </div>
        <Grid
          containerSize={12}
          contextualActions={[
            { icon: IconEdit, label: words.edit, color: 'blue', onClick: handleContextualAction0 },
            { icon: IconDelete, label: words.delete, color: 'red', onClick: handleContextualAction1 },
          ]}
          fields={[
            { label: words.fullName, type: 'string' },
            { type: 'string', docked: true },
            { label: words.phone, type: 'string' },
            { label: words.createdAt, type: 'datetime' },
            { label: words.updatedAt, type: 'datetime' },
            { label: words.hash, type: 'string' },
            { label: words.enabled, type: 'boolean' },
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
      {action && action.index === 0 ?
        <ReactBootstrap.Modal
          show={true}
          onHide={() => cancelAction({})}
          scrollable={true}
          centered={true}
         
        >
          <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
            <Title level={1} icon={IconAdd} color="yellow" label={words.createUser} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefAction0} className="p-0">
            <div className="p-2">
              {actionData && <UsersBodyAction1 data={actionData} updateData={updateActionData} validated={actionValidated} />}
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Button label={words.ok} color="blue" onClick={(e) => submitAction0(e)} />
            </div>
            <div>
              <Button label={words.cancel} color="blue" onClick={(e) => cancelAction(e)} />
            </div>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal> :
        null
      }
      {contextualAction && contextualAction.index === 0 ?
        <ReactBootstrap.Modal
          show={true}
          onHide={() => cancelContextualAction({})}
          scrollable={true}
          centered={true}
         
        >
          <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
            <Title level={1} icon={IconEdit} color="orange" label={words.updateUser} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefContextualAction0} className="p-0">
            <div className="p-2">
              {contextualActionData && <UsersBodyContextualAction1 user={contextualAction ? contextualAction.user : null} data={contextualActionData} updateData={updateContextualActionData} validated={contextualActionValidated} />}
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Button label={words.ok} color="blue" onClick={(e) => submitContextualAction0(e, contextualAction ? contextualAction.user.userId : null)} />
            </div>
            <div>
              <Button label={words.cancel} color="blue" onClick={(e) => cancelContextualAction(e)} />
            </div>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal> :
        null
      }
      {contextualAction && contextualAction.index === 1 ?
        <ReactBootstrap.Modal
          show={true}
          onHide={() => cancelContextualAction({})}
          scrollable={true}
          centered={true}
         
        >
          <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
            <Title level={1} icon={IconDelete} color="red" label={words.deleteUser} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefContextualAction1} className="p-0">
            <div className="p-2">
              <UsersBodyContextualAction2 user={contextualAction ? contextualAction.user : null} />
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Button label={words.delete} color="red" onClick={(e) => submitContextualAction1(e, contextualAction ? contextualAction.user.userId : null)} />
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

export default UsersBody;

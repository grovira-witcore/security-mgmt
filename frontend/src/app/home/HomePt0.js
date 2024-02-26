import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import IconStructure from '../icons/IconStructure.js';
import IconDepartment from '../icons/IconDepartment.js';
import IconDummy from '../icons/IconDummy.js';
import IconRole from '../icons/IconRole.js';

const HomePt0 = ReactRouterDOM.withRouter(function ({  }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const [items, setItems] = React.useState([]);

  const history = ReactRouterDOM.useHistory();

  React.useEffect(() => {
  }, []);

  React.useEffect(() => {
    refreshMe();
  }, []);

  const refreshMe = async function () {
    const items = [];
    const responseROOT = await fetch(`/api/departments`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`
      }
    });
    if (!responseROOT.ok) {
      setError(response);
      return;
    }
    const recordsROOT = await responseROOT.json();
    items.push(...recordsROOT.map((recordROOT, indexROOT) => ({
      levelKey: 'ROOT',
      key: recordROOT.departmentId,
      data: [
        recordROOT.name,
        recordROOT.description,
        recordROOT.createdAt,
        recordROOT.updatedAt,
        recordROOT.hash,
      ],
      record: recordROOT
    })));
    const responsencIdMCkv = await fetch(`/api/roles`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`
      }
    });
    if (!responsencIdMCkv.ok) {
      setError(response);
      return;
    }
    const recordsncIdMCkv = await responsencIdMCkv.json();
    items.push(...recordsncIdMCkv.map((recordncIdMCkv, indexncIdMCkv) => ({
      levelKey: 'ncIdMCkv',
      key: recordncIdMCkv.roleId,
      parentLevelKey: 'ROOT',
      parentKey: recordncIdMCkv.departmentId,
      data: [
        recordncIdMCkv.name,
        recordncIdMCkv.description,
        recordncIdMCkv.createdAt,
        recordncIdMCkv.updatedAt,
        recordncIdMCkv.hash,
      ],
      record: recordncIdMCkv
    })));
    setItems(items);
  }

  const handleClickItemROOT = async function (e, item) {
    if (e.ctrlKey) {
      return;
    }
    history.push('/department/' + item.record.departmentId);
  }

  const handleClickItemncIdMCkv = async function (e, item) {
    if (e.ctrlKey) {
      return;
    }
    history.push('/role/' + item.record.roleId);
  }

  return (
    <div>
      <div>
        <div className="pb-1 d-flex align-items-center border-bottom">
          <Witcore.Title level={1} icon={IconStructure} color="blue" label={lang.departmentsAndRoles} />
          <div className="flex-grow-1" />
          <Witcore.ActionsBar
            actions={[
            ]}
          />
        </div>
        <Witcore.TreeGrid
          containerSize={12}
          levels={[
            {
              key: 'ROOT',
              contextualActions: [
              ],
              fields: [
                { icon: IconDepartment, label: lang.name, type: 'string', style: function (value) { return 'fw-bold'; } },
                { icon: IconDummy, label: lang.description, type: 'string', style: function (value) { return 'fw-bold'; } },
                { icon: IconDummy, label: lang.createdAt, type: 'datetime', style: function (value) { return 'fw-bold'; } },
                { icon: IconDummy, label: lang.updatedAt, type: 'datetime', style: function (value) { return 'fw-bold'; } },
                { icon: IconDummy, label: lang.hash, type: 'string', style: function (value) { return 'fw-bold'; } },
              ],
              onClickItem: handleClickItemROOT,
              expanded: true,
            },
            {
              key: 'ncIdMCkv',
              parentKey: 'ROOT',
              label: lang.roles,
              contextualActions: [
              ],
              fields: [
                { icon: IconRole, type: 'string' },
                { icon: IconDummy, type: 'string' },
                { icon: IconDummy, type: 'datetime' },
                { icon: IconDummy, type: 'datetime' },
                { icon: IconDummy, type: 'string' },
              ],
              onClickItem: handleClickItemncIdMCkv,
            },
          ]}
          items={items}
        />
      </div>
    </div>
  );
})

export default HomePt0;

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.js';
import TreeGrid from '../../components/TreeGrid.js';
import Title from '../../components/Title.js';
import ActionsBar from '../../components/ActionsBar.js';
import IconStructure from '../../components/icons/IconStructure.js';
import IconDepartment from '../../components/icons/IconDepartment.js';
import IconRole from '../../components/icons/IconRole.js';
import ApiService from '../../services/ApiService.js';
import { getWords } from '../../utils/get-words.js';

const HomeBody = ReactRouterDOM.withRouter(function ({  }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);

  const [items, setItems] = React.useState([]);

  const history = ReactRouterDOM.useHistory();

  React.useEffect(() => {
  }, []);

  React.useEffect(() => {
    refreshMe();
  }, []);

  const refreshMe = async function () {
    const items = [];
    let recordsROOT = null;
    try {
      recordsROOT = await ApiService.getDepartments(null);
    }
    catch (error) {
      setError(error);
      return;
    }
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
    let recordsncIdMCkv = null;
    try {
      recordsncIdMCkv = await ApiService.getRoles(null);
    }
    catch (error) {
      setError(error);
      return;
    }
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
          <Title level={1} icon={IconStructure} color="blue" label={words.departmentsAndRoles} />
          <div className="flex-grow-1" />
          <ActionsBar
            actions={[
            ]}
          />
        </div>
        <TreeGrid
          containerSize={12}
          levels={[
            {
              key: 'ROOT',
              contextualActions: [
              ],
              fields: [
                { icon: IconDepartment, label: words.name, type: 'string', style: function (value) { return 'fw-bold'; } },
                { label: words.description, type: 'string', style: function (value) { return 'fw-bold'; } },
                { label: words.createdAt, type: 'datetime', style: function (value) { return 'fw-bold'; } },
                { label: words.updatedAt, type: 'datetime', style: function (value) { return 'fw-bold'; } },
                { label: words.hash, type: 'string', style: function (value) { return 'fw-bold'; } },
              ],
              onClickItem: handleClickItemROOT,
              expanded: true,
            },
            {
              key: 'ncIdMCkv',
              parentKey: 'ROOT',
              label: words.roles,
              contextualActions: [
              ],
              fields: [
                { icon: IconRole, type: 'string' },
                { type: 'string' },
                { type: 'datetime' },
                { type: 'datetime' },
                { type: 'string' },
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

export default HomeBody;

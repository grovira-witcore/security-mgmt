import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../witcore/witcore.js';
import IconLogo from './icons/IconLogo.js';
import IconUser from './icons/IconUser.js';
import IconDepartment from './icons/IconDepartment.js';
import IconRole from './icons/IconRole.js';
import IconObject from './icons/IconObject.js';
import Department from './department/Department.js';
import Departments from './departments/Departments.js';
import Home from './home/Home.js';
import Object from './object/Object.js';
import Objects from './objects/Objects.js';
import Role from './role/Role.js';
import Roles from './roles/Roles.js';
import User from './user/User.js';
import Users from './users/Users.js';
import Login from './security/Login.js';
import GetDefaultSession from './security/GetDefaultSession.js';
import UpdateSession from './security/UpdateSession.js';

const App = ReactRouterDOM.withRouter(function ({}) {
  const [langCode, setLangCode] = React.useState(null);
  const getLang = function () {
    if (langCode === null || langCode === undefined) {
      return null;
    }
    return Witcore.Lang[langCode];
  }
  const lang = getLang();

  const [dateFormat, setDateFormat] = React.useState(null);
  const [moneySymbol, setMoneySymbol] = React.useState(null);

  const [session, setSession] = React.useState(GetDefaultSession());
  const updateSession = function (newSession) {
    setSession(newSession);
    UpdateSession(newSession);
  }

  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const navigatorLanguage = navigator.language || navigator.userLanguage;
    switch (navigatorLanguage.substring(0, 2)) {
      case 'en': {
        setLangCode('En');
        setDateFormat('mm/dd/yyyy');
        setMoneySymbol('$');
        break;
      }
      default: {
        setLangCode('En');
        setDateFormat('mm/dd/yyyy');
        setMoneySymbol('$');
      }
    }
  }, []);

  if (langCode === null || langCode === undefined || dateFormat === null || dateFormat === undefined || moneySymbol === null || moneySymbol === undefined) {
    return (<div />);
  }

  const header = (
    <Witcore.Header
      icon={IconLogo}
      label={lang.securityManagement}
      languages={[
        {
          code: 'En',
          name: lang.english,
          dateFormat: 'mm/dd/yyyy',
          moneySymbol: '$'
        }
      ]}
      menu={session ? [
        {
          label: lang.administration,
          options: [
            { icon: IconUser, label: lang.users, path: "/users" },
            { icon: IconDepartment, label: lang.departments, path: "/departments" },
            { icon: IconRole, label: lang.roles, path: "/roles" },
            { icon: IconObject, label: lang.objects, path: "/objects" },
          ]
        },
      ] : null}
    />
  );

  if (session) {
    if (error === null || error === undefined || (error instanceof Response && (error.status === 400 || error.status === 409)) || (!(error instanceof Response))) {
      return (
        <Witcore.Context.Provider value={{ langCode, setLangCode, getLang, dateFormat, setDateFormat, moneySymbol, setMoneySymbol, session, updateSession, error, setError }}>
          {header}
          <ReactRouterDOM.Switch>
            <ReactRouterDOM.Route exact path="/department/:departmentId">
              <Department />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path="/departments">
              <Departments />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path="/">
              <Home />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path="/object/:objectId">
              <Object />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path="/objects">
              <Objects />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path="/role/:roleId">
              <Role />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path="/roles">
              <Roles />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path="/user/:userId">
              <User />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path="/users">
              <Users />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route>
              <Witcore.NotFound />
            </ReactRouterDOM.Route>
          </ReactRouterDOM.Switch>
          {error ?
            <ReactBootstrap.Modal
              show={true}
              onHide={() => setError(null)}
              scrollable={true}
              centered={true}
            >
              <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
                <Witcore.Title level={1} icon={Witcore.Icon.Error} color="red" label={lang.error} />
              </ReactBootstrap.Modal.Header>
              <ReactBootstrap.Modal.Body className="p-0">
                <Witcore.Error />
              </ReactBootstrap.Modal.Body>
              <ReactBootstrap.Modal.Footer className="p-2">
                <Witcore.Button label={lang.close} color="blue" onClick={(e) => setError(null)} />
              </ReactBootstrap.Modal.Footer>
            </ReactBootstrap.Modal> :
            null
          }
        </Witcore.Context.Provider>
      );
    }
    else {
      return (
        <Witcore.Context.Provider value={{ langCode, setLangCode, getLang, dateFormat, setDateFormat, moneySymbol, setMoneySymbol, session, updateSession, error, setError }}>
          {header}
          <Witcore.Error fullscreen={true} />
        </Witcore.Context.Provider>
      );
    }
  }
  else {
    return (
      <Witcore.Context.Provider value={{ langCode, setLangCode, getLang, dateFormat, setDateFormat, moneySymbol, setMoneySymbol, session, updateSession, error, setError }}>
        {header}
        <Login />
      </Witcore.Context.Provider>
    );
  }
})

export default App;

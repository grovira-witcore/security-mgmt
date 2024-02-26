import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Header = ReactRouterDOM.withRouter(function ({ icon, label, languages, menu }) {
  const { langCode, setLangCode, getLang, setDateFormat, setMoneySymbol, session, updateSession, setError } = React.useContext(Witcore.Context);
  const lang = getLang();
  const [showMenu, setShowMenu] = React.useState(false);
  const [collapsedMenuGroupIndexes, setCollapsedMenuGroupIndexes] = React.useState([]);

  const history = ReactRouterDOM.useHistory();

  const handleClickHome = function (e) {
    if (e.ctrlKey) {
      return;
    }
    setError(null);
    history.push('/');
  }

  const handleClickLanguage = function (e, language) {
    if (e.ctrlKey) {
      return;
    }
    setLangCode(language.code);
    setDateFormat(language.dateFormat);
    setMoneySymbol(language.moneySymbol);
  }

  const handleClickMenu = function (e) {
    if (e.ctrlKey) {
      return;
    }
    setError(null);
    setShowMenu(true);
    setCollapsedMenuGroupIndexes([]);
  }

  const handleClickMenuGroup = function (e, menuGroupIndex) {
    if (e.ctrlKey) {
      return;
    }
    const collapsed = collapsedMenuGroupIndexes.indexOf(menuGroupIndex) !== -1;
    if (collapsed) {
      setCollapsedMenuGroupIndexes((prevCollapsedMenuGroupIndexes) => prevCollapsedMenuGroupIndexes.filter(menuGroupIndexX => menuGroupIndexX !== menuGroupIndex))
    }
    else {
      setCollapsedMenuGroupIndexes((prevCollapsedMenuGroupIndexes) => [...prevCollapsedMenuGroupIndexes, menuGroupIndex])
    }
  }

  const handleClickMenuOption = function (e, path) {
    if (e.ctrlKey) {
      return;
    }
    setError(null);
    setShowMenu(false);
    history.push(path);
  }

  const handleClickLogout = function (e) {
    if (e.ctrlKey) {
      return;
    }
    setError(null);
    updateSession(null);
    history.push('/');
  }

  return (
    <div>
      {/* Header */}
      <div className="p-2 d-flex justify-content-between bg-header text-white">
        <div class="d-flex">
          {menu && (!menu.some(menuGroup => menuGroup.options.length > 0) || menu.some(menuGroup => menuGroup.options.some(menuOption => ! menuOption.hidden))) ?
            <div className="pe-3">
              <div className="p-2 rounded header-action" onClick={handleClickMenu}>
                <Witcore.Icon.Menu size="sm" />
              </div>
            </div> :
            null
          }
          <div className="d-flex align-items-center cursor-pointer" onClick={handleClickHome}>
            <div>{React.createElement(icon, { size: 'xl' })}</div>
            <div className="ps-2 fw-bold lead">{label}</div>
          </div>
        </div>
        <div class="d-flex">
          {languages.length > 1 ?
            <ReactBootstrap.Dropdown>
              <ReactBootstrap.Dropdown.Toggle className="d-flex align-items-center bg-header border-0 header-action">
                {languages.filter((language) => language.code === langCode).map((language) => (
                  <div key={language.code} className="px-2 d-flex align-items-center">
                    {React.createElement(Witcore.Icon['Flag' + language.code], { size: 'lg' })}
                    <div className="ps-2 fw-bold">{language.name}</div>
                  </div>
                ))}
              </ReactBootstrap.Dropdown.Toggle>
              <ReactBootstrap.Dropdown.Menu>
                {languages.map((language) => (
                  <ReactBootstrap.Dropdown.Item key={language.code} onClick={(e) => handleClickLanguage(e, language)}>
                    <div className="px-2 d-flex align-items-center">
                      {React.createElement(Witcore.Icon['Flag' + language.code], { size: 'lg' })}
                      <div className="ps-2">{language.name}</div>
                    </div>
                  </ReactBootstrap.Dropdown.Item>
                ))}
              </ReactBootstrap.Dropdown.Menu>
            </ReactBootstrap.Dropdown> :
            null
          }
          {session ?
            <ReactBootstrap.Dropdown>
              <ReactBootstrap.Dropdown.Toggle className="d-flex align-items-center bg-header border-0 header-action">
                {languages.filter((language) => language.code === langCode).map((language) => (
                  <div key={language.code} className="px-2 d-flex align-items-center">
                    <Witcore.Icon.User size="lg" />
                    <div className="ps-2 fw-bold">{session.fullName}</div>
                  </div>
                ))}
              </ReactBootstrap.Dropdown.Toggle>
              <ReactBootstrap.Dropdown.Menu>
                <ReactBootstrap.Dropdown.Item onClick={handleClickLogout}>
                  <div className="px-2 d-flex align-items-center">
                    <Witcore.Icon.Logout size="lg" />
                    <div className="ps-2">{lang.logout}</div>
                  </div>
                </ReactBootstrap.Dropdown.Item>
              </ReactBootstrap.Dropdown.Menu>
            </ReactBootstrap.Dropdown> :
            null
          }
        </div>
      </div>
      {/* Menu */}
      {menu ?
        <ReactBootstrap.Offcanvas className="offcanvas-menu" show={showMenu} onHide={() => setShowMenu(false)}>
          <ReactBootstrap.Offcanvas.Header className="btn-close-white" closeButton>
            <ReactBootstrap.Offcanvas.Title></ReactBootstrap.Offcanvas.Title>
          </ReactBootstrap.Offcanvas.Header>
          <ReactBootstrap.Offcanvas.Body className="p-0">
            {menu.map(function (menuGroup, menuGroupIndex) {
              const filteredMenuOptions = menuGroup.options.filter(menuOption => !menuOption.hidden);
              if (menuGroup.options.length > 0 && filteredMenuOptions.length === 0) {
                return null;
              }
              const collapsed = collapsedMenuGroupIndexes.indexOf(menuGroupIndex) !== -1;
              return (
                <div key={menuGroupIndex}>
                  <div className="p-2 d-flex justify-content-between align-items-center cursor-pointer group" onClick={(e) => handleClickMenuGroup(e, menuGroupIndex)}>
                    <div className="fw-bold lead text-uppercase flex-1">{menuGroup.label}</div>
                    <div className="pe-1">
                      {collapsed ? 
                        <Witcore.Icon.MenuCollapsed size="sm" /> :
                        <Witcore.Icon.MenuExpanded size="sm" />
                      }
                    </div>
                  </div>
                  {!collapsed ?
                    filteredMenuOptions.map((menuOption, menuOptionIndex) => (
                      <div key={menuOptionIndex} className="p-3 d-flex align-items-center cursor-pointer option" onClick={(e) => handleClickMenuOption(e, menuOption.path)}>
                        <div>{React.createElement(menuOption.icon, { size: 'sm' })}</div>
                        <div className="ps-2 pt-1 lead">{menuOption.label}</div>
                      </div>
                    )) :
                    null
                  }
                </div>
              );
            })}
          </ReactBootstrap.Offcanvas.Body>
        </ReactBootstrap.Offcanvas> :
        null
      }
    </div>
  );
})

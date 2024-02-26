import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import './base/bootstrap.min.css';
import './witcore/witcore.css';
import Witcore from './witcore/witcore.js';
import './witcore/witcore-actions-bar.js';
import './witcore/witcore-button.js';
import './witcore/witcore-check-box.js';
import './witcore/witcore-combo-box.js';
import './witcore/witcore-context.js';
import './witcore/witcore-date-box.js';
import './witcore/witcore-date-picker.js';
import './witcore/witcore-datetime-box.js';
import './witcore/witcore-error.js';
import './witcore/witcore-field.js';
import './witcore/witcore-filter-date-range.js';
import './witcore/witcore-filter-date.js';
import './witcore/witcore-filter-datetime-range.js';
import './witcore/witcore-filter-datetime.js';
import './witcore/witcore-filter-money-range.js';
import './witcore/witcore-filter-money.js';
import './witcore/witcore-filter-numeric-range.js';
import './witcore/witcore-filter-numeric.js';
import './witcore/witcore-filter-option.js';
import './witcore/witcore-filter-percentage-range.js';
import './witcore/witcore-filter-percentage.js';
import './witcore/witcore-filter-text.js';
import './witcore/witcore-filters-bar.js';
import './witcore/witcore-grid.js';
import './witcore/witcore-header.js';
import './witcore/witcore-icon-arrow-down.js';
import './witcore/witcore-icon-arrow-left.js';
import './witcore/witcore-icon-arrow-right.js';
import './witcore/witcore-icon-arrow-up.js';
import './witcore/witcore-icon-cancel.js';
import './witcore/witcore-icon-collapsed.js';
import './witcore/witcore-icon-delete.js';
import './witcore/witcore-icon-download.js';
import './witcore/witcore-icon-error.js';
import './witcore/witcore-icon-expanded.js';
import './witcore/witcore-icon-filter.js';
import './witcore/witcore-icon-flag-en.js';
import './witcore/witcore-icon-flag-fr.js';
import './witcore/witcore-icon-flag-ge.js';
import './witcore/witcore-icon-flag-it.js';
import './witcore/witcore-icon-flag-po.js';
import './witcore/witcore-icon-flag-ru.js';
import './witcore/witcore-icon-flag-sp.js';
import './witcore/witcore-icon-flag-tu.js';
import './witcore/witcore-icon-logout.js';
import './witcore/witcore-icon-menu-collapsed.js';
import './witcore/witcore-icon-menu-expanded.js';
import './witcore/witcore-icon-menu.js';
import './witcore/witcore-icon-no.js';
import './witcore/witcore-icon-ok.js';
import './witcore/witcore-icon-user.js';
import './witcore/witcore-icon-yes.js';
import './witcore/witcore-money-box.js';
import './witcore/witcore-not-found.js';
import './witcore/witcore-numeric-box.js';
import './witcore/witcore-paging-bar.js';
import './witcore/witcore-paragraph.js';
import './witcore/witcore-percentage-box.js';
import './witcore/witcore-progress-bar.js';
import './witcore/witcore-rating-bar.js';
import './witcore/witcore-tabs.js';
import './witcore/witcore-text-area.js';
import './witcore/witcore-text-box.js';
import './witcore/witcore-time-picker.js';
import './witcore/witcore-title.js';
import './witcore/witcore-tree-grid.js';
import './witcore/witcore-utils.js';
import './app/langs/Lang.En.js';
import App from './app/App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReactRouterDOM.BrowserRouter>
    <App/>
  </ReactRouterDOM.BrowserRouter>
);

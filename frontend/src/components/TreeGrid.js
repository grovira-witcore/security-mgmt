import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import Field from './Field.js';
import IconExpanded from './icons/IconExpanded.js';
import IconCollapsed from './icons/IconCollapsed.js';
import BaseIcon from './icons/BaseIcon.js';
import { getJoinedBreadcrumbs, protect } from '../utils/helpers.js';

const TreeGrid = function ({ containerSize, levels, items }) {
  const [current, setCurrent] = React.useState(null);
  const [expandedsCollapseds, setExpandedsCollapseds] = React.useState({});

  const handleItemMouseOver = function (e, item, childLevelKey) {
    let currentNode = e.target;
    while (currentNode && currentNode.nodeName !== 'TR') {
      currentNode = currentNode.parentNode;
    }
    if (currentNode) {
      setCurrent({
        item: item,
        childLevelKey: childLevelKey,
        target: currentNode.childNodes[currentNode.childNodes.length - 1],
        dummy: null
      });
    }
  }

  const contextualActionClick = function (e, contextualAction, item) {
    if (e.ctrlKey) {
      return;
    }
    setCurrent(null);
    contextualAction.onClick(e, item);
  }

  const renderItems = function () {
    const organizedItems = {};
    for (const item of items) {
      const parentFullKey = (item.parentLevelKey ?? '') + '|' + (item.parentKey ?? '');
      if (organizedItems[parentFullKey + '|' + item.levelKey] === null || organizedItems[parentFullKey + '|' + item.levelKey] === undefined) {
        organizedItems[parentFullKey + '|' + item.levelKey] = [];
      }
      organizedItems[parentFullKey + '|' + item.levelKey].push(item);
    }
    return renderItemsLevel(organizedItems, 0, 0, null);
  }
  const renderItemsLevel = function (organizedItems, levelIndex, indent, parentItem) {
    const level = levels[levelIndex];
    const parentFullKey = (parentItem ? parentItem.levelKey : '') + '|' + (parentItem ? parentItem.key : '');
    const childLevelsIndexes = [];
    for (let i = 0; i < levels.length; i++) {
      const childLevel = levels[i];
      if (childLevel.parentKey === level.key) {
        childLevelsIndexes.push(i);
      }
    }
    const renders = [];
    if (organizedItems[parentFullKey + '|' + level.key]) {
      for (const item of organizedItems[parentFullKey + '|' + level.key]) {
        const fullKey = item.levelKey + '|' + item.key;
        const hasChildren = childLevelsIndexes.length > 1 || (childLevelsIndexes.length === 1 && organizedItems[fullKey + '|' + levels[childLevelsIndexes[0]].key] && organizedItems[fullKey + '|' + levels[childLevelsIndexes[0]].key].length > 0);
        let expandedOrCollapsed = expandedsCollapseds[fullKey];
        if (expandedOrCollapsed === null || expandedOrCollapsed === undefined) {
          expandedOrCollapsed = level.expanded ? 'expanded' : 'collapsed';
        }
        renders.push(
          <tr
            key={fullKey}
            className={(current && current.item.levelKey === item.levelKey && current.item.key === item.key && (current.childLevelKey === null || current.childLevelKey === undefined) ? 'bg-selection' + (hasChildren || level.onClickItem ? ' cursor-pointer' : '') : '')}
            onMouseOver={(e) => handleItemMouseOver(e, item)}
            onClick={function (e) {
              if (e.ctrlKey) {
                return;
              }
              if (hasChildren) {
                if (expandedOrCollapsed === 'expanded') {
                  setExpandedsCollapseds({ ...expandedsCollapseds, [fullKey]: 'collapsed' });
                }
                else {
                  setExpandedsCollapseds({ ...expandedsCollapseds, [fullKey]: 'expanded' });
                }
              }
              else if (level.onClickItem) {
                level.onClickItem(e, item);
              }
            }}
           
          >
            {item.data.map(function (value, index) {
              const field = level.fields[index];
              if (field.docked) {
                return null;
              }
              let dockedField = null;
              let dockedValue = null;
              if (level.fields.length > (index + 1) && level.fields[index + 1].docked) {
                dockedField = level.fields[index + 1];
                dockedValue = item.data[index + 1];
              }
              if (index === 0) {
                return (
                  <td key={'value-' + index} className={'d-flex align-middle text-start'}>
                    <div style={{ width: (indent * 18) + 'px' }} />
                    {hasChildren ?
                      (expandedOrCollapsed === 'expanded' ? <IconExpanded size="sm" /> : <IconCollapsed size="sm" />) :
                      <BaseIcon size="sm" />
                    }
                    <div className={'ps-1' + (protect(field.color, value) ? ' text-' + protect(field.color, value) : '')}>
                      {React.createElement(field.icon, { size: 'sm' })}
                    </div>
                    <div className="ps-1">
                      <Field
                        value={value}
                        type={field.type}
                        translate={field.translate}
                        variant={field.variant}
                        color={protect(field.color, value)}
                        style={protect(field.style, value)}
                      />
                      {dockedField && (
                        <div className="text-muted fw-light">
                          <Field
                            value={dockedValue}
                            type={dockedField.type}
                            translate={dockedField.translate}
                            variant={dockedField.variant}
                            color={protect(dockedField.color, dockedValue)}
                            style={protect(dockedField.style, dockedValue)}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                );
              }
              else {
                return (
                  <td key={index} className={'align-middle ' + (field.alignment ?? 'text-start')}>
                    <Field
                      value={value}
                      type={field.type}
                      translate={field.translate}
                      variant={field.variant}
                      color={protect(field.color, value)}
                      style={protect(field.style, value)}
                    />
                    {dockedField && (
                      <div className="text-muted fw-light">
                        <Field
                          value={dockedValue}
                          type={dockedField.type}
                          translate={dockedField.translate}
                          variant={dockedField.variant}
                          color={protect(dockedField.color, dockedValue)}
                          style={protect(dockedField.style, dockedValue)}
                        />
                      </div>
                    )}
                  </td>
                );
              }
            })}
            <td key={-1} className="p-0 border-0" />
          </tr>
        )
        if (expandedOrCollapsed === 'expanded') {
          if (childLevelsIndexes.length === 1) {
            renders.push(...renderItemsLevel(organizedItems, childLevelsIndexes[0], indent + 1, item));
          }
          else if (childLevelsIndexes.length > 1) {
            for (const childLevelIndex of childLevelsIndexes) {
              renders.push(...renderItemsTitledLevel(organizedItems, childLevelIndex, indent + 1, item));
            }
          }
        }
      }
    }
    return renders;
  }
  const renderItemsTitledLevel = function (organizedItems, levelIndex, indent, parentItem) {
    const level = levels[levelIndex];
    const parentFullKey = (parentItem ? parentItem.levelKey : '') + '|' + (parentItem ? parentItem.key : '');
    const hasChildren = organizedItems[parentFullKey + '|' + level.key] && organizedItems[parentFullKey + '|' + level.key].length > 0;
    let expandedOrCollapsed = expandedsCollapseds[parentFullKey + '|' + level.key];
    if (expandedOrCollapsed === null || expandedOrCollapsed === undefined) {
      expandedOrCollapsed = level.titleExpanded ? 'expanded' : 'collapsed';
    }
    const renders = [];
    renders.push(
      <tr
        key={parentFullKey + '|' + level.key}
        className={(current && current.item.levelKey === parentItem.levelKey && current.item.key === parentItem.key && current.childLevelKey === level.key ? 'bg-selection' + (hasChildren ? ' cursor-pointer' : '') : '')}
        onMouseOver={(e) => handleItemMouseOver(e, parentItem, level.key)}
        onClick={function (e) {
          if (e.ctrlKey) {
            return;
          }
          if (hasChildren) {
            if (expandedOrCollapsed === 'expanded') {
              setExpandedsCollapseds({ ...expandedsCollapseds, [parentFullKey + '|' + level.key]: 'collapsed' });
            }
            else {
              setExpandedsCollapseds({ ...expandedsCollapseds, [parentFullKey + '|' + level.key]: 'expanded' });
            }
          }
        }}
       
      >
        {level.fields.map(function (field, index) {
          if (index === 0) {
            return (
              <td key={'field-' + index} className={'d-flex align-middle text-start'}>
                <div style={{ width: (indent * 18) + 'px' }} />
                {hasChildren ?
                  (expandedOrCollapsed === 'expanded' ? <IconExpanded size="sm" /> : <IconCollapsed size="sm" />) :
                  <BaseIcon size="sm" />
                }
                <div className="ps-1">
                  {React.createElement(field.icon, { size: 'sm' })}
                </div>
                <div className="ps-1 fw-bold">
                  {level.label}
                </div>
              </td>
            );
          }
          else {
            return (
              <td key={index}>
              </td>
            );
          }
        })}
      </tr>
    )
    if (expandedOrCollapsed === 'expanded') {
      renders.push(...renderItemsLevel(organizedItems, levelIndex, indent + 1, parentItem));
    }
    return renders;
  }

  let currentLevel = null;
  if (current && (current.childLevelKey === null || current.childLevelKey === undefined)) {
    currentLevel = levels.find((levelX) => levelX.key === current.item.levelKey);
  }
  return (
    <div className="table-responsive" onMouseLeave={() => setCurrent(null)}>
      <table className="table">
        <thead>
          <tr
            onMouseOver={() => setCurrent(null)}
           
          >
            {levels[0].fields.map(function (field, index) {
              if (field.docked) {
                return null;
              }
              return (
                <th key={'field-' + index} className={field.alignment ?? 'text-start'}>
                  <span>{field.label}</span>
                </th>
              );
            })}
            <th className="p-0 border-0" />
          </tr>
        </thead>
        <tbody>
          {renderItems()}
        </tbody>
      </table>
      {current && currentLevel &&
        <ReactBootstrap.Overlay show={true} target={current.target} placement="left">
          <div className="d-flex ps-5 bg-selection" style={{ zIndex: 100000 }}>
            {currentLevel.contextualActions.map((contextualAction, index) =>
              !(contextualAction.hidden && contextualAction.hidden(current.item)) ? (
                <div key={'contextual-action-' + index} className="ps-2">
                  <div className={'p-2 d-flex btn btn-outline-' + contextualAction.color + ' border-0'} onClick={(e) => contextualActionClick(e, contextualAction, current.item)}>
                    <div>
                      {React.createElement(contextualAction.icon, { size: 'xs' }, null)}
                    </div>
                    <div className="ps-2">
                      {contextualAction.label}
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </ReactBootstrap.Overlay>
      }
    </div>
  );
}

export default TreeGrid;
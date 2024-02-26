import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Field = function ({ value, type, translate, variant, color, style }) {
  const { getLang, dateFormat, moneySymbol } = React.useContext(Witcore.Context);
  const lang = getLang();

  if (type !== 'boolean') {
    switch (variant) {
      case 'FramedText': {
        return (
          <div className={'border rounded d-inline-block' + (color ? (' border-' + color + ' bg-' + color + '-lighter text-' + color) : '')}>
            <div className="px-3 py-1">
              {Witcore.Utils.format(translate ? lang[value] : value, type, dateFormat, moneySymbol)}
            </div>
          </div>
        );
      }
      case 'ProgressBar': {
        return (
          <Witcore.ProgressBar value={value} color={color} />
        );
      }
      case 'RatingBar': {
        return (
          <Witcore.RatingBar value={value} color={color} />
        );
      }
      case 'Link': {
        if (type === 'string' && /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(value)) {
          return (
            <a href={value}>{value}</a>
          );
        }
        else {
          return (
            <div>{value}</div>
          );
        }
      }
      default: {
        const classNameParts = [];
        if (color) {
          classNameParts.push('text-' + color);
        }
        if (style) {
          classNameParts.push(style);
        }
        if (classNameParts.length > 0) {
          return (
            <div className={classNameParts.join(' ')}>
              {Witcore.Utils.format(translate ? lang[value] : value, type, dateFormat, moneySymbol)}
            </div>
          );
        }
        else {
          return (
            <div>
              {Witcore.Utils.format(translate ? lang[value] : value, type, dateFormat, moneySymbol)}
            </div>
          );
        }
      }
    }
  }
  else {
    if (value) {
      return (
        <div>
          <Witcore.Icon.Yes size="sm" />
        </div>
      );
    }
    else {
      return (
        <div>
          <Witcore.Icon.No size="sm" />
        </div>
      );
    }
  }
}

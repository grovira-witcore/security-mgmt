import React from 'react';
import AppContext from '../context/AppContext.js';
import ProgressBar from './ProgressBar.js';
import RatingBar from './RatingBar.js';
import IconYes from './icons/IconYes.js';
import IconNo from './icons/IconNo.js';
import { format } from '../utils/helpers.js';

const Field = function ({ value, type, translate, variant, color, style }) {
  const { getLang, dateFormat, moneySymbol } = React.useContext(AppContext);
  const lang = getLang();

  if (type !== 'boolean') {
    switch (variant) {
      case 'FramedText': {
        return (
          <div className={'border rounded d-inline-block' + (color ? (' border-' + color + ' bg-' + color + '-lighter text-' + color) : '')}>
            <div className="px-3 py-1">
              {format(translate ? lang[value] : value, type, dateFormat, moneySymbol)}
            </div>
          </div>
        );
      }
      case 'ProgressBar': {
        return (
          <ProgressBar value={value} color={color} />
        );
      }
      case 'RatingBar': {
        return (
          <RatingBar value={value} color={color} />
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
              {format(translate ? lang[value] : value, type, dateFormat, moneySymbol)}
            </div>
          );
        }
        else {
          return (
            <div>
              {format(translate ? lang[value] : value, type, dateFormat, moneySymbol)}
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
          <IconYes size="sm" />
        </div>
      );
    }
    else {
      return (
        <div>
          <IconNo size="sm" />
        </div>
      );
    }
  }
}

export default Field;
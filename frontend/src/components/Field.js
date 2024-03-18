import React from 'react';
import { useAppContext } from '../context/AppContext.js';
import ProgressBar from './ProgressBar.js';
import RatingBar from './RatingBar.js';
import IconYes from './icons/IconYes.js';
import IconNo from './icons/IconNo.js';
import { format } from '../utils/format.js';
import { getWords } from '../utils/get-words.js';

const Field = function ({ value, type, translate, variant, color, style }) {
  const { i18n } = useAppContext();
  const words = getWords(i18n.code);

  if (type !== 'boolean') {
    switch (variant) {
      case 'FramedText': {
        return (
          <div className={'border rounded d-inline-block' + (color ? (' border-' + color + ' bg-' + color + '-lighter text-' + color) : '')}>
            <div className="px-3 py-1">
              {format(translate ? words[value] : value, type, i18n.dateFormat, i18n.moneySymbol)}
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
              {format(translate ? words[value] : value, type, i18n.dateFormat, i18n.moneySymbol)}
            </div>
          );
        }
        else {
          return (
            <div>
              {format(translate ? words[value] : value, type, i18n.dateFormat, i18n.moneySymbol)}
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
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Utils = {
  protect: function (fn, arg) {
    if (fn) {
      try {
        return fn(arg);
      }
      catch (err) {
        console.log(err);
        return null;
      }
    }
    else {
      return null;
    }
  },
  convertSizeIcon: function (size) {
    switch (size) {
      case 'xs': {
        return '12px';
      }
      case 'sm': {
        return '16px';
      }
      case 'lg': {
        return '20px';
      }
      case 'xl': {
        return '24px';
      }
      default: {
        return '16px';
      }
    }
  },
  isValid: function (target) {
    const isValidRecursive = function (current) {
      if (current.dataset.invalid) {
        return false;
      }
      for (const child of current.children) {
        if (!isValidRecursive(child)) {
          return false;
        }
      }
      return true;
    }
    return isValidRecursive(target);
  },
  format: function (value, type, dateFormat, moneySymbol) {
    if (value !== null && value !== undefined) {
      switch (type) {
        case 'integer': {
          return Witcore.Utils.formatNumber(value, 0);
        }
        case 'decimal': {
          return Witcore.Utils.formatNumber(value, 2);
        }
        case 'money': {
          return moneySymbol + ' ' + Witcore.Utils.formatNumber(value, 2);
        }
        case 'percentage': {
          return Witcore.Utils.formatNumber(value * 100, 2) + ' %';
        }
        case 'datetime': {
          return Witcore.Utils.formatDatetime(value, dateFormat);
        }
        case 'date': {
          return Witcore.Utils.formatDate(value, dateFormat);
        }
        default: {
          return value;
        }
      }
    }
    else {
      return '';
    }
  },
  formatNumber: function (number, decimals) {
    const parts = number.toFixed(decimals).toString().split('.');
    if (decimals > 0) {
      if (parts.length === 1) {
        return (parts[0] + '.').padEnd(decimals, '0');
      }
      else {
        return (parts[0] + '.' + parts[1]).padEnd(decimals - parts[1].length, '0');
      }
    }
    else {
      return parts[0];
    }
  },
  formatDate: function (dateIso8601, dateFormat) {
    const date = new Date(dateIso8601);
    const yearPart = date.getFullYear().toString();
    const monthPart = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayPart = (date.getDate()).toString().padStart(2, '0');
    return dateFormat.replace('yyyy', yearPart).replace('mm', monthPart).replace('dd', dayPart);
  },
  formatDatetime: function (dateIso8601, dateFormat) {
    const date = new Date(dateIso8601);
    const yearPart = date.getFullYear().toString();
    const monthPart = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayPart = (date.getDate()).toString().padStart(2, '0');
    let hour = date.getHours();
    let isAm = true;
    if (hour === 0) {
      hour = 12;
    }
    else if (hour >= 12) {
      if (hour > 12) {
        hour -= 12;
      }
      isAm = false;
    }
    const hourPart = hour.toString().padStart(2, '0');
    const minutesPart = (date.getMinutes()).toString().padStart(2, '0');
    const amPmPart = (isAm ? 'AM' : 'PM');
    return dateFormat.replace('yyyy', yearPart).replace('mm', monthPart).replace('dd', dayPart) + ` ${hourPart}:${minutesPart} ${amPmPart}`;
  },
  download: function (fileName, data) {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.click();
    window.URL.revokeObjectURL(url);  
  }
}
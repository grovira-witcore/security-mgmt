import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.Paragraph = function ({ template, alignment, fields, data }) {

  const parts = [];
  let subTemplate = template;
  let match = /({\d+})/g.exec(subTemplate);
  while (match) {
    parts.push(subTemplate.substring(0, match.index));
    const index = parseInt(match[0].substring(1, match[0].length - 1));
    if (fields.length > index && data.length > index) {
      const field = fields[index];
      const value = data[index];
      parts.push(
        <div>
          <Witcore.Field
            value={value}
            type={field.type}
            translate={field.translate}
            variant={field.variant}
            color={Witcore.Utils.protect(field.color, value)}
            style={Witcore.Utils.protect(field.style, value)}
          />
        </div>
      );
    }
    else {
      parts.push('{' + index + '}');
    }
    subTemplate = subTemplate.substring(match.index + match[0].length);
    match = /({\d+})/g.exec(subTemplate);
  }
  parts.push(subTemplate);

  return (
    <div className={'d-flex' + (alignment ? ' ' + alignment : '')}>
      {parts.map(function (part, index) {
        return (<div key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</div>);
      })}
    </div>
  );
}

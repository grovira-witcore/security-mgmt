import React from 'react';
import AppContext from '../context/AppContext.js';

const TimePicker = function ({ value, onChange }) {
  const { getLang } = React.useContext(AppContext);
  const lang = getLang();

  const handleHourMinute = function (hour, minute) {
    if (value !== null && value !== undefined) {
      const targetDate = new Date(value);
      targetDate.setHours(hour);
      targetDate.setMinutes(minute);
      onChange(targetDate.toISOString());
    }
  }

  let currentHour = null;
  let currentMinute = null;
  if (value !== null && value !== undefined) {
    const currentDate = new Date(value);
    currentHour = currentDate.getHours();
    currentMinute = currentDate.getMinutes();
  }
  return (
    <div className="p-2 border-start" style={{ width: '90px', height: '246px', overflow: 'auto' }}>
      {['AM', 'PM'].map((texti, i) =>
        ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'].map((textj, j) =>
          ['00', '30'].map(function (textk, k) {
            const hour = i * 12 + j;
            const minute = k * 30;
            return (<div key={hour + ':' + minute} className={'p-1 cursor-pointer hov-blue' + (currentHour === hour && currentMinute === minute ? ' bg-blue text-white' : '')} onClick={(e) => handleHourMinute(hour, minute)}>{textj + ':' + textk + ' ' + texti}</div>)
          })
        )
      )}
    </div>
  );
}

export default TimePicker;
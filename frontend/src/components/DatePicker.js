import React from 'react';
import AppContext from '../context/AppContext.js';
import IconArrowLeft from './icons/IconArrowLeft.js';
import IconArrowRight from './icons/IconArrowRight.js';

const DatePicker = function ({ value, onChange }) {
  const { getLang } = React.useContext(AppContext);
  const lang = getLang();
  
  const [calendarPointer, setCalendarPointer] = React.useState(null);
  const [currentCalendarItem, setCurrentCalendarItem] = React.useState(null);
  const [nowCalendarItem, setNowCalendarItem] = React.useState(null);

  React.useEffect(() => {
    if (value !== null && value !== undefined && value !== '') {
      const date = new Date(value);
      setCalendarPointer({ year: date.getFullYear(), month: date.getMonth() + 1 });
      setCurrentCalendarItem({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });
    }
    else {
      const date = new Date();
      setCalendarPointer({ year: date.getFullYear(), month: date.getMonth() + 1 });
      setCurrentCalendarItem(null);
    }
    const now = new Date();
    setNowCalendarItem({ year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() });
  }, [value]);

  const handlePreviousMonthClick = function (e) {
    const newCalendarPointer = { year: calendarPointer.year, month: calendarPointer.month - 1 };
    if (newCalendarPointer.month === 0) {
      newCalendarPointer.year--;
      newCalendarPointer.month = 12;
    }
    setCalendarPointer(newCalendarPointer);
  }
  const handleNextMonthClick = function (e) {
    const newCalendarPointer = { year: calendarPointer.year, month: calendarPointer.month + 1 };
    if (newCalendarPointer.month === 13) {
      newCalendarPointer.year++;
      newCalendarPointer.month = 1;
    }
    setCalendarPointer(newCalendarPointer);
  }
  const handleCalendarItemClick = function (e, calendarItem) {
    onChange(new Date(calendarItem.year, calendarItem.month - 1, calendarItem.day).toISOString());
  }

  const getMonthText = function (month) {
    switch (month) {
      case 1: {
        return lang.january;
      }
      case 2: {
        return lang.february;
      }
      case 3: {
        return lang.march;
      }
      case 4: {
        return lang.april;
      }
      case 5: {
        return lang.may;
      }
      case 6: {
        return lang.june;
      }
      case 7: {
        return lang.july;
      }
      case 8: {
        return lang.august;
      }
      case 9: {
        return lang.september;
      }
      case 10: {
        return lang.october;
      }
      case 11: {
        return lang.november;
      }
      case 12: {
        return lang.december;
      }
    }
    return '';
  }
  const getCalendarItems = function (year, month) {
    const calendarItems = [];
    const firstWeekDayOfMonth = getFirstWeekDayOfMonth(year, month);
    if (firstWeekDayOfMonth > 0) {
      const lastDayInPreviusMonth = getDaysInMonth(year, month - 1);
      for (let dayInPreviousMonth = lastDayInPreviusMonth - firstWeekDayOfMonth + 1; dayInPreviousMonth <= lastDayInPreviusMonth; dayInPreviousMonth++) {
        calendarItems.push({ year: year, month: month - 1, day: dayInPreviousMonth });
      }
    }
    const lastDayInCurrentMonth = getDaysInMonth(year, month);
    for (let dayInCurrentMonth = 1; dayInCurrentMonth <= lastDayInCurrentMonth; dayInCurrentMonth++) {
      calendarItems.push({ year: year, month: month, day: dayInCurrentMonth });
    }
    let dayInNextMonth = 1;
    while (calendarItems.length < 42) {
      calendarItems.push({ year: year, month: month + 1, day: dayInNextMonth });
      dayInNextMonth++;
    }
    return calendarItems;
  }
  const getFirstWeekDayOfMonth = function (year, month) {
    return new Date(year, month - 1, 1).getDay();
  }
  const getDaysInMonth = function (year, month) {
    return new Date(year, month, 0).getDate();
  }
  const equalCalendarItems = function (calendarItem1, calendarItem2) {
    return calendarItem1 && calendarItem2 && 
      calendarItem1.year === calendarItem2.year && 
      calendarItem1.month === calendarItem2.month && 
      calendarItem1.day === calendarItem2.day;
  }

  if (calendarPointer === null || calendarPointer === undefined) {
    return (<div></div>);
  }
  const calendarItems = getCalendarItems(calendarPointer.year, calendarPointer.month);
  return (
    <div>
      <div className="p-1 pb-2 d-flex">
        <div className="text-blue cursor-pointer" onClick={handlePreviousMonthClick}><IconArrowLeft size="sm" /></div>
        <div className="flex-grow-1 pt-1 text-center fs-6 fw-bold">{getMonthText(calendarPointer.month) + ' ' + calendarPointer.year}</div>
        <div className="text-blue cursor-pointer" onClick={handleNextMonthClick}><IconArrowRight size="sm" /></div>
      </div>
      <table className="table table-borderless">
        <thead className="border-bottom">
          <tr>
            {[lang.sunday, lang.monday, lang.tuesday, lang.wednesday, lang.thursday, lang.friday, lang.saturday].map(function (weekDayText, index) {
              return (
                <td key={'day-' + index} className="text-center fw-bold" style={{ width: "36px" }}>
                  {weekDayText.substring(0, 2)}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6].map(function (i) {
            return (
              <tr key={i}>
                {[1, 2, 3, 4, 5, 6, 7].map(function (j) {
                  const calendarItem = calendarItems[((i - 1) * 7) + (j - 1)];
                  return (
                    <td key={j} className={'cursor-pointer hov-blue' + (equalCalendarItems(currentCalendarItem, calendarItem) ? ' bg-blue text-white' : '') + (equalCalendarItems(nowCalendarItem, calendarItem) ? ' fw-bold' : (calendarItem.month !== calendarPointer.month ? ' text-muted' : '')) + ' rounded text-center'} onClick={(e) => handleCalendarItemClick(e, calendarItem)} >
                      {calendarItem.day}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DatePicker;
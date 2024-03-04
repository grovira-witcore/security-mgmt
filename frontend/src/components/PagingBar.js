import React from 'react';
import AppContext from '../context/AppContext.js';
import IconArrowLeft from './icons/IconArrowLeft.js';
import IconArrowRight from './icons/IconArrowRight.js';

const PagingBar = function ({ pageNumber, setPageNumber, countOfItems, countOfPages }) {
  const { getLang } = React.useContext(AppContext);
  const lang = getLang();

  const handlePreviousPageClick = function () {
    setPageNumber(pageNumber - 1);
  }
  const handlePageClick = function (targetPageNumber) {
    setPageNumber(targetPageNumber);
  }
  const handleNextPageClick = function () {
    setPageNumber(pageNumber + 1);
  }

  const targetPagesNumbers = [];
  if (countOfPages <= 10) {
    for (let i = 1; i <= countOfPages; i++) {
      targetPagesNumbers.push(i);
    }
  }
  else {
    if ((pageNumber - 5) < 1) {
      for (let i = 1; i <= 10; i++) {
        targetPagesNumbers.push(i);
      }
    }
    else if ((pageNumber + 4) > countOfPages) {
      for (let i = countOfPages - 9; i <= countOfPages; i++) {
        targetPagesNumbers.push(i);
      }
    }
    else {
      for (let i = pageNumber - 5; i <= pageNumber + 4; i++) {
        targetPagesNumbers.push(i);
      }
    }
  }
  if (countOfItems === null || countOfItems === undefined || countOfPages === null || countOfPages === undefined) {
    return (
      <div className="d-flex">
        {pageNumber > 1 ?
          <div className="px-2 py-1 rounded border text-blue cursor-pointer hov-blue" onClick={handlePreviousPageClick}>
            <IconArrowLeft size="xs" />
          </div> :
          <div className="px-2 py-1 rounded border text-gray">
            <IconArrowLeft size="xs" />
          </div>
        }
        <div className="px-2">
          <div className="rounded border text-blue d-flex">
            <div key={pageNumber} className="px-3 py-1 rounded bg-blue text-white fw-bold">
              {pageNumber}
            </div>
          </div>
        </div>
        <div className="px-2 py-1 rounded border text-blue cursor-pointer hov-blue" onClick={handleNextPageClick}>
          <IconArrowRight size="xs" />
        </div>
      </div>
    );
  }
  else {
    if (countOfPages <= 1) {
      return (
        <div className="d-flex">
          <div className="flex-grow-1" />
          <div className="p-1 d-flex">
            <div className="px-1 fw-bold">{countOfItems}</div>
            <div className="pe-1">{(countOfItems === 1 ? lang.item.toLowerCase() : lang.items.toLowerCase()) + ' ' + lang.in.toLowerCase() + ' ' + lang.total.toLowerCase()}</div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="d-flex">
          {pageNumber > 1 ?
            <div className="px-2 py-1 rounded border text-blue cursor-pointer hov-blue" onClick={handlePreviousPageClick}>
              <IconArrowLeft size="xs" />
            </div> :
            <div className="px-2 py-1 rounded border text-gray">
              <IconArrowLeft size="xs" />
            </div>
          }
          <div className="px-2">
            <div className="rounded border text-blue d-flex">
              {targetPagesNumbers.map((targetPageNumber) =>
                targetPageNumber !== pageNumber ?
                  <div key={targetPageNumber} className="px-3 py-1 rounded text-blue cursor-pointer hov-blue" onClick={(e) => handlePageClick(targetPageNumber)}>
                    {targetPageNumber}
                  </div> :
                  <div key={targetPageNumber} className="px-3 py-1 rounded bg-blue text-white fw-bold">
                    {targetPageNumber}
                  </div>
              )}
            </div>
          </div>
          {pageNumber < countOfPages ?
            <div className="px-2 py-1 rounded border text-blue cursor-pointer hov-blue" onClick={handleNextPageClick}>
              <IconArrowRight size="xs" />
            </div> :
            <div className="px-2 py-1 rounded border text-gray">
              <IconArrowRight size="xs" />
            </div>
          }
          <div className="flex-grow-1" />
          <div className="p-1 d-flex">
            <div className="px-1 fw-bold">{countOfItems}</div>
            <div>{(countOfItems === 1 ? lang.item.toLowerCase() : lang.items.toLowerCase()) + ' ' + lang.in.toLowerCase()}</div>
            <div className="px-1 fw-bold">{countOfPages}</div>
            <div className="pe-1">{countOfPages === 1 ? lang.page.toLowerCase() : lang.pages.toLowerCase()}</div>
          </div>
        </div>
      );
    }
  }
};

export default PagingBar;
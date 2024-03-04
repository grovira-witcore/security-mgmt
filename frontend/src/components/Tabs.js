import React from 'react';

const Tabs = function ({ tabs }) {
  const [activeTabIndex, setActiveTabIndex] = React.useState(-1);

  React.useEffect(() => {
    setActiveTabIndex(tabs.findIndex(tabX => !tabX.hidden));
  }, []);

  const handleClickTab = function (e, tabIndex) {
    if (e.ctrlKey) {
      return;
    }
    setActiveTabIndex(tabIndex);
  }

  if (tabs.length > 0) {
    return (
      <div>
        <div className="d-flex pt-1 lead adjust-size-tabs">
          {tabs.map((tab, index) =>
            !tab.hidden ? (
              <div
                key={'tab-' + index}
                className={'px-5 pt-1 pb-2 d-flex align-items-center border-bottom ' + (activeTabIndex === index ? 'text-blue border-blue border-2' : 'cursor-pointer')}
                onClick={(e) => handleClickTab(e, index)}
               
              >
                <div>
                  {React.createElement(tab.icon, { size: 'lg' }, null)}
                </div>
                <div className="ps-2 pt-1">
                  {tab.label}
                </div>
              </div>
            ) : null
          )}
          <div className="flex-grow-1 border-bottom" />
        </div>
        <div>
          {tabs.map((tab, index) => 
            !tab.hidden ? (
              <div
                key={index}
                className={activeTabIndex === index ? 'd-block' : 'd-none'}
              >
                {React.createElement(tab.component, tab.arguments)}
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <div className="d-flex pt-1 lead adjust-size-tabs">
          <div
            className="px-5 pt-1 pb-2 border-bottom fw-bold border-blue text-blue border-2"
           
          >
            {'Tab'}
          </div>
          <div className="flex-grow-1 border-bottom" />
        </div>
      </div>
   );
 }
}

export default Tabs;
import React from 'react';

const AppContext = React.createContext();

const useAppContext = function () {
  return React.useContext(AppContext);
}

const AppContextProvider = function ({ defaultI18n, children }) {
  const [i18n, setI18n] = React.useState(defaultI18n);
  const [error, setError] = React.useState(null);

  return (
    <AppContext.Provider value={{ i18n, setI18n, error, setError }}>
      {children}
    </AppContext.Provider>
  );
}

export { useAppContext, AppContextProvider };

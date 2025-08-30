import React, { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const DocContext = createContext();

const DocContextProvider = (props) => {
  const value = {}; // must provide value
  return (
    <DocContext.Provider value={value}>
      {props.children}
    </DocContext.Provider>
  );
};

export default DocContextProvider;

import React, { createContext ,useState} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  
      const [aToken,setAToken]= useState('')
      const backendUrl=import.meta.env.VITE_BACKEND_URL;

      const value = {
        aToken,setAToken,
        backendUrl, 
  }; // must provide value
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

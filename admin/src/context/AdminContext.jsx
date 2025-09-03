// import React, { createContext ,useState} from "react";

// // eslint-disable-next-line react-refresh/only-export-components
// export const AdminContext = createContext();

// const AdminContextProvider = (props) => {
  
//       const [aToken,setAToken]= useState('')
//       const backendUrl=import.meta.env.VITE_BACKEND_URL;

//       const value = {
//         aToken,setAToken,
//         backendUrl, 
//   }; // must provide value
//   return (
//     <AdminContext.Provider value={value}>
//       {props.children}
//     </AdminContext.Provider>
//   );
// };

// export default AdminContextProvider;
import React, { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // Load token from localStorage when app starts
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Keep localStorage in sync with context state
  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
    } else {
      localStorage.removeItem("aToken");
    }
  }, [aToken]);

  const value = {
    aToken,
    setAToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

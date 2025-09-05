import { createContext } from "react";

import { doctors, drugCategories, drugs } from "../assets/assets_frontend/assets";

export const AppContext = createContext({});

const AppContextProvider = (props) => {
    const currencysymbol ='$'
    const value = {
        doctors,currencysymbol,
        drugs,
        drugCategories,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

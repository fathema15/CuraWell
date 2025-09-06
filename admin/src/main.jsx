import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.jsx";
import DoctorsContextProvider from "./context/DoctorsContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import DrugContextProvider from "./context/DrugContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorsContextProvider>
        <DrugContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </DrugContextProvider>
      </DoctorsContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
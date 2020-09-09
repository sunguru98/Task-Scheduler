import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import AppContextProvider from "./AppContext";

// Connected the context provider here, to get whole app coverage.
ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

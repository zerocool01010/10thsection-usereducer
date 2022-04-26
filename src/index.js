import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import {AuthCtxProvider} from './store/authcontext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthCtxProvider> {/* se invoca el contexto global */}
    <App />
  </AuthCtxProvider>
);

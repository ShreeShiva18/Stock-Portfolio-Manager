import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Global styles
import { BrowserRouter } from "react-router-dom";

// Render the App component into the root div in index.html
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>

    <App />
  </BrowserRouter>
);

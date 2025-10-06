// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import LocationsPage from "./pages/LocationsPage.jsx";
import LocationDetailPage from "./pages/LocationDetailPage.jsx";
import USMapPage from "./pages/USMapPage.jsx";
import StateDetailPage from "./pages/StateDetailPage.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<LocationsPage />} />
          <Route path="/locations/:slug" element={<LocationDetailPage />} />
          {/* NEW */}
          <Route path="/us" element={<USMapPage />} />
          <Route path="/states/:code" element={<StateDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

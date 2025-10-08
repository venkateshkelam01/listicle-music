// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import LocationsPage from "./pages/LocationsPage.jsx";
import StateDetailPage from "./pages/StateDetailPage.jsx";
import CountryDetailPage from "./pages/CountryDetailPage.jsx";

// ✅ Correct CSS imports
// Import CSS from the src/css folder (relative imports) so Vite can resolve them
import "./css/base.css";
import "./css/typography.css";
import "./css/layout.css";
import "./css/components.css";
import "./css/pages.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<LocationsPage />} />
          <Route path="/states/:code" element={<StateDetailPage />} />
          <Route path="/countries/:code" element={<CountryDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

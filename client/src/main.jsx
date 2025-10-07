// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import LocationsPage from "./pages/LocationsPage.jsx";
import StateDetailPage from "./pages/StateDetailPage.jsx";
import CountryDetailPage from "./pages/CountryDetailPage.jsx";  // NEW
// import "./index.css";
import '../public/css/base.css';
import '../public/css/typography.css';
import '../public/css/layout.css';
import '../public/css/components.css';
import '../public/css/pages.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<LocationsPage />} />
          <Route path="/states/:code" element={<StateDetailPage />} />
          <Route path="/countries/:code" element={<CountryDetailPage />} /> {/* NEW */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

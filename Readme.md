# WEB103 Project 3 - Virtual Community Space 🎸

Submitted by: **Venkatesh Kelam**

About this web app: This app helps users explore live events around the world by interacting with a visual world map. Users can click on regions (e.g., Americas, Africa, Asia, Australia), drill down to specific countries and states, and view upcoming events categorized by location. The app is built with React on the frontend and Express + PostgreSQL on the backend, and supports full API access, dynamic SVG maps, and location-based routing.

Time spent: **10** hours

---

## ✅ Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [x]  **Walkthrough includes a view of my Render dashboard showing the Postgres database is running**
  - [x]  **Walkthrough includes a terminal screenshot with `SELECT * FROM events;` showing table contents**
- [x] **The web app displays a title**
- [x] **Website includes a visual interface that allows users to select a location**
  - [x] *Interactive world map with clickable regions (SVG polygons), not just links*
- [x] **Each location has a detail page with its own unique URL**
- [x] **Clicking a location navigates to its detail page and shows events filtered by location**

---

## 🌟 Optional Features

The following **optional** features are implemented:

- [x] Additional page shows **all events** (`/events`)
  - [x] Users can **filter** events by genre and location (through dropdowns and search input)
- [x] Events show countdown or indicate when the event has passed
  - [x] Past events display with a **"Event passed"** label in a faded style
- [x] Country and state-level drill-downs with **dynamic routes**
  - [x] `/countries/US`, `/states/CA`, etc.

---

## 🚀 Additional Features

The following **additional** features are implemented:

- [x] Full SSR (Server-Side Rendering) for `/`, `/events`, and `/events/:slug`
- [x] Clean project structure with proper **Separation of Concerns**
- [x] Reusable utility functions like `slugify()`, `fmtCurrency()`, and `fmtDateTime()`
- [x] **Interactive SVG world map** with live hover and region detection
- [x] Styled UI using modular CSS (`base.css`, `components.css`, etc.)
- [x] Home button consistently placed across pages (`← Home`)
- [x] Custom 404 page with image and call-to-action

---

## 📹 Video Walkthrough

Here’s a walkthrough of the implemented features:

<img src='https://www.loom.com/share/f7084be7631443339d688e86376df32d.gif' title='Video Walkthrough' width='100%' alt='Video Walkthrough' />


---

## 📝 Notes

**Challenges encountered:**

- Positioning the world map SVG polygons accurately over the background image to align with real continents.
- Creating reusable SSR-friendly rendering logic that supports layout injection and metadata dynamically.
- Managing multiple levels of filtering (genre, location, search) while preserving UX.
- Keeping CSS overlays transparent but still legible with multiple layers (e.g., on country detail pages).

**Learnings:**

- How to build full-stack apps with dynamic routing, SSR, and REST APIs
- SVG polygon mapping and event delegation in React
- Styling pages with layered backgrounds and accessibility in mind

---

## 📄 License

Copyright 2025 Venkatesh Kelam

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at:

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

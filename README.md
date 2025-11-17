# Companies Directory – Frontend Developer Assessment

React + Vite single-page app that lists company data, supports filtering, sorting, pagination, and consumes a mock JSON API. Tailwind CSS handles styling.

### Stack
- React 18 with hooks/state
- Vite build tooling
- Tailwind CSS + Heroicons
- Static mock API at `public/data/companies.json`

### Project structure
```
frontend/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── public/
│   └── data/companies.json
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── components/
    │   ├── CompanyCardGrid.jsx
    │   ├── CompanyFilters.jsx
    │   ├── CompanyTable.jsx
    │   ├── ErrorState.jsx
    │   ├── LoadingState.jsx
    │   └── Pagination.jsx
    └── utils/
        └── number.js
```

### Getting started
1. Install dependencies  
   `npm install`

2. Start the dev server  
   `npm run dev`  
   Vite runs at http://localhost:5173 by default. The mock API is served from `/data/companies.json`.

3. Run production build  
   `npm run build` (outputs to `dist/`).  
   `npm run preview` serves the production build locally.

### Deploy to Netlify
1. Create a new Netlify site, linking this repo (or drag‑and‑drop the `dist` folder after `npm run build`).
2. Build command: `npm run build`  
   Publish directory: `dist`
3. Set the Node version (e.g., `18.x`) under Netlify build settings if needed.
4. Trigger a deploy; Netlify will install dependencies, build, and host the static Vite output.

### Testing checklist
- Filtering by text, industry, and location updates results instantly.
- Sorting options adjust table order.
- Pagination buttons work and disable appropriately.
- Loading spinner appears while fetching JSON.
- Error state appears if `data/companies.json` fails to load.

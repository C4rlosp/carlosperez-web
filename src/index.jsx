import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import i18n from './i18n';

// The document HEAD redirects legacy hash URLs and slashless routes before hydration.
// The normal browser entry can therefore hydrate the prerendered page consistently.
const root = document.getElementById('root');
const app = <React.StrictMode><App /></React.StrictMode>;
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

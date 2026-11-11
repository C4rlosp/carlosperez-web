import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import i18n from './i18n';
import { AppContent } from './App';

export function render(url) {
  const en = /^\/en(?:\/|$)/.test(url);
  i18n.changeLanguage(en ? 'en' : 'es');
  return renderToString(
    <MemoryRouter basename={en ? '/en' : '/'} initialEntries={[url]}>
      <AppContent />
    </MemoryRouter>
  );
}

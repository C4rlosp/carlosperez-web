import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Local and production builds target the custom-domain root.
  // Staging builds can override this with VITE_BASE_PATH.
  base: process.env.VITE_BASE_PATH || '/',
});

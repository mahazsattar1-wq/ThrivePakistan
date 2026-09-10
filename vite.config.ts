import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Thrive Pakistan — frontend build configuration.
// The production build outputs static assets to `dist/`, which is deployed
// alongside the PHP API layer in `public/api/` on PHP-capable hosting.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Allow the sandbox preview host (and any host) in dev — production
    // deployments are unaffected.
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 700,
  },
});

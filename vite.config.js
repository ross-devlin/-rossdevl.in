import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
  server: {
    proxy: {
      '/substack-feed': {
        target: 'https://rossdevlin.substack.com',
        changeOrigin: true,
        rewrite: () => '/feed',
      },
    },
  },
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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

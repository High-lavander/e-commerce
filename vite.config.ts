import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/oauth': {
        target: 'https://api.europe-west1.gcp.commercetools.com/oauth',
        forward: 'https://api.europe-west1.gcp.commercetools.com/oauth',
        xfwd: true,
        changeOrigin: true,
        secure: false,
        ws: true,
        toProxy: true,
        prependPath: true,
        ignorePath: false,
        auth: 'svS0pMBqBgsAvo4YHURZIY5j:fWRzgWaExAVLS5ouwkssarqFSpNP5pqp',
      },
    },
  },
});

// 'https://api.europe-west1.gcp.commercetools.com/oauth'

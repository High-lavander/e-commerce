import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnviromentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), EnviromentPlugin('all')],

});


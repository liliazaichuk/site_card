import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/site_card/',
  css: {
    postcss: './postcss.config.js'
  }
  //optimizeDeps: {
    //exclude: ['lucide-react'],
 // },
});
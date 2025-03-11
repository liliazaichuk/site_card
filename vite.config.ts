import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/website_aboutme/',
  css: {
    postcss: './postcss.config.js'
  }
  //optimizeDeps: {
    //exclude: ['lucide-react'],
 // },
});
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import checker from 'vite-plugin-checker'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [checker({typescript: true}), react(), svgr()],
  server: {
    open: 'http://localhost:3000',
  },
  build: {
    target: 'es2020',
  },
  optimizeDeps: {
    esbuildOptions: { target: 'es2020' },
  },
});

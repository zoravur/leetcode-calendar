import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/leetcode-calendar/',
  build: {
    outDir: 'docs',
    emptyOutDir: false
  }
});

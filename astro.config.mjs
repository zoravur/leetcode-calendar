import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://zoravur.com',
  base: '/leetcode-calendar',
  outDir: './docs',
  build: {
    assets: 'assets'
  }
});

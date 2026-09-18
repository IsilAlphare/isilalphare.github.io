import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://starrydome.top',
  integrations: [sitemap()],
});

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://starrydome.top',
  prefetch: { prefetchAll: false, defaultStrategy: 'viewport' },
  integrations: [sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/preview/') && new URL(page).pathname !== '/photos/' })],
});

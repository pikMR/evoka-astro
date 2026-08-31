import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
  site: isDevelopment ? 'http://localhost:4321' : 'https://evoka.store',
  base: '/',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/es/'),
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});

import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pikmr.github.io',
  base: '/evoka-astro',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});

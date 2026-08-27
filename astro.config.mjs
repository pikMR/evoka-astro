import { defineConfig } from 'astro/config';

const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
  site: isDevelopment ? 'http://localhost:4321' : 'https://pikmr.github.io',
  base: isDevelopment ? '/' : '/evoka-astro',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});

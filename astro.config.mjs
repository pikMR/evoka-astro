import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://catalogo.evoka.local',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
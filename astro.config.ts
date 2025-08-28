import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

// Configuración de AstroWind
const astroWindConfig = {
  SITE: {
    base: '/',
    site: 'https://astrowind-zeta-two.vercel.app/',
    trailingSlash: false,
  },
  APP_BLOG: {
    enabled: true,
    path: '/blog',
    postsPerPage: 6,
    list: {
      pathname: 'blog',
    },
    category: {
      pathname: 'category',
    },
    tag: {
      pathname: 'tag',
    },
    post: {
      permalink: '/blog/%slug%',
    },
  },
  I18N: {
    defaultLocale: 'es',
    locales: {
      es: 'Español',
      en: 'English',
    },
    language: 'es',
  },
  THEME: {
    default: 'light',
    themes: ['light', 'dark'],
    colors: {
      light: {
        primary: '#3B82F6',
        secondary: '#6366F1',
        accent: '#10B981',
      },
      dark: {
        primary: '#2563EB',
        secondary: '#4F46E5',
        accent: '#059669',
      }
    }
  },
  // Agrega la configuración de UI
  UI: {
    theme: 'system' // o 'light', 'dark', según tu preferencia
  },
};

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
  ],
  output: 'static',
  vite: {
    plugins: [
      {
        name: 'astrowind-config',
        resolveId(id) {
          if (id === 'astrowind:config') {
            return '\0' + id;
          }
        },
        load(id) {
          if (id === '\0astrowind:config') {
            return `export const SITE = ${JSON.stringify(astroWindConfig.SITE)};
                    export const APP_BLOG = ${JSON.stringify(astroWindConfig.APP_BLOG)};
                    export const I18N = ${JSON.stringify(astroWindConfig.I18N)};
                    export const THEME = ${JSON.stringify(astroWindConfig.THEME)};
                    export const UI = ${JSON.stringify(astroWindConfig.UI)};`;
          }
        }
      }
    ]
  }
});
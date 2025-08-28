declare module 'astrowind:config' {
  export const SITE: {
    base: string;
    site: string;
    trailingSlash: boolean;
  };
  
  export const APP_BLOG: {
    enabled: boolean;
    path: string;
    postsPerPage: number;
    list: {
      pathname: string;
    };
    category: {
      pathname: string;
    };
    tag: {
      pathname: string;
    };
    post: {
      permalink: string;
    };
  };

  export const I18N: {
    defaultLocale: string;
    locales: Record<string, string>;
    language: string;
  };

  export const THEME: {
    default: string;
    themes: string[];
    colors: {
      light: {
        primary: string;
        secondary: string;
        accent: string;
      };
      dark: {
        primary: string;
        secondary: string;
        accent: string;
      };
    };
  };

  export const UI: {
    theme: string;
  };
}

declare module 'virtual:astro-icon' {
  export { default } from 'astro-icon/components/Icon.astro';
}
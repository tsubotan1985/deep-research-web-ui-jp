import { version as projVersion } from './public/version.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],

  // プライバシー保護: Nuxtテレメトリーを無効化
  telemetry: false,

  runtimeConfig: {
    public: {
      version: projVersion,
      serverMode: process.env.NUXT_PUBLIC_SERVER_MODE === 'true',
      // Server mode configuration - exposed to frontend
      aiProvider: process.env.NUXT_PUBLIC_AI_PROVIDER || 'openai-compatible',
      aiModel: process.env.NUXT_PUBLIC_AI_MODEL || 'gpt-4o-mini',
      aiContextSize: parseInt(process.env.NUXT_PUBLIC_AI_CONTEXT_SIZE || '128000'),
      webSearchProvider: process.env.NUXT_PUBLIC_WEB_SEARCH_PROVIDER || 'tavily',
      webSearchConcurrencyLimit: parseInt(process.env.NUXT_PUBLIC_WEB_SEARCH_CONCURRENCY_LIMIT || '2'),
      webSearchSearchLanguage: process.env.NUXT_PUBLIC_WEB_SEARCH_SEARCH_LANGUAGE || 'en',
      tavilyAdvancedSearch: process.env.NUXT_PUBLIC_TAVILY_ADVANCED_SEARCH === 'true',
      tavilySearchTopic: process.env.NUXT_PUBLIC_TAVILY_SEARCH_TOPIC || 'general',
      googlePseId: process.env.NUXT_PUBLIC_GOOGLE_PSE_ID,
    },
    // Private server-only configuration
    aiApiKey: process.env.NUXT_AI_API_KEY,
    aiApiBase: process.env.NUXT_AI_API_BASE,
    webSearchApiKey: process.env.NUXT_WEB_SEARCH_API_KEY,
    webSearchApiBase: process.env.NUXT_WEB_SEARCH_API_BASE,
  },

  routeRules: {
    '/version.json': {
      cors: true,
      cache: false,
    },
  },

  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'no_prefix',
    locales: ['en', 'ja', 'fr'],
    detectBrowserLanguage: {
      alwaysRedirect: true,
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    classSuffix: '',
    storage: 'cookie',
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('js-tiktoken')) {
              return 'tiktoken'
            }
          },
        },
      },
    },
  },

  nitro: {
    compressPublicAssets: { brotli: true, gzip: true },
  },

  typescript: {
    // Customize app/server TypeScript config
    tsConfig: {
      compilerOptions: {
        strict: true,
      },
    },
    // Customize build-time TypeScript config
    nodeTsConfig: {
      compilerOptions: {
        strict: true,
      },
    },
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-29',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
})

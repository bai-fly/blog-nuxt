// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'flytsuki',
      htmlAttrs: {
        lang: 'zh-cn'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          type: 'text/javascript',
          src: 'https://www.googletagmanager.com/gtag/js?id=G-F5K3V2BDHC',
          async: true,
        },
        {
          type: 'text/javascript',
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());

            gtag('config', 'G-F5K3V2BDHC');
          `,
        },
        {
          type: 'text/javascript',
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3671634994606886',
          async: true,
          crossorigin: 'anonymous',
        },
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiPrefix: 'https://flytsuki.top',
    }
  },

  modules: ['@nuxt/ui', '@nuxtjs/mdc', '@pinia/nuxt'],
  mdc: {
    remarkPlugins: {
      emoji: {
        src: 'remark-emoji'
      }
    }
  },
})
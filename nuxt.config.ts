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
    }
  },
  runtimeConfig: {
    public: {
      apiPrefix: 'https://flytsuki.top',
    }
  },

  modules: ['@nuxt/ui', '@nuxtjs/mdc', '@pinia/nuxt']
})
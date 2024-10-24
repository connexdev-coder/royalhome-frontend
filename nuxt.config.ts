// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: { pageTransition: { name: "page", mode: "default" } },

  compatibilityDate: "2024-08-21",

  experimental: {
    typedPages: true,
  },

  devtools: { enabled: true },

  modules: [
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxt/content",
    "shadcn-nuxt",
    "@pinia/nuxt",
  ],

  i18n: {
    vueI18n: "./i18n.config.ts",
  },

  runtimeConfig: {
    public: {
      api_url: process.env.API,
    },
  },

  shadcn: {
    componentDir: "./components/ui",
  },

  css: ["~/assets/css/global.css"],
});

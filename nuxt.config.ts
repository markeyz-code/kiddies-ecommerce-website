import { fileURLToPath, URL } from 'url';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'app/',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image'],
  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url)),
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      paystackPublicKey: process.env.NUXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    }
  },
  app: {
    head: {
      script: [
        { src: 'https://js.paystack.co/v1/inline.js' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&f[]=clash-display@200,400,700,500,600,300&display=swap' }
      ]
    }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Satoshi', 'sans-serif'],
            serif: ['Clash Display', 'sans-serif'],
          }
        }
      }
    }
  }
})

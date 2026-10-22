import { fileURLToPath, URL } from 'url';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'app/',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
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
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap' }
      ]
    }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Outfit', 'sans-serif'],
            display: ['Fraunces', 'Georgia', 'serif'],
            serif: ['Fraunces', 'Georgia', 'serif'],
          },
          colors: {
            brand: {
              50: '#F3F7FA', 100: '#E4EDF4', 200: '#C8DBE8', 300: '#9CBED3',
              400: '#689BB8', 500: '#467F9E', 600: '#356582', 700: '#2C5169',
              800: '#274557', 900: '#1A365D', 950: '#0F233D'
            },
            coral: {
              50: '#FFF4F1', 100: '#FFE5DE', 200: '#FFC9BB', 300: '#FFA490',
              400: '#F97B61', 500: '#E85D45', 600: '#D4442E', 700: '#B23422',
              800: '#8F2A1C', 900: '#742519'
            },
            cream: {
              50: '#FDFBF7', 100: '#F9F4EC', 200: '#F2E8D9', 300: '#E8D8C3',
              400: '#D9C3A5'
            }
          }
        }
      }
    }
  }
})

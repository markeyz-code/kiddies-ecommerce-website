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
      apiBase: process.env.VITE_BASE_URL || 'https://kidies-backend-7ald.onrender.com',
    }
  },
  app: {
    head: {
      title: 'JasmarKids by Tayisi | Kids Clothing',
      titleTemplate: '%s · JasmarKids by Tayisi',
      meta: [
        { name: 'description', content: 'Thoughtfully designed kids clothing and accessories — soft fabrics, playful details and everyday comfort for babies, toddlers and children.' },
        { name: 'theme-color', content: '#1A3578' },
        { property: 'og:site_name', content: 'JasmarKids by Tayisi' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
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
              50: '#F2FBFF', 100: '#E1F6FE', 200: '#C4EDFC', 300: '#9ADFF9',
              400: '#67CDF4', 500: '#38B8EC', 600: '#1D9ED3', 700: '#157FAC',
              800: '#166A8C', 900: '#15536B', 950: '#0C3445'
            },
            coral: {
              50: '#FFF5FA', 100: '#FFE7F2', 200: '#FFCEE5', 300: '#FFA9D2',
              400: '#FF7DBA', 500: '#F45FA8', 600: '#D9458C', 700: '#B33370',
              800: '#8C2A58', 900: '#6B2342'
            },
            cream: {
              50: '#FFFBFD', 100: '#FFF5F9', 200: '#FBE7EF', 300: '#F5D5E1',
              400: '#EABBCD'
            },
            ink: {
              DEFAULT: '#263243', 500: '#5C6878', 700: '#334155'
            }
          }
        }
      }
    }
  }
})

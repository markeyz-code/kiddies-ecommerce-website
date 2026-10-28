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
      title: 'JasmarKids | Premium Kids Fashion',
      titleTemplate: '%s · JasmarKids',
      meta: [
        { name: 'description', content: 'Thoughtfully designed kids clothing and accessories — soft fabrics, playful details and everyday comfort for babies, toddlers and children.' },
        { name: 'theme-color', content: '#1A3578' },
        { property: 'og:site_name', content: 'JasmarKids' },
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
              50: '#EFF5FF', 100: '#DBE8FF', 200: '#BCD4FF', 300: '#8FB5FF',
              400: '#5D8FF5', 500: '#3B74E8', 600: '#2A5CCB', 700: '#224AA8',
              800: '#1E3F8C', 900: '#1A3578', 950: '#101F4A'
            },
            coral: {
              50: '#FFF6FA', 100: '#FFEAF3', 200: '#FFD3E5', 300: '#FFB3D3',
              400: '#FF8FBE', 500: '#F46BA6', 600: '#D94F8A', 700: '#B53A6E',
              800: '#8E2D56', 900: '#6B2242'
            },
            cream: {
              50: '#FFFBFC', 100: '#FFF4F8', 200: '#FBE6EE', 300: '#F5D3E0',
              400: '#EABBCD'
            }
          }
        }
      }
    }
  }
})

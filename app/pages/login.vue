<template>
  <div class="min-h-screen grid grid-cols-1 md:grid-cols-2 relative bg-amber-50/30 overflow-hidden">
    <!-- Left Column: Form -->
    <div class="flex items-center justify-center p-8 md:p-16 z-10 bg-white border-r border-stone-200 rounded-r-[4rem] md:rounded-r-[6rem]">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-block mb-4 text-4xl font-serif font-black text-sky-500 tracking-tight hover:scale-105 transition-transform origin-left">JasmarKids ✨</NuxtLink>
          <h1 class="text-3xl font-serif font-black text-stone-800 mb-2">Welcome Back! 👋</h1>
          <p class="text-stone-500 font-medium text-base">Please enter your details to sign in.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div v-if="authError" class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold flex items-center gap-2">
            <span>⚠️</span> {{ authError }}
          </div>

          <CustomInput
            id="email"
            v-model="email"
            type="email"
            label="Email Address"
            placeholder="parent@example.com"
            required
          />

          <div>
            <CustomInput
              id="password"
              v-model="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              required
            />
            <div class="flex justify-end mt-2">
              <NuxtLink to="/forgot-password" class="text-xs font-bold text-sky-500 hover:text-sky-600 hover:underline">
                Forgot password?
              </NuxtLink>
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-black rounded-full text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-all duration-300 disabled:opacity-50 tracking-wide mb-6"
            >
              {{ loading ? 'Signing in...' : 'Sign In 🚀' }}
            </button>

            <div class="relative flex py-2 items-center mb-6">
              <div class="flex-grow border-t border-stone-200"></div>
              <span class="flex-shrink mx-4 text-stone-400 font-bold text-xs uppercase tracking-widest">Or continue with</span>
              <div class="flex-grow border-t border-stone-200"></div>
            </div>

            <button
              type="button"
              @click="handleGoogleLogin"
              :disabled="loading"
              class="group relative w-full flex justify-center items-center py-3.5 px-4 border border-stone-200 text-sm font-black rounded-full text-stone-700 bg-white hover:bg-stone-50 hover:border-stone-300 focus:outline-none focus:ring-4 focus:ring-stone-100 transition-all disabled:opacity-70 tracking-wide"
            >
              <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Google
            </button>
          </div>
        </form>

        <p class="mt-6 text-center text-sm font-medium text-stone-500">
          Don't have an account?
          <NuxtLink to="/register" class="font-bold text-rose-500 hover:text-rose-600 hover:underline">
            Create account
          </NuxtLink>
        </p>
      </div>
    </div>

    <!-- Right Column: Child Animation & Illustration -->
    <div class="hidden md:flex relative flex-col items-center justify-center bg-amber-50/50 p-8 overflow-hidden">
      <!-- Central Hero Photo & SVG Animation -->
      <div class="relative z-20 flex flex-col items-center justify-center max-w-md w-full">
        <div class="bg-white p-3 rounded-[3rem] border border-stone-200 transform -rotate-2 hover:rotate-0 transition-transform duration-500 mb-6">
          <img src="@/assets/hero1.jpg" alt="Happy child" class="w-72 h-80 object-cover rounded-[2.5rem]" />
        </div>
        
        <!-- Kids Playing Animated SVG -->
        <div class="w-80 z-30 hover:scale-105 transition-transform duration-300">
          <img src="@/assets/kids playing - kidcare.svg" alt="Kids Playing Animation" class="w-full h-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/modules/auth/useAuth';

definePageMeta({
  layout: false
});

const { login, socialLogin, loading, authError } = useAuth();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const nuxtApp = useNuxtApp();

const handleLogin = () => {
  login({ email: email.value, password: password.value });
};

const handleGoogleLogin = async () => {
  const auth = nuxtApp.$firebaseAuth;
  
  if (!auth) {
    alert('Firebase Auth not initialized. Please refresh the page and try again.');
    return;
  }

  try {
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;
    
    const names = firebaseUser.displayName?.split(' ') || ['Google', 'User'];
    
    const response = await socialLogin({
      email: firebaseUser.email,
      firstName: names[0],
      lastName: names.length > 1 ? names.slice(1).join(' ') : '',
      providerId: firebaseUser.uid
    });

    if (response) {
      const redirect = useRoute().query.redirect || '/';
      setTimeout(() => {
        window.location.href = redirect;
      }, 500);
    }
  } catch (error) {
    console.error('Google login error:', error);
    alert('Google Sign-In failed: ' + (error.message || 'Unknown error'));
  }
};
</script>

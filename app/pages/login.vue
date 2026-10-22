<template>
  <div class="min-h-screen bg-stone-50 flex">
    <!-- Left: Form Section -->
    <div class="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 relative z-10 bg-white shadow-2xl">
      <div class="absolute top-8 left-8 sm:left-12 lg:left-24">
        <NuxtLink to="/" class="text-brand-900 hover:opacity-75 transition-opacity flex items-center font-bold text-sm tracking-widest uppercase">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Store
        </NuxtLink>
      </div>
      
      <div class="w-full max-w-md mx-auto mt-16">
        <h1 class="text-4xl font-serif font-black text-stone-900 mb-2">Welcome Back 👋</h1>
        <p class="text-stone-500 font-medium mb-10 text-sm">Sign in to access your saved outfits and faster checkout.</p>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-1">
            <label class="text-xs font-black uppercase tracking-widest text-stone-700 ml-1">Email Address</label>
            <input 
              v-model="loginData.email" 
              type="email" 
              required
              placeholder="hello@example.com"
              class="w-full px-5 py-3.5 rounded-2xl bg-stone-100/50 border-2 border-stone-200 focus:border-brand-900 focus:bg-white focus:ring-0 outline-none transition-all font-medium text-stone-800 placeholder:text-stone-400"
            >
          </div>
          
          <div class="space-y-1 relative">
            <div class="flex justify-between items-center ml-1">
              <label class="text-xs font-black uppercase tracking-widest text-stone-700">Password</label>
              <NuxtLink to="/forgot-password" class="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors">Forgot?</NuxtLink>
            </div>
            <input 
              v-model="loginData.password" 
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full px-5 py-3.5 rounded-2xl bg-stone-100/50 border-2 border-stone-200 focus:border-brand-900 focus:bg-white focus:ring-0 outline-none transition-all font-medium text-stone-800 placeholder:text-stone-400"
            >
            <button type="button" @click="showPassword = !showPassword" class="absolute right-4 bottom-3.5 text-stone-400 hover:text-stone-600">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0l3.29 3.29m0 0l3.29 3.29m0 0l3.29 3.29m0 0l3.29 3.29" /></svg>
            </button>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-brand-900 text-white font-black py-4 rounded-2xl hover:bg-brand-800 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-wide text-sm flex items-center justify-center"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-6 flex items-center justify-between">
          <span class="w-1/5 border-b border-stone-200 lg:w-1/4"></span>
          <a href="#" class="text-xs text-center text-stone-500 uppercase font-black tracking-widest">or continue with</a>
          <span class="w-1/5 border-b border-stone-200 lg:w-1/4"></span>
        </div>

        <div class="flex items-center gap-4 mt-6">
          <button @click="handleSocialLogin('google')" type="button" class="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-stone-200 rounded-2xl hover:bg-stone-50 hover:border-stone-300 transition-all">
            <svg class="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/><path fill="none" d="M1 1h22v22H1z"/></svg>
            <span class="font-bold text-sm text-stone-700">Continue with Google</span>
          </button>
        </div>

        <div class="mt-8 text-center text-sm font-medium text-stone-500">
          New to JasmarKids? 
          <NuxtLink to="/register" class="font-black text-brand-900 hover:underline underline-offset-2 ml-1">Create an account</NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Right: Visual Section -->
    <div class="hidden lg:block lg:w-[55%] relative overflow-hidden bg-amber-100">
      <div class="absolute inset-0 bg-gradient-to-br from-[#1a365d]/40 to-transparent z-10 mix-blend-multiply"></div>
      <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&h=1600&fit=crop" class="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-[10s] ease-out" alt="Kids playing" />
      
      <div class="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-12">
        <h2 class="text-6xl font-serif italic font-light drop-shadow-xl mb-4">Picture Perfect</h2>
        <p class="text-xl font-medium max-w-md drop-shadow-lg opacity-90">Join the club for exclusive offers, early access to sales, and faster checkouts.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' });

import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '~/composables/modules/auth/useAuth';

const router = useRouter();
const route = useRoute();
const { login, socialLogin, loading, user, fetchProfile } = useAuth();

const showPassword = ref(false);

const loginData = ref({
  email: '',
  password: ''
});

onMounted(async () => {
  await fetchProfile();
  if (user.value) {
    router.push(route.query.redirect || '/');
  }
});

const handleLogin = async () => {
  const success = await login(loginData.value);
  if (success) {
    router.push(route.query.redirect || '/');
  }
};

const handleSocialLogin = async (provider) => {
  const success = await socialLogin(provider);
  if (success) {
    router.push(route.query.redirect || '/');
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-stone-100">
      <div class="text-center">
        <NuxtLink to="/" class="inline-block mb-6 text-3xl font-serif font-bold text-emerald-600 tracking-tight">JasmarKids</NuxtLink>
        <h2 class="text-3xl font-serif font-bold text-stone-900 tracking-tight">Forgot password</h2>
        <p class="mt-2 text-sm text-stone-500">
          Remembered it?
          <NuxtLink to="/login" class="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
            Sign in
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleForgotPassword">
        <div class="space-y-5">
          <div>
            <label for="email-address" class="block text-sm font-medium text-stone-700 mb-1">Email address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              </div>
              <input id="email-address" v-model="email" name="email" type="email" autocomplete="email" required class="block w-full pl-10 pr-3 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all sm:text-sm" placeholder="you@example.com" />
            </div>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading" class="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ loading ? 'Sending...' : 'Send reset link' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/modules/auth/useAuth';

definePageMeta({
  layout: false
});

const { forgotPassword, loading } = useAuth();
const email = ref('');

const handleForgotPassword = () => {
  forgotPassword({ email: email.value });
};
</script>

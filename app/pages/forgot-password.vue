<template>
  <div class="min-h-screen bg-stone-50 flex">
    <!-- Left: Form Section -->
    <div class="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 relative z-10 bg-white shadow-2xl py-12 lg:py-0 overflow-y-auto">
      <div class="absolute top-8 left-8 sm:left-12 lg:left-24">
        <NuxtLink to="/login" class="text-brand-900 hover:opacity-75 transition-opacity flex items-center font-bold text-sm tracking-widest uppercase">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Login
        </NuxtLink>
      </div>
      
      <div class="w-full max-w-md mx-auto mt-16 lg:mt-0">
        <h1 class="text-4xl font-serif font-black text-stone-900 mb-2">Reset Password 🔑</h1>
        <p class="text-stone-500 font-medium mb-10 text-sm">Forgot your password? No worries. Just enter the email address you signed up with and we'll send you a reset link.</p>
        
        <form @submit.prevent="handleForgotPassword" class="space-y-6">
          <div class="space-y-1">
            <label class="text-xs font-black uppercase tracking-widest text-stone-700 ml-1">Email Address</label>
            <input 
              v-model="email" 
              type="email" 
              required
              placeholder="hello@example.com"
              class="w-full px-5 py-3.5 rounded-2xl bg-stone-100/50 border-2 border-stone-200 focus:border-brand-900 focus:bg-white focus:ring-0 outline-none transition-all font-medium text-stone-800 placeholder:text-stone-400"
            >
          </div>
          
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-brand-900 text-white font-black py-4 rounded-2xl hover:bg-brand-800 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-wide text-sm flex items-center justify-center"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ loading ? 'Sending reset link...' : 'Send Reset Link' }}
          </button>
        </form>

        <div v-if="message" class="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-start gap-3">
          <span class="text-xl">✅</span>
          <div>
            <p>{{ message }}</p>
            <NuxtLink v-if="demoResetLink" :to="demoResetLink" class="inline-block mt-2 underline underline-offset-2 text-emerald-900">
              Local/demo mode: open your reset link →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Right: Visual Section -->
    <div class="hidden lg:block lg:w-[55%] relative overflow-hidden bg-sky-100">
      <div class="absolute inset-0 bg-gradient-to-br from-sky-900/40 to-transparent z-10 mix-blend-multiply"></div>
      <img src="https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=1200&h=1600&fit=crop" class="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-[10s] ease-out" alt="Cute toddler in overalls" />
      
      <div class="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-12">
        <h2 class="text-6xl font-serif italic font-light drop-shadow-xl mb-4 text-white">We've got you</h2>
        <p class="text-xl font-medium max-w-md drop-shadow-lg opacity-90 text-white">Get back to shopping in no time.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' });
import { ref } from 'vue';
import { useAuth } from '~/composables/modules/auth/useAuth';

const { forgotPassword, loading } = useAuth();
const email = ref('');
const message = ref('');
const demoResetLink = ref('');

const handleForgotPassword = async () => {
  const result = await forgotPassword(email.value);
  if (result) {
    message.value = 'Password reset instructions have been sent to your email address.';
    if (result.resetToken) {
      demoResetLink.value = `/reset-password?token=${result.resetToken}`;
    }
    email.value = ''; // clear input
  }
};
</script>

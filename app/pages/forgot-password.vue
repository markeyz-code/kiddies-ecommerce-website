<template>
  <div class="h-screen max-h-screen w-full overflow-hidden bg-cream-50 flex flex-col lg:flex-row">
    <!-- Left: Form Section -->
    <div class="w-full lg:w-[48%] xl:w-[42%] h-full overflow-y-auto bg-white flex flex-col justify-between px-6 sm:px-12 lg:px-14 xl:px-16 py-8 lg:py-10 hide-scrollbar z-10 shadow-xl border-r border-stone-100">
      
      <!-- Top: Back Button Navigation -->
      <div class="w-full max-w-md mx-auto mb-6">
        <NuxtLink 
          to="/login" 
          class="inline-flex items-center gap-2.5 text-stone-500 hover:text-brand-900 transition-colors text-xs font-bold tracking-widest uppercase group py-1"
        >
          <span class="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-brand-900 group-hover:text-white transition-all shadow-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </span>
          <span>Back to Login</span>
        </NuxtLink>
      </div>

      <!-- Main Form Area -->
      <div class="w-full max-w-md mx-auto my-auto py-4">
        <div class="mb-7">
          <span class="inline-block text-[10px] font-black uppercase tracking-widest text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md mb-2.5 border border-sky-200/60">
            Account Recovery
          </span>
          <h1 class="font-display text-3xl sm:text-4xl font-semibold text-brand-900 tracking-tight">Reset your password</h1>
          <p class="text-stone-500 font-normal mt-1.5 text-sm">Enter the email associated with your account and we'll send you reset instructions.</p>
        </div>
        
        <form @submit.prevent="handleForgotPassword" class="space-y-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">Email Address</label>
            <input 
              v-model="email" 
              type="email" 
              required
              placeholder="hello@example.com"
              class="w-full px-4 py-2.5 rounded-xl bg-stone-50/70 hover:bg-stone-50 focus:bg-white border border-stone-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none transition-all font-medium text-sm text-stone-800 placeholder:text-stone-400"
            >
          </div>
          
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-brand-900 text-white font-bold py-3.5 rounded-xl hover:bg-brand-800 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xs hover:shadow-sm tracking-wide text-sm flex items-center justify-center mt-3 cursor-pointer"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Sending reset link...' : 'Send Reset Link' }}
          </button>
        </form>

        <div v-if="message" class="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-3">
          <span class="text-base">✅</span>
          <div>
            <p>{{ message }}</p>
            <NuxtLink v-if="demoResetLink" :to="demoResetLink" class="inline-block mt-2 underline underline-offset-2 text-emerald-900 font-bold">
              Local/demo mode: open your reset link →
            </NuxtLink>
          </div>
        </div>

        <div class="mt-7 text-center text-xs text-stone-500">
          Remember your password? 
          <NuxtLink to="/login" class="font-bold text-brand-900 hover:underline underline-offset-4 ml-1">Back to sign in</NuxtLink>
        </div>
      </div>

      <!-- Bottom Footnote -->
      <div class="w-full max-w-md mx-auto pt-4 text-center">
        <p class="text-[11px] text-stone-400">© {{ new Date().getFullYear() }} JasmarKids Inc. All rights reserved.</p>
      </div>
    </div>
    
    <!-- Right: Visual Section (Sticky) -->
    <div class="hidden lg:flex lg:w-[52%] xl:w-[58%] h-full relative overflow-hidden bg-brand-950 items-center justify-center sticky top-0 select-none">
      <img 
        src="/img/auth_login_kids.jpg" 
        class="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-[12s] ease-out" 
        alt="Happy children in warm knitwear" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/30 to-brand-950/20 z-10"></div>
      <div class="absolute inset-x-8 bottom-12 z-20 max-w-lg mx-auto text-center text-white p-8 rounded-3xl bg-brand-950/40 backdrop-blur-md border border-white/15 shadow-2xl">
        <span class="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm mb-3">
          Account Support
        </span>
        <h2 class="text-4xl xl:text-5xl font-display font-light italic mb-3 text-white drop-shadow-md">
          We've got you covered
        </h2>
        <p class="text-sm xl:text-base font-normal text-cream-100 opacity-95 leading-relaxed max-w-md mx-auto">
          Recover access in a few taps and get back to dressing your little ones in premium comfort.
        </p>
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
    email.value = '';
  }
};
</script>

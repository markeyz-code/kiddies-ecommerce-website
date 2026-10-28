<template>
  <div class="h-screen max-h-screen w-full overflow-hidden bg-cream-50 flex flex-col lg:flex-row">
    <!-- Left: Form Section -->
    <div class="w-full lg:w-[48%] xl:w-[42%] h-full overflow-y-auto bg-white flex flex-col justify-between px-6 sm:px-12 lg:px-14 xl:px-16 py-8 lg:py-10 hide-scrollbar z-10 shadow-xl border-r border-cream-100">
      
      <!-- Top: Back Button Navigation -->
      <div class="w-full max-w-md mx-auto mb-6">
        <NuxtLink 
          to="/login" 
          class="inline-flex items-center gap-2.5 text-brand-500 hover:text-brand-900 transition-colors text-xs font-bold tracking-widest uppercase group py-1"
        >
          <span class="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-brand-500 group-hover:bg-brand-700 group-hover:text-white transition-all shadow-xs">
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
          <span class="inline-block text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md mb-2.5 border border-emerald-200/60">
            Security Update
          </span>
          <h1 class="font-display text-3xl sm:text-4xl font-semibold text-brand-900 tracking-tight">Set a new password</h1>
          <p class="text-brand-500 font-normal mt-1.5 text-sm">Create a strong password with at least 8 characters to secure your account.</p>
        </div>
        
        <form @submit.prevent="handleResetPassword" class="space-y-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase tracking-wider text-brand-500 block">New Password</label>
            <div class="relative">
              <input 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full px-4 py-2.5 pr-11 rounded-xl bg-cream-50/70 hover:bg-cream-50 focus:bg-white border border-cream-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none transition-all font-medium text-sm text-brand-800 placeholder:text-brand-400"
              >
              <button 
                type="button" 
                @click="showPassword = !showPassword" 
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-500 p-1"
                aria-label="Toggle password visibility"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0l3.29 3.29m0 0l3.29 3.29m0 0l3.29 3.29" />
                </svg>
              </button>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase tracking-wider text-brand-500 block">Confirm New Password</label>
            <input 
              v-model="confirmPassword" 
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full px-4 py-2.5 rounded-xl bg-cream-50/70 hover:bg-cream-50 focus:bg-white border border-cream-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none transition-all font-medium text-sm text-brand-800 placeholder:text-brand-400"
            >
          </div>
          
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-brand-700 text-white font-bold py-3.5 rounded-xl hover:bg-brand-800 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xs hover:shadow-sm tracking-wide text-sm flex items-center justify-center mt-3 cursor-pointer"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Updating password...' : 'Update Password' }}
          </button>
        </form>

        <div class="mt-7 text-center text-xs text-brand-500">
          Remembered your old password? 
          <NuxtLink to="/login" class="font-bold text-brand-900 hover:underline underline-offset-4 ml-1">Back to sign in</NuxtLink>
        </div>
      </div>

      <!-- Bottom Footnote -->
      <div class="w-full max-w-md mx-auto pt-4 text-center">
        <p class="text-[11px] text-brand-400">© {{ new Date().getFullYear() }} JasmarKids Inc. All rights reserved.</p>
      </div>
    </div>
    
    <!-- Right: Visual Section (Sticky) -->
    <div class="hidden lg:flex lg:w-[52%] xl:w-[58%] h-full relative overflow-hidden bg-brand-950 items-center justify-center sticky top-0 select-none">
      <img 
        src="/img/auth_signup_kids.jpg" 
        class="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-[12s] ease-out" 
        alt="Children smiling together outdoors" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/30 to-brand-950/20 z-10"></div>
      <div class="absolute inset-x-8 bottom-12 z-20 max-w-lg mx-auto text-center text-white p-8 rounded-3xl bg-brand-950/40 backdrop-blur-md border border-white/15 shadow-2xl">
        <span class="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm mb-3">
          Safe &amp; Secure
        </span>
        <h2 class="text-4xl xl:text-5xl font-display font-light italic mb-3 text-white drop-shadow-md">
          Protected accounts
        </h2>
        <p class="text-sm xl:text-base font-normal text-cream-100 opacity-95 leading-relaxed max-w-md mx-auto">
          Your account security matters to us so you can shop for your little ones with complete peace of mind.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' });
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '~/composables/modules/auth/useAuth';
import { useCustomToast } from '~/composables/core/useCustomToast';

const router = useRouter();
const route = useRoute();
const { resetPassword, loading } = useAuth();
const { showToast } = useCustomToast();

const showPassword = ref(false);
const password = ref('');
const confirmPassword = ref('');

const handleResetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    showToast({
      title: 'Passwords Mismatch',
      message: 'The new passwords do not match. Please verify.',
      type: 'error'
    });
    return;
  }
  
  const token = route.query.token;
  if (!token) {
    showToast({
      title: 'Missing Token',
      message: 'No reset token found. Please request a new link from the forgot password page.',
      type: 'error'
    });
    return;
  }

  const result = await resetPassword({ token, newPassword: password.value });
  if (result) {
    showToast({
      title: 'Password Updated',
      message: 'Your password has been changed successfully. Please log in.',
      type: 'success'
    });
    router.push('/login');
  }
};
</script>

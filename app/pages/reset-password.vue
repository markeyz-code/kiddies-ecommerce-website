<template>
  <div class="min-h-screen bg-stone-50 flex">
    <!-- Left: Form Section -->
    <div class="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 relative z-10 bg-white shadow-2xl py-12 lg:py-0 overflow-y-auto">
      <div class="absolute top-8 left-8 sm:left-12 lg:left-24">
        <NuxtLink to="/login" class="text-[#1a365d] hover:opacity-75 transition-opacity flex items-center font-bold text-sm tracking-widest uppercase">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Login
        </NuxtLink>
      </div>
      
      <div class="w-full max-w-md mx-auto mt-16 lg:mt-0">
        <h1 class="text-4xl font-serif font-black text-stone-900 mb-2">Create New Password 🔒</h1>
        <p class="text-stone-500 font-medium mb-10 text-sm">Please enter your new password below.</p>
        
        <form @submit.prevent="handleResetPassword" class="space-y-6">
          <div class="space-y-1 relative">
            <label class="text-xs font-black uppercase tracking-widest text-stone-700 ml-1">New Password</label>
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full px-5 py-3.5 rounded-2xl bg-stone-100/50 border-2 border-stone-200 focus:border-[#1a365d] focus:bg-white focus:ring-0 outline-none transition-all font-medium text-stone-800 placeholder:text-stone-400"
            >
            <button type="button" @click="showPassword = !showPassword" class="absolute right-4 bottom-3.5 text-stone-400 hover:text-stone-600">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0l3.29 3.29m0 0l3.29 3.29m0 0l3.29 3.29m0 0l3.29 3.29" /></svg>
            </button>
          </div>

          <div class="space-y-1 relative">
            <label class="text-xs font-black uppercase tracking-widest text-stone-700 ml-1">Confirm New Password</label>
            <input 
              v-model="confirmPassword" 
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full px-5 py-3.5 rounded-2xl bg-stone-100/50 border-2 border-stone-200 focus:border-[#1a365d] focus:bg-white focus:ring-0 outline-none transition-all font-medium text-stone-800 placeholder:text-stone-400"
            >
          </div>
          
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-[#1a365d] text-white font-black py-4 rounded-2xl hover:bg-[#112a4a] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-wide text-sm flex items-center justify-center"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ loading ? 'Saving...' : 'Reset Password' }}
          </button>
        </form>
      </div>
    </div>
    
    <!-- Right: Visual Section -->
    <div class="hidden lg:block lg:w-[55%] relative overflow-hidden bg-teal-100">
      <div class="absolute inset-0 bg-gradient-to-br from-teal-900/40 to-transparent z-10 mix-blend-multiply"></div>
      <img src="https://images.unsplash.com/photo-1542385151-efd9000785a0?w=1200&h=1600&fit=crop" class="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-[10s] ease-out" alt="Secure account" />
      
      <div class="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-12">
        <h2 class="text-6xl font-serif italic font-light drop-shadow-xl mb-4 text-white">Safe & Secure</h2>
        <p class="text-xl font-medium max-w-md drop-shadow-lg opacity-90 text-white">Your privacy is our priority.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' });
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '~/composables/modules/auth/useAuth';
import { useCustomToast } from '~/composables/core/useCustomToast';

const route = useRoute();
const router = useRouter();
const { resetPassword, loading } = useAuth();
const { showToast } = useCustomToast();

const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const token = ref('');

onMounted(() => {
  if (route.query.token) {
    token.value = route.query.token;
  } else {
    showToast({
      title: 'Invalid Request',
      message: 'Password reset token is missing.',
      toastType: 'error'
    });
    router.push('/login');
  }
});

const handleResetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    showToast({
      title: 'Passwords do not match',
      message: 'Please ensure both passwords are exactly the same.',
      toastType: 'error'
    });
    return;
  }

  const success = await resetPassword(token.value, password.value);
  if (success) {
    router.push('/login');
  }
};
</script>

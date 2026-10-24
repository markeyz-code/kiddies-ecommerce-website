<template>
  <div class="min-h-screen bg-cream-50 flex">
    <!-- Left: Form Section -->
    <div class="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 relative z-10 bg-white shadow-2xl py-12 lg:py-0 overflow-y-auto">
      <div class="absolute top-8 left-8 sm:left-12 lg:left-24">
        <NuxtLink to="/login" class="text-brand-900 hover:opacity-75 transition-opacity flex items-center font-bold text-sm tracking-widest uppercase">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Login
        </NuxtLink>
      </div>
      
      <div class="w-full max-w-md mx-auto mt-16 lg:mt-0">
        <h1 class="mb-2 font-display text-4xl font-semibold text-brand-900">Verify your email</h1>
        <p class="text-stone-500 font-medium mb-10 text-sm">We've sent a 6-digit code to <span class="font-bold text-stone-800">{{ email }}</span>. Please enter it below.</p>

        <div v-if="demoOtp" class="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          Local/demo mode: your verification code is <span class="font-black tracking-widest">{{ demoOtp }}</span> (pre-filled below).
        </div>
        
        <form @submit.prevent="handleVerify" class="space-y-6">
          <div class="space-y-1 relative">
            <label class="text-xs font-black uppercase tracking-widest text-stone-700 ml-1">6-Digit Code</label>
            <input 
              v-model="code" 
              type="text" 
              required
              maxlength="6"
              placeholder="123456"
              class="w-full px-5 py-3.5 rounded-2xl bg-stone-100/50 border-2 border-stone-200 focus:border-brand-900 focus:bg-white focus:ring-0 outline-none transition-all font-medium text-stone-800 placeholder:text-stone-400 text-center tracking-[0.5em] text-2xl"
            >
          </div>
          
          <button 
            type="submit" 
            :disabled="loading || code.length !== 6"
            class="w-full bg-brand-900 text-white font-black py-4 rounded-2xl hover:bg-brand-800 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-wide text-sm flex items-center justify-center"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ loading ? 'Verifying...' : 'Verify Code' }}
          </button>
        </form>

        <div class="mt-8 text-center text-sm font-medium text-stone-500">
          Didn't receive the code? 
          <button @click="handleResend" :disabled="loading" class="font-black text-brand-900 hover:underline underline-offset-2 ml-1 disabled:opacity-50">
            Resend it
          </button>
        </div>
      </div>
    </div>
    
    <!-- Right: Visual Section -->
    <div class="hidden lg:block lg:w-[55%] relative overflow-hidden bg-indigo-100">
      <div class="absolute inset-0 bg-gradient-to-br from-brand-900/45 to-transparent z-10 mix-blend-multiply"></div>
      <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&h=1600&fit=crop" class="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-[10s] ease-out" alt="Kids playing" />
      
      <div class="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-12">
        <h2 class="text-6xl font-serif italic font-light drop-shadow-xl mb-4 text-white">Almost there</h2>
        <p class="text-xl font-medium max-w-md drop-shadow-lg opacity-90 text-white">Verify your email to start shopping.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' });
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '~/composables/modules/auth/useAuth';

const route = useRoute();
const router = useRouter();
const { verifyOtp, resendOtp, loading } = useAuth();

const email = ref('');
const code = ref('');
const demoOtp = ref('');

onMounted(() => {
  if (route.query.email) {
    email.value = route.query.email;
    const stored = sessionStorage.getItem(`demo_otp_${email.value}`);
    if (stored) {
      demoOtp.value = stored;
      code.value = stored;
    }
  } else {
    router.push('/login');
  }
});

const handleVerify = async () => {
  if (code.value.length !== 6) return;
  const success = await verifyOtp({ email: email.value, code: code.value });
  if (success) {
    // router.push('/') is handled in useAuth
  }
};

const handleResend = async () => {
  await resendOtp(email.value);
  const stored = sessionStorage.getItem(`demo_otp_${email.value}`);
  if (stored) {
    demoOtp.value = stored;
    code.value = stored;
  }
};
</script>

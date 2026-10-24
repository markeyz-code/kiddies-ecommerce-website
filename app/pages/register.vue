<template>
  <div class="h-screen max-h-screen w-full overflow-hidden bg-cream-50 flex flex-col lg:flex-row">
    <!-- Left: Form Section (Scrollable independently) -->
    <div class="w-full lg:w-[48%] xl:w-[42%] h-full overflow-y-auto bg-white flex flex-col justify-between px-6 sm:px-12 lg:px-14 xl:px-16 py-8 lg:py-10 hide-scrollbar z-10 shadow-xl border-r border-stone-100">
      
      <!-- Top: Back Button Navigation (In normal flow, guaranteed never to overlap content) -->
      <div class="w-full max-w-md mx-auto mb-6">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-2.5 text-stone-500 hover:text-brand-900 transition-colors text-xs font-bold tracking-widest uppercase group py-1"
        >
          <span class="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-brand-900 group-hover:text-white transition-all shadow-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </span>
          <span>Back to store</span>
        </NuxtLink>
      </div>

      <!-- Main Form Area -->
      <div class="w-full max-w-md mx-auto my-auto py-2">
        <div class="mb-6">
          <span class="inline-block text-[10px] font-black uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md mb-2.5 border border-amber-200/60">
            VIP Membership
          </span>
          <h1 class="font-display text-3xl sm:text-4xl font-semibold text-brand-900 tracking-tight">Create your account</h1>
          <p class="text-stone-500 font-normal mt-1.5 text-sm">Join the club for faster checkout, order tracking, and exclusive kidswear styles.</p>
        </div>
        
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- First & Last Name -->
          <div class="grid grid-cols-2 gap-3.5">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">First Name</label>
              <input 
                v-model="registerData.firstName" 
                type="text" 
                required
                placeholder="Jane"
                class="w-full px-4 py-2.5 rounded-xl bg-stone-50/70 hover:bg-stone-50 focus:bg-white border border-stone-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none transition-all font-medium text-sm text-stone-800 placeholder:text-stone-400"
              >
            </div>
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">Last Name</label>
              <input 
                v-model="registerData.lastName" 
                type="text" 
                required
                placeholder="Doe"
                class="w-full px-4 py-2.5 rounded-xl bg-stone-50/70 hover:bg-stone-50 focus:bg-white border border-stone-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none transition-all font-medium text-sm text-stone-800 placeholder:text-stone-400"
              >
            </div>
          </div>

          <!-- Email Address -->
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">Email Address</label>
            <input 
              v-model="registerData.email" 
              type="email" 
              required
              placeholder="hello@example.com"
              class="w-full px-4 py-2.5 rounded-xl bg-stone-50/70 hover:bg-stone-50 focus:bg-white border border-stone-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none transition-all font-medium text-sm text-stone-800 placeholder:text-stone-400"
            >
          </div>
          
          <!-- Password -->
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">Password</label>
            <div class="relative">
              <input 
                v-model="registerData.password" 
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full px-4 py-2.5 pr-11 rounded-xl bg-stone-50/70 hover:bg-stone-50 focus:bg-white border border-stone-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none transition-all font-medium text-sm text-stone-800 placeholder:text-stone-400"
              >
              <button 
                type="button" 
                @click="showPassword = !showPassword" 
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                aria-label="Toggle password visibility"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0l3.29 3.29m0 0l3.29 3.29m0 0l3.29 3.29m0 0l3.29 3.29" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Phone Number -->
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">Phone Number</label>
            <div class="flex rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 focus-within:bg-white focus-within:border-brand-900 focus-within:ring-2 focus-within:ring-brand-900/10 transition-all overflow-hidden">
              <span class="inline-flex items-center gap-1.5 px-3.5 bg-stone-100/70 border-r border-stone-200 text-stone-600 text-xs font-semibold select-none">
                <span>🇺🇸</span>
                <span>+1</span>
              </span>
              <input 
                v-model="registerData.phoneNumber" 
                type="tel" 
                required
                placeholder="(555) 000-0000"
                class="w-full px-3.5 py-2.5 bg-transparent outline-none font-medium text-sm text-stone-800 placeholder:text-stone-400"
              >
            </div>
          </div>

          <!-- Zip Code -->
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">Zip Code</label>
            <input 
              v-model="registerData.zipCode" 
              type="text" 
              required
              placeholder="10001"
              class="w-full px-4 py-2.5 rounded-xl bg-stone-50/70 hover:bg-stone-50 focus:bg-white border border-stone-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none transition-all font-medium text-sm text-stone-800 placeholder:text-stone-400"
            >
          </div>

          <!-- Terms Checkbox -->
          <div class="flex items-start gap-2.5 pt-1">
            <input 
              id="terms" 
              v-model="registerData.terms" 
              type="checkbox" 
              required 
              class="mt-1 w-4 h-4 rounded border-stone-300 text-brand-900 focus:ring-brand-900/20 cursor-pointer"
            >
            <label for="terms" class="text-[11px] leading-relaxed text-stone-500 font-normal cursor-pointer select-none">
              I agree to the JasmarKids Rewards <NuxtLink to="/terms" class="text-brand-900 font-semibold underline underline-offset-2">Terms &amp; Conditions</NuxtLink>, <NuxtLink to="/privacy-policy" class="text-brand-900 font-semibold underline underline-offset-2">Privacy Policy</NuxtLink> and <NuxtLink to="/terms" class="text-brand-900 font-semibold underline underline-offset-2">Notice of Financial Incentive</NuxtLink>.
            </label>
          </div>

          <!-- Remember Me Checkbox -->
          <div class="flex items-center gap-2.5">
            <input 
              id="remember" 
              v-model="registerData.rememberMe" 
              type="checkbox" 
              class="w-4 h-4 rounded border-stone-300 text-brand-900 focus:ring-brand-900/20 cursor-pointer"
            >
            <label for="remember" class="text-xs font-semibold text-stone-700 cursor-pointer select-none">
              Remember me <span class="font-normal text-stone-400 text-[11px]">(Not recommended on shared devices)</span>
            </label>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-brand-900 text-white font-bold py-3.5 rounded-xl hover:bg-brand-800 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xs hover:shadow-sm tracking-wide text-sm flex items-center justify-center mt-2 cursor-pointer"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="mt-5 flex items-center justify-between">
          <span class="w-1/4 border-b border-stone-200"></span>
          <span class="text-[11px] text-stone-400 uppercase font-bold tracking-widest px-2">or sign up with</span>
          <span class="w-1/4 border-b border-stone-200"></span>
        </div>

        <!-- Google Auth Button -->
        <div class="mt-4">
          <button 
            @click="handleSocialLogin('google')" 
            type="button" 
            class="w-full flex items-center justify-center gap-2.5 py-2.5 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 active:scale-[0.99] transition-all shadow-xs cursor-pointer"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              <path fill="none" d="M1 1h22v22H1z"/>
            </svg>
            <span class="font-semibold text-xs text-stone-700">Continue with Google</span>
          </button>
        </div>

        <!-- Footer Link -->
        <div class="mt-6 text-center text-xs text-stone-500">
          Already have an account? 
          <NuxtLink to="/login" class="font-bold text-brand-900 hover:underline underline-offset-4 ml-1">Sign In</NuxtLink>
        </div>
      </div>

      <!-- Bottom Footnote -->
      <div class="w-full max-w-md mx-auto pt-4 text-center">
        <p class="text-[11px] text-stone-400">© {{ new Date().getFullYear() }} JasmarKids Inc. All rights reserved.</p>
      </div>
    </div>
    
    <!-- Right: Visual Image Section (Fixed, sticky, never scrolls away!) -->
    <div class="hidden lg:flex lg:w-[52%] xl:w-[58%] h-full relative overflow-hidden bg-brand-950 items-center justify-center sticky top-0 select-none">
      <img 
        src="/img/auth_signup_kids.jpg" 
        class="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-[12s] ease-out" 
        alt="Cute children laughing together in fashionable autumn outfits" 
      />
      
      <!-- Gradient overlay for warm contrast & typography legibility -->
      <div class="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/30 to-brand-950/20 z-10"></div>
      
      <!-- Overlaid floating card & branding -->
      <div class="absolute inset-x-8 bottom-12 z-20 max-w-lg mx-auto text-center text-white p-8 rounded-3xl bg-brand-950/40 backdrop-blur-md border border-white/15 shadow-2xl">
        <span class="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm mb-3">
          Little Adventures
        </span>
        <h2 class="text-4xl xl:text-5xl font-display font-light italic mb-3 text-white drop-shadow-md">
          Styles they'll love
        </h2>
        <p class="text-sm xl:text-base font-normal text-cream-100 opacity-95 leading-relaxed max-w-md mx-auto">
          From playtime essentials to festive outfits, discover cozy kidswear curated for every milestone.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' });

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/modules/auth/useAuth';

const router = useRouter();
const { register, socialLogin, loading, user, fetchProfile } = useAuth();

const showPassword = ref(false);

const registerData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
  zipCode: '',
  terms: false,
  rememberMe: false
});

onMounted(async () => {
  await fetchProfile();
  if (user.value) {
    router.push('/');
  }
});

const handleRegister = async () => {
  const result = await register(registerData.value);
  if (result && !result.requiresOtp) {
    router.push('/login');
  }
};

const handleSocialLogin = async (provider) => {
  const success = await socialLogin(provider);
  if (success) {
    router.push('/');
  }
};
</script>

<template>
  <div class="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-sky-50 overflow-hidden relative">
    
    <!-- Left Column: Form -->
    <div class="flex items-center justify-center p-8 md:p-16 z-10 bg-white border-r border-stone-200 h-screen overflow-y-auto">
      <div class="w-full max-w-md space-y-6 my-auto">
        <div class="text-left">
          <NuxtLink to="/" class="inline-block mb-4 text-4xl font-serif font-black text-sky-500 tracking-tight hover:scale-105 transition-transform origin-left">JasmarKids ✨</NuxtLink>
          <h2 class="text-3xl font-serif font-black text-stone-800 tracking-tight leading-tight">Create an account</h2>
          <p class="mt-2 text-base text-stone-500 font-medium">
            Already have an account?
            <NuxtLink to="/login" class="font-bold text-rose-400 hover:text-rose-500 hover:underline transition-colors ml-1">
              Sign in
            </NuxtLink>
          </p>
        </div>
        
        <form class="mt-6 space-y-5" @submit.prevent="handleRegister">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="first-name" class="block text-sm font-bold text-stone-700 mb-1">First Name</label>
                <input id="first-name" v-model="firstName" name="firstName" type="text" required class="block w-full px-4 py-3 border border-stone-200 placeholder-stone-400 text-stone-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all sm:text-sm bg-white font-medium" placeholder="First" />
              </div>
              <div>
                <label for="last-name" class="block text-sm font-bold text-stone-700 mb-1">Last Name</label>
                <input id="last-name" v-model="lastName" name="lastName" type="text" required class="block w-full px-4 py-3 border border-stone-200 placeholder-stone-400 text-stone-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all sm:text-sm bg-white font-medium" placeholder="Last" />
              </div>
            </div>
            
            <div>
              <label for="email-address" class="block text-sm font-bold text-stone-700 mb-1">Email address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                </div>
                <input id="email-address" v-model="email" name="email" type="email" autocomplete="email" required class="block w-full pl-12 pr-3 py-3 border border-stone-200 placeholder-stone-400 text-stone-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all sm:text-sm bg-white font-medium" placeholder="you@example.com" />
              </div>
            </div>
            
            <div>
              <label for="password" class="block text-sm font-bold text-stone-700 mb-1">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" /></svg>
                </div>
                <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" autocomplete="new-password" required class="block w-full pl-12 pr-12 py-3 border border-stone-200 placeholder-stone-400 text-stone-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all sm:text-sm bg-white font-medium" placeholder="••••••••" />
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <button type="button" @click="showPassword = !showPassword" class="text-stone-400 hover:text-sky-500 focus:outline-none transition-colors">
                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <button type="submit" :disabled="loading" class="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-black rounded-full text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-all duration-300 disabled:opacity-50 tracking-wide mb-5">
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {{ loading ? 'Creating Account...' : 'Create Account 🚀' }}
            </button>
            
            <div class="relative mb-5">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-stone-200"></div>
              </div>
              <div class="relative flex justify-center text-xs">
                <span class="px-4 bg-white text-stone-400 font-bold">OR</span>
              </div>
            </div>

            <button type="button" @click="handleGoogleLogin" :disabled="loading" class="group relative w-full flex justify-center items-center py-3.5 px-4 border border-stone-200 text-sm font-black rounded-full text-stone-700 bg-white hover:bg-stone-50 hover:border-stone-300 focus:outline-none focus:ring-4 focus:ring-stone-100 transition-all disabled:opacity-70 tracking-wide">
              <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 15.01 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Right Column: Playful Image / SVG Scenery -->
    <div class="hidden md:flex relative flex-col items-center justify-center bg-amber-50/50 p-8 overflow-hidden">
      <!-- Central Hero Photo & SVG Animation -->
      <div class="relative z-20 flex flex-col items-center justify-center max-w-md w-full">
        <div class="bg-white p-3 rounded-[3rem] border border-stone-200 transform rotate-2 hover:rotate-0 transition-transform duration-500 mb-6">
          <img src="@/assets/hero2.jpg" alt="Happy child jumping" class="w-72 h-80 object-cover rounded-[2.5rem]" />
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

const { register, socialLogin, loading } = useAuth();
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const nuxtApp = useNuxtApp();

const handleRegister = () => {
  register({ 
    firstName: firstName.value, 
    lastName: lastName.value, 
    email: email.value, 
    password: password.value 
  });
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

    // Fallback redirect if composable redirect didn't fire
    if (response) {
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
  } catch (error) {
    console.error('Google login error:', error);
    alert('Google Sign-In failed: ' + (error.message || 'Unknown error'));
  }
};
</script>

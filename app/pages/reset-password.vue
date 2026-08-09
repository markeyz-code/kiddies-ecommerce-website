<template>
  <div class="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-stone-100">
      <div class="text-center">
        <NuxtLink to="/" class="inline-block mb-6 text-3xl font-serif font-bold text-emerald-600 tracking-tight">JasmarKids</NuxtLink>
        <h2 class="text-3xl font-serif font-bold text-stone-900 tracking-tight">Reset password</h2>
        <p class="mt-2 text-sm text-stone-500">
          Enter your reset token and new password.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        <div class="space-y-5">
          <div>
            <label for="token" class="block text-sm font-medium text-stone-700 mb-1">Reset Token</label>
            <input id="token" v-model="token" name="token" type="text" required class="block w-full px-4 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all sm:text-sm" placeholder="Paste your token here" />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-stone-700 mb-1">New Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" /></svg>
              </div>
              <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" autocomplete="new-password" required class="block w-full pl-10 pr-10 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all sm:text-sm" placeholder="••••••••" />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button type="button" @click="showPassword = !showPassword" class="text-stone-400 hover:text-stone-600 focus:outline-none transition-colors">
                  <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading" class="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ loading ? 'Resetting...' : 'Reset Password' }}
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

const { resetPassword, loading } = useAuth();
const token = ref('');
const password = ref('');
const showPassword = ref(false);

const handleResetPassword = () => {
  resetPassword({ token: token.value, newPassword: password.value });
};
</script>

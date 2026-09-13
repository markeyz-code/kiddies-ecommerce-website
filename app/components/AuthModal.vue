<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('update:modelValue', false)"></div>
    
    <!-- Modal Content -->
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden m-4 transform transition-all duration-300 scale-100 opacity-100">
      <button @click="$emit('update:modelValue', false)" class="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
        <XIcon class="w-5 h-5" />
      </button>

      <div class="p-8 text-center">
        <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <HeartIcon class="w-8 h-8 text-red-500 fill-red-500" />
        </div>
        
        <h2 class="text-2xl font-black text-[#1a365d] mb-3">Save Your Favorites!</h2>
        <p class="text-gray-500 text-sm mb-8 leading-relaxed">
          Love this item? Sign in to save it to your wishlist and keep track of all your favorite styles in one place.
        </p>

        <div class="space-y-4">
          <NuxtLink to="/login" class="block w-full bg-[#1a365d] text-white font-bold py-4 rounded hover:bg-[#112a4a] transition-colors shadow-sm text-center">
            Sign In with Email
          </NuxtLink>
          
          <a href="http://localhost:3005/auth/google" class="block w-full bg-white border-2 border-gray-200 text-gray-700 font-bold py-4 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-3">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </a>
        </div>
        
        <p class="mt-8 text-xs text-gray-400">
          New here? <NuxtLink to="/register" class="text-black font-bold hover:underline">Create an account</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XIcon, HeartIcon } from 'lucide-vue-next';
defineProps({
  modelValue: Boolean
});
defineEmits(['update:modelValue']);
</script>

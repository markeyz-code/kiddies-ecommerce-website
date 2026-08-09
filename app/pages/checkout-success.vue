<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      </div>
      
      <h1 class="text-4xl font-serif font-bold text-stone-900 mb-4">Order Confirmed!</h1>
      <p class="text-stone-600 mb-2">Thank you for your purchase. We've received your order and are getting it ready to ship.</p>
      
      <div class="bg-stone-50 border border-stone-200 rounded-lg p-4 my-8 space-y-4">
        <div>
          <p class="text-sm text-stone-500 mb-1">Order Number</p>
          <p class="text-lg font-mono font-bold text-stone-900">{{ route.query.orderNumber || 'PENDING' }}</p>
        </div>
        <div v-if="route.query.reference" class="pt-4 border-t border-stone-200">
          <p class="text-sm text-stone-500 mb-1">Payment Reference</p>
          <p class="text-md font-mono font-medium text-emerald-700">{{ route.query.reference }}</p>
          <p class="text-xs text-stone-400 mt-1">Status: Processing</p>
        </div>
      </div>
      
      <NuxtLink to="/products" class="inline-block bg-emerald-600 text-white font-medium py-3 px-8 rounded-md shadow-lg hover:bg-emerald-700 transition-colors">
        Continue Shopping
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

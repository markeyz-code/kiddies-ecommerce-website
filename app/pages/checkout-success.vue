<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 bg-amber-50/20 py-12">
    <div class="max-w-xl w-full text-center bg-white p-10 md:p-14 rounded-[3rem] shadow-xl border-4 border-rose-50 relative overflow-hidden">
      <!-- Confetti / Celebration Lottie -->
      <div class="absolute inset-0 pointer-events-none z-0">
        <ClientOnly>
          <Vue3Lottie
            animationLink="https://lottie.host/880df9fa-9489-4b13-91b5-6809ec006e23/C7wDqD1f1P.json"
            :height="'100%'"
            :width="'100%'"
            :loop="false"
          />
        </ClientOnly>
      </div>

      <div class="relative z-10">
        <div class="w-24 h-24 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border-4 border-white animate-bounce">
          <span class="text-5xl">✨</span>
        </div>
        
        <h1 class="text-2xl md:text-3xl font-serif font-black text-stone-800 mb-4 drop-shadow-sm leading-tight">Yay! Order Confirmed! 🎉</h1>
        <p class="text-stone-600 mb-6 font-medium text-sm md:text-base">Thank you for your purchase. We've received your order and are getting it ready to ship. We hope you love the cute outfits!</p>
        
        <div class="bg-rose-50/50 border-2 border-rose-100 rounded-3xl p-5 my-8 space-y-4 shadow-sm">
          <div>
            <p class="text-xs font-bold text-stone-500 mb-1 uppercase tracking-widest">Order Number</p>
            <p class="text-xl font-black text-stone-800 tracking-wide">{{ route.query.orderNumber || 'PENDING' }}</p>
          </div>
          <div v-if="route.query.reference" class="pt-4 border-t-2 border-rose-100">
            <p class="text-xs font-bold text-stone-500 mb-1 uppercase tracking-widest">Payment Reference</p>
            <p class="text-base font-bold text-sky-600 bg-sky-50 py-1.5 px-4 rounded-full w-fit mx-auto">{{ route.query.reference }}</p>
            <p class="text-xs font-bold text-stone-400 mt-2 flex items-center justify-center gap-1">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Status: Processing
            </p>
          </div>
        </div>
        
        <NuxtLink to="/products" class="inline-block bg-sky-400 text-white font-black text-base py-3.5 px-10 rounded-full shadow-md hover:bg-sky-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          Continue Shopping 🛍️
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

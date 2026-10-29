<template>
  <div class="min-h-screen bg-coral-50/30 flex flex-col">
    <Header />
    <main class="flex-grow flex items-center justify-center px-4 py-20">
      <div class="max-w-lg text-center">
        <p class="text-[120px] leading-none font-serif font-black text-ink/20">{{ error?.statusCode || 404 }}</p>
        <h1 class="text-3xl font-serif font-black text-ink mb-3 mt-2">
          {{ error?.statusCode === 404 ? 'This page went out of style' : 'Something went wrong' }}
        </h1>
        <p class="text-brand-500 font-medium mb-8">
          {{ error?.statusCode === 404
            ? "The page you're looking for doesn't exist or has moved."
            : (error?.message || 'Please try again in a moment.') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button @click="handleError" class="bg-brand-700 text-white font-bold px-8 py-3.5 rounded-full hover:bg-brand-800 transition-colors">
            Go Home
          </button>
          <NuxtLink to="/products" class="bg-white border-2 border-brand-900 text-ink font-bold px-8 py-3.5 rounded-full hover:bg-brand-50 transition-colors">
            Shop All Products
          </NuxtLink>
        </div>
      </div>
    </main>
    <footer class="bg-brand-700 text-gray-300 py-8 text-center text-xs">
      &copy; {{ new Date().getFullYear() }} JasmarKids. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
const props = defineProps({ error: Object });
const handleError = () => clearError({ redirect: '/' });
</script>

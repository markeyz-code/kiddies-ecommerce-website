<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="pending" class="text-center py-24 text-stone-500">Loading product...</div>
    <div v-else-if="!product" class="text-center py-24 text-stone-500">Product not found.</div>
    <div v-else>
      <!-- Breadcrumbs -->
      <nav class="flex text-sm text-stone-500 mb-8">
        <NuxtLink to="/" class="hover:text-stone-900">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/products" class="hover:text-stone-900">{{ product.category }}</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-stone-900">{{ product.name }}</span>
      </nav>

      <div class="flex flex-col md:flex-row gap-12">
        <!-- Image Gallery -->
        <div class="w-full md:w-1/2">
          <div class="bg-stone-100 aspect-[3/4] rounded-lg overflow-hidden mb-4">
            <img :src="product.imageUrls?.main || 'https://images.unsplash.com/photo-1519278409-1f56fc0e0db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'" :alt="product.name" class="w-full h-full object-cover" />
          </div>
          <div v-if="product.imageUrls?.thumbnails?.length" class="grid grid-cols-4 gap-4">
            <div v-for="(thumb, idx) in product.imageUrls.thumbnails" :key="idx" class="bg-stone-100 aspect-square rounded-lg overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-emerald-600 transition-all">
              <img :src="thumb" alt="Thumbnail" class="w-full h-full object-cover opacity-70 hover:opacity-100" />
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="w-full md:w-1/2">
          <h1 class="text-3xl font-serif font-bold text-stone-900 mb-2">{{ product.name }}</h1>
          <p class="text-2xl text-stone-900 mb-6">₦{{ product.basePrice?.toFixed(2) }}</p>
          
          <div class="prose prose-stone text-stone-600 mb-8">
            <p>{{ product.description }}</p>
          </div>

          <div class="flex gap-4 mb-8 mt-12">
            <div class="w-24 border border-stone-200 rounded-md flex items-center justify-between px-3">
              <button class="text-stone-500 hover:text-stone-900" @click="quantity > 1 && quantity--">-</button>
              <span class="font-medium">{{ quantity }}</span>
              <button class="text-stone-500 hover:text-stone-900" @click="quantity++">+</button>
            </div>
            <button @click="addToCart" class="flex-1 bg-emerald-600 text-white font-medium py-3 rounded-md shadow-lg hover:bg-emerald-700 transition-colors">
              Add to Cart
            </button>
            <button class="w-12 h-12 border border-stone-200 rounded-md flex items-center justify-center text-stone-400 hover:text-rose-500 hover:border-rose-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>

          <!-- Accordions -->
          <div class="border-t border-stone-200 divide-y divide-stone-200">
            <div class="py-4 cursor-pointer flex justify-between items-center group">
              <h4 class="font-medium text-stone-900 group-hover:text-emerald-600">Product Details</h4>
              <span class="text-stone-400">+</span>
            </div>
            <div class="py-4 cursor-pointer flex justify-between items-center group">
              <h4 class="font-medium text-stone-900 group-hover:text-emerald-600">Shipping & Returns</h4>
              <span class="text-stone-400">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCart } from '@/composables/core/useCart'
import { useFetchProducts } from '@/composables/modules/products/useFetchProducts'
import { useCustomToast } from '@/composables/core/useCustomToast'

const route = useRoute()
const cartStore = useCart()
const { showToast } = useCustomToast()
const { loading: pending, singleProduct: product, fetchProductById } = useFetchProducts()

const quantity = ref(1)

onMounted(() => {
  fetchProductById(route.params.id)
})

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value)
    showToast({
      title: '🎉 Yay! Added to Cart! 🎈',
      message: `Woohoo! ${quantity.value}x ${product.value.name} is now in your cart! 🛍️✨`,
      toastType: 'success'
    })
  }
}
</script>

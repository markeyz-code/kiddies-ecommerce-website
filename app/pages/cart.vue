<template>
  <div class="min-h-[60vh] bg-cream-50 pb-16 md:pb-24">
    <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
        <p class="eyebrow mb-2">Step 1 of 3</p>
        <h1 class="section-title">Your bag</h1>
        </div>
        <span v-if="cart.totalItems > 0" class="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
          {{ cart.totalItems }} Item{{ cart.totalItems > 1 ? 's' : '' }}
        </span>
      </div>

      <div class="mb-8">
        <CheckoutSteps :step="1" />
      </div>

      <div v-if="cart.items.length === 0" class="flex flex-col items-center justify-center rounded-3xl border border-cream-200 bg-white py-16 text-center sm:py-20">
        <span class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cream-100 text-4xl">🛍️</span>
        <h2 class="font-display text-2xl font-semibold text-brand-900 mb-2">Your bag is empty</h2>
        <p class="mb-6 max-w-sm text-sm font-medium text-brand-500">Discover soft, playful pieces made for everyday adventures.</p>
        <NuxtLink to="/products" class="btn-primary">Start shopping</NuxtLink>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-8">
        <!-- Cart Items -->
        <div class="flex-1">
          <div class="card-surface p-4 md:p-6">
            <div class="space-y-3">
              <div v-for="item in cart.items" :key="item.id" class="flex gap-4 md:gap-5 py-3 border-b border-stone-100 last:border-0 relative group items-center">
                <div class="h-20 w-16 flex-shrink-0 overflow-hidden rounded-2xl border border-cream-200 bg-cream-100 md:h-24 md:w-20">
                  <img :src="getItemImage(item)" :alt="item?.product?.name" class="w-full h-full object-cover" />
                </div>
                
                <div class="flex-1 flex flex-col justify-between">
                  <div class="flex justify-between items-start">
                    <div>
                      <NuxtLink :to="`/product/${item?.product?._id || item?.product?.id}`" class="text-base md:text-lg font-bold text-stone-800 mb-1 group-hover:text-brand-900 transition-colors line-clamp-1 hover:underline block">
                        {{ item?.product?.name || 'Unknown Product' }}
                      </NuxtLink>
                      <p v-if="item?.options?.size" class="text-xs font-semibold text-gray-600 mb-1">Size: {{ item.options.size }}</p>
                      <p class="text-[10px] font-black text-amber-500 bg-amber-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit border border-amber-200">
                        {{ item?.product?.categoryId?.name || 'Outfit' }}
                      </p>
                    </div>
                    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-stone-50 text-stone-400 hover:bg-red-50 hover:text-red-500 transition-all border border-stone-200 ml-2" @click="cart.removeFromCart(item.id)" title="Remove item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                  
                  <div class="flex justify-between items-center mt-3">
                    <div class="h-10 border border-brand-200 rounded-full flex items-center justify-between px-2 bg-brand-50/50 w-28">
                      <button class="w-7 h-7 rounded-full flex items-center justify-center text-brand-900 hover:bg-white transition-all font-bold text-base" @click="cart.updateQuantity(item.id, item.quantity - 1)">-</button>
                      <span class="font-black text-sm text-stone-800">{{ item.quantity }}</span>
                      <button class="w-7 h-7 rounded-full flex items-center justify-center text-brand-900 hover:bg-white transition-all font-bold text-base" @click="cart.updateQuantity(item.id, item.quantity + 1)">+</button>
                    </div>
                    <span class="font-black text-lg md:text-xl text-stone-800">${{ getItemTotal(item).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="w-full lg:w-72 flex-shrink-0">
          <div class="card-surface sticky top-24 p-5">
            <h2 class="mb-4 font-display text-xl font-semibold text-brand-900">Order summary</h2>
            
            <div class="mb-5 rounded-2xl border border-cream-200 bg-cream-50 p-3.5">
              <p v-if="remainingForFreeShipping > 0" class="text-xs font-semibold text-brand-600">
                You're <span class="font-bold text-coral-600">${{ remainingForFreeShipping.toFixed(2) }}</span> away from free shipping
              </p>
              <p v-else class="text-xs font-bold text-emerald-700">You've unlocked free shipping ✓</p>
              <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-cream-200">
                <div class="h-full rounded-full bg-coral-400 transition-all" :style="{ width: shippingProgress + '%' }"></div>
              </div>
            </div>

            <div class="space-y-3 text-stone-600 font-medium mb-6 border-b border-brand-200 pb-6 text-sm">
              <div class="flex justify-between items-center">
                 <span>Subtotal</span>
                <span class="text-stone-900 font-bold text-base">${{ (cart.subtotal || 0).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Shipping</span>
                <span class="text-sky-600 font-bold bg-brand-50 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide border border-brand-200">Calculated next</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Tax</span>
                <span class="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide border border-amber-100">Calculated next</span>
              </div>
            </div>
            
            <div class="flex justify-between items-end mb-5">
              <span class="font-bold text-brand-900 text-sm">Estimated total</span>
              <span class="font-black text-xl text-stone-900 text-right">${{ (cart.subtotal || 0).toFixed(2) }}</span>
            </div>
            
            <NuxtLink to="/checkout" class="btn-primary w-full">
              Continue to checkout
            </NuxtLink>
            
            <div class="mt-5 flex items-center justify-center gap-3 text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              <span class="text-xs font-bold">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCart } from '@/composables/core/useCart'
import { useStoreSettings } from '@/composables/core/useStoreSettings'

const cart = useCart()
const { settings: storeSettings, fetchStoreSettings } = useStoreSettings()

const freeShippingThreshold = computed(() => Number(storeSettings.value.freeShippingThreshold) || 0)
const remainingForFreeShipping = computed(() => Math.max(0, freeShippingThreshold.value - (cart.subtotal || 0)))
const shippingProgress = computed(() => {
  if (!freeShippingThreshold.value) return 100
  return Math.min(100, ((cart.subtotal || 0) / freeShippingThreshold.value) * 100)
})

onMounted(() => { fetchStoreSettings() })

const getItemImage = (item) => {
  return item?.product?.image 
    || item?.product?.imageUrls?.medium 
    || item?.product?.imageUrls?.thumbnail 
    || item?.product?.imageUrls?.original 
    || '/img/placeholder.jpg';
};

const getItemTotal = (item) => {
  const price = item?.product?.basePrice || item?.product?.price || 0;
  return price * item.quantity;
};
</script>

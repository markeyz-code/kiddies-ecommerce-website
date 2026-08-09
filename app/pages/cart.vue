<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-serif font-bold text-stone-900 mb-8">Your Cart</h1>

    <div v-if="cart.items.length === 0" class="text-center py-24 bg-stone-50 rounded-lg">
      <h2 class="text-2xl font-serif font-medium text-stone-900 mb-4">Your cart is empty</h2>
      <p class="text-stone-500 mb-8">Looks like you haven't added any premium styles to your cart yet.</p>
      <NuxtLink to="/products" class="bg-emerald-600 text-white font-medium py-3 px-8 rounded-md shadow-lg hover:bg-emerald-700 transition-colors">
        Shop New Arrivals
      </NuxtLink>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-12">
      <!-- Cart Items -->
      <div class="flex-1">
        <div class="border-t border-stone-200">
          <div v-for="item in cart.items" :key="item.id" class="flex gap-6 py-6 border-b border-stone-200">
            <div class="w-24 h-32 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
              <img :src="item?.product?.imageUrls?.main || 'https://images.unsplash.com/photo-1519278409-1f56fc0e0db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'" alt="Product" class="w-full h-full object-cover" />
            </div>
            
            <div class="flex-1 flex flex-col justify-between">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-medium text-stone-900">{{ item?.product?.name || 'Unknown Product' }}</h3>
                  <p class="text-sm text-stone-500 mt-1">Category: {{ item?.product?.category || 'N/A' }}</p>
                </div>
                <button class="text-stone-400 hover:text-rose-500 transition-colors" @click="cart.removeFromCart(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
              
              <div class="flex justify-between items-end">
                <div class="w-24 border border-stone-200 rounded-md flex items-center justify-between px-3 py-1">
                  <button class="text-stone-500 hover:text-stone-900" @click="cart.updateQuantity(item.id, item.quantity - 1)">-</button>
                  <span class="font-medium text-sm">{{ item.quantity }}</span>
                  <button class="text-stone-500 hover:text-stone-900" @click="cart.updateQuantity(item.id, item.quantity + 1)">+</button>
                </div>
                <span class="font-medium text-stone-900">₦{{ ((item?.product?.basePrice || 0) * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="w-full lg:w-96 flex-shrink-0">
        <div class="bg-stone-50 p-6 rounded-lg border border-stone-200">
          <h2 class="text-lg font-bold text-stone-900 mb-4">Order Summary</h2>
          
          <div class="space-y-3 text-sm text-stone-600 mb-6 border-b border-stone-200 pb-6">
            <div class="flex justify-between">
               <span>Subtotal</span>
              <span class="text-stone-900 font-medium">₦{{ (cart.subtotal || 0).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div class="flex justify-between">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          
          <div class="flex justify-between items-center mb-6">
            <span class="font-bold text-stone-900">Total</span>
            <span class="font-bold text-xl text-stone-900">₦{{ (cart.subtotal || 0).toFixed(2) }}</span>
          </div>
          
          <NuxtLink to="/checkout" class="w-full block text-center bg-emerald-600 text-white font-medium py-3 rounded-md shadow-lg hover:bg-emerald-700 transition-colors mb-4">
            Proceed to Checkout
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '@/composables/core/useCart'

const cart = useCart()
</script>

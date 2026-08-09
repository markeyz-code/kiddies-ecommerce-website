<template>
  <div class="bg-amber-50/20 min-h-screen pb-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex items-center gap-3 mb-8">
        <h1 class="text-2xl md:text-3xl font-serif font-black text-stone-800">Your Cart 🛒</h1>
        <span v-if="cart.items.length > 0" class="bg-rose-100 text-rose-500 font-black text-xs px-3 py-1 rounded-full border border-rose-200">
          {{ cart.items.length }} Item{{ cart.items.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div v-if="cart.items.length === 0" class="text-center py-20 bg-white rounded-[2.5rem] border-2 border-stone-100 flex flex-col items-center justify-center">
        <ClientOnly>
          <Vue3Lottie
            animationLink="https://lottie.host/8c1303ba-5d55-4672-8711-d07f35b6f3c1/jTfV0V2t29.json"
            :height="200"
            :width="200"
            class="mb-4 opacity-80"
          />
        </ClientOnly>
        <h2 class="text-2xl font-serif font-black text-stone-800 mb-3">Your cart is empty! 🥺</h2>
        <p class="text-stone-500 font-medium text-sm mb-6">Looks like you haven't picked out any cute outfits yet.</p>
        <NuxtLink to="/products" class="bg-sky-400 text-white font-black py-3.5 px-8 rounded-full hover:bg-sky-500 transition-all duration-300 text-sm">
          Let's Go Shopping! ✨
        </NuxtLink>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-8">
        <!-- Cart Items -->
        <div class="flex-1">
          <div class="bg-white rounded-[2.5rem] border border-stone-200 p-5 md:p-6">
            <div class="space-y-4">
              <div v-for="item in cart.items" :key="item.id" class="flex gap-4 md:gap-6 py-4 border-b border-stone-100 last:border-0 relative group items-center">
                <div class="w-20 md:w-24 h-24 md:h-28 bg-amber-50 rounded-2xl overflow-hidden flex-shrink-0 border border-stone-100">
                  <img :src="item?.product?.imageUrls?.medium || item?.product?.imageUrls?.thumbnail || item?.product?.imageUrls?.large || item?.product?.imageUrls?.main || item?.product?.images?.[0]?.url || 'https://images.unsplash.com/photo-1519278409-1f56fc0e0db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'" :alt="item?.product?.name" class="w-full h-full object-cover" />
                </div>
                
                <div class="flex-1 flex flex-col justify-between">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="text-base md:text-lg font-bold text-stone-800 mb-1 group-hover:text-rose-500 transition-colors line-clamp-1">{{ item?.product?.name || 'Unknown Product' }}</h3>
                      <p class="text-[10px] font-black text-amber-500 bg-amber-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit border border-amber-200">
                        {{ item?.product?.categoryId?.name || item?.product?.category || 'Outfit' }}
                      </p>
                    </div>
                    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-stone-50 text-stone-400 hover:bg-rose-100 hover:text-rose-500 transition-all border border-stone-200 ml-2" @click="cart.removeFromCart(item.id)" title="Remove item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                  
                  <div class="flex justify-between items-center mt-3">
                    <div class="h-10 border border-rose-200 rounded-full flex items-center justify-between px-2 bg-rose-50/50 w-28">
                      <button class="w-7 h-7 rounded-full flex items-center justify-center text-rose-500 hover:bg-white transition-all font-bold text-base" @click="cart.updateQuantity(item.id, item.quantity - 1)">-</button>
                      <span class="font-black text-sm text-stone-800">{{ item.quantity }}</span>
                      <button class="w-7 h-7 rounded-full flex items-center justify-center text-rose-500 hover:bg-white transition-all font-bold text-base" @click="cart.updateQuantity(item.id, item.quantity + 1)">+</button>
                    </div>
                    <span class="font-black text-lg md:text-xl text-stone-800">₦{{ ((item?.product?.basePrice || 0) * item.quantity).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="w-full lg:w-80 flex-shrink-0">
          <div class="bg-rose-50/50 p-6 rounded-[2rem] border border-rose-200 sticky top-24">
            <h2 class="text-xl font-black text-stone-800 mb-5 flex items-center gap-2">
              Order Summary 🧾
            </h2>
            
            <div class="space-y-3 text-stone-600 font-medium mb-6 border-b border-rose-200 pb-6 text-sm">
              <div class="flex justify-between items-center">
                 <span>Subtotal</span>
                <span class="text-stone-900 font-bold text-base">₦{{ (cart.subtotal || 0).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Shipping</span>
                <span class="text-sky-600 font-bold bg-sky-50 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide border border-sky-100">Calculated next</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Tax</span>
                <span class="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide border border-amber-100">Calculated next</span>
              </div>
            </div>
            
            <div class="flex justify-between items-end mb-6">
              <span class="font-bold text-stone-800 text-base">Total</span>
              <span class="font-black text-2xl text-stone-900 text-right">₦{{ (cart.subtotal || 0).toFixed(2) }}</span>
            </div>
            
            <NuxtLink to="/checkout" class="w-full block text-center bg-stone-800 text-white font-black py-3.5 rounded-full hover:bg-rose-500 transition-all duration-300 text-sm tracking-wide">
              Proceed to Checkout 🚀
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
import { useCart } from '@/composables/core/useCart'

const cart = useCart()
</script>

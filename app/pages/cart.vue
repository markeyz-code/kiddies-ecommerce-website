<template>
  <div class="bg-white min-h-screen pb-24">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex items-center gap-3 mb-8">
        <h1 class="text-2xl md:text-3xl font-serif font-black text-stone-800">Your Cart 🛒</h1>
        <span v-if="cart.totalItems > 0" class="bg-[#d5e6ff] text-[#1a365d] font-black text-xs px-3 py-1 rounded-full border border-[#2a4a7f]">
          {{ cart.totalItems }} Item{{ cart.totalItems > 1 ? 's' : '' }}
        </span>
      </div>

      <div v-if="cart.items.length === 0" class="text-center py-20 bg-white rounded-[2.5rem] border-2 border-stone-100 flex flex-col items-center justify-center">
        <span class="text-8xl mb-4">🛒</span>
        <h2 class="text-2xl font-serif font-black text-stone-800 mb-3">Your cart is empty! 🥺</h2>
        <p class="text-stone-500 font-medium text-sm mb-6">Looks like you haven't picked out any cute outfits yet.</p>
        <NuxtLink to="/products" class="bg-[#1a365d] text-white font-black py-3.5 px-8 rounded-full hover:bg-[#112a4a] transition-all duration-300 text-sm">
          Let's Go Shopping! ✨
        </NuxtLink>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-8">
        <!-- Cart Items -->
        <div class="flex-1">
          <div class="bg-white rounded-[2rem] border border-stone-200 p-4 md:p-5">
            <div class="space-y-3">
              <div v-for="item in cart.items" :key="item.id" class="flex gap-4 md:gap-5 py-3 border-b border-stone-100 last:border-0 relative group items-center">
                <div class="w-16 md:w-20 h-20 md:h-24 bg-amber-50 rounded-xl overflow-hidden flex-shrink-0 border border-stone-100">
                  <img :src="getItemImage(item)" :alt="item?.product?.name" class="w-full h-full object-cover" />
                </div>
                
                <div class="flex-1 flex flex-col justify-between">
                  <div class="flex justify-between items-start">
                    <div>
                      <NuxtLink :to="`/product/${item?.product?._id || item?.product?.id}`" class="text-base md:text-lg font-bold text-stone-800 mb-1 group-hover:text-[#1a365d] transition-colors line-clamp-1 hover:underline block">
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
                    <div class="h-10 border border-[#2a4a7f] rounded-full flex items-center justify-between px-2 bg-[#e6f0ff]/50 w-28">
                      <button class="w-7 h-7 rounded-full flex items-center justify-center text-[#1a365d] hover:bg-white transition-all font-bold text-base" @click="cart.updateQuantity(item.id, item.quantity - 1)">-</button>
                      <span class="font-black text-sm text-stone-800">{{ item.quantity }}</span>
                      <button class="w-7 h-7 rounded-full flex items-center justify-center text-[#1a365d] hover:bg-white transition-all font-bold text-base" @click="cart.updateQuantity(item.id, item.quantity + 1)">+</button>
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
          <div class="bg-[#e6f0ff]/50 p-5 rounded-[1.5rem] border border-[#2a4a7f] sticky top-24">
            <h2 class="text-lg font-black text-stone-800 mb-4 flex items-center gap-2">
              Order Summary 🧾
            </h2>
            
            <div class="space-y-3 text-stone-600 font-medium mb-6 border-b border-[#2a4a7f] pb-6 text-sm">
              <div class="flex justify-between items-center">
                 <span>Subtotal</span>
                <span class="text-stone-900 font-bold text-base">${{ (cart.subtotal || 0).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Shipping</span>
                <span class="text-sky-600 font-bold bg-[#e6f0ff] px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide border border-[#2a4a7f]">Calculated next</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Tax</span>
                <span class="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide border border-amber-100">Calculated next</span>
              </div>
            </div>
            
            <div class="flex justify-between items-end mb-5">
              <span class="font-bold text-stone-800 text-sm">Estimated Total</span>
              <span class="font-black text-xl text-stone-900 text-right">${{ (cart.subtotal || 0).toFixed(2) }}</span>
            </div>
            
            <NuxtLink to="/checkout" class="w-full block text-center bg-[#1a365d] text-white font-black py-3.5 rounded-full hover:bg-[#112a4a] transition-all duration-300 text-sm tracking-wide">
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

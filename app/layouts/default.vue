<template>
  <div class="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900">
    <!-- Premium Floating Header -->
    <header class="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl rounded-full shadow-sm border border-stone-100 px-6 h-16 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2 transition-transform hover:scale-105">
          <span class="text-2xl font-serif font-bold text-emerald-600 tracking-tight">JasmarKids</span>
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink to="/products" class="text-sm font-medium text-stone-600 hover:text-emerald-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300">Shop All</NuxtLink>
          <NuxtLink to="/products?category=new" class="text-sm font-medium text-stone-600 hover:text-emerald-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300">New Arrivals</NuxtLink>
          <NuxtLink to="/products?category=toddler" class="text-sm font-medium text-stone-600 hover:text-emerald-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300">Toddler</NuxtLink>
          <NuxtLink to="/products?category=baby" class="text-sm font-medium text-stone-600 hover:text-emerald-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300">Baby</NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-6 relative">
          <div class="relative flex items-center">
            <transition name="fade">
              <input 
                v-if="isSearchOpen"
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Search..."
                class="absolute right-10 w-56 px-4 py-1.5 text-sm border-2 border-emerald-100 rounded-full focus:outline-none focus:border-emerald-400 bg-emerald-50/50 shadow-inner transition-all duration-300"
              />
            </transition>
            <button @click="isSearchOpen ? handleSearch() : (isSearchOpen = true)" class="text-stone-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all z-10 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
          
          <div class="relative group">
            <div v-if="user" class="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm cursor-pointer shadow-sm hover:shadow transition-all hover:scale-105 border-2 border-white">
              {{ getInitials(user) }}
            </div>
            <NuxtLink v-else to="/login" class="text-stone-600 hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded-full transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </NuxtLink>

            <!-- Dropdown Menu wrapper with top padding to bridge the gap -->
            <div v-if="user" class="absolute right-0 pt-3 w-56 z-50 hidden group-hover:block">
              <div class="bg-white rounded-2xl shadow-xl py-2 border border-emerald-50 overflow-hidden transform origin-top-right transition-all">
                <div class="px-5 py-3 border-b border-stone-50 bg-stone-50/50">
                  <p class="text-sm font-bold text-stone-900 truncate">{{ user.firstName }} {{ user.lastName }}</p>
                  <p class="text-xs text-stone-500 truncate mt-0.5">{{ user.email }}</p>
                </div>
                <NuxtLink to="/account" class="flex items-center px-5 py-2.5 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Profile
                </NuxtLink>
                <NuxtLink to="/account" class="flex items-center px-5 py-2.5 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  Purchases
                </NuxtLink>
                <div class="border-t border-stone-50 my-1"></div>
                <button @click="logout" class="w-full flex items-center px-5 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          <NuxtLink to="/cart" class="text-stone-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all relative flex items-center p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span v-if="cart.totalItems > 0" class="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white shadow-sm transform translate-x-1 -translate-y-1">{{ cart.totalItems }}</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-stone-900 text-stone-300 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <span class="text-2xl font-serif font-bold text-white mb-4 block">JasmarKids</span>
          <p class="text-sm text-stone-400">Curated elegance for little ones. Premium fashion and accessories designed for comfort and style.</p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Shop</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/products" class="hover:text-white transition-colors">All Products</NuxtLink></li>
            <li><NuxtLink to="/products?category=new" class="hover:text-white transition-colors">New Arrivals</NuxtLink></li>
            <li><NuxtLink to="/products?category=sale" class="hover:text-white transition-colors">Sale</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Support</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/faq" class="hover:text-white transition-colors">FAQ</NuxtLink></li>
            <li><NuxtLink to="/shipping" class="hover:text-white transition-colors">Shipping & Returns</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white transition-colors">Contact Us</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Newsletter</h4>
          <p class="text-sm text-stone-400 mb-4">Join our community for exclusive offers and updates.</p>
          <form class="flex" @submit.prevent>
            <input type="email" placeholder="Email address" class="px-4 py-2 w-full bg-stone-800 text-white rounded-l border border-stone-700 focus:outline-none focus:border-emerald-600" />
            <button type="submit" class="bg-emerald-600 text-white px-4 py-2 rounded-r hover:bg-emerald-700 transition-colors">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-800 text-sm text-stone-500 text-center">
        &copy; {{ new Date().getFullYear() }} JasmarKids. All rights reserved.
      </div>
    </footer>

    <!-- Global Chat Widget -->
    <ChatWidget />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/core/useCart'

const cart = useCart()
const router = useRouter()

const searchQuery = ref('')
const isSearchOpen = ref(false)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/products?search=${encodeURIComponent(searchQuery.value.trim())}`)
    isSearchOpen.value = false
    searchQuery.value = ''
  } else if (isSearchOpen.value) {
    isSearchOpen.value = false
  }
}

import { onMounted } from 'vue'
import { useAuth } from '@/composables/modules/auth/useAuth'

const { user, fetchProfile, logout } = useAuth()

onMounted(async () => {
  await fetchProfile()
})

const getInitials = (u) => {
  if (!u) return ''
  return `${(u.firstName || '').charAt(0)}${(u.lastName || '').charAt(0)}`.toUpperCase()
}
</script>

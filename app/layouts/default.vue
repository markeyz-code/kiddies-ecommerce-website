<template>
  <div class="min-h-screen flex flex-col bg-amber-50/30 font-sans text-stone-900 transition-colors duration-300">
    <!-- Playful Floating Header -->
    <header class="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl rounded-full shadow-md border border-amber-100 px-6 h-16 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2 transition-transform hover:scale-110 hover:-translate-y-0.5 duration-300">
          <span class="text-3xl font-serif font-bold text-rose-500 tracking-tight">JasmarKids</span>
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink to="/products" class="text-sm font-bold text-stone-600 hover:text-rose-500 transition-all hover:-translate-y-1 duration-300">Shop All</NuxtLink>
          <NuxtLink to="/products?category=new" class="text-sm font-bold text-stone-600 hover:text-sky-500 transition-all hover:-translate-y-1 duration-300">New Arrivals</NuxtLink>
          <NuxtLink to="/products?category=toddler" class="text-sm font-bold text-stone-600 hover:text-amber-500 transition-all hover:-translate-y-1 duration-300">Toddler</NuxtLink>
          <NuxtLink to="/products?category=baby" class="text-sm font-bold text-stone-600 hover:text-emerald-500 transition-all hover:-translate-y-1 duration-300">Baby</NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-4 md:space-x-6 relative">
          <div class="relative flex items-center">
            <transition name="fade">
              <input 
                v-if="isSearchOpen"
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Search..."
                class="absolute right-10 w-56 px-4 py-1.5 text-sm border-2 border-rose-200 rounded-full focus:outline-none focus:border-rose-400 bg-white shadow-inner transition-all duration-300"
              />
            </transition>
            <button @click="isSearchOpen ? handleSearch() : (isSearchOpen = true)" class="text-stone-600 hover:text-sky-500 hover:bg-sky-50 transition-all hover:scale-110 z-10 p-2 rounded-full duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
          
          <div class="relative group">
            <div v-if="user" class="h-10 w-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-black text-sm cursor-pointer shadow-sm hover:shadow-md transition-all hover:scale-110 hover:-translate-y-0.5 border-2 border-white duration-300">
              {{ getInitials(user) }}
            </div>
            <NuxtLink v-else to="/login" class="text-stone-600 hover:text-amber-500 hover:bg-amber-50 p-2 rounded-full transition-all hover:scale-110 hover:-translate-y-0.5 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </NuxtLink>

            <!-- Dropdown Menu wrapper with top padding to bridge the gap -->
            <div v-if="user" class="absolute right-0 pt-3 w-56 z-50 hidden group-hover:block">
              <div class="bg-white rounded-3xl shadow-xl py-2 border-2 border-rose-100 overflow-hidden transform origin-top-right transition-all">
                <div class="px-5 py-3 border-b border-rose-50 bg-rose-50/50">
                  <p class="text-sm font-bold text-stone-900 truncate">{{ user.firstName }} {{ user.lastName }}</p>
                  <p class="text-xs text-stone-500 truncate mt-0.5">{{ user.email }}</p>
                </div>
                <NuxtLink to="/account" class="flex items-center px-5 py-3 text-sm font-medium text-stone-700 hover:bg-rose-50 hover:text-rose-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Profile
                </NuxtLink>
                <NuxtLink to="/account" class="flex items-center px-5 py-3 text-sm font-medium text-stone-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  Purchases
                </NuxtLink>
                <div class="border-t border-rose-50 my-1"></div>
                <button @click="logout" class="w-full flex items-center px-5 py-3 text-sm font-medium text-amber-600 hover:bg-amber-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          <NuxtLink to="/cart" class="text-stone-600 hover:text-rose-500 hover:bg-rose-50 transition-all hover:scale-110 hover:-translate-y-0.5 relative flex items-center p-2 rounded-full duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span v-if="cart.totalItems > 0" class="absolute top-0 right-0 bg-sky-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm transform translate-x-1 -translate-y-1">{{ cart.totalItems }}</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Playful Footer -->
    <footer class="bg-white border-t-4 border-rose-100 text-stone-600 py-16 relative overflow-hidden">
      <!-- Decorative circles -->
      <div class="absolute top-0 left-10 w-24 h-24 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div class="absolute top-0 right-10 w-32 h-32 bg-sky-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div>
          <span class="text-3xl font-serif font-bold text-rose-500 mb-4 block">JasmarKids</span>
          <p class="text-sm text-stone-500 font-medium">Curated elegance for little ones. Premium fashion and accessories designed for comfort and playtime!</p>
        </div>
        <div>
          <h4 class="text-stone-800 font-black mb-4">Shop</h4>
          <ul class="space-y-3 text-sm font-medium">
            <li><NuxtLink to="/products" class="hover:text-rose-500 transition-colors">All Products</NuxtLink></li>
            <li><NuxtLink to="/products?category=new" class="hover:text-sky-500 transition-colors">New Arrivals</NuxtLink></li>
            <li><NuxtLink to="/products?category=sale" class="hover:text-amber-500 transition-colors">Sale</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-stone-800 font-black mb-4">Support</h4>
          <ul class="space-y-3 text-sm font-medium">
            <li><NuxtLink to="/faq" class="hover:text-rose-500 transition-colors">FAQ</NuxtLink></li>
            <li><NuxtLink to="/shipping" class="hover:text-sky-500 transition-colors">Shipping & Returns</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-amber-500 transition-colors">Contact Us</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-stone-800 font-black mb-4">Newsletter</h4>
          <p class="text-sm text-stone-500 font-medium mb-4">Join our community for exclusive offers and playful updates!</p>
          <form class="flex" @submit.prevent>
            <input type="email" placeholder="Email address" class="px-4 py-3 w-full bg-stone-50 text-stone-800 rounded-l-2xl border-2 border-r-0 border-rose-200 focus:outline-none focus:border-rose-400 font-medium" />
            <button type="submit" class="bg-rose-500 text-white font-bold px-6 py-3 rounded-r-2xl hover:bg-rose-600 transition-colors">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t-2 border-dashed border-stone-200 text-sm text-stone-400 font-medium text-center relative z-10">
        &copy; {{ new Date().getFullYear() }} JasmarKids. Made with ❤️ for little ones.
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

<template>
  <div class="min-h-screen flex flex-col bg-amber-50/30 font-sans text-stone-900 transition-colors duration-300">
    <Header />

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Premium Footer -->
    <footer class="bg-[#1a365d] text-gray-300 py-16 mt-auto">
      <div class="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <span class="text-3xl font-bold text-white mb-6 block tracking-wide">JasmarKids</span>
          <p class="text-sm font-light leading-relaxed text-gray-300 pr-4">Curated elegance for little ones. Premium fashion and accessories designed for comfort and playtime.</p>
        </div>
        
        <div>
          <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Shop</h4>
          <ul class="space-y-4 text-sm font-light">
            <li><NuxtLink to="/products" class="hover:text-white hover:underline underline-offset-4 transition-all">All Products</NuxtLink></li>
            <li><NuxtLink to="/products?category=new" class="hover:text-white hover:underline underline-offset-4 transition-all">New Arrivals</NuxtLink></li>
            <li><NuxtLink to="/products?category=sale" class="text-amber-400 hover:text-amber-300 hover:underline underline-offset-4 transition-all">Sale</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Support</h4>
          <ul class="space-y-4 text-sm font-light">
            <li><NuxtLink to="/faq" class="hover:text-white hover:underline underline-offset-4 transition-all">FAQ</NuxtLink></li>
            <li><NuxtLink to="/shipping" class="hover:text-white hover:underline underline-offset-4 transition-all">Shipping & Returns</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white hover:underline underline-offset-4 transition-all">Contact Us</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
          <p class="text-sm font-light text-gray-300 mb-6">Join our community for exclusive offers and playful updates!</p>
          <form class="flex w-full" @submit.prevent>
            <input type="email" placeholder="Email address" class="px-4 py-3 w-full bg-white/10 text-white placeholder-gray-400 rounded-l-md border border-white/20 focus:outline-none focus:border-white focus:bg-white/20 font-light transition-colors" />
            <button type="submit" class="bg-white text-[#1a365d] font-bold px-6 py-3 rounded-r-md hover:bg-gray-100 transition-colors">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div class="max-w-[1400px] mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-light text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} JasmarKids. Made with ❤️ for little ones.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <NuxtLink to="/privacy-policy" class="hover:text-white transition-colors">Privacy Policy</NuxtLink>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>

    <!-- Global Chat Widget -->
    <ChatWidget />

    <!-- Global Toast Notifications -->
    <ClientOnly>
      <ToastContainer />
    </ClientOnly>
    
    <AuthModal v-model="isAuthModalOpen" />
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
import { useAuth } from '~/composables/modules/auth/useAuth';

const { isAuthModalOpen } = useAuth();
</script>

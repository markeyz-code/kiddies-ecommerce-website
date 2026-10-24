<template>
  <div class="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden bg-cream-50 font-sans text-brand-900 transition-colors duration-300">
    <Header />

    <!-- Main Content -->
    <main class="flex-grow w-full max-w-full overflow-x-hidden">
      <slot />
    </main>

    <!-- Premium Footer -->
    <footer class="bg-brand-900 text-cream-100/80 pt-12 pb-24 md:py-16 mt-auto">
      <div class="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div class="col-span-2 md:col-span-1">
          <span class="text-2xl md:text-3xl font-display font-semibold text-white mb-4 md:mb-6 block tracking-tight">{{ storeSettings.storeName || 'JasmarKids' }}</span>
          <p class="text-sm font-light leading-relaxed text-cream-100/70 pr-0 md:pr-4">Curated elegance for little ones. Modern, vibrant children's fashion made for African kids. Online boutique with nationwide delivery across Nigeria.</p>
          <div class="mt-5 space-y-1.5 text-sm font-light text-cream-100/70">
            <a :href="`mailto:${storeSettings.storeEmail || 'hello@jasmarkids.com'}`" class="block hover:text-white transition-colors">✉️ {{ storeSettings.storeEmail || 'hello@jasmarkids.com' }}</a>
            <a v-if="storeSettings.phone" :href="`tel:${storeSettings.phone}`" class="block hover:text-white transition-colors">📞 {{ storeSettings.phone }}</a>
            <a :href="storeSettings.instagram || 'https://instagram.com/jasmarkids'" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-coral-200 hover:text-white font-medium transition-colors">
              📸 @jasmarkids on Instagram
            </a>
          </div>
          <div class="flex items-center gap-4 mt-4 text-xs font-bold uppercase tracking-wider">
            <a :href="storeSettings.instagram || 'https://instagram.com/jasmarkids'" target="_blank" rel="noopener" class="text-coral-300 hover:text-white">Instagram</a>
            <NuxtLink to="/contact" class="text-cream-100/70 hover:text-white">Contact</NuxtLink>
            <NuxtLink to="/faq" class="text-cream-100/70 hover:text-white">Help</NuxtLink>
          </div>
        </div>
        
        <div>
          <h4 class="text-white font-display text-base font-semibold mb-4 md:mb-6">Shop</h4>
          <ul class="space-y-3 md:space-y-4 text-sm font-light">
            <li><NuxtLink to="/products" class="hover:text-white hover:underline underline-offset-4 transition-all">All Products</NuxtLink></li>
            <li><NuxtLink to="/products?category=new" class="hover:text-white hover:underline underline-offset-4 transition-all">New Arrivals</NuxtLink></li>
            <li><NuxtLink to="/products?category=sale" class="text-amber-400 hover:text-amber-300 hover:underline underline-offset-4 transition-all">Sale</NuxtLink></li>
            <li><NuxtLink to="/size-guide" class="hover:text-white hover:underline underline-offset-4 transition-all">Size Guide</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-white font-display text-base font-semibold mb-4 md:mb-6">Support</h4>
          <ul class="space-y-3 md:space-y-4 text-sm font-light">
            <li><NuxtLink to="/faq" class="hover:text-white hover:underline underline-offset-4 transition-all">FAQ</NuxtLink></li>
            <li><NuxtLink to="/shipping" class="hover:text-white hover:underline underline-offset-4 transition-all">Shipping & Returns</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white hover:underline underline-offset-4 transition-all">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-white hover:underline underline-offset-4 transition-all">Our Story</NuxtLink></li>
          </ul>
        </div>
        
        <div class="col-span-2 md:col-span-1">
          <h4 class="text-white font-display text-base font-semibold mb-4 md:mb-6">Newsletter</h4>
          <p class="text-sm font-light text-gray-300 mb-6">Join our community for exclusive offers and playful updates!</p>
          <form class="flex w-full" @submit.prevent="subscribe">
            <input v-model="newsletterEmail" type="email" required placeholder="Email address" class="px-4 py-3 w-full bg-white/10 text-white placeholder-cream-100/50 rounded-l-xl border border-white/20 focus:outline-none focus:border-white focus:bg-white/20 font-light transition-colors" />
            <button type="submit" :disabled="subscribing" class="bg-cream-50 text-brand-900 font-bold px-6 py-3 rounded-r-xl hover:bg-white transition-colors disabled:opacity-60">
              {{ subscribing ? '…' : subscribed ? 'Subscribed ✓' : 'Subscribe' }}
            </button>
          </form>
          <p v-if="subscribeError" class="text-xs text-amber-300 mt-2">{{ subscribeError }}</p>
        </div>
      </div>
      
      <div class="max-w-[1400px] mx-auto px-4 md:px-8 mt-10 md:mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-wider text-cream-100/60">
        <span>Secure checkout</span>
        <span class="hidden sm:inline">•</span>
        <span>Paystack &amp; Stripe</span>
        <span class="hidden sm:inline">•</span>
        <span>30-day returns</span>
        <span class="hidden sm:inline">•</span>
        <span>Worldwide shipping</span>
      </div>
      <div class="max-w-[1400px] mx-auto px-4 md:px-8 mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-light text-cream-100/50">
        <p>&copy; {{ new Date().getFullYear() }} {{ storeSettings.storeName || 'JasmarKids' }}. Made with care for little ones.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <NuxtLink to="/privacy-policy" class="hover:text-white transition-colors">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-white transition-colors">Terms of Service</NuxtLink>
        </div>
      </div>
    </footer>

    <!-- Mobile bottom navigation -->
    <MobileBottomNav />

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
import { ref } from 'vue';
import { useAuth } from '~/composables/modules/auth/useAuth';
import { useCustomToast } from '~/composables/core/useCustomToast';
import { subscribers_api } from '~/api_factory/modules/subscribers';
import { useStoreSettings } from '~/composables/core/useStoreSettings';

const { isAuthModalOpen } = useAuth();
const { settings: storeSettings, fetchStoreSettings } = useStoreSettings();

onMounted(() => {
  fetchStoreSettings();
});
const { showToast } = useCustomToast();
const newsletterEmail = ref('');
const subscribing = ref(false);
const subscribed = ref(false);
const subscribeError = ref('');

const subscribe = async () => {
  subscribing.value = true;
  subscribeError.value = '';
  try {
    await subscribers_api.subscribe(newsletterEmail.value);
    subscribed.value = true;
    newsletterEmail.value = '';
    showToast({ title: 'Subscribed!', message: 'Thanks for joining the JasmarKids newsletter.', toastType: 'success' });
  } catch (error) {
    subscribeError.value = error?.response?.data?.message || 'Could not subscribe. Please try again.';
  } finally {
    subscribing.value = false;
  }
};
</script>

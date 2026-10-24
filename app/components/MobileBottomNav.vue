<template>
  <nav
    v-if="visible"
    class="fixed inset-x-0 bottom-0 z-40 border-t border-cream-200 bg-white/95 backdrop-blur md:hidden"
    style="padding-bottom: env(safe-area-inset-bottom)"
    aria-label="Mobile navigation"
  >
    <div class="grid grid-cols-5">
      <NuxtLink
        v-for="item in items"
        :key="item.label"
        :to="item.to"
        class="relative flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold transition-colors"
        :class="isActive(item.to) ? 'text-coral-600' : 'text-brand-500'"
      >
        <span class="relative">
          <component :is="item.icon" class="h-5 w-5" />
          <span
            v-if="item.label === 'Bag' && cart.totalItems > 0"
            class="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral-500 px-1 text-[9px] font-bold text-white"
          >
            {{ cart.totalItems }}
          </span>
        </span>
        <span>{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Home, LayoutGrid, Heart, User, ShoppingBag } from 'lucide-vue-next';
import { useCart } from '~/composables/core/useCart';

const route = useRoute();
const cart = useCart();

const hiddenRoutes = ['/checkout', '/checkout-success'];
const visible = computed(() => !hiddenRoutes.includes(route.path));

const items = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Shop', to: '/products', icon: LayoutGrid },
  { label: 'Wishlist', to: '/wishlist', icon: Heart },
  { label: 'Account', to: '/account', icon: User },
  { label: 'Bag', to: '/cart', icon: ShoppingBag }
];

const isActive = (path) => {
  if (path === '/') return route.path === '/';
  if (path === '/products') {
    return route.path.startsWith('/products') || route.path.startsWith('/category');
  }
  return route.path.startsWith(path);
};
</script>

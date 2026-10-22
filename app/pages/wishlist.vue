<template>
  <div class="min-h-[60vh] bg-cream-50 pb-16 md:pb-20">
    <div class="container-site py-8 sm:py-10">
      <div class="flex items-end justify-between border-b border-stone-200 pb-4 mb-8">
        <div>
          <p class="eyebrow mb-2">Saved for later</p>
          <h1 class="section-title">Your wishlist</h1>
          <p class="mt-2 text-sm font-medium text-brand-500">
            {{ products.length }} saved {{ products.length === 1 ? 'item' : 'items' }}
          </p>
        </div>
        <NuxtLink to="/products" class="btn-ghost">Continue shopping <span aria-hidden="true">→</span></NuxtLink>
      </div>

      <div v-if="loading" class="text-center py-24 text-stone-500 font-bold animate-pulse">Loading your wishlist…</div>

      <div v-else-if="!user" class="rounded-3xl border border-dashed border-cream-300 bg-white py-16 text-center">
        <p class="text-lg font-bold text-stone-800 mb-2">Sign in to see your wishlist</p>
        <p class="text-sm text-stone-500 mb-6">Save your favourite outfits and find them here later.</p>
        <NuxtLink to="/login?redirect=/wishlist" class="btn-primary">Sign In</NuxtLink>
      </div>

      <div v-else-if="products.length === 0" class="rounded-3xl border border-dashed border-cream-300 bg-white py-16 text-center">
        <span class="text-6xl block mb-4">💔</span>
        <p class="text-lg font-bold text-stone-800 mb-2">Your wishlist is empty</p>
        <p class="text-sm text-stone-500 mb-6">Tap the heart on a product to save it for later.</p>
        <NuxtLink to="/products" class="btn-primary">Browse Products</NuxtLink>
      </div>

      <div v-else class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        <div v-for="product in products" :key="product._id" class="flex flex-col">
          <ProductCard :product="product" @quick-view="openQuickView" />
          <button @click="remove(product)" class="mt-2 text-xs font-bold text-red-600 hover:text-red-700 underline underline-offset-2 self-start">
            Remove from wishlist
          </button>
        </div>
      </div>
    </div>

    <QuickViewModal :is-open="isQuickViewOpen" :product="selectedProduct" @close="closeQuickView" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '~/composables/modules/auth/useAuth';
import { productsApi } from '~/api_factory/modules/products';
import { useCustomToast } from '~/composables/core/useCustomToast';

const { user, fetchProfile, toggleWishlist } = useAuth();
const { showToast } = useCustomToast();

const products = ref([]);
const loading = ref(true);

const loadWishlist = async () => {
  loading.value = true;
  try {
    await fetchProfile();
    const ids = user.value?.wishlist || [];
    if (ids.length) {
      const results = await Promise.allSettled(ids.map((id) => productsApi.getProductById(id)));
      products.value = results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value.data);
    } else {
      products.value = [];
    }
  } finally {
    loading.value = false;
  }
};

const remove = async (product) => {
  const result = await toggleWishlist(product._id);
  if (result === false) {
    products.value = products.value.filter((p) => p._id !== product._id);
    showToast({ title: 'Removed', message: `${product.name} removed from your wishlist`, toastType: 'success' });
  }
};

const isQuickViewOpen = ref(false);
const selectedProduct = ref(null);
const openQuickView = (product) => {
  selectedProduct.value = product;
  isQuickViewOpen.value = true;
};
const closeQuickView = () => {
  isQuickViewOpen.value = false;
  setTimeout(() => { selectedProduct.value = null; }, 300);
};

onMounted(loadWishlist);
</script>

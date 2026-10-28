<template>
  <div v-if="displayProduct.isPromo" class="col-span-1">
    <a :href="displayProduct.link" class="block h-full cursor-pointer hover:opacity-90 transition-opacity">
      <img :src="displayProduct.image" class="w-full h-full object-cover" alt="Promo" />
    </a>
  </div>
  
  <div v-else class="flex flex-col group font-sans relative">
    <div class="relative bg-cream-100 border border-cream-200 rounded-2xl aspect-[4/5] mb-3.5 overflow-hidden cursor-pointer" @click="$emit('quickView', displayProduct)">
      <img :src="displayProduct.image" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" :alt="displayProduct.name" />
      
      <!-- Badges -->
      <div class="absolute top-2 left-2 flex flex-col space-y-1">
        <div v-for="badge in displayProduct.badges" :key="badge" class="bg-coral-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
          {{ badge }}
        </div>
      </div>
      
      <!-- Pack Badge -->
      <div v-if="displayProduct.pack" class="absolute bottom-4 left-4 bg-brand-700 text-white text-xs font-bold w-12 h-12 rounded-full flex flex-col items-center justify-center leading-tight shadow-md border-2 border-white">
        <span class="text-sm">{{ displayProduct.pack.split(' ')[0] }}</span>
        <span class="text-[9px] uppercase">{{ displayProduct.pack.split(' ')[1] }}</span>
      </div>
      
      <!-- Favorite Heart -->
      <button
        class="absolute z-10 top-2.5 right-2.5 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm transition-colors"
        :class="isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
        :aria-label="isFavorite ? 'Remove from wishlist' : 'Add to wishlist'"
        @click.stop.prevent="handleToggleFavorite"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :fill="isFavorite ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      </button>
    </div>
    
    <!-- Color Swatches -->
    <div v-if="displayProduct.colors && displayProduct.colors.length" class="flex space-x-1 mb-2">
      <div v-for="(color, index) in displayProduct.colors.slice(0, 5)" :key="index" 
        class="w-3 h-3 rounded-full border border-gray-300"
        :style="{ backgroundColor: getSwatchColor(color) }"
      ></div>
    </div>
    
    <!-- Price -->
    <div class="flex items-center space-x-2 text-xs mb-1">
      <span class="font-bold text-brand-900 text-sm">${{ displayProduct.price.toFixed(2) }}</span>
      <span v-if="displayProduct.originalPrice > displayProduct.price" class="text-gray-500 line-through">${{ displayProduct.originalPrice.toFixed(2) }}</span>
      <span v-if="displayProduct.discount" class="text-red-600 font-bold">{{ displayProduct.discount }}</span>
    </div>
    
    <!-- Title -->
    <NuxtLink :to="`/product/${displayProduct.id}`" class="text-sm font-semibold text-brand-900 mb-1 hover:text-coral-500 transition-colors line-clamp-2 leading-snug min-h-[2.4rem]">{{ displayProduct.name }}</NuxtLink>
    
    <!-- Rating -->
    <div v-if="displayProduct.rating" class="flex items-center space-x-1 mb-3">
      <div class="flex text-coral-400">
        <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" :fill="i <= Math.round(displayProduct.rating) ? 'currentColor' : 'none'" :stroke="i <= Math.round(displayProduct.rating) ? 'none' : 'currentColor'">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <span class="text-[10px] text-brand-400">{{ displayProduct.reviews }}</span>
    </div>
    
    <button @click.prevent="handleAddToBag" class="w-full rounded-full border border-brand-900/15 bg-white py-2.5 text-[11px] font-bold tracking-widest uppercase text-brand-900 transition-all hover:border-brand-900 hover:bg-brand-700 hover:text-white active:scale-[0.99] mt-auto">
      Add To Bag
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCustomToast } from '~/composables/core/useCustomToast';
import { useCart } from '~/composables/core/useCart';
import { useAuth } from '~/composables/modules/auth/useAuth';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['quickView']);
const { showToast } = useCustomToast();
const cart = useCart();
const { user, toggleWishlist } = useAuth();

const isFavorite = computed(() => {
  if (!user.value || !user.value.wishlist) return false;
  return user.value.wishlist.includes(displayProduct.value.id);
});

const handleToggleFavorite = async () => {
  await toggleWishlist(displayProduct.value.id);
};

// Open QuickView for size selection instead of adding directly to cart
const handleAddToBag = () => {
  emit('quickView', displayProduct.value);
};

const getSwatchColor = (color) => {
  const colorMap = {
    'white': '#ffffff', 'blue': '#2563eb', 'pink': '#f9a8d4', 'purple': '#a855f7',
    'green': '#16a34a', 'brown': '#92400e', 'orange': '#fb923c', 'red': '#ef4444',
    'navy': '#1e3a5f', 'black': '#111111', 'gray': '#9ca3af', 'cream': '#fef3c7',
    'yellow': '#fbbf24', 'khaki': '#c4a882', 'coral': '#f97066', 'mint': '#6ee7b7',
    'lavender': '#c4b5fd', 'gold': '#f59e0b', 'silver': '#d1d5db', 'tan': '#d2b48c',
  };
  return colorMap[color?.toLowerCase()] || '#9ca3af';
};

const displayProduct = computed(() => {
  const p = props.product;
  
  // Already normalized (from QuickView etc.)
  if (p.image && p.isPromo !== undefined) return p;

  let image = '/img/placeholder.jpg';
  if (p.imageUrls?.original) image = p.imageUrls.original;
  else if (p.imageUrls?.large) image = p.imageUrls.large;
  else if (p.imageUrls?.medium) image = p.imageUrls.medium;
  else if (p.images && p.images.length > 0) image = p.images[0].url || image;

  const price = p.basePrice || 0;
  const originalPrice = p.compareAtPrice || p.originalPrice || 0;
  
  let discount = '';
  if (originalPrice > price && originalPrice > 0) {
    const diff = ((originalPrice - price) / originalPrice) * 100;
    discount = `${Math.round(diff)}% OFF`;
  }

  const badges = [];
  if (p.tags) {
    if (p.tags.includes('best-seller')) badges.push('BEST SELLER');
    if (p.tags.includes('top-rated')) badges.push('TOP RATED');
  }

  let pack = null;
  if (p.name?.toLowerCase().includes('3-pack') || p.tags?.includes('3-pack')) pack = '3 PACK';
  if (p.name?.toLowerCase().includes('5-pack') || p.tags?.includes('5-pack')) pack = '5 PACK';
  if (p.name?.toLowerCase().includes('7-pack') || p.tags?.includes('7-pack')) pack = '7 PACK';
  if (p.name?.toLowerCase().includes('2-pack') || p.tags?.includes('2-pack')) pack = '2 PACK';

  const colors = [];
  if (p.variants) {
    p.variants.forEach(v => {
      if (v.color && !colors.includes(v.color.toLowerCase())) {
        colors.push(v.color.toLowerCase());
      }
    });
  }

  // Extract sizes from variants
  let sizes = [];
  if (p.variants) {
    sizes = [...new Set(p.variants.map(v => v.size).filter(Boolean))];
  }

  return {
    _id: p._id || p.id,
    id: p._id || p.id,
    name: p.name,
    price,
    basePrice: price,
    originalPrice,
    costPrice: originalPrice,
    discount,
    rating: p.averageRating || 0,
    reviews: p.reviewCount || 0,
    badges,
    pack,
    image,
    imageUrls: p.imageUrls || null,
    colors,
    sizes,
    variants: p.variants || [],
    isPromo: false
  };
});
</script>

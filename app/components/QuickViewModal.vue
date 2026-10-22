<template>
  <div v-if="isOpen && normalizedProduct" class="fixed inset-0 z-50 flex items-center justify-center font-sans">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close"></div>
    
    <!-- Modal Content -->
    <div class="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col md:flex-row rounded-lg">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-500 hover:text-black z-20 bg-white/80 rounded-full p-1" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <!-- Mobile Title (Hidden on desktop) -->
      <div class="md:hidden border-b p-4 text-center text-sm font-bold truncate">
        {{ normalizedProduct.name }}
      </div>

      <!-- Left: Image Area -->
      <div class="w-full md:w-1/2 bg-cream-100 p-8 flex items-center justify-center relative">
        <img :src="normalizedProduct.image" class="max-w-full max-h-[60vh] object-contain mix-blend-multiply" :alt="normalizedProduct.name" />
        
        <div v-if="normalizedProduct.pack" class="absolute bottom-6 left-6 bg-brand-900 text-white text-sm font-bold w-16 h-16 rounded-full flex flex-col items-center justify-center leading-tight shadow-md border-2 border-white">
          <span class="text-xl">{{ normalizedProduct.pack.split(' ')[0] }}</span>
          <span class="text-[10px] uppercase">{{ normalizedProduct.pack.split(' ')[1] }}</span>
        </div>
      </div>

      <!-- Right: Details Area -->
      <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
        <!-- Desktop Title -->
        <h2 class="hidden md:block text-sm font-bold text-gray-900 mb-4 truncate text-center border-b pb-4">{{ normalizedProduct.name }}</h2>
        
        <!-- Price and Rating -->
        <div class="flex justify-between items-start mb-6 mt-4 md:mt-0">
          <div>
            <div class="flex items-center space-x-2 text-sm mb-1">
              <span class="font-bold text-black text-xl">${{ normalizedProduct.price.toFixed(2) }}</span>
              <span v-if="normalizedProduct.originalPrice > normalizedProduct.price" class="text-gray-500 line-through">${{ normalizedProduct.originalPrice.toFixed(2) }}</span>
              <span v-if="normalizedProduct.discount" class="text-red-600 font-bold">{{ normalizedProduct.discount }}</span>
            </div>
          </div>
          
          <div v-if="normalizedProduct.rating" class="flex items-center text-coral-400">
            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" :fill="i <= Math.round(normalizedProduct.rating) ? 'currentColor' : 'none'" :stroke="i <= Math.round(normalizedProduct.rating) ? 'none' : 'currentColor'">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-xs text-gray-800 ml-1 font-bold">{{ normalizedProduct.reviews }}</span>
          </div>
        </div>

        <!-- Size Selector -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-bold uppercase tracking-widest">Size</span>
            <a href="#" class="text-xs text-blue-600 underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
              Size Guide
            </a>
          </div>
          <div v-if="!sizeError" class="flex flex-wrap gap-2">
            <button v-for="size in availableSizes" :key="size" 
              class="border border-gray-300 py-1.5 px-3 text-xs font-semibold hover:border-black transition-colors"
              :class="{'border-black bg-gray-50 ring-1 ring-black': selectedSize === size}"
              @click="selectedSize = size">
              {{ size }}
            </button>
          </div>
          <div v-if="sizeError" class="mt-2">
            <div class="flex flex-wrap gap-2 mb-2">
              <button v-for="size in availableSizes" :key="size" 
                class="border py-1.5 px-3 text-xs font-semibold transition-colors"
                :class="selectedSize === size ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-red-300 text-red-600'"
                @click="selectedSize = size; sizeError = false">
                {{ size }}
              </button>
            </div>
            <p class="text-red-500 text-xs font-bold animate-pulse">⚠️ Please select a size</p>
          </div>
        </div>

        <div class="text-center mt-4 mb-auto">
          <NuxtLink :to="`/product/${normalizedProduct.id}`" @click="close" class="text-xs font-bold text-blue-800 underline hover:opacity-80">View Full Product Details</NuxtLink>
        </div>

        <!-- Add to Bag -->
        <div class="flex items-center space-x-4 mt-8 pt-6 border-t border-gray-200">
          <div class="flex items-center border border-gray-300 rounded overflow-hidden h-10 w-24">
            <button class="px-2 text-gray-500 hover:bg-gray-100 h-full" @click="quantity > 1 ? quantity-- : null">-</button>
            <input type="text" class="w-full text-center text-sm font-bold border-x border-gray-300 h-full" v-model="quantity" readonly>
            <button class="px-2 text-gray-500 hover:bg-gray-100 h-full" @click="quantity++">+</button>
          </div>
          <button @click="addToBag" class="flex-1 bg-brand-900 text-white h-10 text-xs font-bold uppercase tracking-widest hover:bg-brand-800 transition-colors rounded-sm">
            Add To Bag
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useCustomToast } from '~/composables/core/useCustomToast';
import { useCart } from '~/composables/core/useCart';

const props = defineProps({
  isOpen: Boolean,
  product: Object
});

const emit = defineEmits(['close']);
const { showToast } = useCustomToast();
const cart = useCart();

const selectedSize = ref('');
const quantity = ref(1);
const sizeError = ref(false);

// Normalize the product (handle both raw backend and pre-normalized data)
const normalizedProduct = computed(() => {
  const p = props.product;
  if (!p) return null;

  // If already normalized with image+id, use as-is
  if (p.image && p.id) {
    return {
      ...p,
      price: p.price || p.basePrice || 0,
      basePrice: p.basePrice || p.price || 0,
      originalPrice: p.originalPrice || p.costPrice || 0,
    };
  }

  // Normalize raw backend product
  let image = '/img/placeholder.jpg';
  if (p.imageUrls?.original) image = p.imageUrls.original;
  else if (p.imageUrls?.large) image = p.imageUrls.large;
  else if (p.images && p.images.length > 0) image = p.images[0].url || image;

  const price = p.basePrice || 0;
  const originalPrice = p.compareAtPrice || p.originalPrice || 0;

  let discount = '';
  if (originalPrice > price && originalPrice > 0) {
    const diff = ((originalPrice - price) / originalPrice) * 100;
    discount = `${Math.round(diff)}% OFF`;
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
    pack: null,
    image,
    imageUrls: p.imageUrls,
    sizes: p.sizes || [],
    variants: p.variants || [],
  };
});

// Extract unique sizes from variants
const availableSizes = computed(() => {
  const p = normalizedProduct.value;
  if (!p) return [];
  if (p.sizes && p.sizes.length > 0) return p.sizes;
  if (p.variants && p.variants.length > 0) {
    return [...new Set(p.variants.map(v => v.size).filter(Boolean))];
  }
  return ['XS (4)', 'S (5-6)', 'M (7-8)', 'L (10-12)', 'XL (14-16)'];
});

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    selectedSize.value = '';
    quantity.value = 1;
    sizeError.value = false;
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
  } else {
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }
});

const close = () => {
  emit('close');
};

const addToBag = () => {
  if (!selectedSize.value) {
    sizeError.value = true;
    showToast({
      title: 'Select a Size',
      message: 'Please choose a size before adding to bag.',
      toastType: 'error'
    });
    return;
  }
  
  // Pass the normalized product with all fields the cart needs
  const cartProduct = {
    _id: normalizedProduct.value._id || normalizedProduct.value.id,
    id: normalizedProduct.value.id || normalizedProduct.value._id,
    name: normalizedProduct.value.name,
    basePrice: normalizedProduct.value.basePrice || normalizedProduct.value.price,
    price: normalizedProduct.value.price || normalizedProduct.value.basePrice,
    image: normalizedProduct.value.image,
    imageUrls: normalizedProduct.value.imageUrls,
  };

  cart.addToCart(cartProduct, quantity.value, { size: selectedSize.value });

  showToast({
    title: 'Added to Bag! 🛍️',
    message: `${normalizedProduct.value.name} (Size: ${selectedSize.value}, Qty: ${quantity.value}) added to your bag.`,
    toastType: 'success'
  });
  close();
};
</script>

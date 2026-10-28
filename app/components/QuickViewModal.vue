<template>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="isOpen && normalizedProduct" class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 font-sans pointer-events-auto">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-brand-950/65 backdrop-blur-sm transition-opacity" @click="close"></div>
        
        <!-- Modal Card Container -->
        <div class="bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col md:flex-row rounded-3xl border border-cream-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200 hide-scrollbar">
          <!-- Close Button -->
          <button 
            class="absolute top-4 right-4 text-brand-500 hover:text-brand-900 z-30 bg-white/90 hover:bg-cream-100 rounded-full h-9 w-9 flex items-center justify-center shadow-sm border border-cream-200/80 transition-all cursor-pointer" 
            @click="close"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Left: Product Image Showcase -->
          <div class="w-full md:w-1/2 bg-gradient-to-br from-cream-100/90 via-cream-50 to-cream-100/60 p-6 sm:p-8 flex items-center justify-center relative min-h-[320px] md:min-h-[460px] select-none">
            <div class="relative w-full h-full max-h-[420px] flex items-center justify-center overflow-hidden rounded-2xl group">
              <img 
                :src="normalizedProduct.image" 
                class="max-w-full max-h-[400px] object-contain rounded-xl drop-shadow-md transition-transform duration-500 group-hover:scale-105" 
                :alt="normalizedProduct.name" 
              />
            </div>
            
            <!-- Badges -->
            <div class="absolute top-5 left-5 flex flex-col gap-1.5 z-20">
              <span v-if="normalizedProduct.discount" class="bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                {{ normalizedProduct.discount }}
              </span>
              <span class="bg-brand-950/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                Premium Cotton
              </span>
            </div>

            <!-- Pack Badge -->
            <div v-if="normalizedProduct.pack" class="absolute bottom-5 left-5 bg-brand-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <span>🎒</span>
              <span>{{ normalizedProduct.pack }}</span>
            </div>
          </div>

          <!-- Right: Product Details Area -->
          <div class="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              <!-- Eyebrow & Category -->
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-black uppercase tracking-widest text-amber-800 bg-coral-50 px-2.5 py-0.5 rounded-md border border-coral-200/50">
                  Kidswear Essential
                </span>
                <span class="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  In Stock
                </span>
              </div>

              <!-- Product Title -->
              <h2 class="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-brand-900 tracking-tight leading-snug">
                {{ normalizedProduct.name }}
              </h2>
              
              <!-- Ratings & Review Count -->
              <div class="flex items-center gap-2 mt-2">
                <div class="flex items-center text-coral-300">
                  <svg v-for="i in 5" :key="i" class="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="text-xs font-bold text-brand-800">
                  {{ (normalizedProduct.rating || 4.9).toFixed(1) }}
                </span>
                <span class="text-xs text-brand-400 font-normal">
                  ({{ normalizedProduct.reviews || 24 }} verified reviews)
                </span>
              </div>

              <!-- Price Header -->
              <div class="flex items-baseline gap-3 my-4">
                <span class="font-display text-3xl font-bold text-brand-900 tracking-tight">
                  ${{ normalizedProduct.price.toFixed(2) }}
                </span>
                <span v-if="normalizedProduct.originalPrice > normalizedProduct.price" class="text-brand-400 text-sm line-through font-medium">
                  ${{ normalizedProduct.originalPrice.toFixed(2) }}
                </span>
              </div>

              <!-- Size Selector -->
              <div class="mb-5">
                <div class="flex justify-between items-center mb-2.5">
                  <span class="text-xs font-bold uppercase tracking-wider text-brand-700">Select Size</span>
                  <button type="button" class="inline-flex items-center text-xs font-semibold text-brand-700 hover:text-brand-900 underline underline-offset-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                    Size Guide
                  </button>
                </div>

                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="size in availableSizes" 
                    :key="size" 
                    type="button"
                    class="rounded-xl border px-3.5 py-2 text-xs font-bold transition-all cursor-pointer select-none"
                    :class="[
                      selectedSize === size
                        ? 'border-brand-900 bg-brand-700 text-white shadow-sm ring-2 ring-brand-900/10'
                        : 'border-cream-200 bg-cream-50 hover:bg-cream-100 text-brand-700 hover:border-brand-300',
                      sizeError && !selectedSize ? 'border-rose-400 bg-rose-50 text-rose-700' : ''
                    ]"
                    @click="selectedSize = size; sizeError = false"
                  >
                    {{ size }}
                  </button>
                </div>
                <p v-if="sizeError" class="text-rose-600 text-xs font-bold mt-2 animate-bounce flex items-center gap-1">
                  <span>⚠️</span> Please select a size to continue
                </p>
              </div>

              <!-- Quality Features Pill -->
              <div class="grid grid-cols-2 gap-2 text-[11px] text-brand-500 bg-cream-50/70 p-3 rounded-2xl border border-cream-200/80 mb-4">
                <div class="flex items-center gap-1.5">
                  <span class="text-sm">🚚</span>
                  <span>Free shipping on $30+</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="text-sm">🌿</span>
                  <span>Soft organic cotton</span>
                </div>
              </div>
            </div>

            <!-- Footer: Quantity Stepper & Add to Bag -->
            <div class="pt-4 border-t border-cream-100">
              <div class="flex items-center gap-3">
                <!-- Quantity Stepper -->
                <div class="flex h-12 w-28 items-center overflow-hidden rounded-xl border border-cream-200 bg-cream-50 select-none">
                  <button 
                    type="button" 
                    aria-label="Decrease quantity" 
                    class="h-full px-3 text-brand-500 hover:bg-cream-200 hover:text-brand-900 transition-colors font-bold cursor-pointer" 
                    @click="quantity > 1 ? quantity-- : null"
                  >−</button>
                  <input 
                    type="text" 
                    class="h-full w-full bg-transparent text-center text-sm font-black text-brand-800 outline-none" 
                    :value="quantity" 
                    readonly
                  />
                  <button 
                    type="button" 
                    aria-label="Increase quantity" 
                    class="h-full px-3 text-brand-500 hover:bg-cream-200 hover:text-brand-900 transition-colors font-bold cursor-pointer" 
                    @click="quantity++"
                  >+</button>
                </div>

                <!-- Add To Bag Button -->
                <button 
                  type="button" 
                  @click="addToBag" 
                  class="flex-1 h-12 bg-brand-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-brand-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Add To Bag</span>
                </button>
              </div>

              <!-- View Full Details Link -->
              <div class="text-center mt-3">
                <NuxtLink 
                  :to="`/product/${normalizedProduct.id}`" 
                  @click="close" 
                  class="inline-flex items-center gap-1.5 text-xs font-bold text-brand-500 hover:text-brand-900 transition-colors group"
                >
                  <span>View full product details</span>
                  <span class="transform group-hover:translate-x-1 transition-transform">→</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
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
  return ['2T', '3T', '4T', '5T', '6'];
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
    title: 'Added to bag',
    message: `${normalizedProduct.value.name} (Size: ${selectedSize.value}, Qty: ${quantity.value}) added to your bag.`,
    toastType: 'success'
  });
  close();
};
</script>

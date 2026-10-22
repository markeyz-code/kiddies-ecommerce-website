<template>
  <div class="min-h-screen bg-cream-50 font-sans text-brand-900 pb-20">

    <!-- Breadcrumbs -->
    <div class="container-site flex items-center gap-2 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-400">
      <NuxtLink to="/" class="text-brand-500 hover:text-brand-900">Home</NuxtLink>
      <span>&gt;</span>
      <NuxtLink to="/products" class="text-brand-500 hover:text-brand-900">Products</NuxtLink>
      <span>&gt;</span>
      <span class="truncate max-w-[200px]">{{ product?.name || 'Product' }}</span>
    </div>

    <div v-if="loading" class="text-center py-24">
      <p class="text-xl text-gray-500 animate-pulse">Loading product...</p>
    </div>
    <div v-else-if="product" class="max-w-[1200px] mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
      
      <!-- Left: Images -->
      <div class="w-full md:w-[60%] flex flex-col space-y-4">
        <!-- Main Image -->
        <div class="relative flex w-full items-center justify-center overflow-hidden rounded-3xl border border-cream-200 bg-cream-100 p-6 sm:p-10 group cursor-crosshair"
             @mousemove="handleMouseMove($event, 'main')" 
             @mouseenter="activeZoom = 'main'; isZooming = true" 
             @mouseleave="isZooming = false; activeZoom = null">
          
          <img :src="activeImage || product.image" class="w-full max-h-[70vh] object-contain mix-blend-multiply pointer-events-none" :alt="product.name" />
          
          <!-- Tracking Lens -->
          <div v-show="isZooming && activeZoom === 'main'" class="absolute bg-white/30 border border-gray-400 pointer-events-none"
               :style="lensStyle"></div>
          
          <button @click="toggleFavorite" class="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-gray-50 md:opacity-0 group-hover:opacity-100 transition-opacity z-10" :class="isFavorite ? 'text-red-500 opacity-100' : 'text-gray-400 hover:text-red-500'">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :fill="isFavorite ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
          
          <div v-if="product.pack" class="absolute bottom-6 left-6 bg-brand-900 text-white text-sm font-bold w-20 h-20 rounded-full flex flex-col items-center justify-center leading-tight shadow-md border-2 border-white z-10">
            <span class="text-3xl">{{ product.pack.split(' ')[0] }}</span>
            <span class="text-xs uppercase">{{ product.pack.split(' ')[1] }}</span>
          </div>
        </div>

        <!-- Thumbnails -->
        <div v-if="productImages.length > 1" class="flex gap-3 overflow-x-auto pb-1">
          <button
            v-for="(img, index) in productImages"
            :key="index"
            type="button"
            @click="activeImage = img"
            class="w-20 h-20 flex-shrink-0 bg-cream-100 rounded-lg overflow-hidden border-2 transition-colors"
            :class="activeImage === img ? 'border-brand-900' : 'border-transparent hover:border-gray-300'"
            :aria-label="`View image ${index + 1}`"
          >
            <img :src="img" class="w-full h-full object-cover mix-blend-multiply" :alt="`${product.name} image ${index + 1}`" />
          </button>
        </div>
      </div>

      <!-- Right: Details -->
      <div class="w-full md:w-[40%] flex flex-col pt-4 sticky top-4 relative">
        
        <!-- Zoom Portal Overlay -->
        <div v-if="isZooming" class="absolute inset-0 z-50 bg-white border border-gray-200 shadow-2xl rounded-lg overflow-hidden pointer-events-none" style="min-height: 500px;">
          <div class="w-full h-full bg-no-repeat" :style="portalStyle"></div>
        </div>

        <div :class="{ 'opacity-0': isZooming }">
          <p class="eyebrow mb-3">JasmarKids · <NuxtLink to="/products" class="pointer-events-auto underline underline-offset-4">Shop all</NuxtLink></p>
          
          <h1 class="font-display text-2xl font-semibold leading-tight text-brand-900 mb-4 sm:text-3xl">{{ product.name }}</h1>
          
          <div class="flex items-center space-x-4 mb-6">
            <div class="flex items-center text-coral-400">
              <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" :fill="i <= Math.round(product.rating) ? 'currentColor' : 'none'" :stroke="i <= Math.round(product.rating) ? 'none' : 'currentColor'">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span @click.prevent="showReviews = true" class="text-xs text-gray-800 ml-1 underline cursor-pointer hover:text-brand-900">
                {{ reviews.length || product.reviews || 0 }} {{ (reviews.length || product.reviews) === 1 ? 'review' : 'reviews' }}
              </span>
            </div>
          </div>

          <div class="mb-6">
            <div class="flex items-end space-x-3 mb-1">
              <span class="font-display text-3xl font-semibold text-brand-900">${{ product.price.toFixed(2) }}</span>
              <div v-if="product.originalPrice > product.price" class="flex flex-col text-xs font-bold leading-tight">
                <span class="text-gray-500 line-through">${{ product.originalPrice.toFixed(2) }}</span>
                <span class="text-red-600">{{ product.discount }}</span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <p v-if="product.description" class="text-sm text-gray-600 mb-6 leading-relaxed">{{ product.description }}</p>

          <!-- Size Selector -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-3">
              <span class="text-xs font-bold uppercase tracking-widest">Size: <span v-if="selectedSize" class="text-brand-900">{{ selectedSize }}</span></span>
              <a href="#" @click.prevent="showSizeGuide = true" class="text-xs text-brand-900 font-bold underline flex items-center hover:text-brand-800">
                Size Guide
              </a>
            </div>
            <div class="flex flex-wrap gap-2">
              <button v-for="size in product.sizes" :key="size" 
                class="rounded-full border px-4 py-2.5 text-xs font-semibold transition-all"
                :class="selectedSize === size ? 'border-brand-900 bg-brand-900 text-white' : 'border-cream-300 bg-white text-brand-700 hover:border-brand-400'"
                @click="selectedSize = size; sizeError = false">
                {{ size }}
              </button>
            </div>
            <p v-if="sizeError" class="text-red-500 text-xs font-bold mt-2 animate-pulse">Please select a size</p>
          </div>

          <!-- Add to Bag -->
          <div class="flex items-center space-x-4 mb-8">
            <div class="flex h-12 w-28 items-center overflow-hidden rounded-full border border-cream-300 bg-white">
              <button class="px-3 text-gray-500 hover:bg-gray-100 h-full font-bold" @click="quantity > 1 ? quantity-- : null">-</button>
              <input type="text" class="w-full text-center text-sm font-bold border-x border-gray-300 h-full" v-model="quantity" readonly>
              <button class="px-3 text-gray-500 hover:bg-gray-100 h-full font-bold" @click="quantity++">+</button>
            </div>
            <button @click="addToBag" class="btn-primary h-12 flex-1">
              Add To Bag
            </button>
          </div>

          <!-- Trust Badges -->
          <div class="grid grid-cols-3 gap-2 rounded-2xl border border-cream-200 bg-white p-4 mb-6 text-[10px] font-bold text-brand-600">
            <div class="flex items-center text-center max-w-[80px]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              <span>Free Shipping<br/><span class="font-normal text-[8px]">on orders $30+</span></span>
            </div>
            <div class="flex items-center text-center max-w-[90px]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <span>Easy Returns<br/><span class="font-normal text-[8px]">30-day policy</span></span>
            </div>
            <div class="flex items-center text-center max-w-[80px]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span>Secure Payment<br/><span class="font-normal text-[8px]">Worry-free checkout</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-24 text-xl">
      Product not found.
    </div>

    <!-- Size Guide Modal -->
    <div v-if="showSizeGuide" class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 transition-all duration-300" @click="showSizeGuide = false">
      <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative" @click.stop>
        <button @click="showSizeGuide = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <h3 class="mb-6 font-display text-2xl font-semibold text-brand-900">Size guide</h3>
        
        <div class="overflow-x-auto border border-gray-200 rounded-xl">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" class="px-6 py-4 font-bold">Size</th>
                <th scope="col" class="px-6 py-4 font-bold">Age</th>
                <th scope="col" class="px-6 py-4 font-bold">Height (in)</th>
                <th scope="col" class="px-6 py-4 font-bold">Weight (lbs)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b hover:bg-gray-50">
                <td class="px-6 py-4 font-bold text-gray-900">XS (4)</td>
                <td class="px-6 py-4">3-4 yrs</td>
                <td class="px-6 py-4">39-42</td>
                <td class="px-6 py-4">33-39</td>
              </tr>
              <tr class="bg-white border-b hover:bg-gray-50">
                <td class="px-6 py-4 font-bold text-gray-900">S (5-6)</td>
                <td class="px-6 py-4">5-6 yrs</td>
                <td class="px-6 py-4">43-48</td>
                <td class="px-6 py-4">40-50</td>
              </tr>
              <tr class="bg-white border-b hover:bg-gray-50">
                <td class="px-6 py-4 font-bold text-gray-900">M (7-8)</td>
                <td class="px-6 py-4">7-8 yrs</td>
                <td class="px-6 py-4">49-54</td>
                <td class="px-6 py-4">51-65</td>
              </tr>
              <tr class="bg-white border-b hover:bg-gray-50">
                <td class="px-6 py-4 font-bold text-gray-900">L (10-12)</td>
                <td class="px-6 py-4">9-10 yrs</td>
                <td class="px-6 py-4">55-60</td>
                <td class="px-6 py-4">66-87</td>
              </tr>
              <tr class="bg-white hover:bg-gray-50">
                <td class="px-6 py-4 font-bold text-gray-900">XL (14-16)</td>
                <td class="px-6 py-4">11-12 yrs</td>
                <td class="px-6 py-4">61-63</td>
                <td class="px-6 py-4">88-115</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 text-xs text-gray-500 italic">* Measurements are approximate and may vary slightly by style.</p>
      </div>
    </div>

    <!-- Reviews Modal -->
    <div v-if="showReviews" class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 transition-all duration-300" @click="showReviews = false">
      <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col relative" @click.stop>
        <button @click="showReviews = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        <div class="mb-6 border-b pb-4">
          <h3 class="font-display text-2xl font-semibold text-brand-900">Customer reviews</h3>
          <div class="flex items-center gap-3 mt-2">
            <div class="flex items-center text-coral-400">
              <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="font-bold text-xl">{{ product?.rating || 4.8 }} out of 5</span>
            <span class="text-gray-500 text-sm">({{ product?.reviews || 52 }} global ratings)</span>
          </div>
        </div>

        <div class="overflow-y-auto pr-4 space-y-6 flex-1">
          <div v-if="reviewsLoading" class="text-center py-8 text-gray-500 font-medium">Loading reviews…</div>
          <div v-else-if="reviews.length === 0" class="text-center py-8">
            <p class="text-gray-600 font-medium">No reviews yet. Be the first to share your thoughts!</p>
          </div>
          <template v-else>
          <div v-for="review in reviews" :key="review._id" class="border-b pb-6 last:border-0">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                {{ (review.userId?.firstName || 'A').charAt(0) }}{{ (review.userId?.lastName || 'C').charAt(0) }}
              </div>
              <span class="font-bold text-sm text-gray-900">
                {{ review.userId?.firstName || 'Verified' }} {{ review.userId?.lastName || 'Customer' }}
              </span>
              <span class="text-gray-400 text-xs ml-auto">{{ new Date(review.createdAt).toLocaleDateString() }}</span>
            </div>
            <div class="flex text-coral-400 mb-2">
              <svg v-for="i in 5" :key="i" class="h-3 w-3" viewBox="0 0 20 20" :fill="i <= review.rating ? 'currentColor' : '#e5e7eb'">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <p class="text-sm text-gray-600">{{ review.comment }}</p>
          </div>
          </template>

          <!-- Write a review -->
          <div class="border-t pt-6">
            <h4 class="font-bold text-sm text-gray-800 mb-3">Write a review</h4>
            <div v-if="!user" class="text-sm text-gray-500">
              Please <NuxtLink to="/login" class="font-bold text-brand-900 underline">sign in</NuxtLink> to leave a review.
            </div>
            <form v-else @submit.prevent="handleSubmitReview" class="space-y-3">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold uppercase tracking-widest text-gray-500">Rating</span>
                <button v-for="star in 5" :key="star" type="button" @click="reviewRating = star" class="text-2xl leading-none" :class="star <= reviewRating ? 'text-coral-400' : 'text-gray-300'">★</button>
              </div>
              <textarea v-model="reviewComment" rows="3" placeholder="Tell us what you think about this product..." class="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-900"></textarea>
              <button type="submit" :disabled="reviewsLoading || !reviewComment.trim()" class="bg-brand-900 text-white px-6 py-2.5 rounded-full text-sm font-bold disabled:opacity-50">
                {{ reviewsLoading ? 'Submitting…' : 'Submit Review' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- You May Also Like Section -->
    <div v-if="relatedProducts && relatedProducts.length > 0" class="container-site py-14 sm:py-20 border-t border-cream-200 mt-10">
      <div class="mb-8 text-center"><p class="eyebrow mb-2">Complete the look</p><h2 class="section-title">You may also like</h2></div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <NuxtLink v-for="related in relatedProducts" :key="related._id" :to="`/product/${related._id}`" class="group relative flex flex-col">
          <div class="relative bg-stone-100 aspect-[3/4] overflow-hidden rounded-xl mb-3">
            <img :src="related.imageUrls?.medium || related.imageUrls?.original || '/img/placeholder.jpg'" :alt="related.name" class="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out" />
          </div>
          <div class="flex flex-col flex-1 pb-4">
            <h3 class="text-xs font-bold text-stone-800 mb-1 line-clamp-1 group-hover:text-brand-900">{{ related.name }}</h3>
            <p class="text-xs font-bold text-stone-500 mb-3">${{ (related.price || related.basePrice || 0).toFixed(2) }}</p>
            <div class="mt-auto">
              <button @click.prevent="cart.addToCart({ id: related._id || related.id, _id: related._id || related.id, name: related.name, price: related.price || related.basePrice || 0, basePrice: related.basePrice || related.price || 0, image: related.imageUrls?.medium || related.imageUrls?.original || '/img/placeholder.jpg', imageUrls: related.imageUrls }, 1)" class="w-full bg-brand-900 text-white py-2 text-xs font-bold uppercase tracking-widest rounded hover:bg-brand-800 transition-colors md:opacity-0 group-hover:opacity-100 shadow-sm">
                Add to Bag
              </button>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useFetchProducts } from '~/composables/modules/products/useFetchProducts';
import { useCustomToast } from '~/composables/core/useCustomToast';
import { useCart } from '~/composables/core/useCart';
import { useAuth } from '~/composables/modules/auth/useAuth';
import { useReviews } from '~/composables/modules/reviews/useReviews';

const route = useRoute();
const { fetchProductById, fetchRelatedProducts, singleProduct, relatedProducts, loading } = useFetchProducts();
const { showToast } = useCustomToast();
const cart = useCart();
const { user, toggleWishlist } = useAuth();
const { reviews, loading: reviewsLoading, fetchReviews, submitReview } = useReviews();

const reviewRating = ref(5);
const reviewComment = ref('');

const isFavorite = computed(() => {
  if (user.value && user.value.wishlist) {
    return user.value.wishlist.includes(route.params.id);
  }
  return false;
});

const toggleFavorite = async () => {
  await toggleWishlist(route.params.id);
};

onMounted(() => {
  fetchProductById(route.params.id);
  fetchRelatedProducts(route.params.id);
});

watch(() => route.params.id, (id, previous) => {
  if (!id || id === previous) return;
  selectedSize.value = '';
  sizeError.value = false;
  quantity.value = 1;
  activeImage.value = '';
  activeZoom.value = null;
  isZooming.value = false;
  fetchProductById(String(id));
  fetchRelatedProducts(String(id));
});

const product = computed(() => {
  const p = singleProduct.value;
  if (!p) return null;

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

  let pack = null;
  if (p.name?.toLowerCase().includes('3-pack')) pack = '3 PACK';
  if (p.name?.toLowerCase().includes('5-pack')) pack = '5 PACK';
  if (p.name?.toLowerCase().includes('7-pack')) pack = '7 PACK';
  if (p.name?.toLowerCase().includes('2-pack')) pack = '2 PACK';

  let sizes = [];
  if (p.variants) {
    sizes = [...new Set(p.variants.map(v => v.size).filter(Boolean))];
  }
  if (sizes.length === 0) {
    sizes = ['XS (4)', 'S (5-6)', 'M (7-8)', 'L (10-12)', 'XL (14-16)'];
  }

  return {
    _id: p._id || p.id,
    id: p._id || p.id,
    name: p.name,
    description: p.description,
    price,
    basePrice: price,
    originalPrice,
    discount,
    rating: p.averageRating || 0,
    reviews: p.reviewCount || 0,
    pack,
    image,
    imageUrls: p.imageUrls || null,
    sizes,
    isPromo: false
  };
});

const activeImage = ref('');
const productImages = computed(() => {
  const p = singleProduct.value;
  if (!p) return [];
  const list = [];
  const seen = new Set();
  const add = (url) => {
    if (!url) return;
    // Ignore size/crop query parameters when detecting duplicates.
    const key = String(url).split('?')[0];
    if (seen.has(key)) return;
    seen.add(key);
    list.push(url);
  };
  add(p.imageUrls?.original);
  add(p.imageUrls?.large);
  add(p.imageUrls?.medium);
  add(p.imageUrls?.thumbnail);
  (p.images || []).forEach((img) => add(img?.url));
  return list;
});

watch(product, (value) => {
  if (value?.image) activeImage.value = value.image;
}, { immediate: true });

const selectedSize = ref('');
const sizeError = ref(false);
const quantity = ref(1);

const showSizeGuide = ref(false);
const showReviews = ref(false);

watch(showReviews, (open) => {
  if (open) fetchReviews(route.params.id);
});

const handleSubmitReview = async () => {
  if (!reviewComment.value.trim()) return;
  const ok = await submitReview(route.params.id, reviewRating.value, reviewComment.value.trim());
  if (ok) {
    reviewComment.value = '';
    await fetchProductById(route.params.id);
  }
};


const activeZoom = ref(null);
const isZooming = ref(false);
const lensSize = 150; // Size of the zoom lens in px
const zoomFactor = 2.5; // How much to zoom the image

const lensStyle = ref({
  width: `${lensSize}px`,
  height: `${lensSize}px`,
  left: '0px',
  top: '0px',
});

const portalStyle = ref({
  backgroundImage: '',
  backgroundPosition: '0% 0%',
  backgroundSize: '100%',
});

const handleMouseMove = (e, type) => {
  if (!product.value?.image || !activeImage.value) return;

  const container = e.currentTarget;
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Calculate lens position, clamped to image container boundaries
  let lensX = x - lensSize / 2;
  let lensY = y - lensSize / 2;

  lensX = Math.max(0, Math.min(lensX, rect.width - lensSize));
  lensY = Math.max(0, Math.min(lensY, rect.height - lensSize));

  lensStyle.value.left = `${lensX}px`;
  lensStyle.value.top = `${lensY}px`;

  // Calculate relative position for the background image
  // The center of the lens is the target point
  const targetX = lensX + lensSize / 2;
  const targetY = lensY + lensSize / 2;
  
  const bgPosX = (targetX / rect.width) * 100;
  const bgPosY = (targetY / rect.height) * 100;

  portalStyle.value = {
    backgroundImage: `url(${activeImage.value || product.value.image})`,
    backgroundPosition: `${bgPosX}% ${bgPosY}%`,
    backgroundSize: `${zoomFactor * 100}%`,
  };
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

  sizeError.value = false;
  
  const cartProduct = {
    _id: product.value._id,
    id: product.value.id,
    name: product.value.name,
    basePrice: product.value.basePrice,
    price: product.value.price,
    image: activeImage.value || product.value.image,
    imageUrls: product.value.imageUrls,
  };

  cart.addToCart(cartProduct, quantity.value, { size: selectedSize.value });
  
  showToast({
    title: 'Added to bag',
    message: `${product.value.name} (Size: ${selectedSize.value}, Qty: ${quantity.value}) added to your bag.`,
    toastType: 'success'
  });
};
</script>

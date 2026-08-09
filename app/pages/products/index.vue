<template>
  <div class="bg-amber-50/30 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-white pb-6 mb-10 gap-4">
        <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <h1 class="text-2xl md:text-3xl font-serif font-black text-stone-800 tracking-tight drop-shadow-sm">Shop All ✨</h1>
          <div v-if="route.query.search" class="bg-white text-stone-600 px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-sm w-fit border-2 border-rose-100">
            Search: "{{ route.query.search }}"
            <button @click="router.push('/products')" class="ml-3 text-rose-400 hover:text-rose-600 hover:scale-125 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
        <div class="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border-2 border-sky-100">
          <select v-model="sortBy" class="border-none bg-transparent text-sm font-bold text-stone-700 focus:ring-0 cursor-pointer w-full focus:outline-none">
            <option value="featured">Sort by: Featured</option>
            <option value="newest">Sort by: Newest</option>
            <option value="price_asc">Sort by: Price (Low to High)</option>
            <option value="price_desc">Sort by: Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="w-full md:w-64 flex-shrink-0">
          <div class="bg-white p-6 rounded-[2rem] shadow-sm border-2 border-rose-50 space-y-8 sticky top-24">
            <div>
              <h3 class="font-black text-stone-800 mb-4 text-lg border-b-2 border-rose-50 pb-2">Category</h3>
              <ul class="space-y-3 text-sm font-medium text-stone-600">
                <li><label class="flex items-center cursor-pointer group"><input type="checkbox" v-model="selectedCategories" value="New Arrivals" class="mr-3 w-5 h-5 rounded-lg border-2 border-stone-200 text-sky-400 focus:ring-sky-200 transition-all cursor-pointer" /> <span class="group-hover:text-sky-500 transition-colors">New Arrivals (24)</span></label></li>
                <li><label class="flex items-center cursor-pointer group"><input type="checkbox" v-model="selectedCategories" value="Toddler" class="mr-3 w-5 h-5 rounded-lg border-2 border-stone-200 text-amber-400 focus:ring-amber-200 transition-all cursor-pointer" /> <span class="group-hover:text-amber-500 transition-colors">Toddler (1-3 yrs) (56)</span></label></li>
                <li><label class="flex items-center cursor-pointer group"><input type="checkbox" v-model="selectedCategories" value="Baby" class="mr-3 w-5 h-5 rounded-lg border-2 border-stone-200 text-emerald-400 focus:ring-emerald-200 transition-all cursor-pointer" /> <span class="group-hover:text-emerald-500 transition-colors">Baby (0-12 m) (42)</span></label></li>
                <li><label class="flex items-center cursor-pointer group"><input type="checkbox" v-model="selectedCategories" value="Accessories" class="mr-3 w-5 h-5 rounded-lg border-2 border-stone-200 text-rose-400 focus:ring-rose-200 transition-all cursor-pointer" /> <span class="group-hover:text-rose-500 transition-colors">Accessories (18)</span></label></li>
              </ul>
            </div>
            
            <div>
              <h3 class="font-black text-stone-800 mb-4 text-lg border-b-2 border-rose-50 pb-2">Price</h3>
              <input type="range" v-model="maxPrice" class="w-full accent-rose-400 h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer" min="0" max="50000" step="1000" />
              <div class="flex justify-between text-sm font-bold text-stone-500 mt-3 bg-stone-50 px-3 py-1 rounded-full">
                <span>₦0</span>
                <span class="text-rose-500">₦{{ maxPrice }}+</span>
              </div>
            </div>
            
            <div class="bg-sky-50 p-4 rounded-2xl border-2 border-sky-100">
              <h3 class="font-black text-stone-800 mb-3 flex items-center text-sm">
                <span class="mr-2 text-rose-500 text-xl">🔥</span> Exclusive Deals
              </h3>
              <label class="flex items-center cursor-pointer group">
                <div class="relative">
                  <input type="checkbox" v-model="onSaleOnly" class="sr-only" />
                  <div class="block bg-white border-2 border-stone-200 w-12 h-7 rounded-full transition-colors duration-300" :class="{'bg-rose-400 border-rose-400': onSaleOnly}"></div>
                  <div class="dot absolute left-1 top-1 bg-stone-300 w-5 h-5 rounded-full transition-transform duration-300 shadow-sm" :class="{'transform translate-x-5 bg-white': onSaleOnly}"></div>
                </div>
                <span class="ml-3 text-sm font-bold text-stone-600 group-hover:text-stone-800 transition-colors">On Sale Only</span>
              </label>
            </div>
          </div>
        </aside>

          <!-- SVG Loading Animation -->
          <div v-if="loading" class="flex flex-col items-center justify-center py-24">
            <img src="@/assets/Loading animation.svg" alt="Loading..." class="w-32 h-32" />
            <p class="text-rose-400 font-black text-xl mt-4 animate-pulse">Loading cute collection... 🎈</p>
          </div>
          <div v-else-if="!products?.length" class="text-center py-24 bg-white rounded-[3rem] border-4 border-white shadow-sm">
            <span class="text-4xl mb-4 block">🔍</span>
            <p class="text-stone-500 font-bold">No products found for this search.</p>
          </div>
          <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="product in filteredProducts" :key="product._id" class="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 border border-stone-200 hover:border-rose-300 flex flex-col p-3">
                <NuxtLink :to="`/products/${product._id}`" class="block relative aspect-[4/5] overflow-hidden bg-amber-50 rounded-2xl">
                  <img :src="product.imageUrls?.medium || product.imageUrls?.large || product.imageUrls?.original || product.imageUrls?.main || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1519278409-1f56fc0e0db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'" :alt="product.name" class="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                  
                  <div class="absolute top-3 left-3 flex flex-col gap-2">
                    <span v-if="product.isNew" class="bg-sky-400 text-white text-xs font-black px-2.5 py-1 rounded-full">NEW</span>
                    <span v-if="onSaleOnly" class="bg-rose-400 text-white text-xs font-black px-2.5 py-1 rounded-full">SALE</span>
                  </div>

                  <!-- Playful Quick Add overlay -->
                  <div class="absolute inset-0 bg-white/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button @click.stop.prevent="router.push(`/products/${product._id}`)" class="w-10 h-10 bg-white text-sky-500 rounded-full border border-stone-200 flex items-center justify-center hover:bg-sky-50 hover:scale-105 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <button @click.stop.prevent="handleAddToCart(product)" class="w-10 h-10 bg-rose-400 text-white rounded-full flex items-center justify-center hover:bg-rose-500 hover:scale-105 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </button>
                  </div>
                </NuxtLink>
  
                <div class="pt-4 pb-2 px-2 flex-1 flex flex-col text-center">
                  <h3 class="font-bold text-stone-800 group-hover:text-rose-500 transition-colors text-lg truncate mb-1">{{ product.name }}</h3>
                  <div class="flex items-center justify-center gap-2 mb-3 mt-auto">
                    <span class="text-[10px] font-black text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-widest">{{ product.categoryId?.name || product.category || 'Outfits' }}</span>
                  </div>
                  <div class="font-black text-xl text-stone-900">₦{{ product.basePrice?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</div>
                </div>
              </div>
            </div>
            
            <!-- Pagination -->
            <div class="mt-16 flex justify-center">
              <nav class="flex items-center space-x-3 bg-white p-2 rounded-full shadow-sm border-2 border-stone-50">
                <button class="w-12 h-12 flex items-center justify-center rounded-full text-stone-400 hover:bg-rose-50 hover:text-rose-500 transition-colors font-bold">&larr;</button>
                <button class="w-12 h-12 flex items-center justify-center rounded-full bg-rose-400 text-white font-black shadow-md">1</button>
                <button class="w-12 h-12 flex items-center justify-center rounded-full text-stone-600 font-bold hover:bg-stone-50 transition-colors">2</button>
                <button class="w-12 h-12 flex items-center justify-center rounded-full text-stone-600 font-bold hover:bg-stone-50 transition-colors">3</button>
                <button class="w-12 h-12 flex items-center justify-center rounded-full text-stone-400 hover:bg-rose-50 hover:text-rose-500 transition-colors font-bold">&rarr;</button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useFetchProducts } from '@/composables/modules/products/useFetchProducts';
import { useCart } from '@/composables/core/useCart';
import { useCustomToast } from '@/composables/core/useCustomToast';

const router = useRouter();
const route = useRoute();
const { loading, products, fetchProducts } = useFetchProducts();
const { addToCart } = useCart();
const { showToast } = useCustomToast();

const sortBy = ref('featured');
const selectedCategories = ref([]);
const maxPrice = ref(50000);
const onSaleOnly = ref(false);

const filteredProducts = computed(() => {
  if (!products.value) return [];
  
  let result = [...products.value];
  
  const searchQ = route.query.search;
  if (searchQ) {
    const q = searchQ.toLowerCase();
    result = result.filter(p => p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
  }
  
  if (selectedCategories.value.length > 0) {
    result = result.filter(p => selectedCategories.value.includes(p.category));
  }
  
  result = result.filter(p => p.basePrice <= maxPrice.value);
  
  // Fake sale filter since we don't have isSale yet
  if (onSaleOnly.value) {
    result = result.filter(p => p.basePrice < 15000); // Items under 15k are on "sale"
  }
  
  if (sortBy.value === 'price_asc') {
    result.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sortBy.value === 'price_desc') {
    result.sort((a, b) => b.basePrice - a.basePrice);
  } else if (sortBy.value === 'newest') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  
  return result;
});

const handleAddToCart = (product) => {
  addToCart(product, 1);
  showToast({
    title: '🎉 Yay! Added to Cart! 🎈',
    message: `Woohoo! ${product.name} is now in your cart! 🛍️✨`,
    toastType: 'success'
  });
};

onMounted(() => {
  fetchProducts();
});
</script>

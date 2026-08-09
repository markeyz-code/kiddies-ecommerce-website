<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex items-baseline justify-between border-b border-stone-200 pb-6 mb-8">
      <div class="flex items-center space-x-4">
        <h1 class="text-4xl font-serif font-bold text-stone-900 tracking-tight">Shop All</h1>
        <div v-if="route.query.search" class="mt-2 bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
          Search: "{{ route.query.search }}"
          <button @click="router.push('/products')" class="ml-2 text-stone-400 hover:text-stone-800"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
        </div>
      </div>
      <div class="flex items-center">
        <select v-model="sortBy" class="border-none bg-transparent text-sm font-medium text-stone-700 focus:ring-0 cursor-pointer">
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
        <div class="space-y-8">
          <div>
            <h3 class="font-semibold text-stone-900 mb-4">Category</h3>
            <ul class="space-y-2 text-sm text-stone-600">
              <li><label class="flex items-center"><input type="checkbox" v-model="selectedCategories" value="New Arrivals" class="mr-2 rounded border-stone-300 text-emerald-600 focus:ring-emerald-600" /> New Arrivals (24)</label></li>
              <li><label class="flex items-center"><input type="checkbox" v-model="selectedCategories" value="Toddler" class="mr-2 rounded border-stone-300 text-emerald-600 focus:ring-emerald-600" /> Toddler (1-3 yrs) (56)</label></li>
              <li><label class="flex items-center"><input type="checkbox" v-model="selectedCategories" value="Baby" class="mr-2 rounded border-stone-300 text-emerald-600 focus:ring-emerald-600" /> Baby (0-12 m) (42)</label></li>
              <li><label class="flex items-center"><input type="checkbox" v-model="selectedCategories" value="Accessories" class="mr-2 rounded border-stone-300 text-emerald-600 focus:ring-emerald-600" /> Accessories (18)</label></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-stone-900 mb-4">Color</h3>
            <div class="flex flex-wrap gap-2">
              <button class="w-6 h-6 rounded-full bg-stone-900 border border-stone-200 ring-2 ring-offset-1 ring-transparent hover:ring-stone-400"></button>
              <button class="w-6 h-6 rounded-full bg-white border border-stone-200 ring-2 ring-offset-1 ring-transparent hover:ring-stone-400"></button>
              <button class="w-6 h-6 rounded-full bg-emerald-600 border border-stone-200 ring-2 ring-offset-1 ring-transparent hover:ring-stone-400"></button>
              <button class="w-6 h-6 rounded-full bg-sky-200 border border-stone-200 ring-2 ring-offset-1 ring-transparent hover:ring-stone-400"></button>
              <button class="w-6 h-6 rounded-full bg-rose-200 border border-stone-200 ring-2 ring-offset-1 ring-transparent hover:ring-stone-400"></button>
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-stone-900 mb-4">Price</h3>
            <input type="range" v-model="maxPrice" class="w-full accent-emerald-600" min="0" max="50000" step="1000" />
            <div class="flex justify-between text-sm text-stone-600 mt-2">
              <span>₦0</span>
              <span>₦{{ maxPrice }}+</span>
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-stone-900 mb-4 flex items-center">
              <span class="mr-2 text-rose-500">🔥</span> Exclusive
            </h3>
            <label class="flex items-center cursor-pointer">
              <div class="relative">
                <input type="checkbox" v-model="onSaleOnly" class="sr-only" />
                <div class="block bg-stone-200 w-10 h-6 rounded-full transition-colors" :class="{'bg-rose-500': onSaleOnly}"></div>
                <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" :class="{'transform translate-x-4': onSaleOnly}"></div>
              </div>
              <span class="ml-3 text-sm text-stone-600 font-medium">On Sale Only</span>
            </label>
          </div>
        </div>
      </aside>

      <!-- Product Grid -->
      <div class="flex-1">
        <div v-if="loading" class="text-center py-24 text-stone-500">Loading collection...</div>
        <div v-else-if="!products?.length" class="text-center py-24 text-stone-500">No products found.</div>
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="product in filteredProducts" :key="product._id" class="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100 flex flex-col">
              <NuxtLink :to="`/products/${product._id}`" class="block relative aspect-[4/5] overflow-hidden bg-stone-50">
                <img :src="product.imageUrls?.main || 'https://images.unsplash.com/photo-1519278409-1f56fc0e0db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'" :alt="product.name" class="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
                
                <div class="absolute top-3 left-3 flex flex-col gap-2">
                  <span v-if="product.isNew" class="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">NEW</span>
                  <span v-if="onSaleOnly" class="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">SALE</span>
                </div>
              </NuxtLink>

              <div class="flex border-b border-stone-100">
                <button @click.stop.prevent="router.push(`/products/${product._id}`)" class="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-900 py-3 flex flex-col items-center justify-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-1"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span class="text-[10px] font-bold tracking-widest">VIEW</span>
                </button>
                <button @click.stop.prevent="handleAddToCart(product)" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 flex flex-col items-center justify-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-1"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  <span class="text-[10px] font-bold tracking-widest">ADD TO CART</span>
                </button>
              </div>

              <div class="p-5 bg-white flex-1 flex flex-col justify-between">
                <h3 class="font-bold text-stone-900 group-hover:text-emerald-600 transition-colors uppercase tracking-wide text-sm mb-2">{{ product.name }}</h3>
                <div class="font-bold text-lg text-[#2b2566]">₦{{ product.basePrice?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</div>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div class="mt-12 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button class="w-10 h-10 flex items-center justify-center rounded-full text-stone-500 hover:bg-stone-100">&larr;</button>
              <button class="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-600 text-white font-medium">1</button>
              <button class="w-10 h-10 flex items-center justify-center rounded-full text-stone-700 font-medium hover:bg-stone-100">2</button>
              <button class="w-10 h-10 flex items-center justify-center rounded-full text-stone-700 font-medium hover:bg-stone-100">3</button>
              <button class="w-10 h-10 flex items-center justify-center rounded-full text-stone-500 hover:bg-stone-100">&rarr;</button>
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

<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 pb-24">

    <!-- Breadcrumbs -->
    <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-4 text-[10px] font-bold text-gray-800 uppercase tracking-widest flex space-x-2">
      <NuxtLink to="/" class="hover:underline underline-offset-2 text-gray-600">Home</NuxtLink>
      <span>&gt;</span>
      <span>{{ categoryName }}</span>
    </div>

    <!-- Category Header -->
    <div class="max-w-[1400px] mx-auto px-4 md:px-8 mb-4 flex justify-between items-end border-b pb-4 md:border-none md:pb-0">
      <h1 class="text-xl font-bold text-gray-900 capitalize">{{ categoryName }} Clothing</h1>
      
      <div class="flex items-center text-xs font-bold w-auto">
        <span class="mr-2 hidden md:inline">Sort By:</span>
        <select v-model="sortBy" @change="reloadProducts" class="border-b-2 border-black bg-transparent font-bold text-xs py-2 focus:outline-none">
          <option value="">Recommended</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">New Arrivals</option>
        </select>
      </div>
    </div>

    <div class="max-w-[1400px] mx-auto px-4 md:px-8">
      <div class="flex flex-col md:flex-row gap-8 mt-6">
        <!-- Sidebar Filters -->
        <aside class="w-full md:w-64 flex-shrink-0">
          <div class="bg-white pr-4 space-y-6 sticky top-24 max-h-[85vh] overflow-y-auto custom-scrollbar">
            
            <div class="text-xs font-bold text-gray-500 mb-6 border-b pb-4">
              Showing <span class="text-black font-black">{{ products?.length || 0 }}</span> items
            </div>

            <!-- Color -->
            <details class="group" name="sidebar-filters">
              <summary class="flex justify-between items-center font-bold text-sm border-b border-gray-200 pb-2 mb-4 cursor-pointer list-none uppercase">
                Color
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </summary>
              <div class="flex flex-wrap gap-2 pl-1 pb-2">
                <label v-for="color in colorFilters" :key="color.value" class="cursor-pointer group/color relative">
                  <input type="checkbox" v-model="selectedColors" :value="color.value" @change="reloadProducts" class="peer sr-only" />
                  <div class="w-7 h-7 rounded-full border border-gray-300 transition-all flex items-center justify-center peer-checked:ring-2 peer-checked:ring-offset-1 peer-checked:ring-black" :style="{ backgroundColor: color.hex }">
                     <svg v-if="selectedColors.includes(color.value)" class="w-3 h-3 text-white drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                     </svg>
                  </div>
                  <span class="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-gray-500 opacity-0 group-hover/color:opacity-100 transition-opacity pointer-events-none">{{ color.label }}</span>
                </label>
              </div>
            </details>

            <!-- Size -->
            <details class="group" name="sidebar-filters">
              <summary class="flex justify-between items-center font-bold text-sm border-b border-gray-200 pb-2 mb-4 cursor-pointer list-none uppercase">
                Clothing Size
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </summary>
              <ul class="space-y-2 text-xs font-medium text-gray-700 pl-1 pb-2 h-40 overflow-y-auto custom-scrollbar">
                <li v-for="size in sizeFilters" :key="size">
                  <label class="flex items-center cursor-pointer group/label">
                    <input type="checkbox" v-model="selectedSizes" :value="size" @change="reloadProducts" class="mr-3 w-4 h-4 rounded-sm border border-gray-300 text-black focus:ring-black transition-all cursor-pointer" />
                    <span class="group-hover/label:text-black transition-colors">{{ size }}</span>
                  </label>
                </li>
              </ul>
            </details>

            <!-- Price -->
            <details class="group" name="sidebar-filters" open>
              <summary class="flex justify-between items-center font-bold text-sm border-b border-gray-200 pb-2 mb-4 cursor-pointer list-none uppercase">
                Price
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </summary>
              <div class="px-1 pb-2">
                <div class="flex items-center justify-between gap-2 mb-3 text-xs font-bold text-gray-600">
                  <div class="flex flex-col w-[45%]">
                    <label class="text-[9px] text-gray-400">Min ($)</label>
                    <input type="number" v-model.number="minPrice" @change="reloadProducts" min="0" class="w-full px-2 py-1 rounded-sm border border-gray-300 focus:border-black focus:ring-0" />
                  </div>
                  <span class="mt-4">-</span>
                  <div class="flex flex-col w-[45%]">
                     <label class="text-[9px] text-gray-400">Max ($)</label>
                     <input type="number" v-model.number="maxPrice" @change="reloadProducts" min="0" class="w-full px-2 py-1 rounded-sm border border-gray-300 focus:border-black focus:ring-0" />
                  </div>
                </div>
              </div>
            </details>

            <!-- Gender -->
            <details class="group" name="sidebar-filters">
              <summary class="flex justify-between items-center font-bold text-sm border-b border-gray-200 pb-2 mb-4 cursor-pointer list-none uppercase">
                Gender
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </summary>
              <ul class="space-y-2 text-xs font-medium text-gray-700 pl-1 pb-2">
                <li v-for="gender in ['boy', 'girl', 'unisex']" :key="gender">
                  <label class="flex items-center cursor-pointer group/label">
                    <input type="checkbox" v-model="selectedGenders" :value="gender" @change="reloadProducts" class="mr-3 w-4 h-4 rounded-sm border border-gray-300 text-black focus:ring-black transition-all cursor-pointer" />
                    <span class="group-hover/label:text-black transition-colors capitalize">{{ gender }}</span>
                  </label>
                </li>
              </ul>
            </details>

            <!-- Product Type -->
            <details class="group" name="sidebar-filters">
              <summary class="flex justify-between items-center font-bold text-sm border-b border-gray-200 pb-2 mb-4 cursor-pointer list-none uppercase">
                Product Type
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </summary>
              <ul class="space-y-2 text-xs font-medium text-gray-700 pl-1 pb-2 h-40 overflow-y-auto custom-scrollbar">
                <li v-for="type in typeFilters" :key="type.value">
                  <label class="flex items-center cursor-pointer group/label">
                    <input type="checkbox" v-model="selectedTypes" :value="type.value" @change="reloadProducts" class="mr-3 w-4 h-4 rounded-sm border border-gray-300 text-black focus:ring-black transition-all cursor-pointer" />
                    <span class="group-hover/label:text-black transition-colors">{{ type.label }}</span>
                  </label>
                </li>
              </ul>
            </details>

            <!-- Age Group -->
            <details class="group" name="sidebar-filters">
              <summary class="flex justify-between items-center font-bold text-sm border-b border-gray-200 pb-2 mb-4 cursor-pointer list-none uppercase">
                Age Group
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </summary>
              <ul class="space-y-2 text-xs font-medium text-gray-700 pl-1 pb-2">
                <li v-for="age in ageFilters" :key="age.value">
                  <label class="flex items-center cursor-pointer group/label">
                    <input type="checkbox" v-model="selectedAgeGroups" :value="age.value" @change="reloadProducts" class="mr-3 w-4 h-4 rounded-sm border border-gray-300 text-black focus:ring-black transition-all cursor-pointer" />
                    <span class="group-hover/label:text-black transition-colors">{{ age.label }}</span>
                  </label>
                </li>
              </ul>
            </details>

            <!-- Customer Rating -->
            <details class="group" name="sidebar-filters">
              <summary class="flex justify-between items-center font-bold text-sm border-b border-gray-200 pb-2 mb-4 cursor-pointer list-none uppercase">
                Customer Rating
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </summary>
              <div class="space-y-2 pl-1 pb-2">
                <label class="flex items-center cursor-pointer group/label">
                  <input type="radio" v-model="minRating" :value="5" @change="reloadProducts" class="mr-3 w-4 h-4 text-black focus:ring-black" />
                  <div class="flex text-gray-800">
                    <svg v-for="i in 5" :key="i" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  </div>
                  <span class="ml-2 text-[10px] text-gray-500 font-bold">& Up</span>
                </label>
                <label class="flex items-center cursor-pointer group/label">
                  <input type="radio" v-model="minRating" :value="4" @change="reloadProducts" class="mr-3 w-4 h-4 text-black focus:ring-black" />
                  <div class="flex text-gray-800">
                    <svg v-for="i in 4" :key="i" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg class="h-3 w-3 text-gray-200" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  </div>
                  <span class="ml-2 text-[10px] text-gray-500 font-bold">& Up</span>
                </label>
                <button v-if="minRating" @click="minRating = null; reloadProducts()" class="text-[10px] text-black underline font-bold pl-1 mt-2">Clear Rating</button>
              </div>
            </details>

            <!-- Sustainability -->
            <details class="group" name="sidebar-filters">
              <summary class="flex justify-between items-center font-bold text-sm border-b border-gray-200 pb-2 mb-4 cursor-pointer list-none uppercase">
                More Sustainable
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </summary>
              <ul class="space-y-2 text-xs font-medium text-gray-700 pl-1 pb-2">
                <li>
                  <label class="flex items-center cursor-pointer group/label">
                    <input type="checkbox" v-model="selectedSustainability" value="recycled" @change="reloadProducts" class="mr-3 w-4 h-4 rounded-sm border border-gray-300 text-black focus:ring-black transition-all cursor-pointer" />
                    <span class="group-hover/label:text-black transition-colors">Contains Recycled Materials</span>
                  </label>
                </li>
              </ul>
            </details>
          </div>
        </aside>

        <!-- Main Product Grid -->
        <main class="flex-1">
          <div v-if="loading" class="text-center py-24">
            <p class="text-black font-black text-xl animate-pulse">Loading {{ categoryName }} collection...</p>
          </div>
          <div v-else-if="products && products.length === 0" class="text-center py-24 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <span class="text-6xl mb-4">📦</span>
            <h3 class="text-lg font-bold text-gray-900 mb-2 font-serif">No Products Found</h3>
            <p class="text-sm text-gray-500 max-w-sm mb-6 font-medium">We couldn't find any products matching these filters. Try adjusting them!</p>
            <button @click="clearAllFilters" class="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs uppercase tracking-widest px-6 py-2 transition-colors">
              Clear All Filters
            </button>
          </div>
          <div v-else class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <ProductCard 
              v-for="product in products" 
              :key="product._id || product.id" 
              :product="product"
              @quick-view="openQuickView"
            />
          </div>
        </main>
      </div>
    </div>

    <QuickViewModal 
      :is-open="isQuickViewOpen" 
      :product="selectedProduct" 
      @close="closeQuickView" 
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useFetchProducts } from '~/composables/modules/products/useFetchProducts';

const route = useRoute();
const { products, fetchProducts, loading } = useFetchProducts();

// --- Filter States ---
const sortBy = ref('');
const selectedColors = ref([]);
const selectedSizes = ref([]);
const selectedGenders = ref([]);
const selectedTypes = ref([]);
const selectedAgeGroups = ref([]);
const selectedSustainability = ref([]);
const minRating = ref(null);
const minPrice = ref(0);
const maxPrice = ref(100);

// --- Filter Options ---
const colorFilters = [
  { label: 'Red', value: 'red', hex: '#8B0000' },
  { label: 'Blue', value: 'blue', hex: '#4169E1' },
  { label: 'Navy', value: 'navy', hex: '#000080' },
  { label: 'Pink', value: 'pink', hex: '#FFC0CB' },
  { label: 'Yellow', value: 'yellow', hex: '#FFD700' },
  { label: 'Green', value: 'green', hex: '#228B22' },
  { label: 'Brown', value: 'brown', hex: '#8B4513' },
  { label: 'Black', value: 'black', hex: '#000000' },
  { label: 'White', value: 'white', hex: '#FFFFFF' },
  { label: 'Gray', value: 'gray', hex: '#808080' },
];

const sizeFilters = [
  '0-3 M', '3-6 M', '6-9 M', '9-12 M', '12-18 M', '18-24 M',
  '2T', '3T', '4T', '5T',
  'XS (4)', 'S (5-6)', 'M (7-8)', 'L (10-12)', 'XL (14-16)'
];

const typeFilters = [
  { label: 'Tops', value: 'tops' },
  { label: 'Bottoms', value: 'bottoms' },
  { label: 'Dresses', value: 'dresses' },
  { label: 'Sets', value: 'sets' },
  { label: 'Pajamas', value: 'pajamas' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Boots', value: 'boots' },
  { label: 'Denim Jackets', value: 'denim-jackets' },
  { label: 'Accessories', value: 'accessories' },
];

const ageFilters = [
  { label: 'Girls (12M-12)', value: 'girls-12m-12' },
  { label: 'Boys (12M-12)', value: 'boys-12m-12' },
  { label: 'Baby Girls (0-24M)', value: 'baby-girls-0-24m' },
  { label: 'Baby Boys (0-24M)', value: 'baby-boys-0-24m' },
  { label: 'Toddler', value: 'toddler' },
];

const categoryName = computed(() => {
  return (route.params.id || 'Category').replace(/-/g, ' ');
});

const categorySlug = computed(() => {
  return route.params.id || '';
});

// --- Methods ---
const reloadProducts = () => {
  const params = { category: categorySlug.value }; // Fix category strictly to the route parameter
  
  if (sortBy.value) params.sort = sortBy.value;
  
  // Arrays mapped to comma-separated strings for the backend
  if (selectedColors.value.length > 0) params.color = selectedColors.value.join(',');
  if (selectedSizes.value.length > 0) params.size = selectedSizes.value.join(',');
  if (selectedGenders.value.length > 0) params.gender = selectedGenders.value.join(',');
  if (selectedTypes.value.length > 0) params.productType = selectedTypes.value.join(',');
  if (selectedAgeGroups.value.length > 0) params.ageGroup = selectedAgeGroups.value.join(',');
  if (selectedSustainability.value.length > 0) params.sustainability = selectedSustainability.value.join(',');
  
  // Ranges / Numerics
  if (minPrice.value > 0) params.minPrice = minPrice.value;
  if (maxPrice.value < 100) params.maxPrice = maxPrice.value;
  if (minRating.value) params.minRating = minRating.value;

  fetchProducts(params);
};

const clearAllFilters = () => {
  selectedColors.value = [];
  selectedSizes.value = [];
  selectedGenders.value = [];
  selectedTypes.value = [];
  selectedAgeGroups.value = [];
  selectedSustainability.value = [];
  minRating.value = null;
  minPrice.value = 0;
  maxPrice.value = 100;
  reloadProducts();
};

onMounted(() => {
  reloadProducts();
});

// Re-fetch when route changes (different category)
watch(() => route.params.id, () => {
  clearAllFilters(); // Reset filters when navigating to a new category
});

const isQuickViewOpen = ref(false);
const selectedProduct = ref(null);

const openQuickView = (product) => {
  selectedProduct.value = product;
  isQuickViewOpen.value = true;
};

const closeQuickView = () => {
  isQuickViewOpen.value = false;
  setTimeout(() => {
    selectedProduct.value = null;
  }, 300);
};
</script>

<style scoped>
/* Custom scrollbar for sidebar filter lists */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f9fafb;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Hide default marker for details/summary */
details > summary::-webkit-details-marker {
  display: none;
}
</style>

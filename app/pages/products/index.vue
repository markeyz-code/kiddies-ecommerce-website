<template>
  <div class="min-h-screen bg-cream-50 font-sans text-brand-900 pb-20">

    <!-- Breadcrumbs -->
    <div class="container-site flex items-center gap-2 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-400">
      <NuxtLink to="/" class="text-brand-500 transition-colors hover:text-brand-900">Home</NuxtLink>
      <span>&gt;</span>
      <span>Shop All</span>
      <span v-if="route.query.search">&gt; Search: "{{ route.query.search }}"</span>
    </div>

    <!-- Header -->
    <div class="container-site">
      <div class="flex flex-col gap-5 border-b border-cream-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="eyebrow mb-2">Shop</p>
          <h1 class="section-title">{{ route.query.search ? `Results for “${route.query.search}”` : 'All products' }}</h1>
          <p class="mt-2 text-sm font-medium text-brand-500">{{ products?.length || 0 }} pieces for play, school and everything in between</p>
          <button v-if="route.query.search" @click="clearSearch" class="mt-2 text-xs font-bold text-brand-600 underline underline-offset-4">Clear search</button>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="showMobileFilters = !showMobileFilters"
            class="md:hidden inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-xs font-bold text-brand-800"
            :aria-expanded="showMobileFilters"
          >
            <SlidersHorizontal class="w-4 h-4" />
            Filters
            <span v-if="filtersActiveCount" class="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-900 px-1 text-[10px] text-white">{{ filtersActiveCount }}</span>
          </button>
          <div class="flex items-center gap-2 min-w-[170px]">
            <CustomSelect
              id="sort-products"
              v-model="sortBy"
              :options="sortOptions"
              placeholder="Sort by"
              @change="reloadProducts"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Category & Sub-section Selector Bar -->
    <div class="container-site mt-4 mb-2">
      <!-- Main Selection Chips (Girls, Boys, Dresses, Tops, Shorts, Bottoms, Socks, Shoes, T-Shirts, Costumes) -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button
          v-for="cat in quickCategories"
          :key="cat.id"
          @click="selectQuickCategory(cat.id)"
          class="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="isQuickCategoryActive(cat.id) ? 'bg-brand-900 text-white shadow-sm' : 'bg-white border border-cream-200 text-brand-700 hover:bg-cream-100'"
        >
          <span>{{ cat.icon }}</span>
          <span>{{ cat.label }}</span>
        </button>
      </div>

      <!-- Sub-Sections & Sub-Collections Pills (Dynamic based on selected category or gender) -->
      <div v-if="activeSubsections.length > 0" class="flex items-center gap-2 overflow-x-auto py-2 hide-scrollbar bg-cream-100/70 rounded-2xl px-3 border border-cream-200 mt-2">
        <span class="text-[10px] font-black uppercase tracking-wider text-brand-400 shrink-0">Sub-Collections:</span>
        <button
          v-for="sub in activeSubsections"
          :key="sub.id"
          @click="selectSubsection(sub.id)"
          class="flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer"
          :class="selectedSubsection === sub.id ? 'bg-coral-500 text-white shadow-xs' : 'bg-white text-brand-600 hover:text-brand-900 border border-cream-200'"
        >
          {{ sub.label }}
        </button>
        <button v-if="selectedSubsection" @click="selectedSubsection = null; reloadProducts()" class="text-[10px] text-brand-500 hover:text-brand-900 underline font-bold ml-1 shrink-0 cursor-pointer">
          Clear
        </button>
      </div>
    </div>

    <div class="container-site">
      <div class="flex flex-col md:flex-row gap-8 mt-4">
        <!-- Sidebar Filters -->
        <aside :class="showMobileFilters ? 'block' : 'hidden md:block'" class="w-full md:w-64 flex-shrink-0">
          <div class="card-surface space-y-4 p-5 md:sticky md:top-24 md:max-h-[85vh] md:space-y-5 md:overflow-y-auto custom-scrollbar">
            <div class="flex items-center justify-between md:hidden border-b border-gray-200 pb-3">
              <h2 class="font-black text-sm uppercase tracking-wider">Filter Products</h2>
              <button @click="showMobileFilters = false" class="text-xs font-bold text-gray-500 underline">Close</button>
            </div>
            
            <div class="text-xs font-bold text-gray-500 mb-6 border-b pb-4">
              <span class="text-black font-black">{{ products?.length || 0 }}</span> products
            </div>

            <!-- Category / Collections -->
            <details class="group" name="sidebar-filters" open>
              <summary class="flex justify-between items-center font-bold text-sm border-b border-gray-200 pb-2 mb-4 cursor-pointer list-none uppercase">
                Category
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </summary>
              <ul class="space-y-2 text-xs font-medium text-gray-700 mb-2 pl-1">
                <li v-for="cat in categoryFilters" :key="cat.value">
                  <label class="flex items-center cursor-pointer group/label">
                    <input type="checkbox" v-model="selectedCategories" :value="cat.value" @change="reloadProducts" class="mr-3 w-4 h-4 rounded-sm border border-gray-300 text-black focus:ring-black transition-all cursor-pointer" />
                    <span class="group-hover/label:text-black transition-colors">{{ cat.label }}</span>
                  </label>
                </li>
              </ul>
            </details>

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
            <details class="group" name="sidebar-filters">
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

            <div class="md:hidden sticky bottom-0 bg-white pt-3 pb-2 border-t border-gray-200">
              <div class="flex gap-2">
                <button @click="clearAllFilters" class="flex-1 border border-gray-300 text-gray-800 font-bold text-xs py-3 rounded-full">Clear all</button>
                <button @click="applyMobileFilters" class="flex-[2] bg-brand-900 text-white font-bold text-xs py-3 rounded-full">View {{ products?.length || 0 }} results</button>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Product Grid -->
        <main id="product-grid" class="flex-1 scroll-mt-24">
          <div v-if="loading" class="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            <div v-for="i in 8" :key="i" class="animate-pulse">
              <div class="aspect-[4/5] rounded-2xl bg-cream-100 border border-cream-200"></div>
              <div class="mt-3 h-3 w-1/3 rounded-full bg-cream-200"></div>
              <div class="mt-2 h-4 w-3/4 rounded-full bg-cream-200"></div>
              <div class="mt-3 h-9 w-full rounded-full bg-cream-100 border border-cream-200"></div>
            </div>
          </div>
          <div v-else-if="products && products.length === 0" class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-cream-300 bg-white py-20 text-center">
            <span class="text-6xl mb-4">📦</span>
            <h3 class="text-lg font-bold text-gray-900 mb-2 font-serif">No Products Found</h3>
            <p class="text-sm text-gray-500 max-w-sm mb-6 font-medium">We couldn't find any products matching these filters. Try adjusting them!</p>
            <button @click="clearAllFilters" class="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs uppercase tracking-widest px-6 py-2 transition-colors">
              Clear All Filters
            </button>
          </div>
          <div v-else class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <ProductCard 
              v-for="product in visibleProducts" 
              :key="product._id || product.id" 
              :product="product"
              @quick-view="openQuickView"
            />
          </div>

          <div v-if="products && products.length > visibleProducts.length" class="flex flex-col items-center gap-3 py-12">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-widest">Showing {{ visibleProducts.length }} of {{ products.length }} products</p>
            <button @click="visibleCount += 24" class="btn-secondary w-full sm:w-auto">
              Load more products
            </button>
          </div>
        </main>
      </div>
    </div>

    <!-- QuickView Modal -->
    <QuickViewModal 
      :is-open="isQuickViewOpen" 
      :product="selectedProduct" 
      @close="closeQuickView" 
    />
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Shop All Kids Clothing',
  description: 'Browse the full JasmarKids collection of soft, durable clothing and accessories for babies, toddlers and children.',
  ogTitle: 'Shop All | JasmarKids',
  ogDescription: 'Browse outfits made for play, school and everyday adventures.'
});

import { ref, computed, onMounted, watch } from 'vue';
import { SlidersHorizontal } from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';
import { useFetchProducts } from '@/composables/modules/products/useFetchProducts';

const router = useRouter();
const route = useRoute();
const { loading, products, fetchProducts } = useFetchProducts();

// --- Filter States ---
const sortBy = ref('');
const selectedCategories = ref([]);
const selectedColors = ref([]);
const selectedSizes = ref([]);
const selectedGenders = ref([]);
const selectedTypes = ref([]);
const selectedAgeGroups = ref([]);
const selectedSustainability = ref([]);
const minRating = ref(null);
const minPrice = ref(0);
const maxPrice = ref(1000);
const showMobileFilters = ref(false);
const visibleCount = ref(24);
const visibleProducts = computed(() => (products.value || []).slice(0, visibleCount.value));

const selectedQuickCat = ref('all');
const selectedSubsection = ref(null);

const quickCategories = [
  { id: 'all', label: 'All Items', icon: '✨' },
  { id: 'dresses', label: 'Dresses', icon: '👗' },
  { id: 'tops', label: 'Tops', icon: '👚' },
  { id: 't-shirts', label: 'T-Shirts', icon: '👕' },
  { id: 'shorts', label: 'Shorts', icon: '🩳' },
  { id: 'bottoms', label: 'Bottoms', icon: '👖' },
  { id: 'socks', label: 'Socks', icon: '🧦' },
  { id: 'shoes', label: 'Shoes', icon: '👟' },
  { id: 'costumes', label: 'Kids Costumes', icon: '🦸' },
  { id: 'pajamas', label: 'Pajamas', icon: '🌙' },
  { id: 'sets', label: 'Sets', icon: '🎁' },
];

const subSectionsMap = {
  'dresses': [
    { id: 'casual', label: 'Casual Day Dresses' },
    { id: 'party', label: 'Party & Festive Gowns' },
    { id: 'sundresses', label: 'Summer Sundresses' },
    { id: 'floral', label: 'Floral & Printed Dresses' },
  ],
  'tops': [
    { id: 'graphic-tees', label: 'Graphic Tees' },
    { id: 'plain-tees', label: 'Basic Tees' },
    { id: 'polo', label: 'Polo Shirts' },
    { id: 'blouse', label: 'Shirts & Blouses' },
    { id: 'hoodie', label: 'Hoodies & Sweaters' },
  ],
  't-shirts': [
    { id: 'graphic-tee', label: 'Graphic Tees' },
    { id: 'plain-tee', label: 'Plain Solid Tees' },
    { id: 'pocket-tee', label: 'Pocket T-Shirts' },
    { id: 'long-sleeve', label: 'Long Sleeve Tees' },
  ],
  'shorts': [
    { id: 'denim-shorts', label: 'Denim Jean Shorts' },
    { id: 'cotton-shorts', label: 'Cotton Chino Shorts' },
    { id: 'sports-shorts', label: 'Sports & Active Shorts' },
  ],
  'bottoms': [
    { id: 'jeans', label: 'Jeans & Denim' },
    { id: 'joggers', label: 'Joggers & Sweatpants' },
    { id: 'trousers', label: 'Trousers & Chinos' },
    { id: 'leggings', label: 'Leggings' },
    { id: 'skirts', label: 'Skirts' },
  ],
  'socks': [
    { id: 'crew-socks', label: 'Crew Socks' },
    { id: 'ankle-socks', label: 'Ankle Socks' },
    { id: 'pattern-socks', label: 'Patterned Socks' },
    { id: 'tights', label: 'Tights' },
  ],
  'shoes': [
    { id: 'sneakers', label: 'Sneakers' },
    { id: 'slip-ons', label: 'Casual Shoes' },
    { id: 'sandals', label: 'Sandals & Slides' },
    { id: 'dress-shoes', label: 'Party Shoes' },
    { id: 'boots', label: 'Boots' },
  ],
  'costumes': [
    { id: 'superhero', label: 'Superhero Outfits' },
    { id: 'fairytale', label: 'Fairytale Princess' },
    { id: 'dressup', label: 'Party Dress-Up' },
  ],
};

const activeSubsections = computed(() => {
  if (selectedQuickCat.value && subSectionsMap[selectedQuickCat.value]) {
    return subSectionsMap[selectedQuickCat.value];
  }
  if (selectedGenders.value.includes('girl')) {
    return [
      { id: 'dresses', label: 'Dresses' },
      { id: 'tops', label: 'Tops & Blouses' },
      { id: 't-shirts', label: 'T-Shirts' },
      { id: 'shorts', label: 'Shorts' },
      { id: 'bottoms', label: 'Bottoms & Skirts' },
      { id: 'socks', label: 'Socks & Tights' },
      { id: 'shoes', label: 'Shoes' },
      { id: 'costumes', label: 'Kids Costumes' },
    ];
  }
  if (selectedGenders.value.includes('boy')) {
    return [
      { id: 't-shirts', label: 'T-Shirts' },
      { id: 'tops', label: 'Polo & Shirts' },
      { id: 'shorts', label: 'Shorts' },
      { id: 'bottoms', label: 'Joggers & Jeans' },
      { id: 'socks', label: 'Socks' },
      { id: 'shoes', label: 'Sneakers & Shoes' },
      { id: 'costumes', label: 'Kids Costumes' },
    ];
  }
  return [];
});

const isQuickCategoryActive = (id) => {
  if (id === 'all') return selectedQuickCat.value === 'all' && selectedTypes.value.length === 0;
  return selectedQuickCat.value === id || selectedTypes.value.includes(id);
};

const selectQuickCategory = (id) => {
  selectedQuickCat.value = id;
  selectedSubsection.value = null;
  if (id === 'all') {
    selectedTypes.value = [];
  } else {
    selectedTypes.value = [id];
  }
  reloadProducts();
};

const selectSubsection = (subId) => {
  if (selectedSubsection.value === subId) {
    selectedSubsection.value = null;
  } else {
    selectedSubsection.value = subId;
  }
  reloadProducts();
};

const sortOptions = [
  { value: '', label: 'Recommended' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'New Arrivals' }
];

const filtersActiveCount = computed(() => {
  return [
    selectedCategories.value.length,
    selectedColors.value.length,
    selectedSizes.value.length,
    selectedGenders.value.length,
    selectedTypes.value.length,
    selectedAgeGroups.value.length,
    selectedSustainability.value.length,
    selectedSubsection.value ? 1 : 0,
    minRating.value ? 1 : 0,
    minPrice.value > 0 ? 1 : 0,
    maxPrice.value < 1000 ? 1 : 0
  ].reduce((a, b) => a + b, 0);
});

const applyMobileFilters = () => {
  showMobileFilters.value = false;
  document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// --- Filter Options ---
const categoryFilters = ref([
  { label: 'Girls (6–16)', value: 'girl' },
  { label: 'Boys (6–16)', value: 'boy' },
  { label: 'Toddler Girls (2–5)', value: 'toddler-girl' },
  { label: 'Toddler Boys (2–5)', value: 'toddler-boy' },
  { label: 'Baby (0–18m)', value: 'baby' },
  { label: 'Kids Costumes', value: 'costumes' },
  { label: 'New Arrivals', value: 'new' },
  { label: 'Sale', value: 'sale' },
]);

const fetchCategoryFilters = async () => {
  try {
    const { GATEWAY_ENDPOINT } = await import('~/api_factory/axios.config');
    const { data } = await GATEWAY_ENDPOINT.get('/categories');
    if (Array.isArray(data) && data.length) {
      categoryFilters.value = data
        .filter((c) => c.status !== 'archived')
        .map((c) => ({
          label: c.name,
          value: c.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        }));
    }
  } catch {}
};

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
  // Baby 0-18M
  '0-3 M', '3-6 M', '6-9 M', '9-12 M', '12-18 M',
  // Toddler 2-5Y
  '2T', '3T', '4T', '5T',
  // Kids 6-16Y
  '6Y', '7-8Y', '9-10Y', '11-12Y', '13-14Y', '15-16Y'
];

const typeFilters = [
  { label: 'Dresses', value: 'dresses' },
  { label: 'Tops', value: 'tops' },
  { label: 'T-Shirts', value: 't-shirts' },
  { label: 'Shorts', value: 'shorts' },
  { label: 'Bottoms', value: 'bottoms' },
  { label: 'Socks', value: 'socks' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Kids Costumes', value: 'costumes' },
  { label: 'Pajamas', value: 'pajamas' },
  { label: 'Matching Sets', value: 'sets' },
  { label: 'Accessories', value: 'accessories' },
];

const ageFilters = [
  { label: 'Girls (Age 6–16)', value: 'girls-6-16' },
  { label: 'Boys (Age 6–16)', value: 'boys-6-16' },
  { label: 'Toddler Girls (Age 2–5)', value: 'toddler-girls-2-5' },
  { label: 'Toddler Boys (Age 2–5)', value: 'toddler-boys-2-5' },
  { label: 'Baby (0–18 Months)', value: 'baby-0-18m' },
];

// --- Methods ---
const reloadProducts = () => {
  visibleCount.value = 24;
  const params = {};
  
  // Basic
  if (route.query.search) params.search = route.query.search;
  if (sortBy.value) params.sort = sortBy.value;
  
  // Arrays mapped to comma-separated strings for the backend
  if (selectedCategories.value.length > 0) params.category = selectedCategories.value.join(',');
  if (selectedColors.value.length > 0) params.color = selectedColors.value.join(',');
  if (selectedSizes.value.length > 0) params.size = selectedSizes.value.join(',');
  if (selectedGenders.value.length > 0) params.gender = selectedGenders.value.join(',');
  if (selectedTypes.value.length > 0) params.productType = selectedTypes.value.join(',');
  if (selectedAgeGroups.value.length > 0) params.ageGroup = selectedAgeGroups.value.join(',');
  if (selectedSustainability.value.length > 0) params.sustainability = selectedSustainability.value.join(',');
  
  // Ranges / Numerics
  if (minPrice.value > 0) params.minPrice = minPrice.value;
  if (maxPrice.value < 1000) params.maxPrice = maxPrice.value;
  if (minRating.value) params.minRating = minRating.value;

  if (selectedSubsection.value) {
    params.search = (params.search ? params.search + ' ' : '') + selectedSubsection.value.replace(/-/g, ' ');
  }

  fetchProducts(params);
};

const clearSearch = () => {
  router.push('/products');
};

const clearAllFilters = () => {
  selectedCategories.value = [];
  selectedColors.value = [];
  selectedSizes.value = [];
  selectedGenders.value = [];
  selectedTypes.value = [];
  selectedAgeGroups.value = [];
  selectedSustainability.value = [];
  selectedQuickCat.value = 'all';
  selectedSubsection.value = null;
  minRating.value = null;
  minPrice.value = 0;
  maxPrice.value = 1000;
  reloadProducts();
};

const initFiltersFromQuery = () => {
  selectedCategories.value = [];
  selectedColors.value = [];
  selectedSizes.value = [];
  selectedGenders.value = [];
  selectedTypes.value = [];
  selectedAgeGroups.value = [];
  selectedSustainability.value = [];
  selectedSubsection.value = null;
  if (route.query.category) selectedCategories.value = String(route.query.category).split(',');
  if (route.query.color) selectedColors.value = route.query.color.split(',');
  if (route.query.size) selectedSizes.value = route.query.size.split(',');
  if (route.query.gender) selectedGenders.value = route.query.gender.split(',');
  if (route.query.productType) {
    selectedTypes.value = route.query.productType.split(',');
    selectedQuickCat.value = selectedTypes.value[0] || 'all';
  }
  if (route.query.ageGroup) selectedAgeGroups.value = route.query.ageGroup.split(',');
  if (route.query.sort) sortBy.value = route.query.sort;
  if (route.query.sale === 'true') {
    if (!selectedCategories.value.includes('sale')) {
      selectedCategories.value.push('sale');
    }
  }
};

onMounted(() => {
  fetchCategoryFilters();
  initFiltersFromQuery();
  reloadProducts();
});

watch(() => route.query, () => {
  initFiltersFromQuery();
  reloadProducts();
  showMobileFilters.value = false;
}, { deep: true });

// QuickView
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
</script>

<style scoped>
/* Custom scrollbar for sidebar filter lists */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Hide default marker for details/summary */
details > summary::-webkit-details-marker {
  display: none;
}
</style>

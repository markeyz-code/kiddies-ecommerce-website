<template>
  <div class="w-full font-sans">
    <div class="border-b pb-4 mb-4">
      <h3 class="font-bold text-sm mb-2 uppercase tracking-wide">Category</h3>
      <div class="border-b-2 border-orange-500 inline-block mb-3">
        <h4 class="font-bold text-sm">Shop by Category</h4>
      </div>
      <ul class="text-sm text-gray-700 space-y-1 mb-4 pl-2">
        <li><NuxtLink to="/category/girl" class="cursor-pointer hover:underline">Girls (6–16y)</NuxtLink></li>
        <li><NuxtLink to="/category/boy" class="cursor-pointer hover:underline">Boys (6–16y)</NuxtLink></li>
        <li><NuxtLink to="/category/toddler" class="cursor-pointer hover:underline">Toddlers (2–5y)</NuxtLink></li>
        <li><NuxtLink to="/category/baby" class="cursor-pointer hover:underline">Baby (0–18m)</NuxtLink></li>
        <li><NuxtLink to="/category/costumes" class="cursor-pointer hover:underline">Kids Costumes</NuxtLink></li>
        <li><NuxtLink to="/products" class="cursor-pointer hover:underline">Shop All</NuxtLink></li>
      </ul>
      <h4 class="font-bold text-sm mb-2">More Ways to Shop</h4>
    </div>

    <div class="bg-brand-50 p-3.5 rounded-lg mb-6 flex items-start space-x-3 border border-brand-100">
      <div class="text-lg">🚚</div>
      <div class="text-xs text-ink">
        <span class="font-bold">Nationwide Delivery</span> across Nigeria.<br/>
        <a href="https://instagram.com/jasmarkids" target="_blank" rel="noopener noreferrer" class="underline font-bold text-coral-600 hover:text-coral-700 mt-1 inline-block">DM on Instagram @jasmarkids</a>
      </div>
    </div>

    <!-- Accordion Filters -->
    <div class="border-t border-gray-200">
      
      <!-- Color -->
      <div class="border-b py-4">
        <div class="flex justify-between items-center cursor-pointer mb-4" @click="toggleFilter('Color')">
          <h4 class="font-bold text-sm">Color</h4>
          <ChevronUp v-if="openFilters['Color']" class="w-4 h-4 text-gray-500" />
          <ChevronDown v-else class="w-4 h-4 text-gray-500" />
        </div>
        <div v-show="openFilters['Color']" class="grid grid-cols-4 gap-y-4 gap-x-2">
          <div class="flex flex-col items-center group cursor-pointer" v-for="color in colors" :key="color.name">
            <div class="w-8 h-8 rounded-full border border-gray-300 mb-1" :class="color.class" :style="color.style"></div>
            <span class="text-[10px] group-hover:underline text-center">{{ color.name }}</span>
          </div>
        </div>
      </div>

      <!-- Clothing Size -->
      <div class="border-b py-4">
        <div class="flex justify-between items-center cursor-pointer mb-4" @click="toggleFilter('Clothing Size')">
          <h4 class="font-bold text-sm">Clothing Size</h4>
          <ChevronUp v-if="openFilters['Clothing Size']" class="w-4 h-4 text-gray-500" />
          <ChevronDown v-else class="w-4 h-4 text-gray-500" />
        </div>
        <div v-show="openFilters['Clothing Size']">
          <div class="border border-gray-800 rounded px-2 py-1 text-xs font-bold inline-block mb-3">REGULAR</div>
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm cursor-pointer" v-for="size in sizes" :key="size">
              <input type="checkbox" class="rounded border-gray-300 text-ink focus:ring-brand-900 w-4 h-4" />
              <span>{{ size }}</span>
            </label>
            <button class="text-brand-600 text-xs font-bold hover:underline flex items-center mt-2">
              Show More <ChevronDown class="w-3 h-3 ml-1" />
            </button>
          </div>
        </div>
      </div>

      <!-- Price -->
      <div class="border-b py-4">
        <div class="flex justify-between items-center cursor-pointer mb-4" @click="toggleFilter('Price')">
          <h4 class="font-bold text-sm">Price</h4>
          <ChevronUp v-if="openFilters['Price']" class="w-4 h-4 text-gray-500" />
          <ChevronDown v-else class="w-4 h-4 text-gray-500" />
        </div>
        <div v-show="openFilters['Price']" class="relative pt-6 pb-2 px-2">
          <div class="h-1 bg-black w-full absolute top-8 left-0"></div>
          <div class="absolute top-6 left-0 w-4 h-4 bg-white border-2 border-black rounded-full cursor-pointer -ml-2">
             <div class="absolute -top-6 -left-3 bg-black text-white text-[10px] px-1 rounded font-bold whitespace-nowrap">$9.18</div>
          </div>
          <div class="absolute top-6 right-0 w-4 h-4 bg-white border-2 border-black rounded-full cursor-pointer -mr-2">
             <div class="absolute -top-6 -right-3 bg-black text-white text-[10px] px-1 rounded font-bold whitespace-nowrap">$41.97</div>
          </div>
          <div class="flex justify-between text-xs mt-4">
            <span>9.18</span>
            <span>41.97</span>
          </div>
        </div>
      </div>

      <!-- Other filters collapsible -->
      <div class="border-b py-4" v-for="filter in additionalFilters" :key="filter.name">
        <div class="flex justify-between items-center cursor-pointer" @click="toggleFilter(filter.name)">
          <h4 class="font-bold text-sm">{{ filter.name }}</h4>
          <ChevronUp v-if="openFilters[filter.name]" class="w-4 h-4 text-gray-500" />
          <ChevronDown v-else class="w-4 h-4 text-gray-500" />
        </div>
        <!-- Options content for other filters when open -->
        <div v-show="openFilters[filter.name]" class="mt-4 space-y-2">
          <label class="flex items-center space-x-2 text-sm cursor-pointer" v-for="option in filter.options" :key="option">
            <input type="checkbox" class="rounded border-gray-300 text-ink focus:ring-brand-900 w-4 h-4" />
            <span>{{ option }}</span>
          </label>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const openFilters = ref({
  'Color': false,
  'Clothing Size': false,
  'Price': false,
  'Accessories Size': false,
  'Gender': false,
  'More Sustainable': false,
  'Product Type': false,
  'Customer Rating': false,
  'Age Group': false,
});

const toggleFilter = (name) => {
  openFilters.value[name] = !openFilters.value[name];
};

const colors = [
  { name: 'Multis', style: 'background: conic-gradient(red 90deg, blue 90deg 180deg, green 180deg 270deg, yellow 270deg 360deg)' },
  { name: 'Blues', class: 'bg-brand-600' },
  { name: 'Pinks', class: 'bg-pink-300' },
  { name: 'Whites', class: 'bg-white' },
  { name: 'Creams', class: 'bg-orange-50' },
  { name: 'Oranges', class: 'bg-orange-400' },
  { name: 'Blacks', class: 'bg-black' },
  { name: 'Browns', class: 'bg-amber-800' }
];

const sizes = [
  '0-3 M', '3-6 M', '6-9 M', '9-12 M', '12-18 M',
  '2T', '3T', '4T', '5T',
  '6Y', '7-8Y', '9-10Y', '11-12Y', '13-14Y', '15-16Y'
];

const additionalFilters = [
  { name: 'Age Group', options: ['Girls (6-16y)', 'Boys (6-16y)', 'Toddler Girls (2-5y)', 'Toddler Boys (2-5y)', 'Baby (0-18m)'] },
  { name: 'Product Type', options: ['Dresses', 'Tops', 'T-Shirts', 'Shorts', 'Bottoms', 'Socks', 'Shoes', 'Kids Costumes', 'Pajamas', 'Sets'] },
  { name: 'Gender', options: ['Boys', 'Girls', 'Unisex'] },
  { name: 'More Sustainable', options: ['Organic Cotton', 'Recycled Materials', 'Eco-friendly Dyes'] },
  { name: 'Customer Rating', options: ['5 Stars', '4 Stars & Up', '3 Stars & Up'] },
];
</script>

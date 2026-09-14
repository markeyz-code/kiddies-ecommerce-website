<template>
  <div class="min-h-screen bg-white font-sans text-gray-900">
    <PromoBanner />

    <!-- Dynamic Banners (Hero & Banner Types) -->
    <template v-if="promotions.length > 0">
      <section v-for="promo in activeBanners" :key="promo._id" class="w-full relative cursor-pointer group" :style="{ backgroundColor: promo.backgroundColor || '#1a365d' }">
        <NuxtLink :to="promo.ctaLink || '/products'" class="block relative w-full flex items-center justify-center overflow-hidden" :class="promo.type === 'hero' ? 'min-h-[50vh] md:min-h-[70vh]' : 'min-h-[250px]'">
          <!-- Image -->
          <img v-if="promo.imageUrl" :src="promo.imageUrl" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Promotion Banner" />
          
          <!-- Text Overlay (Optional based on design) -->
          <div v-if="promo.title || promo.subtitle" class="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white font-serif bg-black/50 w-full h-full">
            <h1 class="text-5xl md:text-7xl font-light leading-tight drop-shadow-md">
              {{ promo.title }}
            </h1>
            <p v-if="promo.subtitle" class="font-sans text-lg md:text-2xl mt-4 max-w-md drop-shadow font-medium">
              {{ promo.subtitle }}
            </p>
            <div class="flex space-x-6 mt-8 font-sans text-sm font-bold tracking-widest uppercase drop-shadow">
              <span class="bg-white text-gray-900 px-6 py-3 rounded-sm hover:bg-gray-100 transition-colors">{{ promo.ctaText || 'SHOP NOW' }}</span>
            </div>
          </div>
        </NuxtLink>
      </section>
    </template>
    
    <!-- Fallback Hero Carousel if no promotions configured -->
    <section v-else class="w-full relative">
      <div class="w-full relative group">
        <div class="w-full h-[60vh] md:h-[80vh] shadow-lg relative overflow-hidden bg-stone-900">
          <template v-if="heroItems.length > 0">
            <transition-group name="fade" tag="div">
              <div v-for="(item, idx) in heroItems" :key="item.imageUrl" v-show="currentHeroIndex === idx" class="absolute inset-0 w-full h-full">
                <img :src="item.imageUrl" class="absolute inset-0 w-full h-full object-cover" alt="Hero Banner" />
                <div class="absolute inset-0 bg-black/50"></div>
              </div>
            </transition-group>

            <div v-for="(item, idx) in heroItems" :key="'text-'+idx" v-show="currentHeroIndex === idx" class="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white font-serif h-full">
              <h1 class="text-6xl md:text-8xl font-light leading-tight drop-shadow-md" style="white-space: pre-wrap;" v-html="item.title"></h1>
              <p class="font-sans text-lg md:text-2xl mt-4 max-w-md drop-shadow font-medium">
                {{ item.subtitle }}
              </p>
              <div class="flex space-x-6 mt-8 font-sans text-sm font-bold tracking-widest uppercase drop-shadow">
                <NuxtLink :to="item.ctaLink" class="bg-white text-[#1a365d] px-8 py-3.5 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300">{{ item.ctaText }}</NuxtLink>
              </div>
            </div>
            
            <!-- Carousel Indicators -->
            <div class="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
              <button v-for="(_, idx) in heroItems" :key="'ind-'+idx" @click="currentHeroIndex = idx" class="w-3 h-3 rounded-full transition-colors" :class="currentHeroIndex === idx ? 'bg-white' : 'bg-white/50 hover:bg-white/75'"></button>
            </div>
          </template>
          
          <template v-else>
            <transition-group name="fade" tag="div">
              <div v-for="(img, idx) in defaultHeroImages" :key="img" v-show="currentHeroIndex === idx" class="absolute inset-0 w-full h-full">
                <img :src="img" class="absolute inset-0 w-full h-full object-cover" alt="Autumn Collection" />
                <div class="absolute inset-0 bg-black/50"></div>
              </div>
            </transition-group>

            <div class="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white font-serif h-full">
              <h1 class="text-6xl md:text-8xl font-light leading-tight drop-shadow-md">
                ICONIC<br/>FOR<br/>AUTUMN
              </h1>
              <p class="font-sans text-lg md:text-2xl mt-4 max-w-md drop-shadow font-medium">
                Charming outfits for the season's best moments.
              </p>
              <div class="flex space-x-6 mt-8 font-sans text-sm font-bold tracking-widest uppercase drop-shadow">
                <NuxtLink to="/category/boy" class="bg-white text-[#1a365d] px-8 py-3.5 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300">Shop Boys</NuxtLink>
                <NuxtLink to="/category/girl" class="bg-[#1a365d] text-white border border-[#1a365d] px-8 py-3.5 rounded-full hover:bg-[#112a4a] hover:scale-105 transition-all duration-300">Shop Girls</NuxtLink>
              </div>
            </div>
            
            <!-- Carousel Indicators -->
            <div class="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
              <button v-for="(_, idx) in defaultHeroImages" :key="idx" @click="currentHeroIndex = idx" class="w-3 h-3 rounded-full transition-colors" :class="currentHeroIndex === idx ? 'bg-white' : 'bg-white/50 hover:bg-white/75'"></button>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Fall-Inspired Looks -->
    <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
      <div class="flex justify-center items-center mb-10 relative">
        <h2 class="text-4xl font-serif text-gray-800 text-center tracking-wide">Fall-Inspired Looks</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-if="storefrontSettings?.featuredCategories?.length > 0">
        <NuxtLink v-for="(cat, idx) in storefrontSettings.featuredCategories" :key="idx" :to="cat.link" class="flex flex-col items-center group cursor-pointer">
          <div class="w-full aspect-[3/4] overflow-hidden mb-4 rounded-lg flex items-center justify-center">
            <img :src="cat.imageUrl" :alt="cat.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <span class="text-sm font-bold uppercase tracking-widest underline underline-offset-4 text-gray-800 hover:text-orange-600 transition-colors">{{ cat.title }}</span>
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-else>
        <!-- Fallback Boy -->
        <NuxtLink to="/category/boy" class="flex flex-col items-center group cursor-pointer">
          <div class="w-full aspect-[3/4] overflow-hidden mb-4 rounded-lg flex items-center justify-center">
            <img src="/img/category_boy_1789165301016.jpg" alt="Shop Boy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <span class="text-sm font-bold uppercase tracking-widest underline underline-offset-4 text-gray-800 hover:text-orange-600 transition-colors">Shop Boy</span>
        </NuxtLink>
        
        <!-- Fallback Baby -->
        <NuxtLink to="/category/baby" class="flex flex-col items-center group cursor-pointer">
          <div class="w-full aspect-[3/4] overflow-hidden mb-4 rounded-lg flex items-center justify-center">
            <img src="/img/category_baby_1789165311089.jpg" alt="Shop Baby" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <span class="text-sm font-bold uppercase tracking-widest underline underline-offset-4 text-gray-800 hover:text-orange-600 transition-colors">Shop Baby</span>
        </NuxtLink>
        
        <!-- Fallback Girl -->
        <NuxtLink to="/category/girl" class="flex flex-col items-center group cursor-pointer">
          <div class="w-full aspect-[3/4] overflow-hidden mb-4 rounded-lg flex items-center justify-center">
            <img src="/img/category_girl_1789165322757.jpg" alt="Shop Girl" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <span class="text-sm font-bold uppercase tracking-widest underline underline-offset-4 text-gray-800 hover:text-orange-600 transition-colors">Shop Girl</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Halloween Collection -->
    <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-16" v-if="halloweenItems.length">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl md:text-4xl font-serif text-gray-800 tracking-wide">Our Halloween Collection 🎃</h2>
        <NuxtLink to="/category/halloween" class="text-sm font-bold uppercase tracking-widest underline underline-offset-4 text-gray-800 hover:text-orange-600 transition-colors hidden md:block">Shop All</NuxtLink>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <ProductCard 
          v-for="item in halloweenItems" 
          :key="item._id || item.id" 
          :product="item"
          @quick-view="openQuickView"
        />
      </div>
    </section>

    <!-- THE BACK-TO-SCHOOL EDIT -->
    <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Hero Section -->
        <div class="lg:w-[35%] relative group overflow-hidden rounded-lg flex flex-col justify-end p-8 min-h-[400px]">
          <img src="/img/back_to_school_1789165331157.jpg" alt="Back to School" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
          <div class="relative text-white z-10">
            <h2 class="text-4xl md:text-5xl font-serif font-medium mb-4 leading-tight tracking-tight shadow-sm">THE<br/>BACK-TO-<br/>SCHOOL<br/>EDIT</h2>
            <NuxtLink to="/category/back-to-school" class="inline-block border-b-2 border-white pb-1 text-sm font-bold uppercase tracking-widest hover:text-gray-300 hover:border-gray-300 transition-colors">
              Shop Now
            </NuxtLink>
          </div>
        </div>
        
        <!-- Right Product Grid -->
        <div class="lg:w-[65%]">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ProductCard 
              v-for="item in backToSchoolItems" 
              :key="item._id || item.id" 
              :product="item"
              @quick-view="openQuickView"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Our Most-Loved Picks -->
    <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-16" v-if="mostLovedItems.length">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl md:text-4xl font-serif text-gray-800 tracking-wide">Our Most-Loved Picks ❤️</h2>
        <NuxtLink to="/products" class="text-sm font-bold uppercase tracking-widest underline underline-offset-4 text-gray-800 hover:text-orange-600 transition-colors hidden md:block">Shop All</NuxtLink>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <ProductCard 
          v-for="item in mostLovedItems" 
          :key="item._id || item.id" 
          :product="item"
          @quick-view="openQuickView"
        />
      </div>
    </section>
    
    <!-- Brand Story & Categories (SEO) -->
    <section class="w-full bg-gray-50 border-t border-gray-100 mt-12 py-16">
      <div class="max-w-[1400px] mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-left" v-if="storefrontSettings?.brandStory">
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4 tracking-wide uppercase">{{ storefrontSettings.brandStory.section1Title }}</h3>
            <p class="text-sm text-gray-600 leading-relaxed font-medium">
              {{ storefrontSettings.brandStory.section1Text }}
            </p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4 tracking-wide uppercase">{{ storefrontSettings.brandStory.section2Title }}</h3>
            <p class="text-sm text-gray-600 leading-relaxed font-medium">
              {{ storefrontSettings.brandStory.section2Text }}
            </p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4 tracking-wide uppercase">{{ storefrontSettings.brandStory.section3Title }}</h3>
            <p class="text-sm text-gray-600 leading-relaxed font-medium">
              {{ storefrontSettings.brandStory.section3Text }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-left" v-else>
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4 tracking-wide uppercase">Kids Clothes</h3>
            <p class="text-sm text-gray-600 leading-relaxed font-medium">
              Hold onto childhood with kids clothes from JasmarKids, where every style is made to celebrate the magic of being a kid.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4 tracking-wide uppercase">Girls & Boys Clothes</h3>
            <p class="text-sm text-gray-600 leading-relaxed font-medium">
              Discover the sweetest girls clothes and coolest boys clothes made for every adventure, celebration and memory-making moment.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4 tracking-wide uppercase">Baby Clothes</h3>
            <p class="text-sm text-gray-600 leading-relaxed font-medium">
              Celebrate their earliest moments with baby clothes from JasmarKids, designed with soft fabrics, thoughtful details and the sweetest prints for your littlest one.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- QuickView Modal -->
    <QuickViewModal 
      :is-open="isQuickViewOpen" 
      :product="selectedProduct" 
      @close="closeQuickView" 
    />
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useFetchProducts } from '~/composables/modules/products/useFetchProducts';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';

const { fetchProducts, products } = useFetchProducts();

const promotions = ref([]);
const fetchPromotions = async () => {
  try {
    const res = await GATEWAY_ENDPOINT.get('/promotions?isActive=true');
    promotions.value = res.data;
  } catch (err) {
    console.error('Failed to fetch promotions on home', err);
  }
};

const storefrontSettings = ref(null);
const fetchStorefrontSettings = async () => {
  try {
    const res = await GATEWAY_ENDPOINT.get('/settings/storefront');
    storefrontSettings.value = res.data;
  } catch (err) {
    console.error('Failed to fetch storefront settings', err);
  }
};

const activeBanners = computed(() => {
  return promotions.value.filter(p => p.type === 'hero' || p.type === 'banner');
});

const defaultHeroImages = [
  '/img/hero_fall_1_1789165261484.jpg',
  '/img/hero_fall_2_1789165271669.jpg',
  '/img/hero_fall_3_1789165291107.jpg'
];
const heroItems = computed(() => {
  if (storefrontSettings.value?.heroCarousel?.length > 0) {
    return storefrontSettings.value.heroCarousel;
  }
  return []; // Fallback to be handled in template
});

const currentHeroIndex = ref(0);
let heroInterval;

onMounted(() => {
  fetchProducts();
  fetchPromotions();
  fetchStorefrontSettings();
  
  heroInterval = setInterval(() => {
    const length = heroItems.value.length > 0 ? heroItems.value.length : defaultHeroImages.length;
    currentHeroIndex.value = (currentHeroIndex.value + 1) % length;
  }, 5000);
});

import { onUnmounted } from 'vue';
onUnmounted(() => {
  if (heroInterval) clearInterval(heroInterval);
});

// QuickView state
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

const halloweenItems = computed(() => {
  const all = products.value || [];
  const items = all.filter(p => p.tags && p.tags.includes('halloween'));
  return items.length ? items.slice(0, 8) : [];
});

const backToSchoolItems = computed(() => {
  const all = products.value || [];
  const items = all.filter(p => p.tags && p.tags.includes('back-to-school'));
  return items.length ? items.slice(0, 6) : all.slice(0, 6);
});

const mostLovedItems = computed(() => {
  const all = products.value || [];
  const items = all.filter(p => p.tags && p.tags.includes('most-loved'));
  return items.length ? items.slice(0, 8) : all.slice(0, 8);
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

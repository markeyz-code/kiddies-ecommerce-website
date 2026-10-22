<template>
  <div class="min-h-screen bg-cream-50 font-sans text-brand-900">

    <!-- Hero carousel (managed in Admin → Storefront) -->
    <section class="w-full relative">
      <div class="w-full relative group">
        <div class="w-full h-[64vh] min-h-[480px] md:h-[82vh] relative overflow-hidden bg-brand-950">
          <template v-if="heroItems.length > 0">
            <transition-group name="fade" tag="div">
              <div v-for="(item, idx) in heroItems" :key="item.imageUrl" v-show="currentHeroIndex === idx" class="absolute inset-0 w-full h-full">
                <img :src="item.imageUrl" class="absolute inset-0 w-full h-full object-cover" alt="Hero Banner" />
                <div class="absolute inset-0 bg-gradient-to-b from-brand-950/55 via-brand-900/35 to-brand-950/65"></div>
              </div>
            </transition-group>

            <div v-for="(item, idx) in heroItems" :key="'text-'+idx" v-show="currentHeroIndex === idx" class="relative z-10 flex flex-col justify-center items-center text-center p-6 sm:p-12 text-white h-full">
              <p class="eyebrow text-coral-200 mb-4">New season · Little adventures</p>
              <h1 class="font-display text-4xl sm:text-6xl md:text-8xl font-semibold leading-[1.02] drop-shadow-sm max-w-4xl" style="white-space: pre-wrap;" v-html="item.title"></h1>
              <p class="font-sans text-base sm:text-lg md:text-xl mt-4 max-w-lg drop-shadow font-medium text-white/90">
                {{ item.subtitle }}
              </p>
              <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-6 sm:mt-8 font-sans text-xs sm:text-sm font-bold tracking-widest uppercase drop-shadow">
                <NuxtLink :to="item.ctaLink" class="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-cream-100">{{ item.ctaText }}</NuxtLink>
              </div>
            </div>
            
            <!-- Carousel Indicators -->
            <div class="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
              <button v-for="(_, idx) in heroItems" :key="'ind-'+idx" @click="currentHeroIndex = idx" class="h-1.5 rounded-full transition-all" :class="currentHeroIndex === idx ? 'w-8 bg-white' : 'w-3 bg-white/50 hover:bg-white/75'"></button>
            </div>
          </template>
          
          <template v-else>
            <transition-group name="fade" tag="div">
              <div v-for="(img, idx) in defaultHeroImages" :key="img" v-show="currentHeroIndex === idx" class="absolute inset-0 w-full h-full">
                <img :src="img" class="absolute inset-0 w-full h-full object-cover" alt="Autumn Collection" />
                <div class="absolute inset-0 bg-gradient-to-b from-brand-950/55 via-brand-900/35 to-brand-950/65"></div>
              </div>
            </transition-group>

            <div class="relative z-10 flex flex-col justify-center items-center text-center p-6 sm:p-12 text-white h-full">
              <h1 class="font-display text-4xl sm:text-6xl md:text-8xl font-semibold leading-[1.02] drop-shadow-sm">
                ICONIC<br/>FOR<br/>AUTUMN
              </h1>
              <p class="font-sans text-base sm:text-lg md:text-xl mt-4 max-w-lg drop-shadow font-medium text-white/90">
                Charming outfits for the season's best moments.
              </p>
              <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-6 sm:mt-8 font-sans text-xs sm:text-sm font-bold tracking-widest uppercase drop-shadow">
                <NuxtLink to="/category/boy" class="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-cream-100">Shop Boys</NuxtLink>
                <NuxtLink to="/category/girl" class="rounded-full border border-white/70 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">Shop Girls</NuxtLink>
              </div>
            </div>
            
            <!-- Carousel Indicators -->
            <div class="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
              <button v-for="(_, idx) in defaultHeroImages" :key="idx" @click="currentHeroIndex = idx" class="h-1.5 rounded-full transition-all" :class="currentHeroIndex === idx ? 'w-8 bg-white' : 'w-3 bg-white/50 hover:bg-white/75'"></button>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Promotional banners (managed in Admin → Promotions) -->
    <template v-if="activeBanners.length > 0">
      <section v-for="promo in activeBanners" :key="promo._id" class="container-site py-8 sm:py-10">
        <NuxtLink
          :to="promo.ctaLink || '/products'"
          class="group relative flex min-h-[230px] md:min-h-[340px] items-center justify-center overflow-hidden rounded-3xl"
          :style="{ backgroundColor: promo.backgroundColor || '#1a365d' }"
        >
          <img
            v-if="promo.imageUrl"
            :src="promo.imageUrl"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Promotion"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-brand-950/70 via-brand-950/30 to-transparent"></div>
          <div class="relative z-10 w-full px-6 py-12 text-left text-white sm:px-12">
            <p class="eyebrow text-coral-200 mb-3">Limited offer</p>
            <h2 class="font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">{{ promo.title }}</h2>
            <p v-if="promo.subtitle" class="mt-3 max-w-md text-sm font-medium text-white/85 sm:text-base">{{ promo.subtitle }}</p>
            <span class="mt-6 inline-flex rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-widest text-brand-900">
              {{ promo.ctaText || 'Shop now' }}
            </span>
          </div>
        </NuxtLink>
      </section>
    </template>

    <!-- Fall-Inspired Looks -->
    <section class="container-site py-14 sm:py-20">
      <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="eyebrow mb-2">Shop by age</p>
          <h2 class="section-title">Made for little adventures</h2>
          <p class="section-subtitle mt-2 max-w-xl">Playful, hard-wearing pieces for every stage — from first steps to big-school days.</p>
        </div>
        <NuxtLink to="/products" class="btn-ghost self-start sm:self-auto">View all products <span aria-hidden="true">→</span></NuxtLink>
      </div>

      <div v-if="storefrontSettings?.featuredCategories?.length > 0" class="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
        <NuxtLink
          v-for="(cat, idx) in storefrontSettings.featuredCategories"
          :key="idx"
          :to="cat.link"
          class="group relative w-[68%] flex-none snap-start overflow-hidden rounded-3xl sm:w-[42%] md:w-auto"
        >
          <div class="aspect-[3/4] w-full overflow-hidden bg-cream-200">
            <img :src="cat.imageUrl" :alt="cat.title" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/10 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 class="font-display text-2xl font-semibold text-white">{{ cat.title }}</h3>
            <span class="mt-2 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
              Shop now <span aria-hidden="true">→</span>
            </span>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-3 gap-3 md:gap-6">
        <NuxtLink v-for="cat in [{ title: 'Boys', link: '/category/boy', image: '/img/category_boy_1789165301016.jpg' }, { title: 'Baby', link: '/category/baby', image: '/img/category_baby_1789165311089.jpg' }, { title: 'Girls', link: '/category/girl', image: '/img/category_girl_1789165322757.jpg' }]" :key="cat.link" :to="cat.link" class="group relative overflow-hidden rounded-3xl">
          <div class="aspect-[3/4] overflow-hidden bg-cream-200">
            <img :src="cat.image" :alt="cat.title" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-transparent to-transparent"></div>
          <h3 class="absolute inset-x-0 bottom-0 p-4 font-display text-xl font-semibold text-white sm:p-6 sm:text-2xl">{{ cat.title }}</h3>
        </NuxtLink>
      </div>
    </section>

    <!-- Halloween Collection -->
    <section class="container-site py-14 sm:py-20" v-if="halloweenItems.length">
      <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="eyebrow mb-2">Seasonal edit</p>
          <h2 class="section-title">Halloween, but make it cute</h2>
          <p class="section-subtitle mt-2 max-w-xl">Friendly spooky styles for trick-or-treating and everything in between.</p>
        </div>
        <NuxtLink to="/category/halloween" class="btn-ghost self-start sm:self-auto">Shop the edit <span aria-hidden="true">→</span></NuxtLink>
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
    <section class="container-site py-14 sm:py-20">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left Hero Section -->
        <div class="lg:w-[36%] relative group overflow-hidden rounded-3xl flex flex-col justify-end p-7 sm:p-9 min-h-[420px]">
          <img src="/img/back_to_school_1789165331157.jpg" alt="Back to School" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/45 to-brand-950/10"></div>
          <div class="relative z-10 text-white">
            <p class="eyebrow text-coral-200 mb-3">Back to school</p>
            <h2 class="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-[1.05]">The back-to-school edit</h2>
            <p class="mb-6 max-w-xs text-sm font-medium text-white/80">Uniforms, layers and easy everyday favourites they can run, jump and learn in.</p>
            <NuxtLink to="/category/back-to-school" class="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-widest text-brand-900 transition hover:bg-cream-100">
              Shop now <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </div>
        
        <!-- Right Product Grid -->
        <div class="lg:w-[64%]">
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
    <section class="container-site py-14 sm:py-20" v-if="mostLovedItems.length">
      <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="eyebrow mb-2">Community favourites</p>
          <h2 class="section-title">Most-loved picks</h2>
          <p class="section-subtitle mt-2 max-w-xl">The pieces parents keep coming back for — soft, durable and endlessly wearable.</p>
        </div>
        <NuxtLink to="/products" class="btn-ghost self-start sm:self-auto">Shop all <span aria-hidden="true">→</span></NuxtLink>
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
    <section class="w-full bg-cream-100/70 border-y border-cream-200 py-14 sm:py-20">
      <div class="container-site">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10" v-if="storefrontSettings?.brandStory">
          <div>
            <h3 class="font-display text-xl font-semibold text-brand-900 mb-3">{{ storefrontSettings.brandStory.section1Title }}</h3>
            <p class="text-sm leading-relaxed text-brand-600">
              {{ storefrontSettings.brandStory.section1Text }}
            </p>
          </div>
          <div>
            <h3 class="font-display text-xl font-semibold text-brand-900 mb-3">{{ storefrontSettings.brandStory.section2Title }}</h3>
            <p class="text-sm leading-relaxed text-brand-600">
              {{ storefrontSettings.brandStory.section2Text }}
            </p>
          </div>
          <div>
            <h3 class="font-display text-xl font-semibold text-brand-900 mb-3">{{ storefrontSettings.brandStory.section3Title }}</h3>
            <p class="text-sm leading-relaxed text-brand-600">
              {{ storefrontSettings.brandStory.section3Text }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10" v-else>
          <div>
            <h3 class="font-display text-xl font-semibold text-brand-900 mb-3">Kids Clothes</h3>
            <p class="text-sm leading-relaxed text-brand-600">
              Hold onto childhood with kids clothes from JasmarKids, where every style is made to celebrate the magic of being a kid.
            </p>
          </div>
          <div>
            <h3 class="font-display text-xl font-semibold text-brand-900 mb-3">Girls & Boys Clothes</h3>
            <p class="text-sm leading-relaxed text-brand-600">
              Discover the sweetest girls clothes and coolest boys clothes made for every adventure, celebration and memory-making moment.
            </p>
          </div>
          <div>
            <h3 class="font-display text-xl font-semibold text-brand-900 mb-3">Baby Clothes</h3>
            <p class="text-sm leading-relaxed text-brand-600">
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
  // The hero area is driven by Admin → Storefront settings. Promotions of type
  // "banner" render as additional campaign banners below the hero.
  return promotions.value.filter(p => p.type === 'banner' && p.isActive !== false);
});

const defaultHeroImages = [
  '/img/hero_fall_1_1789165261484.jpg',
  '/img/hero_fall_2_1789165271669.jpg',
  '/img/hero_fall_3_1789165291107.jpg'
];
const heroItems = computed(() => {
  if (storefrontSettings.value?.heroCarousel?.length > 0) {
    return storefrontSettings.value.heroCarousel.map((item) => ({
      ...item,
      // Admins enter line breaks as "\n"; render them as real line breaks.
      title: String(item.title || '').replace(/\\n|\n/g, '<br/>')
    }));
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

<template>
  <div class="min-h-screen bg-cream-50 font-sans text-ink w-full max-w-full overflow-x-hidden">

    <!-- Hero carousel (Multi-slide with text, image, automatic timer and high-contrast overlay) -->
    <section 
      class="w-full relative overflow-hidden select-none"
      @mouseenter="pauseHero" 
      @mouseleave="resumeHero"
    >
      <div class="w-full relative group">
        <div class="w-full h-[68vh] min-h-[500px] md:h-[78vh] relative overflow-hidden bg-brand-950">
          <!-- Background Slides -->
          <transition-group name="fade" tag="div">
            <div 
              v-for="(slide, idx) in activeHeroSlides" 
              :key="slide.imageUrl || idx" 
              v-show="currentHeroIndex === idx" 
              class="absolute inset-0 w-full h-full"
            >
              <img 
                :src="slide.imageUrl" 
                class="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-[8s] scale-100 group-hover:scale-105" 
                :alt="slide.title" 
              />
              <!-- High-Contrast Dark Overlay so text is crystal clear -->
              <div class="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/60 to-brand-950/45"></div>
              <div class="absolute inset-0 bg-black/25"></div>
            </div>
          </transition-group>

          <!-- Foreground Slide Content (Text & CTAs change with each slide) -->
          <transition-group name="fade" tag="div">
            <div 
              v-for="(slide, idx) in activeHeroSlides" 
              :key="'content-' + idx" 
              v-show="currentHeroIndex === idx" 
              class="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-6 sm:p-12 text-white h-full pointer-events-none"
            >
              <p class="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-coral-200 mb-4 drop-shadow-md">
                {{ slide.eyebrow || 'New season · Little adventures' }}
              </p>
              
              <h1 
                class="font-display text-4xl sm:text-6xl md:text-8xl font-semibold leading-[1.02] drop-shadow-lg max-w-4xl text-white tracking-tight" 
                style="white-space: pre-wrap;" 
                v-html="slide.title"
              ></h1>
              
              <p class="font-sans text-base sm:text-lg md:text-xl mt-4 sm:mt-5 max-w-lg drop-shadow-md font-medium text-cream-100">
                {{ slide.subtitle }}
              </p>
              
              <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mt-7 sm:mt-9 font-sans text-xs sm:text-sm font-bold tracking-widest uppercase pointer-events-auto">
                <NuxtLink 
                  :to="slide.primaryCtaLink || '/category/boy'" 
                  class="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-ink shadow-md transition hover:-translate-y-0.5 hover:bg-cream-100 hover:shadow-lg active:scale-95"
                >
                  {{ slide.primaryCtaText || 'Shop Boys' }}
                </NuxtLink>
                <NuxtLink 
                  :to="slide.secondaryCtaLink || '/category/girl'" 
                  class="rounded-full border-2 border-white/90 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/20 active:scale-95 backdrop-blur-xs shadow-xs"
                >
                  {{ slide.secondaryCtaText || 'Shop Girls' }}
                </NuxtLink>
              </div>
            </div>
          </transition-group>

          <!-- Prev / Next Navigation Arrows -->
          <button 
            type="button" 
            @click="prevHero" 
            aria-label="Previous Slide"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            type="button" 
            @click="nextHero" 
            aria-label="Next Slide"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <!-- Carousel Indicators -->
          <div class="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-2.5 z-20">
            <button 
              v-for="(_, idx) in activeHeroSlides" 
              :key="'ind-' + idx" 
              @click="currentHeroIndex = idx" 
              :aria-label="'Go to slide ' + (idx + 1)"
              class="h-2 rounded-full transition-all duration-300 cursor-pointer" 
              :class="currentHeroIndex === idx ? 'w-8 bg-white shadow-md' : 'w-2 bg-white/45 hover:bg-white/70'"
            ></button>
          </div>
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
            <span class="mt-6 inline-flex rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-widest text-ink">
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

      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <NuxtLink v-for="cat in [
          { title: 'Girls (6–16y)', link: '/category/girl', image: '/img/category_girl_african.jpg', subtitle: 'Dresses, tops, shorts & skirts' },
          { title: 'Boys (6–16y)', link: '/category/boy', image: '/img/category_boy_african.jpg', subtitle: 'Graphic tees, shorts & joggers' },
          { title: 'Toddlers (2–5y)', link: '/category/toddler-girl', image: '/img/category_toddler_african.jpg', subtitle: 'Playtime rompers & sets' },
          { title: 'Baby (0–18m)', link: '/category/baby', image: '/img/category_baby_african.jpg', subtitle: 'Soft cotton onesies & booties' },
        ]" :key="cat.link" :to="cat.link" class="group relative overflow-hidden rounded-3xl">
          <div class="aspect-[3/4] overflow-hidden bg-cream-200">
            <img :src="cat.image" :alt="cat.title" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <h3 class="font-display text-base sm:text-xl font-semibold text-white">{{ cat.title }}</h3>
            <p class="text-xs text-white/75 font-medium mt-1">{{ cat.subtitle }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Kids Costumes & Dress-Up Section -->
    <section class="container-site py-14 sm:py-20" v-if="costumeItems.length">
      <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="eyebrow mb-2">Playtime &amp; Party</p>
          <h2 class="section-title">Kids costumes &amp; dress-up</h2>
          <p class="section-subtitle mt-2 max-w-xl">Superheroes, fairy tale magic and playful character costumes made for imaginative fun.</p>
        </div>
        <NuxtLink to="/category/costumes" class="btn-ghost self-start sm:self-auto">Shop costumes <span aria-hidden="true">→</span></NuxtLink>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <ProductCard 
          v-for="item in costumeItems" 
          :key="item._id || item.id" 
          :product="item"
          @quick-view="openQuickView"
        />
      </div>
    </section>

    <!-- THE EVERYDAY & SCHOOL EDIT -->
    <section class="container-site py-14 sm:py-20">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left Hero Section -->
        <div class="lg:w-[36%] relative group overflow-hidden rounded-3xl flex flex-col justify-end p-7 sm:p-9 min-h-[420px]">
          <img src="/img/kiddies_clothes_flatlay.jpg" alt="Everyday Kids Clothing" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/45 to-brand-950/10"></div>
          <div class="relative z-10 text-white">
            <p class="eyebrow text-coral-200 mb-3">Everyday essentials</p>
            <h2 class="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-[1.05]">Play, learn &amp; grow</h2>
            <p class="mb-6 max-w-xs text-sm font-medium text-white/80">Cotton tees, durable shorts, stylish bottoms and easy everyday favourites they can run and jump in.</p>
            <NuxtLink to="/products" class="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-widest text-ink transition hover:bg-cream-100">
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
        <div class="mb-8 max-w-2xl">
          <p class="eyebrow mb-2">Our promise</p>
          <h2 class="section-title">Made to be lived in</h2>
          <p class="section-subtitle mt-2">Thoughtful details, soft fabrics and colours that let little personalities shine.</p>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10" v-if="storefrontSettings?.brandStory">
          <div>
            <h3 class="font-display text-xl font-semibold text-ink mb-3">{{ storefrontSettings.brandStory.section1Title }}</h3>
            <p class="text-sm leading-relaxed text-brand-600">
              {{ storefrontSettings.brandStory.section1Text }}
            </p>
          </div>
          <div>
            <h3 class="font-display text-xl font-semibold text-ink mb-3">{{ storefrontSettings.brandStory.section2Title }}</h3>
            <p class="text-sm leading-relaxed text-brand-600">
              {{ storefrontSettings.brandStory.section2Text }}
            </p>
          </div>
          <div>
            <h3 class="font-display text-xl font-semibold text-ink mb-3">{{ storefrontSettings.brandStory.section3Title }}</h3>
            <p class="text-sm leading-relaxed text-brand-600">
              {{ storefrontSettings.brandStory.section3Text }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10" v-else>
          <div>
            <h3 class="font-display text-xl font-semibold text-ink mb-3">Kids Clothes</h3>
            <p class="text-sm leading-relaxed text-brand-600">
              Hold onto childhood with kids clothes from JasmarKids, where every style is made to celebrate the magic of being a kid.
            </p>
          </div>
          <div>
            <h3 class="font-display text-xl font-semibold text-ink mb-3">Girls & Boys Clothes</h3>
            <p class="text-sm leading-relaxed text-brand-600">
              Discover the sweetest girls clothes and coolest boys clothes made for every adventure, celebration and memory-making moment.
            </p>
          </div>
          <div>
            <h3 class="font-display text-xl font-semibold text-ink mb-3">Baby Clothes</h3>
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
useSeoMeta({
  title: 'Premium Kids Clothing & Accessories',
  description: 'Shop thoughtful, comfortable kids clothing at JasmarKids — playful outfits for babies, toddlers and children, with free shipping over $30 and easy 30-day returns.',
  ogTitle: 'JasmarKids | Premium Kids Fashion',
  ogDescription: 'Soft, playful and made to last. Discover the latest JasmarKids collection.',
  ogImage: '/img/hero_fall_1_1789165261484.jpg'
});

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
  return promotions.value.filter(p => ['banner', 'hero'].includes(p.type) && p.isActive !== false);
});

const defaultHeroSlides = [
  {
    eyebrow: 'African Kids Fashion · Pure Joy',
    title: 'VIBRANT LOOKS<br/>FOR LITTLE ONES',
    subtitle: 'Stylish, durable and playful outfits designed for the way African kids actually live and play.',
    imageUrl: '/img/hero_african_kids.jpg',
    primaryCtaText: 'Shop Boys (6–16)',
    primaryCtaLink: '/category/boy',
    secondaryCtaText: 'Shop Girls (6–16)',
    secondaryCtaLink: '/category/girl'
  },
  {
    eyebrow: 'Playtime Magic · Party & Dress-Up',
    title: 'PLAYFUL<br/>KIDS COSTUMES',
    subtitle: 'Superhero capes, fairytale sets and dress-up fun made for limitless imagination.',
    imageUrl: '/img/category_costumes_african.jpg',
    primaryCtaText: 'Shop Kids Costumes',
    primaryCtaLink: '/category/costumes',
    secondaryCtaText: 'Shop Toddlers (2–5)',
    secondaryCtaLink: '/category/toddler-girl'
  },
  {
    eyebrow: 'Soft Cotton · Everyday Essentials',
    title: 'BABY (0–18M)<br/>& TODDLER (2–5Y)',
    subtitle: 'Gentle on skin, built for play. Thoughtful pieces that keep up with every milestone.',
    imageUrl: '/img/category_baby_african.jpg',
    primaryCtaText: 'Shop Baby (0–18m)',
    primaryCtaLink: '/category/baby',
    secondaryCtaText: 'Shop Toddlers (2–5)',
    secondaryCtaLink: '/category/toddler-boy'
  },
  {
    eyebrow: 'Wardrobe Staples · Mix & Match',
    title: 'EVERYDAY<br/>COLLECTIONS',
    subtitle: 'Dresses, graphic tees, denim shorts, comfy bottoms, socks and shoes.',
    imageUrl: '/img/kiddies_clothes_flatlay.jpg',
    primaryCtaText: 'Shop All Outfits',
    primaryCtaLink: '/products',
    secondaryCtaText: 'Explore Sale',
    secondaryCtaLink: '/category/sale'
  }
];

const heroItems = computed(() => {
  if (storefrontSettings.value?.heroCarousel?.length > 0) {
    return storefrontSettings.value.heroCarousel.map((item) => ({
      eyebrow: item.eyebrow || 'African Kids Fashion · Pure Joy',
      title: String(item.title || '').replace(/\\n|\n/g, '<br/>'),
      subtitle: item.subtitle,
      imageUrl: item.imageUrl || '/img/hero_african_kids.jpg',
      primaryCtaText: item.ctaText || 'Shop Now',
      primaryCtaLink: item.ctaLink || '/products',
      secondaryCtaText: 'Shop Girls (6–16)',
      secondaryCtaLink: '/category/girl'
    }));
  }
  return [];
});

const activeHeroSlides = computed(() => {
  return heroItems.value.length > 0 ? heroItems.value : defaultHeroSlides;
});

const currentHeroIndex = ref(0);
let heroInterval;

const startHeroTimer = () => {
  if (heroInterval) clearInterval(heroInterval);
  heroInterval = setInterval(() => {
    nextHero();
  }, 5000);
};

const pauseHero = () => {
  if (heroInterval) {
    clearInterval(heroInterval);
    heroInterval = null;
  }
};

const resumeHero = () => {
  startHeroTimer();
};

const nextHero = () => {
  const len = activeHeroSlides.value.length;
  currentHeroIndex.value = (currentHeroIndex.value + 1) % len;
};

const prevHero = () => {
  const len = activeHeroSlides.value.length;
  currentHeroIndex.value = (currentHeroIndex.value - 1 + len) % len;
};

onMounted(() => {
  fetchProducts();
  fetchPromotions();
  fetchStorefrontSettings();
  startHeroTimer();
});

import { onUnmounted } from 'vue';
onUnmounted(() => {
  pauseHero();
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

const costumeItems = computed(() => {
  const all = products.value || [];
  const items = all.filter(p => (p.tags && (p.tags.includes('costume') || p.tags.includes('costumes') || p.tags.includes('kids-costumes'))) || p.productType === 'costumes' || (p.name && /costume|superhero|fairy/i.test(p.name)));
  return items.length ? items.slice(0, 8) : all.slice(0, 8);
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

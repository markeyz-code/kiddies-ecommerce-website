<template>
  <header class="w-full font-sans relative z-40 bg-white/95 backdrop-blur border-b border-cream-200">
    <!-- Top thin dark blue banner -->
    <div v-if="isBannerVisible" class="bg-brand-200 text-ink text-[10px] sm:text-[11px] text-center py-2 relative px-10 sm:px-4 transition-all duration-300">
      <span class="font-semibold uppercase tracking-wider">{{ storeSettings.announcement || 'Extra 40% Off* Sale With Code EXTRA40' }} <NuxtLink to="/products" class="underline font-bold ml-1 text-coral-600 hover:text-coral-700">Shop Now</NuxtLink></span>
      <button @click="isBannerVisible = false" class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-ink/60 hover:text-ink">
        <XIcon class="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
    </div>

    <!-- Main Navigation Bar -->
    <div class="text-ink flex items-center justify-between px-4 sm:px-8 py-3.5">
      <!-- Mobile Hamburger -->
      <button class="lg:hidden p-2 text-brand-700 hover:bg-brand-50 rounded-full transition-colors" @click="isMobileMenuOpen = true">
        <MenuIcon class="h-6 w-6" />
      </button>

      <!-- Brand -->
      <div class="flex items-center space-x-2 sm:space-x-3 z-10 min-w-0">
        <NuxtLink to="/" class="flex flex-col leading-none shrink-0 group">
          <span class="font-display text-xl sm:text-[26px] font-semibold tracking-tight text-coral-500 transition-colors group-hover:text-coral-600 whitespace-nowrap">
            {{ storeSettings.storeName || 'JasmarKids' }}<span class="text-brand-500">.</span>
          </span>
          <span class="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-brand-700">
            by Tayisi <span class="text-brand-400">·</span> Kids Clothing
          </span>
        </NuxtLink>
      </div>

      <!-- Search Bar -->
      <div class="hidden lg:block flex-1 max-w-xl mx-8">
        <div class="relative group">
          <input type="text" v-model="searchQuery" @keyup.enter="handleSearch" placeholder="What are you looking for?" class="w-full rounded-full bg-cream-100 border border-cream-200 py-2.5 pl-10 pr-4 text-ink placeholder-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-300 text-sm font-medium transition-all">
          <button @click="handleSearch" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400 group-hover:text-brand-700 transition-colors">
            <SearchIcon class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center space-x-2 sm:space-x-4 text-sm font-medium">
        
        <!-- Ship To / Locale Button -->
        <button @click="isShipToModalOpen = true" class="hidden lg:flex items-center space-x-2 cursor-pointer text-brand-700 hover:bg-brand-50 px-3 py-2 rounded-full transition-colors">
          <span class="text-lg">{{ currentLocales[activeLocale].flag }}</span>
          <span class="font-bold tracking-wider">{{ currentLocales[activeLocale].code }}</span>
          <ChevronDownIcon class="h-3 w-3 opacity-70" />
        </button>
        
        <div class="flex items-center space-x-1 sm:space-x-2">
          <!-- Instagram Link (Online Store) -->
          <a :href="storeSettings.instagram || 'https://instagram.com/jasmarkids'" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" class="hidden sm:flex bg-brand-50 text-brand-700 hover:text-pink-600 rounded-full p-2.5 hover:bg-pink-50 transition-colors" title="Instagram @jasmarkids">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          </a>
          
          <!-- Favorites -->
          <button aria-label="Open wishlist" @click="handleFavoritesClick" class="hidden sm:flex bg-brand-50 text-brand-700 rounded-full p-2.5 hover:bg-brand-100 transition-colors">
            <HeartIcon class="h-5 w-5" />
          </button>
          
          <!-- Mobile search -->
          <button @click="toggleMobileSearch" aria-label="Search products" class="lg:hidden bg-brand-50 text-brand-700 rounded-full p-2.5 hover:bg-brand-100 transition-colors">
            <SearchIcon class="h-5 w-5" />
          </button>

          <!-- User Profile / Drawer Trigger -->
          <button @click="isUserDrawerOpen = true" aria-label="Open account menu" class="bg-brand-50 text-brand-700 rounded-full p-2.5 hover:bg-brand-100 transition-colors">
            <UserIcon class="h-5 w-5" />
          </button>

          <!-- Cart -->
          <NuxtLink to="/cart" aria-label="Shopping bag" class="bg-brand-50 text-brand-700 rounded-full p-2.5 hover:bg-brand-100 transition-colors relative">
            <ShoppingBagIcon class="h-5 w-5" />
            <span v-if="cart.totalItems > 0" class="absolute -top-1 -right-1 bg-coral-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-sm border-2 border-white">{{ cart.totalItems }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Mobile Search Panel -->
    <div v-if="isMobileSearchOpen" class="lg:hidden bg-white border-b border-cream-200 px-4 py-3">
      <form @submit.prevent="handleSearch" class="relative">
        <input
          ref="mobileSearchInput"
          v-model="searchQuery"
          type="search"
          placeholder="Search outfits, sizes, styles..."
          class="w-full rounded-full bg-cream-100 border border-cream-200 py-3 pl-11 pr-4 text-ink placeholder-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-100 text-sm font-medium"
        />
        <button type="submit" aria-label="Search" class="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400">
          <SearchIcon class="h-5 w-5" />
        </button>
      </form>
    </div>

    <!-- Sub Navigation Links (Desktop) -->
    <!-- Sub Navigation Links (Desktop) -->
    <div class="hidden lg:block bg-white relative z-30 w-full overflow-hidden" @mouseleave="activeMegaMenu = null">
      <div class="w-full overflow-x-auto hide-scrollbar">
        <ul class="flex justify-center items-center gap-6 xl:gap-10 px-4 py-3.5 text-[11px] font-bold text-ink tracking-[0.12em] uppercase relative border-t border-cream-200 whitespace-nowrap min-w-max mx-auto">
          <li v-for="link in navLinks" :key="link.name" @mouseenter="activeMegaMenu = link.name">
            <NuxtLink :to="link.href" class="hover:text-coral-500 transition-all cursor-pointer py-2" :class="{'text-coral-500 hover:text-coral-600': link.isSale}">{{ link.name }}</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Mega Menu Dropdown -->
      <div v-if="activeMegaMenu && activeMegaMenuData" class="absolute top-full left-0 w-full bg-white border-t border-cream-200 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
        <div class="max-w-7xl mx-auto px-8 py-8 flex gap-8">
          
          <!-- Menu Columns -->
          <div class="flex-1 grid grid-cols-3 gap-8">
            <div v-for="(section, sectionName) in activeMegaMenuData.sections" :key="sectionName">
              <h4 class="font-bold text-xs uppercase tracking-wider mb-4 border-b pb-2 text-ink">{{ sectionName }}</h4>
              <ul class="space-y-3">
                <li v-for="item in section" :key="item.name">
                  <NuxtLink :to="item.href" class="text-xs text-brand-500 hover:text-ink hover:underline font-medium">{{ item.name }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Dynamic Promotion Ad (if exists for this category) -->
          <div v-if="getMegaMenuAd(activeMegaMenu)" class="w-1/3">
             <div class="relative group cursor-pointer overflow-hidden rounded-2xl">
               <img :src="getMegaMenuAd(activeMegaMenu).imageUrl" class="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500" />
               <div class="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 class="text-white font-black text-xl mb-1 leading-tight">{{ getMegaMenuAd(activeMegaMenu).title }}</h3>
                  <p class="text-white text-sm font-medium mb-3">{{ getMegaMenuAd(activeMegaMenu).subtitle }}</p>
                  <NuxtLink :to="getMegaMenuAd(activeMegaMenu).ctaLink || '/products'" class="bg-white text-black text-xs font-bold px-6 py-2 rounded-full text-center uppercase tracking-widest hover:bg-cream-100">
                    {{ getMegaMenuAd(activeMegaMenu).ctaText || 'SHOP NOW' }}
                  </NuxtLink>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- TELEPORTED FLOATING DRAWERS & MODALS (Outside Header Stacking Context) -->
  <ClientOnly>
    <Teleport to="body">
      <!-- MOBILE MENU DRAWER (Left Side, Floating & Rounded) -->
      <div 
        v-if="isMobileMenuOpen"
        class="lg:hidden fixed inset-0 z-[9999] flex justify-start p-3 sm:p-5 pointer-events-auto"
      >
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity duration-300"
          @click="isMobileMenuOpen = false"
        ></div>
        
        <!-- Drawer Panel -->
        <div 
          class="relative z-10 w-full max-w-xs sm:max-w-sm h-full max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] my-auto bg-white text-ink rounded-3xl shadow-2xl border border-cream-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-left-4 duration-300"
        >
          <div class="p-5 flex justify-between items-center border-b border-cream-200">
            <span class="flex flex-col leading-none">
              <span class="font-display text-2xl font-semibold tracking-tight text-coral-500">
                {{ storeSettings.storeName || 'JasmarKids' }}<span class="text-brand-500">.</span>
              </span>
              <span class="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-brand-700">by Tayisi · Kids Clothing</span>
            </span>
            <button 
              @click="isMobileMenuOpen = false" 
              aria-label="Close menu"
              class="h-9 w-9 bg-cream-100 rounded-full hover:bg-cream-200 text-ink flex items-center justify-center transition-colors"
            >
              <XIcon class="h-5 w-5" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-5 py-4 custom-scrollbar">
            <ul class="space-y-1">
              <li v-for="link in navLinks" :key="link.name">
                <NuxtLink 
                  :to="link.href" 
                  @click="isMobileMenuOpen = false" 
                  class="flex items-center justify-between py-3.5 px-3 rounded-2xl text-sm font-bold uppercase tracking-wider text-ink/80 hover:bg-brand-100 transition-colors" 
                  :class="{'text-coral-400': link.isSale}"
                >
                  <span>{{ link.name }}</span>
                  <span class="text-brand-500 text-xs">→</span>
                </NuxtLink>
              </li>
            </ul>

            <div class="mt-5 border-t border-cream-200 pt-4">
              <p class="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500">More from JasmarKids</p>
              <NuxtLink to="/about" @click="isMobileMenuOpen = false" class="flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand-100">
                Our Story <span class="text-xs text-ink/30">→</span>
              </NuxtLink>
              <NuxtLink to="/size-guide" @click="isMobileMenuOpen = false" class="flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand-100">
                Size Guide <span class="text-xs text-ink/30">→</span>
              </NuxtLink>
              <NuxtLink to="/track" @click="isMobileMenuOpen = false" class="flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand-100">
                Track an Order <span class="text-xs text-ink/30">→</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- USER DRAWER (Right Side, Floating & Rounded) -->
      <div 
        v-if="isUserDrawerOpen"
        class="fixed inset-0 z-[9999] flex justify-end p-3 sm:p-5 pointer-events-auto"
      >
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-brand-950/45 backdrop-blur-sm transition-opacity duration-300"
          @click="isUserDrawerOpen = false"
        ></div>
        
        <!-- Drawer Panel -->
        <div 
          class="relative z-10 w-full max-w-sm sm:max-w-md h-full max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] my-auto bg-white rounded-3xl shadow-2xl border border-cream-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300"
        >
          <!-- Header -->
          <div class="px-6 py-4 flex justify-between items-center border-b border-cream-200 bg-cream-50/50">
            <div>
              <p class="text-[11px] font-bold uppercase tracking-widest text-brand-400">Account</p>
              <h3 class="font-display text-lg font-semibold text-ink">
                {{ user ? `Hello, ${user.firstName || 'there'}!` : 'Welcome to JasmarKids' }}
              </h3>
            </div>
            <button 
              @click="isUserDrawerOpen = false" 
              aria-label="Close account menu"
              class="h-9 w-9 rounded-full bg-cream-100 hover:bg-cream-200 text-brand-700 flex items-center justify-center transition-colors"
            >
              <XIcon class="h-5 w-5" />
            </button>
          </div>

          <div class="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-6">
            <!-- Auth or User Banner -->
            <div v-if="!user" class="text-center p-5 rounded-2xl bg-cream-100/70 border border-cream-200">
              <h4 class="font-display text-xl font-semibold text-ink mb-1">Join the family</h4>
              <p class="text-xs text-brand-500 mb-4 font-medium">Earn points, track your orders &amp; unlock member perks.</p>
              <div class="flex flex-col sm:flex-row gap-2.5 justify-center">
                <NuxtLink 
                  to="/login" 
                  @click="isUserDrawerOpen = false" 
                  class="btn-primary py-2.5 px-6 text-xs"
                >
                  Log In
                </NuxtLink>
                <NuxtLink 
                  to="/register" 
                  @click="isUserDrawerOpen = false" 
                  class="btn-secondary py-2.5 px-6 text-xs"
                >
                  Create Account
                </NuxtLink>
              </div>
            </div>
            <div v-else class="p-4 rounded-2xl bg-cream-100/70 border border-cream-200 flex items-center justify-between">
              <div class="min-w-0 pr-3">
                <p class="font-bold text-sm text-ink truncate">{{ user.firstName }} {{ user.lastName }}</p>
                <p class="text-xs text-brand-500 truncate">{{ user.email }}</p>
              </div>
              <button 
                @click="logout(); isUserDrawerOpen = false" 
                class="text-xs font-bold text-coral-600 hover:text-coral-700 underline flex-shrink-0"
              >
                Sign Out
              </button>
            </div>

            <!-- Rewards Perk Card -->
            <div class="p-4 rounded-2xl border border-cream-200 bg-gradient-to-br from-cream-50 to-brand-50/40 space-y-3">
              <div class="flex items-center gap-2">
                <span class="flex h-7 w-7 items-center justify-center rounded-full bg-coral-500 text-white text-xs font-bold">★</span>
                <p class="text-xs font-bold uppercase tracking-wider text-ink">JasmarKids Rewards</p>
              </div>
              <div class="grid grid-cols-2 gap-2 text-left">
                <div class="p-2.5 rounded-xl bg-white/80 border border-cream-200/60">
                  <p class="text-[10px] font-bold uppercase text-brand-400">Earn points</p>
                  <p class="text-xs font-semibold text-ink">100 pts = $5 off</p>
                </div>
                <div class="p-2.5 rounded-xl bg-white/80 border border-cream-200/60">
                  <p class="text-[10px] font-bold uppercase text-brand-400">VIP perks</p>
                  <p class="text-xs font-semibold text-ink">Early access</p>
                </div>
              </div>
            </div>

            <!-- Navigation Links -->
            <div class="space-y-1">
              <NuxtLink 
                v-for="item in userMenuLinks" 
                :key="item.name" 
                :to="item.href" 
                @click="isUserDrawerOpen = false" 
                class="flex items-center justify-between p-3 rounded-2xl text-sm font-semibold text-ink hover:bg-cream-100 hover:text-brand-950 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-full bg-cream-100 flex items-center justify-center text-brand-600">
                    <component :is="item.icon" class="h-4 w-4" />
                  </div>
                  <span>{{ item.name }}</span>
                </div>
                <span class="text-brand-300 text-sm">→</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- SHIP TO MODAL (Centered, Floating & Rounded) -->
      <div 
        v-if="isShipToModalOpen" 
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-auto"
      >
        <div 
          class="fixed inset-0 bg-brand-950/60 backdrop-blur-sm" 
          @click="isShipToModalOpen = false"
        ></div>
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 border border-cream-200/90 overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
          <button 
            @click="isShipToModalOpen = false" 
            aria-label="Close"
            class="absolute top-5 right-5 h-8 w-8 rounded-full bg-cream-100 hover:bg-cream-200 text-brand-700 flex items-center justify-center transition-colors"
          >
            <XIcon class="h-4 w-4" />
          </button>
          
          <h2 class="text-2xl font-display font-semibold text-ink text-center mb-1">Ship to</h2>
          <p class="text-center text-xs font-medium text-brand-500 mb-6">Change your delivery destination &amp; preferences</p>

          <div class="space-y-4">
            <CustomSelect
              id="ship-country"
              v-model="activeLocale"
              label="Country / Region"
              :options="localeOptions"
              placeholder="Select Country"
            />
            
            <CustomSelect
              id="ship-language"
              v-model="activeLanguage"
              label="Language"
              :options="languageOptions"
              placeholder="Select Language"
            />

            <CustomSelect
              id="ship-currency"
              v-model="activeCurrency"
              label="Currency"
              :options="currencyOptions"
              placeholder="Select Currency"
            />

            <button 
              @click="isShipToModalOpen = false" 
              class="w-full btn-primary py-3.5 text-sm mt-2"
            >
              Save Preferences
            </button>

            <p class="text-[10px] text-center text-brand-400 mt-3 leading-relaxed">
              Coupons and promotions may vary based on shipping destination.
            </p>
          </div>
        </div>
      </div>

      <!-- End Modals -->
    </Teleport>
  </ClientOnly>

</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '~/composables/core/useCart';
import { useAuth } from '~/composables/modules/auth/useAuth';
import { useStoreSettings } from '~/composables/core/useStoreSettings';
import { useCustomToast } from '~/composables/core/useCustomToast';
import { GATEWAY_ENDPOINT } from '@/api_factory/axios.config';
import { SearchIcon, MapPinIcon, HeartIcon, UserIcon, ShoppingBagIcon, MenuIcon, XIcon, ChevronDownIcon, PackageIcon, RefreshCwIcon, CreditCardIcon, StarIcon, GiftIcon } from 'lucide-vue-next';

const cart = useCart();
const route = useRoute();
const router = useRouter();
const { user, fetchProfile, logout, isAuthModalOpen } = useAuth();
const { showToast } = useCustomToast();

const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const isCountryModalOpen = ref(false);
const isBannerVisible = ref(true);
const isMobileMenuOpen = ref(false);
const isShipToModalOpen = ref(false);
const isUserDrawerOpen = ref(false);
const isMobileSearchOpen = ref(false);
const mobileSearchInput = ref(null);
const searchQuery = ref('');
const { settings: storeSettings, fetchStoreSettings } = useStoreSettings();

const toggleMobileSearch = async () => {
  isMobileSearchOpen.value = !isMobileSearchOpen.value;
  if (isMobileSearchOpen.value) {
    await nextTick();
    mobileSearchInput.value?.focus?.();
  }
};

// Prevent body scroll when mobile menu is open
watch(isMobileMenuOpen, (val) => {
  if (typeof document !== 'undefined') {
    if (val) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }
});

const megaMenuAds = ref([]);
const activeMegaMenu = ref(null);

const fetchPromotions = async () => {
  try {
    const res = await GATEWAY_ENDPOINT.get('/promotions?type=megamenu_ad&isActive=true');
    megaMenuAds.value = res.data;
  } catch (err) {
    console.error('Error fetching megamenu ads', err);
  }
};

onMounted(async () => {
  await Promise.all([fetchProfile(), fetchPromotions(), fetchStoreSettings()]);
});

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/products?search=${encodeURIComponent(searchQuery.value.trim())}`);
    searchQuery.value = '';
    isMobileSearchOpen.value = false;
  }
};

const girlMegaMenuSections = {
  'Girls (Age 6–16)': [
    { name: 'All Girls Clothing', href: '/category/girl' },
    { name: 'Dresses', href: '/products?gender=girl&productType=dresses' },
    { name: 'Tops & Blouses', href: '/products?gender=girl&productType=tops' },
    { name: 'T-Shirts & Tees', href: '/products?gender=girl&productType=t-shirts' },
    { name: 'Shorts', href: '/products?gender=girl&productType=shorts' },
    { name: 'Bottoms & Skirts', href: '/products?gender=girl&productType=bottoms' },
    { name: 'Socks & Tights', href: '/products?gender=girl&productType=socks' },
    { name: 'Shoes & Sandals', href: '/products?gender=girl&productType=shoes' },
  ],
  'Collections & Edits': [
    { name: 'Kids Costumes', href: '/category/costumes' },
    { name: 'Casual Daily Sets', href: '/products?category=sets&gender=girl' },
    { name: 'Party & Festive Wear', href: '/products?category=party&gender=girl' },
    { name: 'Pajamas & Sleepwear', href: '/products?category=pajamas&gender=girl' },
    { name: 'Back to School', href: '/products?category=back-to-school&gender=girl' },
  ],
  'More Ways to Shop': [
    { name: 'New Arrivals', href: '/products?category=new&gender=girl' },
    { name: 'Sale & Clearance', href: '/products?category=sale&gender=girl' },
    { name: 'Size Guide (Age 6–16)', href: '/size-guide' },
  ]
};

const boyMegaMenuSections = {
  'Boys (Age 6–16)': [
    { name: 'All Boys Clothing', href: '/category/boy' },
    { name: 'T-Shirts & Graphic Tees', href: '/products?gender=boy&productType=t-shirts' },
    { name: 'Tops & Shirts', href: '/products?gender=boy&productType=tops' },
    { name: 'Shorts', href: '/products?gender=boy&productType=shorts' },
    { name: 'Bottoms & Joggers', href: '/products?gender=boy&productType=bottoms' },
    { name: 'Jeans & Denim', href: '/products?category=jeans&gender=boy' },
    { name: 'Socks & Underwear', href: '/products?gender=boy&productType=socks' },
    { name: 'Shoes & Sneakers', href: '/products?gender=boy&productType=shoes' },
  ],
  'Collections & Edits': [
    { name: 'Kids Costumes', href: '/category/costumes' },
    { name: 'Matching Outfit Sets', href: '/products?category=sets&gender=boy' },
    { name: 'Active & Sportswear', href: '/products?category=active&gender=boy' },
    { name: 'Pajamas & Loungewear', href: '/products?category=pajamas&gender=boy' },
    { name: 'Back to School', href: '/products?category=back-to-school&gender=boy' },
  ],
  'More Ways to Shop': [
    { name: 'New Arrivals', href: '/products?category=new&gender=boy' },
    { name: 'Sale & Clearance', href: '/products?category=sale&gender=boy' },
    { name: 'Size Guide (Age 6–16)', href: '/size-guide' },
  ]
};

const toddlerMegaMenuSections = {
  'Toddler (Age 2–5)': [
    { name: 'All Toddler Outfits', href: '/products?ageGroup=toddler' },
    { name: 'Toddler Girls (2–5 yrs)', href: '/products?gender=toddler-girl&ageGroup=toddler' },
    { name: 'Toddler Boys (2–5 yrs)', href: '/products?gender=toddler-boy&ageGroup=toddler' },
    { name: 'Dresses & Rompers', href: '/products?productType=dresses&ageGroup=toddler' },
    { name: 'Tops & T-Shirts', href: '/products?productType=tops&ageGroup=toddler' },
    { name: 'Shorts & Bottoms', href: '/products?productType=shorts&ageGroup=toddler' },
  ],
  'Toddler Essentials': [
    { name: 'Playtime Sets', href: '/products?category=sets&ageGroup=toddler' },
    { name: 'Kids Costumes', href: '/category/costumes' },
    { name: 'Shoes & Slip-ons', href: '/products?productType=shoes&ageGroup=toddler' },
    { name: 'Socks', href: '/products?productType=socks&ageGroup=toddler' },
    { name: 'Pajamas', href: '/products?category=pajamas&ageGroup=toddler' },
  ],
  'More Ways to Shop': [
    { name: 'New Arrivals', href: '/products?category=new&ageGroup=toddler' },
    { name: 'Sale', href: '/products?category=sale&ageGroup=toddler' },
    { name: 'Size Guide (Age 2–5)', href: '/size-guide' },
  ]
};

const babyMegaMenuSections = {
  'Baby (0–18 Months)': [
    { name: 'All Baby Clothing', href: '/category/baby' },
    { name: 'Baby Girl (0–18m)', href: '/products?gender=girl&ageGroup=baby' },
    { name: 'Baby Boy (0–18m)', href: '/products?gender=boy&ageGroup=baby' },
    { name: 'Bodysuits & One-Pieces', href: '/products?productType=tops&ageGroup=baby' },
    { name: 'Sleep & Play Onesies', href: '/products?category=pajamas&ageGroup=baby' },
    { name: 'Baby Sets', href: '/products?category=sets&ageGroup=baby' },
  ],
  'Baby Essentials': [
    { name: 'Shoes & Booties', href: '/products?productType=shoes&ageGroup=baby' },
    { name: 'Socks & Tights', href: '/products?productType=socks&ageGroup=baby' },
    { name: 'Bibs & Blankets', href: '/products?category=accessories&ageGroup=baby' },
    { name: 'Baby Shower Gifts', href: '/products?category=gifts&ageGroup=baby' },
  ],
  'More Ways to Shop': [
    { name: 'New Arrivals', href: '/products?category=new&ageGroup=baby' },
    { name: 'Sale', href: '/products?category=sale&ageGroup=baby' },
    { name: 'Size Guide (0–18m)', href: '/size-guide' },
  ]
};

const specialtyMegaMenuSections = (tag) => ({
  'Shop By Age & Gender': [
    { name: 'Girls (Age 6–16)', href: `/products?category=${tag}&gender=girl` },
    { name: 'Boys (Age 6–16)', href: `/products?category=${tag}&gender=boy` },
    { name: 'Toddler Girls (Age 2–5)', href: `/products?category=${tag}&gender=toddler-girl` },
    { name: 'Toddler Boys (Age 2–5)', href: `/products?category=${tag}&gender=toddler-boy` },
    { name: 'Baby (0–18 Months)', href: `/products?category=${tag}&ageGroup=baby` },
  ],
  'Featured': [
    { name: 'New Additions', href: `/products?category=${tag}&sort=newest` },
    { name: 'Best Sellers', href: `/products?category=${tag}&sort=popular` },
    { name: 'Clearance Deals', href: `/products?category=${tag}&sale=true` },
  ]
});

const navLinks = [
  { name: 'Girls (6–16)', href: '/category/girl', target: 'girl', sections: girlMegaMenuSections },
  { name: 'Boys (6–16)', href: '/category/boy', target: 'boy', sections: boyMegaMenuSections },
  { name: 'Toddler Girls (2–5)', href: '/category/toddler-girl', target: 'toddler-girl', sections: toddlerMegaMenuSections },
  { name: 'Toddler Boys (2–5)', href: '/category/toddler-boy', target: 'toddler-boy', sections: toddlerMegaMenuSections },
  { name: 'Baby (0–18m)', href: '/category/baby', target: 'baby', sections: babyMegaMenuSections },
  { name: 'Kids Costumes', href: '/category/costumes', target: 'costumes', sections: specialtyMegaMenuSections('costumes') },
  { name: 'Back to School', href: '/category/back-to-school', target: 'back-to-school', sections: specialtyMegaMenuSections('back-to-school') },
  { name: 'Accessories', href: '/category/accessories', target: 'accessories', sections: specialtyMegaMenuSections('accessories') },
  { name: 'Pajamas', href: '/category/pajamas', target: 'pajamas', sections: specialtyMegaMenuSections('pajamas') },
  { name: 'Sale', href: '/category/sale', target: 'sale', isSale: true, sections: specialtyMegaMenuSections('sale') },
];

// computed already imported at top
const activeMegaMenuData = computed(() => {
  if (!activeMegaMenu.value) return null;
  return navLinks.find(link => link.name === activeMegaMenu.value);
});

const getMegaMenuAd = (menuName) => {
  const link = navLinks.find(l => l.name === menuName);
  if (!link || !link.target) return null;
  return megaMenuAds.value.find(ad => ad.categoryTarget === link.target);
};

const userMenuLinks = [
  { name: 'Track Order', href: '/account?tab=orders', icon: PackageIcon },
  { name: 'JasmarKids Rewards', href: '/account?tab=rewards', icon: StarIcon },
  { name: 'Buy it Again', href: '/account?tab=buy-again', icon: RefreshCwIcon },
  { name: 'My Wishlists', href: '/wishlist', icon: HeartIcon },
  { name: 'Rewards Credit Card', href: '/account?tab=credit-card', icon: CreditCardIcon },
];

// Language & Currency State
const activeLocale = ref('en');
const currentLocales = {
  en: { code: 'ENG', name: 'United States', flag: '🇺🇸' },
  gb: { code: 'GBR', name: 'United Kingdom', flag: '🇬🇧' },
  ca: { code: 'CAN', name: 'Canada', flag: '🇨🇦' },
  au: { code: 'AUS', name: 'Australia', flag: '🇦🇺' },
  de: { code: 'DEU', name: 'Germany', flag: '🇩🇪' },
  fr: { code: 'FRA', name: 'France', flag: '🇫🇷' },
  es: { code: 'ESP', name: 'Spain', flag: '🇪🇸' },
  it: { code: 'ITA', name: 'Italy', flag: '🇮🇹' },
  mx: { code: 'MEX', name: 'Mexico', flag: '🇲🇽' },
  br: { code: 'BRA', name: 'Brazil', flag: '🇧🇷' },
  jp: { code: 'JPN', name: 'Japan', flag: '🇯🇵' },
  in: { code: 'IND', name: 'India', flag: '🇮🇳' },
  cn: { code: 'CHN', name: 'China', flag: '🇨🇳' },
  kr: { code: 'KOR', name: 'South Korea', flag: '🇰🇷' },
  za: { code: 'ZAF', name: 'South Africa', flag: '🇿🇦' },
  ng: { code: 'NGA', name: 'Nigeria', flag: '🇳🇬' }
};

const activeLanguage = ref('en');
const currentLanguages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  zh: '中文 (Chinese)',
  ja: '日本語 (Japanese)',
  ko: '한국어 (Korean)',
  hi: 'हिन्दी (Hindi)',
  ar: 'العربية (Arabic)'
};

const activeCurrency = ref('usd');
const currentCurrencies = {
  usd: { code: 'USD', name: 'US Dollar', symbol: '$' },
  eur: { code: 'EUR', name: 'Euro', symbol: '€' },
  gbp: { code: 'GBP', name: 'British Pound', symbol: '£' },
  cad: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  aud: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  jpy: { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  cny: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  inr: { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  brl: { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  mxn: { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  zar: { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  ngn: { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' }
};

const localeOptions = computed(() => Object.entries(currentLocales).map(([key, loc]) => ({
  value: key,
  label: `${loc.flag} ${loc.name}`
})));

const languageOptions = computed(() => Object.entries(currentLanguages).map(([key, lang]) => ({
  value: key,
  label: lang
})));

const currencyOptions = computed(() => Object.entries(currentCurrencies).map(([key, curr]) => ({
  value: key,
  label: `${curr.name} (${curr.symbol})`
})));

const distanceOptions = [
  { value: '15', label: 'Within 15 miles' },
  { value: '25', label: 'Within 25 miles' },
  { value: '50', label: 'Within 50 miles' },
  { value: '100', label: 'Within 100 miles' }
];
</script>

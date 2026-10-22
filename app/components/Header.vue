<template>
  <header class="w-full font-sans relative z-40 bg-white/95 backdrop-blur border-b border-cream-200">
    <!-- Top thin dark blue banner -->
    <div v-if="isBannerVisible" class="bg-brand-900 text-cream-50 text-[10px] sm:text-[11px] text-center py-2 relative px-10 sm:px-4 transition-all duration-300">
      <span class="font-semibold uppercase tracking-wider">{{ storeSettings.announcement || 'Extra 40% Off* Sale With Code EXTRA40' }} <NuxtLink to="/products" class="underline font-bold ml-1 text-coral-200 hover:text-white">Shop Now</NuxtLink></span>
      <button @click="isBannerVisible = false" class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-75">
        <XIcon class="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
    </div>

    <!-- Main Navigation Bar -->
    <div class="text-brand-900 flex items-center justify-between px-4 sm:px-8 py-3.5">
      <!-- Mobile Hamburger -->
      <button class="lg:hidden p-2 text-brand-700 hover:bg-brand-50 rounded-full transition-colors" @click="isMobileMenuOpen = true">
        <MenuIcon class="h-6 w-6" />
      </button>

      <!-- Brand -->
      <div class="flex items-center space-x-2 sm:space-x-3 z-10 min-w-0">
        <NuxtLink to="/" class="text-brand-900 font-display text-xl sm:text-[26px] font-semibold tracking-tight hover:text-brand-700 transition-colors whitespace-nowrap">
          {{ storeSettings.storeName || 'JasmarKids' }}<span class="text-coral-500">.</span>
        </NuxtLink>
        <div class="hidden xl:block h-7 w-px bg-cream-300"></div>
        <NuxtLink to="/" class="hidden xl:block text-brand-400 text-[9px] font-bold tracking-[0.24em] leading-tight hover:text-brand-700 transition-colors uppercase">
          Premium<br/>Kids Fashion
        </NuxtLink>
      </div>

      <!-- Search Bar -->
      <div class="hidden lg:block flex-1 max-w-xl mx-8">
        <div class="relative group">
          <input type="text" v-model="searchQuery" @keyup.enter="handleSearch" placeholder="What are you looking for?" class="w-full rounded-full bg-cream-100 border border-cream-200 py-2.5 pl-10 pr-4 text-brand-900 placeholder-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-300 text-sm font-medium transition-all">
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
          <!-- Find a Store -->
          <button @click="isStoreModalOpen = true" class="hidden sm:flex bg-brand-50 text-brand-700 rounded-full p-2.5 hover:bg-brand-100 transition-colors">
            <MapPinIcon class="h-5 w-5" />
          </button>
          
          <!-- Favorites -->
          <button @click="handleFavoritesClick" class="hidden sm:flex bg-brand-50 text-brand-700 rounded-full p-2.5 hover:bg-brand-100 transition-colors">
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
          <NuxtLink to="/cart" class="bg-brand-50 text-brand-700 rounded-full p-2.5 hover:bg-brand-100 transition-colors relative">
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
          class="w-full rounded-full bg-cream-100 border border-cream-200 py-3 pl-11 pr-4 text-brand-900 placeholder-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-100 text-sm font-medium"
        />
        <button type="submit" aria-label="Search" class="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400">
          <SearchIcon class="h-5 w-5" />
        </button>
      </form>
    </div>

    <!-- Sub Navigation Links (Desktop) -->
    <div class="hidden lg:block bg-white relative z-30" @mouseleave="activeMegaMenu = null">
      <ul class="flex justify-center space-x-10 xl:space-x-14 py-3.5 text-[11px] font-bold text-brand-700 tracking-[0.12em] uppercase relative border-t border-cream-200">
        <li v-for="link in navLinks" :key="link.name" @mouseenter="activeMegaMenu = link.name">
          <NuxtLink :to="link.href" class="hover:text-coral-500 transition-all cursor-pointer py-3" :class="{'text-coral-500 hover:text-coral-600': link.isSale}">{{ link.name }}</NuxtLink>
        </li>
      </ul>

      <!-- Mega Menu Dropdown -->
      <div v-if="activeMegaMenu && activeMegaMenuData" class="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
        <div class="max-w-7xl mx-auto px-8 py-8 flex gap-8">
          
          <!-- Menu Columns -->
          <div class="flex-1 grid grid-cols-3 gap-8">
            <div v-for="(section, sectionName) in activeMegaMenuData.sections" :key="sectionName">
              <h4 class="font-bold text-xs uppercase tracking-wider mb-4 border-b pb-2 text-gray-900">{{ sectionName }}</h4>
              <ul class="space-y-3">
                <li v-for="item in section" :key="item.name">
                  <NuxtLink :to="item.href" class="text-xs text-gray-600 hover:text-blue-900 hover:underline font-medium">{{ item.name }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Dynamic Promotion Ad (if exists for this category) -->
          <div v-if="getMegaMenuAd(activeMegaMenu)" class="w-1/3">
             <div class="relative group cursor-pointer overflow-hidden rounded">
               <img :src="getMegaMenuAd(activeMegaMenu).imageUrl" class="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500" />
               <div class="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 class="text-white font-black text-xl mb-1 leading-tight">{{ getMegaMenuAd(activeMegaMenu).title }}</h3>
                  <p class="text-white text-sm font-medium mb-3">{{ getMegaMenuAd(activeMegaMenu).subtitle }}</p>
                  <NuxtLink :to="getMegaMenuAd(activeMegaMenu).ctaLink || '/products'" class="bg-white text-black text-xs font-bold px-6 py-2 rounded-sm text-center uppercase tracking-widest hover:bg-gray-100">
                    {{ getMegaMenuAd(activeMegaMenu).ctaText || 'SHOP NOW' }}
                  </NuxtLink>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FULLSCREEN MOBILE MENU (CREATIVE REDESIGN) -->
    <div class="lg:hidden fixed inset-0 z-50 transition-all duration-500 ease-in-out" :class="isMobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500" :class="isMobileMenuOpen ? 'opacity-100' : 'opacity-0'" @click="isMobileMenuOpen = false"></div>
      
      <!-- Drawer -->
      <div class="absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-br from-[#1a365d] via-[#112543] to-gray-900 text-white shadow-2xl transition-transform duration-500 ease-out flex flex-col overflow-hidden" :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'">
        
        <div class="p-5 flex justify-between items-center border-b border-white/10">
          <span class="text-white font-serif font-black text-2xl">{{ storeSettings.storeName || 'JasmarKids' }}</span>
          <button @click="isMobileMenuOpen = false" class="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <XIcon class="h-6 w-6" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          <ul class="space-y-1">
            <li v-for="(link, i) in navLinks" :key="link.name" class="transform transition-all duration-300" :style="{ transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : '0ms', opacity: isMobileMenuOpen ? 1 : 0, transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)' }">
              <NuxtLink :to="link.href" @click="isMobileMenuOpen = false" class="flex items-center justify-between py-4 group border-b border-white/5 last:border-0" :class="{'text-red-400': link.isSale}">
                <div class="flex items-center gap-4">
                  <span class="font-black text-lg tracking-wide uppercase">{{ link.name }}</span>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- USER DRAWER (Right Side) -->
    <div class="fixed inset-0 z-50 transition-all duration-300 ease-in-out" :class="isUserDrawerOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" :class="isUserDrawerOpen ? 'opacity-100' : 'opacity-0'" @click="isUserDrawerOpen = false"></div>
      
      <div class="absolute top-0 right-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col overflow-hidden" :class="isUserDrawerOpen ? 'translate-x-0' : 'translate-x-full'">
        <div class="p-4 flex justify-between items-center border-b">
          <span class="font-bold text-lg text-gray-900">Hello!</span>
          <button @click="isUserDrawerOpen = false" class="text-gray-500 hover:text-gray-800">
            <XIcon class="h-6 w-6" />
          </button>
        </div>

        <div class="p-6 flex-1 overflow-y-auto">
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold text-blue-900 italic tracking-tighter mb-4">My Place <span class="border border-blue-900 rounded px-1 text-sm not-italic uppercase tracking-widest">Rewards</span></h3>
            <div v-if="!user" class="flex gap-2 justify-center">
              <NuxtLink to="/login" @click="isUserDrawerOpen = false" class="bg-black text-white px-8 py-2 rounded font-bold text-sm hover:bg-gray-800">Log In</NuxtLink>
              <NuxtLink to="/register" @click="isUserDrawerOpen = false" class="bg-white text-black border border-gray-300 px-4 py-2 rounded font-bold text-sm hover:bg-gray-50">Create Account</NuxtLink>
            </div>
            <div v-else>
               <p class="font-bold text-gray-800">{{ user.firstName }} {{ user.lastName }}</p>
               <p class="text-sm text-gray-500">{{ user.email }}</p>
               <button @click="logout(); isUserDrawerOpen = false" class="mt-2 text-red-500 font-bold text-sm underline">Sign Out</button>
            </div>
          </div>

          <div class="space-y-4 border border-gray-200 rounded-xl p-4 mb-8 bg-gray-50">
            <div class="flex items-start gap-3">
              <StarIcon class="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <p class="font-bold text-sm text-gray-900">Earn Rewards</p>
                <p class="text-xs text-gray-500">100 points = $5</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <GiftIcon class="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <p class="font-bold text-sm text-gray-900">Special Offers</p>
                <p class="text-xs text-gray-500">Unlock VIP events and early offers</p>
              </div>
            </div>
          </div>

          <ul class="space-y-2">
            <li v-for="item in userMenuLinks" :key="item.name">
              <NuxtLink :to="item.href" @click="isUserDrawerOpen = false" class="flex items-center gap-4 py-3 text-gray-700 hover:text-blue-900 font-medium">
                <component :is="item.icon" class="h-5 w-5 text-gray-400" />
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- SHIP TO MODAL -->
    <div v-if="isShipToModalOpen" class="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="isShipToModalOpen = false"></div>
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md relative z-10 mx-4 overflow-hidden">
        <div class="p-6">
          <button @click="isShipToModalOpen = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
            <XIcon class="h-6 w-6" />
          </button>
          
          <h2 class="text-3xl font-black text-center mb-2">Ship To</h2>
          <p class="text-center text-gray-600 font-medium mb-6">Change Shipping Preference</p>
          <div class="w-12 h-0.5 bg-blue-300 mx-auto mb-8"></div>

          <div class="space-y-6">
            <div class="space-y-1">
              <label class="text-xs font-bold text-gray-700">Country</label>
              <select v-model="activeLocale" class="w-full p-3 border-b-2 border-gray-200 focus:border-blue-900 outline-none bg-transparent font-medium">
                <option v-for="(loc, key) in currentLocales" :key="key" :value="key">{{ loc.name }}</option>
              </select>
            </div>
            
            <div class="space-y-1">
              <label class="text-xs font-bold text-gray-700">Language</label>
              <select v-model="activeLanguage" class="w-full p-3 border-b-2 border-gray-200 focus:border-blue-900 outline-none bg-transparent font-medium">
                <option v-for="(lang, key) in currentLanguages" :key="key" :value="key">{{ lang }}</option>
              </select>
            </div>

            <div class="space-y-1">
              <label class="text-xs font-bold text-gray-700">Currency</label>
              <select v-model="activeCurrency" class="w-full p-3 border-b-2 border-gray-200 focus:border-blue-900 outline-none bg-transparent font-medium">
                <option v-for="(curr, key) in currentCurrencies" :key="key" :value="key">{{ curr.name }}</option>
              </select>
            </div>

            <button @click="isShipToModalOpen = false" class="w-full bg-[#0a2540] text-white font-bold py-4 rounded-lg hover:bg-black transition-colors mt-4">
              SAVE
            </button>

            <p class="text-[10px] text-center text-gray-500 mt-4 leading-tight">
              <strong>NOTE:</strong> If you change your shipping destination, your shopping bag will be emptied and you'll have to add your items again. Coupons and promotions may vary based on shipping destinations. Please read applicable <NuxtLink to="/terms" class="underline">Terms & Conditions</NuxtLink>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- FIND A STORE MODAL -->
    <div v-if="isStoreModalOpen" class="fixed inset-0 z-50 flex justify-end pointer-events-auto">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="isStoreModalOpen = false"></div>
      <div class="bg-white shadow-2xl w-full sm:w-[450px] relative z-10 h-full flex flex-col">
        <div class="p-4 border-b flex justify-between items-center bg-gray-50">
          <span class="font-bold text-sm uppercase tracking-wider">Select a Store</span>
          <button @click="isStoreModalOpen = false" class="text-gray-500 hover:text-gray-800">
            <XIcon class="h-5 w-5" />
          </button>
        </div>
        
        <div class="p-6 flex flex-col h-full overflow-hidden">
          <h3 class="font-black text-lg mb-4">FIND A STORE NEAR YOU</h3>
          
          <button @click="useCurrentLocation" class="flex items-center text-sm font-medium text-gray-700 hover:text-black mb-6 underline underline-offset-4">
            <MapPinIcon class="h-4 w-4 mr-2" />
            Use my current location
          </button>

          <div class="flex flex-col gap-4 shrink-0">
            <div class="w-full">
              <label class="text-[10px] font-bold text-gray-500 block mb-1 uppercase tracking-wider">Location</label>
              <input v-model="storeSearchQuery" type="text" placeholder="Zip Code or City, State" class="w-full p-3 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" @keyup.enter="searchStores">
            </div>
            <div class="w-full">
              <label class="text-[10px] font-bold text-gray-500 block mb-1 uppercase tracking-wider">Distance</label>
              <select v-model="storeSearchDistance" class="w-full p-3 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none bg-transparent transition-all">
                <option value="25">25 miles</option>
                <option value="50">50 miles</option>
                <option value="100">100 miles</option>
              </select>
            </div>
            <button @click="searchStores" class="w-full bg-black text-white font-bold py-4 px-6 rounded hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm mt-2 flex items-center justify-center">
              <span v-if="isSearchingStores" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
              Search Stores
            </button>
          </div>

          <!-- Store Results -->
          <div class="mt-6 flex-1 overflow-y-auto">
            <div v-if="storeSearchResults.length > 0" class="flex flex-col gap-4">
              <div v-for="store in storeSearchResults" :key="store._id" class="p-4 border border-gray-200 rounded shadow-sm hover:border-black transition-colors">
                <h4 class="font-bold text-lg text-brand-900">{{ store.name }}</h4>
                <p class="text-sm text-gray-600 mt-1">{{ store.address }}</p>
                <p class="text-sm text-gray-600">{{ store.city }}, {{ store.state }} {{ store.zip }}</p>
                <p v-if="store.phone" class="text-sm font-medium text-gray-800 mt-2 flex items-center">
                  📞 {{ store.phone }}
                </p>
              </div>
            </div>
            <div v-else-if="hasSearched && !isSearchingStores" class="text-center text-gray-500 py-8">
              No stores found matching your criteria.
            </div>
          </div>
        </div>
      </div>
    </div>

  </header>
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
const isStoreModalOpen = ref(false);

const handleFavoritesClick = () => {
  if (!user.value) {
    isAuthModalOpen.value = true;
  } else {
    router.push('/account?tab=wishlists');
  }
};

const storeSearchQuery = ref('');
const storeSearchDistance = ref('25');
const storeSearchResults = ref([]);
const isSearchingStores = ref(false);
const hasSearched = ref(false);

const searchStores = async () => {
  if (!storeSearchQuery.value) return;
  isSearchingStores.value = true;
  hasSearched.value = true;
  try {
    const res = await GATEWAY_ENDPOINT.get(`/stores/search`, {
      params: { q: storeSearchQuery.value, distance: storeSearchDistance.value }
    });
    storeSearchResults.value = res.data;
  } catch(e) {
    console.error('Error fetching stores', e);
  } finally {
    isSearchingStores.value = false;
  }
};

const useCurrentLocation = () => {
  if (navigator.geolocation) {
    isSearchingStores.value = true;
    hasSearched.value = true;
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const res = await GATEWAY_ENDPOINT.get(`/stores/search`, {
          params: { lat: latitude, lng: longitude, distance: storeSearchDistance.value }
        });
        storeSearchResults.value = res.data;
      } catch (e) {
        console.error('Error fetching stores', e);
      } finally {
        isSearchingStores.value = false;
      }
    }, (error) => {
      console.error(error);
      isSearchingStores.value = false;
      showToast({ title: 'Location Error', message: 'Could not access your location.', toastType: 'error' });
    });
  } else {
    showToast({ title: 'Not Supported', message: 'Geolocation is not supported by your browser.', toastType: 'error' });
  }
};

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
  'Clothing': [
    { name: 'New Arrivals', href: '/products?category=new&gender=girl' },
    { name: 'School Uniforms', href: '/products?category=uniforms&gender=girl' },
    { name: 'Dresses', href: '/products?category=dresses&gender=girl' },
    { name: 'Jeans', href: '/products?category=jeans&gender=girl' },
    { name: 'Leggings', href: '/products?category=leggings&gender=girl' },
    { name: 'Graphic Tees', href: '/products?category=graphic-tees&gender=girl' },
  ],
  'Shoes & Accessories': [
    { name: 'Shoes', href: '/products?category=shoes&gender=girl' },
    { name: 'Hair Accessories', href: '/products?category=accessories&gender=girl' },
    { name: 'Tights & Underwear', href: '/products?category=socks&gender=girl' },
  ],
  'More Ways to Shop': [
    { name: 'Clearance', href: '/products?category=sale&gender=girl' },
    { name: 'Back to School', href: '/products?category=back-to-school&gender=girl' },
    { name: 'Halloween', href: '/products?category=halloween&gender=girl' },
  ]
};

const boyMegaMenuSections = {
  'Clothing': [
    { name: 'New Arrivals', href: '/products?category=new&gender=boy' },
    { name: 'School Uniforms', href: '/products?category=uniforms&gender=boy' },
    { name: 'Jeans', href: '/products?category=jeans&gender=boy' },
    { name: 'Joggers & Sweatpants', href: '/products?category=bottoms&gender=boy' },
    { name: 'Graphic Tees', href: '/products?category=graphic-tees&gender=boy' },
  ],
  'Shoes & Accessories': [
    { name: 'Sneakers & Shoes', href: '/products?category=shoes&gender=boy' },
    { name: 'Hats & Accessories', href: '/products?category=accessories&gender=boy' },
    { name: 'Socks & Underwear', href: '/products?category=socks&gender=boy' },
  ],
  'More Ways to Shop': [
    { name: 'Clearance', href: '/products?category=sale&gender=boy' },
    { name: 'Game Day Shop', href: '/products?category=game-day&gender=boy' },
    { name: 'Halloween', href: '/products?category=halloween&gender=boy' },
  ]
};

const toddlerMegaMenuSections = {
  'Clothing': [
    { name: 'New Arrivals', href: '/products?category=new&ageGroup=toddler' },
    { name: 'Matching Sets', href: '/products?category=sets&ageGroup=toddler' },
    { name: 'Pajamas', href: '/products?category=pajamas&ageGroup=toddler' },
    { name: 'Graphic Tees', href: '/products?category=graphic-tees&ageGroup=toddler' },
  ],
  'Essentials': [
    { name: 'Shoes', href: '/products?category=shoes&ageGroup=toddler' },
    { name: 'Socks', href: '/products?category=socks&ageGroup=toddler' },
  ],
  'More Ways to Shop': [
    { name: 'Clearance', href: '/products?category=sale&ageGroup=toddler' },
    { name: 'Character Shop', href: '/products?category=character&ageGroup=toddler' },
  ]
};

const babyMegaMenuSections = {
  'Clothing': [
    { name: 'New Arrivals', href: '/products?category=new&ageGroup=baby' },
    { name: 'Bodysuits & One-Pieces', href: '/products?category=tops&ageGroup=baby' },
    { name: 'Sleep & Play', href: '/products?category=pajamas&ageGroup=baby' },
    { name: 'Sets', href: '/products?category=sets&ageGroup=baby' },
  ],
  'Essentials': [
    { name: 'Shoes & Booties', href: '/products?category=shoes&ageGroup=baby' },
    { name: 'Socks & Tights', href: '/products?category=socks&ageGroup=baby' },
    { name: 'Bibs & Blankets', href: '/products?category=accessories&ageGroup=baby' },
  ],
  'More Ways to Shop': [
    { name: 'Baby Shower Gifts', href: '/products?category=gifts&ageGroup=baby' },
    { name: 'Clearance', href: '/products?category=sale&ageGroup=baby' },
  ]
};

const specialtyMegaMenuSections = (tag) => ({
  'Shop By Category': [
    { name: 'Girls', href: `/products?category=${tag}&gender=girl` },
    { name: 'Boys', href: `/products?category=${tag}&gender=boy` },
    { name: 'Toddler Girls', href: `/products?category=${tag}&gender=toddler-girl` },
    { name: 'Toddler Boys', href: `/products?category=${tag}&gender=toddler-boy` },
    { name: 'Baby', href: `/products?category=${tag}&ageGroup=baby` },
  ],
  'Featured': [
    { name: 'New Additions', href: `/products?category=${tag}&sort=newest` },
    { name: 'Best Sellers', href: `/products?category=${tag}&sort=popular` },
    { name: 'Clearance', href: `/products?category=${tag}&sale=true` },
  ]
});

const navLinks = [
  { name: 'Girl', href: '/category/girl', target: 'girl', sections: girlMegaMenuSections },
  { name: 'Boy', href: '/category/boy', target: 'boy', sections: boyMegaMenuSections },
  { name: 'Toddler Girl', href: '/category/toddler-girl', target: 'toddler-girl', sections: toddlerMegaMenuSections },
  { name: 'Toddler Boy', href: '/category/toddler-boy', target: 'toddler-boy', sections: toddlerMegaMenuSections },
  { name: 'Baby', href: '/category/baby', target: 'baby', sections: babyMegaMenuSections },
  { name: 'Halloween 🎃', href: '/category/halloween', target: 'halloween', sections: specialtyMegaMenuSections('halloween') },
  { name: 'Uniforms', href: '/category/uniforms', target: 'uniforms', sections: specialtyMegaMenuSections('uniforms') },
  { name: 'Back To School', href: '/category/back-to-school', target: 'back-to-school', sections: specialtyMegaMenuSections('back-to-school') },
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
  { name: 'My Place Rewards', href: '/account?tab=rewards', icon: StarIcon },
  { name: 'Buy it Again', href: '/account?tab=buy-again', icon: RefreshCwIcon },
  { name: 'My Wishlists', href: '/wishlist', icon: HeartIcon },
  { name: 'My Place Reward Credit Card', href: '/account?tab=credit-card', icon: CreditCardIcon },
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
</script>

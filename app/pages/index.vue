<template>
  <div class="bg-amber-50/20 min-h-screen">
    <!-- Playful Landscape Hero Section -->
    <section class="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden border-b-8 border-white bg-white pt-16 pb-12">
      
      <!-- Sky Background -->
      <div class="absolute inset-0 bg-gradient-to-b from-sky-100 via-sky-50 to-white h-[65%]"></div>
      
      <!-- Ground Background (Water/Grass vibe) -->
      <div class="absolute bottom-0 left-0 right-0 bg-[#00adef] h-[35%] border-t-8 border-sky-400">
        <!-- Ground dots/texture -->
        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#ffffff 2px, transparent 2px); background-size: 30px 30px;"></div>
      </div>

      <!-- Scenery Elements (Emojis & Floating Decor) -->
      <div class="absolute top-[8%] left-[5%] text-7xl md:text-9xl opacity-80 animate-[bounce_6s_ease-in-out_infinite]">☁️</div>
      <div class="absolute top-[4%] right-[8%] text-8xl md:text-[10rem] opacity-80 animate-[bounce_7s_ease-in-out_infinite_reverse]">☁️</div>
      <div class="absolute top-[18%] right-[25%] text-5xl md:text-6xl opacity-90 animate-[pulse_4s_ease-in-out_infinite]">✈️</div>
      <div class="absolute top-[14%] left-[20%] text-4xl md:text-5xl opacity-90 animate-[pulse_5s_ease-in-out_infinite_reverse]">🚁</div>
      <div class="absolute top-[10%] right-[3%] text-5xl md:text-6xl opacity-90 animate-[pulse_6s_ease-in-out_infinite]">🎈</div>
      
      <!-- Ground Elements -->
      <div class="absolute bottom-[28%] left-[2%] text-6xl md:text-[7rem] z-10 hidden sm:block">🏠</div>
      <div class="absolute bottom-[28%] right-[3%] text-6xl md:text-[7rem] z-10 hidden sm:block">🏢</div>
      <div class="absolute bottom-[25%] left-[12%] text-6xl md:text-8xl z-20 hidden md:block">🌳</div>
      <div class="absolute bottom-[26%] right-[15%] text-5xl md:text-7xl z-20 hidden md:block">🌲</div>

      <!-- Central Hero Content: 3-Column Layout (Cards flanking central image) -->
      <div class="relative z-40 max-w-6xl mx-auto px-4 w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 my-auto">
        
        <!-- Left Item Card -->
        <div class="w-full md:w-1/3 flex justify-center md:justify-end">
          <div class="bg-white/95 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl border-4 border-rose-200 transform hover:-translate-y-2 transition-all duration-300 max-w-sm w-full relative">
            <div class="flex items-center justify-between mb-2">
              <span class="bg-rose-100 text-rose-500 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">Top Piece ✨</span>
              <span class="text-2xl">👕</span>
            </div>
            <h3 class="font-black text-stone-800 text-base md:text-lg leading-snug">{{ slides[currentSlide].topLabel }}</h3>
            <p class="font-black text-rose-500 text-3xl md:text-4xl mt-2 tracking-tight">{{ slides[currentSlide].topPrice }}</p>
            
            <!-- Connection pointer for desktop -->
            <div class="hidden md:block absolute top-1/2 -right-4 w-4 h-4 bg-rose-400 rotate-45 transform -translate-y-1/2 border-r-2 border-t-2 border-white"></div>
          </div>
        </div>

        <!-- Center Image Frame & SVG Animation -->
        <div class="w-full md:w-1/3 flex flex-col items-center justify-center">
          <div class="relative w-64 md:w-80 h-[360px] md:h-[420px] bg-white rounded-[3.5rem] p-3 shadow-2xl border-4 border-white overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
            <transition name="fade" mode="out-in">
              <img :key="currentSlide" :src="slides[currentSlide].image" class="w-full h-full object-cover rounded-[2.8rem] shadow-inner" />
            </transition>
          </div>
          
          <!-- SVG Animation (Kids Playing Kidcare) -->
          <!-- <div class="w-64 md:w-80 -mt-10 z-50 drop-shadow-xl hover:scale-105 transition-transform duration-300">
            <img src="@/assets/kids playing - kidcare.svg" alt="Kids Playing Animation" class="w-full h-auto" />
          </div> -->
        </div>

        <!-- Right Item Card -->
        <div class="w-full md:w-1/3 flex justify-center md:justify-start">
          <div class="bg-white/95 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl border-4 border-sky-200 transform hover:-translate-y-2 transition-all duration-300 max-w-sm w-full relative">
            <div class="flex items-center justify-between mb-2">
              <span class="bg-sky-100 text-sky-500 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">Bottom Piece 🌟</span>
              <span class="text-2xl">👖</span>
            </div>
            <h3 class="font-black text-stone-800 text-base md:text-lg leading-snug">{{ slides[currentSlide].bottomLabel }}</h3>
            <p class="font-black text-sky-500 text-3xl md:text-4xl mt-2 tracking-tight">{{ slides[currentSlide].bottomPrice }}</p>
            
            <!-- Connection pointer for desktop -->
            <div class="hidden md:block absolute top-1/2 -left-4 w-4 h-4 bg-sky-400 rotate-45 transform -translate-y-1/2 border-l-2 border-b-2 border-white"></div>
          </div>
        </div>

      </div>

      <!-- Playful Carousel Indicators -->
      <div class="absolute bottom-6 left-0 right-0 z-50 flex justify-center space-x-3">
        <button 
          v-for="(_, index) in slides" 
          :key="index"
          @click="currentSlide = index"
          class="w-4 h-4 rounded-full transition-all duration-300 focus:outline-none shadow-md border-2 border-white"
          :class="currentSlide === index ? 'bg-rose-500 scale-125' : 'bg-rose-300 hover:bg-rose-400'"
          aria-label="Go to slide"
        ></button>
      </div>
    </section>

    <!-- Playful Products Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="flex flex-col items-center justify-center mb-12 text-center">
        <h2 class="text-2xl md:text-3xl font-serif font-black text-sky-500 mb-2 drop-shadow-sm">✨ New Arrivals ✨</h2>
        <p class="text-stone-500 font-medium text-sm md:text-base">Discover our cutest additions for the season!</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <!-- SVG Loading Animation -->
        <div v-if="loading" class="col-span-4 flex flex-col items-center justify-center py-16">
          <img src="@/assets/Loading animation.svg" alt="Loading..." class="w-32 h-32" />
          <p class="text-rose-400 font-black text-xl mt-4 animate-pulse">Fetching cute outfits... 🎈</p>
        </div>
        <div v-else-if="!products?.length" class="col-span-4 text-center py-12 text-stone-500 font-bold">No new arrivals found.</div>
        <div v-else v-for="product in products.slice(0, 4)" :key="product._id" class="group cursor-pointer">
          <NuxtLink :to="`/products/${product._id}`" class="block bg-white rounded-3xl p-3 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-rose-50 hover:border-rose-200">
            <div class="relative bg-amber-50 aspect-[4/5] mb-4 overflow-hidden rounded-2xl">
              <img :src="product.imageUrls?.main || 'https://images.unsplash.com/photo-1522771930-78848d92871d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'" :alt="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
              
              <!-- Playful Quick Add overlay -->
              <div class="absolute inset-0 bg-white/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <button @click.stop.prevent="router.push(`/products/${product._id}`)" class="w-12 h-12 bg-white text-sky-500 rounded-full shadow-lg flex items-center justify-center hover:bg-sky-50 hover:scale-110 transition-all transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
                <button @click.stop.prevent="handleAddToCart(product)" class="w-12 h-12 bg-rose-400 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-rose-500 hover:scale-110 transition-all transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </button>
              </div>
            </div>
            <div class="text-center pb-2">
              <h3 class="font-bold text-stone-800 group-hover:text-rose-500 transition-colors text-lg truncate px-2">{{ product.name }}</h3>
              <div class="flex items-center justify-center gap-2 mt-1">
                <span class="text-xs font-bold text-sky-500 bg-sky-50 px-2 py-1 rounded-full uppercase tracking-wider">{{ product.category }}</span>
              </div>
              <p class="font-black text-amber-500 text-xl mt-3">₦{{ product.basePrice?.toFixed(2) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFetchProducts } from '@/composables/modules/products/useFetchProducts';
import { useCart } from '@/composables/core/useCart';
import { useCustomToast } from '@/composables/core/useCustomToast';

const { loading, products, fetchProducts } = useFetchProducts();
const { addToCart } = useCart();
const router = useRouter();
const { showToast } = useCustomToast();

const handleAddToCart = (product) => {
  addToCart(product, 1);
  showToast({
    title: '🎉 Yay! Added to Cart! 🎈',
    message: `Woohoo! ${product.name} is now in your cart! 🛍️✨`,
    toastType: 'success'
  });
};

const currentSlide = ref(0);
let slideInterval = null;

const slides = [
  {
    id: 1,
    // Using a kid image on a white background that can blend nicely
    image: 'https://images.unsplash.com/photo-1519278409-1f56fc0e0db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    topLabel: 'Levi\'s Logo T-Shirt (Black) with pocket',
    topPrice: '₦10,000',
    bottomLabel: 'Brown Cargo Joggers elastic back',
    bottomPrice: '₦15,000',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    topLabel: 'Cozy Winter Jacket (Red)',
    topPrice: '₦22,000',
    bottomLabel: 'Denim Blue Jeans comfortable fit',
    bottomPrice: '₦12,500',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    topLabel: 'Polka Dot Summer Dress',
    topPrice: '₦14,000',
    bottomLabel: 'Cute Pink Sandals with strap',
    bottomPrice: '₦8,000',
  },
];

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

onMounted(() => {
  fetchProducts();
  slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
});

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval);
});
</script>

<style scoped>
/* Slide Up Transition for Text Content */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.9);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-40px) scale(0.9);
}
</style>

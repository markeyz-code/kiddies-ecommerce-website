<template>
  <div>
    <!-- Hero Carousel Section -->
    <section class="relative bg-stone-200 h-[80vh] flex items-center justify-center overflow-hidden">
      <!-- Carousel Images -->
      <transition-group name="fade" tag="div" class="absolute inset-0 z-0">
        <div 
          v-for="(slide, index) in slides" 
          :key="slide.id"
          v-show="currentSlide === index"
          class="absolute inset-0 w-full h-full"
        >
          <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover opacity-70 transition-transform duration-[10000ms]" :class="{ 'scale-105': currentSlide === index }" />
          <div class="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent"></div>
        </div>
      </transition-group>
      
      <!-- Hero Content -->
      <div class="relative z-10 text-center px-4 max-w-3xl mx-auto text-white">
        <transition name="slide-up" mode="out-in">
          <div :key="currentSlide">
            <h1 class="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6" v-html="slideTitleHtml(slides[currentSlide].title)"></h1>
            <p class="text-lg md:text-xl mb-8">{{ slides[currentSlide].description }}</p>
          </div>
        </transition>
        <NuxtLink to="/products" class="inline-block bg-white text-stone-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-emerald-50 hover:text-emerald-600 transition-all transform hover:scale-105">
          Shop the Collection
        </NuxtLink>
      </div>

      <!-- Carousel Indicators -->
      <div class="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3">
        <button 
          v-for="(_, index) in slides" 
          :key="index"
          @click="currentSlide = index"
          class="w-3 h-3 rounded-full transition-colors duration-300 focus:outline-none"
          :class="currentSlide === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'"
          aria-label="Go to slide"
        ></button>
      </div>
    </section>

    <!-- Trending Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="flex items-end justify-between mb-10">
        <div>
          <h2 class="text-3xl font-serif font-bold text-stone-900 mb-2">New Arrivals</h2>
          <p class="text-stone-500">Discover our latest additions for the season.</p>
        </div>
        <NuxtLink to="/products" class="text-emerald-600 font-medium hover:underline hidden sm:block">View All</NuxtLink>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-if="loading" class="col-span-4 text-center py-12 text-stone-500">Loading arrivals...</div>
        <div v-else-if="!products?.length" class="col-span-4 text-center py-12 text-stone-500">No new arrivals found.</div>
        <div v-else v-for="product in products.slice(0, 4)" :key="product._id" class="group cursor-pointer">
          <NuxtLink :to="`/products/${product._id}`" class="block">
            <div class="relative bg-stone-100 aspect-[3/4] mb-4 overflow-hidden rounded-lg">
              <img :src="product.imageUrls?.main || 'https://images.unsplash.com/photo-1522771930-78848d92871d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <!-- Quick Add -->
              <div class="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex border-t border-stone-200">
                <button @click.stop.prevent="router.push(`/products/${product._id}`)" class="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-900 py-2 flex flex-col items-center justify-center transition-colors">
                  <span class="text-[10px] font-bold tracking-widest">VIEW</span>
                </button>
                <button @click.stop.prevent="handleAddToCart(product)" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 flex flex-col items-center justify-center transition-colors">
                  <span class="text-[10px] font-bold tracking-widest">ADD TO CART</span>
                </button>
              </div>
            </div>
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium text-stone-900 group-hover:text-emerald-600 transition-colors">{{ product.name }}</h3>
                <p class="text-sm text-stone-500 mt-1">{{ product.category }}</p>
              </div>
              <span class="font-medium">₦{{ product.basePrice?.toFixed(2) }}</span>
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
import hero1 from '@/assets/hero1.jpg';
import hero2 from '@/assets/hero2.jpg';
import hero3 from '@/assets/hero3.jpg';

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
    image: hero1,
    title: 'Curated Elegance <br/>for Little Ones',
    description: 'Premium fashion and accessories designed for comfort, durability, and style.',
  },
  {
    id: 2,
    image: hero2,
    title: 'Seasonal Favorites',
    description: 'Discover the latest trends in children\'s outerwear and cozy knits.',
  },
  {
    id: 3,
    image: hero3,
    title: 'Playful & Practical',
    description: 'Outfits made to withstand every adventure, everyday.',
  },
];

const slideTitleHtml = (title) => title;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

onMounted(() => {
  fetchProducts();
  slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
});

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval);
});
</script>

<style scoped>
/* Fade Transition for Carousel Images */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Slide Up Transition for Text Content */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

<template>
  <div class="bg-amber-50/20 min-h-screen pb-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="pending" class="flex flex-col items-center justify-center py-24">
        <img src="@/assets/Loading animation.svg" alt="Loading..." class="w-32 h-32" />
        <p class="text-rose-400 font-black text-xl mt-4 animate-pulse">Loading cute product details... 🎈</p>
      </div>
      <div v-else-if="!product" class="text-center py-24 text-stone-500 font-bold">Product not found.</div>
      <div v-else>
        <!-- Breadcrumbs -->
        <nav class="flex text-xs font-bold text-stone-400 mb-6 bg-white/60 w-fit px-5 py-2.5 rounded-full border border-stone-200">
          <NuxtLink to="/" class="hover:text-sky-500 transition-colors">Home</NuxtLink>
          <span class="mx-2 text-stone-300">/</span>
          <NuxtLink to="/products" class="hover:text-rose-500 transition-colors capitalize">{{ categoryName }}</NuxtLink>
          <span class="mx-2 text-stone-300">/</span>
          <span class="text-stone-800 truncate max-w-[200px]">{{ product.name }}</span>
        </nav>

        <div class="flex flex-col md:flex-row gap-8 md:gap-12 bg-white p-6 md:p-8 rounded-[2.5rem] border border-rose-100">
          <!-- Image Gallery -->
          <div class="w-full md:w-1/2">
            <div class="bg-amber-50 aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 border border-stone-100">
              <ImageZoom :src="mainImageUrl" :alt="product.name" />
            </div>
            <div v-if="product.images?.length > 1 || product.imageUrls?.thumbnails?.length" class="flex gap-3 overflow-x-auto pb-2">
              <div v-for="(imgObj, idx) in (product.images || product.imageUrls?.thumbnails)" :key="idx" class="flex-shrink-0 w-20 h-20 bg-amber-50 rounded-2xl overflow-hidden cursor-pointer border border-stone-200 hover:border-rose-400 transition-all duration-300">
                <img :src="imgObj.url || imgObj" alt="Thumbnail" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="w-full md:w-1/2 flex flex-col justify-center">
            <div class="inline-block bg-sky-100 text-sky-600 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider w-fit mb-3">
              {{ categoryName }}
            </div>
            <h1 class="text-2xl md:text-3xl font-serif font-black text-stone-800 mb-3 leading-tight">{{ product.name }}</h1>
            <p class="text-2xl md:text-3xl font-black text-amber-500 mb-5">₦{{ product.basePrice?.toFixed(2) }}</p>
            
            <div class="text-stone-600 font-medium mb-6 text-sm md:text-base leading-relaxed">
              <p>{{ product.description }}</p>
            </div>

            <div class="flex flex-wrap gap-4 mb-6">
              <div class="h-12 border border-rose-200 rounded-full flex items-center justify-between px-2 bg-rose-50/50 w-32">
                <button class="w-8 h-8 rounded-full flex items-center justify-center text-rose-500 hover:bg-white transition-all font-bold text-lg" @click="quantity > 1 && quantity--">-</button>
                <span class="font-black text-base text-stone-800">{{ quantity }}</span>
                <button class="w-8 h-8 rounded-full flex items-center justify-center text-rose-500 hover:bg-white transition-all font-bold text-lg" @click="quantity++">+</button>
              </div>
              <button @click="addToCart" class="flex-1 min-w-[180px] h-12 bg-rose-400 text-white font-black text-base rounded-full hover:bg-rose-500 transition-all duration-300">
                Add to Cart 🛍️
              </button>
            </div>
          </div>
        </div>

        <!-- Tabs Section -->
        <div class="mt-16">
          <div class="flex gap-6 border-b-2 border-stone-100 mb-8 overflow-x-auto hide-scrollbar">
            <button @click="activeTab = 'description'" :class="['pb-3 font-bold text-base md:text-lg transition-all border-b-2 whitespace-nowrap', activeTab === 'description' ? 'border-sky-400 text-sky-500 scale-105' : 'border-transparent text-stone-400 hover:text-stone-600']">Description</button>
            <button @click="activeTab = 'additional'" :class="['pb-3 font-bold text-base md:text-lg transition-all border-b-2 whitespace-nowrap', activeTab === 'additional' ? 'border-amber-400 text-amber-500 scale-105' : 'border-transparent text-stone-400 hover:text-stone-600']">Details</button>
            <button @click="activeTab = 'reviews'" :class="['pb-3 font-bold text-base md:text-lg transition-all border-b-2 whitespace-nowrap', activeTab === 'reviews' ? 'border-rose-400 text-rose-500 scale-105' : 'border-transparent text-stone-400 hover:text-stone-600']">Reviews ({{ product.reviewCount || 0 }})</button>
          </div>

          <!-- Tab Contents -->
          <div class="bg-white p-8 md:p-12 rounded-[3rem] border border-stone-200 min-h-[300px]">
            <div v-if="activeTab === 'description'" class="prose prose-stone max-w-none text-stone-600 font-medium text-lg">
              <p>{{ product.description || 'No description available for this product.' }}</p>
            </div>

            <div v-if="activeTab === 'additional'" class="prose prose-stone max-w-none text-stone-600 font-medium text-lg">
              <p>{{ product.additionalInformation || 'No additional information available.' }}</p>
            </div>

            <div v-if="activeTab === 'reviews'">
              <div class="flex flex-col md:flex-row gap-16">
                <!-- Reviews List -->
                <div class="w-full md:w-3/5">
                  <h3 class="text-2xl font-black text-stone-800 mb-8 flex items-center gap-3">
                    Customer Reviews
                    <span class="text-3xl">⭐</span>
                  </h3>
                  
                  <div v-if="reviewsLoading" class="text-rose-400 font-bold py-4 animate-pulse">Loading sweet reviews...</div>
                  <div v-else-if="reviews.length === 0" class="bg-stone-50 p-8 rounded-3xl text-center border-2 border-dashed border-stone-200">
                    <p class="text-stone-500 font-bold mb-2">No reviews yet!</p>
                    <p class="text-sm text-stone-400">Be the first to share your thoughts.</p>
                  </div>
                  <div v-else class="space-y-6">
                    <div v-for="review in reviews" :key="review._id" class="bg-stone-50 p-6 rounded-3xl border border-stone-100 hover:shadow-md transition-shadow">
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-black">
                            {{ (review.userId?.firstName || '').charAt(0) }}
                          </div>
                          <div>
                            <p class="font-bold text-stone-800 leading-none">{{ review.userId?.firstName }} {{ review.userId?.lastName }}</p>
                            <span class="text-xs font-bold text-stone-400">{{ new Date(review.createdAt).toLocaleDateString() }}</span>
                          </div>
                        </div>
                        <div class="flex text-amber-400">
                          <svg v-for="i in 5" :key="i" :class="['w-5 h-5', i <= review.rating ? 'fill-current text-amber-400' : 'text-stone-200']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                      </div>
                      <p class="text-stone-600 font-medium pl-13">{{ review.comment }}</p>
                    </div>
                  </div>
                </div>

                <!-- Write a Review -->
                <div class="w-full md:w-2/5">
                  <div class="bg-rose-50/50 p-8 rounded-[2.5rem] border-2 border-rose-100 shadow-sm relative overflow-hidden">
                    <!-- Decor -->
                    <div class="absolute -top-6 -right-6 text-6xl opacity-20 transform rotate-12">📝</div>
                    
                    <h3 class="text-xl font-black text-stone-800 mb-6 relative z-10">Write a Review</h3>
                    <div v-if="!user" class="text-sm font-bold text-stone-600 mb-4 bg-white p-4 rounded-2xl border border-stone-100">
                      Please <NuxtLink :to="`/login?redirect=/products/${product._id}`" class="text-rose-500 hover:text-rose-600 hover:underline">log in</NuxtLink> to post a review.
                    </div>
                    <form v-else @submit.prevent="handleReviewSubmit" class="space-y-6 relative z-10">
                      <div>
                        <label class="block text-sm font-bold text-stone-700 mb-3">How was it?</label>
                        <div class="flex gap-2 cursor-pointer bg-white w-fit p-3 rounded-full shadow-sm border border-rose-50">
                          <svg v-for="i in 5" :key="i" @click="newReview.rating = i" @mouseenter="hoverRating = i" @mouseleave="hoverRating = 0" :class="['w-8 h-8 transition-transform hover:scale-110', (hoverRating || newReview.rating) >= i ? 'text-amber-400 fill-current' : 'text-stone-200']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                        </div>
                      </div>
                      <div>
                        <label class="block text-sm font-bold text-stone-700 mb-2">Your Thoughts</label>
                        <textarea v-model="newReview.comment" rows="4" required placeholder="Tell us what you think! 💖" class="w-full rounded-2xl border-2 border-stone-200 shadow-sm focus:border-rose-400 focus:ring-4 focus:ring-rose-100 text-sm py-4 px-4 bg-white font-medium resize-none transition-all"></textarea>
                      </div>
                      <button type="submit" :disabled="!newReview.rating || !newReview.comment || isSubmittingReview" class="w-full bg-stone-800 text-white font-black py-4 rounded-full shadow-md hover:bg-rose-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 text-sm tracking-wide">
                        {{ isSubmittingReview ? 'Sending...' : 'Post Review' }}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { useCart } from '@/composables/core/useCart'
import { useFetchProducts } from '@/composables/modules/products/useFetchProducts'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useReviews } from '@/composables/modules/reviews/useReviews'
import { useAuth } from '@/composables/modules/auth/useAuth'
import { useRoute } from 'vue-router'

const route = useRoute()
const cartStore = useCart()
const { showToast } = useCustomToast()
const { loading: pending, singleProduct: product, fetchProductById } = useFetchProducts()
const { reviews, loading: reviewsLoading, fetchReviews, submitReview } = useReviews()
const { user, fetchProfile } = useAuth()

const quantity = ref(1)
const activeTab = ref('description')
const hoverRating = ref(0)
const isSubmittingReview = ref(false)

const categoryName = computed(() => {
  if (!product.value) return 'Outfits'
  if (typeof product.value.categoryId === 'object' && product.value.categoryId?.name) {
    return product.value.categoryId.name
  }
  return product.value.category || product.value.categoryId || 'Outfits'
})

const mainImageUrl = computed(() => {
  if (!product.value) return ''
  return product.value.imageUrls?.large || 
         product.value.imageUrls?.original || 
         product.value.imageUrls?.medium || 
         product.value.imageUrls?.main || 
         product.value.images?.[0]?.url || 
         'https://images.unsplash.com/photo-1519278409-1f56fc0e0db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
})

const newReview = reactive({
  rating: 0,
  comment: ''
})

onMounted(async () => {
  await fetchProductById(route.params.id)
  await fetchReviews(route.params.id)
  await fetchProfile()
})

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value)
    showToast({
      title: '🎉 Yay! Added to Cart! 🎈',
      message: `Woohoo! ${quantity.value}x ${product.value.name} is now in your cart! 🛍️✨`,
      toastType: 'success'
    })
  }
}

const handleReviewSubmit = async () => {
  isSubmittingReview.value = true
  const success = await submitReview(product.value._id, newReview.rating, newReview.comment)
  if (success) {
    newReview.rating = 0
    newReview.comment = ''
    // Optionally refresh product to get updated review count/average rating
    fetchProductById(route.params.id)
  }
  isSubmittingReview.value = false
}
</script>

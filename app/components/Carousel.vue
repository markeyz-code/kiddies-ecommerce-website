<template>
  <div class="w-full bg-white">
    <!-- Main Container -->
    <div class="flex gap-8 px-8 py-12 max-w-7xl mx-auto">
      <!-- Hero Section (Left) -->
      <div class="w-1/2 flex flex-col justify-center">
        <div class="bg-amber-800 aspect-square rounded-sm overflow-hidden mb-6">
          <img 
            :src="heroImage" 
            alt="Back to School"
            class="w-full h-full object-cover"
          />
        </div>
        <h1 class="text-5xl font-serif italic text-gray-800 mb-6 leading-tight">
          {{ title }}
        </h1>
        <a href="#" class="inline-block text-xs font-sans font-bold uppercase tracking-widest text-gray-800 underline underline-offset-4 hover:opacity-75 w-fit">
          Shop Now
        </a>
      </div>

      <!-- Product Grid (Right) -->
      <div class="w-1/2">
        <div class="grid grid-cols-3 gap-6">
          <div v-for="(item, index) in items" :key="index" class="group">
            <NuxtLink :to="item.id ? `/product/${item.id}` : '#'" class="block">
              <!-- Product Image Container -->
              <div class="bg-cream-200 aspect-square mb-3 flex items-center justify-center overflow-hidden rounded-sm group-hover:bg-brand-300 transition-colors">
                <img 
                  v-if="item.image && item.image !== '/img/placeholder.jpg'" 
                  :src="item.image" 
                  :alt="item.name"
                  class="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
                <div v-else class="text-5xl">{{ item.emoji || '👕' }}</div>
              </div>

              <!-- Product Info -->
              <div class="space-y-2">
                <h3 class="text-xs font-sans text-gray-800 line-clamp-2 leading-tight min-h-[2rem]">
                  {{ item.name }}
                </h3>
                
                <div v-if="item.price" class="flex items-center gap-2">
                  <span v-if="item.originalPrice" class="text-xs text-gray-400 line-through">
                    ${{ item.originalPrice.toFixed(2) }}
                  </span>
                  <span class="text-sm font-bold text-gray-800">
                    ${{ item.price.toFixed(2) }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'THE BACK-TO-SCHOOL EDIT'
  },
  heroImage: {
    type: String,
    required: false,
    default: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=600&fit=crop'
  },
  items: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.min-h-\[2rem\] {
  min-height: 2rem;
}
</style>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-black mb-8 uppercase tracking-widest text-center">Admin: Promo Bonanza & Banners</h1>
    
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Promotions List -->
      <div class="w-full md:w-1/2 space-y-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Active Promotions</h2>
          <button @click="openCreateForm" class="bg-[#1a365d] text-white px-4 py-2 rounded text-sm font-bold hover:bg-black">
            + New Promotion
          </button>
        </div>

        <div v-if="promotions.length === 0" class="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border">
          No promotions configured yet.
        </div>

        <div v-for="promo in promotions" :key="promo._id" class="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <div>
              <span class="inline-block px-2 py-1 text-[10px] font-bold text-white bg-blue-600 rounded mb-1 uppercase tracking-wider">{{ promo.type }}</span>
              <span v-if="promo.categoryTarget" class="inline-block px-2 py-1 text-[10px] font-bold text-gray-800 bg-gray-200 rounded mb-1 uppercase tracking-wider ml-2">Target: {{ promo.categoryTarget }}</span>
              <h3 class="font-bold text-lg text-gray-900">{{ promo.title }}</h3>
            </div>
            <div class="flex gap-2">
              <button @click="editPromotion(promo)" class="text-sm font-bold text-blue-600 hover:underline">Edit</button>
              <button @click="deletePromotion(promo._id)" class="text-sm font-bold text-red-600 hover:underline">Delete</button>
            </div>
          </div>
          <p class="text-sm text-gray-600" v-if="promo.subtitle">{{ promo.subtitle }}</p>
          <img v-if="promo.imageUrl" :src="promo.imageUrl" class="h-20 object-cover rounded mt-2 border" />
          <div class="flex items-center gap-2 mt-2">
            <span class="text-xs text-gray-500">Status:</span>
            <span :class="promo.isActive ? 'text-green-600' : 'text-red-600'" class="text-xs font-bold">{{ promo.isActive ? 'Active' : 'Inactive' }}</span>
          </div>
        </div>
      </div>

      <!-- Promotion Form -->
      <div class="w-full md:w-1/2 bg-gray-50 p-6 rounded-xl border">
        <h2 class="text-xl font-bold mb-6">{{ isEditing ? 'Edit Promotion' : 'Create New Promotion' }}</h2>
        <form @submit.prevent="savePromotion" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Title</label>
            <input v-model="form.title" required class="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. Labor Day Monster Sale" />
          </div>
          
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Subtitle / Main Text</label>
            <input v-model="form.subtitle" class="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. 75% Off All Clearance" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Type</label>
              <select v-model="form.type" required class="w-full border rounded px-3 py-2 text-sm bg-white">
                <option value="hero">Hero Banner (Full Width)</option>
                <option value="banner">Standard Banner</option>
                <option value="megamenu_ad">Mega Menu Ad (Dropdown)</option>
              </select>
            </div>
            <div v-if="form.type === 'megamenu_ad'">
              <label class="block text-xs font-bold text-gray-700 mb-1">Category Target (Mega Menu)</label>
              <select v-model="form.categoryTarget" class="w-full border rounded px-3 py-2 text-sm bg-white">
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
                <option value="toddler-boy">Toddler Boy</option>
                <option value="toddler-girl">Toddler Girl</option>
                <option value="baby">Baby</option>
              </select>
            </div>
            <div v-else>
               <label class="block text-xs font-bold text-gray-700 mb-1">Background Color</label>
               <input v-model="form.backgroundColor" class="w-full border rounded px-3 py-2 text-sm" placeholder="#FF0000" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
            <input v-model="form.imageUrl" required class="w-full border rounded px-3 py-2 text-sm" placeholder="https://example.com/image.jpg" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">CTA Text</label>
              <input v-model="form.ctaText" class="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. SHOP NOW" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">CTA Link</label>
              <input v-model="form.ctaLink" class="w-full border rounded px-3 py-2 text-sm" placeholder="/products?category=sale" />
            </div>
          </div>

          <div class="flex items-center gap-2 mt-4">
            <input type="checkbox" id="isActive" v-model="form.isActive" class="w-4 h-4 text-blue-600 rounded" />
            <label for="isActive" class="text-sm font-bold text-gray-700">Active (Visible on site)</label>
          </div>

          <div class="pt-4 flex gap-3">
            <button type="submit" class="flex-1 bg-green-600 text-white py-3 rounded text-sm font-bold hover:bg-green-700 transition-colors">
              {{ isEditing ? 'Update Promotion' : 'Save Promotion' }}
            </button>
            <button v-if="isEditing" type="button" @click="resetForm" class="px-6 bg-gray-200 text-gray-800 py-3 rounded text-sm font-bold hover:bg-gray-300 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const { $api } = useNuxtApp()

const promotions = ref<any[]>([])
const isEditing = ref(false)

const defaultForm = {
  _id: undefined,
  title: '',
  subtitle: '',
  type: 'hero',
  categoryTarget: '',
  imageUrl: '',
  backgroundColor: '',
  ctaText: '',
  ctaLink: '',
  isActive: true
}

const form = ref({ ...defaultForm })

const fetchPromotions = async () => {
  try {
    const res = await $api.get('/promotions')
    promotions.value = res.data
  } catch (err) {
    console.error('Failed to fetch promotions', err)
  }
}

const openCreateForm = () => {
  resetForm()
}

const editPromotion = (promo: any) => {
  isEditing.value = true
  form.value = { ...promo }
}

const resetForm = () => {
  isEditing.value = false
  form.value = { ...defaultForm }
}

const savePromotion = async () => {
  try {
    if (isEditing.value) {
      await $api.put(`/promotions/${form.value._id}`, form.value)
    } else {
      await $api.post('/promotions', form.value)
    }
    await fetchPromotions()
    resetForm()
  } catch (err) {
    console.error('Failed to save promotion', err)
    alert('Failed to save promotion.')
  }
}

const deletePromotion = async (id: string) => {
  if (!confirm('Are you sure you want to delete this promotion?')) return
  try {
    await $api.delete(`/promotions/${id}`)
    await fetchPromotions()
  } catch (err) {
    console.error('Failed to delete promotion', err)
    alert('Failed to delete promotion.')
  }
}

onMounted(() => {
  fetchPromotions()
})
</script>

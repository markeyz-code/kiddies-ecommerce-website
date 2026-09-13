<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-black mb-8 uppercase tracking-widest text-center">Admin: Products</h1>
    
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Products List -->
      <div class="w-full md:w-1/2 space-y-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">All Products</h2>
        </div>

        <div v-if="loading" class="text-center py-8">
          Loading products...
        </div>

        <div v-else class="space-y-2 max-h-[700px] overflow-y-auto pr-2">
          <div 
            v-for="product in products" 
            :key="product._id" 
            @click="selectProduct(product)"
            class="border rounded-lg p-3 bg-white shadow-sm flex flex-col gap-2 cursor-pointer hover:border-blue-500 transition-colors"
            :class="{'border-blue-600 bg-blue-50': selectedProduct?._id === product._id}"
          >
            <div class="flex items-center gap-3">
              <img :src="getProductImage(product)" class="w-12 h-12 object-cover rounded border" />
              <div>
                <h3 class="font-bold text-sm text-gray-900">{{ product.name }}</h3>
                <p class="text-xs text-gray-500">{{ product.sku }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Product Panel (Focus on Related Products) -->
      <div class="w-full md:w-1/2 bg-gray-50 p-6 rounded-xl border">
        <h2 class="text-xl font-bold mb-6">Related Products Configuration</h2>
        
        <div v-if="!selectedProduct" class="text-gray-500 text-center py-12">
          Select a product from the list to configure its related products.
        </div>
        
        <div v-else>
          <div class="mb-6 flex items-center gap-4 p-4 bg-white rounded border">
             <img :src="getProductImage(selectedProduct)" class="w-16 h-16 object-cover rounded border" />
             <div>
               <h3 class="font-bold text-gray-900">{{ selectedProduct.name }}</h3>
               <p class="text-xs text-gray-500">Editing Related Products</p>
             </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-bold text-gray-700 mb-2">Current Related Products</label>
            <div class="space-y-2 mb-4">
               <div v-if="form.relatedProducts.length === 0" class="text-xs text-gray-500 italic">No manual related products assigned. Dynamic fallback will be used.</div>
               <div v-for="(relatedId, index) in form.relatedProducts" :key="relatedId" class="flex justify-between items-center bg-white p-2 border rounded">
                  <span class="text-sm font-medium">{{ getProductName(relatedId) }}</span>
                  <button @click="removeRelated(index)" class="text-red-500 hover:text-red-700 text-xs font-bold">Remove</button>
               </div>
            </div>
            
            <div class="mt-6 border-t pt-4">
              <label class="block text-sm font-bold text-gray-700 mb-2">Add Related Product</label>
              <div class="flex gap-2">
                <select v-model="selectedRelatedToAdd" class="flex-1 border rounded px-3 py-2 text-sm bg-white">
                  <option value="" disabled>Select a product...</option>
                  <option 
                    v-for="p in availableProductsToAdd" 
                    :key="p._id" 
                    :value="p._id"
                  >
                    {{ p.name }}
                  </option>
                </select>
                <button @click="addRelated" :disabled="!selectedRelatedToAdd" class="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 disabled:opacity-50">Add</button>
              </div>
            </div>
          </div>

          <div class="pt-4 border-t flex justify-end">
            <button @click="saveProduct" class="bg-green-600 text-white px-6 py-3 rounded text-sm font-bold hover:bg-green-700 transition-colors">
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const { $api } = useNuxtApp()

const products = ref<any[]>([])
const loading = ref(true)
const selectedProduct = ref<any>(null)
const selectedRelatedToAdd = ref('')

const form = ref({
  relatedProducts: [] as string[]
})

const fetchProducts = async () => {
  loading.value = true
  try {
    const res = await $api.get('/products?limit=200') // fetch a bunch for admin
    products.value = res.data.products || []
  } catch (err) {
    console.error('Failed to fetch products', err)
  } finally {
    loading.value = false
  }
}

const getProductImage = (p: any) => {
  if (p.imageUrls?.original) return p.imageUrls.original
  if (p.images && p.images.length > 0) return p.images[0].url
  return '/img/placeholder.jpg'
}

const getProductName = (id: string) => {
  const p = products.value.find(p => p._id === id)
  return p ? p.name : 'Unknown Product'
}

const availableProductsToAdd = computed(() => {
  if (!selectedProduct.value) return []
  return products.value.filter(p => 
    p._id !== selectedProduct.value._id && 
    !form.value.relatedProducts.includes(p._id)
  )
})

const selectProduct = (product: any) => {
  selectedProduct.value = product
  form.value.relatedProducts = [...(product.relatedProducts || [])]
  selectedRelatedToAdd.value = ''
}

const addRelated = () => {
  if (selectedRelatedToAdd.value && !form.value.relatedProducts.includes(selectedRelatedToAdd.value)) {
    form.value.relatedProducts.push(selectedRelatedToAdd.value)
    selectedRelatedToAdd.value = ''
  }
}

const removeRelated = (index: number) => {
  form.value.relatedProducts.splice(index, 1)
}

const saveProduct = async () => {
  try {
    await $api.put(`/products/${selectedProduct.value._id}`, {
      relatedProducts: form.value.relatedProducts
    })
    
    // Update local state
    const index = products.value.findIndex(p => p._id === selectedProduct.value._id)
    if (index !== -1) {
      products.value[index].relatedProducts = [...form.value.relatedProducts]
    }
    
    alert('Related products saved successfully!')
  } catch (err) {
    console.error('Failed to save product', err)
    alert('Failed to save related products.')
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

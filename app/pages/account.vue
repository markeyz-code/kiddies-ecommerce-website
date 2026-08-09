<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex flex-col md:flex-row gap-8">
      
      <!-- Account Sidebar -->
      <div class="w-full md:w-64 flex-shrink-0">
        <div class="bg-white rounded-lg border border-stone-200 p-6 sticky top-24">
          <div class="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
            <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xl">
              {{ user?.firstName?.charAt(0) || 'U' }}
            </div>
            <div>
              <h3 class="font-bold text-stone-900">{{ user?.firstName }} {{ user?.lastName }}</h3>
              <p class="text-xs text-stone-500">{{ user?.email }}</p>
            </div>
          </div>
          
          <nav class="space-y-2">
            <a href="#" class="block px-3 py-2 rounded-md bg-emerald-50 text-emerald-600 font-medium">Order History</a>
            <a href="#" class="block px-3 py-2 rounded-md text-stone-600 hover:bg-stone-50 transition-colors">Wishlist</a>
            <a href="#" class="block px-3 py-2 rounded-md text-stone-600 hover:bg-stone-50 transition-colors">Saved Addresses</a>
            <a href="#" class="block px-3 py-2 rounded-md text-stone-600 hover:bg-stone-50 transition-colors">Payment Methods</a>
            <button @click="handleLogout" class="block w-full text-left px-3 py-2 rounded-md text-stone-600 hover:bg-stone-50 transition-colors mt-8 text-rose-500">Log out</button>
          </nav>
        </div>
      </div>
      
      <!-- Account Main Content -->
      <div class="flex-1">
        <h1 class="text-3xl font-serif font-bold text-stone-900 mb-8">Order History</h1>
        
        <div class="bg-white rounded-lg border border-stone-200 overflow-hidden">
          
          <!-- Mock Order -->
          <div class="border-b border-stone-200 last:border-0 p-6">
            <div class="flex flex-wrap justify-between items-center mb-4">
              <div>
                <p class="text-sm text-stone-500">Order placed</p>
                <p class="font-medium">March 15, 2024</p>
              </div>
              <div>
                <p class="text-sm text-stone-500">Total</p>
                <p class="font-medium">₦124.00</p>
              </div>
              <div>
                <p class="text-sm text-stone-500">Order #</p>
                <p class="font-medium">ORD-89241</p>
              </div>
              <div class="mt-4 sm:mt-0">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Delivered
                </span>
              </div>
            </div>
            
            <div class="flex gap-4 mt-6">
              <div class="w-20 h-24 bg-stone-100 rounded-md overflow-hidden">
                <img src="https://images.unsplash.com/photo-1522771930-78848d92871d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover" />
              </div>
              <div>
                <h4 class="font-medium text-stone-900">Organic Cotton Onesie</h4>
                <p class="text-sm text-stone-500 mt-1">Quantity: 2</p>
                <p class="text-sm font-medium mt-2">₦68.00</p>
              </div>
            </div>
            
            <div class="mt-6 pt-6 border-t border-stone-100 flex gap-4">
              <button class="bg-white border border-stone-300 text-stone-700 px-4 py-2 rounded shadow-sm text-sm font-medium hover:bg-stone-50">View Invoice</button>
              <button class="bg-emerald-600 text-white px-4 py-2 rounded shadow-sm text-sm font-medium hover:bg-emerald-700">Buy Again</button>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/modules/auth/useAuth';

const router = useRouter();
const { user, fetchProfile } = useAuth();

onMounted(async () => {
  const profile = await fetchProfile();
  if (!profile) {
    router.push('/login');
  }
});

const handleLogout = () => {
  // Clear cookies and local user data, then route to login
  document.cookie = 'accessToken=; Max-Age=0; path=/';
  document.cookie = 'refreshToken=; Max-Age=0; path=/';
  router.push('/login');
};
</script>

<template>
  <div class="min-h-[70vh] bg-white flex flex-col items-center justify-center py-16 px-4">
    
    <div class="w-full max-w-lg text-center mb-8">
      <h1 class="text-3xl font-black text-[#1a365d] uppercase tracking-wider mb-2">Track Order</h1>
      <p class="text-stone-700 text-sm font-medium">Enter your email address and order number</p>
    </div>

    <form @submit.prevent="handleTrackOrder" class="w-full max-w-md space-y-6">
      
      <!-- Email Address Input -->
      <div class="space-y-1 relative text-left">
        <label class="text-xs font-bold text-stone-600">Email Address</label>
        <input 
          v-model="email" 
          type="email" 
          :class="{'border-red-500 border-b-2': hasError && !email, 'border-stone-300 border-b': !(hasError && !email)}"
          class="w-full py-2 bg-transparent focus:outline-none focus:border-[#1a365d] transition-colors font-medium text-stone-800"
        >
        <p v-if="hasError && !email" class="text-red-500 text-[10px] font-bold mt-1 flex items-center">
          <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Please enter a valid email address
        </p>
      </div>

      <!-- Order Number Input -->
      <div class="space-y-1 relative text-left">
        <label class="text-xs font-bold text-stone-600">Order Number</label>
        <input 
          v-model="orderNumber" 
          type="text" 
          :class="{'border-red-500 border-b-2': (hasError && !orderNumber) || notFoundError, 'border-stone-300 border-b': !((hasError && !orderNumber) || notFoundError)}"
          class="w-full py-2 bg-transparent focus:outline-none focus:border-[#1a365d] transition-colors font-medium text-stone-800"
        >
        <p v-if="hasError && !orderNumber" class="text-red-500 text-[10px] font-bold mt-1 flex items-center">
          <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ERROR: Please enter a valid order number.
        </p>
        <p v-else-if="notFoundError" class="text-red-500 text-[10px] font-bold mt-1 flex items-center">
          <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ERROR: Order not found with the provided details.
        </p>
      </div>
      
      <div class="text-left mt-2">
        <a href="#" class="text-xs font-bold text-stone-800 underline hover:text-[#1a365d]">Need Help?</a>
      </div>

      <div class="pt-6">
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-[#8299a8] hover:bg-[#6c8392] text-white font-bold py-4 px-6 rounded-full uppercase tracking-widest text-sm transition-colors flex justify-center items-center"
        >
          <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
          <span v-else>Track Order</span>
        </button>
      </div>

    </form>

    <div class="mt-12 text-center space-y-4">
      <p class="text-xs font-medium text-stone-600">
        Have an account?<br/>
        <NuxtLink to="/login" class="font-bold text-stone-900 underline hover:text-[#1a365d]">Log in</NuxtLink> to see your order history.
      </p>
      
      <p class="text-xs font-medium text-stone-600">
        <a href="#" class="font-bold text-stone-900 underline hover:text-[#1a365d]">Click here</a> to track an international order.
      </p>
    </div>
    
    <!-- Order Results -->
    <div v-if="orderResult" class="w-full max-w-2xl mt-16 p-8 border-2 border-stone-200 rounded-3xl bg-stone-50">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-black text-[#1a365d]">Order {{ orderResult.orderNumber }}</h2>
        <span class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider" :class="getStatusColor(orderResult.status)">
          {{ orderResult.status }}
        </span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Shipping Address</h3>
          <p class="text-sm font-medium text-stone-800">
            {{ orderResult.customer.firstName }} {{ orderResult.customer.lastName }}<br>
            {{ orderResult.customer.address }}<br>
            {{ orderResult.customer.city }}, {{ orderResult.customer.state || '' }} {{ orderResult.customer.zipCode }}<br>
            {{ orderResult.customer.country }}
          </p>
        </div>
        <div>
          <h3 class="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Order Summary</h3>
          <p class="text-sm font-medium text-stone-800 flex justify-between mb-1">
            <span>Items:</span>
            <span>{{ orderResult.items.reduce((acc, item) => acc + item.quantity, 0) }}</span>
          </p>
          <p class="text-sm font-medium text-stone-800 flex justify-between mb-1">
            <span>Total:</span>
            <span>${{ (orderResult.totalAmount || 0).toFixed(2) }}</span>
          </p>
          <p class="text-sm font-medium text-stone-800 flex justify-between mt-2 pt-2 border-t border-stone-200">
            <span>Payment:</span>
            <span :class="orderResult.paymentStatus === 'Paid' ? 'text-green-600' : 'text-stone-500'">{{ orderResult.paymentStatus }}</span>
          </p>
        </div>
      </div>
      
      <h3 class="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Items</h3>
      <div class="space-y-4">
        <div v-for="item in orderResult.items" :key="item.sku" class="flex gap-4 items-center bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
          <div class="flex-1">
            <h4 class="font-bold text-stone-800 text-sm">{{ item.name }}</h4>
            <p class="text-xs text-stone-500 mt-1">Qty: {{ item.quantity }} | SKU: {{ item.sku }}</p>
          </div>
          <div class="font-black text-[#1a365d]">
            ${{ ((item.price || 0) * item.quantity).toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';

const email = ref('');
const orderNumber = ref('');
const loading = ref(false);
const hasError = ref(false);
const notFoundError = ref(false);
const orderResult = ref(null);

const handleTrackOrder = async () => {
  hasError.value = false;
  notFoundError.value = false;
  orderResult.value = null;

  if (!email.value || !orderNumber.value) {
    hasError.value = true;
    return;
  }

  loading.value = true;
  try {
    const res = await GATEWAY_ENDPOINT.post('/orders/track', {
      email: email.value,
      orderNumber: orderNumber.value
    });
    
    if (res.data) {
      orderResult.value = res.data;
    } else {
      notFoundError.value = true;
    }
  } catch (error) {
    console.error('Error tracking order:', error);
    notFoundError.value = true;
  } finally {
    loading.value = false;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Processing': return 'bg-blue-100 text-blue-800';
    case 'Shipped': return 'bg-indigo-100 text-indigo-800';
    case 'Delivered': return 'bg-green-100 text-green-800';
    case 'Cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>

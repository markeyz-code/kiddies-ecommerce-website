<template>
  <div class="flex min-h-[70vh] flex-col items-center justify-center bg-cream-50 px-4 py-14 sm:py-16">
    
    <div class="w-full max-w-lg text-center mb-8">
      <p class="eyebrow mb-2">Order status</p>
      <h1 class="section-title">Track your order</h1>
      <p class="mt-2 text-sm font-medium text-brand-500">Enter your email address and order number to see the latest status.</p>
    </div>

    <form @submit.prevent="handleTrackOrder" class="w-full max-w-md space-y-6">
      
      <!-- Email Address Input -->
      <div class="space-y-1 relative text-left">
        <label class="text-[11px] font-bold uppercase tracking-wider text-brand-500">Email address</label>
        <input 
          v-model="email" 
          type="email" 
          :class="{'border-red-500 border-b-2': hasError && !email, 'border-brand-300 border-b': !(hasError && !email)}"
          class="input-base"
        >
        <p v-if="hasError && !email" class="text-red-500 text-[10px] font-bold mt-1 flex items-center">
          <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Please enter a valid email address
        </p>
      </div>

      <!-- Order Number Input -->
      <div class="space-y-1 relative text-left">
        <label class="text-[11px] font-bold uppercase tracking-wider text-brand-500">Order number</label>
        <input 
          v-model="orderNumber" 
          type="text" 
          :class="{'border-red-500 border-b-2': (hasError && !orderNumber) || notFoundError, 'border-brand-300 border-b': !((hasError && !orderNumber) || notFoundError)}"
          class="input-base"
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
        <NuxtLink to="/contact" class="text-xs font-bold text-brand-800 underline hover:text-brand-900">Need Help?</NuxtLink>
      </div>

      <div class="pt-6">
        <button 
          type="submit" 
          :disabled="loading"
          class="btn-primary w-full"
        >
          <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
          <span v-else>Track Order</span>
        </button>
      </div>

    </form>

    <div class="mt-12 text-center space-y-4">
      <p class="text-xs font-medium text-brand-500">
        Have an account?<br/>
        <NuxtLink to="/login" class="font-bold text-brand-900 underline hover:text-brand-900">Log in</NuxtLink> to see your order history.
      </p>
      
      <p class="text-xs font-medium text-brand-500">
        <NuxtLink to="/contact" class="font-bold text-brand-900 underline hover:text-brand-900">Click here</NuxtLink> to track an international order.
      </p>
    </div>
    
    <!-- Order Results -->
    <div v-if="orderResult" class="mt-14 w-full max-w-2xl rounded-3xl border border-cream-200 bg-white p-6 sm:p-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-black text-brand-900">Order {{ orderResult.orderNumber }}</h2>
        <span class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider" :class="getStatusColor(orderResult.status)">
          {{ orderResult.status }}
        </span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-2">Shipping Address</h3>
          <p class="text-sm font-medium text-brand-800">
            {{ orderResult.customer.firstName }} {{ orderResult.customer.lastName }}<br>
            {{ orderResult.customer.address }}<br>
            {{ orderResult.customer.city }}, {{ orderResult.customer.state || '' }} {{ orderResult.customer.zipCode }}<br>
            {{ orderResult.customer.country }}
          </p>
        </div>
        <div>
          <h3 class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-2">Order Summary</h3>
          <p class="text-sm font-medium text-brand-800 flex justify-between mb-1">
            <span>Items:</span>
            <span>{{ orderResult.items.reduce((acc, item) => acc + item.quantity, 0) }}</span>
          </p>
          <p class="text-sm font-medium text-brand-800 flex justify-between mb-1">
            <span>Total:</span>
            <span>${{ (orderResult.totalAmount || 0).toFixed(2) }}</span>
          </p>
          <p class="text-sm font-medium text-brand-800 flex justify-between mt-2 pt-2 border-t border-cream-200">
            <span>Payment:</span>
            <span :class="orderResult.paymentStatus === 'Paid' ? 'text-green-600' : 'text-brand-500'">{{ orderResult.paymentStatus }}</span>
          </p>
        </div>
      </div>
      
      <h3 class="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4">Items</h3>
      <div class="space-y-4">
        <div v-for="item in orderResult.items" :key="item.sku" class="flex gap-4 items-center bg-white p-4 rounded-xl border border-cream-100 shadow-sm">
          <div class="flex-1">
            <h4 class="font-bold text-brand-800 text-sm">{{ item.name }}</h4>
            <p class="text-xs text-brand-500 mt-1">Qty: {{ item.quantity }} | SKU: {{ item.sku }}</p>
          </div>
          <div class="font-black text-brand-900">
            ${{ ((item.price || 0) * item.quantity).toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ordersApi } from '~/api_factory/modules/orders';

const route = useRoute();
const email = ref(String(route.query.email || ''));
const orderNumber = ref(String(route.query.orderNumber || ''));
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
    const { data } = await ordersApi.trackOrder({
      email: email.value,
      orderNumber: orderNumber.value
    });

    if (data) {
      orderResult.value = data;
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

onMounted(() => {
  if (email.value && orderNumber.value) {
    handleTrackOrder();
  }
});

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Processing': return 'bg-brand-100 text-brand-800';
    case 'Shipped': return 'bg-brand-100 text-brand-800';
    case 'Delivered': return 'bg-green-100 text-green-800';
    case 'Cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>

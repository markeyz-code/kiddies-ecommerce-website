<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
    <h1 class="text-3xl font-serif font-bold text-stone-900 mb-8">Checkout</h1>

    <div class="flex flex-col lg:flex-row gap-12">
      <!-- Checkout Form -->
      <div class="flex-1">
        <div v-if="!user" class="mb-6 bg-stone-50 p-4 rounded-lg border border-stone-200">
          <p class="text-sm text-stone-600">
            Already have an account? <NuxtLink to="/login?redirect=/checkout" class="font-medium text-emerald-600 hover:text-emerald-700">Log in</NuxtLink> for faster checkout.
          </p>
        </div>
        
        <div class="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
          <h2 class="text-xl font-bold mb-6">Shipping Details</h2>
          <form @submit.prevent="handleCheckout" class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-stone-700">First Name</label>
                <input v-model="customer.firstName" type="text" required class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 border" />
              </div>
              <div>
                <label class="block text-sm font-medium text-stone-700">Last Name</label>
                <input v-model="customer.lastName" type="text" required class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 border" />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-stone-700">Email Address</label>
              <input v-model="customer.email" type="email" required class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 border" />
            </div>

            <div>
              <label class="block text-sm font-medium text-stone-700">Street Address</label>
              <input v-model="customer.address" type="text" required class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 border" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-stone-700">Country</label>
                <select v-model="customer.country" required class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 border bg-white">
                  <option value="" disabled>Select Country</option>
                  <option v-for="country in countries" :key="country.isoCode" :value="country.name">{{ country.name }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-stone-700">State / City</label>
                <select v-model="customer.city" required :disabled="!customer.country" class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 border bg-white disabled:bg-stone-100 disabled:text-stone-400">
                  <option value="" disabled>Select State/City</option>
                  <option v-for="state in availableStates" :key="state.isoCode" :value="state.name">{{ state.name }}</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-stone-700">ZIP / Postal Code</label>
              <input v-model="customer.zipCode" type="text" class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 border" />
            </div>

            <div class="pt-6 border-t border-stone-200">
              <h3 class="text-lg font-medium text-stone-900 mb-4">Payment Method</h3>
              <div class="space-y-4">
                <div class="flex items-center">
                  <input id="paystack" v-model="paymentMethod" value="paystack" type="radio" class="h-4 w-4 text-emerald-600 border-stone-300 focus:ring-emerald-500" />
                  <label for="paystack" class="ml-3 block text-sm font-medium text-stone-700">
                    Pay with Card / Bank Transfer (Paystack)
                  </label>
                </div>
                <div class="flex items-center">
                  <input id="cash_on_delivery" v-model="paymentMethod" value="cash_on_delivery" type="radio" class="h-4 w-4 text-emerald-600 border-stone-300 focus:ring-emerald-500" />
                  <label for="cash_on_delivery" class="ml-3 block text-sm font-medium text-stone-700">
                    Cash on delivery
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" :disabled="loading" class="w-full bg-emerald-600 text-white font-medium py-4 rounded-md shadow-lg hover:bg-emerald-700 transition-colors mt-8 text-lg disabled:opacity-70">
              {{ loading ? 'Processing Order...' : 'Place Order' }}
            </button>
          </form>
        </div>
      </div>


      <!-- Order Summary -->
      <div class="w-full lg:w-96 flex-shrink-0">
        <div class="bg-stone-50 p-6 rounded-lg border border-stone-200 sticky top-24">
          <h2 class="text-lg font-bold text-stone-900 mb-4">Order Summary</h2>
          
          <div class="space-y-4 mb-6 border-b border-stone-200 pb-6">
            <div v-for="item in cart.items" :key="item.id" class="flex items-center gap-4">
              <div class="w-16 h-16 bg-stone-100 rounded flex-shrink-0 overflow-hidden">
                <img :src="item.product.imageUrls?.thumbnail || 'https://images.unsplash.com/photo-1519278409-1f56fc0e0db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 text-sm">
                <p class="font-medium truncate">{{ item.product.name }}</p>
                <p class="text-stone-500">Qty: {{ item.quantity }}</p>
              </div>
              <div class="font-medium text-sm">
                ₦{{ (item.product.basePrice * item.quantity).toFixed(2) }}
              </div>
            </div>
          </div>

          <!-- Coupon Section -->
          <div class="mb-6 border-b border-stone-200 pb-6">
            <div v-if="cart.appliedCoupon" class="flex items-center justify-between bg-emerald-50 text-emerald-700 px-4 py-3 rounded-md border border-emerald-100">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                <span class="text-sm font-bold">{{ cart.appliedCoupon.code }} Applied</span>
              </div>
              <button @click="cart.removeCoupon()" type="button" class="text-emerald-700 hover:text-emerald-900 text-sm font-medium">Remove</button>
            </div>
            <div v-else class="flex gap-2">
              <input v-model="couponCode" type="text" placeholder="Coupon code" class="flex-1 rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 border uppercase" />
              <button @click="applyCoupon" :disabled="!couponCode || applyingCoupon" type="button" class="bg-stone-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-stone-800 disabled:opacity-50">
                {{ applyingCoupon ? 'Applying...' : 'Apply' }}
              </button>
            </div>
          </div>

          <div class="space-y-3 text-sm text-stone-600 mb-6 border-b border-stone-200 pb-6">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span class="text-stone-900 font-medium">₦{{ cart.originalSubtotal?.toFixed(2) || cart.subtotal?.toFixed(2) }}</span>
            </div>
            <div v-if="cart.discountAmount > 0" class="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span class="font-medium">-₦{{ cart.discountAmount.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span class="text-stone-900 font-medium">₦10.00</span>
            </div>
            <div class="flex justify-between">
              <span>Tax (8%)</span>
              <span class="text-stone-900 font-medium">₦{{ (cart.subtotal * 0.08).toFixed(2) }}</span>
            </div>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="font-bold text-stone-900 text-lg">Total</span>
            <span class="font-bold text-2xl text-stone-900">₦{{ (cart.subtotal * 1.08 + 10).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '@/composables/core/useCart';
import { useOrders } from '@/composables/modules/orders/useOrders';
import { useAuth } from '@/composables/modules/auth/useAuth';
import { Country, State } from 'country-state-city';

const cart = useCart();
const router = useRouter();
const { checkout, loading } = useOrders();
const { user, fetchProfile } = useAuth();

const countries = ref(Country.getAllCountries());
const availableStates = computed(() => {
  const selectedCountry = countries.value.find(c => c.name === customer.value.country);
  if (!selectedCountry) return [];
  return State.getStatesOfCountry(selectedCountry.isoCode);
});

const customer = ref({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '', // We will use state/city here
  zipCode: '',
  country: 'Nigeria',
});

watch(() => customer.value.country, () => {
  customer.value.city = '';
});

const couponCode = ref('');
const applyingCoupon = ref(false);

const applyCoupon = async () => {
  if (!couponCode.value) return;
  applyingCoupon.value = true;
  await cart.applyCoupon(couponCode.value);
  applyingCoupon.value = false;
  couponCode.value = '';
};

const paymentMethod = ref('paystack');
const config = useRuntimeConfig();

onMounted(async () => {
  if (!cart.items || cart.items.length === 0) {
    router.push('/cart');
  }
  await fetchProfile();
  if (user.value) {
    customer.value.firstName = user.value.firstName || '';
    customer.value.lastName = user.value.lastName || '';
    customer.value.email = user.value.email || '';
  }
});

const handleCheckout = async () => {
  const result = await checkout(customer.value, paymentMethod.value);
  
  if (result?.success && paymentMethod.value === 'paystack' && result.paystack?.authorization_url) {
    // Redirect to Paystack's hosted payment page generated by the backend
    cart.clearCart();
    window.location.href = result.paystack.authorization_url;
  } else if (result?.success && paymentMethod.value !== 'paystack') {
    cart.clearCart();
    router.push(`/checkout-success?orderNumber=${result.order.orderNumber}`);
  }
};
</script>

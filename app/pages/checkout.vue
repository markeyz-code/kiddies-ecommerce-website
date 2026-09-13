<template>
  <div class="bg-amber-50/20 min-h-screen pb-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 class="text-2xl md:text-3xl font-serif font-black text-stone-800 mb-8">Checkout 📦</h1>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Checkout Form -->
        <div class="flex-1">
          <div v-if="!user" class="mb-6 bg-[#e6f0ff] p-4 md:p-5 rounded-2xl border border-[#2a4a7f] flex items-center gap-3">
            <span class="text-2xl">👋</span>
            <p class="text-stone-700 font-medium text-sm">
              Already have an account? <NuxtLink to="/login?redirect=/checkout" class="font-black text-[#1a365d] hover:text-[#112543] hover:underline">Log in</NuxtLink> for faster checkout.
            </p>
          </div>
          
          <div class="bg-white p-6 md:p-8 rounded-[2.5rem] border border-stone-200 relative overflow-hidden">
            <!-- Decor -->
            <div class="absolute -top-10 -right-10 text-8xl opacity-10 transform rotate-12">🏠</div>

            <h2 class="text-xl font-black text-stone-800 mb-6 relative z-10">Where are we shipping?</h2>
            <form @submit.prevent="handleCheckout" class="space-y-5 relative z-10">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <CustomInput v-model="customer.firstName" label="First Name" required />
                </div>
                <div>
                  <CustomInput v-model="customer.lastName" label="Last Name" required />
                </div>
              </div>
              
              <div>
                <CustomInput v-model="customer.email" type="email" label="Email Address" required />
              </div>

              <div>
                <CustomInput v-model="customer.address" label="Street Address" required />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <CustomSelect v-model="customer.country" label="Country" :options="countryOptions" placeholder="Select Country" required />
                </div>
                <div>
                  <CustomSelect v-model="customer.state" label="State" :options="stateOptions" :disabled="!customer.country" placeholder="Select State" required />
                </div>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <CustomSelect v-if="cityOptions.length > 0" v-model="customer.city" label="City" :options="cityOptions" :disabled="!customer.state" placeholder="Select City" required />
                  <CustomInput v-else v-model="customer.city" label="City" placeholder="Enter City" required />
                </div>
                <div>
                  <CustomInput v-model="customer.zipCode" label="ZIP / Postal Code" required />
                </div>
              </div>

              <div class="pt-6 mt-6 border-t-2 border-stone-100">
                <h3 class="text-lg font-black text-stone-800 mb-4">How would you like to pay?</h3>
                <div class="space-y-3">
                  <label class="flex items-center p-3.5 border border-stone-200 rounded-2xl cursor-pointer transition-all duration-300" :class="paymentMethod === 'paystack' ? 'border-[#1a365d] bg-[#e6f0ff]' : 'border-stone-200 hover:border-[#2a4a7f] hover:bg-stone-50'">
                    <input v-model="paymentMethod" value="paystack" type="radio" class="w-5 h-5 text-[#1a365d] border-stone-300 focus:ring-[#1a365d] focus:ring-2" />
                    <span class="ml-3 font-bold text-stone-800 text-sm">Pay with Card / Bank Transfer (Paystack) 💳</span>
                  </label>
                  <label class="flex items-center p-3.5 border border-stone-200 rounded-2xl cursor-pointer transition-all duration-300" :class="paymentMethod === 'stripe' ? 'border-[#635BFF] bg-[#635BFF]/10' : 'border-stone-200 hover:border-[#635BFF] hover:bg-stone-50'">
                    <input v-model="paymentMethod" value="stripe" type="radio" class="w-5 h-5 text-[#635BFF] border-stone-300 focus:ring-[#635BFF] focus:ring-2" />
                    <span class="ml-3 font-bold text-stone-800 text-sm">Pay with Stripe 💳</span>
                  </label>
                  <label class="flex items-center p-3.5 border border-stone-200 rounded-2xl cursor-pointer transition-all duration-300" :class="paymentMethod === 'cash_on_delivery' ? 'border-emerald-400 bg-emerald-50' : 'border-stone-200 hover:border-emerald-200 hover:bg-stone-50'">
                    <input v-model="paymentMethod" value="cash_on_delivery" type="radio" class="w-5 h-5 text-emerald-500 border-stone-300 focus:ring-[#1a365d] focus:ring-2" />
                    <span class="ml-3 font-bold text-stone-800 text-sm">Cash on delivery 💵</span>
                  </label>
                </div>
              </div>

              <button type="submit" :disabled="loading" class="w-full bg-[#1a365d] text-white font-black py-3.5 rounded-full hover:bg-[#112a4a] transition-all duration-300 mt-8 text-base disabled:opacity-50 tracking-wide">
                {{ loading ? 'Processing...' : 'Place Order ✨' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="w-full lg:w-80 flex-shrink-0">
          <div class="bg-[#e6f0ff]/50 p-6 rounded-[2rem] border border-[#2a4a7f] sticky top-24">
            <h2 class="text-xl font-black text-stone-800 mb-5 flex items-center gap-2">
              Order Summary 🧾
            </h2>
            
            <div class="space-y-3 mb-6 border-b border-[#2a4a7f] pb-6">
              <div v-for="item in cart.items" :key="item.id" class="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-stone-200">
                <div class="w-14 h-14 bg-amber-50 rounded-xl flex-shrink-0 overflow-hidden border border-stone-100">
                  <img :src="getItemImage(item)" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 text-xs min-w-0">
                  <p class="font-bold text-stone-800 truncate">{{ item.product.name }}</p>
                  <p class="text-stone-500 font-medium">Qty: {{ item.quantity }}</p>
                  <p v-if="item.options?.size" class="text-stone-400 text-[10px]">Size: {{ item.options.size }}</p>
                </div>
                <div class="font-black text-stone-900 text-right text-xs">
                  ${{ getItemTotal(item).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Coupon Section -->
            <div class="mb-6 border-b border-[#2a4a7f] pb-6">
              <div v-if="cart.appliedCoupon" class="flex items-center justify-between bg-emerald-100 text-emerald-800 px-3.5 py-2.5 rounded-xl border border-emerald-200 text-xs">
                <div class="flex items-center font-bold">
                  <span class="mr-1.5 text-base">🎉</span>
                  {{ cart.appliedCoupon.code }} Applied!
                </div>
                <button @click="cart.removeCoupon()" type="button" class="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 hover:bg-emerald-300 hover:text-emerald-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
              <div v-else class="flex gap-2">
                <input v-model="couponCode" type="text" placeholder="Coupon code 🎟️" class="flex-1 rounded-full border border-stone-200 focus:border-[#1a365d] focus:ring-4 focus:ring-sky-100 py-2.5 px-4 bg-white text-xs font-medium transition-all uppercase placeholder:normal-case" />
                <button @click="applyCoupon" :disabled="!couponCode || applyingCoupon" type="button" class="bg-[#1a365d] text-white px-4 py-2.5 rounded-full text-xs font-black hover:bg-[#112a4a] transition-all disabled:opacity-50 tracking-wide">
                  {{ applyingCoupon ? '...' : 'Apply' }}
                </button>
              </div>
            </div>

            <div class="space-y-3 text-stone-600 font-medium mb-6 border-b border-[#2a4a7f] pb-6 text-sm">
              <div class="flex justify-between items-center">
                <span>Subtotal</span>
                <span class="text-stone-900 font-bold">${{ (cart.subtotal || 0).toFixed(2) }}</span>
              </div>
              <div v-if="cart.discountAmount > 0" class="flex justify-between items-center text-emerald-600">
                <span>Discount</span>
                <span class="font-bold">-${{ cart.discountAmount.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Shipping</span>
                <span class="text-stone-900 font-bold">${{ shippingFee.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Tax (8%)</span>
                <span class="text-stone-900 font-bold">${{ tax.toFixed(2) }}</span>
              </div>
            </div>
            
            <div class="flex justify-between items-end">
              <span class="font-bold text-stone-800 text-lg">Total</span>
              <span class="font-black text-3xl text-stone-900 text-right drop-shadow-sm">${{ orderTotal.toFixed(2) }}</span>
            </div>
            <div class="mt-8 flex items-center justify-center gap-3 text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              <span class="text-sm font-bold">Encrypted & Secure</span>
            </div>
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
import { Country, State, City } from 'country-state-city';

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
const availableCities = computed(() => {
  const selectedCountry = countries.value.find(c => c.name === customer.value.country);
  const selectedState = availableStates.value.find(s => s.name === customer.value.state);
  if (!selectedCountry || !selectedState) return [];
  return City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
});

const countryOptions = computed(() => countries.value.map(c => ({ label: c.name, value: c.name })));
const stateOptions = computed(() => availableStates.value.map(s => ({ label: s.name, value: s.name })));
const cityOptions = computed(() => availableCities.value.map(c => ({ label: c.name, value: c.name })));

const customer = ref({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  state: '',
  city: '',
  zipCode: '',
  country: 'United States',
});

watch(() => customer.value.country, () => {
  customer.value.state = '';
  customer.value.city = '';
});

watch(() => customer.value.state, () => {
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

const shippingFee = computed(() => {
  return (cart.subtotal || 0) >= 30 ? 0 : 5.95;
});

const tax = computed(() => {
  return Math.round((cart.subtotal || 0) * 0.08 * 100) / 100;
});

const orderTotal = computed(() => {
  return Math.round(((cart.subtotal || 0) + shippingFee.value + tax.value) * 100) / 100;
});

const getItemImage = (item: any) => {
  return item?.product?.image 
    || item?.product?.imageUrls?.medium 
    || item?.product?.imageUrls?.thumbnail
    || item?.product?.imageUrls?.original
    || '/img/placeholder.jpg';
};

const getItemTotal = (item: any) => {
  const price = item?.product?.basePrice || item?.product?.price || 0;
  return price * item.quantity;
};

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
  
  if (result?.success) {
    cart.clearCart();
    if (paymentMethod.value === 'paystack' && result.paystack?.authorization_url) {
      window.location.href = result.paystack.authorization_url;
    } else if (paymentMethod.value === 'stripe' && result.stripe?.url) {
      window.location.href = result.stripe.url;
    } else {
      router.push(`/checkout-success?orderNumber=${result.order.orderNumber}`);
    }
  }
};
</script>

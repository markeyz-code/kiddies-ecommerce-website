<template>
  <div class="min-h-screen bg-cream-50 pb-20">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div class="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="eyebrow mb-2">Step 2 of 3</p>
          <h1 class="section-title">Checkout</h1>
        </div>
        <CheckoutSteps :step="2" />
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Checkout Form -->
        <div class="flex-1">
          <div v-if="!user" class="mb-6 flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 md:p-5">
            <p class="text-sm font-medium text-brand-600">
              Already have an account? <NuxtLink to="/login?redirect=/checkout" class="font-black text-brand-900 hover:text-[#112543] hover:underline">Log in</NuxtLink> for faster checkout.
            </p>
          </div>
          
          <div class="card-surface relative overflow-hidden p-5 sm:p-8">
            <h2 class="relative z-10 mb-6 font-display text-xl font-semibold text-brand-900">Shipping details</h2>
            <form @submit.prevent="handleCheckout" class="space-y-5 relative z-10">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <CustomInput id="firstName" v-model="customer.firstName" label="First Name" required />
                </div>
                <div>
                  <CustomInput id="lastName" v-model="customer.lastName" label="Last Name" required />
                </div>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <CustomInput id="email" v-model="customer.email" type="email" label="Email Address" required />
                <CustomInput id="phoneNumber" v-model="customer.phoneNumber" type="tel" label="Phone Number (optional)" placeholder="+1 555 000 0000" />
              </div>

              <div>
                <CustomInput id="address" v-model="customer.address" label="Street Address" required />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <CustomSelect id="country" v-model="customer.country" label="Country" :options="countryOptions" placeholder="Select Country" required />
                </div>
                <div>
                  <CustomSelect id="state" v-model="customer.state" label="State / Region" :options="stateOptions" :disabled="!customer.country" :required="stateOptions.length > 0" placeholder="Select State / Region" />
                </div>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <CustomSelect id="city" v-if="cityOptions.length > 0" v-model="customer.city" label="City" :options="cityOptions" :disabled="!customer.state" placeholder="Select City" required />
                  <CustomInput id="city" v-else v-model="customer.city" label="City" placeholder="Enter City" required />
                </div>
                <div>
                  <CustomInput id="zipCode" v-model="customer.zipCode" label="ZIP / Postal Code" required />
                </div>
              </div>

              <div class="pt-6 mt-6 border-t-2 border-stone-100">
                <h3 class="mb-4 font-display text-lg font-semibold text-brand-900">Payment method</h3>
                <div class="space-y-3">
                  <label class="flex cursor-pointer items-center rounded-2xl border border-cream-200 bg-white p-4 transition-all duration-200 hover:border-brand-300" :class="paymentMethod === 'paystack' ? 'border-brand-900 bg-brand-50' : 'border-cream-200 hover:border-brand-300'">
                    <input v-model="paymentMethod" value="paystack" type="radio" class="w-5 h-5 text-brand-900 border-stone-300 focus:ring-brand-300 focus:ring-2" />
                    <span class="ml-3 font-bold text-stone-800 text-sm">Pay with card or bank transfer (Paystack)</span>
                  </label>
                  <label class="flex cursor-pointer items-center rounded-2xl border border-cream-200 bg-white p-4 transition-all duration-200 hover:border-brand-300" :class="paymentMethod === 'stripe' ? 'border-[#635BFF] bg-[#635BFF]/5' : 'border-cream-200 hover:border-[#635BFF]'">
                    <input v-model="paymentMethod" value="stripe" type="radio" class="w-5 h-5 text-[#635BFF] border-stone-300 focus:ring-[#635BFF] focus:ring-2" />
                    <span class="ml-3 font-bold text-stone-800 text-sm">Pay with Stripe</span>
                  </label>
                  <label class="flex cursor-pointer items-center rounded-2xl border border-cream-200 bg-white p-4 transition-all duration-200 hover:border-brand-300" :class="paymentMethod === 'cash_on_delivery' ? 'border-emerald-400 bg-emerald-50' : 'border-cream-200 hover:border-emerald-300'">
                    <input v-model="paymentMethod" value="cash_on_delivery" type="radio" class="w-5 h-5 text-emerald-500 border-stone-300 focus:ring-brand-300 focus:ring-2" />
                    <span class="ml-3 font-bold text-stone-800 text-sm">Cash on delivery</span>
                  </label>
                </div>
              </div>

              <button type="submit" :disabled="loading" class="btn-primary mt-8 w-full">
                {{ loading ? 'Processing…' : 'Place order' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="w-full lg:w-80 flex-shrink-0">
          <div class="card-surface sticky top-24 p-5 sm:p-6">
            <h2 class="mb-5 font-display text-xl font-semibold text-brand-900">Order summary</h2>
            
            <div class="space-y-3 mb-6 border-b border-brand-200 pb-6">
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
                  {{ currencySymbol }}{{ getItemTotal(item).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Coupon Section -->
            <div class="mb-6 border-b border-brand-200 pb-6">
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
                <input v-model="couponCode" type="text" placeholder="Coupon code" class="flex-1 rounded-full border border-stone-200 focus:border-brand-900 focus:ring-4 focus:ring-sky-100 py-2.5 px-4 bg-white text-xs font-medium transition-all uppercase placeholder:normal-case" />
                <button @click="applyCoupon" :disabled="!couponCode || applyingCoupon" type="button" class="bg-brand-900 text-white px-4 py-2.5 rounded-full text-xs font-black hover:bg-brand-800 transition-all disabled:opacity-50 tracking-wide">
                  {{ applyingCoupon ? '...' : 'Apply' }}
                </button>
              </div>
            </div>

            <div class="space-y-3 text-stone-600 font-medium mb-6 border-b border-brand-200 pb-6 text-sm">
              <div v-if="isNigeria" class="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-[11px] font-bold text-emerald-800 flex items-center gap-2">
                <span>🇳🇬</span>
                <span>Location set to Nigeria — paying in Naira (₦)</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Subtotal</span>
                <span class="text-stone-900 font-bold">{{ currencySymbol }}{{ formatAmount(subtotalConverted) }}</span>
              </div>
              <div v-if="cart.discountAmount > 0" class="flex justify-between items-center text-emerald-600">
                <span>Discount</span>
                <span class="font-bold">-{{ currencySymbol }}{{ formatAmount(discountConverted) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Shipping</span>
                <span class="text-stone-900 font-bold">{{ currencySymbol }}{{ formatAmount(shippingFee) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Tax ({{ taxRate }}%)</span>
                <span class="text-stone-900 font-bold">{{ currencySymbol }}{{ formatAmount(tax) }}</span>
              </div>
            </div>
            
            <div class="flex justify-between items-end">
              <div>
                <span class="font-bold text-stone-800 text-lg block">Total</span>
                <span v-if="isNigeria" class="text-[10px] font-bold text-emerald-700 uppercase">NGN (Naira)</span>
              </div>
              <span class="font-black text-3xl text-stone-900 text-right drop-shadow-sm">{{ currencySymbol }}{{ formatAmount(orderTotal) }}</span>
            </div>
            <div class="mt-8 flex items-center justify-center gap-3 text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              <span class="text-sm font-bold">Encrypted & secure</span>
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
import { settingsApi } from '@/api_factory/modules/settings';
import { Country, State, City } from 'country-state-city';

const cart = useCart();
const router = useRouter();
const { checkout, loading } = useOrders();
const { user, fetchProfile } = useAuth();

const storeSettings = ref<any>({
  currency: 'USD',
  shippingFee: 5.95,
  freeShippingThreshold: 30,
  taxRate: 8
});

const isNigeria = computed(() => {
  const c = String(customer.value.country || '').toLowerCase();
  return c.includes('nigeria') || c === 'ng';
});

const currentCurrency = computed(() => {
  if (isNigeria.value) return 'NGN';
  return storeSettings.value.currency || 'USD';
});

const NGN_RATE = 1500;
const rateMultiplier = computed(() => {
  return currentCurrency.value === 'NGN' ? NGN_RATE : 1;
});

const currencySymbol = computed(() => {
  if (currentCurrency.value === 'NGN') return '₦';
  const symbols: Record<string, string> = { USD: '$', NGN: '₦', EUR: '€', GBP: '£', CAD: 'C$' };
  return symbols[currentCurrency.value] || '$';
});

const formatAmount = (val: number) => {
  return Number(val || 0).toLocaleString('en-US', {
    minimumFractionDigits: isNigeria.value ? 0 : 2,
    maximumFractionDigits: 2
  });
};

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
  phoneNumber: ''
});

watch(() => customer.value.country, (newCountry) => {
  customer.value.state = '';
  customer.value.city = '';
  if (newCountry && (newCountry.toLowerCase().includes('nigeria') || newCountry.toUpperCase() === 'NG')) {
    paymentMethod.value = 'paystack';
  }
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
const taxRate = computed(() => Number(storeSettings.value.taxRate) || 0);

const subtotalConverted = computed(() => Math.round((cart.subtotal || 0) * rateMultiplier.value * 100) / 100);
const discountConverted = computed(() => Math.round((cart.discountAmount || 0) * rateMultiplier.value * 100) / 100);

const shippingFee = computed(() => {
  const subtotal = cart.subtotal || 0;
  const threshold = Number(storeSettings.value.freeShippingThreshold) || 0;
  if (threshold > 0 && subtotal >= threshold) return 0;
  const baseShipping = Number(storeSettings.value.shippingFee) || 0;
  return Math.round(baseShipping * rateMultiplier.value * 100) / 100;
});

const tax = computed(() => {
  const discounted = Math.max(0, subtotalConverted.value - discountConverted.value);
  return Math.round(discounted * (taxRate.value / 100) * 100) / 100;
});

const orderTotal = computed(() => {
  const discounted = Math.max(0, subtotalConverted.value - discountConverted.value);
  return Math.round((discounted + shippingFee.value + tax.value) * 100) / 100;
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
    return;
  }

  try {
    const { data } = await settingsApi.getGeneral();
    if (data) storeSettings.value = { ...storeSettings.value, ...data };
  } catch {}

  await fetchProfile();
  if (user.value) {
    customer.value.firstName = user.value.firstName || '';
    customer.value.lastName = user.value.lastName || '';
    customer.value.email = user.value.email || '';
    customer.value.phoneNumber = user.value.phoneNumber || '';
    const defaultAddress = user.value.addresses?.find((a: any) => a.isDefault) || user.value.addresses?.[0];
    if (defaultAddress) {
      customer.value.address = defaultAddress.street || '';
      customer.value.city = defaultAddress.city || '';
      customer.value.state = defaultAddress.state || '';
      customer.value.zipCode = defaultAddress.zipCode || '';
      customer.value.country = defaultAddress.country || customer.value.country;
    }
  }
});

const handleCheckout = async () => {
  if (!customer.value.firstName || !customer.value.lastName || !customer.value.email || !customer.value.address) {
    return;
  }

  const result = await checkout(customer.value, paymentMethod.value, {
    currency: currentCurrency.value,
    subtotal: subtotalConverted.value,
    shippingFee: shippingFee.value,
    tax: tax.value,
    totalAmount: orderTotal.value
  });

  if (result?.success) {
    if (result.redirect) {
      const url = result.paystack?.authorization_url || result.stripe?.url;
      if (url) {
        window.location.href = url;
        return;
      }
    }
    if (result.order?.orderNumber) {
      router.push(`/checkout-success?orderNumber=${result.order.orderNumber}`);
    }
  }
};
</script>

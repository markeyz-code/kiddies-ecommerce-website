<template>
  <div class="min-h-[80vh] bg-cream-50 px-4 py-10 sm:py-14">
    <div class="mx-auto mb-8 max-w-2xl"><CheckoutSteps :step="3" /></div>
    <div class="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-cream-200 bg-white p-6 text-center shadow-[0_12px_40px_rgba(26,54,93,0.08)] sm:p-10 md:p-12">

      <div class="relative z-10">
        <div class="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-cream-100 text-4xl shadow-inner">
          ✨
        </div>

        <h1 class="mb-3 font-display text-3xl font-semibold leading-tight text-brand-900 sm:text-4xl">
          {{ order?.paymentStatus === 'Paid' ? 'Order confirmed' : 'Order received' }}
        </h1>
        <p class="mx-auto mb-6 max-w-lg text-sm font-medium leading-relaxed text-brand-500 md:text-base">
          {{ order?.paymentStatus === 'Paid'
            ? "Thank you for your purchase! We've received your payment and are getting your order ready to ship."
            : "Thank you for your order! Complete payment below if needed, and we'll get your outfits ready to ship." }}
        </p>

        <div class="my-8 space-y-4 rounded-2xl border border-cream-200 bg-cream-50 p-5 text-left">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-xs font-bold text-stone-500 mb-1 uppercase tracking-widest">Order Number</p>
              <p class="text-xl font-black text-stone-800 tracking-wide">{{ orderNumber || 'PENDING' }}</p>
            </div>
            <span v-if="order" class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider" :class="statusClass(order.status)">
              {{ order.status }}
            </span>
          </div>

          <div v-if="order" class="pt-4 border-t-2 border-brand-200 space-y-3 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-stone-600 font-medium">Payment status</span>
              <span class="font-bold" :class="order.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'">{{ order.paymentStatus }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-stone-600 font-medium">Payment method</span>
              <span class="font-bold text-stone-800 capitalize">{{ paymentLabel(order.paymentMethod) }}</span>
            </div>
            <div v-if="order.discountAmount > 0" class="flex justify-between items-center">
              <span class="text-stone-600 font-medium">Discount {{ order.couponCode ? `(${order.couponCode})` : '' }}</span>
              <span class="font-bold text-emerald-600">-{{ currencySymbol }}{{ (order.discountAmount || 0).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-stone-600 font-medium">Shipping</span>
              <span class="font-bold text-stone-800">{{ (order.shippingFee || 0) === 0 ? 'Free' : currencySymbol + (order.shippingFee || 0).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-stone-600 font-medium">Tax</span>
              <span class="font-bold text-stone-800">{{ currencySymbol }}{{ (order.tax || 0).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-stone-600 font-medium">Total</span>
              <span class="font-black text-stone-900">{{ currencySymbol }}{{ (order.totalAmount || 0).toFixed(2) }}</span>
            </div>
            <div v-if="order.customer" class="flex justify-between items-start">
              <span class="text-stone-600 font-medium">Shipping to</span>
              <span class="font-medium text-stone-800 text-right">
                {{ order.customer?.address }}<br />
                {{ order.customer?.city }}, {{ order.customer?.state }} {{ order.customer?.zipCode }}
              </span>
            </div>
          </div>

          <div v-if="order && order.items?.length" class="pt-4 border-t-2 border-brand-200 space-y-2">
            <p class="text-xs font-bold text-stone-500 uppercase tracking-widest">Items</p>
            <div v-for="item in order.items" :key="item._id || item.sku" class="flex justify-between items-center text-sm">
              <span class="text-stone-700 font-medium pr-3 line-clamp-2">{{ item.name }} <span class="text-stone-400">× {{ item.quantity }}</span></span>
              <span class="font-bold text-stone-800">{{ currencySymbol }}{{ ((item.price || 0) * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <div v-if="verifyError" class="mb-6 text-sm font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          {{ verifyError }}
        </div>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink to="/products" class="btn-primary">
            Continue shopping
          </NuxtLink>
          <NuxtLink :to="order ? `/track?email=${encodeURIComponent(order.customer?.email || '')}&orderNumber=${orderNumber}` : '/track'" class="btn-secondary">
            Track order
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ robots: 'noindex, nofollow' });

import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ordersApi } from '@/api_factory/modules/orders';
import { useCart } from '@/composables/core/useCart';

const route = useRoute();
const cart = useCart();

const orderNumber = computed(() => String(route.query.orderNumber || ''));
const order = ref(null);
const verifyError = ref('');

const currencySymbol = computed(() => {
  const symbols = { USD: '$', NGN: '₦', EUR: '€', GBP: '£', CAD: 'C$' };
  return symbols[order.value?.currency] || '$';
});

const statusClass = (status) => {
  switch (status) {
    case 'Delivered': return 'bg-emerald-100 text-emerald-700';
    case 'Shipped': return 'bg-blue-100 text-blue-700';
    case 'Cancelled': return 'bg-red-100 text-red-700';
    case 'Processing': return 'bg-indigo-100 text-indigo-700';
    default: return 'bg-amber-100 text-amber-700';
  }
};

const paymentLabel = (method) => {
  const labels = {
    paystack: 'Paystack',
    stripe: 'Stripe',
    cash_on_delivery: 'Cash on delivery',
    check: 'Check'
  };
  return labels[method] || method;
};

const loadOrder = async () => {
  if (!orderNumber.value) return;
  try {
    const storedEmail = typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('last_order_email') || ''
      : '';
    const { data } = await ordersApi.lookupOrder(
      orderNumber.value,
      storedEmail || undefined,
      route.query.reference ? String(route.query.reference) : undefined
    );
    order.value = data;
  } catch {
    verifyError.value = 'We could not load this order. You can still track it from the Track Order page.';
  }
};

onMounted(async () => {
  cart.clearCart();
  cart.removeCoupon();

  await loadOrder();

  const reference = route.query.reference
    ? String(route.query.reference)
    : (order.value?.paymentReference || '');
  const shouldVerify =
    order.value &&
    order.value.paymentStatus !== 'Paid' &&
    order.value.paymentMethod !== 'cash_on_delivery' &&
    !!reference;

  if (shouldVerify) {
    try {
      await ordersApi.verifyPayment({
        orderNumber: orderNumber.value,
        reference
      });
      await loadOrder();
    } catch (error) {
      verifyError.value = error?.response?.data?.message || 'We are still waiting for the payment provider to confirm this transaction.';
    }
  }
});
</script>

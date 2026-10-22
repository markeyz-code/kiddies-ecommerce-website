<template>
  <ol class="flex items-center justify-center gap-2 sm:gap-4" aria-label="Checkout progress">
    <li v-for="(item, index) in steps" :key="item.label" class="flex items-center gap-2 sm:gap-3">
      <component
        :is="item.to && step > item.number ? 'NuxtLink' : 'div'"
        :to="item.to && step > item.number ? item.to : undefined"
        class="flex items-center gap-2"
      >
        <span
          class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors"
          :class="step > item.number
            ? 'bg-brand-900 text-white'
            : step === item.number
              ? 'bg-coral-500 text-white ring-4 ring-coral-100'
              : 'bg-cream-200 text-brand-400'"
        >
          <svg v-if="step > item.number" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
          <span v-else>{{ item.number }}</span>
        </span>
        <span
          class="text-[11px] font-bold uppercase tracking-[0.12em]"
          :class="step >= item.number ? 'text-brand-900' : 'text-brand-300'"
        >
          {{ item.label }}
        </span>
      </component>
      <span v-if="index < steps.length - 1" class="mx-1 h-px w-6 bg-cream-300 sm:w-12" aria-hidden="true"></span>
    </li>
  </ol>
</template>

<script setup>
defineProps({
  step: { type: Number, default: 1 }
});

const steps = [
  { number: 1, label: 'Bag', to: '/cart' },
  { number: 2, label: 'Details', to: '/checkout' },
  { number: 3, label: 'Confirmation' }
];
</script>

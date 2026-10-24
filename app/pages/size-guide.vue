<template>
  <div class="min-h-screen bg-cream-50">
    <div class="container-site py-10 sm:py-14">
      <div class="mx-auto max-w-4xl">
        <nav class="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-400">
          <NuxtLink to="/" class="hover:text-brand-900">Home</NuxtLink>
          <span>/</span>
          <span class="text-brand-700">Size guide</span>
        </nav>

        <p class="eyebrow mb-2">Fit &amp; sizing</p>
        <h1 class="section-title">Find the right size</h1>
        <p class="section-subtitle mt-3 max-w-2xl">Little ones grow fast. Measure once, choose with confidence, and size up if you are between sizes.</p>

        <div class="mt-8 overflow-hidden rounded-3xl border border-cream-200 bg-white">
          <div class="flex gap-1 overflow-x-auto border-b border-cream-200 p-3">
            <button
              v-for="group in groups"
              :key="group.key"
              @click="active = group.key"
              class="flex-shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors"
              :class="active === group.key ? 'bg-brand-900 text-white' : 'bg-cream-100 text-brand-600 hover:bg-cream-200'"
            >
              {{ group.label }}
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full min-w-[520px] text-sm">
              <thead class="bg-cream-50 text-left text-[11px] uppercase tracking-wider text-brand-500">
                <tr>
                  <th class="px-4 py-3 font-bold">Size</th>
                  <th class="px-4 py-3 font-bold">Age</th>
                  <th class="px-4 py-3 font-bold">Height</th>
                  <th class="px-4 py-3 font-bold">Chest</th>
                  <th class="px-4 py-3 font-bold">Waist</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-cream-100">
                <tr v-for="row in currentGroup.rows" :key="row.size" class="text-brand-700">
                  <td class="px-4 py-3 font-bold text-brand-900">{{ row.size }}</td>
                  <td class="px-4 py-3">{{ row.age }}</td>
                  <td class="px-4 py-3">{{ row.height }}</td>
                  <td class="px-4 py-3">{{ row.chest }}</td>
                  <td class="px-4 py-3">{{ row.waist }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <div class="rounded-2xl border border-cream-200 bg-white p-5">
            <h2 class="font-display text-lg font-semibold text-brand-900">How to measure</h2>
            <p class="mt-2 text-sm leading-relaxed text-brand-500">Use a soft tape measure against the body, not over clothes. Keep it snug but not tight.</p>
          </div>
          <div class="rounded-2xl border border-cream-200 bg-white p-5">
            <h2 class="font-display text-lg font-semibold text-brand-900">Between sizes?</h2>
            <p class="mt-2 text-sm leading-relaxed text-brand-500">Size up for extra room to grow and layer. Our styles are designed with movement in mind.</p>
          </div>
          <div class="rounded-2xl border border-cream-200 bg-white p-5">
            <h2 class="font-display text-lg font-semibold text-brand-900">Need help?</h2>
            <p class="mt-2 text-sm leading-relaxed text-brand-500">Our team can help with fit questions. <NuxtLink to="/contact" class="font-bold text-coral-600 underline underline-offset-4">Contact us</NuxtLink>.</p>
          </div>
        </div>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <NuxtLink to="/products" class="btn-primary">Shop with confidence</NuxtLink>
          <NuxtLink to="/shipping" class="btn-secondary">Shipping &amp; returns</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

useSeoMeta({
  title: 'Kids Size Guide',
  description: 'Find the right fit for your little one with the JasmarKids size guide, including age, height, chest and waist measurements.'
});

const active = ref('baby');

const groups = [
  {
    key: 'baby',
    label: 'Baby (0–18m)',
    rows: [
      { size: '0–3M', age: '0–3 months', height: '50–60 cm', chest: '40–43 cm', waist: '38–41 cm' },
      { size: '3–6M', age: '3–6 months', height: '60–68 cm', chest: '43–45 cm', waist: '41–44 cm' },
      { size: '6–12M', age: '6–12 months', height: '68–76 cm', chest: '45–47 cm', waist: '44–46 cm' },
      { size: '12–18M', age: '12–18 months', height: '76–84 cm', chest: '47–50 cm', waist: '46–48 cm' }
    ]
  },
  {
    key: 'toddler',
    label: 'Toddler (2–5y)',
    rows: [
      { size: '2T', age: '2 years', height: '88–94 cm', chest: '51–53 cm', waist: '50–51 cm' },
      { size: '3T', age: '3 years', height: '94–100 cm', chest: '53–55 cm', waist: '51–52 cm' },
      { size: '4T', age: '4 years', height: '100–106 cm', chest: '55–57 cm', waist: '52–53 cm' },
      { size: '5T', age: '5 years', height: '106–112 cm', chest: '57–59 cm', waist: '53–54 cm' }
    ]
  },
  {
    key: 'girls',
    label: 'Girls (6–16y)',
    rows: [
      { size: '6Y', age: '6 years', height: '114–120 cm', chest: '60–63 cm', waist: '55–57 cm' },
      { size: '7–8Y', age: '7–8 years', height: '122–130 cm', chest: '64–67 cm', waist: '57–60 cm' },
      { size: '9–10Y', age: '9–10 years', height: '132–140 cm', chest: '68–72 cm', waist: '60–63 cm' },
      { size: '11–12Y', age: '11–12 years', height: '142–152 cm', chest: '73–78 cm', waist: '63–66 cm' },
      { size: '13–14Y', age: '13–14 years', height: '154–160 cm', chest: '79–84 cm', waist: '66–69 cm' },
      { size: '15–16Y', age: '15–16 years', height: '162–168 cm', chest: '85–90 cm', waist: '70–73 cm' }
    ]
  },
  {
    key: 'boys',
    label: 'Boys (6–16y)',
    rows: [
      { size: '6Y', age: '6 years', height: '114–120 cm', chest: '61–64 cm', waist: '56–58 cm' },
      { size: '7–8Y', age: '7–8 years', height: '122–130 cm', chest: '65–69 cm', waist: '58–61 cm' },
      { size: '9–10Y', age: '9–10 years', height: '132–140 cm', chest: '70–74 cm', waist: '61–64 cm' },
      { size: '11–12Y', age: '11–12 years', height: '142–152 cm', chest: '75–80 cm', waist: '64–68 cm' },
      { size: '13–14Y', age: '13–14 years', height: '154–162 cm', chest: '81–86 cm', waist: '68–72 cm' },
      { size: '15–16Y', age: '15–16 years', height: '164–172 cm', chest: '87–93 cm', waist: '72–76 cm' }
    ]
  }
];

const currentGroup = computed(() => groups.find((g) => g.key === active.value) || groups[0]);
</script>

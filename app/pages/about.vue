<template>
  <div class="min-h-screen bg-cream-50">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-brand-900">
      <div class="absolute inset-0">
        <img src="/img/hero_fall_1_1789165261484.jpg" alt="Children playing outdoors" class="h-full w-full object-cover opacity-45" />
        <div class="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/60 to-brand-950/20"></div>
      </div>
      <div class="container-site relative py-20 sm:py-28">
        <p class="eyebrow mb-3 text-coral-200">Our story</p>
        <h1 class="max-w-2xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          Clothes for the way little ones actually live.
        </h1>
        <p class="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
          JasmarKids began with a simple idea: childhood should be comfortable, colourful and full of movement. We make thoughtful pieces that keep up.
        </p>
      </div>
    </section>

    <!-- Story -->
    <section class="container-site py-14 sm:py-20">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div class="overflow-hidden rounded-3xl">
          <img src="/img/category_baby_1789165311089.jpg" alt="Baby wearing a soft knit outfit" class="h-full w-full object-cover" loading="lazy" />
        </div>
        <div>
          <p class="eyebrow mb-2">Made with care</p>
          <h2 class="section-title">Soft where it matters, strong where it counts.</h2>
          <div class="mt-5 space-y-4 text-sm leading-relaxed text-brand-500 sm:text-base">
            <p>Every collection starts with fabric. We choose soft, breathable materials that feel gentle against sensitive skin, then test them through real play, washing and growing.</p>
            <p>Our fits leave room to move — for crawling, climbing and the sudden urge to spin in the middle of a supermarket. Details are simple, durable and easy for grown-ups too.</p>
            <p>We design in small, considered collections so you can build a wardrobe that mixes, matches and lasts beyond one season.</p>
          </div>
          <NuxtLink to="/products" class="btn-primary mt-8">Shop the collection</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="border-y border-cream-200 bg-white">
      <div class="container-site py-14 sm:py-20">
        <div class="mb-8 max-w-2xl">
          <p class="eyebrow mb-2">What we believe</p>
          <h2 class="section-title">Little details, big difference</h2>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(value, index) in values" :key="value.title" class="rounded-2xl border border-cream-200 bg-cream-50 p-6">
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-sm font-bold text-white">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="mt-4 font-display text-lg font-semibold text-brand-900">{{ value.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-brand-500">{{ value.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="container-site py-14 sm:py-20">
      <div class="rounded-3xl bg-brand-900 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
        <p class="eyebrow mb-3 text-coral-200">Ready when they are</p>
        <h2 class="font-display text-3xl font-semibold sm:text-4xl">Find their next favourite outfit</h2>
        <p class="mx-auto mt-3 max-w-xl text-sm font-medium text-white/75 sm:text-base">Free shipping over $30, easy 30-day returns and friendly support whenever you need it.</p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <NuxtLink to="/products" class="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand-900 transition hover:bg-cream-100">Shop all products</NuxtLink>
          <NuxtLink to="/size-guide" class="rounded-full border border-white/60 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">Size guide</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Our Story',
  description: 'Discover the story behind JasmarKids — thoughtfully designed, comfortable clothing made for little ones to play, grow and explore in.'
});

const values = [
  { title: 'Comfort first', body: 'Soft, breathable fabrics and easy fits that never get in the way of play.' },
  { title: 'Built to last', body: 'Reinforced details and quality finishes made to survive washing, climbing and growing.' },
  { title: 'Thoughtful design', body: 'Considered colours and details that make getting dressed feel like a treat.' },
  { title: 'Little by little', body: 'Small, focused collections designed to mix and match effortlessly.' }
];
</script>

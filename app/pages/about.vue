<template>
  <div class="min-h-screen bg-cream-50">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-brand-700">
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
          JasmarKids is a modern African children's clothing label built around a simple belief: little ones deserve clothes that feel as good as they look. We design soft, durable pieces in joyful colors — made for climbing, twirling, napping and everything in between.
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
          <h2 class="section-title">A little brand with a big soft spot for childhood.</h2>
          <div class="mt-5 space-y-4 text-sm leading-relaxed text-brand-500 sm:text-base">
            <p>JasmarKids started with a wardrobe problem every parent knows: the clothes that looked beautiful were often stiff or fussy, and the ones that survived play rarely felt special. We wanted both — pieces that could be worn on repeat and still make a little one light up.</p>
            <p>So we started with fabric. Every style begins with a soft, breathable material chosen for sensitive skin and everyday wear. We test fit through real movement, reinforce the seams that take the most strain, and keep details gentle against the body. Our fabrics are chosen to stay comfortable in the heat, and our colors are inspired by the warmth and energy of African childhood. Nothing scratchy. Nothing precious. Just clothes that are ready for the day.</p>
            <p>Our collections are intentionally small. A handful of pieces in colors that mix easily, designed to layer, wash and be handed down. We work with trusted partners who share our standards, and we keep improving the little things — the waistband that stays put, the cuff that survives the wash, the label that doesn't itch.</p>
            <p>Today, JasmarKids dresses babies, toddlers and kids across Nigeria for ordinary days and big little moments — with nationwide delivery and a growing community of families who believe childhood should be full of color, comfort and joy. We are still a small team, still obsessed with the details, and still convinced that comfort and joy belong together.</p>
          </div>
          <blockquote class="mt-6 rounded-2xl border-l-4 border-coral-300 bg-white p-5">
            <p class="font-display text-lg font-medium leading-relaxed text-ink">“We don't design for the photo. We design for the fourth wear, the unexpected nap and the very important puddle.”</p>
            <footer class="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-coral-600">The JasmarKids team</footer>
          </blockquote>
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
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="mt-4 font-display text-lg font-semibold text-ink">{{ value.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-brand-500">{{ value.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="container-site py-14 sm:py-20">
      <div class="rounded-3xl bg-brand-700 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
        <p class="eyebrow mb-3 text-coral-200">Ready when they are</p>
        <h2 class="font-display text-3xl font-semibold sm:text-4xl">Find their next favourite outfit</h2>
        <p class="mx-auto mt-3 max-w-xl text-sm font-medium text-white/75 sm:text-base">Free shipping over $30, easy 30-day returns and friendly support whenever you need it.</p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <NuxtLink to="/products" class="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-ink transition hover:bg-cream-100">Shop all products</NuxtLink>
          <NuxtLink to="/size-guide" class="rounded-full border border-white/60 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">Size guide</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Our Story',
  description: 'Discover JasmarKids — a modern African children’s clothing label making soft, durable, joyful pieces for babies, toddlers and kids to play, grow and celebrate in.'
});

const values = [
  { title: 'Comfort first', body: 'Soft, breathable fabrics and easy fits that never get in the way of play.' },
  { title: 'Built to last', body: 'Reinforced details and quality finishes made to survive washing, climbing and growing.' },
  { title: 'Thoughtful design', body: 'Considered colours and details that make getting dressed feel like a treat.' },
  { title: 'Rooted in joy', body: 'Made for African childhood — full of color, movement, family and everyday celebration.' }
];
</script>

<template>
  <div class="min-h-screen bg-cream-50">
    <!-- Story header -->
    <section class="border-b border-cream-200 bg-gradient-to-br from-brand-100 via-cream-50 to-coral-100">
      <div class="container-site py-16 text-center sm:py-24">
        <p class="eyebrow mb-4 text-coral-600">Our story</p>
        <h1 class="mx-auto max-w-4xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl md:text-6xl">
          Inspired by Amaris &amp; Jasmine
        </h1>
        <p class="mt-4 font-display text-xl font-medium text-coral-500 sm:text-2xl">Created with love.</p>
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-brand-700 sm:text-base">
          Every beautiful dream begins with a little inspiration, and for JasmarKids, that inspiration came from two special little girls — Amaris &amp; Jasmine.
        </p>
      </div>
    </section>


    <!-- The two little inspirations -->
    <section class="container-site py-10 sm:py-14">
      <div class="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
        <figure class="overflow-hidden rounded-3xl border border-cream-200 bg-white p-2 shadow-sm">
          <img src="/img/amaris-jasmine-story.jpg" alt="Amaris and Jasmine, the two little girls who inspired JasmarKids" class="w-full rounded-2xl object-cover" loading="lazy" />
          <figcaption class="px-3 pb-2 pt-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600">Amaris &amp; Jasmine · The inspiration</figcaption>
        </figure>
        <div>
          <p class="eyebrow mb-2">The inspiration</p>
          <h2 class="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">Two little girls, one beautiful dream.</h2>
          <p class="mt-4 text-sm leading-relaxed text-brand-700 sm:text-base">Amaris and Jasmine are the heart of JasmarKids. Their joy in choosing outfits, dressing up and being themselves is the reason this brand exists.</p>
          <p class="mt-3 text-xs italic leading-relaxed text-brand-500">A soft illustrated treatment of a family portrait.</p>
        </div>
      </div>
    </section>

    <!-- The story -->
    <section class="container-site py-12 sm:py-16">
      <div class="mx-auto max-w-3xl">
        <div class="space-y-6 text-base leading-relaxed text-brand-700 sm:text-lg sm:leading-8">
          <p>As their mother i watched my daughters develop a love for fashion that was impossible to ignore from choosing their favourite outfits to admiring themselves in the mirror, Amaris and Jasmine found so much joy in dressing up, for them, getting dressed up was never about just wearing clothes; it was an apportuinty to express themselves, explore their personalities, and feel beautiful in their own little ways.</p>

          <p>Their excitement over pretty dresses, stylish outfits and adorable accessories brought smiles to my face and warmth to my heart. Every outfit became a moment of happiness, every little fashion show a cherished memory, and every request for something beautiful planted a seed of inspiration in my heart. As I watched them I began to imagine a world where every child could experience that same excitement where getting dressed could be a joyful experience and every parent could find beautiful outfits that reflected their little one's unique personality.</p>

          <p class="border-l-4 border-coral-300 pl-5 font-display text-xl font-medium leading-snug text-ink sm:text-2xl">
            That was when the dream of JasmarKids was born.
          </p>

          <p>The name Jasmar holds a special meaning, inspired by the names of my precious daughters, Jasmine and Amaris. It represents the love, joy and inspiration they bring into my life. What began as a mother's desire to dress her own children beautifully grew into a vision to share that same passion with other families.</p>

          <p>JasmarKids was created for parents who love seeing their little ones look adorable, feel comfortable and express their individulaity through fashion. from everyday eesentials to special-occassion outfits,our vision is to bring together timeless styles,quality,comfort,and a liitle touch of magic in every piece.</p>

          <p>JasmarKids is more than a children's clothing store, It is a brand born from motherhood, inspired by childhood and built around the belief that every little child deserves to feel special.</p>

          <p>Behind every outfits is a mothers love, behind every collection is a dream and behind the name Jasmar are two little girls who inspired it.</p>

          <p>And so JasmarKids continue to grow from that simple,beautiful beginning a mothers love for her daughters and a passion for dressing little ones.</p>
        </div>

        <div class="mt-12 rounded-3xl bg-brand-100 px-6 py-10 text-center sm:px-10">
          <p class="font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">JasmarKids — Inspired by little hearts, styled for little stars.</p>
          <p class="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-coral-600">JasmarKids · by Tayisi</p>
          <a href="https://www.instagram.com/jasmar_kids/" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-brand-800 transition-colors hover:bg-cream-100">
            Follow @jasmar_kids on Instagram
          </a>
        </div>

        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <NuxtLink to="/products" class="btn-primary">Shop the collection</NuxtLink>
          <NuxtLink to="/contact" class="btn-secondary">Contact us</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Our Story',
  description: 'The JasmarKids story — inspired by Amaris and Jasmine, created with love by their mother, and made for little ones who deserve to feel special.'
});
</script>

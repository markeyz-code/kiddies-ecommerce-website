<template>
  <div class="min-h-screen bg-cream-50">
    <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <p class="eyebrow mb-2">Legal</p>
      <h1 class="section-title mb-2">Terms of Service</h1>
      <p class="text-sm text-brand-500 font-medium mb-10">Last updated: {{ new Date().toLocaleDateString() }}</p>

      <div class="prose prose-stone max-w-none space-y-8 text-brand-600">
        <section>
          <h2 class="font-display text-xl font-semibold text-brand-900 mb-3">1. Using our store</h2>
          <p class="text-sm leading-relaxed">By placing an order with JasmarKids you confirm that the information you provide is accurate and that you are authorised to use the payment method supplied. Prices and availability are subject to change without notice.</p>
        </section>
        <section>
          <h2 class="font-display text-xl font-semibold text-brand-900 mb-3">2. Orders and payment</h2>
          <p class="text-sm leading-relaxed">All orders are subject to acceptance and stock availability. Payment is taken at checkout via our payment partners, Paystack or Stripe. Cash-on-delivery orders are payable when your parcel arrives.</p>
        </section>
        <section>
          <h2 class="font-display text-xl font-semibold text-brand-900 mb-3">3. Shipping and returns</h2>
          <p class="text-sm leading-relaxed">Delivery times are estimates and may vary. You may return unworn items in their original packaging within 30 days of delivery. See our <NuxtLink to="/shipping" class="text-brand-900 font-bold underline">Shipping &amp; Returns</NuxtLink> page for details.</p>
        </section>
        <section>
          <h2 class="font-display text-xl font-semibold text-brand-900 mb-3">4. Accounts</h2>
          <p class="text-sm leading-relaxed">You are responsible for keeping your account credentials secure. Notify us immediately if you believe your account has been used without your permission.</p>
        </section>
        <section>
          <h2 class="font-display text-xl font-semibold text-brand-900 mb-3">5. Contact</h2>
          <p class="text-sm leading-relaxed">Questions about these terms? Reach us through the <NuxtLink to="/contact" class="text-brand-900 font-bold underline">contact page</NuxtLink>.</p>
        </section>
      </div>
    </div>
  </div>
</template>

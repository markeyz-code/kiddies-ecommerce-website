<template>
  <div class="container-site py-12 sm:py-16">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-serif font-bold text-brand-900 mb-8 text-center">Frequently Asked Questions</h1>
      
      <div class="space-y-6">
        <div v-for="(faq, index) in faqs" :key="index" class="card-surface p-6">
          <h3 class="text-lg font-medium text-brand-900 mb-2">{{ faq.question }}</h3>
          <p class="text-brand-500">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqs = [
  {
    question: "What sizes do your clothes run in?",
    answer: "Our sizes range from newborn (0-3 months) up to toddler sizes (5T). Each product page includes a detailed sizing chart to help you find the perfect fit."
  },
  {
    question: "Are your materials organic?",
    answer: "Yes! We prioritize sustainability and comfort. The vast majority of our baby clothes are made from 100% certified organic cotton, perfect for sensitive skin."
  },
  {
    question: "How long does shipping usually take?",
    answer: "Standard shipping takes 3-5 business days within the continental US. Expedited shipping options (1-2 days) are available at checkout."
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Absolutely. During checkout, you can select our premium gift wrapping option, which includes a beautiful JasmarKids signature box and a personalized handwritten note."
  }
]
</script>

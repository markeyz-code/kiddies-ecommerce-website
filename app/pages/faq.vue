<template>
  <div class="container-site py-12 sm:py-16">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-serif font-bold text-ink mb-8 text-center">Frequently Asked Questions</h1>
      
      <div class="space-y-6">
        <div v-for="(faq, index) in faqs" :key="index" class="card-surface p-6">
          <h3 class="text-lg font-medium text-ink mb-2">{{ faq.question }}</h3>
          <p class="text-brand-500">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqs = [
  {
    question: "What sizes do you offer?",
    answer: "Our pieces run from newborn sizes up to 14–16 years. Each product page includes a size guide, and our full size guide is available in the footer."
  },
  {
    question: "What fabrics do you use?",
    answer: "We choose soft, breathable fabrics for everyday comfort. Fabric details are listed on each product page so you can choose what works best for your little one."
  },
  {
    question: "How long does delivery take?",
    answer: "Orders are processed within 1–2 business days and delivered across Nigeria in approximately 3–5 business days. Delivery timelines can vary by location."
  },
  {
    question: "How much is delivery?",
    answer: "Standard delivery is ₦9,000 nationwide. Delivery is free on orders over ₦45,000."
  },
  {
    question: "Do you offer refunds or exchanges?",
    answer: "We do not offer refunds. If an item does not fit, you may request an exchange within 7 days of delivery. Items must be unworn, unwashed and have their original tags attached. Exchanges are subject to stock availability."
  },
  {
    question: "How do I track my order?",
    answer: "Use the Track Order page with your order number and the email address used at checkout, or sign in to your account to view your order history."
  },
  {
    question: "How can I contact JasmarKids?",
    answer: "You can reach us through the Contact page, by email at Jasmar.tayisi@gmail.com, or by phone on 0807 913 1425."
  }
];
</script>

<template>
  <div class="container-site py-12 sm:py-16">
    <div class="card-surface mx-auto flex max-w-5xl flex-col overflow-hidden md:flex-row">
      
      <!-- Contact Info Sidebar -->
      <div class="flex flex-col justify-between bg-brand-900 p-6 text-white sm:p-10 md:w-1/3">
        <div>
          <h2 class="font-display text-3xl font-semibold mb-2">Get in touch</h2>
          <p class="text-cream-100/70 mb-8 text-sm">We'd love to hear from you. Our friendly team is always here to chat.</p>
          
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-coral-300 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <div>
                <p class="font-medium">Chat to us</p>
                <p class="text-cream-100/70 text-sm">Our friendly team is here to help.</p>
                <p class="text-coral-200 mt-1 font-medium">{{ storeSettings.storeEmail }}</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-coral-300 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke-width="2"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke-width="2"></path>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"></circle>
              </svg>
              <div>
                <p class="font-medium">Instagram</p>
                <p class="text-cream-100/70 text-sm">Follow &amp; DM us for orders &amp; styling.</p>
                <a :href="storeSettings.instagram || 'https://instagram.com/jasmarkids'" target="_blank" rel="noopener" class="text-coral-200 mt-1 font-semibold hover:underline block">@jasmarkids</a>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-coral-300 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <div>
                <p class="font-medium">Phone</p>
                <p class="text-cream-100/70 text-sm">Mon-Fri from 8am to 5pm.</p>
                <p class="text-coral-200 mt-1 font-medium">{{ storeSettings.phone }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="p-6 sm:p-10 md:w-2/3">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="text-[11px] font-bold uppercase tracking-wider text-brand-500">First name</label>
              <input v-model="firstName" type="text" required class="input-base mt-1" placeholder="First name">
            </div>
            <div>
              <label class="text-[11px] font-bold uppercase tracking-wider text-brand-500">Last name</label>
              <input v-model="lastName" type="text" required class="input-base mt-1" placeholder="Last name">
            </div>
          </div>
          
          <div>
            <label class="text-[11px] font-bold uppercase tracking-wider text-brand-500">Email</label>
            <input v-model="email" type="email" required class="input-base mt-1" placeholder="you@company.com">
          </div>
          
          <div>
            <label class="text-[11px] font-bold uppercase tracking-wider text-brand-500">Message</label>
            <textarea v-model="message" rows="4" required class="input-base mt-1" placeholder="Leave us a message..."></textarea>
          </div>
          
          <button type="submit" :disabled="loading" class="btn-primary w-full">
            {{ loading ? 'Sending...' : 'Send message' }}
          </button>
        </form>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useContact } from '@/composables/modules/contact/useContact';
import { useStoreSettings } from '~/composables/core/useStoreSettings';

const { submitContact, loading } = useContact();
const { settings: storeSettings, fetchStoreSettings } = useStoreSettings();

onMounted(() => { fetchStoreSettings(); });
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const message = ref('');

const handleSubmit = async () => {
  const success = await submitContact({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    message: message.value
  });
  
  if (success) {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    message.value = '';
  }
};
</script>

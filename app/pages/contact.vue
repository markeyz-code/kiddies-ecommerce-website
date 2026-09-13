<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      
      <!-- Contact Info Sidebar -->
      <div class="bg-stone-900 text-white p-10 md:w-1/3 flex flex-col justify-between">
        <div>
          <h2 class="text-3xl font-serif font-bold mb-2">Get in touch</h2>
          <p class="text-stone-400 mb-8 text-sm">We'd love to hear from you. Our friendly team is always here to chat.</p>
          
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <div>
                <p class="font-medium">Chat to us</p>
                <p class="text-stone-400 text-sm">Our friendly team is here to help.</p>
                <p class="text-emerald-400 mt-1 font-medium">hello@jasmarkids.com</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <div>
                <p class="font-medium">Office</p>
                <p class="text-stone-400 text-sm">Come say hello at our HQ.</p>
                <p class="text-emerald-400 mt-1 font-medium">100 Premium Way<br/>New York, NY 10012</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <div>
                <p class="font-medium">Phone</p>
                <p class="text-stone-400 text-sm">Mon-Fri from 8am to 5pm.</p>
                <p class="text-emerald-400 mt-1 font-medium">+1 (555) 000-0000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="p-10 md:w-2/3">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-stone-700">First name</label>
              <input v-model="firstName" type="text" required class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-[#1a365d] py-2 px-3 border" placeholder="First name">
            </div>
            <div>
              <label class="block text-sm font-medium text-stone-700">Last name</label>
              <input v-model="lastName" type="text" required class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-[#1a365d] py-2 px-3 border" placeholder="Last name">
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-stone-700">Email</label>
            <input v-model="email" type="email" required class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-[#1a365d] py-2 px-3 border" placeholder="you@company.com">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-stone-700">Message</label>
            <textarea v-model="message" rows="4" required class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-[#1a365d] py-2 px-3 border" placeholder="Leave us a message..."></textarea>
          </div>
          
          <button type="submit" :disabled="loading" class="w-full bg-emerald-600 text-white font-medium py-3 rounded-md shadow-lg hover:bg-emerald-700 transition-colors disabled:opacity-70">
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

const { submitContact, loading } = useContact();
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

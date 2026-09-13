<template>
  <ClientOnly>
    <div v-if="isVisible" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300" 
        @click="closeModal"
      ></div>

      <!-- Modal Content -->
      <div 
        class="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row transform transition-all duration-500"
        role="dialog" 
        aria-modal="true"
      >
        <!-- Close Button (Mobile & Desktop) -->
        <button 
          @click="closeModal" 
          class="absolute top-4 right-4 z-10 text-stone-400 hover:text-stone-800 transition-colors p-2 bg-white/80 rounded-full md:bg-transparent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <!-- Left Image Section -->
        <div class="w-full md:w-1/2 h-64 md:h-auto relative">
          <!-- Using placeholder image from artifacts per plan -->
          <img 
            src="/img/hero_fall_1_1789165261484.jpg" 
            alt="Autumn Kids Collection" 
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <!-- Right Content Section -->
        <div class="w-full md:w-1/2 p-10 md:p-14 flex flex-col items-center justify-center text-center bg-white">
          <div class="w-40 mb-8">
            <svg viewBox="0 0 263.63 43.14" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto text-orange-500 fill-current"><path d="M22.06,20.25h9.72v4.86c-2.48,3-6,4.64-9.84,4.64a11.16,11.16,0,0,1,0-22.33,10.66,10.66,0,0,1,7.21,2.83l3.65-4a15.76,15.76,0,0,0-10.86-4.14A16.48,16.48,0,0,0,5.34,18.52a16.64,16.64,0,0,0,16.72,16.59c7,0,12.35-3.32,15-9.33V14.9H22.06Z"/><path d="M43.14,14h6.05l5.51,9.08L60.05,14H66.1L57.26,26.79v8.32H52.1V26.79Z"/><path d="M68,14h5.66l5,14L83.5,14h5.66v21.1H84V20.89l-4.24,12h-2L73.18,20.89V35.09H68Z"/><path d="M102,14h7c6.16,0,9,3,9,7.6s-2.8,7.56-9,7.56h-2V35.09h-5Zm5.16,10.65h1.7c3,0,4-1.28,4-3.05s-1-3-4-3h-1.7Z"/><path d="M121.21,24.52a10.82,10.82,0,1,0,10.82-10.8A10.64,10.64,0,0,0,121.21,24.52Zm16.32,0c0,3-1.63,6-5.5,6s-5.5-3-5.5-6,1.62-5.94,5.5-5.94S137.53,21.57,137.53,24.52Z"/><path d="M144.91,14h7c6,0,8.74,2.94,8.74,6.71A5.76,5.76,0,0,1,156.28,26l5.24,9.08h-6L151,26.91h-1v8.18h-5.16Zm5.16,8.69H152c2.72,0,3.69-1.25,3.69-2.26S154.67,18.5,152,18.5h-1.85Z"/><path d="M164.21,14H182.4v4.52H169.37V22.1H180.2v4.45H169.37v4.07h13.25v4.45H164.21Z"/><path d="M185.34,14H203.5v4.52H190.5V22.1h10.83v4.45H190.5v4.07h13.24v4.45H185.34Z"/><path d="M211.53,10.82a2.31,2.31,0,1,0,2.31-2.32A2.32,2.32,0,0,0,211.53,10.82Zm3.41,0a1.1,1.1,0,1,1-1.11-1.1A1.1,1.1,0,0,1,214.94,10.82Zm-.49.77h-.37v-1h-.28V9.73h.64a.5.5,0,0,1,.56.45.42.42,0,0,1-.39.46l.46.95h-.3Zm-.37-1.18h-.28v.5h.28a.25.25,0,0,0,.28-.24A.24.24,0,0,0,214.08,10.41Z"/></svg>
          </div>
          
          <h2 class="text-4xl font-serif font-black text-stone-900 mb-4 tracking-tight">30% off*</h2>
          <p class="text-lg md:text-xl font-bold text-stone-700 mb-8 max-w-[280px]">
            your next purchase when you sign up for emails
          </p>

          <form @submit.prevent="submitEmail" class="w-full max-w-sm flex flex-col space-y-6">
            <div class="relative">
              <input 
                v-model="email" 
                type="email" 
                placeholder="email address"
                required
                class="w-full px-4 py-3 border-b-2 border-stone-300 focus:border-[#1a365d] bg-transparent text-center text-stone-800 placeholder-stone-400 focus:outline-none transition-colors"
                :disabled="isSubmitting"
              />
            </div>
            
            <button 
              type="submit" 
              class="w-full bg-[#1a365d] text-white py-4 rounded-full font-black text-sm tracking-widest uppercase hover:bg-[#112543] transition-colors shadow-lg disabled:opacity-50"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Get 30% Off</span>
              <span v-else class="animate-pulse">Submitting...</span>
            </button>
          </form>

          <div class="mt-6 flex flex-col items-center space-y-4">
            <button 
              @click="closeModal" 
              class="text-sm font-bold text-stone-600 underline hover:text-stone-900 transition-colors"
            >
              Decline Offer
            </button>
            <p class="text-[10px] text-stone-500 leading-tight">
              *Not to exceed $30. New subscribers only. Exclusions apply. See 
              <a href="#" class="underline">Privacy Policy</a>, including 
              <a href="#" class="underline">Notice of Financial Incentive</a>
            </p>
            <a href="#" class="text-[10px] text-stone-500 underline">View Details</a>
          </div>
          
          <!-- Success Message Overlay -->
          <div v-if="showSuccess" class="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
             <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
             <h3 class="text-2xl font-black text-stone-900 mb-2">You're on the list!</h3>
             <p class="text-stone-600 font-medium">Check your email for your 30% off code.</p>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { subscribers_api } from '@/api_factory/modules/subscribers';

const isVisible = ref(false);
const email = ref('');
const isSubmitting = ref(false);
const showSuccess = ref(false);

const SESSION_KEY = 'gymboree_promo_modal_shown';

onMounted(() => {
  // Check if we've shown it this session
  const hasShown = sessionStorage.getItem(SESSION_KEY);
  
  if (!hasShown) {
    // Small delay so it pops up shortly after load, feeling natural
    setTimeout(() => {
      isVisible.value = true;
      sessionStorage.setItem(SESSION_KEY, 'true');
    }, 2500);
  }
});

const closeModal = () => {
  isVisible.value = false;
};

const submitEmail = async () => {
  if (!email.value || isSubmitting.value) return;
  
  isSubmitting.value = true;
  try {
    await subscribers_api.subscribe(email.value);
    showSuccess.value = true;
    
    // Close modal automatically after showing success message briefly
    setTimeout(() => {
      closeModal();
    }, 3000);
  } catch (error) {
    console.error('Error subscribing:', error);
    // Even if error (like already subscribed), just show success or close to avoid UX friction
    showSuccess.value = true;
    setTimeout(() => {
      closeModal();
    }, 3000);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>

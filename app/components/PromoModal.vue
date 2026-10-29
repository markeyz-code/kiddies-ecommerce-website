<template>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="isVisible" class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 pointer-events-auto">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity duration-300" 
          @click="closeModal"
        ></div>

        <!-- Modal Content -->
        <div 
          class="relative bg-white rounded-3xl border border-cream-200/90 shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col md:flex-row transform transition-all duration-300"
          role="dialog" 
          aria-modal="true"
        >
        <!-- Close Button (Mobile & Desktop) -->
        <button 
          @click="closeModal" 
          aria-label="Close newsletter popup"
          class="absolute top-4 right-4 z-10 text-brand-400 hover:text-ink transition-colors p-2 bg-white/80 rounded-full md:bg-transparent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <!-- Left Image Section -->
        <div class="w-full md:w-1/2 h-40 sm:h-56 md:h-auto relative">
          <!-- Using placeholder image from artifacts per plan -->
          <img 
            src="/img/hero_fall_1_1789165261484.jpg" 
            alt="Autumn Kids Collection" 
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <!-- Right Content Section -->
        <div class="w-full md:w-1/2 p-6 sm:p-10 md:p-14 flex flex-col items-center justify-center text-center bg-white">
          <p class="font-serif font-black text-3xl text-ink mb-6 tracking-tight">JasmarKids</p>
          
          <h2 class="text-3xl sm:text-4xl font-serif font-black text-ink mb-3 sm:mb-4 tracking-tight">30% off*</h2>
          <p class="text-lg md:text-xl font-bold text-brand-700 mb-8 max-w-[280px]">
            your next purchase when you sign up for emails
          </p>

          <form @submit.prevent="submitEmail" class="w-full max-w-sm flex flex-col space-y-6">
            <div class="relative">
              <input 
                v-model="email" 
                type="email" 
                placeholder="email address"
                required
                class="w-full px-4 py-3 border-b-2 border-brand-300 focus:border-brand-900 bg-transparent text-center text-ink placeholder-brand-400 focus:outline-none transition-colors"
                :disabled="isSubmitting"
              />
            </div>
            
            <button 
              type="submit" 
              class="w-full bg-brand-700 text-white py-4 rounded-full font-black text-sm tracking-widest uppercase hover:bg-[#112543] transition-colors shadow-lg disabled:opacity-50"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Get 30% Off</span>
              <span v-else class="animate-pulse">Submitting...</span>
            </button>
          </form>

          <div class="mt-6 flex flex-col items-center space-y-4">
            <button 
              @click="closeModal" 
              class="text-sm font-bold text-brand-500 underline hover:text-ink transition-colors"
            >
              Decline Offer
            </button>
            <p class="text-[10px] text-brand-500 leading-tight">
              *Not to exceed $30. New subscribers only. Exclusions apply. See 
              <NuxtLink to="/privacy-policy" class="underline">Privacy Policy</NuxtLink>, including 
              <NuxtLink to="/terms" class="underline">Notice of Financial Incentive</NuxtLink>
            </p>
            <NuxtLink to="/terms" class="text-[10px] text-brand-500 underline">View Details</NuxtLink>
          </div>
          
          <!-- Success Message Overlay -->
          <div v-if="showSuccess" class="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
             <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
             <h3 class="text-2xl font-black text-ink mb-2">You're on the list!</h3>
             <p class="text-brand-500 font-medium">Check your email for your 30% off code.</p>
          </div>
        </div>
      </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { subscribers_api } from '@/api_factory/modules/subscribers';

const isVisible = ref(false);
const email = ref('');
const isSubmitting = ref(false);
const showSuccess = ref(false);

const SESSION_KEY = 'jasmarkids_promo_modal_v1';
const route = useRoute();

const markShown = () => {
  try { localStorage.setItem(SESSION_KEY, String(Date.now())); } catch {}
};

let showTimer: ReturnType<typeof setTimeout> | null = null;

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeModal();
};

onMounted(() => {
  // Only interrupt the homepage, and no more than once per browser profile.
  if (route.path !== '/') return;
  let hasShown = null;
  try { hasShown = localStorage.getItem(SESSION_KEY); } catch {}
  if (hasShown) return;

  showTimer = setTimeout(() => {
    isVisible.value = true;
    markShown();
  }, 3000);

  window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  if (showTimer) clearTimeout(showTimer);
  window.removeEventListener('keydown', onKeydown);
});

const closeModal = () => {
  isVisible.value = false;
  markShown();
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

<template>
  <Teleport to="body">
    <div class="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-[9999] flex flex-col gap-3 pointer-events-none sm:max-w-[400px]">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto rounded-2xl shadow-2xl border px-5 py-4 flex items-start gap-3 backdrop-blur-md"
          :class="toastClasses(toast.toastType)"
        >
          <!-- Icon -->
          <div class="flex-shrink-0 mt-0.5">
            <div v-if="toast.toastType === 'success'" class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div v-else-if="toast.toastType === 'error'" class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </div>
            <div v-else class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-gray-900 leading-tight">{{ toast.title }}</p>
            <p class="text-xs text-gray-600 mt-0.5 leading-snug">{{ toast.message }}</p>
          </div>

          <!-- Close -->
          <button aria-label="Dismiss notification" @click="removeToast(toast.id)" class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-0.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useCustomToast } from '~/composables/core/useCustomToast';

const { toasts, removeToast } = useCustomToast();

const toastClasses = (type) => {
  switch (type) {
    case 'success':
      return 'bg-white/95 border-emerald-200';
    case 'error':
      return 'bg-white/95 border-red-200';
    default:
      return 'bg-white/95 border-blue-200';
  }
};
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}
.toast-move {
  transition: transform 0.3s ease;
}
</style>

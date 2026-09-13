import { ref, type Ref } from 'vue';
import { useState } from '#app';

interface ToastOptions {
  title: string;
  message: string;
  toastType: 'success' | 'error' | 'info';
}

interface Toast extends ToastOptions {
  id: number;
}

let toastId = 0;

export const useCustomToast = () => {
  const toasts = useState<Toast[]>('global_toasts', () => []);

  const showToast = (options: ToastOptions) => {
    const id = ++toastId;
    const toast: Toast = { ...options, id };
    toasts.value = [...toasts.value, toast];

    // Auto-dismiss after 3.5 seconds
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id);
    }, 3500);
  };

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  return { toasts, showToast, removeToast };
};

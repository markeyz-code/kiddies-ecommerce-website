export const useCustomToast = () => {
    const showToast = (options: { title: string; message: string; toastType: 'success' | 'error' | 'info' }) => {
        // Mock toast implementation since we removed UI components like UToast here
        // We can replace this with a native Vue toast later or integrate Sonner
        console.log(`[Toast ${options.toastType.toUpperCase()}] ${options.title}: ${options.message}`);
    };

    return { showToast };
};

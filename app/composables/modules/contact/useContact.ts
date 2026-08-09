import { ref } from 'vue';
import { contactApi } from '@/api_factory/modules/contact';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useContact = () => {
    const { showToast } = useCustomToast();
    const loading = ref(false);

    const submitContact = async (payload: any) => {
        loading.value = true;
        try {
            await contactApi.submitContactForm(payload);
            showToast({
                title: 'Success',
                message: 'Message sent successfully. We will get back to you shortly.',
                toastType: 'success'
            });
            return true;
        } catch (error: any) {
            showToast({
                title: 'Error',
                message: error?.response?.data?.message || 'Failed to send message',
                toastType: 'error'
            });
            return false;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        submitContact
    };
};

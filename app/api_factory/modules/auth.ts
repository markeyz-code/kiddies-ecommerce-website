import { GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const authApi = {
    login(payload: any) {
        return GATEWAY_ENDPOINT.post('/auth/login', payload);
    },
    socialLogin(payload: any) {
        return GATEWAY_ENDPOINT.post('/auth/social-login', payload);
    },
    register(payload: any) {
        return GATEWAY_ENDPOINT.post('/auth/register', payload);
    },
    logout() {
        return GATEWAY_ENDPOINT_WITH_AUTH.post('/auth/logout');
    },
    getProfile() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get('/auth/profile');
    },
    forgotPassword(payload: any) {
        return GATEWAY_ENDPOINT.post('/auth/forgot-password', payload);
    },
    resetPassword(payload: any) {
        return GATEWAY_ENDPOINT.post('/auth/reset-password', payload);
    },
    verifyOtp(payload: { email: string; code: string }) {
        return GATEWAY_ENDPOINT.post('/auth/verify-otp', payload);
    },
    resendOtp(payload: { email: string }) {
        return GATEWAY_ENDPOINT.post('/auth/resend-otp', payload);
    },
    getDashboard() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get('/auth/dashboard');
    },
    updateProfile(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.patch('/auth/profile', payload);
    },
    addAddress(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post('/auth/addresses', payload);
    },
    removeAddress(index: number) {
        return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/auth/addresses/${index}`);
    },
    toggleWishlist(productId: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post('/auth/wishlist', { productId });
    },
    updatePreferences(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.patch('/auth/preferences', payload);
    },
    getMyOrders() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get('/orders/my-orders');
    },
    addPaymentMethod(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post('/auth/payments', payload);
    },
    removePaymentMethod(index: number) {
        return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/auth/payments/${index}`);
    },
    changePassword(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.patch('/auth/change-password', payload);
    },
    addBirthday(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post('/auth/birthdays', payload);
    },
    removeBirthday(index: number) {
        return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/auth/birthdays/${index}`);
    }
};

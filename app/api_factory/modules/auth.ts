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
    }
};

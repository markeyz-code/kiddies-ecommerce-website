import { GATEWAY_ENDPOINT } from '../axios.config';

export const couponsApi = {
    validateCoupon(code: string) {
        return GATEWAY_ENDPOINT.post('/coupons/validate', { code });
    }
};

import { GATEWAY_ENDPOINT } from '../axios.config';

export const promotionsApi = {
    getPromotions(params: any = {}) {
        return GATEWAY_ENDPOINT.get('/promotions', { params });
    }
};

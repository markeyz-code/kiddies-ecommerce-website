import { GATEWAY_ENDPOINT } from '../axios.config';

export const settingsApi = {
    getGeneral() {
        return GATEWAY_ENDPOINT.get('/settings/general');
    },
    getStorefront() {
        return GATEWAY_ENDPOINT.get('/settings/storefront');
    },
    getAll() {
        return GATEWAY_ENDPOINT.get('/settings');
    }
};

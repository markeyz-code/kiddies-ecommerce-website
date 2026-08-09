import { GATEWAY_ENDPOINT } from '../axios.config';

export const contactApi = {
    submitContactForm(payload: any) {
        return GATEWAY_ENDPOINT.post('/contact', payload);
    }
};

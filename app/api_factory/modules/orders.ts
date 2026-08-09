import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const ordersApi = {
    createOrder(payload: any) {
        // Fallback to anonymous if auth isn't required for checkout
        return GATEWAY_ENDPOINT_WITH_AUTH.post('/orders', payload);
    },
    getOrders() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get('/orders');
    },
    getOrderById(id: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get(`/orders/${id}`);
    }
};

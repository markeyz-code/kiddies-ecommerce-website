import { GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const ordersApi = {
    createOrder(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post('/orders', payload);
    },
    getOrders() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get('/orders');
    },
    getMyOrders() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get('/orders/my-orders');
    },
    getOrderById(id: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get(`/orders/${id}`);
    },
    trackOrder(payload: { email: string; orderNumber: string }) {
        return GATEWAY_ENDPOINT.post('/orders/track', payload);
    },
    lookupOrder(orderNumber: string, email?: string, reference?: string) {
        return GATEWAY_ENDPOINT.get(`/orders/lookup/${encodeURIComponent(orderNumber)}`, {
            params: { ...(email ? { email } : {}), ...(reference ? { reference } : {}) }
        });
    },
    cancelOrder(id: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.patch(`/orders/${id}/cancel`);
    },
    verifyPayment(payload: { orderNumber: string; reference?: string }) {
        return GATEWAY_ENDPOINT.post('/orders/verify-payment', payload);
    }
};

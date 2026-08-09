import { GATEWAY_ENDPOINT } from '../axios.config';

export const productsApi = {
    getProducts(params: any = {}) {
        return GATEWAY_ENDPOINT.get('/products', { params });
    },
    getProductById(id: string) {
        return GATEWAY_ENDPOINT.get(`/products/${id}`);
    }
};

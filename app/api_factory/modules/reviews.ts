import { GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const reviewsApi = {
    getReviewsByProductId(productId: string) {
        return GATEWAY_ENDPOINT.get(`/reviews/product/${productId}`);
    },
    submitReview(data: { productId: string, rating: number, comment: string }) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post('/reviews', data);
    }
};

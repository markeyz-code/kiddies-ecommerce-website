import { ref } from 'vue';
import { ordersApi } from '@/api_factory/modules/orders';
import { useCustomToast } from '@/composables/core/useCustomToast';
import { useRouter } from 'vue-router';
import { useCart } from '@/composables/core/useCart';

export const useOrders = () => {
    const { showToast } = useCustomToast();
    const router = useRouter();
    const loading = ref(false);
    const cart = useCart();

    const checkout = async (customerData: any, paymentMethod: string) => {
        loading.value = true;
        try {
            const payload = {
                customer: customerData,
                paymentMethod,
                items: cart.items.map(item => ({
                    productId: item.product._id,
                    name: item.product.name,
                    price: item.product.basePrice,
                    quantity: item.quantity,
                    sku: item.product.sku,
                })),
                subtotal: cart.subtotal,
                shippingFee: 10, // flat rate for demo
                tax: cart.subtotal * 0.08, // 8% tax
                totalAmount: cart.subtotal * 1.08 + 10,
                callback_url: `${window.location.origin}/checkout-success`,
            };

            const { data } = await ordersApi.createOrder(payload);
            
            if (paymentMethod === 'paystack' && data?.paystack?.access_code) {
                // Return access code to be handled by checkout.vue
                return { success: true, paystack: data.paystack, order: data.order };
            }

            cart.clearCart();
            
            showToast({
                title: 'Order Placed!',
                message: `Order ${data?.order?.orderNumber || data.orderNumber} placed successfully.`,
                toastType: 'success'
            });
            
            router.push(`/checkout-success?orderNumber=${data?.order?.orderNumber || data.orderNumber}`);
            return { success: true, order: data.order || data };
        } catch (error: any) {
            showToast({
                title: 'Checkout Failed',
                message: error?.response?.data?.message || 'Could not process order',
                toastType: 'error'
            });
            return null;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        checkout
    };
};

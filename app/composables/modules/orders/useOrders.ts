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
                    productId: item.product._id || item.product.id,
                    name: item.product.name,
                    price: item.product.basePrice || item.product.price || 0,
                    quantity: item.quantity,
                    sku: item.product.sku || 'N/A',
                })),
                subtotal: cart.subtotal,
                shippingFee: 10, // flat rate for demo
                tax: cart.subtotal * 0.08, // 8% tax
                totalAmount: cart.subtotal * 1.08 + 10,
                callback_url: `${window.location.origin}/checkout-success`,
            };

            const { data } = await ordersApi.createOrder(payload);
            
            // Paystack redirect
            if (paymentMethod === 'paystack' && data?.paystack?.authorization_url) {
                return { success: true, paystack: data.paystack, order: data.order };
            }
            // Stripe redirect
            if (paymentMethod === 'stripe' && (data?.stripe?.url || data?.paystack?.authorization_url)) {
                const stripeUrl = data?.stripe?.url || data?.paystack?.authorization_url;
                return { success: true, stripe: { url: stripeUrl }, order: data.order };
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

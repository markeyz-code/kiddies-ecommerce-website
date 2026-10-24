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

    const checkout = async (customerData: any, paymentMethod: string, totals: any = {}) => {
        loading.value = true;
        try {
            const payload = {
                customer: customerData,
                paymentMethod,
                couponCode: cart.appliedCoupon?.code || undefined,
                items: cart.items.map((item: any) => ({
                    productId: item.product._id || item.product.id,
                    name: item.product.name,
                    price: item.product.basePrice || item.product.price || 0,
                    quantity: item.quantity,
                    sku: item.product.sku || 'N/A',
                    size: item.options?.size || '',
                    color: item.options?.color || '',
                    image: item.product.image || item.product.imageUrls?.thumbnail || ''
                })),
                subtotal: totals.subtotal ?? cart.subtotal,
                shippingFee: totals.shippingFee,
                tax: totals.tax,
                totalAmount: totals.totalAmount,
                currency: totals.currency,
                callback_url: `${window.location.origin}/checkout-success`,
            };

            const { data } = await ordersApi.createOrder(payload);
            const order = data?.order || data;

            if (typeof sessionStorage !== 'undefined') {
                sessionStorage.setItem('last_order_number', order.orderNumber);
                sessionStorage.setItem('last_order_email', customerData.email || '');
            }

            if (paymentMethod === 'paystack' && data?.paystack?.authorization_url) {
                return { success: true, paystack: data.paystack, order, redirect: true };
            }
            if (paymentMethod === 'stripe' && data?.stripe?.url) {
                return { success: true, stripe: data.stripe, order, redirect: true };
            }

            // Cash on delivery / offline payment: the order is complete immediately
            cart.clearCart();
            cart.removeCoupon();
            showToast({
                title: 'Order Placed!',
                message: `Order ${order?.orderNumber} placed successfully.`,
                toastType: 'success'
            });
            router.push(`/checkout-success?orderNumber=${order.orderNumber}`);
            return { success: true, order, redirect: false };
        } catch (error: any) {
            showToast({
                title: 'Checkout Failed',
                message: error?.response?.data?.message || 'Could not process your order',
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

import { ref, computed, reactive } from 'vue';
import { couponsApi } from '@/api_factory/modules/coupons';
import { useCustomToast } from './useCustomToast';

import { useCookie } from '#app';

export const useCart = () => {
    const items = useCookie<any[]>('jasmar_cart_items', { default: () => [], maxAge: 60 * 60 * 24 * 7 }); // 7 days persistence
    const appliedCoupon = useCookie<any>('jasmar_cart_coupon', { default: () => null, maxAge: 60 * 60 * 24 * 7 });
    
    const { showToast } = useCustomToast();

    const totalItems = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity, 0);
    });

    const originalSubtotal = computed(() => {
        return items.value.reduce((total, item) => total + ((item?.product?.basePrice || 0) * item.quantity), 0);
    });

    const discountAmount = computed(() => {
        if (!appliedCoupon.value) return 0;
        const total = originalSubtotal.value;
        if (appliedCoupon.value.discountType === 'percentage') {
            return total * (appliedCoupon.value.discountValue / 100);
        } else if (appliedCoupon.value.discountType === 'fixed') {
            return appliedCoupon.value.discountValue;
        }
        return 0;
    });

    const subtotal = computed(() => {
        return Math.max(0, originalSubtotal.value - discountAmount.value);
    });

    const addToCart = (product: any, quantity = 1, options = {}) => {
        const existingItemIndex = items.value.findIndex(
            (item) => item.product._id === product._id && JSON.stringify(item.options) === JSON.stringify(options)
        );

        if (existingItemIndex > -1) {
            items.value[existingItemIndex].quantity += quantity;
        } else {
            items.value.push({
                id: Math.random().toString(36).substr(2, 9),
                product,
                quantity,
                options
            });
        }
    };

    const removeFromCart = (itemId: string) => {
        const index = items.value.findIndex((item) => item.id === itemId);
        if (index > -1) {
            items.value.splice(index, 1);
        }
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        const item = items.value.find((item) => item.id === itemId);
        if (item) {
            if (quantity <= 0) {
                removeFromCart(itemId);
            } else {
                item.quantity = quantity;
            }
        }
    };

    const clearCart = () => {
        items.value = [];
    };
    const applyCoupon = async (code: string) => {
        try {
            const { data } = await couponsApi.validateCoupon(code);
            appliedCoupon.value = data;
            showToast({
                title: 'Success',
                message: 'Coupon applied successfully',
                toastType: 'success'
            });
            return true;
        } catch (error: any) {
            showToast({
                title: 'Error',
                message: error?.response?.data?.message || 'Invalid coupon',
                toastType: 'error'
            });
            appliedCoupon.value = null;
            return false;
        }
    };

    const removeCoupon = () => {
        appliedCoupon.value = null;
    };

    return reactive({
        items,
        totalItems,
        originalSubtotal,
        discountAmount,
        subtotal,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon
    });
};

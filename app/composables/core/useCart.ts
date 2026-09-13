import { computed, reactive } from 'vue';
import { couponsApi } from '@/api_factory/modules/coupons';
import { useCustomToast } from './useCustomToast';
import { useCookie, useState } from '#app';

export const useCart = () => {
    // Use useState to share state globally across components, initialized from useCookie
    const items = useState<any[]>('jasmar_cart_items_state', () => {
        return useCookie<any[]>('jasmar_cart_items', { default: () => [], maxAge: 60 * 60 * 24 * 7 }).value;
    });
    const appliedCoupon = useState<any>('jasmar_cart_coupon_state', () => {
        return useCookie<any>('jasmar_cart_coupon', { default: () => null, maxAge: 60 * 60 * 24 * 7 }).value;
    });

    const syncCookies = () => {
        const itemsCookie = useCookie<any[]>('jasmar_cart_items', { maxAge: 60 * 60 * 24 * 7 });
        itemsCookie.value = items.value;
        const couponCookie = useCookie<any>('jasmar_cart_coupon', { maxAge: 60 * 60 * 24 * 7 });
        couponCookie.value = appliedCoupon.value;
    };
    
    const { showToast } = useCustomToast();

    const totalItems = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity, 0);
    });

    const originalSubtotal = computed(() => {
        return items.value.reduce((total, item) => total + ((item?.product?.basePrice || item?.product?.price || 0) * item.quantity), 0);
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
        const currentItems = [...items.value];
        const existingItemIndex = currentItems.findIndex((item) => {
            const hasSameId = (product._id && item.product._id === product._id) || (product.id && item.product.id === product.id);
            return hasSameId && JSON.stringify(item.options) === JSON.stringify(options);
        });

        if (existingItemIndex > -1) {
            currentItems[existingItemIndex].quantity += quantity;
        } else {
            currentItems.push({
                id: Math.random().toString(36).substr(2, 9),
                product,
                quantity,
                options
            });
        }
        items.value = currentItems;
        syncCookies();
    };

    const removeFromCart = (itemId: string) => {
        items.value = items.value.filter((item) => item.id !== itemId);
        syncCookies();
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        const currentItems = [...items.value];
        const index = currentItems.findIndex((item) => item.id === itemId);
        if (index > -1) {
            currentItems[index].quantity = quantity;
            items.value = currentItems;
            syncCookies();
        }
    };

    const clearCart = () => {
        items.value = [];
        syncCookies();
    };
    
    const applyCoupon = async (code: string) => {
        try {
            const { data } = await couponsApi.validateCoupon(code);
            appliedCoupon.value = data;
            syncCookies();
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
            syncCookies();
            return false;
        }
    };

    const removeCoupon = () => {
        appliedCoupon.value = null;
        syncCookies();
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

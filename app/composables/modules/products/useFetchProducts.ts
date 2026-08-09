import { ref } from 'vue';
import { productsApi } from '@/api_factory/modules/products';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useFetchProducts = () => {
    const { showToast } = useCustomToast();
    const loading = ref(false);
    const products = ref<any[]>([]);
    const singleProduct = ref<any>(null);

    const fetchProducts = async (params: any = {}) => {
        loading.value = true;
        try {
            const { data } = await productsApi.getProducts(params);
            products.value = data;
            return data;
        } catch (error: any) {
            console.error('Error fetching products:', error);
            showToast({
                title: 'Error',
                message: error?.response?.data?.message || 'Failed to fetch products',
                toastType: 'error'
            });
        } finally {
            loading.value = false;
        }
    };

    const fetchProductById = async (id: string) => {
        loading.value = true;
        try {
            const { data } = await productsApi.getProductById(id);
            singleProduct.value = data;
            return data;
        } catch (error: any) {
            console.error('Error fetching product:', error);
            showToast({
                title: 'Error',
                message: error?.response?.data?.message || 'Failed to fetch product details',
                toastType: 'error'
            });
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        products,
        singleProduct,
        fetchProducts,
        fetchProductById
    };
};

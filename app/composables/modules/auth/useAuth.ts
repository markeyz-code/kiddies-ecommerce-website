import { ref } from 'vue';
import { authApi } from '@/api_factory/modules/auth';
import { useCustomToast } from '@/composables/core/useCustomToast';
import { useRouter } from 'vue-router';

export const useAuth = () => {
    const { showToast } = useCustomToast();
    const router = useRouter();
    const loading = ref(false);
    const user = ref<any>(null);

    const setCookie = (name: string, value: string, maxAgeDays: number) => {
        if (typeof document === 'undefined') return;
        document.cookie = `${name}=${value}; path=/; max-age=${maxAgeDays * 86400}; SameSite=Lax`;
    };

    const login = async (payload: any) => {
        loading.value = true;
        try {
            const { data } = await authApi.login(payload);
            user.value = data.user;
            
            if (data.accessToken) {
                setCookie('accessToken', data.accessToken, 7);
            }
            if (data.refreshToken) {
                setCookie('refreshToken', data.refreshToken, 30);
            }

            showToast({
                title: 'Success',
                message: 'Logged in successfully',
                toastType: 'success'
            });
            const redirectPath = (router.currentRoute.value.query.redirect as string) || '/';
            router.push(redirectPath);
            return data;
        } catch (error: any) {
            showToast({
                title: 'Login Error',
                message: error?.response?.data?.message || 'Invalid credentials',
                toastType: 'error'
            });
        } finally {
            loading.value = false;
        }
    };

    const socialLogin = async (payload: any) => {
        loading.value = true;
        try {
            const { data } = await authApi.socialLogin(payload);
            user.value = data.user;
            
            if (data.accessToken) {
                setCookie('accessToken', data.accessToken, 7);
            }
            if (data.refreshToken) {
                setCookie('refreshToken', data.refreshToken, 30);
            }

            showToast({
                title: 'Success',
                message: 'Logged in successfully',
                toastType: 'success'
            });
            const redirectPath = (router.currentRoute.value.query.redirect as string) || '/';
            router.push(redirectPath);
            return data;
        } catch (error: any) {
            showToast({
                title: 'Login Error',
                message: error?.response?.data?.message || 'Social login failed',
                toastType: 'error'
            });
        } finally {
            loading.value = false;
        }
    };

    const register = async (payload: any) => {
        loading.value = true;
        try {
            const { data } = await authApi.register(payload);
            showToast({
                title: 'Success',
                message: 'Account created successfully. Please login.',
                toastType: 'success'
            });
            router.push('/login');
            return data;
        } catch (error: any) {
            showToast({
                title: 'Registration Error',
                message: error?.response?.data?.message || 'Could not create account',
                toastType: 'error'
            });
        } finally {
            loading.value = false;
        }
    };

    const fetchProfile = async () => {
        loading.value = true;
        try {
            const { data } = await authApi.getProfile();
            user.value = data;
            return data;
        } catch (error: any) {
            console.error('Error fetching profile:', error);
        } finally {
            loading.value = false;
        }
    };

    const forgotPassword = async (payload: any) => {
        loading.value = true;
        try {
            const { data } = await authApi.forgotPassword(payload);
            alert(data.message);
            // In a real app, this wouldn't alert the token, but for this demo:
            if (data.resetToken) {
                alert(`DEMO ONLY: Your reset token is: ${data.resetToken}`);
            }
            return data;
        } catch (error: any) {
            alert(error?.response?.data?.message || 'Error requesting password reset');
        } finally {
            loading.value = false;
        }
    };

    const resetPassword = async (payload: any) => {
        loading.value = true;
        try {
            const { data } = await authApi.resetPassword(payload);
            alert(data.message);
            router.push('/login');
            return data;
        } catch (error: any) {
            alert(error?.response?.data?.message || 'Error resetting password');
        } finally {
            loading.value = false;
        }
    };

    const logout = () => {
        document.cookie = 'accessToken=; Max-Age=0; path=/';
        document.cookie = 'refreshToken=; Max-Age=0; path=/';
        router.push('/login');
    };

    return {
        loading,
        user,
        login,
        socialLogin,
        register,
        fetchProfile,
        forgotPassword,
        resetPassword,
        logout
    };
};

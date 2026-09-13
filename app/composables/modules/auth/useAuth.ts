import { ref } from 'vue';
import { authApi } from '@/api_factory/modules/auth';
import { useCustomToast } from '@/composables/core/useCustomToast';
import { useRouter } from 'vue-router';
import { useState } from '#app';

export const useAuth = () => {
    const { showToast } = useCustomToast();
    const router = useRouter();
    const loading = ref(false);
    const user = useState<any>('auth_user', () => null);
    const isAuthModalOpen = useState<boolean>('auth_modal', () => false);

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
            const message = error?.response?.data?.message || 'Invalid credentials';
            showToast({
                title: 'Login Error',
                message: message,
                toastType: 'error'
            });
            if (message.includes('verify your email')) {
                router.push(`/verify-otp?email=${encodeURIComponent(payload.email)}`);
            }
        } finally {
            loading.value = false;
        }
    };

    const socialLogin = async (providerName: string) => {
        loading.value = true;
        try {
            const { $firebaseAuth } = useNuxtApp();
            let provider;
            
            if (providerName === 'google') {
                const { GoogleAuthProvider } = await import('firebase/auth');
                provider = new GoogleAuthProvider();
            } else {
                throw new Error('Unsupported provider');
            }

            const { signInWithPopup } = await import('firebase/auth');
            const result = await signInWithPopup($firebaseAuth, provider);
            const idToken = await result.user.getIdToken();

            const { data } = await authApi.socialLogin({ idToken });
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
            console.error(error);
            showToast({
                title: 'Login Error',
                message: error?.response?.data?.message || error.message || 'Social login failed',
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
                title: 'Check Your Email',
                message: data.message || 'Account created. Please verify your email.',
                toastType: 'success'
            });
            if (data.requiresOtp) {
                router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
            } else {
                router.push('/login');
            }
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

    const verifyOtp = async (payload: { email: string; code: string }) => {
        loading.value = true;
        try {
            const { data } = await authApi.verifyOtp(payload);
            user.value = data.user;
            
            if (data.accessToken) {
                setCookie('accessToken', data.accessToken, 7);
            }
            if (data.refreshToken) {
                setCookie('refreshToken', data.refreshToken, 30);
            }

            showToast({
                title: 'Verified!',
                message: 'Email verified successfully. Welcome!',
                toastType: 'success'
            });
            router.push('/');
            return data;
        } catch (error: any) {
            showToast({
                title: 'Verification Failed',
                message: error?.response?.data?.message || 'Invalid OTP code',
                toastType: 'error'
            });
            return false;
        } finally {
            loading.value = false;
        }
    };

    const resendOtp = async (email: string) => {
        loading.value = true;
        try {
            const { data } = await authApi.resendOtp({ email });
            showToast({
                title: 'Code Sent',
                message: data.message || 'A new code has been sent.',
                toastType: 'success'
            });
            return true;
        } catch (error: any) {
            showToast({
                title: 'Error',
                message: error?.response?.data?.message || 'Failed to resend code',
                toastType: 'error'
            });
            return false;
        } finally {
            loading.value = false;
        }
    };

    const logout = () => {
        document.cookie = 'accessToken=; Max-Age=0; path=/';
        document.cookie = 'refreshToken=; Max-Age=0; path=/';
        router.push('/login');
    };

    const toggleWishlist = async (productId: string) => {
        if (!user.value) {
            isAuthModalOpen.value = true;
            return false;
        }

        try {
            await authApi.toggleWishlist(productId);
            
            if (!user.value.wishlist) user.value.wishlist = [];
            const index = user.value.wishlist.indexOf(productId);
            const isNowFavorite = index === -1;
            
            if (isNowFavorite) {
                user.value.wishlist.push(productId);
            } else {
                user.value.wishlist.splice(index, 1);
            }

            showToast({ 
                title: 'Wishlist', 
                message: isNowFavorite ? 'Added to favorites!' : 'Removed from favorites', 
                toastType: 'success' 
            });
            return isNowFavorite;
        } catch (error: any) {
            console.error('Error toggling wishlist', error);
            showToast({ 
                title: 'Error', 
                message: 'Failed to update wishlist', 
                toastType: 'error' 
            });
            return false;
        }
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
        verifyOtp,
        resendOtp,
        logout,
        isAuthModalOpen,
        toggleWishlist
    };
};

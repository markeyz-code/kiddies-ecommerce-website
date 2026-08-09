import axios, { type AxiosResponse } from 'axios';

export const rawBaseUrl = 'http://localhost:3002';
const $GATEWAY_ENDPOINT = rawBaseUrl;
const $IMAGE_UPLOAD_ENDPOINT = 'http://localhost:3002/upload';

export const GATEWAY_ENDPOINT = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  withCredentials: true,
  timeout: 15000,
});

export const GATEWAY_ENDPOINT_WITH_AUTH = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  withCredentials: true,
});

export const GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const IMAGE_UPLOAD_ENDPOINT = axios.create({
  baseURL: $IMAGE_UPLOAD_ENDPOINT,
  withCredentials: true,
});

export interface CustomAxiosResponse extends AxiosResponse {
  value?: any;
  type?: string;
}

// ─── Refresh Token State Machine ──────────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    });
    failedQueue = [];
};

const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

const setCookie = (name: string, value: string, maxAgeDays: number) => {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=${value}; path=/; max-age=${maxAgeDays * 86400}; SameSite=Lax`;
};

const AUTH_FLOW_PATTERN = /\/auth\/(login|verify-otp|register|resend-otp|forgot-password|reset-password|refresh)/;

const instanceArray = [
  GATEWAY_ENDPOINT,
  GATEWAY_ENDPOINT_WITH_AUTH,
  GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA,
  IMAGE_UPLOAD_ENDPOINT
];

instanceArray.forEach((instance) => {
  instance.interceptors.request.use((config: any) => {
    const lang = getCookie('i18n_redirected') || 'en';
    config.headers['Accept-Language'] = lang;
    return config;
  }, (error) => Promise.reject(error));
});

const authInstanceArray = [
  GATEWAY_ENDPOINT_WITH_AUTH,
  GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA,
  IMAGE_UPLOAD_ENDPOINT
];

authInstanceArray.forEach((instance) => {
  instance.interceptors.request.use(
    (config: any) => {
      try {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch {}
      return config;
    },
    (error) => Promise.reject(error)
  );
});

instanceArray.forEach((instance) => {
  instance.interceptors.response.use(
    (response: CustomAxiosResponse) => response,
    async (err: any) => {
      const originalRequest = err.config;
      let showToast: any = (opts: any) => console.log('Toast:', opts);

      try {
        const { useCustomToast } = await import('@/composables/core/useCustomToast');
        const toast = useCustomToast();
        showToast = toast.showToast;
      } catch (e) {
        return Promise.reject(err);
      }

      if (!err.response) {
        showToast({
          title: 'Connection Error',
          message: 'Unable to reach the server. Please check your internet connection.',
          toastType: 'error'
        });
        return Promise.reject(err);
      }

      const status = err.response.status;
      const isAuthOrChatFlow = AUTH_FLOW_PATTERN.test(originalRequest.url || '');

      if (status === 401 && !isAuthOrChatFlow && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((newToken: any) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return instance(originalRequest);
            })
            .catch((queueErr) => Promise.reject(queueErr));
        }

        isRefreshing = true;

        try {
          const refreshToken = getCookie('refreshToken');
          if (!refreshToken) throw new Error('No refresh token');

          const refreshResponse = await axios.post(
            `${$GATEWAY_ENDPOINT}/auth/refresh`,
            { refreshToken },
            {
              withCredentials: true,
              headers: { 'x-refresh-token': refreshToken },
            }
          );

          const newAccessToken = refreshResponse.data?.accessToken;
          const newRefreshToken = refreshResponse.data?.refreshToken;

          if (!newAccessToken) throw new Error('No token in refresh response');

          setCookie('accessToken', newAccessToken, 7);
          if (newRefreshToken) setCookie('refreshToken', newRefreshToken, 30);

          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);

        } catch (refreshError) {
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      if (status === 401 && isAuthOrChatFlow) {
        return Promise.reject(err);
      }

      if (!originalRequest.hideToast) {
        const errorMessage = err.response.data?.message || err.response.data?.errors?.[0]?.message || 'Something went wrong';
        showToast({
          title: 'Request Error',
          message: errorMessage,
          toastType: 'error'
        });
      }
      return Promise.reject(err);
    }
  );
});

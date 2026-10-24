import { useState } from '#app';
import { settingsApi } from '@/api_factory/modules/settings';

const DEFAULTS = {
  storeName: 'JasmarKids',
  storeEmail: 'hello@jasmarkids.com',
  phone: '+234 800 JASMARKIDS',
  address: '',
  currency: 'NGN',
  shippingFee: 2500,
  freeShippingThreshold: 50000,
  taxRate: 7.5,
  instagram: 'https://instagram.com/jasmarkids',
  facebook: 'https://facebook.com/jasmarkids',
  twitter: 'https://twitter.com/jasmarkids',
  announcement: 'Nationwide Delivery Across Nigeria · DM @jasmarkids on Instagram'
};

export const useStoreSettings = () => {
  const settings = useState<any>('store_settings', () => ({ ...DEFAULTS }));
  const loaded = useState<boolean>('store_settings_loaded', () => false);
  const loading = useState<boolean>('store_settings_loading', () => false);

  const fetchStoreSettings = async (force = false) => {
    if (loaded.value && !force) return settings.value;
    loading.value = true;
    try {
      const { data } = await settingsApi.getGeneral();
      if (data && typeof data === 'object') {
        settings.value = { ...DEFAULTS, ...settings.value, ...data };
      }
      loaded.value = true;
    } catch {
      // Keep the defaults if the API is temporarily unavailable.
    } finally {
      loading.value = false;
    }
    return settings.value;
  };

  return { settings, loaded, loading, fetchStoreSettings };
};

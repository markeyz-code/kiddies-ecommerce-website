import { useState } from '#app';
import { settingsApi } from '@/api_factory/modules/settings';

const DEFAULTS = {
  storeName: 'JasmarKids',
  storeEmail: 'hello@jasmarkids.com',
  phone: '+1 (555) 010-2030',
  address: '128 Maple Street, Brooklyn, NY 11201',
  currency: 'USD',
  shippingFee: 5.95,
  freeShippingThreshold: 30,
  taxRate: 8,
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  announcement: 'Extra 40% Off* Sale With Code EXTRA40'
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

import { GATEWAY_ENDPOINT } from '../axios.config';

export const subscribers_api = {
  subscribe: (email: string) => {
    return GATEWAY_ENDPOINT.post('/subscribers', { email });
  }
};

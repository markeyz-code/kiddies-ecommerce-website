import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  };

  let app;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  const auth = getAuth(app);

  return {
    provide: {
      firebaseAuth: auth,
    },
  };
});

import axios from 'axios';
import Constants from 'expo-constants';
import { getUnimonitorApiToken } from './asyncStorage';

const api = axios.create({
  baseURL: `${Constants.manifest.extra.unimonitorApiUrl}`,
});

api.interceptors.request.use(
  async config => {
    console.log(config.url);

    if (config.url !== 'sessions/microsoft') {
      try {
        const token = await getUnimonitorApiToken();

        config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
      } catch (error) {
        console.log('Unable to set request Authorization header');
        console.log(error);
      }
    }

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export default api;

import { useCallback, useState } from 'react';
import Constants from 'expo-constants';
import * as AppAuth from 'expo-app-auth';

import { getRedirectUrl } from '../utils/redirectUrl';
import api from '../io/api';
import { parseJwt } from '../utils/token';

const useMicrosoftLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [error, setError] = useState('');

  const authConfig = {
    issuer: 'https://login.microsoftonline.com/common/v2.0',
    clientId: Constants.manifest.extra.microsoftAdClientId,
    redirectUrl: getRedirectUrl(),
    scopes: ['openid', 'profile', 'email', 'offline_access'],
  };

  const exchangeMicrosoftToken = async (microsoftToken: string) => {
    const response = await api.post(
      'sessions/microsoft',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${microsoftToken}`,
        },
      },
    );

    return response.data.token;
  };

  const login = useCallback(() => {
    (async () => {
      try {
        setIsLoading(true);

        const microsoftResponse = await AppAuth.authAsync(authConfig);

        const token = await exchangeMicrosoftToken(
          microsoftResponse.accessToken ?? '',
        );

        setUser(parseJwt(token));
        setToken(token);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    user,
    token,
    isLoading,
    error,

    login,
  };
};

export default useMicrosoftLogin;

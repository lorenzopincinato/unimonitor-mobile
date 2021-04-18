import Constants from 'expo-constants';
import * as AppAuth from 'expo-app-auth';

const getRedirectUrl = () => {
  switch (Constants.appOwnership) {
    case 'standalone':
      return 'unimonitor://oauthredirect';

    case 'expo':
      return `${AppAuth.OAuthRedirect}://oauthredirect`;

    case null:
      return 'http://localhost:19006/oauthredirect';
  }
};

export { getRedirectUrl };

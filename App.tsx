import React, { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Button, View } from 'react-native';
import { makeRedirectUri, exchangeCodeAsync, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const discovery = useAutoDiscovery('https://login.microsoftonline.com/common/v2.0');

  const clientId =  Constants.manifest.extra.microsoftAdClientId;
  const scopes = ['openid', 'profile', 'email', 'offline_access'];
  const redirectUri = makeRedirectUri();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: scopes,
      redirectUri: redirectUri,
    },
    discovery
  );

  useEffect(() => {
    (async () => {
      if (response && response.type === 'success'){
        try {
          const tokenResponse = await exchangeCodeAsync(
            {
              clientId: clientId,
              scopes: scopes,
              redirectUri: redirectUri,
              code: response.params.code,
              extraParams: {
                'code_verifier': request?.codeVerifier ?? ''
              }
            },
            {
              ...discovery
            }
          );
        }
        catch (error) {
          console.log(error);
        }
      }
    })();
  }, [response, request])

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

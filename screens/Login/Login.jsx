import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, View, Text } from 'react-native';
import { makeRedirectUri, exchangeCodeAsync, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import Constants from 'expo-constants';
import { parseJwt } from '../../utils/token';

import MicrosoftLoginButton from './MicrosoftLoginButton';

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {
  const discovery = useAutoDiscovery('https://login.microsoftonline.com/common/v2.0');

  const clientId =  Constants.manifest.extra.microsoftAdClientId;
  const scopes = ['openid', 'profile', 'email', 'offline_access'];
  const redirectUri = Constants.appOwnership === 'standalone' ? 'unimonitor://login' : makeRedirectUri(
    {
      path: 'login',
      preferLocalhost: true,
    }
  );

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: scopes,
      redirectUri: redirectUri,
    },
    discovery
  );

  const [error, setError] = useState('');
  const [microsoftToken, setMicrosftToken] = useState('');

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

          setMicrosftToken(tokenResponse.accessToken);
        }
        catch (error) {
          setError("Erro ao entrar na sua conta Microsoft!");
        }
      }
    })();
  }, [response, request])


  useEffect(() => {
    if (microsoftToken) {
      fetch('https://qdnpbkj6r1.execute-api.sa-east-1.amazonaws.com/prod/api/sessions/microsoft', 
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + microsoftToken,
          }
        }
      )
      .then(tokenResponse => tokenResponse.json())
      .then((tokenResponseJson) => {
        const userData = parseJwt(tokenResponseJson.token);
        
        navigation.navigate('Home', {...userData});
        setError('');
      })
      .catch((error) => {
        console.log(error);
        setError('Erro ao entrar na sua conta Microsoft!');
      });
    }
  }, [microsoftToken])

  return (
    <View style={styles.container}>
      {!!error ? <Text>{'Erro: ' + error}</Text> : null}

      {/* {redirectUri ? <Text>{redirectUri}</Text> : null} */}
      <MicrosoftLoginButton
        onPress={() => {
          try {
            promptAsync();
          }
          catch (error) {
            setError("Erro ao entrar na sua conta Microsoft!")
          }
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

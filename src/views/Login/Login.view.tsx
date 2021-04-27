import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import LoadingIndicator from '../../components/LoadingIndicator.component';
import MicrosoftLoginButton from './MicrosoftLoginButton.component';
import useMicrosoftLogin from '../../hooks/useMicrosoftLogin.hook';

import { setUnimonitorApiToken } from '../../io/asyncStorage';

export default function Login({ navigation }) {
  const {
    user,
    token,
    isLoading,
    error,

    login,
  } = useMicrosoftLogin();

  useEffect(() => {
    (async () => {
      if (user && token) {
        await setUnimonitorApiToken(token);
        navigation.navigate('Home', { ...user });
      }
    })();
  }, [user, token]);

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingIndicator /> : null}
      {error ? <Text>{`Erro: ao entrar com conta Microsoft`}</Text> : null}
      {!isLoading ? <MicrosoftLoginButton onPress={login} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

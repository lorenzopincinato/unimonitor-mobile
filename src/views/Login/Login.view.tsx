import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import MicrosoftLoginButton from './MicrosoftLoginButton.component';
import useMicrosoftLogin from '../../hooks/useMicrosoftLogin.hook';

export default function Login({ navigation }) {
  const {
    user,
    isLoading,
    error,

    login,
  } = useMicrosoftLogin();

  useEffect(() => {
    if (user) {
      console.log(user);
      navigation.navigate('Home', { ...user });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : null}
      {error ? <Text>{`Erro: ${error}`}</Text> : null}
      {!isLoading ? <MicrosoftLoginButton onPress={login} /> : null}
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

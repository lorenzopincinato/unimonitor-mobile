import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';

import LoadingIndicator from '../../components/LoadingIndicator.component';
import MicrosoftLoginButton from './MicrosoftLoginButton.component';
import useMicrosoftLogin from '../../hooks/useMicrosoftLogin.hook';

import { setUnimonitorApiToken, setUserId } from '../../io/asyncStorage';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IoniconsHeaderButton from '../../components/IoniconsHeaderButton.component';

export default function Login({ navigation }) {
  const {
    user,
    token,
    isLoading,
    error,

    login,
  } = useMicrosoftLogin();

  useEffect(() => {
    if (Constants.manifest.extra.enableDebugToken) {
      navigation.setOptions({
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item
              title="notice board"
              iconName="bug"
              color="white"
              onPress={() => navigation.navigate('DebugToken')}
            />
          </HeaderButtons>
        ),
      });
    }
  }, [Constants.manifest.extra.enableDebugToken]);

  useEffect(() => {
    (async () => {
      if (user && token) {
        await setUnimonitorApiToken(token);
        await setUserId(user.id ?? 0);
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

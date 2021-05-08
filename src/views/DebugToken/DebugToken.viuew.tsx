import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { setUnimonitorApiToken, setUserId } from '../../io/asyncStorage';
import { parseJwt } from '../../utils/token';

import colors from '../../styles/colors';

const DebugToken = () => {
  const navigation = useNavigation();

  const [validToken, setIsValidToken] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  const handleTokenChange = useCallback(text => {
    try {
      const userData = parseJwt(text);

      setUser(userData);
      setToken(text);
      setIsValidToken(true);
    } catch (error) {
      setUser(null);
      setToken('');
      setIsValidToken(false);
    }
  }, []);

  const handleLogin = useCallback(() => {
    (async () => {
      try {
        await setUnimonitorApiToken(token);
        await setUserId(user.id ?? 0);

        navigation.navigate('Home', { ...user });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user, token]);

  return (
    <View style={styles.container}>
      <Text style={styles.tokenInputLabel}>Token:</Text>
      <TextInput style={styles.tokenInput} onChangeText={handleTokenChange} />
      <View style={styles.loginButtonWrapper}>
        <Button onPress={handleLogin} title="entrar" disabled={!validToken}>
          {'Entrar'}
        </Button>
      </View>

      {user ? (
        <>
          <Text>{`Nome: ${user.name}`}</Text>
          <Text>{`Registro: ${user.register}`}</Text>
          <Text>{`Email: ${user.email}`}</Text>
          <Text>{`Permissões: ${user.roles
            .map(role => role.name)
            .join(', ')}`}</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: 'flex',
    flexDirection: 'column',

    backgroundColor: '#F7FAFC',

    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  tokenInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',

    marginBottom: 8,
  },
  tokenInput: {
    height: 36,
    width: '100%',
    borderColor: colors.grey500,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    fontSize: 16,

    marginBottom: 12,
  },
  loginButtonWrapper: {
    marginBottom: 12,
  },
});

export default DebugToken;

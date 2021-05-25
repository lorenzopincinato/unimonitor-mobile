import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { setUnimonitorApiToken, setUserId } from '../../io/asyncStorage';

const Logout = () => {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await setUnimonitorApiToken(null);
      await setUserId(0);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    })();
  }, []);

  return <View style={styles.wrapper} />;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    height: '100%',
  },
});

export default Logout;

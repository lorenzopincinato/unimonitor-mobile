import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Home({ route, navigation }) {
    const {name, register, email, roles} = route.params;

    return (
        <View style={styles.container}>
            <Text>{`Nome: ${name}`}</Text>
            <Text>{`Registro: ${register}`}</Text>
            <Text>{`Email: ${email}`}</Text>
            <Text>{`Permissões: ${roles.map(role => role.name).join(', ')}`}</Text>
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
